'use strict';

function profileTab() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./profile.html'),
    controller: 'ProfileTabCtrl',
    controllerAs: 'ptc'
  };
}

export default profileTab;