app.factory('LoginAndLandingFactory', ['$http', '$window', '$location', function($http, $window, $location) {

  var user = {};
  //var artists = [];

  // function getArtists() {
  //   return $http.get('/follow/' + user.user_id).then(function(response) {
  //     console.log(response);
  //     artists = response.data;
  //     //loops through to get albums for each artist
  //     for (var z = 0; z < artists.length; z++) {
  //       getArtistName(artists[z].artist_id, z);
  //     }
  //
  //   });
  // }//end getArtists

  // getArtistName = function(artist_id, i) {
  //   return $http.get('/follow/name/' + artist_id).then(function(response) {
  //     artists[i].name = response.data[0].artist_name;
  //     console.log(artists);
  //   });
  // }

  function getUser() {
  return $http.get('/router').then(function(response) {
        if(response.data.username) {
            user.userName = response.data.username;
            user.user_id = response.data.id; //var initialized globaly
            console.log('User Data: ', user.user_id);
        } else {
            $location.path("/login");
        }
    });
  }

  function logout() {
    return $http.get('/router/logout').then(function(response) {
      console.log('logged out');
      $location.path("/login");
      user.userName = undefined;
      user.user_id = undefined;
    });
  };


  var factory = {
    getUser: function() {
      return getUser();
    },
    logout: function() {
      return logout();
    },
    user: user,
    getArtists: function() {
      return getArtists();
    }
  };
  return factory;

}]);
