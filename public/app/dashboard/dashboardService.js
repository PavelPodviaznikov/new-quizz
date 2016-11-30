'use strict';

export default dashboardService;

function dashboardService($state) {
  'ngInject';

  var self = {};

  self.categories = [
    {
      name: 'Capitals',
      value: 'capitals',
      playersOnline: 0,
      img: '../../img/capitals.jpg',
      state: {
        name: 'category',
        param: 'capitals'
      }
    },
    {
      name: 'Countries',
      value: 'countries',
      playersOnline: 0,
      img: '../../img/countries.png',
      state: {
        name: 'category',
        param: 'countries'
      }
    }
  ];

  self.openCategoryPage = category => {
    $state.go(category.state.name, {name: category.state.param, category: category});
  };

  return self;
}
