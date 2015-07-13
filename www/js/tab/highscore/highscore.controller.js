(function() {
	"use strict";
	
	angular.module('app.tab.highscore')
		.controller('TabHighscoreCtrl', TabHighscoreCtrl);

	function TabHighscoreCtrl($http) {
		var vm = this;
		vm.highscores = [];
		
		activate();
		function activate() {
			dummyData();
		}

		function dummyData() {
			var url = "dummyData.json"
			// return $http(url).then(processData).catch(processData);
		}

		function processData(result) {
			console.log(result)
			if (result && 200 === result.data) {

			}
		}

	}

})();