Meteor.methods({
  getWeather: function () {
    return currentForecast;
  },
  getCondition: function () {
    return currentTemperature;
  }
});

if (Meteor.isServer) {
  var currentForecast;
  var currentTemperature;
  Meteor.methods({
    checkWeather: function () {
      this.unblock();
      return Meteor.http.call("GET", "http://api.wunderground.com/api/ae9edf44c621f36c/forecast/q/HongKong.json");
    },
    checkCurrentTemperature: function () {
      this.unblock();
      return Meteor.http.call("GET", "http://api.wunderground.com/api/8ee1d8e69bd10cf8/conditions/q/HongKong.json");
    }
  });
  Meteor.startup(function () {
    Meteor.call("checkWeather", function(err, res) {
      currentForecast = res.data;
      console.log(res.data);
    });
    Meteor.call("checkCurrentTemperature", function(err, res) {
      currentTemperature = res.data;
      console.log(currentTemperature);
    });
    Meteor.setInterval( function () {
      Meteor.call("checkCurrentTemperature", function(err, res) {
        currentTemperature = res.data;
      });
    }, 600000);
    Meteor.setInterval( function () {
      Meteor.call("checkWeather", function(err, res) {
        currentForecast = res.data;
      });
    }, 3600000 );
  });
}