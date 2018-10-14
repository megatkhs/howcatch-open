import Vue from 'vue';
import Router from 'vue-router';
import Title from './views/Title.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/sandbox',
    },
    {
      path: '/',
      name: 'title',
      component: Title,
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import(/* webpackChunkName: "character" */ './views/SandboxScreen.vue'),
    },
    {
      path: '/character',
      name: 'character',
      component: () => import(/* webpackChunkName: "character" */ './views/CharacterSelect.vue'),
    },
    {
      path: '/character/:id',
      name: 'stage',
      component: () => import(/* webpackChunkName: "stage" */ './views/StageSelect.vue'),
    },
    {
      path: '/stage/:id',
      name: 'game',
      component: () => import(/* webpackChunkName: "game" */ './views/GameScreen.vue'),
    },
    {
      path: '/clear/:id',
      name: 'clear',
      component: () => import(/* webpackChunkName: "clear" */ './views/ClearScreen.vue'),
    },
  ],
});
