'use strict';

import './spinner.css';

function spinner() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: `<div class="spinner" layout="row" layout-align="center center">
                <ng-md-icon icon="sync" size="64"></ng-md-icon>
              </div>`
  };
}

export default spinner;
