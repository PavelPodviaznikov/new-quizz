'use strict';

function googleIcon() {
  return {
    restrict: 'E',
    replace: true,
    template: `<ng-md-icon class="google-icon" icon="google-plus" ng-click="authWithGoogle()"></ng-md-icon>`,
    controller($scope, authService) {
      $scope.authWithGoogle = authService.authWithGoogle.bind(authService);;
    }
  };
}

export default googleIcon;
