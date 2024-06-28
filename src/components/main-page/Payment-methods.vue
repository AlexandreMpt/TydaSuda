<template>
    <section class="payment-methods" id="payment-methods">
      <div class="container">
        <div class="payment-methods__block">
          <h2>Способы оплаты</h2>
          <p>Закажите доставку прямо сейчас!</p>
          <div class="payment-methods__block__methods">
            <div class="payment-methods__block__methods__metod">
              <img src="/images/main-page/cash.svg" alt="">
              <p>Наличными</p>
            </div>
            <div class="payment-methods__block__methods__metod">
              <img src="/images/main-page/card.svg" alt="">
              <p>Картой</p>
            </div>
            <div class="payment-methods__block__methods__metod">
              <img src="/images/main-page/preface.svg" alt="">
              <p>Предоплата</p>
            </div>
          </div>
          <button class="payment-methods__block__button" type="submit" @click="scrollToOrder">Заказать доставку</button>
        </div>
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
      handleSubmit() {
        // Обработка формы
      }
    }
  }
  </script>
  
  <style scoped>
  @import '/src/styles/main.scss';
  </style>
  