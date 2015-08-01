shiftSampleApp
  .controller('ProfileCtrl', function ($scope, $http) {
    $scope.getProfile = function() {
      $http.get('/profile').success(function(data) {
        if(data.status === 404) {
          alert("Not logged in! Please log in to see this content.");
        }
        else {
          $scope.current_user = data.current_user;
        }
      })
    }
  });