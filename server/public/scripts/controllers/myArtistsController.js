app.controller('MyArtistsController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

  var now = moment(); //current date to compare album dates with
  $scope.anticipatedAlbums = []; //array of albums not yet out
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
    //console.log('got albums for: ' + artist);
    getArtistName(artist);

    $http.get('/musicBrainz/albums/' + artist).then(
      function(response) {
        console.log(response);

        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );
        console.log(jsonObj);

        //gets the array of albums
        var albums = jsonObj.metadata['release-list'].release;

        //fixes date on each album to compare time, pushes new albums to new array
        albums.forEach(function(album){
          if (album.date == null){
            album.date = moment(album.date);
            album.date = moment().subtract(1, 'months');
          }
          album.date = moment(album.date);

          // pushes only new albums into upcoming array
          if (album.date._d >= now){
            $scope.anticipatedAlbums.push(album);
          }
        });
        console.log(albums);
        console.log($scope.anticipatedAlbums);

      }
    );
  } //end of getAlbums

  //gets each artists name to use when appending dom
  getArtistName = function(artist_id) {
    $http.get('/follow/name/' + artist_id).then(function(response) {
      console.log(response.data[0].artist_name);
    });
  }//end of getArtistName

}]);
