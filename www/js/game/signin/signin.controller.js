(function() {
	"use strict";
	
	angular.module('app.game.signin')
		.controller('GameSigninCtrl', GameSigninCtrl);

	function GameSigninCtrl($state, $ionicPopup, $scope, $timeout, $interval, $http, $rootScope, $ionicLoading) {
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
			showLoading();
			vm.fbData.name = data.name;
			vm.fbData.id = data.id;
			vm.isLogged = true;

			if (prom) $interval.cancel(prom);

			// Submit user data to the server
			var name = data.name.replace(" ", "+");
			var url = "http://www.makarizomatchandwin.com/rest/createuser.php?id="+data.id+"&name=" + name;
			$http.get(url);

			// Get latestScore
			var url2 = "http://www.makarizomatchandwin.com/rest/totalscore.php?id="+data.id;
			$http.get(url2).then(processData).catch(processData);
		}

		function processData(result) {
			hideLoading();
			if (result && 200 === result.status) {
				$rootScope.totalScore = result.data.total;
			}
		}

		function fbLoginError(error) {
			if (prom) $interval.cancel(prom);

			$ionicPopup.alert({
				title: 'Error code : ' + error.errorCode,
				template: error.errorMessage
			});
		}
		function showLoading() {
			$ionicLoading.show({
				template: '<ion-spinner icon="android"></ion-spinner>'
			});
		}
		function hideLoading() {
			$ionicLoading.hide();
		}
	}
})();