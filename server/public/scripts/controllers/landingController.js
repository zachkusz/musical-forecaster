app.controller('LandingController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory',
function($scope, $http, $window, $location, LoginAndLandingFactory) {

  $scope.userName = LoginAndLandingFactory.user.userName;
  searchTodaysAlbums();

  //requests albums released today (logic for today is server side)
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
        $scope.sortedAlbums = [];
        removeDuplicates($scope.albums);
      }
    );
  } //end of searchTodaysAlbums

  $scope.date = moment().format("dddd, MMMM Do YYYY");

  function removeDuplicates(albums) {
    for (var i = 0; i < albums.length; i++) {
      if (i == 0){
        $scope.sortedAlbums.push(albums[i]);
      } else if (albums[i].title != $scope.sortedAlbums[$scope.sortedAlbums.length - 1].title) {
        $scope.sortedAlbums.push(albums[i]);
      }
    }
  }

}]);
