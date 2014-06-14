'use strict';

angular.module('landosApp')
.directive('barsChart', [function () {
	var d3 = window.d3;
	return {
		restrict: 'E',
		replace: false,
		link: function ($scope, element) {

			var margin = {top: 30, right: 10, bottom: 10, left: 30},
				 width = 960 - margin.left - margin.right,
				 height = 500 - margin.top - margin.bottom;

			$scope.$watch('data', function(newValue) {
				if (newValue) {
					d3.select(element[0]).select('svg').remove();
					update(newValue);
				}
			});

			function update(data) {
				var svg = d3.select(element[0]).append('svg')
					 .attr('width', width + margin.left + margin.right)
					 .attr('height', height + margin.top + margin.bottom)
					.append('g')
					 .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
				var y = d3.scale.linear()
					.range([height, 0])
					.domain(d3.extent(data, function(d) { return d.value; })).nice();
				var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.2)
					.domain(data.map(function(d) { return d.name; }));

				var yAxis = d3.svg.axis().scale(y).orient('left');

				svg.selectAll('.bar')
					.data(data)
					.enter().append('rect')
					.attr('class', function(d) { return d.value < 0 ? 'bar negative' : 'bar positive'; })
					.attr('y', function(d) {
							return y((Math.max(d.value, 0)));
					})
					.attr('x', function(d) { return x(d.name); })
					.attr('height', function(d) {
						return Math.abs(y(0) - y(d.value));
					})
					.attr('width', x.rangeBand());

				svg.append('g')
					.attr('class', 'y axis')
					.call(yAxis);

				svg.append('g')
					.attr('class', 'x axis')
				 .append('line')
					.attr('y1', y(0))
					.attr('y2', y(0))
					.attr('x2', width);
			}

		}
	};
}]);