'use strict';

export default CategoryCtrl;

CategoryCtrl.$inject = ['$scope', 'categoryService'];

function CategoryCtrl ($scope, categoryService) {
  $scope.category = categoryService.category;
}