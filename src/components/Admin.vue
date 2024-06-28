<template>
    <div>
      <Header />
      <accountBar />
      <adminBlock />
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import accountBar from './admin-page/accountBar.vue'
  import adminBlock from './admin-page/adminBlock.vue'
  
  export default defineComponent({
    components: {
      Header,
      accountBar,
      adminBlock,
      Footer
    },
  });
  </script>
  
  <style>
  @import '/src/styles/personalAccountPage.scss'
  </style>
  