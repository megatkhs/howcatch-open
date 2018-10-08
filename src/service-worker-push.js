importScripts('service-worker.js');

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.pushManager.getSubscription()
      .then(function(subscription) {
        if (subscription) {
          return subscription.endpoint
        }
        throw new ErrorEvent('User not subscribed')
      })
      .then(function(res) {
        return self.registration.showNotification('title', {
          body: 'contents'
        })
      })
  )
})