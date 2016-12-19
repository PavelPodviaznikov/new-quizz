'use strict';

export default quizzyRouter;

function quizzyRouter($urlRouterProvider, $stateProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider
    .state({
      name: 'dashboard',
      url: '/dashboard',
      views: {
        'content': {
          template: require('./dashboard/dashboard.html'),
          controller: 'DashboardCtrl',
          controllerAs: 'dashboard'
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
