'use strict';

class QuizzyService {
  constructor($http, $rootScope) {
    this._$http = $http;
    this._$rootScope = $rootScope;
  }

  loadEnvData() {
    this._$http.get('/env')
      .then(response => this._$rootScope.$emit('env:data:loaded', response.data))
      .catch(err => console.error(err));
  }
}

export default QuizzyService;
