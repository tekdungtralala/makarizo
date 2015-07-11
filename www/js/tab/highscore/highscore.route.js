(function() {
	"use strict";

	angular.module('app.tab.highscore')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('tab.highscore', {
				url: '/highscore',
				views: {
					'tab-highscore': {
						templateUrl: "js/tab/highscore/highscore.html",
						controller: 'TabHighscoreCtrl'
					}
				}
			});
	};

})();