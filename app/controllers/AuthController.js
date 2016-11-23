'use strict';

let firebase = require('../firebase');

module.exports = {
  registerUser(req, res) {
    let user = req.body.user;

    firebase.registerUser(user)
      .then(() => firebase.isUserExistsInDB(user.email))
      .then(snapshot => isUserExists(snapshot.val()) || firebase.addUser(user))
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err));
  },

  registerUserWithGoogle(req, res) {
    let user  = req.body.user;

    firebase.registerUserWithGoogle(user)
      .then(() => firebase.isUserExistsInDB(user.email))
      .then(snapshot => isUserExists(snapshot.val()) || firebase.addUser(user))
      .then(data => res.send(data))
      .catch(err => res.status(400).send(err));
  }
};

function isUserExists(user) {
  return user ? {
    code: "auth/email-already-in-use",
    message: "The email address is already in use by another account."
  } : null;
}
