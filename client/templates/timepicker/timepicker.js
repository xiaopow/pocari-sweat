Template.timePicker.onRendered(function() {
  
  this.$('#datetimepicker3').datetimepicker({
    format: 'LT'
  });
  this.$('#datetimepicker3 input').val("10:00 AM");
  // this.autorun(function(){
  //   $('#noti-toggle').bootstrapToggle();
  // });

});

Template.timePicker.events({
  "click #turn-reminder-on": function () {
    $("#reminder-on").toggleClass("hide");
    $("#reminder-off").toggleClass("hide");
    var newTime = $('#datetimepicker3 input').val()
    var date = new Date();
    console.log(moment(date).format("h:mm A"));
    Meteor.call("turnOnReminder",newTime);
  },
  "click #turn-reminder-off": function () {
    $("#reminder-on").toggleClass("hide");
    $("#reminder-off").toggleClass("hide");
    Meteor.call("turnOffReminder");
  }
})