'use strict';

class User {
  constructor() {
    setDefaultData.call(this);
  }

  fillWith(user) {
    if(!user) return false;

    this.id = user.uid;
    this.name = user.displayName;
    this.email = user.email;
    this.photo = user.photoURL;
  }

  clear() {
    setDefaultData.call(this);
  }
}

function setDefaultData() {
  this.id = '';
  this.name = '';
  this.email = '';
  this.photo = null;
}

export default User;
