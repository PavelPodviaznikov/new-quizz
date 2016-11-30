'use strict';

import './dashboard.scss';

import dashboardCtrl from './dashboardCtrl';
import dashboardService from './dashboardService';

export default angular
  .module('quizzy.dashboard', [])
  .controller(dashboardCtrl.name, dashboardCtrl)
  .factory(dashboardService.name, dashboardService);
