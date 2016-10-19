'use strict';

angular
  .module('quizzy.welcome')
  .factory('welcomeService', welcomeService);

welcomeService.$inject = [];

function welcomeService() {
  var self = {};

  self.categories = [
    {
      name: 'Capitals',
      value: 'capitals',
      playersOnline: 0,
      img: '../../img/capitals.jpg'
    }
  ];

  return self;
}