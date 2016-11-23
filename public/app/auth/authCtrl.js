'use strict';

import spinner from '../quizzy/directives/spinner/Spinner';

function AuthCtrl(authService) {
  this.spinner = spinner;
  this.closeDialog = authService.closeDialog.bind(authService);
}

export default AuthCtrl;
