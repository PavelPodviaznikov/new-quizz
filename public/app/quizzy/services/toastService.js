'use strict';

class ToastService {
  constructor($mdToast, $document) {
    this._$mdToast = $mdToast;
    this._$document = $document;
  }

  success(config) {
    this._$mdToast
      .show({
        template : `<md-toast class="md-toast toast-success">${config.msg}</md-toast>`,
        position: 'top right',
        parent : this._$document[0].querySelector(config.parent),
        hideDelay: 3000
      });
  }

  fail(config) {
    this._$mdToast
      .show({
        template : `<md-toast class="md-toast toast-fail">${config.msg}</md-toast>`,
        position: 'top right',
        parent : this._$document[0].querySelector(config.parent),
        hideDelay: 3000
      });
  }
}

export default ToastService;
