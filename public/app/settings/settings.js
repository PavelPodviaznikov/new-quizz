"use strict";

import './settings.scss';

import settingsCtrl from './settingsCtrl';
import settingsService from './settingsService';
import settingsRouter from './settingsRouter';

export default angular
  .module('quizzy.settings', [])
  .config(settingsRouter)
  .controller(settingsCtrl.name, settingsCtrl)
  .service('settingsService', settingsService);
