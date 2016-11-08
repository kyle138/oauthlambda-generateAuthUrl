'use strict';

var google = require("googleapis");
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  "662293723339-9pqrciusdj9qu7qsfnsph3ek9m696maa.apps.googleusercontent.com", // Client ID
  "uqzoMKLTnr96BNEm6Y8lsjHL", // Client Secret
  "http://hedmmysqltest.s3-website-us-east-1.amazonaws.com/oauth2cb/" // Redirect URL
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

exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event,null,2)); //DEBUG
  callback(null, authUrl);
};
