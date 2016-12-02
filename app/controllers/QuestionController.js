'use strict';

let questionService = require('../services/questionService');

class QuestionController {
  constructor() {}

  generateQuestion(config) {
    let question = questionService.generateQuestion(config);

    config.socket.emit('room:question', question);
    config.socket.broadcast.emit('room:question', question);
  }

  updateUserStatistic(config, socket) {
    if(!config.email) return false;

    questionService.updateUserStatistic(config)
    .then(() => {
      let scores = {};
      scores[email] = score;
      socket.emit('room:answer:checked', scores);
      socket.broadcast.emit('room:answer:checked', scores);
    });
  }

  resetActiveQuestion(category) {
    if(!category) category = 'capitals';

    questionService.resetActiveQuestion(category);
  }
}

module.exports = new QuestionController();
