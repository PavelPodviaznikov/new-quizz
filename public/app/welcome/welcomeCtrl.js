'use strict';

export default WelcomeCtrl;

WelcomeCtrl.$inject = ['$scope','welcomeService'];

function WelcomeCtrl($scope, welcomeService) {
  $scope.categories = welcomeService.categories;
  $scope.openCategoryPage = welcomeService.openCategoryPage;
}