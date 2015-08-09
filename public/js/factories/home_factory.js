shiftSampleApp
  .factory('Home', function ($http) {
    var current_user = {

    get: function() {
      return $http.get('/home').then(function(response) {
      return response;
      });
    }
  }
  return current_user;
});