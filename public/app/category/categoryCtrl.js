'use strict';

export default CategoryCtrl;

function CategoryCtrl (categoryService) {
  'ngInject';

  this.category = categoryService.category;
  this.question = categoryService.question;
  // this.score = categoryService.score;
  // this.timer = categoryService.timer;
  //
  this.makeAnswer = categoryService.makeAnswer;
}
