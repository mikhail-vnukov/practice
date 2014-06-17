'use strict';

angular.module('landosApp')
.controller('ListCtrl',
['$scope', '$rootScope', 'syncoSerivce', 'sharedProperties',
function ($scope, $rootScope, syncoSerivce) {
	syncoSerivce.list().
	success(function(result) {
		$scope.data = result;
	}).
	error(function(error) {
		console.log(error);
	});

	$scope.$watch('sharedProperties.getProperty()', function(newValue) {
		var element = $scope.data.slice(-1);
		element[0].data = newValue;
		$scope.data = $scope.data.slice(0, -1).concat(element);
	});

}]);