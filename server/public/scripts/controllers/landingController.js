app.controller('LandingController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

  $scope.userName = LoginAndLandingFactory.user.userName;
  console.log($scope.userName);
  searchTodaysAlbums();

  //requests albums released today (logic is server side)
  function searchTodaysAlbums(){
    $http.get('/musicBrainz/today').then(
      function(response) {
        console.log(response);
        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );
        //extracting useful info from data-object
        $scope.albums = jsonObj.metadata['release-list'].release;
        console.log(jsonObj);
        console.log($scope.albums);
      }
    );
  } //end of searchTodaysAlbums

  $scope.date = moment().format("dddd, MMMM Do YYYY");

}]);
