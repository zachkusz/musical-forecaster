app.controller('LogoutController', ['$scope', '$http', '$window', '$location', 'LoginAndLandingFactory',
function($scope, $http, $window, $location, LoginAndLandingFactory) {

  logout();

  function logout(){
    LoginAndLandingFactory.logout().then(function(res) {
      console.log('loggout function ran');
      $location.path('/login');
    });
  }

}]);
