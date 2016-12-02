"use strict";

function settingsRouter($stateProvider) {
  $stateProvider
    .state({
      name: 'dashboard.settings',
      url: '/settings',
      onEnter: onEnter
    })
    .state({
      name: 'category.settings',
      url: '/settings',
      onEnter: onEnter
    });

    function onEnter(settingsService) {
      settingsService.openSettingsDialog();
    }
}

export default settingsRouter;
