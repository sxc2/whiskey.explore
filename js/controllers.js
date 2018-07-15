var app = angular.module('personalApp', []);
app.controller('MyCtrl1', function($scope, $location) {
    $scope.style = {
    	collapsed: false
    }

	$scope.url = {
    	current: $location.absUrl()
    }

});