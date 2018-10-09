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
import './registerServiceWorker';

Vue.config.productionTip = false;

window.addEventListener('touchmove', (event) => {
  event.preventDefault();
}, { passive: false });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// Indexed database
const dbName = store.state.dbName;
const openReq = indexedDB.open(dbName);
let db, index, objStore;

openReq.onupgradeneeded = event => {
  db = event.target.result;
  objStore = db.createObjectStore('SaveData', {keyPath: 'stageId'});
}

openReq.onsuccess = event => {
  db = event.target.result;
  var tx = db.transaction('SaveData', 'readwrite')
  objStore = tx.objectStore('SaveData')

  objStore.put({stageId: 2, status: 1});

  // データの追加
  store.state.characters.forEach(v => {
    v.stages.forEach(v => {
      let stage = objStore.get(v);
      stage.onsuccess = event => {
        if (!stage.result) {
          objStore.put({stageId: v, status: 0});
          
          stage = objStore.get(v);
          stage.onsuccess = event => {
            store.commit('saveload', stage.result);
          }
        } else {
          store.commit('saveload', stage.result);
        }
      }
    })
  })
}