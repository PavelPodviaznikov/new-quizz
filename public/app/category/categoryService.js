'use strict';

export default categoryService;

function categoryService($http, $stateParams, $interval, $rootScope, socketService) {
  'ngInject';

  let self = {};
  let socket = socketService.socket;
  let interval;

  self.category = {
    name: ''
  };

  self.question = { };

  self.score = {
    correct: 0,
    incorrect: 0
  };

  self.init = category => {
    self.category.name = category.toUpperCase();

    socket.emit('room:joined', category);
    socket.on('room:question', onQuestionLoaded);
    socket.on('room:answer:checked', onAnswerChecked)
  };

  self.makeAnswer = answer => {
    socket.emit('room:answer', {category: self.category.name.toLowerCase(), answer});
  };

  function onQuestionLoaded(question) {
    if(!question) return false;

    Object.assign(self.question, question);
    startTimer();
    $rootScope.$apply();
  }

  function startTimer() {
    if(interval) $interval.cancel(interval);

    interval = $interval(()=>{
      self.question.time--;
    }, 1000);
  }

  function onAnswerChecked (leaders) {
    Object.assign(self.score, leaders[socket.id].score);
  }

  // let socket = socketService.socket;
  //
  // self.category = {
  //   name: ''
  // };
  //
  // self.question = {};
  //
  // self.score = {
  //   correct: 0,
  //   incorrect: 0
  // };
  //
  //
  //
  // self.makeAnswer = answer => {
  //   debugger;
  //   socket.emit(`${self.category.name.toLowerCase()}:answered`, answer);
  //   socket.on(`correct:answer:${socket.id}`, isCorrect => {
  //     debugger;
  //     isCorrect ? self.score.correct++ : self.score.incorrect++;
  //   });
  // };
  //
  // self.init = categoryName => {
  //   if (!categoryName) return false;
  //
  //   socket.emit(`${categoryName}:joined`);
  //   socket.on(`${categoryName}:question:generated`, onQuestionLoaded);
  //
  //   self.category.name = categoryName.toUpperCase();
  // };
  //
  // function onQuestionLoaded(question) {
  //   if(!question) return false;
  //
  //   debugger;
  //
  //   Object.assign(self.question, question);
  // }

  return self;
}
