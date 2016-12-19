'use strict';

export default DashboardCtrl;

function DashboardCtrl(dashboardService) {
  'ngInject';

  this.categories = dashboardService.categories;
  this.openCategoryPage = dashboardService.openCategoryPage;
}
