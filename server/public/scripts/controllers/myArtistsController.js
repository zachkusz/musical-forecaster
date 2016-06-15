app.controller('MyArtistsController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

  var now = moment(); //current date to compare album dates with
  $scope.myArtists = []; // array of all the bands the user follows
  $scope.anticipatedAlbums = []; //array of albums not yet out
  //$scope.sortedAlbums = []; //array of albums filtered for repeats. is broken :(

  $scope.user_id = LoginAndLandingFactory.user.user_id;
  console.log($scope.user_id);

  // LoginAndLandingFactory.getUser;
  var user_id = LoginAndLandingFactory.user.user_id
  console.log(user_id);

  getArtists();

  function getArtists() {
    console.log($scope.user_id);
    $http.get('/follow/' + $scope.user_id).then(function(response) {
      console.log(response);
      $scope.artists = response.data;
      //loops through to get albums for each artist
      response.data.forEach(function(artist){
        getArtistName(artist.artist_id);
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

        //gets the array of albums
        var albums = jsonObj.metadata['release-list'].release;

        sortOutUpcommingAlbums(albums);
        //removeDuplicates($scope.anticipatedAlbums); is broken :(

        console.log(albums);
        console.log($scope.anticipatedAlbums);

      }
    );
  } //end of getAlbums

  //gets each artists name to use when appending dom
  getArtistName = function(artist_id) {
    $http.get('/follow/name/' + artist_id).then(function(response) {
      $scope.myArtists.push(response.data[0].artist_name);
    });
  }

  function sortOutUpcommingAlbums(albums) {
    for (var j = 0; j < albums.length; j++) {
      //if album has no date it is given arbitrary old date - to keep it off of the upcoming list
      if (albums[j].date == null) {
        albums[j].date = moment();
        albums[j].date = moment().subtract(1, 'months');
      }
      albums[j].date = moment(albums[j].date);

      // pushes only new albums into upcoming array
      if (albums[j].date._d >= now) {
        $scope.anticipatedAlbums.push(albums[j]);
      }
    }
  }

  //is broken :(
  function removeDuplicates(albums) {
    for (var i = 0; i < albums.length; i++) {
      if (i == 0) {
        $scope.sortedAlbums.push(albums[i]);
      } else if (albums[i].title != $scope.sortedAlbums[$scope.sortedAlbums.length - 1].title) {
        $scope.sortedAlbums.push(albums[i]);
      }
    }
    console.log('sortedalbums', $scope.sortedAlbums);
  }

}]);
