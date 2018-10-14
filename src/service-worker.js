/* tslint:disable:no-console */
import store from './store';
import { register } from 'register-service-worker';

// if (process.env.NODE_ENV === 'production') {
if (process.env.NODE_ENV) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB',
      );
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      store.state.updateNotice = true;
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}