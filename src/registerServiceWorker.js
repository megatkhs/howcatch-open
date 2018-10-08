/* tslint:disable:no-console */

import { register } from 'register-service-worker';
import firebase from 'firebase/app';
import 'firebase/messaging';

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
// const config = {
//   apiKey: 'AIzaSyCidI2V__16n6nTa-NRR9mzzYGq4f8Fx4c',
//   authDomain: 'how-catch.firebaseapp.com',
//   databaseURL: 'https://how-catch.firebaseio.com',
//   storageBucket: 'how-catch.appspot.com',
//   messagingSenderId: '635578630039',
// };
// firebase.initializeApp(config);

// const applicationServerPublicKey = 'BOM87LCD54Itr1SlcG3H6uVdQxrhTXamVKRpq7mD8yEVh2lNSb5fNPoW26DJHynwFnp4I21uznTOZOgr7JAHWo0';
// const isSubscribed = false;
// const swRegistration = null;
// const pushButton = document.querySelector('.js-push-btn');

if (process.env.NODE_ENV) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered(swReg) {
      console.log(swReg)
      swRegistration = swReg;
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}if (process.env.NODE_ENV) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered(swReg) {
      console.log(swReg)
      swRegistration = swReg;
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
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

// const messaging = firebase.messaging();

// if ('serviceWorker' in navigator) {
//   // サービスワーカーの登録
//   navigator.serviceWorker.register('/service-worker-push.js').then(function(registration) {
//     // サービスワーカー登録成功
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     // 今回はこのサービスワーカーを指定します
//     messaging.useServiceWorker(registration);
//     messaging.usePublicVapidKey('BOM87LCD54Itr1SlcG3H6uVdQxrhTXamVKRpq7mD8yEVh2lNSb5fNPoW26DJHynwFnp4I21uznTOZOgr7JAHWo0');
//     // 通知の受信許可を確認する
//     messaging.requestPermission()
//       .then(function() {
//         console.log('Notification permission granted.');
//         // トークンを取得する
//         messaging.getToken()
//           .then(function(currentToken) {
//             if (currentToken) {
//               // 今回はコンソールに出力して取得します。実運用では適切な方法で保管する必要があります。
//               console.log(currentToken);
//             } else {
//               console.log('No Instance ID token available. Request permission to generate one.');
//             }
//           })
//           .catch(function(err) {
//             console.log('An error occurred while retrieving token. ', err);
//           });
//       })
//       .catch(function(err) {
//         console.log('Unable to get permission to notify.', err);
//       });
//   }).catch(function(err) {
//     // サービスワーカー登録失敗
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }

// self.addEventListener('push', function(event) {
//   event.waitUntil(
//       self.registration.showNotification(event.data.json().notification.title, {
//           body: event.data.json().notification.body,
//           icon: '/icon.png',
//       }),
//   );
// });
