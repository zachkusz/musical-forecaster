app.controller('LandingController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

// if (LoginAndLandingFactory.user.userName != undefined){
//   LoginAndLandingFactory.getUser().then(function(){
    $scope.userName = LoginAndLandingFactory.user.userName;
    $scope.message = LoginAndLandingFactory.exampleText;
    console.log($scope.userName);
//   });
// }

//requests albums released today (logic is server side)
$scope.searchTodaysAlbums = function(){
  $http.get('/musicBrainz/today').then(
    function(response) {
      console.log(response);
      //converts xml to json
      var x2js = new X2JS();
      var xmlText = response.data;
      var jsonObj = x2js.xml_str2json( xmlText );
      //extracting useful info from data-object
      $scope.albums = jsonObj.metadata['release-list'].release;
      console.log($scope.albums);
    }
  );
} //end of searchTodaysAlbums
$scope.logout = function(){
  LoginAndLandingFactory.logout();
}

}]);
