module.exports = {
  pages: {
    index: {
      entry: './src/main.js'
    },
  },
  pwa: {
    name: 'ハウキャッチ',
    themeColor: '#000000',
    // workboxOptions: {
    //   importScripts: ['/service-worker-push.js'],
    // }
  },
}