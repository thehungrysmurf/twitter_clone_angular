shiftSampleApp
  .controller('ProfileCtrl', function ($scope, $http, $location, $routeParams, Profile) {

    $scope.getMyProfile = function() {
      $http.get('/profile').success(function(data) {
        if(data.status === 404) {
          alert("Not logged in! Please log in to see this content.");
        }
        else {
          $scope.current_user = data.current_user;
        }
      })
    };

    $scope.logout = function() {
      $location.path('/logout');
    }

    var user_id = $routeParams.id;

    Profile.get(user_id).then(function(response) {
      $scope.load_profile = response.data;
    });
    Profile.getTweets(user_id).then(function(response) {
      $scope.load_tweets = response.data;
    });

    $scope.getFollowers = function() {
      $http.get('/followers/' + user_id).success(function(data) {
        $scope.followers = data;
      })
    }

    $scope.follow = function() {
      $http.get('/follow/' + user_id).success(function(data) {
        var following = data
        if(following == "false") {
          $http.post('/follow/' + user_id).success(function(data) {
            alert("You are now following this user!");
          })
        }
      else
        alert("You are already following this user!");
      });
    }   
});