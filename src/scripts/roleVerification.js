window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/loggedInUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка получения данных с сервера.');
        }

        const loggedInUsers = await response.json();
        if (loggedInUsers.length > 0) {
            const user = loggedInUsers[0]; // Берем первого пользователя из массива

            // Вывод информации о пользователе для отладки, включая роль
            console.log('Данные пользователя:', user);
            console.log('Роль пользователя:', user.role); // Добавьте это для вывода роли
        } else {
            console.log('Пользователь не авторизован.');
            // Действия, если пользователь не авторизован (например, перенаправление на страницу входа)
            // window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Ошибка при получении данных с сервера:', error.message);
    }
});
