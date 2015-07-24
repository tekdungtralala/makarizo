(function() {
	"use strict";
	
	angular.module('app.game.play')
		.controller('GameFinishCtrl', GameFinishCtrl);

	function GameFinishCtrl($state, $stateParams, $ionicLoading, $http, $rootScope) {

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

		vm.gotoSignin = gotoSignin;

		activate();
		function activate() {
			var score = $stateParams.score;
			var level = $stateParams.level;
			if (!score || !level) {
				$state.go('tab.home');
			} else {
				vm.score = score;
				vm.level = level;

				showLoading();
				// submit score
				var url = "http://www.makarizomatchandwin.com/rest/score.php?id="+$rootScope.userId+"&score=" + score;
				$http.get(url).then(processData).catch(processData);
			}
		}

		function processData(result) {
			hideLoading();
			if (result && 200 === result.status) {
				$rootScope.totalScore = result.data.total;
			}
		}

		function gotoSignin() {
			$state.go('game.signin');
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