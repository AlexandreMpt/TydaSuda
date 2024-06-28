<template>
    <div>
      <Header />
      <accountBar />
      <orders />
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import accountBar from './personal-account-orders/accountBar.vue'
  import orders from './personal-account-orders/orders.vue'
  
  export default defineComponent({
    components: {
      Header,
      accountBar,
      orders,
      Footer
    },
  });
  </script>
  
  <style>
  @import '/src/styles/personalAccountPage.scss'
  </style>
  