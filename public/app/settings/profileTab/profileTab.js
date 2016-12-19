'use strict';

import profileTabDirective from './profileDirective';
import profileTabCtrl from './profileCtrl';
import profileTabService from './profileService';

export default angular
  .module('quizzy.settings.profileTab', [])
  .directive(profileTabDirective.name, profileTabDirective)
  .controller(profileTabCtrl.name, profileTabCtrl)
  .service('profileTabService', profileTabService);