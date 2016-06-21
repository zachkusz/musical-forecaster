app.factory('LoginAndLandingFactory', ['$http', '$window', '$location', function($http, $window, $location) {

  var user = {};

  function getUser() {
  return $http.get('/router').then(function(response) {
        if(response.data.username) {
            user.userName = response.data.username;
            user.user_id = response.data.id; //var initialized globaly
            console.log('User Data: ', user.userName);
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
