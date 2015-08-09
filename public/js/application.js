var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute']);

shiftSampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: '/js/templates/users.html',
        controller: 'UsersCtrl',
      }).
      // add new angular routes below
      when('/home', {
        templateUrl: '/js/templates/home.html',
        controller: 'HomeCtrl',
      }).
      when('/tweets/:id', {
        controller: 'TweetCtrl',
      }).
      when('/alltweets', {
        controller: 'TweetCtrl',
      }).
      when('/profile/:id', {
        templateUrl: '/js/templates/profile.html',
        controller: 'ProfileCtrl',
      }).
      otherwise({
       redirectTo: '/users'
      });
  }]);