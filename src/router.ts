import Vue from 'vue';
import Router from 'vue-router';
import Title from './views/Title.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'title',
      component: Title,
    },
    {
      path: '/character',
      name: 'character',
      component: () => import(/* webpackChunkName: "character" */ './views/CharacterSelect.vue'),
    },
  ],
});
