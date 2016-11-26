'use strict';

import './socials.css';

import googleIcon from './googleIcon';

export default angular
  .module('quizzy.socials', [])
  .directive(googleIcon.name, googleIcon);
