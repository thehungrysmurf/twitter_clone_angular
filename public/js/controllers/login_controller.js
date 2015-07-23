shiftSampleApp
  .controller('LoginCtrl', function ($scope, $http) {
      $scope.login = function(credentials) {
        var params = {
          username: credentials.username,
          password: credentials.password
        };
        $http.post('/login', params).success(function(response) {
          console.log("HTTP POST successful: " + response);  
        $http.get('/profile') .success(function(response) {
          console.log("HTTP GET successful")
        });
        });
  };
});
