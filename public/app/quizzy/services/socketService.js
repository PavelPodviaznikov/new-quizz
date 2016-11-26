'use strict';

import socket from 'socket.io-client';

let _rootScope = new WeakMap(),
    _socket = new WeakMap();

class SocketService {
  constructor($rootScope) {
    _rootScope.set(this, $rootScope);
    _socket.set(this, socket());

    subscribe.call(this);
  }

  get socket() {
    return _socket.get(this);
  }
}

function subscribe() {
  _socket.get(this).on('onlineUsers:added', data => {
    _rootScope.get(this).$emit('onlineUsers:added', data);
  });

  _socket.get(this).on('onlineUsers:removed', onlineUser => {
    _rootScope.get(this).$emit('onlineUsers:removed', onlineUser);
  });

  _socket.get(this).on('onlineUsers:updated', onlineUser => {
    _rootScope.get(this).$emit('onlineUsers:updated', onlineUser);
  });
}

export default SocketService;
