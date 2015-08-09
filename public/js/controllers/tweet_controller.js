shiftSampleApp
  .controller('TweetCtrl', function ($scope, $http, $location) {
    
    $scope.numTweets = 50;

    $scope.getTweets = function(user_id) {
      $http.get('/tweets/' + user_id).success(function(data) {
        $scope.tweets = data;       
      });
    }

    $scope.createTweet = function(tweet) {
      var params = {
        text: tweet.text
      }
      $http.post('/tweet', params).success(function(response) {
      });
    }

});