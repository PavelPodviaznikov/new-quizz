'use strict';

export default authRoute;

function authRoute($stateProvider) {
  'ngInject';

  $stateProvider
    .state({
      name: 'dashboard.auth',
      url: '/auth',
      onEnter: onEnter
    })
    .state({
      name: 'category.auth',
      url: '/auth',
      onEnter: onEnter
    });

    function onEnter(authService) {
      authService.openAuthDialog();
    }
}
