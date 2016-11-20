'use strict';

import socket from 'socket.io-client';

class SocketService {
  constructor() {
    this._socket = socket();
  }

  get socket() {
    return this._socket;
  }
}

export default SocketService;
