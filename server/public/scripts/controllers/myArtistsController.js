app.controller('MyArtistsController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

  $scope.user_id = LoginAndLandingFactory.user.user_id;
  console.log($scope.user_id);

  console.log('myartists controller running');
  LoginAndLandingFactory.getUser;
  var user_id = LoginAndLandingFactory.user.user_id
  console.log(user_id);
  //maybe rerun the get user here? maybe just get user info.

  $scope.getArtists = function() {
    console.log($scope.user_id);
    $http.get('/follow/' + $scope.user_id).then(function(response) {
      console.log(response);
      $scope.artists = response
      //loops through to get albums for each artist
      response.data.forEach(function(artist){
        console.log(artist.artist_id);
        getAlbums(artist.artist_id);
      });

    });
  }//end getArtists

  getAlbums = function(artist) {
    console.log('got albums for: ' + artist);
    $http.get('/musicBrainz/albums/' + artist).then(
      function(response) {
        console.log(response);
        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );
        console.log(jsonObj);
        //extracting useful info from data-object
        var albums = jsonObj.metadata['release-list'].release
        console.log(albums);
        // maybe use angular filter?
      }
    );
  }

  //removes repeat albums from an artists album list, pushes them to a new array to be displayed
  function sortAlbums(albums) {
    var sortedAlbums = [];
    for(var i = 0; i <= albums.length; i++) {

    }
  }

}]);
