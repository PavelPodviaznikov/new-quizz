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

  registerUser(user) {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  },

  registerUserWithGoogle(user) {
    let credential = firebase.auth.GoogleAuthProvider.credential(user.token);

    return firebase.auth().signInWithCredential(credential);
  },

  isUserExistsInDB(email) {
    return firebase.database().ref('users/' + util.encodeKey(email)).once('value');
  },

  addUser(user) {
    user.score = {correct: 0, incorrect: 0};

    delete user.token;
    delete user.password;

    return firebase.database().ref('users/' + util.encodeKey(user.email)).set(user)
      .then(() => user);
  },

  authorizeUser(user) {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  },

  authorizeUserWithGoogle(user) {
    let credential = firebase.auth.GoogleAuthProvider.credential(user.token);

    return firebase.auth().signInWithCredential(credential);
  },

  getUser(email) {
    return firebase.database().ref('users/' + util.encodeKey(email)).once('value');
  },

  onUserAuthenticated(req, res) {
    let email = util.encodeKey(req.query.email),
        token = req.query.token;

    let credential = firebase.auth.GoogleAuthProvider.credential(token);

    firebase.auth().signInWithCredential(credential)
      .then(response => getUsersScore(email))
      .then(score => res.send(score))
      .catch(err => res.send(err));

    // checkIfUserExists(email);
  },

  updateScore: updateScore
};

function getUsersScore(email) {
  return firebase.database().ref('users/' + email + '/score').once('value')
    .then(snapshot => {
      return snapshot.val();
    });
}

function updateScore(email, score) {
  return firebase.database().ref('users/' + email + '/score').update(score);
}

//
// // function checkIfUserExists(email) {
// //   return firebase.database().ref('users/' + email).once('value')
// //     .then(snapshot => {
// //       if(!snapshot.val()) saveUser(email);
// //     });
// // }
//
// // function saveUser(email) {
// //   firebase.database().ref('users/' + email).set({
// //     score: {
// //       correct: 0,
// //       incorrect: 0
// //     }
// //   });
// // }
