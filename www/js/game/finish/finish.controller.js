(function() {
	"use strict";
	
	angular.module('app.game.play')
		.controller('GameFinishCtrl', GameFinishCtrl);

	function GameFinishCtrl($state, $stateParams) {

		var vm = this;
		vm.time = 0;
		vm.options = {
			max:  10,
			bgColor: "#303" ,
			fgColor: "#ffec03",
			displayInput:true,
			width: 60,
			height: 60,
			thickness: 0.2,
			skin: "tron" 
		}

		vm.score = null;
		vm.level = null;

		activate();
		function activate() {
			var score = $stateParams.score;
			var level = $stateParams.level;
			if (!score || !level) {
				$state.go('tab.home');
			} else {
				vm.score = score;
				vm.level = level;
			}
		}
	}
})();