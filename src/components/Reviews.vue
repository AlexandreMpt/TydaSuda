<template>
  <section>
    <Header />
    <div class="reviews" id="reviews">
      <div class="container">
        <h1>Отзывы клиентов</h1>
        <div class="reviews__review">
          <div class="reviews__review__profile">
            <img src="/images/reviews-page/ava1.png" alt="" class="ava">
            <p class="nick">Иван Иванов</p>
            <p class="date">03.06.2023</p>
          </div>
          <p class="content">Пешая доставка — это идеальное решение для городских условий, где плотный трафик и пробки могут существенно замедлить передвижение автотранспорта. Наша служба «Туда-Сюда» предоставляет услуги пешей доставки, обеспечивая быструю и качественную доставку.</p>
        </div>
        <div class="reviews__review">
          <div class="reviews__review__profile">
            <img src="/images/reviews-page/ava2.png" alt="" class="ava">
            <p class="nick">Денис Рубцов</p>
            <p class="date">02.06.2023</p>
          </div>
          <p class="content">Очень доволен услугами пешей доставки от «Туда-Сюда». Курьер прибыл точно в назначенное время, несмотря на плотный трафик. Вежливое общение и аккуратная доставка — то, что нужно для городской суеты. Рекомендую всем!</p>
        </div>
        <div class="reviews__review">
          <div class="reviews__review__profile">
            <img src="/images/reviews-page/ava3.png" alt="" class="ava">
            <p class="nick">Лера Булатова</p>
            <p class="date">01.06.2023</p>
          </div>
          <p class="content">Отличный сервис! Пешая доставка от «Туда-Сюда» — это спасение в часы пик, когда передвигаться на автомобиле невозможно. Курьер был очень пунктуален и доставил посылку быстрее, чем я ожидал. Обязательно буду пользоваться снова.</p>
        </div>
        <div class="reviews__review">
          <div class="reviews__review__profile">
            <img src="/images/reviews-page/ava4.png" alt="" class="ava">
            <p class="nick">Настя Золотова</p>
            <p class="date">24.05.2023</p>
          </div>
          <p class="content">Благодарю службу «Туда-Сюда» за оперативную пешую доставку. Курьер добрался до меня быстро, несмотря на все сложности городского трафика. Очень удобный и надежный способ доставки. Рекомендую всем, кто ценит свое время!</p>
        </div>
        <div class="reviews__review">
          <div class="reviews__review__profile">
            <img src="/images/reviews-page/ava5.png" alt="" class="ava">
            <p class="nick">Аня Тучкова</p>
            <p class="date">23.05.2023</p>
          </div>
          <p class="content">Пешая доставка от «Туда-Сюда» оказалась на высоте. Курьер был вежлив, аккуратен и доставил посылку вовремя. Приятно удивлена качеством обслуживания. Обязательно воспользуюсь вашими услугами еще раз!</p>
        </div>
        <div class="reviews__review">
          <div class="reviews__review__profile">
            <img src="/images/reviews-page/ava6.png" alt="" class="ava">
            <p class="nick">Саша Чернигов</p>
            <p class="date">20.05.2023</p>
          </div>
          <p class="content">Впечатлен скоростью пешей доставки от «Туда-Сюда». В условиях городского трафика это просто находка! Курьер был очень профессионален и добрался до меня в кратчайшие сроки. Всем рекомендую этот сервис!</p>
        </div>

        <div id="hidden-reviews" style="display: none;">
          <div class="reviews__review">
            <div class="reviews__review__profile">
              <img src="/images/reviews-page/ava7.png" alt="" class="ava">
              <p class="nick">Михаил Петров</p>
              <p class="date">15.05.2023</p>
            </div>
            <p class="content">Пешая доставка от «Туда-Сюда» удивила своей оперативностью. Курьер был очень пунктуален и добрался до меня быстрее, чем ожидалось. Отличный сервис, рекомендую!</p>
          </div>
          <div class="reviews__review">
            <div class="reviews__review__profile">
              <img src="/images/reviews-page/ava8.png" alt="" class="ava">
              <p class="nick">Екатерина Смирнова</p>
              <p class="date">12.05.2023</p>
            </div>
            <p class="content">Очень довольна услугой пешей доставки от «Туда-Сюда». Курьер был вежлив и аккуратен, посылка пришла вовремя. Обязательно воспользуюсь снова. Спасибо!</p>
          </div>
          <div class="reviews__review">
            <div class="reviews__review__profile">
              <img src="/images/reviews-page/ava9.png" alt="" class="ava">
              <p class="nick">Алексей Кузнецов</p>
              <p class="date">10.05.2023</p>
            </div>
            <p class="content">Пешая доставка от «Туда-Сюда» — отличное решение для города. Курьер добрался быстро и доставил посылку в целости. Очень удобный сервис!</p>
          </div>
          <div class="reviews__review">
            <div class="reviews__review__profile">
              <img src="/images/reviews-page/ava10.png" alt="" class="ava">
              <p class="nick">Ольга Воронова</p>
              <p class="date">08.05.2023</p>
            </div>
            <p class="content">Очень понравилась услуга пешей доставки от «Туда-Сюда». Курьер прибыл вовремя, несмотря на пробки. Обязательно воспользуюсь еще раз. Спасибо за отличный сервис!</p>
          </div>
          <div class="reviews__review">
            <div class="reviews__review__profile">
              <img src="/images/reviews-page/ava11.png" alt="" class="ava">
              <p class="nick">Николай Соколов</p>
              <p class="date">05.05.2023</p>
            </div>
            <p class="content">Впервые воспользовался услугой пешей доставки от «Туда-Сюда» и был приятно удивлен. Курьер прибыл вовремя, доставка прошла без проблем. Рекомендую всем!</p>
          </div>
          <div class="reviews__review">
            <div class="reviews__review__profile">
              <img src="/images/reviews-page/ava12.png" alt="" class="ava">
              <p class="nick">Марина Борисова</p>
              <p class="date">01.05.2023</p>
            </div>
            <p class="content">Пешая доставка от «Туда-Сюда» — это спасение в условиях городского трафика. Курьер был очень профессионален и добрался до меня быстро. Отличный сервис, рекомендую!</p>
          </div>
        </div>

        <div class="reviews__button">
          <a href="javascript:void(0);" class="reviews__button__btn" @click="showMoreReviews">Показать еще</a>
        </div>
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

export default defineComponent({
  components: {
    Header,
    Footer
  },
  methods: {
    showMoreReviews() {
      document.getElementById('hidden-reviews').style.display = 'block';
      document.querySelector('.reviews__button__btn').style.display = 'none';
    }
  }
});
</script>

<style scoped>
@import '/src/styles/reviews-page.scss';
</style>
