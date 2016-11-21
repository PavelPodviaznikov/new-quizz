'use strict';

import './header.css';

import headerDirective from './headerDirective';
import headerService from './headerService';

export default angular
  .module('quizzy.header', [])
  .directive(headerDirective.name, headerDirective)
  .service('headerService', headerService);
