'use strict';

angular.module('landosApp')
.service('sharedProperties', [function () {
	var property = {};

	return {
		getProperty:function () {
			 return property;
		},
		setProperty:function (value) {
			 property = value;
		}
	};
 }])
.factory('cookieService',
['$rootScope', 'ipCookie', 'sharedProperties',
function($rootScope, ipCookie, sharedProperties) {
	$rootScope.$watch('sharedProperties.getProperty()', function() {
		ipCookie('value', sharedProperties.getProperty(), {expires: 2});
	});

	return {
		getValue: function() {
			return ipCookie('value') || 0;
		}
	};
}])
.factory('syncoSerivce',
['$rootScope', '$http', '$timeout',
function($rootScope, $http, $timeout) {
	var pushResult;
	function push(model) {
		$http.post('http://127.0.0.1:3000/dots', {'name' : model.name, 'value' : model.value}).
		success(function() {
			$rootScope.$broadcast('listChanged');
		}).
		error(function() {
			console.log(arguments);
		});
	}

	function list() {
		return $http.get('http://127.0.0.1:3000/dots');
	}

	$rootScope.$watch('sharedProperties.getProperty()', function(newValue) {
		if (!newValue) {
			return;
		}
		if(pushResult) {
			$timeout.cancel(pushResult);
		}
		pushResult = $timeout(function() {
			push(newValue);
		}, 500);
	});

	return {
		start: function() {
			console.log('Started sync');
		},

		list: list
	};
}])
.factory('initializer',
['$rootScope', 'syncoSerivce', 'cookieService', 'sharedProperties',
function($rootScope, syncoSerivce, cookieService, sharedProperties) {
	return {
		init: function() {
			$rootScope.sharedProperties = sharedProperties;
			syncoSerivce.start();
			sharedProperties.setProperty(cookieService.getValue());
		}
	};
}])
.controller('MainCtrl',
['$scope', 'initializer', 'sharedProperties',
function ($scope, initializer, sharedProperties) {
	initializer.init();
	$scope.$watch('sharedProperties.getProperty', function() {
		$scope.value = sharedProperties.getProperty().value;
		$scope.name = sharedProperties.getProperty().name;
	});

	$scope.$watch('value', function() {
		sharedProperties.setProperty({'value': $scope.value, 'name' : $scope.name});
	});

	// $scope.Math = window.Math;

	// $scope.mouseHandle = function($event, $delta, $deltaX, $deltaY) {
	// 	  var ab = Math.abs($scope.value);
	// 	  var coef = ab < 10 ? 50 : (ab < 100) ? 10 : 1;
	// 	  $scope.value -= $deltaY/coef;
	//  };
}]);

