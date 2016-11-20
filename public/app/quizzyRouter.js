'use strict';

export default quizzyRouter;

function quizzyRouter($urlRouterProvider, $stateProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state({
      name: 'welcome',
      url: '/welcome',
      views: {
        'content': {
          template: require('./welcome/welcome.html'),
          controller: 'WelcomeCtrl'
        }
      }
    })
    .state({
      name: 'category',
      url: '/category?name',
      views: {
        'content': {
          template: require('./category/category.html'),
          controller: 'CategoryCtrl'
        }
      },
      onEnter($stateParams, categoryService) {
        categoryService.loadCategory($stateParams.name);
      }
    });
}
