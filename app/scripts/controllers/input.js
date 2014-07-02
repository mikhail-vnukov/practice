'use strict';

angular.module('landosApp')
.controller('InputCtrl',
['$scope', 'initializer', 'sharedProperties',
function ($scope, initializer, sharedProperties) {
	initializer.init();

	$scope.$watch('sharedProperties.value', function() {
		$scope.value = sharedProperties.value;
	});

	$scope.$watch('value', function() {
		sharedProperties.value = parseInt($scope.value);
	});

	$scope.handleKey = function($event) {
		if ($event.keyCode === 38) {
			$scope.value++;
		} else if ($event.keyCode === 40) {
			$scope.value--;
		}
	};
}]);

