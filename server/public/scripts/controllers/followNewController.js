app.controller('FollowNewController', ['$scope','$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('followNew controller running');

  $scope.query = '';

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

  $scope.follow = function(id, name) {
    console.log('followed ' + id + name);
  }//end of follow

}]);
