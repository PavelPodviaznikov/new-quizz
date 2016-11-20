'use strict';

export default WelcomeCtrl;

function WelcomeCtrl(welcomeService) {
  'ngInject';

  this.categories = welcomeService.categories;
  this.openCategoryPage = welcomeService.openCategoryPage;
}
