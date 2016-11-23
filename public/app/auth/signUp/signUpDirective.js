'use strict';

function signUp() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: require('./signUp.html'),
    controller() {

    }
  };
}

export default signUp;
