(function() {
	"use strict";
	
	angular.module('app.tab.home')
		.controller('TabHomeCtrl', TabHomeCtrl);

	function TabHomeCtrl() {
		var vm = this;
		vm.abc = "def;";

		// vm.width = '450px';
		vm.doSpin = doSpin;
		function doSpin() {
			AnimateRotate(getRandomInt(1000, 5000));
		}

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function AnimateRotate(d){
			$({deg: 0}).animate({deg: d}, {
				step: function(now, fx){
					$("#wheel").css({transform: "rotate(" + now + "deg)"});
				}
			});
		}
	}

})();