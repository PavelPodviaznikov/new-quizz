'use strict';

export default categoryService;

function categoryService($http, $stateParams, $interval, $rootScope, socketService) {
  'ngInject';

  let self = {};
  let socket = socketService.socket;

  self.category = {
    name: ''
  };

  self.question = {};

  self.init = category => {
    self.category.name = category.toUpperCase();

    socket.emit(`category:${category}:joined`);
    socket.on(`category:${category}:question`, onQuestionLoaded);
  };

  self.makeAnswer = answer => {
    socket.emit(`category:${self.category.name.toLowerCase()}:answer`);
  };

  function onQuestionLoaded(question) {
    if(!question) return false;
    console.log(question);
    Object.assign(self.question, question);
    $rootScope.$apply();
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
  // self.timer = {
  //   value: 10,
  //   interval: null,
  //   start() {
  //     this.value = 10;
  //     this.interval = $interval(()=>{
  //       if(this.value === 0) {
  //         self.makeAnswer('');
  //       }
  //
  //       this.value--;
  //     }, 1000);
  //   },
  //   stop() {
  //     this.value = 10;
  //     $interval.cancel(this.interval);
  //   }
  // };
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
