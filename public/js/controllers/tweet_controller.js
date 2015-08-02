shiftSampleApp
  .controller('TweetCtrl', function ($scope, $http, $location) {
    $scope.numTweets = 50;
    $scope.getTweets = function() {
      $http.get('/tweets').success(function(data) {
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