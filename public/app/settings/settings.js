"use strict";

import './settings.scss';

import settingsCtrl from './settingsCtrl';
import settingsService from './settingsService';
import settingsRouter from './settingsRouter';

import profileTab from './profileTab/profileTab';

export default angular
  .module('quizzy.settings', [profileTab.name])
  .config(settingsRouter)
  .controller(settingsCtrl.name, settingsCtrl)
  .service('settingsService', settingsService);
