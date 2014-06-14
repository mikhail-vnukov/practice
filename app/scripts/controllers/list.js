'use strict';

angular.module('landosApp')
.controller('ListCtrl',
['$scope', 'syncoSerivce',
function ($scope, syncoSerivce) {
	function redraw() {
		syncoSerivce.list().
		success(function(result) {
			$scope.data = result;
		}).
		error(function(error) {
			console.log(error);
		});
	}
	redraw();
	$scope.$on('listChanged', function() {
		redraw();
	});

}]);