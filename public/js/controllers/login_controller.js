shiftSampleApp
  .controller('LoginCtrl', function ($scope, $http, $location) {
      $scope.login = function(credentials) {
        var params = {
          username: credentials.username,
          password: credentials.password
        };
      $http.post('/login', params).success(function(data) {
        if(data.status === 0) {
          alert('This username already exists! Please log in');
        }
        else if(data.status === 400) { 
          alert('Credentials invalid!'); 
        } 
        else {
          $location.path('/home');
        }
      });
    }
});
