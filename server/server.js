const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const axios = require('axios'); 
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'deliveryService'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Подключение к базе данных MySQL успешно.');
});

app.use(bodyParser.json());
app.use(cookieParser());

// Массив для хранения текущих авторизованных пользователей
let loggedInUsers = [];


async function verifyRecaptcha(token) {
  const secretKey = '6Lf2dQIqAAAAAKywD_5wKKjHDQi4iI9Y1UWK77kM';
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: secretKey,
        response: token
      }
    });
    return response.data.success;
  } catch (error) {
    console.error('Ошибка при проверке reCAPTCHA:', error);
    return false;
  }
}

app.post('/register', async (req, res) => {
  const { fullName, email, phone, birthdate, gender, password, recaptchaToken } = req.body;

  // const isHuman = await verifyRecaptcha(recaptchaToken);
  // if (!isHuman) {
  //   return res.status(400).json({ message: 'Проверка reCAPTCHA не пройдена.' });
  // }

  const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Пароль должен содержать хотя бы одну заглавную букву, один специальный символ и быть не менее 8 символов.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { full_name: fullName, email, phone, birth_date: birthdate, gender, password: hashedPassword };

  const sql = 'INSERT INTO Users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
      }
      return res.status(500).json({ message: 'Ошибка базы данных.', error: err });
    }
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });
  });
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  // const isHuman = await verifyRecaptcha(recaptchaToken);
  // if (!isHuman) {
  //   return res.status(400).json({ message: 'Проверка reCAPTCHA не пройдена.' });
  // }

  const sql = 'SELECT * FROM Users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Ошибка базы данных при запросе пользователя:', err);
      return res.status(500).json({ message: 'Ошибка базы данных.', error: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Неверный email или пароль.' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль.' });
    }

    // Проверяем, существует ли пользователь уже в массиве loggedInUsers
    const existingUserIndex = loggedInUsers.findIndex(u => u.email === email);
    if (existingUserIndex !== -1) {
      // Если пользователь уже авторизован, ничего не делаем
      return res.status(200).json({ message: 'Авторизация успешна.' });
    }

    // Добавляем пользователя в массив loggedInUsers
    loggedInUsers.push({
      id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      birth_date: user.birth_date,
      gender: user.gender,
      role: user.role // Предположим, что в вашей базе данных есть поле "role"
    });

    res.status(200).json({ message: 'Авторизация успешна.' });
  });
});

// Маршрут для вывода данных из массива loggedInUsers в консоль
app.get('/loggedInUsers', (req, res) => {
  // Выводим в консоль информацию о пользователе без пароля
  console.log('Текущие авторизованные пользователи:', loggedInUsers.map(user => ({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    birth_date: user.birth_date,
    gender: user.gender,
    role: user.role 
  })));
  
  res.status(200).json(loggedInUsers.map(user => ({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    phone: user.phone,
    birth_date: user.birth_date,
    gender: user.gender,
    role: user.role 
  })));
});

app.post('/logout', (req, res) => {
  loggedInUsers = [];
  res.status(200).json({ message: 'Вы успешно вышли.' });
});

app.post('/submitOrder', (req, res) => {
  const { user_id, from, to, datetime, transport, item, total } = req.body;

  // Проверяем наличие обязательных данных
  if (!user_id || !from || !to || !datetime || !transport || !item || !total) {
    return res.status(400).json({ message: 'Отсутствуют необходимые данные для оформления заказа.' });
  }

  // Формируем объект заказа
  const order = {
    user_id: user_id,
    from_address: from,
    to_address: to,
    delivery_date: datetime,
    delivery_method: transport,
    product_name: item,
    total_price: total // Используем total как есть, так как это числовое значение
  };

  // Выполняем запрос INSERT в базу данных
  const sql = 'INSERT INTO Orders SET ?';
  db.query(sql, order, (err, result) => {
    if (err) {
      console.error('Ошибка при сохранении заказа:', err);
      return res.status(500).json({ message: 'Ошибка при сохранении заказа.', error: err });
    }
    console.log('Заказ успешно сохранен в базу данных.');
    res.status(200).json({ message: 'Заказ успешно сохранен.' });
  });
});


// Маршрут для получения последних трех заказов пользователя
app.get('/recentOrders', (req, res) => {
  const userId = req.query.user_id;

  const query = `
    SELECT order_id, delivery_date, delivery_method, delivery_status, from_address, to_address, product_name, total_price, payment_status
    FROM Orders
    WHERE user_id = ?
    ORDER BY delivery_date DESC
    LIMIT 3
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

app.get('/couriers/:courierId', (req, res) => {
  const courierId = req.params.courierId;

  // Выполняем запрос к базе данных для получения данных курьера
  const sql = 'SELECT name, phone FROM Couriers WHERE courier_id = ?';
  db.query(sql, [courierId], (err, result) => {
    if (err) {
      console.error('Ошибка при получении данных курьера:', err);
      return res.status(500).json({ message: 'Ошибка при получении данных курьера.', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: `Курьер с ID ${courierId} не найден.` });
    }

    const courier = result[0];
    res.status(200).json(courier); // Возвращаем данные курьера в формате JSON
  });
});

// Маршрут для получения заказов без назначенного курьера
app.get('/ordersWithoutCourier', (req, res) => {
  const query = `
    SELECT order_id, user_id, courier_id, delivery_date, delivery_method, delivery_status, from_address, to_address, product_name, total_price, payment_status
    FROM Orders
    WHERE courier_id IS NULL OR courier_id = ''
    ORDER BY delivery_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

app.get('/orders', (req, res) => {
  const query = `
    SELECT order_id, user_id, courier_id, from_address, to_address, delivery_date, delivery_method, product_name, total_price, delivery_status, payment_status
    FROM Orders
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});


app.get('/reviews', (req, res) => {
  const query = `
    SELECT review_id, courier_id, user_id, rating, review_text
    FROM Reviews
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});


app.get('/users', (req, res) => {
  const query = `
    SELECT user_id, full_name, email, phone, birth_date, gender, role
    FROM Users
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});


app.put('/updateRecord', (req, res) => {
  const { table, id, field, value } = req.body;
  const query = `
    UPDATE ${table}
    SET ${field} = ?
    WHERE ${table.slice(0, -1)}_id = ?
  `;

  db.query(query, [value, id], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json({ message: 'Запись обновлена' });
  });
});


app.delete('/deleteRecord', (req, res) => {
  const { table, id } = req.body;
  const query = `
    DELETE FROM ${table}
    WHERE ${table.slice(0, -1)}_id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json({ message: 'Запись удалена' });
  });
});

app.post('/addRecord', (req, res) => {
  const { table, record } = req.body;
  const columns = Object.keys(record).join(', ');
  const values = Object.values(record);
  const placeholders = values.map(() => '?').join(', ');

  const query = `
    INSERT INTO ${table} (${columns})
    VALUES (${placeholders})
  `;

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json({ message: 'Запись добавлена' });
  });
});


// Получить список всех заказов за определенный период
app.get('/view1', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `
    SELECT * FROM Orders WHERE delivery_date BETWEEN '2023-06-20' AND '2023-06-25';
  `;
  db.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список всех заказов определенного клиента
app.get('/view2', (req, res) => {
  const { userId } = req.query;
  const query = `
    SELECT * FROM Orders WHERE user_id = 6;
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список всех заказов, которые были доставлены определенным курьером
app.get('/view3', (req, res) => {
  const { courierId } = req.query;
  const query = `
  SELECT * FROM Orders WHERE courier_id = 7;
  `;
  db.query(query, [courierId], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список заказов, которые еще не были доставлены
app.get('/view4', (req, res) => {
  const query = `
    SELECT * FROM Orders WHERE delivery_status != 'Доставлена'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список всех заказов, у которых сумма доставки превышает заданное значение
app.get('/view5', (req, res) => {
  const { minPrice } = req.query;
  const query = `
    SELECT * FROM Orders WHERE total_price > 4000.00;
  `;
  db.query(query, [minPrice], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список всех клиентов с указанием наполнения заказа, даты и времени
app.get('/view6', (req, res) => {
  const query = `
    SELECT Users.full_name, Orders.product_name, Orders.delivery_date 
    FROM Users 
    JOIN Orders ON Users.user_id = Orders.user_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список курьеров с наибольшим количеством отзывов и с наибольшей оценкой
app.get('/view7', (req, res) => {
  const query = `
    SELECT courier_id, COUNT(*) as review_count, AVG(rating) as avg_rating 
    FROM Reviews 
    GROUP BY courier_id 
    ORDER BY review_count DESC, avg_rating DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Получить список всех товаров, которые были заказаны клиентами определенной возрастной группы и определенного пола
app.get('/view8', (req, res) => {
  const { minAge, maxAge, gender } = req.query;
  const query = `
  SELECT Orders.product_name 
  FROM Orders 
  JOIN Users ON Orders.user_id = Users.user_id 
  WHERE Users.gender = 'Мужской' AND TIMESTAMPDIFF(YEAR, Users.birth_date, CURDATE()) BETWEEN 30 AND 40;
  `;
  db.query(query, [gender, minAge, maxAge], (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

app.get('/view9', (req, res) => {
  const query = `
    SELECT Orders.order_id, SUBSTRING(Orders.from_address, -6) AS postal_code, Users.user_id 
    FROM Orders 
    JOIN Users ON Orders.user_id = Users.user_id 
    WHERE SUBSTRING(Orders.from_address, -6) = '103265'
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});


// Получить список всех клиентов, у которых не было сделано ни одного заказа
app.get('/view10', (req, res) => {
  const query = `
    SELECT Users.* 
    FROM Users 
    LEFT JOIN Orders ON Users.user_id = Orders.user_id 
    WHERE Orders.order_id IS NULL
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении запроса к базе данных:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});


app.post('/getUserByEmail', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});



app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

