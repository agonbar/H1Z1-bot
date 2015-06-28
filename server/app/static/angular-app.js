"use strict;"

var modules = [
    'ngRoute',
    'ngAnimate'
];

var app = angular.module('h1z1', modules)
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    }]
);

app.controller('BruteForceController', ['$scope', '$location', function($scope, $location) {
  $scope.locations = [{id:1, name:"Casa al lado bomberos", pin:false, active: true}];
  $scope.clients = [];

  $scope.active = function(id) {}
  $scope.delete = function(id) {}
}]);
