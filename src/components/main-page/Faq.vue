<template>
    <section class="faq" id="faq">
      <div class="container">
        <div class="faq__block">
          <h2>FAQ</h2>
          <div v-for="(faq, index) in faqs" :key="index" class="faq__block__point">
            <div class="faq__block__point__question" @click="toggleAnswer(index)">
              <p>{{ faq.question }}</p>
              <a href="javascript:void(0)">
                <img src="/images/main-page/down-arrow.svg" alt="" :class="{ rotated: faq.isOpen }">
              </a>
            </div>
            <transition name="fade">
              <div class="faq__block__point__answer" v-if="faq.isOpen">
                <p>{{ faq.answer }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        faqs: [
          {
            question: "1. Как рассчитать стоимость доставки?",
            answer: "Для расчета стоимости доставки используйте наш калькулятор на главной странице. Укажите тип товара, расстояние и желаемое время доставки, и система автоматически рассчитает стоимость.",
            isOpen: false,
          },
          {
            question: "2. Как оформить заказ на доставку?",
            answer: "Чтобы оформить заказ, воспользуйтесь формой на сайте. Выберите тип доставки, заполните необходимые поля (адрес, контактные данные и т.д.), и подтвердите заказ.",
            isOpen: false,
          },
          {
            question: "3. Какие способы оплаты доступны?",
            answer: "Мы принимаем оплату банковскими картами (Visa, MasterCard), , а также наличными при получении. Все доступные способы оплаты указаны на странице 'Способы оплаты' на нашем сайте.",
            isOpen: false,
          },
          {
            question: "4. Как отследить статус моего заказа?",
            answer: "Войдите в личный кабинет и перейдите в раздел 'Мои заказы'. Здесь вы сможете увидеть текущий статус вашего заказа и трек-номер для отслеживания.",
            isOpen: false,
          },
          {
            question: "5. Что делать, если возникли проблемы с доставкой?",
            answer: "Если у вас возникли проблемы с доставкой, пожалуйста, свяжитесь с нашей службой поддержки через форму обратной связи на сайте или по телефону, указанному в разделе 'Контакты'. Наши специалисты помогут решить вашу проблему в кратчайшие сроки.",
            isOpen: false,
          },
        ],
      };
    },
    methods: {
      toggleAnswer(index) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  @import '/src/styles/main.scss';
  
  .faq {
    background: rgb(30, 30, 30);
    &__block {
      width: 1160px;
      padding-bottom: 80px;
      h2 {
        padding: 45px 0 60px 0;
        color: rgb(83, 187, 1);
        text-align: center;
      }
      &__point {
        border-top: 1px solid rgb(83, 187, 1);
        border-bottom: 1px solid rgb(83, 187, 1);
        padding: 29px 21px 29px 30px;
        p {
          color: rgb(83, 187, 1);
          font-size: 20px;
        }
        &__question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
        &__answer {
          padding: 10px 0;
          p {
            color: white;
            font-size: 18px;
            opacity: 0; /* начальное состояние */
            transition: opacity 0.3s;
          }
        }
      }
    }
  }
  
  img.rotated {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
  }
  </style>
  