<template>
    <section class="admin" id="admin">
      <div class="container">
        <div class="admin__navbar">
          <a href="#" class="admin__navbar__btn" :class="{ 'active-btn': activeTab === 'orders' }" @click="setActiveTab('orders')">Заказы</a>
          <a href="#" class="admin__navbar__btn" :class="{ 'active-btn': activeTab === 'reviews' }" @click="setActiveTab('reviews')">Отзывы</a>
          <a href="#" class="admin__navbar__btn" :class="{ 'active-btn': activeTab === 'users' }" @click="setActiveTab('users')">Пользователи</a>
        </div>
        <div class="admin__block">
          <div class="admin__block__content" id="tableContent">
            <p v-if="activeTab.includes('view')" class="view-description">{{ activeViewDescription }}</p>
            <table v-if="activeTab === 'orders' && filteredOrders.length">
              <thead>
                <tr>
                  <th>order_id</th>
                  <th>user_id</th>
                  <th>courier_id</th>
                  <th>from_address</th>
                  <th>to_address</th>
                  <th>delivery_date</th>
                  <th>delivery_method</th>
                  <th>product_name</th>
                  <th>total_price</th>
                  <th>delivery_status</th>
                  <th>payment_status</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredOrders" :key="order.order_id">
                  <td>{{ order.order_id }}</td>
                  <td>{{ order.user_id }}</td>
                  <td>{{ order.courier_id }}</td>
                  <td>{{ order.from_address }}</td>
                  <td>{{ order.to_address }}</td>
                  <td>{{ order.delivery_date }}</td>
                  <td>{{ order.delivery_method }}</td>
                  <td>{{ order.product_name }}</td>
                  <td>{{ order.total_price }}</td>
                  <td>{{ order.delivery_status }}</td>
                  <td>{{ order.payment_status }}</td>
                  <td>
                    <button @click="editRecord('orders', order)">Изменить</button>
                    <button @click="deleteRecord('orders', order.order_id)">Удалить</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-else-if="activeTab === 'reviews' && filteredReviews.length">
              <thead>
                <tr>
                  <th>review_id</th>
                  <th>courier_id</th>
                  <th>user_id</th>
                  <th>rating</th>
                  <th>review_text</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in filteredReviews" :key="review.review_id">
                  <td>{{ review.review_id }}</td>
                  <td>{{ review.courier_id }}</td>
                  <td>{{ review.user_id }}</td>
                  <td>{{ review.rating }}</td>
                  <td>{{ review.review_text }}</td>
                  <td>
                    <button @click="editRecord('reviews', review)">Изменить</button>
                    <button @click="deleteRecord('reviews', review.review_id)">Удалить</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-else-if="activeTab === 'users' && filteredUsers.length">
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>full_name</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>birth_date</th>
                  <th>gender</th>
                  <th>role</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user.user_id">
                  <td>{{ user.user_id }}</td>
                  <td>{{ user.full_name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phone }}</td>
                  <td>{{ user.birth_date }}</td>
                  <td>{{ user.gender }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <button @click="editRecord('users', user)">Изменить</button>
                    <button @click="deleteRecord('users', user.user_id)">Удалить</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-if="['orders', 'reviews', 'users'].includes(activeTab)" class="add-record">
                <button @click="addRecord(activeTab)">Добавить запись</button>
            </div>
  
            <!-- Таблицы для представлений -->
            <table v-if="activeTab.includes('view') && viewData.length">
              <thead>
                <tr>
                  <th v-for="(value, key) in viewData[0]" :key="key">{{ key }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in viewData" :key="item.id">
                  <td v-for="(value, key) in item" :key="key">{{ value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="admin__block__filter">
            <h3>Представления:</h3>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view1' }" @click="fetchViewData(1)">Представление 1</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view2' }" @click="fetchViewData(2)">Представление 2</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view3' }" @click="fetchViewData(3)">Представление 3</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view4' }" @click="fetchViewData(4)">Представление 4</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view5' }" @click="fetchViewData(5)">Представление 5</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view6' }" @click="fetchViewData(6)">Представление 6</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view7' }" @click="fetchViewData(7)">Представление 7</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view8' }" @click="fetchViewData(8)">Представление 8</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view9' }" @click="fetchViewData(9)">Представление 9</a>
            <a href="#" class="admin__block__filter__btn" :class="{ 'active-btn': activeTab === 'view10' }" @click="fetchViewData(10)">Представление 10</a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        activeTab: 'orders',
        orders: [],
        reviews: [],
        users: [],
        filter: '',
        viewData: [],
        viewDescriptions: {
        view1: 'Список всех заказов за определенный период.',
        view2: 'Список всех заказов определенного клиента.',
        view3: 'Список всех заказов, которые были доставлены определенным курьером.',
        view4: 'Список заказов, которые еще не были доставлены.',
        view5: 'Список всех заказов, у которых сумма доставки превышает заданное значение.',
        view6: 'Список всех клиентов с указанием наполнения заказа, даты и времени.',
        view7: 'Список курьеров с наибольшим количеством отзывов и с наибольшей оценкой.',
        view8: 'Список всех товаров, которые были заказаны клиентами определенной возрастной группы и определенного пола.',
        view9: 'Список всех заказов с определенным почтовым индексом.',
        view10: 'Список всех клиентов, у которых не было сделано ни одного заказа.'
        }
      };
    },
    computed: {
    filteredOrders() {
        return this.orders.filter(order => Object.values(order).some(val => val.toString().toLowerCase().includes(this.filter.toLowerCase())));
    },
    filteredReviews() {
        return this.reviews.filter(review => Object.values(review).some(val => val.toString().toLowerCase().includes(this.filter.toLowerCase())));
    },
    filteredUsers() {
        return this.users.filter(user => Object.values(user).some(val => val.toString().toLowerCase().includes(this.filter.toLowerCase())));
    },
    activeViewDescription() {
        return this.viewDescriptions[this.activeTab] || '';
    }
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
        this.fetchData(tab);
      },
      fetchData(table) {
        axios.get(`http://localhost:3000/${table}`)
          .then(response => {
            if (table === 'orders') {
              this.orders = response.data;
            } else if (table === 'reviews') {
              this.reviews = response.data;
            } else if (table === 'users') {
              this.users = response.data;
            }
          })
          .catch(error => {
            console.error('Ошибка при получении данных:', error);
          });
      },
      addRecord(table) {
    const record = {}; // Создаем пустой объект для новой записи
    const fields = {
      orders: ['user_id', 'courier_id', 'from_address', 'to_address', 'delivery_date', 'delivery_method', 'product_name', 'total_price', 'delivery_status', 'payment_status'],
      reviews: ['courier_id', 'user_id', 'rating', 'review_text'],
      users: ['full_name', 'email', 'phone', 'birth_date', 'gender', 'role']
    };

    fields[table].forEach(field => {
      const value = prompt(`Введите значение для ${field}:`);
      if (value) {
        record[field] = value;
      }
    });

    if (Object.keys(record).length) {
      axios.post('http://localhost:3000/addRecord', { table, record })
        .then(response => {
          alert(response.data.message);
          this.fetchData(table);
        })
        .catch(error => {
          console.error('Ошибка при добавлении записи:', error);
        });
    }
  },


      editRecord(table, record) {
        const field = prompt('Введите поле для изменения:');
        const value = prompt('Введите новое значение:');
        if (field && value) {
          axios.put('http://localhost:3000/updateRecord', { table, id: record[`${table.slice(0, -1)}_id`], field, value })
            .then(response => {
              alert(response.data.message);
              this.fetchData(table);
            })
            .catch(error => {
              console.error('Ошибка при обновлении записи:', error);
            });
        }
      },
      deleteRecord(table, id) {
        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
          axios.delete('http://localhost:3000/deleteRecord', { data: { table, id } })
            .then(response => {
              alert(response.data.message);
              this.fetchData(table);
            })
            .catch(error => {
              console.error('Ошибка при удалении записи:', error);
            });
        }
      },
      fetchViewData(viewNumber) {
        this.activeTab = `view${viewNumber}`;
        axios.get(`http://localhost:3000/view${viewNumber}`)
          .then(response => {
            this.viewData = response.data;
          })
          .catch(error => {
            console.error('Ошибка при получении данных для представления:', error);
          });
      }
    },
    mounted() {
      this.fetchData('orders');
    }
  };
  </script>
  
  <style>
  @import '/src/styles/adminPage.scss';
  .view-description{
    margin-bottom: 20px;
  }
  button{
    margin-top: 30px;
    border: 2px solid rgb(83, 187, 1);
    border-radius: 6.4px;
    color: rgb(83, 187, 1);
    font-family: Segoe UI;
    font-size: 16px;
    font-weight: 700;
    line-height: 20.8px;
    letter-spacing: 0%;
    text-align: center;
    width: 160px;
    height: 40px;
    background-color: white;
    cursor: pointer;
  }
  </style>
  