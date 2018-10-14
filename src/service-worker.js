/* tslint:disable:no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  /**
   * Welcome to your Workbox-powered service worker!
   *
   * You'll need to register this file in your web app and you should
   * disable HTTP caching for this file too.
   * See https://goo.gl/nhQhGp
   */
  
  workbox.core.setCacheNameDetails({prefix: "howcatch"});
  
  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
}
