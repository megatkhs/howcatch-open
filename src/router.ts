import Vue from 'vue';
import Router from 'vue-router';
import Title from './views/Title.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'title',
      component: Title,
    },
    // {
    //   path: '/character',
    //   name: 'character',
    //   component: () => import(/* webpackChunkName: "character" */ './views/CharacterSelect.vue'),
    // },
    // {
    //   path: '/character/:id',
    //   name: 'stage',
    //   component: () => import(/* webpackChunkName: "stage" */ './views/StageSelect.vue'),
    // },
    // {
    //   path: '/stage/:id',
    //   name: 'game',
    //   component: () => import(/* webpackChunkName: "game" */ './views/GameScreen.vue'),
    // },
    // {
    //   path: '/clear/:id',
    //   name: 'clear',
    //   component: () => import(/* webpackChunkName: "clear" */ './views/ClearScreen.vue'),
    // },
  ],
});
