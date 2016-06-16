app.controller('NavController', ['$scope', '$http', '$window', '$location',
function($scope, $http, $window, $location) {
console.log('NavController running');

  $scope.show = false;

  $scope.$on('$routeChangeSuccess', function () {
    var path = $location.path();
    console.log(path);
    if (path === '/landing') {
      $scope.show = true;
    } else if (path === '/myArtists') {
      $scope.show = true;
    } else if (path === '/followNew') {
      $scope.show = true;
    } else {
      $scope.show = false;
    }
  })

}]);
