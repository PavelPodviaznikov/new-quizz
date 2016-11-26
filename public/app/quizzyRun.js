'use strict';

export default quizzyRun;

function quizzyRun($rootScope, socketService, eventEmitter, quizzyService) {
  'ngInject';

  quizzyService.loadEnvData();

  $rootScope.$on('$stateChangeStart', function() {

  });

  $rootScope.$on('$stateChangeError', function() {

  });
}
