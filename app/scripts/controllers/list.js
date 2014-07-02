'use strict';

angular.module('landosApp')
.controller('ListCtrl',
['$scope', '$rootScope', 'restClient', 'util',
function ($scope, $rootScope, restClient, util) {

	function transform(dateData) {
		var firstDate = dateData[0]._id;
		var lastDate = dateData.slice(-1)[0]._id;
		var currentDate = util.getId();
		var data = Array.apply(null, new Array(Math.min(currentDate - firstDate, 20)))
			.map(Number.prototype.valueOf, 0);

		dateData.forEach(function(element) {
			var normalized = lastDate - element._id;
			if (normalized < 20) {
				data[normalized] = element.data;
			}
		});

		return data.reverse();
	}

	restClient.list().
		success(function(result) {
			$scope.data = transform(result);
		}).
		error(function(error) {
			console.log(error);
		});

	$scope.$watch('sharedProperties.value', function(newValue, oldValue) {
		if (newValue === oldValue) { return; }
		$scope.data = $scope.data.slice(0, -1).concat(newValue);
	});

}]);