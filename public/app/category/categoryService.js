'use strict';

export default categoryService;

function categoryService($http, $stateParams, $interval) {
  'ngInject';

  let self = {};

  self.category = {
    name: ''
  };

  self.question = {};

  self.score = {
    correct: 0,
    incorrect: 0
  };

  self.timer = {
    value: 10,
    interval: null,
    start() {
      this.value = 10;
      this.interval = $interval(()=>{
        if(this.value === 0) {
          self.makeAnswer('');
        }

        this.value--;
      }, 1000);
    },
    stop() {
      this.value = 10;
      $interval.cancel(this.interval);
    }
  };

  self.makeAnswer = answer => {
    if(answer === self.question.answer) {
      self.score.correct++;
    } else {
      self.score.incorrect++;
    }

    self.timer.stop();

    self.loadCategory($stateParams.name);
  };

  self.loadCategory = categoryName => {
    if (!categoryName) return false;

    //Will send request for category here
    $http({
      url: '/question',
      method: "GET",
      params: {categoryName}
    }).then(onQuestionLoaded);

    self.category.name = categoryName.toUpperCase();
  };

  self.reset = () => {
    self.timer.stop();
    self.score.correct = 0;
    self.score.incorrect = 0;
  };

  function onQuestionLoaded(response) {
    if(!response && !response.data) return false;

    self.timer.start();
    Object.assign(self.question, response.data);
  }

  return self;
}
