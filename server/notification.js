Meteor.methods({
  serverNotification: function (userId,text) {
    Push.debug = true
    Push.send({
      from: 'push',
      title: 'Brella',
      text: text,
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
      var data = Meteor.call('getWeather');
      var chanceOfRain = data.forecast.txt_forecast.forecastday[0].pop
      var message = "The chance of rain now is " + chanceOfRain + "%"
      console.log(message);
      console.log(timeNow);
      reminderItems.forEach(function(reminderItem) {
        console.log("send to user" + reminderItem.userId);
        Meteor.call("serverNotification",reminderItem.userId);
      });
    }, 60000);
  });
}