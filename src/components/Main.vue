<template>
  <div>
    <Header />
    <Welcome />
    <DeliveryOrder />
    <TypesGoods />
    <Partners />
    <PaymentMethods />
    <Faq />
    <Help />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from './Header.vue';
import Welcome from './main-page/Welcome.vue';
import DeliveryOrder from './main-page/Delivery-order.vue';
import TypesGoods from './main-page/Types-goods.vue';
import Partners from './main-page/Partners.vue';
import PaymentMethods from './main-page/Payment-methods.vue';
import Faq from './main-page/Faq.vue';
import Help from './main-page/Help.vue';
import Footer from './Footer.vue';

export default defineComponent({
  components: {
    Header,
    Welcome,
    DeliveryOrder,
    TypesGoods,
    Partners,
    PaymentMethods,
    Faq,
    Help,
    Footer
  },
});
</script>

<style scoped>
@import '/src/styles/main.scss';
</style>
