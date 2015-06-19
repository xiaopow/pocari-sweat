var apn = Meteor.npmRequire("apn"),
    path = Npm.require('path'),
    apnOptions = Meteor.settings.apnOptions || {},
    alertSound = apnOptions.sound || "alert.aiff",
    apnConnection

// default apn connection options
apnOptions = _.extend({
  cert: path.join(appRootPath, "private", "cert.pem"),
  key: path.join(appRootPath, "private", "key.pem"),
}, apnOptions)
apnConnection = new apn.Connection(apnOptions)

Meteor.methods({
  sendAppleNotifications: function (alert, url, pushIds) {
    var note = new apn.Notification()

    // expires 1 hour from now
    note.expiry = Math.floor(Date.now() / 1000) + 3600
    note.sound = alertSound
    note.alert = alert
    note.payload = {'url': url}

    _.each(pushIds, function (token) {
      var device = new apn.Device(token)
      apnConnection.pushNotification(note, device)
    })

    return {success:'ok'}
  }  // end sendAppleNotifications
})