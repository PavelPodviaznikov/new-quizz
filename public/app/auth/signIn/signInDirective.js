'use strict';

function signIn() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: require('./signIn.html'),
    controller($scope, signInService) {
      $scope.signIn = signInService.signIn.bind(signInService);
      $scope.signInWithGoogle = signInService.signInWithGoogle.bind(signInService);
    }
  };
}

export default signIn;
