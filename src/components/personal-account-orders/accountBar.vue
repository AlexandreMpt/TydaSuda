<template>
    <section class="profile" id="profile">
        <div class="container">
            <div class="profile__navbar">
                <a href="/personal-account.html" class="profile__navbar__btn">Профиль</a>
                <a v-if="isCourierOrAdmin" href="/personal-account-orders.html" class="profile__navbar__btn active-btn">Заказы</a>
                <a v-if="isAdmin" href="/admin.html" class="profile__navbar__btn">Админ панель</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: {
                role: ''
            }
        };
    },
    computed: {
        isCourierOrAdmin() {
            return this.user.role === 'Курьер' || this.user.role === 'Администратор';
        },
        isAdmin() {
            return this.user.role === 'Администратор';
        }
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
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
                    this.user.role = user.role; // Устанавливаем роль пользователя

                    // Вывод информации о пользователе для отладки
                    console.log('Роль пользователя:', this.user.role);
                } else {
                    console.log('Пользователь не авторизован.');
                    // Действия, если пользователь не авторизован (например, перенаправление на страницу входа)
                    // window.location.href = 'login.html';
                }
            } catch (error) {
                console.error('Ошибка при получении данных с сервера:', error.message);
            }
        }
    }
};
</script>

<style>
@import '/src/styles/personalAccountPage.scss';
</style>
