'use strict';

let firebase = require('../firebase');
let authService = require('../services/authService');

module.exports = {
  registerUser(req, res) {
    let user = req.body.user;

    if(!user) {
      res.status(400).send("Don't receive user");

      return false;
    }

    authService.registerUser(user)
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err));
  },

  registerUserWithGoogle(req, res) {
    let user  = req.body.user;

    if(!user) {
      res.status(400).send("Don't receive user");

      return false;
    }

    authService.registerUserWithGoogle(user)
      .then(data => res.send(data))
      .catch(err => res.status(400).send(err));
  },

  authorizeUser(req, res) {
    let user = req.query;

    if(!user) {
      res.status(400).send("Don't receive user");

      return false;
    }

    authService.authorizeUser(user)
      .then(snapshot => res.send(snapshot.val()))
      .catch(err => res.status(400).send(err));
  },

  authorizeUserWithGoogle(req, res) {
    let user = req.query;

    if(!user) {
      res.status(400).send("Don't receive user");

      return false;
    }

    authService.authorizeUserWithGoogle(user)
      .then(snapshot => res.send(snapshot.val()))
      .catch(err => res.status(400).send(err));
  }
};
