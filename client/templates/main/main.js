
// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;
var dateTime = "";

var brellaMessages = {
  
  lowChance: ["There probably won't be rain today, keep your Brella at home...",
  "The chance of rain is about the same as your chances of dating Jennifer Lawrence or Chris Pratt... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Scarlett Johansson or Chris Hemsworth... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Taylor Swift or Chris Evans... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Jessica Alba or Channing Tatum... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Mila Kunis or Tom Hiddleston... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Kate Upton or Henry Cavill... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Olivia Wilde or Liam Hemsworth... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Christina Aguilera or Ryan Gosling... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Beyonce or Andrew Garfield... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Margot Robbie or James McAvoy... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Miranda Kerr or Bruno Mars... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Charlize Theron or Stephen Amell... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Miley Cyrus or Michael Buble... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Emma Stone or Joseph Gordon-Levitt... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Zoe Saldana or Justin Timberlake... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Jennifer Love Hewitt or Chris Pine... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Jennerifer Lopez or Bradley Cooper ... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Shakira or Michael Fassbender... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Gina Carano or Christian Bale... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Katy Perry or James Franco... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Emilia Clarke or John Mayer... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Sofia Vergara or Orlando Bloom... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Jaimie Alexander or Robert Downey Jr.... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Ana Ivanovic or Aaron Taylor-Johnson... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Gal Gadot or Jamie Foxx... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Iggy Azalea or Idris Elba... Keep your Brella at home.",
  "The chance of rain is about the same as your chances of dating Andrianne Palicki or Kit Harington... Keep your Brella at home."],

  slightChance: ["There will be a slight chance of rain today... bring your Brella if you want to be safe, or leave it... I don't care.",
  "There will be a slight chance of rain today... you probably won't need your Brella... but if it rains, totally not my fault...",
  "There will be a slight chance of rain today... leave your Brella at home... you most probably won't need it."],

  chance: ["There will be a chance of rain today... I'd bring your Brella out with you... Unless you are feeling adventurous... I really don't care actually.",
  "There will be a chance of rain today... Flip a coin, heads you bring your Brella, tails you don't... Channel your inner Harvey Dent"],

  likelyChance: ["There is a very likely chance of rain today... Bring your Brella... Unless you like living on the edge.",
  "There is a very likely chance of rain today... Bring your Brella... Or don't... I really don't care if you get wet.",
  "There is a very likely chance of rain today... Bring your Brella... You will be glad you did..."],
  extremeChance: ["There is an extremely high chance it will rain today... Seriously, bring your Brella... don't be a fool.",
  "There is an extremely high chance it will rain today... Bring your Brella please... Seriously..."],

  itWillRain: ["Todays lesson is: Don't Do Drugs, Stay In School Kids, and Bring Your Brella...",
  "Smart people will bring their Brella, Hell... dumb people too",
  "Roses are red, violets are blue, rain is clear, bring your damn Brella.",
  "What goes up when the rain comes down? You're Brella, bring it with you today...",
  "You'll be Singing In the Rain... if you don't bring your Brella.",
  "I dare you to leave your Brella at home... Do it..."]

};

Template.main.onRendered(function() {
  if (firstRender) {
    // Released in app-body.js
    listFadeInHold = LaunchScreen.hold();

    // Handle for launch screen defined in app-body.js
    listRenderHold.release();

    firstRender = false;
  }
  this.find('.js-title-nav')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        this.remove();
      });
    }
  };
});

Template.main.helpers({
  weatherReady: function() {
    return true
  },
  chanceOfRain: function() {
    var data = ReactiveMethod.call("getWeather");
    return data.forecast.txt_forecast.forecastday[0].pop
  },
  chanceOfRainTime: function() {
    var time = ReactiveMethod.call("getWeather");
    dateTime = time.forecast.txt_forecast.forecastday[0].title;
    return time.forecast.txt_forecast.forecastday[0].title
  },
  currentTemp: function() {
    var tempData = ReactiveMethod.call("getCondition");
    return tempData.current_observation.temp_c
  },
  chanceOfRain2: function() {
    var temp2Data = ReactiveMethod.call("getWeather");
    return temp2Data.forecast.txt_forecast.forecastday[1].pop
  },
  chanceOfRainTime2: function() {
    var time2 = ReactiveMethod.call("getWeather");
    return time2.forecast.txt_forecast.forecastday[1].title
  },
  currentCondition: function() {
    var condition = ReactiveMethod.call("getWeather");
    var icon = condition.forecast.txt_forecast.forecastday[0].icon

    if (icon === "cloudy" || icon === "nt_cloudy") {
      return "img/weather_icon/cloudy.svg"
    } else if (icon === "clear") {
      return "img/weather_icon/clear.svg"
    } else if (icon === "foggy") {
      return "img/weather_icon/foggy.svg"
    } else if (icon === "sunny") {
      return "img/weather_icon/sunny.svg"
    } else if (icon === "partlysunny") {
      return "img/weather_icon/partly_cloudy.svg"
    } else if (icon === "mostlysunny") {
      return "img/weather_icon/sunny.svg"
    } else if (icon === "hazy") {
      return "img/weather_icon/hazy.svg"
    } else if (icon === "mostlycloudy" || icon === "nt_mostlycloudy") {
      return "img/weather_icon/mostly_cloudy.svg"
    } else if (icon === "partlycloudy" || icon === "nt_partlycloudy") {
      return "img/weather_icon/partly_cloudy.svg"
    } else if (icon === "rain") {
      return "img/weather_icon/rain.svg"
    } else if (icon === "shower") {
      return "img/weather_icon/shower.svg"
    } else if (icon === "chancetstorms") {
      return "img/weather_icon/thunderstorm.svg"
    } else if (icon === "verycold") {
      return "img/weather_icon/very_cold.svg"
    } else if (icon === "veryhot") {
      return "img/weather_icon/very_hot.svg"
    }else {
      return "img/Brella.svg"
    }
  },
  checkUmbrella: function() {
    var checkUmbrella = ReactiveMethod.call("getWeather");

    if (checkUmbrella.forecast.txt_forecast.forecastday[1].pop > checkUmbrella.forecast.txt_forecast.forecastday[0].pop) {
      if (checkUmbrella.forecast.txt_forecast.forecastday[1].pop < 50) {
        return "img/noumbrella.svg"
      } else {
        return "img/umbrella.svg"
      }
    }       

    if (checkUmbrella.forecast.txt_forecast.forecastday[0].pop < 50) {
      console.log("HELLO WORLD");
      return "img/noumbrella.svg"
     } else {
      console.log("HELLO WORLD");
      return "img/umbrella.svg"
    }
  },
  brellaMessage: function() {
    var popCheck = ReactiveMethod.call("getWeather");

    if (dateTime === "Monday" || dateTime === "Tuesday" || dateTime === "Wednesday" || dateTime === "Thursday" || dateTime === "Friday" || dateTime === "Saturday" || dateTime === "Sunday") {
      if (popCheck.forecast.txt_forecast.forecastday[1].pop > popCheck.forecast.txt_forecast.forecastday[0].pop) {
        if (popCheck.forecast.txt_forecast.forecastday[1].pop < 20) {
          return _.sample(brellaMessages.lowChance)
        } else if (popCheck.forecast.txt_forecast.forecastday[1].pop < 30) {
          return _.sample(brellaMessages.slightChance)
        } else if (popCheck.forecast.txt_forecast.forecastday[1].pop < 50) {
          return _.sample(brellaMessages.chance)
        } else if (popCheck.forecast.txt_forecast.forecastday[1].pop < 70) {
          return _.sample(brellaMessages.likelyChance)
        } else if (popCheck.forecast.txt_forecast.forecastday[1].pop < 90) {
          return _.sample(brellaMessages.extremeChance)
        } else {
          return _.sample(brellaMessages.itWillRain)
        }
      }        
    }

    if (popCheck.forecast.txt_forecast.forecastday[0].pop < 20) {
      return _.sample(brellaMessages.lowChance)
      // return brellaMessages.lowChance[Math.ceil(Math.random()*brellaMessages.lowChance.length)]
    } else if (popCheck.forecast.txt_forecast.forecastday[0].pop < 30) {
      return _.sample(brellaMessages.slightChance)
    } else if (popCheck.forecast.txt_forecast.forecastday[0].pop < 50) {
      return _.sample(brellaMessages.chance)
    } else if (popCheck.forecast.txt_forecast.forecastday[0].pop < 70) {
      return _.sample(brellaMessages.likelyChance)
    } else if (popCheck.forecast.txt_forecast.forecastday[0].pop < 90) {
      return _.sample(brellaMessages.extremeChance)
    } else {
      return _.sample(brellaMessages.itWillRain)
    }
  }

});

Template.main.events({
  "click #push": function () {
    Meteor.call("serverNotification");
  },
});
