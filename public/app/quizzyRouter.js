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
          controller: 'WelcomeCtrl',
          controllerAs: 'welcome'
        }
      }
    })
    .state({
      name: 'category',
      url: '/category?name',
      views: {
        'content': {
          template: require('./category/category.html'),
          controller: 'CategoryCtrl',
          controllerAs: 'categoryCtrl'
        }
      },
      onEnter($stateParams, categoryService) {
        categoryService.init($stateParams.name);
      },
      onExit(categoryService) {
        categoryService.onCategoryLeave();
      }
    });
}
