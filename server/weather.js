Meteor.methods({
  getWeather: function () {
    return currentForecast;
  }
});

if (Meteor.isServer) {
  var currentForecast;
  Meteor.methods({
    checkWeather: function () {
      this.unblock();
      return Meteor.http.call("GET", "http://api.wunderground.com/api/ae9edf44c621f36c/forecast/q/HongKong.json");
    }
  });
  Meteor.startup(function () {
    Meteor.call("checkWeather", function(err, res) {
      currentForecast = res.data;
      console.log(res.data);
    });
    Meteor.setInterval( function () {
      Meteor.call("checkWeather", function(err, res) {
        currentForecast = res.data;
      });
    }, 3600000 );
  });
}