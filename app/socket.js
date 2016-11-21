'use strict';

let io = require('socket.io');
let categoryService = require('./category');

function socket(http) {
  io = io(http);

  io.on('connection', (socket) => {
    console.log(`Connection ${socket.id} started`);

    socket.on('disconnect', () => {
     console.log(`Connection ${socket.id} closed`);
     categoryService.clear.call(socket);
    });

    socket.on('room:joined', categoryService.generateQuestion);
    socket.on('room:answer', categoryService.checkAnswer);
  });
}

module.exports = socket;
