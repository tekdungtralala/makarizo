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
			var url = "https://raw.githubusercontent.com/tekdungtralala/makarizo/9e776132b893b85d9c19c55b9d14eba8b0f8fb36/dummydata.json"
			return $http.get(url).then(processData).catch(processData);
		}

		function processData(result) {
			console.log(result)
			if (result && 200 === result.data) {

			}
		}

	}

})();