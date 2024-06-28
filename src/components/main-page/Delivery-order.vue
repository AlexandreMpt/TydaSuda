<template>
  <section class="delivery-order" id="delivery-order">
    <div class="container">
      <h2>Заказать доставку</h2>
      <div class="delivery-order__block">
        <img src="/images/main-page/clover.svg" alt="">
        <div class="delivery-order__block__form">
          <form class="delivery-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <img src="/images/main-page/mark-form.svg" alt="">
              <input type="text" id="from" v-model="from" placeholder="Откуда" @input="getSuggestions('from')">
              <ul v-if="suggestions.from.length">
                <li v-for="(suggestion, index) in suggestions.from" :key="index" @click="selectSuggestion('from', suggestion)">{{ suggestion.address.freeformAddress }}</li>
              </ul>
            </div>
            <div class="form-group">
              <img src="/images/main-page/mark-form.svg" alt="">
              <input type="text" id="to" v-model="to" placeholder="Куда" @input="getSuggestions('to')">
              <ul v-if="suggestions.to.length">
                <li v-for="(suggestion, index) in suggestions.to" :key="index" @click="selectSuggestion('to', suggestion)">{{ suggestion.address.freeformAddress }}</li>
              </ul>
            </div>
            <div class="form-group">
              <img src="/images/main-page/calendar-form.svg" alt="">
              <input type="datetime-local" id="datetime" v-model="datetime">
            </div>
            <div class="form-group transport-options">
              <input type="radio" id="walk" name="transport" value="Пешком" v-model="transport">
              <label for="walk">Пешком</label>
              <input type="radio" id="car" name="transport" value="Автомобиль" v-model="transport">
              <label for="car">Автомобиль</label>
              <input type="radio" id="truck" name="transport" value="Грузовой" v-model="transport">
              <label for="truck">Грузовой</label>
            </div>
            <div class="form-group">
              <img src="/images/main-page/box-form.svg" alt="">
              <select id="item" v-model="item">
                <option value="" disabled selected>Товар</option>
                <option value="Документы">Документы</option>
                <option value="Подарок">Подарок</option>
                <option value="Мебель">Мебель</option>
                <option value="Одежда">Одежда</option>
                <option value="Электроника">Электроника</option>
                <option value="Бытовая техника">Бытовая техника</option>
                <option value="Продукты питания">Продукты питания</option>
                <option value="Косметика и парфюмерия">Косметика и парфюмерия</option>
                <option value="Книги">Книги</option>
                <option value="Игрушки">Игрушки</option>
                <option value="Другое">Другое</option>
              </select>
            </div>
            <div class="form-group">
              <img src="/images/main-page/rub-form.svg" alt="">
              <input type="text" id="total" v-model="total" placeholder="Итого" readonly>
            </div>
            <button type="submit">Заказать доставку</button>
          </form>
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
      from: '',
      to: '',
      datetime: '',
      transport: '', // тип транспорта ('пешком', 'автомобиль', 'грузовой')
      item: '',
      total: '',
      suggestions: {
        from: [],
        to: []
      },
      selectedLocations: {
        from: null,
        to: null
      }
    };
  },
  watch: {
    transport() {
      console.log(`Тип транспорта изменен: ${this.transport}`);
      if (this.selectedLocations.from && this.selectedLocations.to) {
        this.calculateDistance();
      }
    }
  },
  methods: {
    async getSuggestions(field) {
      const input = this[field];
      if (input.length > 2) {
        const response = await axios.get(`https://api.tomtom.com/search/2/search/${input}.json`, {
          params: {
            key: '3Fk2JgbPqsRTAEzI3BakYrisiYg82a4a',
            language: 'ru-RU'
          }
        });
        this.suggestions[field] = response.data.results;
      } else {
        this.suggestions[field] = [];
      }
    },
    selectSuggestion(field, suggestion) {
      this[field] = suggestion.address.freeformAddress;
      this.selectedLocations[field] = suggestion.position;
      this.suggestions[field] = [];
      console.log(`Координаты ${field}: ${this.selectedLocations[field].lat}, ${this.selectedLocations[field].lon}`);
      if (this.selectedLocations.from && this.selectedLocations.to) {
        this.calculateDistance();
      }
    },
    calculateDistance() {
      if (this.selectedLocations.from && this.selectedLocations.to) {
        const distance = this.calculateDistanceByCoordinates(this.selectedLocations.from, this.selectedLocations.to);
        console.log(`Расстояние по координатам: ${distance.toFixed(2)} км`);
        const cost = this.calculateCost(distance);
        this.total = `${cost.toFixed(2)} рублей`;
        console.log(`Стоимость доставки: ${cost.toFixed(2)} рублей`);
      } else {
        this.total = 'Не удалось рассчитать расстояние';
      }
    },
    calculateDistanceByCoordinates(from, to) {
      const earthRadiusKm = 6371; // Радиус Земли в км
      const dLat = this.degreesToRadians(to.lat - from.lat);
      const dLon = this.degreesToRadians(to.lon - from.lon);
      const lat1 = this.degreesToRadians(from.lat);
      const lat2 = this.degreesToRadians(to.lat);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    },
    degreesToRadians(degrees) {
      return degrees * (Math.PI / 180);
    },
    calculateCost(distance) {
      console.log(`Тип транспорта при расчете стоимости: ${this.transport}`);
      let ratePerKm;
      switch (this.transport.toLowerCase()) {
        case 'пешком':
          ratePerKm = 80;
          break;
        case 'автомобиль':
          ratePerKm = 100;
          break;
        case 'грузовой':
          ratePerKm = 140;
          break;
        default:
          ratePerKm = 0;
          break;
      }
      console.log(`Тариф за км: ${ratePerKm}`);
      return distance * ratePerKm;
    },
    async handleSubmit() {
      try {
        // Запрашиваем информацию о текущем пользователе с сервера
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

        // Проверяем наличие авторизованного пользователя
        if (loggedInUsers.length === 0) {
          alert('Для оформления заказа необходимо авторизоваться.');
          return;
        }

        // Преобразуем строку total в числовое значение
        const totalValue = parseFloat(this.total.replace(/[^\d.-]/g, '')); // Удаляем все символы, кроме цифр, точек и минусов

        // Если пользователь авторизован, выполняем запрос на создание заказа
        const orderResponse = await axios.post('http://localhost:3000/submitOrder', {
          user_id: loggedInUsers[0].id,
          from: this.from,
          to: this.to,
          datetime: this.datetime,
          transport: this.transport,
          item: this.item,
          total: totalValue // Используем преобразованное числовое значение total
        });

        console.log(orderResponse.data.message);
        alert('Заказ успешно отправлен!');

        // Очищаем форму после успешного заказа
        this.resetForm();
      } catch (error) {
        console.error('Ошибка при отправке заказа:', error.message);
        alert('Произошла ошибка при отправке заказа.');
      }
    },
    resetForm() {
      this.from = '';
      this.to = '';
      this.datetime = '';
      this.transport = '';
      this.item = '';
      this.total = '';
      this.suggestions = {
        from: [],
        to: []
      };
      this.selectedLocations = {
        from: null,
        to: null
      };
    }
  }
};
</script>






<style scoped>
@import '/src/styles/main.scss';

.delivery-order__block__form {
  position: relative;
}

ul {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background: #f0f0f0;
}
</style>
