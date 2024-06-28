<template>
    <section class="tariffs" id="tariffs">
      <div class="container">
        <h2>Тарифы доставки</h2>
        <div class="tariffs__cards">
          <div class="tariffs__cards__card">
            <h3>Пешая доставка</h3>
            <img src="/images/services-page/card1.svg" alt="">
            <p>80 ₽ км</p>
          </div>
          <div class="tariffs__cards__card">
            <h3>Авто доставка</h3>
            <img src="/images/services-page/card2.svg" alt="">
            <p>100 ₽ км</p>
          </div>
          <div class="tariffs__cards__card">
            <h3>Грузовая доставка</h3>
            <img src="/images/services-page/card3.svg" alt="">
            <p>140 ₽ км</p>
          </div>
        </div>
        <button class="tariffs__button" @click="handleOrderClick">Заказать доставку</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    methods: {
      scrollToOrder() {
        const element = document.getElementById('delivery-order');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
      handleOrderClick() {
        // Переходим на главную страницу
        window.location.href = '/'; // Укажите здесь URL вашей главной страницы
  
        // После загрузки главной страницы, прокручиваем к нужному разделу
        setTimeout(() => {
          this.scrollToOrder();
        }, 500); // Подождите некоторое время перед прокруткой, чтобы страница успела загрузиться
      },
      handleSubmit() {
        // Обработка формы
      }
    }
  };
  </script>
  
  <style scoped>
  @import '/src/styles/main.scss';
  </style>
  