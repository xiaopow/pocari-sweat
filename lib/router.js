Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('reminders')
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  // dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('join');
  this.route('signin');

  this.route('main', {
    path: '/main',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    // onBeforeAction: function () {
    //   this.todosHandle = Meteor.subscribe('todos', this.params._id);

    //   if (this.ready()) {
    //     // Handle for launch screen defined in app-body.js
    //     dataReadyHold.release();
    //   }
    // }
  });

  this.route('home', {
    path: '/',
    action: function() {
      Router.go('main');
    }
  });

  this.route('api', {
    path: '/api',
    where: 'server',
    action: function () {
      var forecast
      var condition
      Meteor.call("getWeather", function(err, result) {
        forecast = result;
      });
      Meteor.call("getCondition", function(err, result) {
        condition = result;
      });
      var json = {forecast: forecast, condition: condition};
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('forecast', {
    path: '/forecast',
    where: 'server',
    action: function () {
      var forecast
      Meteor.call("getWeather", function(err, result) {
        forecast = result.forecast.txt_forecast.forecastday;
      });
      var json = {forecast: forecast};
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });

  this.route('temp', {
    path: '/temp',
    where: 'server',
    action: function () {
      var temp
      Meteor.call("getCondition", function(err, result) {
        temp = result.current_observation.temp_c;
      });
      var json = {temp: temp};
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
  });
});
