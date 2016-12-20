'use strict';

var google = require("googleapis");
var OAuth2 = google.auth.OAuth2;

// Initialize oauth2Client using Lambda environment variables
var oauth2Client = new OAuth2(
  process.env.clientId, // Client ID
  process.env.clientSecret, // Client Secret
  process.env.redirectUrl // Redirect URL
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
