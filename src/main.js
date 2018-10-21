import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { sync } from 'vuex-router-sync'

sync(store, router)

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faAngleLeft, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars, faTimes, faAngleLeft, faAngleRight, faAngleDown);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import './assets/scss/style.scss';
import './service-worker.js';

Vue.config.productionTip = false;

window.addEventListener('touchmove', (event) => {
  event.preventDefault();
}, { passive: false });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

store.commit('saveload');
