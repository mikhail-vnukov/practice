'use strict';

angular.module('landosApp')
.factory('restClient',
['$rootScope', '$http', 'util',
function($rootScope, $http, util) {
	function push(model) {
		$http.put('http://127.0.0.1:3000/dot/'+ util.getId(), model).
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

	return {
		list: list,
		push: push
	};
}])
.factory('syncService',
['restClient', '$rootScope', '$timeout',
function(restClient, $rootScope, $timeout) {
		var pushResult;
		return {
			start: function() {
				$rootScope.$watch('sharedProperties.value', function(newValue) {
					if (!newValue) {
						return;
					}
					if(pushResult) {
						$timeout.cancel(pushResult);
					}
					pushResult = $timeout(function() {
						restClient.push(newValue);
					}, 500);
				});
			}
		};
}]);