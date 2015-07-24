(function() {
	"use strict";
	
	angular.module('app.game.signin')
		.controller('GameSigninCtrl', GameSigninCtrl);

	function GameSigninCtrl($state, $ionicPopup, $scope, $timeout, $interval) {
		var vm = this;
		vm.fbData = {};

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

		function isEmptyData() {
			return !vm.fbData || !vm.fbData.name || !vm.fbData.id;
		}

		var prom = null;
		function doLogin() {
			if (isEmptyData()) {
				fbLogin();

				prom = $interval(function() {
					$scope.test++;
				}, 500);

				$timeout(function() {
					$interval.cancel(prom);
				}, 40000);

			} else {
				vm.isLogged = !vm.isLogged;
			}
		}

		function fbLogin() {
			facebookConnectPlugin.login(["public_profile"], fbGetProfilData, fbLoginError);
		}
		function fbGetProfilData() {
			facebookConnectPlugin.api( "/me", [], fbSuccessLogin, fbLoginError);
		}
		function fbSuccessLogin(data) {
			vm.fbData.name = data.name;
			vm.fbData.id = data.id;
			vm.isLogged = true;
			if (prom) $interval.cancel(prom);
		}
		function fbLoginError(error) {
			if (prom) $interval.cancel(prom);

			$ionicPopup.alert({
				title: 'Error code : ' + error.errorCode,
				template: error.errorMessage
			});
		}

	}
})();