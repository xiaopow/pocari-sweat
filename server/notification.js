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
  "There is an extremely high chance it will rain today... Bring your Brella please... If it don't... I actually won't care."],

  itWillRain: ["Todays lesson is: Don't Do Drugs, Stay In School Kids, and Bring Your Brella...",
  "Smart people will bring their Brella, Hell... dumb people too",
  "Roses are red, violets are blue, rain is clear, bring your damn Brella.",
  "What goes up when the rain comes down? You're Brella, bring it with you today...",
  "You'll be Singing In the Rain... if you don't bring your Brella.",
  "I dare you to leave your Brella at home... Do it..."]

};

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
      var message;
      if (data.forecast.txt_forecast.forecastday[1].pop > data.forecast.txt_forecast.forecastday[0].pop) {
        if (data.forecast.txt_forecast.forecastday[1].pop < 20) {
          message = _.sample(brellaMessages.lowChance)
        } else if (data.forecast.txt_forecast.forecastday[1].pop < 30) {
          message = _.sample(brellaMessages.slightChance)
        } else if (data.forecast.txt_forecast.forecastday[1].pop < 50) {
          message = _.sample(brellaMessages.chance)
        } else if (data.forecast.txt_forecast.forecastday[1].pop < 70) {
          message = _.sample(brellaMessages.likelyChance)
        } else if (data.forecast.txt_forecast.forecastday[1].pop < 90) {
          message = _.sample(brellaMessages.extremeChance)
        } else {
          message = _.sample(brellaMessages.itWillRain)
        }
      } else if (data.forecast.txt_forecast.forecastday[0].pop < 20) {
        message = _.sample(brellaMessages.lowChance)
      } else if (data.forecast.txt_forecast.forecastday[0].pop < 30) {
        message = _.sample(brellaMessages.slightChance)
      } else if (data.forecast.txt_forecast.forecastday[0].pop < 50) {
        message = _.sample(brellaMessages.chance)
      } else if (data.forecast.txt_forecast.forecastday[0].pop < 70) {
        message = _.sample(brellaMessages.likelyChance)
      } else if (data.forecast.txt_forecast.forecastday[0].pop < 90) {
        message = _.sample(brellaMessages.extremeChance)
      } else {
        message = _.sample(brellaMessages.itWillRain)
      }
      var chanceOfRain = data.forecast.txt_forecast.forecastday[0].pop
      console.log(message);
      console.log(timeNow);
      reminderItems.forEach(function(reminderItem) {
        console.log("send to user" + reminderItem.userId);
        Meteor.call("serverNotification",reminderItem.userId,message);
      });
    }, 60000);
  });
}