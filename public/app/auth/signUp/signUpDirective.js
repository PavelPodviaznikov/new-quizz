'use strict';

function signUp() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: require('./signUp.html'),
    controller($scope, signUpService) {
      $scope.signUp = signUpService.signUp;
      $scope.signUpWithGoogle = signUpService.signUpWithGoogle;
    }
  };
}

export default signUp;
