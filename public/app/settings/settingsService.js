'use strict';

let _userService = new WeakMap();
let _mdDialog = new WeakMap();
let _state = new WeakMap();

class SettingsService {
  constructor($mdDialog, $state, userService) {
    _state.set(this, $state);
    _mdDialog.set(this, $mdDialog);
    _userService.set(this, userService);
  }

  openSettingsDialog() {
    _mdDialog.get(this).show({
      controller: 'SettingsCtrl',
      controllerAs: 'sc',
      bindToController: true,
      template: require('./settings.html'),
      clickOutsideToClose:true
    })
    .catch(() => {
      _state.get(this).go(_state.get(this).$current.parent.self.name);
    });
  }
}

export default SettingsService;
