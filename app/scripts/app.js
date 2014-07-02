'use strict';

angular.module('landosApp', ['ipCookie'])
.service('sharedProperties', [function () {
	return {
		value: 0
	};
 }])
.factory('initializer',
['$rootScope', 'syncService', 'sharedProperties',
function($rootScope, syncService, sharedProperties) {
	return {
		init: function() {
			$rootScope.sharedProperties = sharedProperties;
			syncService.start();
		}
	};
}]);