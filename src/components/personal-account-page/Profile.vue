<template>
    <section class="profile" id="profile">
        <div class="container">
            <div class="profile__navbar">
                <a href="" class="profile__navbar__btn active-btn">Профиль</a>
                <a v-if="isCourierOrAdmin" href="/personal-account-orders.html" class="profile__navbar__btn">Заказы</a>
                <a v-if="isAdmin" href="/admin.html" class="profile__navbar__btn">Админ панель</a>
            </div>
            <div class="profile__block">
                <div class="profile__block__left">
                    <img src="/images/personal-account-page/ava-profile.png" alt="" class="profile__block__left__ava">
                    <a href="" class="profile__block__left__exit" @click="logout">Выйти</a>
                </div>
                <div class="profile__block__right">
                    <p class="profile__block__right__name">ФИО: {{ user.fullName }}</p>
                    <p class="profile__block__right__email">Почта: {{ user.email }}</p>
                    <p class="profile__block__right__phone">Телефон: {{ user.phone }}</p>
                    <p class="profile__block__right__role">Роль: {{ user.role }}</p>
                    <p class="profile__block__right__age">Возраст: {{ user.age }}</p>
                    <p class="profile__block__right__gender">Пол: {{ user.gender }}</p>
                </div>
                <!-- <a href="" class="profile__block__edit"><img src="/images/personal-account-page/edit-light.svg" alt=""></a> -->
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            user: {
                fullName: '',
                email: '',
                phone: '',
                role: '',
                age: '',
                gender: ''
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
        async logout() {
            try {
                const response = await fetch('http://localhost:3000/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка выхода пользователя.');
                }

                // Очищаем данные пользователя в компоненте Vue
                this.user = {
                    fullName: '',
                    email: '',
                    phone: '',
                    role: '',
                    age: '',
                    gender: ''
                };

                console.log('Пользователь успешно вышел.');

                // Перенаправляем пользователя на главную страницу
                window.location.href = '/'; // Укажите здесь URL главной страницы

            } catch (error) {
                console.error('Ошибка при выходе пользователя:', error.message);
            }
        },
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

                    // Заполняем данные пользователя в компоненте Vue
                    this.user.fullName = user.full_name;
                    this.user.email = user.email;
                    this.user.phone = user.phone;
                    this.user.role = user.role;
                    this.user.age = this.calculateAge(user.birth_date); // Пример расчета возраста
                    this.user.gender = user.gender;

                    // Вывод информации о пользователе для отладки
                    console.log('Данные пользователя:', this.user);
                } else {
                    console.log('Пользователь не авторизован.');
                    // Действия, если пользователь не авторизован (например, перенаправление на страницу входа)
                    // window.location.href = 'login.html';
                }
            } catch (error) {
                console.error('Ошибка при получении данных с сервера:', error.message);
            }
        },
        calculateAge(birthDate) {
            // Пример функции расчета возраста на основе даты рождения
            const today = new Date();
            const birth = new Date(birthDate);
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        }
    }
};
</script>

<style>
@import '/src/styles/personalAccountPage.scss';
</style>
