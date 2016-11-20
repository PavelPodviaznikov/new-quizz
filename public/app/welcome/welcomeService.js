'use strict';

export default welcomeService;

function welcomeService($state) {
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
    }
  ];

  self.openCategoryPage = category => {
    $state.go(category.state.name, {name: category.state.param, category: category});
  };

  return self;
}
