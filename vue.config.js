const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: './src/main.js'
    },
  },
  pwa: {
    name: 'ハウキャッチ',
    themeColor: '#000000',
    // importWorkboxFrom: 'cdn',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'src/service-worker.js',
    //   swDest: 'service-worker.js'
    // },
  },
}