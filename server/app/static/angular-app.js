"use strict;"

function arrayRemove(arr, cb)
{
    var aux = [];
    arr.forEach(function(elem) {
        if (cb(elem)) aux.push(elem);
    });
    return aux;
}

var baseurl = "/api";

var modules = [
    'ngRoute',
    'ngAnimate'
];

var app = angular.module('h1z1', modules)
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    }]
);

app.controller('BruteForceController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var socket = io();

    $scope.activelocation = false;
    $scope.locations = [];
    $scope.clientsinfo = [{id:"hola"}];

    $scope.deleteLocation = function(id) {
        $http.delete(baseurl + '/locations/' + id)
            .success(function(data, status, headers, config) {
                $scope.locations = arrayRemove($scope.locations, function(elem) {
                    if (elem.id == id) return false;
                    return true;
                });
            })
            .error(function(data, status, headers, config) {
            });
    }

    $scope.newLocation = function(locname) {
        $http.post(baseurl + '/locations', { name: locname })
            .success(function(data, status, headers, config) {
                $scope.locations.push(data);
            })
            .error(function(data, status, headers, config) {

            });
    };

    $scope.loadLocations = function() {
      $http.get(baseurl + '/locations')
          .success(function(data, status, headers, config) {
              $scope.locations = data;
          })
          .error(function(data, status, headers, config) {

          });
    };

    $scope.updateLocationPin = function(id, pinvalue) {
        var pinnumber = parseInt(pinvalue);
        if (pinnumber >= 0 && pinnumber < 10000 && pinvalue.length == 4)
        {
            var locindex = false;

            $scope.locations.forEach(function(loc, index) {
                if (loc.id == id) {
                    locindex = index;
                }
            });

            if (locindex !== false) {
                $http.put(baseurl + '/locations/' + id, { pin: pinvalue })
                    .success(function(data, status, headers, config) {
                        $scope.locations[locindex] = data;
                    })
                    .error(function(data, status, headers, config) {

                    });
            }
            else {
                console.log("Una localizacion no se actualizó" + locindex);
            }
        }
        else {
            console.log("Valor de PIN incorrecto");
        }
    };

    socket.on('update info', function(msg){
        console.log("Clientes actualizados");
        $scope.$apply(function () {
            $scope.activelocation = msg.door;
            $scope.clientsinfo = msg.clients;
        });
    });
}]);
