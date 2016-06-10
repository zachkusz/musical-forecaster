app.controller('MyArtistsController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

  // if (LoginAndLandingFactory.user.userName != undefined){
  //   LoginAndLandingFactory.getUser().then(function(){
      $scope.user_id = LoginAndLandingFactory.user.user_id;
      console.log($scope.user_id);
  //   });
  // }

  console.log('myartists controller running');
  LoginAndLandingFactory.getUser;
  var user_id = LoginAndLandingFactory.user.user_id
  console.log(user_id);
  //maybe rerun the get user here? maybe just get user info.

  $scope.getArtists = function() {
    console.log($scope.user_id);
    // $http.get('/follow/' + user_id).then(function(response) {
    //   console.log(response);
    // });
  }//end getArtists

}]);
