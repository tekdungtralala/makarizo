(function() {
	"use strict";
	
	angular.module('app.tab.product')
		.controller('TabProductCtrl', TabProductCtrl);

	function TabProductCtrl($rootScope, $interval) {
		var vm = this;

		var WAITING_TIME = 5000;
		vm.activeSlide = 0;

		activate();
		function activate() {
			if ($rootScope.interval) {
				$interval.cancel($rootScope.interval);
			}
			var a = 1;
			$rootScope.interval = $interval(function() {
				vm.activeSlide++;
				if (vm.activeSlide >= 3) vm.activeSlide = 0;
			}, WAITING_TIME);
		}
	}

})();