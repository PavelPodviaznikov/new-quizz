'use strict';

function AuthCtrl(authService) {
  this.closeDialog = authService.closeDialog.bind(authService);
  this.authWithGoogle = authService.authWithGoogle.bind(authService);
}

export default AuthCtrl;
