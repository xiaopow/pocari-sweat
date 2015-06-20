Template.timePicker.onRendered(function() {

  this.$('#datetimepicker3').datetimepicker({
    format: 'LT'
  });

});

Template.timePicker.helpers({
  reminderTime: function () {
    var reminderTime = Reminders.find({}).fetch()[0];
    return reminderTime.time
  },
  reminderOn: function () {
    var reminderTime = Reminders.find({}).fetch()[0];
    return reminderTime.on
  }
})

Template.timePicker.events({
  "click #turn-reminder-on": function () {
    var newTime = $('#datetimepicker3 input').val()
    Meteor.call("turnOnReminder",newTime);
  },
  "click #turn-reminder-off": function () {
    Meteor.call("turnOffReminder");
  }
})