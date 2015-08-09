shiftSampleApp
  .factory('Tweet', function ($http) {
    var tweets = {

    get: function() {
      return $http.get('/alltweets').then(function(response) {
      return response;
      });
    }
    }
    return tweets;
});