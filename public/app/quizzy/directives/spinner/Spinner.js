'use strict';

class Spinner {
  constructor() {
    this._isShown = false;
  }

  toggle() {
    this._isShown = !this._isShown;
  }

  get isShown() {
    return this._isShown;
  }
}

export default new Spinner();
