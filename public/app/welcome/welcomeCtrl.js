'use strict';

angular
  .module('quizzy.welcome')
  .controller('WelcomeCtrl', [
    '$scope',
    'welcomeService',
    WelcomeCtrl
  ]);

function WelcomeCtrl($scope, welcomeService) {
  $scope.categories = welcomeService.categories;
}