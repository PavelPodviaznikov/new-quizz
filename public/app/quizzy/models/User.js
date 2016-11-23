'use strict';

class User {
  constructor() {
    setDefaultData.call(this);
  }

  fillWith(user) {
    if(!user) return false;

    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.photo = user.photoURL;
    Object.assign(this.score, user.score);
  }

  clear() {
    setDefaultData.call(this);
  }

  get fullName() {
    return `${this.name} ${this.surname}`; 
  }
}

function setDefaultData() {
  this.name = '';
  this.surname = '';
  this.email = '';
  this.photo = null;
  this.score = {
    correct: 0,
    incorrect: 0
  };
}

export default User;
