shiftSampleApp
  .factory('Profile', function ($http, $q) {
    var profile = {

    get: function (userId) {
      return $http.get('/profile/' + userId).then(function(response) {
        return response;
      });
    },
    getTweets: function(userId) {
      return $http.get('/tweets/' + userId).success(function(response) {
      return response;
      });
    }
  }
  return profile;
});