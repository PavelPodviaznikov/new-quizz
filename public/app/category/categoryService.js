'use strict';

export default categoryService;

categoryService.$inject = ['$http'];

function categoryService($http) {
  let self = {};

  self.category = {
    name: ''
  };

  self.loadCategory = categoryName => {
    if (!categoryName) return false;

    //Will send request for category here
    $http({
      url: '/category',
      method: "GET",
      params: {categoryName}
    }).then(onCategoryLoaded);

    self.category.name = categoryName.toUpperCase();
  };

  function onCategoryLoaded(response) {
    debugger;
  }

  return self;
}