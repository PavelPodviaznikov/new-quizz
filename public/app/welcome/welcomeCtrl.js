'use strict';

export default WelcomeCtrl;

function WelcomeCtrl($scope, welcomeService) {
  'ngInject';

  $scope.categories = welcomeService.categories;
  $scope.openCategoryPage = welcomeService.openCategoryPage;
}
