shiftSampleApp
  .controller('HomeCtrl', function ($scope, $http, $location, Home) {

    Home.get().then(function(response) {

      if(response.data.status != 200) {
        alert("Error - you are not logged in!");
      }

      else {
            $scope.current_user = response.data.current_user;

            $scope.logout = function() {
              $http.post('/logout').success(function(data) {
                $location.path('/users');
              });
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
        }
     }); 
});