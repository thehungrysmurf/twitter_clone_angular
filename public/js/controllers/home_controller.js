shiftSampleApp
  .controller('HomeCtrl', function ($scope, $http, $location, Home) {

    Home.get().then(function(response) {
      $scope.current_user = response.data.current_user;
    });

    $scope.logout = function() {
      $location.path('/logout');
    }

    $scope.follow = function(uid) {
      $http.get('/follow/' + uid).success(function(data) {
        var following = data
        if(following == "false") {
          $http.post('/follow/' + uid).success(function(data) {
            alert("You are now following this user!");
          })
        }
      else
        alert("You are already following this user!");
      });
    }

    $scope.getFollowing = function() {
      $http.get('/following/' + $scope.current_user.id).success(function(data) {
        $scope.following = data
      })
    } 
});