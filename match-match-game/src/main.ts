import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import App from './App.vue';
import { router } from './router/router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/const';
import './assets/styles/main.css';

Vue.use(PiniaVuePlugin);

initializeApp(firebaseConfig);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
