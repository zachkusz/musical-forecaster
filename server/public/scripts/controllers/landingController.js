app.controller('LandingController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

LoginAndLandingFactory.getUser;
$scope.userName = LoginAndLandingFactory.user.userName;
$scope.message = LoginAndLandingFactory.exampleText;

//requests albums released today (logic is server side)
$scope.searchTodaysAlbums = function(){
  // if (jsonObj == null){
    $http.get('/todaysAlbums').then(
      function(response) {
        console.log(response);
        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );
        //extracting useful info from data-object
        $scope.albums = jsonObj.metadata['release-list'].release;
        console.log($scope.albums);
        //artist = .release['artist-credit']['name-credit']
      }
    );
  // }
} //end of searchTodaysAlbums
$scope.logout = LoginAndLandingFactory.logout;

}]);
