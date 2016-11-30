'use strict';

export default dashboardService;

function dashboardService($state, onlineUsersService) {
  'ngInject';

  var self = {};

  self.categories = [
    {
      name: 'Capitals',
      value: 'capitals',
      playersOnline: onlineUsersService.onlineUsers.capitals,
      img: '../../img/capitals.jpg',
      onClick: redirectToCategoryPage
    },
    {
      name: 'Countries',
      value: 'countries',
      playersOnline: onlineUsersService.onlineUsers.countries,
      img: '../../img/countries.png',
      onClick: redirectToCategoryPage
    }
  ];

  function redirectToCategoryPage() {
    $state.go('category', {name: this.value});
  };

  return self;
}
