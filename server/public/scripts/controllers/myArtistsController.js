app.controller('MyArtistsController', ['$scope', '$http', '$window', '$location', 'LoginAndLandingFactory',
function($scope, $http, $window, $location, LoginAndLandingFactory) {

  var now = moment(); //current date to compare album dates with
  var int = 0; //used to count how many artists are loaded and set preogress bar
  $scope.isError = false; //used for angular error message
  $scope.failed = []; //used to research for queries that filed to load
  $scope.myArtists = []; // array of all the bands the user follows to append with
  $scope.anticipatedAlbums = []; //array of albums not yet out to append with
  $scope.user_id = LoginAndLandingFactory.user.user_id;

  getArtists();

  function getArtists() {
    $http.get('/follow/' + $scope.user_id).then(function(response) {
      console.log(response);
      var artists = response.data;
      setProgress(artists);
      //loops through to get albums for each artist
      for (var z = 0; z < artists.length; z++) {
        getArtistName(artists[z].artist_id);
        getAlbums(artists[z].artist_id, z);
      }

    });
  }//end getArtists

  getAlbums = function(artist, z) {
    $http.get('/musicBrainz/albums/' + artist).then(
      function(response) {
        console.log(response);

        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );

        //checks if musicbrainz refused any requests
        if (jsonObj == null || jsonObj.metadata == undefined) {
          $scope.isError = true;
          $scope.failed.push(artist);
        }

        //gets the array of albums
        var albums = jsonObj.metadata['release-list'].release;

        sortOutUpcommingAlbums(albums);

        //sets loading bar to 100% after last artist in array returns promise
        if (z + 1 == int) {
          bar.animate(1.0, {
            easing: 'linear'
          });
        }
      }
    );
  } //end of getAlbums

  //gets each artists name to use when appending dom
  getArtistName = function(artist_id) {
    $http.get('/follow/name/' + artist_id).then(function(response) {
      $scope.myArtists.push(response.data[0].artist_name);
    });
  }

  $scope.error = ':( MusicBrainz refused your friendship... \nKeep Trying!';
  $scope.refresh = function(failedArray) {
    $scope.isError = false;
    var thisFailureInstance = failedArray.length;
    for (var y = thisFailureInstance; y > 0; y--) {
      getAlbums($scope.failed[y - 1], -2); //arbitrary number so as to not fuck with the loading bar
      $scope.failed.pop();
    }
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
        getArtwork(albums[j]._id); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        $scope.anticipatedAlbums.push(albums[j]);
        console.log('list of upcoming albums', albums);
      }
    }
  }

  //need a way to tell angular how to interpret json
  function getArtwork(mbid) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('searching for artwork by ' + mbid);
    $http({
    method: 'JSONP',
    url: "http://coverartarchive.org/release/" + mbid })
    .then(function successCallback(response) {
      console.log('good album art', response);
    }, function errorCallback(response) {
      console.log(' BAD album art', response);
    });
  }

  var bar = new ProgressBar.Line(container, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1000,
  color: '#FFA500',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'}
  });
  bar.animate(1.0, {
    duration: 18000
  });

  function setProgress(artists) {
    int = artists.length;
  }

}]);
