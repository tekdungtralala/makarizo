(function() {
	"use strict";
	
	angular.module('app.tab.highscore')
		.controller('TabHighscoreCtrl', TabHighscoreCtrl);

	function TabHighscoreCtrl() {
		var vm = this;
		vm.highscores = [];
		
		activate();
		function activate() {
			dummyData();
		}

		function dummyData() {
			vm.highscores.push({name: "lorem 1", score: 100});
			vm.highscores.push({name: "lorem 2", score: 99});
			vm.highscores.push({name: "lorem 3", score: 98});
			vm.highscores.push({name: "lorem 4", score: 97});
			vm.highscores.push({name: "lorem 5", score: 96});
			vm.highscores.push({name: "lorem 6", score: 95});
			vm.highscores.push({name: "lorem 7", score: 94});
		}
	}

})();