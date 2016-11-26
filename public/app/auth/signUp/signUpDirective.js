'use strict';

function signUp() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: require('./signUp.html'),
    controller($scope, signUpService) {
      $scope.signUp = signUpService.signUp.bind(signUpService);
      $scope.signUpWithGoogle = signUpService.signUpWithGoogle.bind(signUpService);
    }
  };
}

export default signUp;
