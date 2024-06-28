<template>
  <div>
    <header>
      <div class="container">
        <nav class="main-menu">
          <ul class="main-menu__left">
            <li class="main-menu__item">
              <a href="index.html" class="main-menu__left__logo">
                <img src="/images/main-page/logo.svg" alt="">
              </a>
              <a href="index.html" class="main-menu__left__logo-m">
                <img src="/images/main-page/ava-mobile.svg" alt="">
              </a>
            </li>
            <li class="main-menu__item">
              <a href="#" class="main-menu__left__location">
                <img src="/images/main-page/marker.svg" alt="">Город
              </a>
            </li>
          </ul>
          <ul class="main-menu__right">
            <li class="main-menu__item"><a href="index.html" class="main-menu__right__link">Главная</a></li>
            <li class="main-menu__item"><a href="Services.html" class="main-menu__right__link">Услуги</a></li>
            <li class="main-menu__item"><a href="AboutUs.html" class="main-menu__right__link">О нас</a></li>
            <li class="main-menu__item"><a href="reviews.html" class="main-menu__right__link">Отзывы</a></li>
            <li class="main-menu__item">
              <div class="personal-account-dropdown">
                <a href="#" @click.prevent="openModal" class="main-menu__right__button">
                  <img src="/images/main-page/profile.svg" alt="">
                  <span>Личный кабинет</span>
                </a>
              </div>
            </li>
          </ul>
          <div class="main-menu__burger-icon" id="burger-menu" @click="toggleBurgerMenu">&#9776;</div>
          <ul class="main-menu__burger" v-if="isBurgerMenuOpen">
            <li class="main-menu__item"><a href="index.html" class="main-menu__right__link">Главная</a></li>
            <li class="main-menu__item"><a href="Services.html" class="main-menu__right__link">Услуги</a></li>
            <li class="main-menu__item"><a href="AboutUs.html" class="main-menu__right__link">О нас</a></li>
            <li class="main-menu__item"><a href="reviews.html" class="main-menu__right__link">Отзывы</a></li>
            <li class="main-menu__item">
              <a href="#" @click.prevent="openModal" class="main-menu__right__button">
                  <img src="/images/main-page/profile.svg" alt="">
                  <span>Личный кабинет</span>
                </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Модальное окно авторизации -->
    <div class="modal" v-if="isModalVisible">
      <div class="close" @click="closeModal">&times;</div>
      <h2>Авторизация</h2>
      <form @submit.prevent="login">
        <input type="email" placeholder="Почта" required v-model="email">
        <div class="input-wrapper">
          <input :type="passwordVisible ? 'text' : 'password'" placeholder="Введите пароль" required v-model="password">
          <div class="password-toggle" @click="togglePasswordVisibility">&#128065;</div>
        </div>
        <div id="recaptcha-login"></div>
        <button type="submit" class="auth-btn">Войти</button>
      </form>
      <a href="#" class="register-link" @click.prevent="switchToRegistration">Регистрация</a>
    </div>

    <!-- Модальное окно регистрации -->
    <div class="modal" v-if="isRegistrationVisible">
      <div class="close" @click="closeModal">&times;</div>
      <h2>Регистрация</h2>
      <form @submit.prevent="register">
        <input type="text" placeholder="ФИО" required v-model="fullName">
        <input type="email" placeholder="Почта" required v-model="email">
        <input type="tel" placeholder="Телефон" required v-model="phone">
        <input type="date" placeholder="Дата рождения" required v-model="birthdate">
        <select required v-model="gender">
          <option value="" disabled selected>Пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
        <div class="input-wrapper">
          <input :type="passwordVisible ? 'text' : 'password'" placeholder="Введите пароль" required v-model="password">
          <div class="password-toggle" @click="togglePasswordVisibility">&#128065;</div>
        </div>
        <div class="input-wrapper">
          <input :type="passwordVisible ? 'text' : 'password'" placeholder="Повторите пароль" required v-model="confirmPassword">
          <div class="password-toggle" @click="togglePasswordVisibility">&#128065;</div>
        </div>
        <div class="terms">
          Регистрируясь, я соглашаюсь с Правилами использования и Политикой по обработке персональных данных.
        </div>
        <div id="recaptcha-register"></div>
        <button type="submit" class="register-btn">Зарегистрироваться</button>
      </form>
      <a href="#" class="register-link" @click.prevent="switchToLogin">Войти</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Inputmask from "inputmask";

export default {
  data() {
    return {
      recaptchaSiteKey: '6Lf2dQIqAAAAADwPEDMRdT1eHj4KpLoH6GcyGP-v',
      recaptchaToken: null,
      // Ваши текущие данные и состояния
      isModalVisible: false,
      isRegistrationVisible: false,
      email: '',
      fullName: '',
      phone: '',
      birthdate: '',
      gender: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      isBurgerMenuOpen: false,
      isLoggedIn: false,
      isLogoutVisible: false,
      user: {
        fullName: ''
      }
    };
  },
  methods: {
  closeModal() {
    this.isModalVisible = false;
    this.isRegistrationVisible = false;
    this.email = '';
    this.fullName = '';
    this.phone = '';
    this.birthdate = '';
    this.gender = '';
    this.password = '';
    this.confirmPassword = '';
  },
  async openModal() {
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
        this.user = loggedInUsers[0];
        this.isLoggedIn = true;
        this.redirectToPersonalAccount();
      } else {
        this.isModalVisible = true;
        this.$nextTick(() => {
          grecaptcha.render('recaptcha-login', {
            'sitekey': this.recaptchaSiteKey
          });
        });
      }
    } catch (error) {
      console.error('Ошибка при получении данных с сервера:', error.message);
      alert('Произошла ошибка при проверке авторизации.');
    }
  },
  switchToRegistration() {
    this.isRegistrationVisible = true;
    this.$nextTick(() => {
      grecaptcha.render('recaptcha-register', {
        'sitekey': this.recaptchaSiteKey
      });
    });
  },
  switchToLogin() {
    this.isRegistrationVisible = false;
    this.$nextTick(() => {
      grecaptcha.render('recaptcha-login', {
        'sitekey': this.recaptchaSiteKey
      });
    });
  },
    openModalFromFooter() {
      this.isModalVisible = true;
      this.isRegistrationVisible = false;
    },
    redirectToPersonalAccount() {
      window.location.href = 'personal-account.html'; // Перенаправление на персональный кабинет
    },
    toggleBurgerMenu() {
      this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
    },
    async executeRecaptcha(action) {
      try {
        const token = await new Promise((resolve) => {
          grecaptcha.ready(() => {
            grecaptcha.execute(this.recaptchaSiteKey, { action: action }).then((token) => {
              resolve(token);
            });
          });
        });

        const isVerified = await this.verifyRecaptcha(token);
        if (isVerified) {
          // Продолжаем с действием (вход или регистрация)
          if (action === 'login') {
            this.login();
          } else if (action === 'register') {
            this.register();
          }
        } else {
          alert('Проверка reCAPTCHA не пройдена. Попробуйте еще раз.');
        }
      } catch (error) {
        console.error('Ошибка при выполнении reCAPTCHA:', error);
        alert('Произошла ошибка при проверке reCAPTCHA. Попробуйте еще раз.');
      }
    },
    async verifyRecaptcha(token) {
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
    },
    validateFullName() {
      const fullNamePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
      const words = this.fullName.trim().split(/\s+/);
      if (!fullNamePattern.test(this.fullName) || words.length < 2) {
        alert('ФИО должно содержать только буквы и состоять минимум из двух слов.');
        return false;
      }
      return true;
    },
    validateBirthdate() {
      const birthdate = new Date(this.birthdate);
      const minDate = new Date('1900-01-01');
      const maxDate = new Date();
      if (birthdate < minDate || birthdate > maxDate) {
        alert('Неверная дата рождения.');
        return false;
      }
      return true;
    },
    async register() {
      if (!this.validateFullName() || !this.validateBirthdate()) {
        return;
      }
      const userData = {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        birthdate: this.birthdate,
        gender: this.gender,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      // Проверка на соответствие требованиям пароля
      const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(userData.password)) {
        alert('Пароль должен содержать хотя бы одну заглавную букву, один специальный символ и быть не менее 8 символов.');
        return;
      }
      // Проверка на совпадение паролей
      if (userData.password !== userData.confirmPassword) {
        alert('Пароли не совпадают.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const result = await response.json();
        if (response.status !== 201) {
          alert(result.message);
        } else {
          alert('Регистрация прошла успешно.');
          this.switchToLogin();
        }
      } catch (error) {
        alert('Произошла ошибка при регистрации.');
        console.error(error);
      }
    },
    async login() {
      const loginData = {
        email: this.email,
        password: this.password
      };
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
        const result = await response.json();
        if (response.status !== 200) {
          alert(result.message);
        } else {
          this.user = result.user;
          this.isLoggedIn = true;
          alert('Авторизация прошла успешно.');
          this.redirectToPersonalAccount(); // Перенаправление на персональный кабинет
        }
      } catch (error) {
        alert('Произошла ошибка при входе.');
        console.error(error);
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = { fullName: '' };
      alert('Вы успешно вышли.');
      window.location.href = 'index.html'; // Перенаправление на главную страницу
    }
  },
  mounted() {
    // Загрузка инициализации и других скриптов
    const authLinkFooter = document.querySelector('.open-auth-modal-footer');
    if (authLinkFooter) {
      authLinkFooter.addEventListener('click', (event) => {
        event.preventDefault();
        this.openModalFromFooter();
      });
    }

    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jqueryScript.onload = () => {
      console.log('jQuery загружен.');
      
      const headerScript = document.createElement('script');
      headerScript.src = 'src/scripts/headerScript.js';
      headerScript.onload = () => {
        console.log('headerScript.js загружен.');
      };
      document.head.appendChild(headerScript);
    };
    document.head.appendChild(jqueryScript);

    // Apply input mask for phone number
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
      Inputmask({ mask: '+79999999999' }).mask(phoneInput);
    }
  }
};
</script>







<style scoped>
@import '/src/styles/main.scss';

.personal-account-dropdown {
  position: relative;
}

.logout-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.personal-account-dropdown:hover .logout-dropdown {
  display: block;
}


.modal {
  background-color: #1c1c1c;
  padding: 50px 40px 30px 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 354px;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.modal h2 {
  color: rgb(232, 232, 232);
  font-family: Segoe UI;
  font-size: 48px;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: 0%;
  text-align: center;
  margin-bottom: 55px;
}

.modal .terms {
  color: rgb(232, 232, 232);
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
  max-width: 353px;
}

.modal .close {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 50px;
  cursor: pointer;
  color: rgb(83, 187, 1);
}

.modal input {
  box-sizing: border-box;
  border: 1px solid rgb(213, 212, 212);
  border-radius: 8px;
  background: rgb(232, 232, 232);
  width: 353px;
  height: 42px;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: rgba(30, 30, 30, 0.6);
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
}

.modal select {
  box-sizing: border-box;
  border: 1px solid rgb(213, 212, 212);
  border-radius: 8px;
  background: rgb(232, 232, 232);
  width: 353px;
  height: 42px;
  padding: 10px 20px;
  margin-bottom: 20px;
  color: rgba(30, 30, 30, 0.6);
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
}

.modal .auth-btn, .register-btn {
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgb(83, 187, 1);
  width: 353px;
  height: 67px;
  background-color: #00b300;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: rgb(30, 30, 30);
  font-family: Segoe UI;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 14px;
}

.modal .register-link {
  display: block;
  text-align: center;
  text-decoration: none;
  color: rgb(83, 187, 1);
  font-family: Segoe UI;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0%;
  text-align: center;
}

.modal .password-toggle {
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
  color: rgb(83, 187, 1);
}

.input-wrapper {
  position: relative;
}

input:focus, select:focus {
    outline: none;
}

.personal-account-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.personal-account-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  color: rgb(83, 187, 1);
  background-color: #2D2928;
}

.dropdown-content a:hover {
  background-color: rgb(30, 30, 30);
}

@media (max-width: 431px) {
  .modal {
  background-color: #1c1c1c;
  padding: 20px 10px 5px 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 354px;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.modal h2 {
  color: rgb(232, 232, 232);
  font-family: Segoe UI;
  font-size: 24px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 0%;
  text-align: center;
  margin-bottom: 30px;
}

.modal .terms {
  color: rgb(232, 232, 232);
  font-family: Segoe UI;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
  max-width: 353px;
}

.modal .close {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 50px;
  cursor: pointer;
  color: rgb(83, 187, 1);
}

.modal input {
  box-sizing: border-box;
  border: 1px solid rgb(213, 212, 212);
  border-radius: 8px;
  background: rgb(232, 232, 232);
  width: 353px;
  height: 42px;
  padding: 10px 20px;
  margin-bottom: 10px;
  color: rgba(30, 30, 30, 0.6);
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
}

.modal select {
  box-sizing: border-box;
  border: 1px solid rgb(213, 212, 212);
  border-radius: 8px;
  background: rgb(232, 232, 232);
  width: 353px;
  height: 42px;
  padding: 10px 20px;
  margin-bottom: 10px;
  color: rgba(30, 30, 30, 0.6);
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
}

.modal .auth-btn, .register-btn {
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: rgb(83, 187, 1);
  width: 353px;
  height: 50px;
  background-color: #00b300;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: rgb(30, 30, 30);
  font-family: Segoe UI;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 14px;
}

.modal .register-link {
  display: block;
  text-align: center;
  text-decoration: none;
  color: rgb(83, 187, 1);
  font-family: Segoe UI;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0%;
  text-align: center;
  padding-bottom: 20px;
}

.modal .password-toggle {
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
  color: rgb(83, 187, 1);
}

.input-wrapper {
  position: relative;
}

input:focus, select:focus {
    outline: none;
}
}

.main-menu__right__exit{
  display: flex;
  justify-content: center;
}

</style>
