<template>
  <section class="about-us" id="about-us">
    <div class="container">
      <h1>О нас</h1>
      <p>Первый заказ, выполненный курьерской службой «Туда-Сюда», был совершен в январе 2023 года. Наша миссия — доставлять ваши заказы точно в нужное время и место. Мы можем начать выполнять заказ через несколько минут после его поступления или организовать доставку в заранее определенное время.</p>
      <div class="about-us__video-container">
        <div class="about-us__video-wrapper">
          <iframe width="1160" height="520" src="https://www.youtube.com/embed/uyIZ2ORH6pQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>                       
      <p>Для обеспечения оперативной доставки мы работаем с курьерами, оснащенными GPS-устройствами. Как только вы размещаете заказ, наш администратор определяет ближайшего доступного курьера и назначает на заказ. У нас всегда есть свободные курьеры, готовые немедленно приступить к исполнению заказа по оптимальному маршруту, заранее спланированному нами. Наш рекорд составляет всего <span>60 минут</span> с момента размещения заказа!
        <br><br>
        Мы понимаем, как важна для вас своевременная доставка, <span>поэтому гарантируем выполнение доставки и сохранность товара</span>, иначе мы вернем вам деньги! Вы также можете отследить статус вашего заказа в личном кабинете. 
        <br><br>
        Оплатить доставку можно любым удобным для вас способом: наличными курьеру по любому адресу маршрута или безналичным расчетом через наш сайт. Мы стремимся сделать процесс доставки максимально удобным и прозрачным для вас.</p>
      <div class="about-us__payment-methods__block">
        <h2>Способы оплаты</h2>
        <p>Закажите доставку прямо сейчас!</p>
        <div class="about-us__payment-methods__block__methods">
          <div class="about-us__payment-methods__block__methods__metod">
            <img src="/images/main-page/cash.svg" alt="">
            <p>Наличными</p>
          </div>
          <div class="about-us__payment-methods__block__methods__metod">
            <img src="/images/main-page/card.svg" alt="">
            <p>Картой</p>
          </div>
          <div class="about-us__payment-methods__block__methods__metod">
            <img src="/images/main-page/preface.svg" alt="">
            <p>Предоплата</p>
          </div>
        </div>
        <button class="about-us__payment-methods__block__button" @click="handleOrderClick">Заказать доставку</button>
      </div>
      <p>Наша команда курьеров готова доставить ваш заказ в любое время и в любую точку города. Мы гордимся тем, что можем предложить вам <span>надежный и быстрый сервис</span>, который уже завоевал доверие множества клиентов. С каждым новым заказом мы стремимся улучшить наш сервис и сделать ваш опыт еще более приятным. Выбирайте «Туда-Сюда» для всех ваших потребностей в доставке — мы всегда рядом и готовы помочь!</p>
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
