Meteor.methods({
  serverNotification: function () {
    Push.debug = true
    Push.send({
      from: 'push',
      title: 'Hello World',
      text: 'This notification has been sent from server',
      badge: 1,
      query: {
        userId: "SZxFnJDbr8E7hxfRc"
      }
    });
  }
});