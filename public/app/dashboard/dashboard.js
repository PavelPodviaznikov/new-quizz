'use strict';

import './dashboard.scss';

import dashboardCtrl from './dashboardCtrl';
import dashboardService from './dashboardService';
import categoryCardDirective from './categoryCardDirective/categoryCard';

export default angular
  .module('quizzy.dashboard', [])
  .controller(dashboardCtrl.name, dashboardCtrl)
  .factory(dashboardService.name, dashboardService)
  .directive(categoryCardDirective.name, categoryCardDirective);
