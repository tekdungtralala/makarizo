(function() {
	"use strict";
	
	angular.module('app.game.signin')
		.controller('GameSigninCtrl', GameSigninCtrl);

	function GameSigninCtrl($state) {
		var vm = this;

		vm.isLogged = false;
		vm.doLogin = doLogin;
		vm.backToHome = backToHome;
		vm.gotoPlay = gotoPlay;

		function gotoPlay() {
			$state.go('game.play');
		}

		function backToHome() {
			$state.go('tab.home');
		}

		function doLogin() {
			vm.isLogged = !vm.isLogged;
		}		
	}
})();