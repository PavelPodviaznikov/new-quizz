'use strict';

export default CategoryCtrl;

function CategoryCtrl (categoryService) {
  'ngInject';

  this.category = categoryService.category;
}
