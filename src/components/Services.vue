<template>
    <div>
      <Header />
      <services />
      <tariffs />
      <help />
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Header from './Header.vue';
  import Help from './main-page/Help.vue';
  import Footer from './Footer.vue';
  import services from './services-page/services.vue'
  import tariffs from './services-page/tariffs.vue'
  
  export default defineComponent({
    components: {
      Header,
      services,
      tariffs,
      Help,
      Footer
    },
  });
  </script>
  
  <style>
  @import '/src/styles/services-page.scss';
  </style>
  