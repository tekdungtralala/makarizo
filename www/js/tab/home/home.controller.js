(function() {
	"use strict";
	
	angular.module('app.tab.home')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($scope) {
		var vm = {};
		vm.go = go;
		vm.abc="def"
		$scope.vm = vm;
		function go(argument) {
			console.log("go");
		}
		// console.log("start howtoplay ctrl");
	}

})();