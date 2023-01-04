import Vue from 'vue';
import VueRouter from 'vue-router';
import GameView from '@/views/GameView.vue';
import AboutView from '@/views/AboutView.vue';

Vue.use(VueRouter);

export const routes = {
  home: { path: '/', name: 'home' },
  score: { path: '/score', name: 'best score' },
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
  ],
});
