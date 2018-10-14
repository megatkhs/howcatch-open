import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { sync } from 'vuex-router-sync'

sync(store, router)

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars, faTimes, faAngleLeft, faAngleRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import './assets/scss/style.scss';

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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

