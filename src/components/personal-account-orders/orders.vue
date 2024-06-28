<template>
    <section class="recent-orders" id="recent-orders">
      <div class="container">
        <h2>Заказы</h2>
        <div v-if="orders.length === 0" class="recent-orders__empty">
          <p>В данный момент нет заказов.</p>
        </div>
        <div v-else>
          <div v-for="order in orders" :key="order.order_id" class="recent-orders__order">
            <div class="recent-orders__order__title">
              <p class="recent-orders__order__title__id">ID: {{ order.order_id }}</p>
              <p class="recent-orders__order__title__date">{{ formatDate(order.delivery_date) }}</p>
              <p class="recent-orders__order__title__payment-status">{{ order.payment_status }}</p>
              <a href="" class="recent-orders__order__title__edit">
                <img src="/images/personal-account-page/edit.svg" alt="">
              </a>
            </div>
            <p class="recent-orders__order__type-of-delivery">Вид доставки: {{ order.delivery_method }}</p>
            <p class="recent-orders__order__status">Статус: {{ order.delivery_status }}</p>
            <p class="recent-orders__order__courier">
              Курьер: {{ order.courier_name }}
              <a :href="'tel:' + order.courier_phone">{{ order.courier_phone }}</a>
            </p>
            <p class="recent-orders__order__from">Откуда: {{ order.from_address }}</p>
            <p class="recent-orders__order__to">Куда: {{ order.to_address }}</p>
            <div class="recent-orders__order__bottom">
              <p class="recent-orders__order__bottom__type">Товар: {{ order.product_name }}</p>
              <p class="recent-orders__order__bottom__price">ИТОГО: {{ order.total_price }} ₽</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orders: []
      };
    },
    methods: {
      async fetchOrdersWithoutCourier() {
        try {
          const response = await axios.get('http://localhost:3000/ordersWithoutCourier');
          this.orders = response.data;
  
          // Дополнительная логика для замены id курьера на ФИО и номер телефона
          for (let order of this.orders) {
            if (order.courier_id) {
              const courier = await this.fetchCourierById(order.courier_id);
              order.courier_name = courier ? courier.name : 'Не назначен';
              order.courier_phone = courier ? courier.phone : '';
            } else {
              order.courier_name = 'Не назначен';
              order.courier_phone = '';
            }
          }
        } catch (error) {
          console.error('Ошибка при получении заказов без назначенного курьера:', error.message);
        }
      },
      async fetchCourierById(courierId) {
        try {
          const response = await axios.get(`http://localhost:3000/couriers/${courierId}`);
          return response.data;
        } catch (error) {
          console.error(`Ошибка при получении данных курьера с ID ${courierId}:`, error.message);
          return null;
        }
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
      }
    },
    async mounted() {
      await this.fetchOrdersWithoutCourier();
    }
  };
  </script>

<style>
@import '/src/styles/personalAccountPage.scss';
</style>