var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/landing', {
      templateUrl: '../views/landing.html',
      controller: "LandingController"
    })
    .when('/login', {
  			templateUrl: '../views/login.html',
  			controller: "LoginController"
  		})
  		.when('/register', {
  			templateUrl: '../views/register.html',
  			controller: "LoginController"
  		})
  		.when('/followNew', {
  			templateUrl: '/views/followNew.html',
  			controller: "FollowNewController"
  		})
  		.otherwise({
  			redirectTo: 'login'
  		})
}]);
