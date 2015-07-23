var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute']);

shiftSampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: '/js/templates/users.html',
        controller: 'UsersCtrl',
      }).
      when('/profile', {
        templateUrl: '/js/templates/login.html',
        controller: 'LoginCtrl',
      }).
      when('/error', {
        templateUrl: 'js/templates/error.html',
        controller: 'LoginCtrl',
      }).
      // add new angular routes below
      otherwise({
       redirectTo: '/users'
      });
  }]);