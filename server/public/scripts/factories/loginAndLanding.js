app.factory('LoginAndLandingFactory', ['$http', function($http) {

  var textVar = 'Hello from the factory';

  function factoryFunction() {
    return 10;
  }

  var test = {
    exampleText: textVar,
    exampleFunction : function(){
      return factoryFunction();
    }
  };

  return test;
}]);
