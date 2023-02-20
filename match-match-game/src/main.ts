import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import App from './App.vue';
import { router } from './router/router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/const';
import BaseButton from './ui/BaseButton.vue';
import BaseInput from './ui/BaseInput.vue';
import BaseErrorField from './ui/BaseErrorField.vue';
import './styles/main.css';

Vue.use(PiniaVuePlugin);

Vue.component('BaseButton', BaseButton);
Vue.component('BaseInput', BaseInput);
Vue.component('BaseErrorField', BaseErrorField);

initializeApp(firebaseConfig);

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
