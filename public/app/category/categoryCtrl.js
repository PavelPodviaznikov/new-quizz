'use strict';

export default CategoryCtrl;

function CategoryCtrl ($scope, categoryService) {
  'ngInject';

  $scope.category = categoryService.category;
}
