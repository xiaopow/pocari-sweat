Lists = new Mongo.Collection('lists');
Reminders = new Mongo.Collection('reminders')

Meteor.methods({
  turnOnReminder: function (time) {
    Reminders.upsert({
      userId: Meteor.userId()
    },
    {
      $set: {
        userId: Meteor.userId(),
        time: time,
        on: true
      }
    });
  },
  turnOffReminder: function () {
    Reminders.upsert({
      userId: Meteor.userId()
    },
    {
      $set: {
        userId: Meteor.userId(),
        on: false
      }
    });
  }
})