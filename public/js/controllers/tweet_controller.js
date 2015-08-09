shiftSampleApp
  .controller('TweetCtrl', function ($scope, $http, $location, Tweet) {
    
    $scope.numTweets = 50;

    $scope.getTweets = function(user_id) {
      $http.get('/tweets/' + user_id).success(function(response) {
        if(response.status == 200) {
          $scope.tweets = response.tweets;
        }     
      });
    }
    Tweet.get().then(function(response) {
      if(response.data.status == 200) {
        $scope.alltweets = response.data.alltweets;
      }
    })

    $scope.createTweet = function(tweet) {
      var params = {
        text: tweet.text
      }
      $http.post('/tweet', params).success(function(response) {
        if(response.status != 200) {
          alert("Error - you are not logged in! You must be logged in to post a tweet.");
        }
        else {
          alert("Post created successfully!");
        }
      });
    }

});