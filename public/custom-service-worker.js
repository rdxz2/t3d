/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// there are incoming push notification
self.addEventListener('push', function (event) {
  // get deserialized json payload
  const payload = event.data ? event.data.json() : null;

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload?.body ?? '',
      icon: payload?.icon ?? 'favicon.ico',
      actions: payload?.actions ?? [{ action: 'close', title: 'Close' }],
    })
  );
});

// notification clicked
self.addEventListener('notificationclick', function (event) {
  // close the notification
  event.notification.close();

  switch (event.action) {
    // close -- do nothing
    case 'close':
      break;
    // other
    default:
      // open action url
      if (event.action) event.waitUntil(clients.openWindow(`/${event.action}`));
      break;
  }
});
