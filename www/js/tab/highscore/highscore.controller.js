(function() {
	"use strict";
	
	angular.module('app.tab.highscore')
		.controller('TabHighscoreCtrl', TabHighscoreCtrl);

	function TabHighscoreCtrl($http, $rootScope) {
		var vm = this;
		vm.showPrevBtn = true;
		vm.showNextBtn = true;
		vm.highscores = [];
		vm.position = 1;

		var TOTAL_ROW = 10;
		var start = 0;
		var end = start + TOTAL_ROW;

		vm.updatedata = updatedata;
		
		activate();
		function activate() {
			if (!$rootScope.highscores) fetchData();
			else updateAttribute();
		}

		function updatedata(nexButtonPress) {
			if (nexButtonPress) {
				start = end;
				end = end + TOTAL_ROW;
				vm.position = vm.position + TOTAL_ROW;
			} else {
				end = start;
				start = start - TOTAL_ROW;
				vm.position = vm.position - TOTAL_ROW;
			}
			updateAttribute()
		}

		function fetchData() {
			var url = "http://makarizomatchandwin.com/rest/highscore.php";
			$http.get(url).then(processData).catch(processData);
		}

		function processData(result) {
			if (result && 200 === result.status) {
				var data = result.data;
				$rootScope.highscores = [];
				_.every(data, function(d) {
					$rootScope.highscores.push({name: d[0], score: d[1]});
					return true;
				});
				updateAttribute();
			}
		}



		function updateAttribute() {
			vm.showPrevBtn = _.slice($rootScope.highscores, start - 10, start).length >= 1;
			vm.showNextBtn = _.slice($rootScope.highscores, end, end + TOTAL_ROW).length >= 1;

			vm.highscores = _.slice($rootScope.highscores, start, end);
		}
	}
})();