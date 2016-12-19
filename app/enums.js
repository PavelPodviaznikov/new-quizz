'use strict';

class Enums {
  constructor() {}

  get categories() {
    return {
      capitals: 'capitals',
      countries: 'countries'
    };
  }

  get routes() {
    return {
      env: '/env',
      user: '/user',
      googleUser: '/user-google'
    };
  }

  get socketEvents() {
    return {
      connection: 'connection',
      disconnect: 'disconnect',
      onlineUsers: 'onlineUsers',
      roomJoined: 'room:joined',
      roomLeave: 'room:leave',
      roomAnswer: 'room:answer',
      roomAnswerChecked: 'room:answer:checked',
      roomQuestion(category) {return `room:question:${category}`},
      userAuthorized: 'user:authorized',
      onlineUsersAdded: 'onlineUsers:added',
      onlineUsersRemoved: 'onlineUsers:removed',
      onlineUsersUpdated: 'onlineUsers:updated'
    };
  }
}

module.exports = new Enums();
