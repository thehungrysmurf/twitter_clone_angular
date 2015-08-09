shiftSampleApp
  .factory('Home', function ($http) {
    var current_user = {

    get: function() {
      return $http.get('/home').then(function(response) {
        if(response.status === 404) {
          alert("Not logged in! Please log in to see this content.");
        }
        else
          return response;
      });
    }
    }
    return current_user;
});