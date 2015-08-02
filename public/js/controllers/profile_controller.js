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
});