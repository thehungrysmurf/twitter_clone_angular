var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute']);

shiftSampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: '/js/templates/users.html',
        controller: 'UsersCtrl',
      }).
      // add new angular routes below
      when('/profile', {
        templateUrl: '/js/templates/profile.html',
        controller: 'ProfileCtrl',
      }).
      when('/tweets', {
        templateUrl: '/js/templates/profile.html',
        controller: 'TweetCtrl',
      }).
      otherwise({
       redirectTo: '/users'
      });
  }]);