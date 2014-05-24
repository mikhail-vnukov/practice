'use strict';

angular.module('landosApp')
.controller('MainCtrl', ['$scope', 'ipCookie', function ($scope, ipCookie) {
	$scope.value = ipCookie('value') || 0;
    $scope.Math = window.Math;
    $scope.mouseHandle = function($event, $delta, $deltaX, $deltaY) {
        var ab = Math.abs($scope.value);
        var coef = ab < 10 ? 50 : (ab < 100) ? 10 : 1;
        $scope.value -= $deltaY/coef;
        ipCookie('value', $scope.value, {expires: 2});
    };
}]);

