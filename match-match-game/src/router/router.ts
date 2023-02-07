import Vue from 'vue';
import VueRouter from 'vue-router';
import GameView from '@/views/GameView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginUserView from '@/views/LoginUserView.vue';
import RegisterUserView from '@/views/RegisterUserView.vue';

Vue.use(VueRouter);

export const routes = {
  home: { path: '/', name: 'home' },
  score: { path: '/score', name: 'best score' },
  login: { path: '/login', name: 'sign in' },
  register: { path: '/register', name: 'sign up' },
};

export const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: routes.home.path,
      name: routes.home.name,
      component: GameView,
    },
    {
      path: routes.score.path,
      name: routes.score.name,
      component: AboutView,
    },
    {
      path: routes.login.path,
      name: routes.login.name,
      component: LoginUserView,
    },
    {
      path: routes.register.path,
      name: routes.register.name,
      component: RegisterUserView,
    },
  ],
});
