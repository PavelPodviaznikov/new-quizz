'use strict';

export default categoryService;

import util from '../util';

function categoryService($http, $stateParams, $interval, $rootScope, socketService, userService, onlineUsersService) {
  'ngInject';

  let self = {};
  let socket = socketService.socket;
  let interval;
  let user = userService.getActiveUser();

  self.category = {
    name: '',
    value: ''
  };

  self.question = { };

  self.score = user.score;

  self.init = category => {
    self.category.value = category;
    self.category.name = category.toUpperCase();
    self.onlineUsers = onlineUsersService.onlineUsers[category];

    socket.emit('room:joined', {category, user});
    socket.on(`room:question:${category}`, onQuestionLoaded);
    socket.on('room:answer:checked', onAnswerChecked)
  };

  self.makeAnswer = answer => {
    checkAnswer(answer) ? user.score.correct++ : user.score.incorrect++;

    socket.emit('room:answer', {
      category: self.category.name.toLowerCase(),
      score: user.score,
      email: user.email
    });
  };

  self.onCategoryLeave = () => {
    socket.emit('room:leave', self.category.value);
  };

  function onQuestionLoaded(question) {
    if(!question || question.category !== self.category.value) return false;

    Object.assign(self.question, question);
    startTimer();
    $rootScope.$apply();
  }

  function startTimer() {
    if(interval) clearTimer();

    interval = $interval(()=>{
      if(self.question.timeLife === 0) {
        clearTimer();
      }
      self.question.timeLife--;
    }, 1000);
  }

  function clearTimer() {
    $interval.cancel(interval);
    interval = null;
  }

  function onAnswerChecked (scores) {
    let score = scores[user.email];

    self.score.correct = score.correct;
    self.score.incorrect = score.incorrect;
  }

  function checkAnswer(answer) {
    return answer === self.question.answer;
  }

  return self;
}
