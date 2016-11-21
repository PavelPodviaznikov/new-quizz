'use strict';

import './header.css';

function quizzyHeader() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./header.html'),
    controller($scope, $state) {
      $scope.onLogoClick = () => {
        $state.go('welcome');
      };

      $scope.onAuthClick = () => {
        $state.go(`${$state.current.name}.auth`);
      };
    }
  };
}

export default quizzyHeader;
