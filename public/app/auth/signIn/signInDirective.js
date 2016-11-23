'use strict';

function signIn() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    template: require('./signIn.html'),
    controller() {

    }
  };
}

export default signIn;
