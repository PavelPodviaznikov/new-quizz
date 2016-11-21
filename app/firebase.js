'use strict';

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
  }
};
