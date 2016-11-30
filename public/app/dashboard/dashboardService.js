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
      onClick: redirectToCategoryPage
    },
    {
      name: 'Countries',
      value: 'countries',
      playersOnline: 0,
      img: '../../img/countries.png',
      onClick: redirectToCategoryPage
    }
  ];

  self.onOnlineUsersLoaded = data => {
    if(!data) return false;

    self.categories.map(category => {
      category.playersOnline = data[category.value] ? Object.keys(data[category.value]).length : 0;

      return category;
    });
  };

  self.onOnlineUsersAdded = data => {
    if(!data || !data.users) return false;

    self.categories.map(category => {
      category.playersOnline = data.users[category.value] ? Object.keys(data.users[category.value]).length : 0;

      return category;
    });
  };

  self.onOnlineUsersRemoved = data => {
    if(!data || !data.category) return false;

    self.categories.map(category => {
      if(category.value === data.category) category.playersOnline--;

      return category;
    });
  };

  function redirectToCategoryPage() {
    $state.go('category', {name: this.value});
  };

  return self;
}
