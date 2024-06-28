<template>
    <div>
      <Header />
      <About />
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import About from './about-us-page/About.vue';
  
  export default defineComponent({
    components: {
      Header,
      About,
      Footer
    },
  });
  </script>
  
  <style>
  @import '/src/styles/aboutUsPage.scss'
  </style>
  