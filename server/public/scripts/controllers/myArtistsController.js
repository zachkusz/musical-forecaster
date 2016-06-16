app.controller('MyArtistsController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory',
function($scope, $http, $window, $location, LoginAndLandingFactory) {

  var now = moment(); //current date to compare album dates with
  var int = 0; //used to count how many artists are loaded and set preogress bar
  $scope.myArtists = []; // array of all the bands the user follows
  $scope.anticipatedAlbums = []; //array of albums not yet out
  //$scope.sortedAlbums = []; //array of albums filtered for repeats. is broken :(

  $scope.userName = LoginAndLandingFactory.user.userName;
  $scope.user_id = LoginAndLandingFactory.user.user_id;
  console.log($scope.userName);

  var user_id = LoginAndLandingFactory.user.user_id
  console.log(user_id);

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
        if (z + 1 == int) {
          bar.animate(1.0);
          console.log('on last artist, setting loading bar to 1.0');
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
  // function removeDuplicates(albums) {
  //   for (var i = 0; i < albums.length; i++) {
  //     if (i == 0) {
  //       $scope.sortedAlbums.push(albums[i]);
  //     } else if (albums[i].title != $scope.sortedAlbums[$scope.sortedAlbums.length - 1].title) {
  //       $scope.sortedAlbums.push(albums[i]);
  //     }
  //   }
  //   console.log('sortedalbums', $scope.sortedAlbums);
  // }

  var bar = new ProgressBar.Line(container, {
  strokeWidth: 4,
  easing: 'easeOut',
  duration: 1000,
  color: '#FFA500',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'}
  });
  bar.animate(1.0, {
    duration: 15000
  });  // Number from 0.0 to 1.0

  function setProgress(artists) {
    int = artists.length;
    console.log(int);
  }

}]);
