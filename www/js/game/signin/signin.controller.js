(function() {
	"use strict";
	
	angular.module('app.game.signin')
		.controller('GameSigninCtrl', GameSigninCtrl);

	function GameSigninCtrl($state, $ionicPopup, $scope, $timeout, $interval, $http, $rootScope, $ionicLoading) {
		var vm = this;
		vm.isLogged = false;
		vm.imgdata = null;
		vm.showPlayBtn = false;

		vm.doLogin = doLogin;
		vm.backToHome = backToHome;
		vm.gotoPlay = gotoPlay;
		vm.usingCamera = usingCamera;

		var imgData = null;

		activate();
		function activate() {
			if (!isEmptyData()) {
				vm.isLogged = true;
			}
		}
		function test() {
			vm.isLogged = true;
			$rootScope.fbData = {};
			$rootScope.fbData.name = "test";
		}

		function submitImage(imageData) {
			
			var url = "http://www.makarizomatchandwin.com/rest/image.php";
			var data = $.param(
				{
					imageData: imageData,
					userId: $rootScope.fbData.id
				}
			);
			var postOpt = {
				method: 'POST',
				url: url,
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			};

			prom = $interval(function() {
			}, 500);
			$timeout(function() {
				$interval.cancel(prom);
			}, 40000);

			showLoading();
			$http(postOpt)
				.then(afterSubmitImage)
				.catch(afterSubmitImage);
		}

		function afterSubmitImage(result) {
			hideLoading();
			if (prom) $interval.cancel(prom);

			$state.go('game.play');
		}

		function usingCamera() {
			var cameraOptions = { 
				quality: 50,
				targetWidth: 400,
				targetHeight: 400,
				encodingType: Camera.EncodingType.JPEG,
				destinationType: Camera.DestinationType.DATA_URL
			};
			vm.showPlayBtn = false;
			navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

				prom = $interval(function() {
				}, 500);

				$timeout(function() {
					$interval.cancel(prom);
				}, 40000);
		}

		function cameraSuccess(imageData) {
			imgData = imageData;
			vm.showPlayBtn = true;
			var image = document.getElementById('myImage');
			image.src = "data:image/jpeg;base64," + imgData;

			if (prom) $interval.cancel(prom);
		}

		function cameraError(e) {
			if (prom) $interval.cancel(prom);
		}


		function gotoPlay() {
			submitImage(imgData);
		}

		function backToHome() {
			$state.go('tab.home');
		}

		function isEmptyData() {
			return !$rootScope.fbData || !$rootScope.fbData.name || !$rootScope.fbData.id;
		}

		var prom = null;
		function doLogin() {
			if (isEmptyData()) {
				fbLogin();

				prom = $interval(function() {
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
			$rootScope.fbData = {};
			$rootScope.fbData.name = data.name;
			$rootScope.fbData.id = data.id;
			vm.isLogged = true;
			$rootScope.userId = data.id;

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