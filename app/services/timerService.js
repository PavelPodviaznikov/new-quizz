'use strict';

let questionService = require('./questionService');

class TimerService {
  constructor() {
    this._timers = {};
  }

  addTimer(category, generateQuestionCallback) {
    if(this._timers[category]) this.clearTimer(category);

    let activeQuestion = questionService.getActiveQuestion(category);

    this._timers[category] = setInterval(()=>{
      if(activeQuestion.timeLife === 0) {
        this.clearTimer(category);
        generateQuestionCallback();
      }

      console.log({name: activeQuestion.name, time: activeQuestion.timeLife});

      activeQuestion.timeLife--;
    }, 1000);
  }

  clearTimer(category) {
    if(!category) return false;

    clearInterval(this._timers[category]);
    this._timers[category] = null;
  }
}

module.exports = new TimerService();
