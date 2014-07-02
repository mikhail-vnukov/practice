'use strict';

angular.module('landosApp')
.service('util', function() {
	var getDateOnly = function(date) {
		return parseInt(date.getTime()/(1000*60*60*24));
	};

	return {
		getId: function() {
			return getDateOnly(new Date());
		}
	};
});