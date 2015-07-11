(function() {
	"use strict";

	angular.module('app.home')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($state) {
		var vm = this;

		vm.playGame = playGame;

		function playGame() {
			$state.go('tab.home')
		}
	}

})();