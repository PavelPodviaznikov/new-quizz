'use strict';

import './category.css';

import CategoryCtrl from './categoryCtrl';
import categoryService from './categoryService';

export default angular
  .module('quizzy.category', [])
  .controller(CategoryCtrl.name, CategoryCtrl)
  .factory(categoryService.name, categoryService);