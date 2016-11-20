'use strict';

let io = require('socket.io');
let categoryService = require('./category');

function socket(http) {
  io = io(http);

  io.on('connection', (socket) => {
    console.log(`Connection ${socket.id} started`);

    socket.on('disconnect', () => {
     console.log(`Connection ${socket.id} closed`);
    });

    socket.on('category:capitals:joined', () => {
      categoryService.init({
        category: 'capitals',
        socket: socket
      });
    });

    socket.on('category:capitals:answer', ()=>{
      categoryService.generateQuestion({
        category: 'capitals',
        socket: socket
      });
    });
  });
}

module.exports = socket;
