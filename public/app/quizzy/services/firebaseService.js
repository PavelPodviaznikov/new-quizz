'use strict';

class Firebase {
  constructor() {
    this._googleProvider = null;
  }

  static googleAuth() {
    this._googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(this._googleProvider);
  }

  static logout() {
    return firebase.auth().signOut();
  }
}

export default Firebase;
