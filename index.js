'use strict';

var google = require("googleapis");
var OAuth2 = google.auth.OAuth2;

exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event,null,2)); //DEBUG

  // Check if required Lambda environment variables are set
  if( process.env.clientId &&
      process.env.clientSecret &&
      process.env.redirectUrl1 &&
      process.env.redirectUrl2)
  {
    // Check if origin is included as one of the redirectUrls
    var redirectUrl = (process.env.redirectUrl1.indexOf(event.origin) != -1)
      ? process.env.redirectUrl1
      : (process.env.redirectUrl2.indexOf(event.origin) != -1)
        ? process.env.redirectUrl2
        : null;

    if(redirectUrl) {
      // Initialize oauth2Client
      var oauth2Client = new OAuth2(
        process.env.clientId, // Client ID
        process.env.clientSecret, // Client Secret
        redirectUrl // Redirect URL decided above
      );

      // plus.me scope is for OAuth2 signin.
      // userinfo.email scope is to retrieve email address of user attempting to sign in
      var scopes = [
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email'
      ];

      var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
        scope: scopes // If you only need one scope you can pass it as a string
      });
      console.log("Success. authUrl: "+authUrl);
      callback(null,authUrl);
    } else {
      console.error("Origin: "+event.origin+" is not permitted.");
      callback("Invalid Origin", null); // Login only allowed from approved origins
    }
  } else {
    console.error("Missing required environment variable(s)");
    callback("Internal error",null);
  }
};
