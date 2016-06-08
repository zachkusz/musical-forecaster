app.controller('LandingController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {

$scope.message = LoginAndLandingFactory.exampleText;

//requests albums released today (logic is server side)
$scope.searchTodaysAlbums = function(){
  // if (jsonObj == null){
    $http.get('/todaysAlbums').then(
      function(response) {
        console.log(response);
        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );
        console.log(jsonObj);
      }
    );
  // }
} //end of searchTodaysAlbums

//\\ userinfo - may need to do this in a factory all below needed to do login stuffs\\//
$scope.user_id= {};
getUser();

function getUser() {
$http.get('/router').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          $scope.user_id = response.data._id;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/login");
      }
  });
}

$scope.logout = function() {
  $http.get('/router/logout').then(function(response) {
    console.log('logged out');
    $location.path("/login");
  });
};
//\\ end of login/logout stuffs \\//
}]);
