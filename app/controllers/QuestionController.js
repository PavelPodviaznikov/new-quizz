'use strict';

let questionService = require('../services/questionService');
let timerService = require('../services/timerService');

class QuestionController {
  constructor() {}

  generateQuestion(config) {
    let question = questionService.generateQuestion(config);

    config.socket.emit(`room:question:${config.category}`, question);
    config.socket.broadcast.emit(`room:question:${config.category}`, question);

    timerService.addTimer(config.category, ()=>{
      config.isAfterAnswer = true;
      this.generateQuestion(config);
    });
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
    timerService.clearTimer(category);
  }
}

module.exports = new QuestionController();
