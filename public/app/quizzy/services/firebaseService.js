'use strict';

import firebase from 'firebase';

class Firebase {
  constructor() {
    this._googleProvider = null;
  }

  static init(config) {
    firebase.initializeApp(config);
  }

  static googleAuth() {
    this._googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(this._googleProvider);
  }

  static logout() {
    return firebase.auth().signOut();
  }

  static checkUserAuth(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }
}

export default Firebase;
