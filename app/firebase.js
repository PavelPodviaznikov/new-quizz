'use strict';

let util = require('./util');

let firebase = require("firebase");

module.exports = {
  init() {
    firebase.initializeApp({
      apiKey: "AIzaSyDfpjZJ3cj7ORhMeTDIXlUnvI1F1F5G0rY",
      authDomain: "quizzy-7b0e4.firebaseapp.com",
      databaseURL: "https://quizzy-7b0e4.firebaseio.com",
      storageBucket: "quizzy-7b0e4.appspot.com",
      messagingSenderId: "58498864379"
    });
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
