'use strict';

const questionService = require('../services/questionService');
const timerService = require('../services/timerService');
const enums = require('../enums');

class QuestionController {
  constructor() {}

  generateQuestion(config) {
    let question = questionService.generateQuestion(config);

    config.socket.emit(enums.socketEvents.roomQuestion(config.category), question);
    config.socket.broadcast.emit(enums.socketEvents.roomQuestion(config.category), question);

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
      socket.emit(enums.socketEvents.roomAnswerChecked, scores);
      socket.broadcast.emit(enums.socketEvents.roomAnswerChecked, scores);
    });
  }

  resetActiveQuestion(category) {
    if(!category) category = enums.categories.capitals;

    questionService.resetActiveQuestion(category);
    timerService.clearTimer(category);
  }
}

module.exports = new QuestionController();
