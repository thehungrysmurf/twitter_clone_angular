shiftSampleApp
  .controller('ProfileCtrl', function ($scope, $http, $location, $routeParams, Profile) {

    var user_id = $routeParams.id;

    if(user_id) {
      Profile.get(user_id).then(function(response) {
      $scope.load_profile = response.data;
      });

      Profile.getTweets(user_id).then(function(response) {
      $scope.load_tweets = response.data.tweets;
      });
    }

    $scope.getFollowers = function(uid) {
      $http.get('/followers/' + uid).success(function(data) {
        $scope.followers = data;
      })
    }
  
});