Template.timePicker.onRendered(function() {
  
  this.$('#datetimepicker3').datetimepicker({
    format: 'LT'
  });
  this.$('#datetimepicker3 input').val("10:00 AM");
  this.autorun(function(){
    $('#noti-toggle').bootstrapToggle();
  });

});