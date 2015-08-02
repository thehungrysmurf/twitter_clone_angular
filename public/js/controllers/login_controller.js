shiftSampleApp
  .controller('LoginCtrl', function ($scope, $http, $location) {
      $scope.login = function(credentials) {
        var params = {
          username: credentials.username,
          password: credentials.password
        };
      $http.post('/login', params).success(function(data) {
        if(data.status === 400) { 
          alert('Credentials invalid!'); 
        } else {
          $location.path('/profile');
        }
      });
    }
});
