<template>
    <div>
      <Header />
      <Profile />
      <RecentOrders />
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import Profile from './personal-account-page/Profile.vue'
  import RecentOrders from './personal-account-page/RecentOrders.vue'
  
  export default defineComponent({
    components: {
      Header,
      Profile,
      RecentOrders,
      Footer
    },
  });
  </script>
  
  <style>
  @import '/src/styles/personalAccountPage.scss'
  </style>
  