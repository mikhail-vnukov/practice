"use strict";angular.module("landosApp",[]),angular.module("landosApp").service("util",function(){var a=function(a){return parseInt(a.getTime()/864e5)},b=function(){return a(new Date)},c=function(a){var c=a[0]._id,d=b(),e=Array.apply(null,new Array(Math.min(d-c,20))).map(Number.prototype.valueOf,0);return a.forEach(function(a){var b=d-a._id;20>b&&(e[b]=a.data)}),e.reverse()};return{getId:b,transform:c}}),angular.module("landosApp").factory("restClient",["$rootScope","$http","util",function(a,b,c){function d(d){b.put(f+"/dot/"+c.getId(),d).success(function(){a.$broadcast("listChanged")}).error(function(){console.log(arguments)})}function e(){return b.get(f+"/dots")}var f="http://enigmatic-thicket-4878.herokuapp.com";return{list:e,push:d}}]),angular.module("landosApp").factory("syncService",["restClient","$rootScope","$timeout",function(a,b,c){var d;return{listen:function(b,e){e.$watch(b,function(b){b&&(d&&c.cancel(d),d=c(function(){a.push(b)},500))})}}}]),angular.module("landosApp").controller("ListCtrl",["$scope","$rootScope","restClient","util","syncService",function(a,b,c,d,e){c.list().success(function(b){a.data=d.transform(b)}).error(function(a){console.log(a)}),a.$watch("value",function(b,c){b!==c&&(a.data=a.data.slice(0,-1).concat(b))}),e.listen("value",a)}]),angular.module("landosApp").directive("barsChart",[function(){return{restrict:"E",replace:!1,link:function(a,b){b.on("keydown",function(b){38===b.keyCode?a.value++:40===b.keyCode&&a.value--})}}}]),angular.module("landosApp").directive("barsChart",[function(){var a=window.d3;return{restrict:"E",replace:!1,link:function(b,c){function d(b){var d=a.select(c[0]).append("svg").attr("width",f+e.left+e.right).attr("height",g+e.top+e.bottom).append("g").attr("transform","translate("+e.left+","+e.top+")"),h=a.scale.linear().range([g,0]).domain(a.extent(b,function(a){return a})).nice(),i=a.scale.linear().domain([0,b.length]).range([0,f]),j=a.svg.axis().scale(h).orient("left");d.selectAll(".bar").data(b).enter().append("rect").attr("class",function(a){return 0>a?"bar negative":"bar positive"}).attr("y",function(a){return h(Math.max(a,0))}).attr("x",function(a,b){return i(b)}).attr("height",function(a){return Math.abs(h(0)-h(a))}).attr("width",20),d.append("g").attr("class","y axis").call(j),d.append("g").attr("class","x axis").append("line").attr("y1",h(0)).attr("y2",h(0)).attr("x2",f)}var e={top:30,right:10,bottom:10,left:30},f=960-e.left-e.right,g=500-e.top-e.bottom;b.$watch("data",function(b){b&&(a.select(c[0]).select("svg").remove(),d(b))})}}}]);