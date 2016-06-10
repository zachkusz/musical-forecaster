app.factory('LoginAndLandingFactory', ['$http', '$window', '$location', function($http, $window, $location) {

  //\\ userinfo - may need to do this in a factory all below needed to do login stuffs\\//
  // var user_id= {};
  var user = {};
  getUser();

  function getUser() {
  $http.get('/router').then(function(response) {
        if(response.data.username) {
            user.userName = response.data.username;
            user.user_id = response.data.id; //var initialized above
            console.log('User Data: ', user.userName);
        } else {
            $location.path("/login");
        }
    });
  }

  function logout() {
    $http.get('/router/logout').then(function(response) {
      console.log('logged out');
      $location.path("/login");
    });
  };
  //\\ end of login/logout stuffs \\//

  var textVar = 'Hello from the factory';
  function factoryFunction() {
    return 10;
  }

  var factory = {
    exampleText: textVar,
    exampleFunction : function(){
      return factoryFunction();
    },
    getUser: function() {
      return getUser();
    },
    logout: function() {
      return logout();
    },
    user: user
  };
  return factory;
}]);
