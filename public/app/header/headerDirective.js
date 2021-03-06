'use strict';

import './header.css';

function quizzyHeader() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./header.html'),
    controller($rootScope, $scope, $state, headerService) {
      $scope.user = headerService.user;
      $scope.menu = headerService.menu;
      $scope.conditions = headerService.conditions;

      $scope.toggleMenu = (event) => {
        event.stopPropagation();
        $scope.menu.isOpened = !$scope.menu.isOpened;
      };

      $scope.onLogoClick = () => {
        $state.go('dashboard');
      };

      $scope.onAuthClick = () => {
        $state.go(`${$state.current.name}.auth`);
      };

      $scope.onLogoutClick = () => {
        $rootScope.$emit('user:perform:logout');
      };

      $scope.onSettingsClick = () => {
        $state.go(`${$state.current.name}.settings`);
        headerService.closeMenu();
      };
    }
  };
}

export default quizzyHeader;
