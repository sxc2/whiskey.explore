'use strict';


// Declare app level module which depends on filters, and services
angular.module('personalApp', [
  'ngRoute',
  'personalApp.filters',
  'personalApp.services',
  'personalApp.directives',
  'personalApp.controllers'
]).
config(['$routeProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
  $locationProvider.hashPrefix('!');
}]);
