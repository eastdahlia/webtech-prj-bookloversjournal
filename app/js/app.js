 var mainApp = angular.module("mainApp", ['ngRoute']);
 mainApp.config(function($routeProvider) {
  $routeProvider.
  when('/home', {
   templateUrl: 'pages/home.html',
  }).
  when('/addnewbook', {
   templateUrl: 'pages/addnewbook.html',
  }).
  when('/viewbooks', {
   templateUrl: 'pages/viewbooks.html',
   controller: 'booksController'
  }).
  when('/deletebooks', {
   templateUrl: 'pages/deletebooks.html',
   controller: 'deleteBookController'
  }).
  when('/editbooks', {
   templateUrl: 'pages/editbooks.html',
   controller: 'editBookController'
  }).
  when('/viewreferences', {
   templateUrl: 'pages/viewreferences.html',
   controller: 'viewReferenceController'
  }).
  otherwise({
   redirectTo: '/home'
  });
 });

 mainApp.controller('booksController', ['$scope', '$http', function($scope, $http) {
  $http.get('/books').then(function(response) {
   $scope.books = response.data;
  });
 }]);

 mainApp.controller('deleteBookController', ['$scope', '$http', function($scope, $http) {
  $http.get('/books').then(function(response) {
   $scope.books = response.data;
  });
  $scope.deleteBook = function() {
   $http.delete('/books/' + $scope.x.book_id)
    .success(function(response, status, headers, config) {})
    .error(function(response, status, headers, config) {
     $scope.error_message = response.error_message;
    });
  }
 }]);


 mainApp.controller('editBookController', ['$scope', '$http', function($scope, $http) {
  $http.get('/books').then(function(response) {
   $scope.books = response.data;
  });

  $scope.addNewReference = function() {
   document.getElementById("formReference").style.display = "block";
   document.getElementById("formChangeName").style.display = "none";
   document.getElementById("bookIdReference").value = $scope.x.book_id;
  }

  $scope.changeName = function() {
   document.getElementById("formChangeName").style.display = "block";
   document.getElementById("formReference").style.display = "none";
  }

  $scope.changeNameDatabase = function() {
   $http.put('/books/' + $scope.x.book_id, $scope.bookEdit).
   success(function(data) {
    console.log("put successful");
   }).error(function(data) {
    console.error("error in put http request");
   })
   $scope.bookEdit = "";
  }
 }]);


 mainApp.directive('numbersOnly', function() {
  return {
   require: 'ngModel',
   link: function(scope, element, attr, ngModelCtrl) {
    function fromUser(text) {
     if (text) {
      var transformedInput = text.replace(/[^0-9]/g, '');

      if (transformedInput !== text) {
       ngModelCtrl.$setViewValue(transformedInput);
       ngModelCtrl.$render();
      }
      return transformedInput;
     }
     return undefined;
    }
    ngModelCtrl.$parsers.push(fromUser);
   }
  };
 });

 mainApp.controller('viewReferenceController', ['$scope', '$http', function($scope, $http) {
  $http.get('/books').then(function(response) {
   $scope.books = response.data;
  });
  $scope.showTable = function() {
   $http.get('/references/'+$scope.r.bookId).then(function(response) {
    $scope.references = response.data;
   });
   
   document.getElementById("tableShowReferences").style.display="block";
  }
 }]);
 