Meteor.methods({
  serverNotification: function (userId) {
    Push.debug = true
    Push.send({
      from: 'push',
      title: 'Hello World',
      text: 'This notification has been sent from server',
      badge: 1,
      query: {
        userId: userId
      }
    });
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.setInterval( function () {
      var date = new Date();
      var timeNow = moment(date).format("h:mm A");
      var reminderItems = Reminders.find({time: timeNow, on: true});
      console.log(timeNow);
      console.log(reminderItems);
      reminderItems.forEach(function(reminderItem) {
        console.log("send to user" + reminderItem.userId);
        Meteor.call("serverNotification",reminderItem.userId);
      });
    }, 60000);
  });
}