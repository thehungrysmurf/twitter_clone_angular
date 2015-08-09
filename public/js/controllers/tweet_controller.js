shiftSampleApp
  .controller('TweetCtrl', function ($scope, $http, $location, Tweet) {
    
    $scope.numTweets = 50;

    $scope.getTweets = function(user_id) {
      $http.get('/tweets/' + user_id).success(function(data) {
        $scope.tweets = data;       
      });
    }
    Tweet.get().then(function(response) {
      $scope.allTweets = response.data;
    })

    $scope.createTweet = function(tweet) {
      var params = {
        text: tweet.text
      }
      $http.post('/tweet', params).success(function(response) {
      });
    }

});