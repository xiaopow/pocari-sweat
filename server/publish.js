Meteor.publish('reminders', function() {
  if (this.userId) {
    return Reminders.find({userId: this.userId});
  } else {
    this.ready();
  }
});
