app.controller('FollowNewController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory',
function($scope, $http, $window, $location, LoginAndLandingFactory) {
  console.log('followNew controller running');
  getArtists();
  $scope.userName = LoginAndLandingFactory.user.userName;
  var user_id = LoginAndLandingFactory.user.user_id;
  var allArtists = [];
  console.log($scope.userName);
  $scope.query = ''; //makes user's search a global scope

  $scope.search = function() {
    $scope.artists = []; //resets the array for every search
    console.log('searched for: ' + $scope.query);
    getArtists().then(function() {
      $http.get('/musicBrainz/search/' + $scope.query).then(
        function(response) {
          console.log(response);
          //converts xml to json
          var x2js = new X2JS();
          var xmlText = response.data;
          var jsonObj = x2js.xml_str2json( xmlText );

          //checks for errors  and displays result count
          if (jsonObj == null || jsonObj.metadata == undefined || jsonObj.metadata['artist-list'].artist == undefined) {
            $scope.found = 'No results - try another search ' +
            '(or MusicBrainz is just mad so try again)';
          } else {
            $scope.found = 'Displaying top ' +
            jsonObj.metadata['artist-list'].artist.length +
            ' of ' + jsonObj.metadata['artist-list']._count + ' results.';
          }

          //extracting useful info from data-object
          $scope.artists = jsonObj.metadata['artist-list'].artist;

          for (var i = 0; i < $scope.artists.length; i++) {
            $scope.artists[i].isClicked = false;
            $scope.artists[i].alreadyFollowed = false;
          }
          console.log('list after alreadyFollowed added', $scope.artists);
        }
      );
    });

  }//end of search

  //user clicks on a band to follow it
  $scope.follow = function(artist) {
    var follow = {id: artist._id, name: artist.name, user_id: user_id};
    artist.isClicked = true;

    //checks if this artist is already in the artist list for any user
    for (var y = 0; y < allArtists.length; y++ ) {
      if (allArtists[y].artist_id == artist._id) {
        //send to weird path
        artist.alreadyFollowed = true;
        console.log('sent to wierd path');
      }
    }

    if (artist.alreadyFollowed == true) {
      //weird path
      $http.post('/follow/repeat/artist', follow).then(
        function(response) {
          console.log('followed on the weird path', response);
        }
      );
    } else {
      //happy path
      $http.post('/follow', follow).then(
        function(response) {
          console.log('followed on the happy path', response);
        }
      );
    }
  }//end of follow

  function getArtists() {
    return $http.get('/follow/artists/all').then(function(response) {
      allArtists = response.data;
      console.log('allArtists after get call', allArtists)
    });
  }//end getArtists

}]);
