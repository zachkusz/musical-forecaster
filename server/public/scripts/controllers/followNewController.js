app.controller('FollowNewController', ['$scope','$http', '$window', '$location', 'LoginAndLandingFactory', function($scope, $http, $window, $location, LoginAndLandingFactory) {
  console.log('followNew controller running');

  LoginAndLandingFactory.getUser; //line may be redundant? May only need to get user data once
  //gets user to use in bridge table when they follow an artist
  var user_id = LoginAndLandingFactory.user.user_id;
  console.log(user_id);
  //makes user's search a global scope
  $scope.query = '';

  //user searches for a band to follow
  $scope.search = function() {
    console.log('searched for: ' + $scope.query);
    $http.get('/musicBrainz/search/' + $scope.query).then(
      function(response) {
        console.log(response);
        //converts xml to json
        var x2js = new X2JS();
        var xmlText = response.data;
        var jsonObj = x2js.xml_str2json( xmlText );
        console.log(jsonObj);
        //extracting useful info from data-object
        console.log(jsonObj.metadata['artist-list'].artist);
        $scope.artists = jsonObj.metadata['artist-list'].artist;
        //displays result count
        $scope.found = 'Displaying top 25 of ' + jsonObj.metadata['artist-list']._count + ' results.';
      }
    );
  }//end of search

  //user clicks on a band to follow it
  $scope.follow = function(id, name) {
    var follow = {id: id, name: name, user_id: user_id};
    console.log('followed ', follow);

    $http.post('/follow', follow).then(
      function(response) {
        console.log(response);
      }
    );
  }//end of follow

}]);
