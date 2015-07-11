(function() {
	"use strict";
	
	angular.module('app.tab.home')
		.controller('TabHomeCtrl', TabHomeCtrl);

	function TabHomeCtrl($scope) {
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