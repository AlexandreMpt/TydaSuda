<template>
  <footer>
    <div class="container">
      <div class="footer__block">
        <div class="footer__block__company">
          <p>© 2023 - 2024</p>
          <p>ООО “Туда-Сюда”</p>
          <p>ОГРН 1111111111</p>
          <p>ИНН 1111111111</p>
          <p>КПП 1111111111</p>
        </div>
        <nav class="footer__block__menu">
          <a href="index.html">Главная</a>
          <a href="AboutUs.html">О нас</a>
          <a href="reviews.html">Отзывы</a>
          <a href="Services.html">Услуги</a>
          <a href="#" class="open-auth-modal">Личный кабинет</a>
        </nav>
        <div class="footer__block__work-schedule">
          <p>График работы:</p>
          <p>Круглосуточно</p>
          <p>Поддержка с 8 до 22</p>
          <p>Работаем во всех крупных городах России!</p>
        </div>
        <div class="footer__block__info">
          <p>Контакты:</p>
          <p><a href="mailto:tuda-suda@gmail.com">tuda-suda@gmail.com</a></p>
          <p><a href="tel:+79998887766">8 (999) 888-77-66</a></p>
          <p>Адрес: <address>119017, г. Москва, ул. Большая Ордынка, д. 20</address></p>
        </div>
      </div>
      <div class="support-button" 
           @click="openSupportModal"
           :class="{ shake: isShaking }">
        <img src="/images/main-page/support.svg" alt="Поддержка">
      </div>
    </div>
    <!-- Modal -->
    <div class="modal" :class="{ 'active': isModalVisible }">
      <div class="modal__content">
        <div class="modal__header">
          <h4><img src="/images/main-page/chat.svg" alt=""> Напиши нам, мы на связи!</h4>
          <span class="modal__close" @click="closeSupportModal">&times;</span>
        </div>
        <div class="chat-container" ref="chatContainer">
        <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'user-message': message.isUser }">
          {{ message.text }}
        </div>
      </div>
        <div class="modal__footer">
          <input type="text" placeholder="Введите сообщение..." v-model="userMessage" @keyup.enter="sendMessage">
          <a class="modal__footer__btn" href="#" @click="sendMessage"><img src="/images/main-page/send.svg" alt=""></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
      isShaking: false,
      userMessage: '',
      messages: []
    };
  },
  methods: {
    openSupportModal() {
      this.isModalVisible = true;
      this.handleBotResponse('привет');
    },
    closeSupportModal() {
      this.isModalVisible = false;
    },
    triggerShake() {
      this.isShaking = true;
      setTimeout(() => {
        this.isShaking = false;
      }, 500); // Duration of the shake animation
    },
    handleBotResponse(message) {
      const lowerCaseMessage = message.toLowerCase();

      if (lowerCaseMessage.includes('привет')) {
        this.messages.push({
          text: "Привет! Проконсультирую по основным вопросам: стоимость, оформить заказ, способы оплаты, отследить статус, проблемы с доставкой",
          isUser: false
        });
      } else if (lowerCaseMessage.includes('стоимость') || lowerCaseMessage.includes('рассчитать доставку')) {
        this.messages.push({
          text: "Для расчета стоимости доставки используйте наш калькулятор на главной странице. Укажите тип товара, расстояние и желаемое время доставки, и система автоматически рассчитает стоимость.",
          isUser: false
        });
      } else if (lowerCaseMessage.includes('оформить заказ') || lowerCaseMessage.includes('заказ на доставку')) {
        this.messages.push({
          text: "Чтобы оформить заказ, воспользуйтесь формой на сайте. Выберите тип доставки, заполните необходимые поля (адрес, контактные данные и т.д.), и подтвердите заказ.",
          isUser: false
        });
      } else if (lowerCaseMessage.includes('способы оплаты') || lowerCaseMessage.includes('оплата')) {
        this.messages.push({
          text: "Мы принимаем оплату банковскими картами (Visa, MasterCard), а также наличными при получении. Все доступные способы оплаты указаны на странице 'Способы оплаты' на нашем сайте.",
          isUser: false
        });
      } else if (lowerCaseMessage.includes('отследить статус') || lowerCaseMessage.includes('мой заказ')) {
        this.messages.push({
          text: "Войдите в личный кабинет и перейдите в раздел 'Мои заказы'. Здесь вы сможете увидеть текущий статус вашего заказа и трек-номер для отслеживания.",
          isUser: false
        });
      } else if (lowerCaseMessage.includes('проблемы с доставкой') || lowerCaseMessage.includes('помощь с доставкой')) {
        this.messages.push({
          text: "Если у вас возникли проблемы с доставкой, пожалуйста, свяжитесь с нашей службой поддержки через форму обратной связи на сайте или по телефону, указанному в разделе 'Контакты'. Наши специалисты помогут решить вашу проблему в кратчайшие сроки.",
          isUser: false
        });
      } else {
        this.messages.push({
          text: "Если у вас остались вопросы, напишите на почту tudasuda@gmail.com.",
          isUser: false
        });
      }

      // Прокрутка чата только при получении ответа от бота
      this.scrollToBottom();
    },
    sendMessage() {
      if (this.userMessage.trim() === '') return;

      this.messages.push({
        text: this.userMessage,
        isUser: true
      });
      this.userMessage = '';

      // Вызываем обработку ответа от бота
      this.handleBotResponse(this.messages[this.messages.length - 1].text);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer;
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    }
  },
  mounted() {
    // Запускаем тряску кнопки каждые 20 секунд
    setInterval(() => {
      this.triggerShake();
    }, 20000);
  }
};
</script>


<style scoped>
@import '/src/styles/main.scss';

.chat-container {
  overflow-y: auto;
  height: 500px; /* Укажите максимальную высоту для контейнера чата */
}
.message {
  padding: 4px;
  margin-bottom: 5px;
  max-width: 90%;
  font-family: Segoe UI;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: left;
  margin-left: 10px;
}
.user-message {
  color: #f0f0f0 !important;
  align-self: flex-end;
  font-family: Segoe UI;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: left;
  margin-left: 10px;
}


@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake {
  animation: shake 0.5s;
}


.support-button{
  position: fixed;
  right: 40px;
  bottom: 40px;
}

.modal {
  display: none;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  align-items: center;
}

.modal.active {
  display: flex;
}

.modal__content {
  background-color: #1c1c1c;
  border-radius: 10px;
  color: white;
  width: 433px;
  height: 675px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  border: 3px solid rgb(30, 30, 30);
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.modal__header h4 {
  display: flex;
  margin: 0 auto;
  color: rgb(232, 232, 232);
  font-family: Segoe UI;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: left;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
}

.modal__header img{
  margin-right: 15px;
}

.modal__close {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 50px;
  cursor: pointer;
  color: rgb(83, 187, 1);
}

.modal__body {
  padding: 10px;
  height: 480px;
  width: 413px;
  background: rgb(255, 255, 255);
}

.modal__footer {
  display: flex;
  align-items: center;
}

.modal__footer input {
  padding: 10px 60px 10px 10px;
  flex: 1;
  border: none;
  border-radius: 0 0 8px 8px;
  outline: none;
  height: 52px;
  border-top: 3px solid rgb(30, 30, 30);
  color: rgba(30, 30, 30, 0.6);
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
}

.modal__footer__btn{
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.modal__footer button {
  background-color: #00b300;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.message, .message message--user{
  color: #00b300;
}

@media (max-width: 431px) {
  .support-button{
  position: fixed;
  right: -40px;
  bottom: 10px;
}


.chat-container {
  overflow-y: auto;
  height: 250px; /* Укажите максимальную высоту для контейнера чата */
}
.message {
  padding: 1px;
  margin-bottom: 5px;
  max-width: 90%;
  font-family: Segoe UI;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0%;
  text-align: left;
  margin-left: 10px;
}
.user-message {
  color: #f0f0f0 !important;
  align-self: flex-end;
  font-family: Segoe UI;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0%;
  text-align: left;
  margin-left: 10px;
}

.support-button img{
  width: 50%;
  height: 50%;
}
.modal__content {
  background-color: #1c1c1c;
  border-radius: 10px;
  color: white;
  width: 250px;
  height: 365px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  border: 3px solid rgb(30, 30, 30);
}
.modal__body {
  padding: 10px;
  height: 232px;
  width: 230px;
  background: rgb(255, 255, 255);
}
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0px;
}
.modal__header h4 {
  display: flex;
  margin: 0 auto;
  color: rgb(232, 232, 232);
  font-family: Segoe UI;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
}
.modal__footer input {
  padding: 5px 40px 10px 5px;
  flex: 1;
  border: none;
  border-radius: 0 0 8px 8px;
  outline: none;
  height: 30px;
  border-top: 3px solid rgb(30, 30, 30);
  color: rgba(30, 30, 30, 0.6);
  font-family: Segoe UI;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: left;
}
.modal__footer__btn{
  position: absolute;
  bottom: 12px;
  right: 0px;
}
.modal__footer__btn img{
  width: 50%;
  height: 50%;
}
.modal__close {
  position: absolute;
  top: -5px;
  right: 10px;
  font-size: 35px;
  cursor: pointer;
  color: rgb(83, 187, 1);
}
}

</style>