'use strict';

let firebase = require('../firebase');

module.exports = {
  registerUser(req, res) {
    let user = req.body.user;

    firebase.registerUser(user)
      .then(() => firebase.isUserExistsInDB(user.email))
      .then(snapshot => {
        if(snapshot.val()) {
          res.send({
            code: "auth/email-already-in-use",
            message: "The email address is already in use by another account."
          });
        }

        return firebase.addUser(user);
      })
      .then(user => {
        res.send(user);
      })
      .catch(err => res.send(err));
  }
};
