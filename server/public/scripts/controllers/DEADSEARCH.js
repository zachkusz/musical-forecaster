$scope.searchTodaysAlbums = function(){
  $http({
  method: 'GET',
  url: 'http://musicbrainz.org/ws/2/label/?query=Devils'
}).then(function successCallback(response) {
    console.log(response.data);
    var x2js = new X2JS();
    // var xmlText = response.data;
    var jsonObj = x2js.xml_str2json( response.data );
    console.log(jsonObj);
  }, function errorCallback(response) {
    console.log('err', response);
  });
}
