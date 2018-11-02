const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: './src/main.js'
    },
  },
  pwa: {
    name: 'ハウキャッチ',
    themeColor: '#c8eaff',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
    // importWorkboxFrom: 'cdn',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'src/service-worker.js',
    //   swDest: 'service-worker.js'
    // },
  },
}