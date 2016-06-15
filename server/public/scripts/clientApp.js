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
      .when('/myArtists', {
        templateUrl: '../views/myArtists.html',
        controller: "MyArtistsController"
      })
  		.when('/followNew', {
  			templateUrl: '/views/followNew.html',
  			controller: "FollowNewController"
  		})
      .when('/logout', {
        templateUrl: '/views/logout.html',
        controller: "LogoutController"
      })
  		.otherwise({
  			redirectTo: 'login'
  		})
}]);
