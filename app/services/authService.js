'use strict';

let firebase = require('../firebase');

class AuthService {
  constructor() {}

  registerUser(user) {
    return firebase.registerUser(user)
      .then(() => firebase.isUserExistsInDB(user.email))
      .then(snapshot => isUserExists(snapshot.val()) || firebase.addUser(user));
  }

  registerUserWithGoogle(user) {
    return firebase.registerUserWithGoogle(user)
      .then(() => firebase.isUserExistsInDB(user.email))
      .then(snapshot => isUserExists(snapshot.val()) || firebase.addUser(user));
  }

  authorizeUser(user) {
    return firebase.authorizeUser(user)
      .then(() => firebase.getUser(user.email));
  }

  authorizeUserWithGoogle(user) {
    return firebase.authorizeUserWithGoogle(user)
      .then(() => firebase.getUser(user.email));
  }
}

function isUserExists(user) {
  return user ? {
    code: "auth/email-already-in-use",
    message: "The email address is already in use by another account."
  } : null;
}

module.exports = new AuthService();
