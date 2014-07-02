'use strict';

angular.module('landosApp')
.factory('cookieService',
['$rootScope', 'ipCookie', 'sharedProperties',
function($rootScope, ipCookie, sharedProperties) {
	$rootScope.$watch('sharedProperties.value', function(newValue, oldValue) {
		if (newValue !== oldValue) {
			ipCookie('value', sharedProperties.value, {expires: 2});
		}
	});

	return {
		getValue: function() {
			return ipCookie('value') || 0;
		}
	};
}]);
