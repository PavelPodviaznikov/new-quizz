'use strict';

let util = require('./util');

let firebase = require("firebase");

let firebaseCofig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
};

module.exports = {
  config: firebaseCofig,

  init() {
    firebase.initializeApp(firebaseCofig);
  },

  onUserAuthenticated(req, res) {
    let email = util.encodeKey(req.query.email),
        token = req.query.token;

    let credential = firebase.auth.GoogleAuthProvider.credential(token);

    firebase.auth().signInWithCredential(credential)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });

    checkIfUserExists(email);
  }
};

function checkIfUserExists(email) {
  return firebase.database().ref('users/' + email).once('value')
    .then(snapshot => {
      if(!snapshot.val()) saveUser(email);
    });
}

function saveUser(email) {
  firebase.database().ref('users/' + email).set({
    correct: 0,
    incorrect: 0
  });
}
