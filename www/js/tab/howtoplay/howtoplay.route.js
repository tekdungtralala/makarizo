(function() {
	"use strict";

	angular.module('app.tab.howtoplay')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('tab.howtoplay', {
				url: '/howtoplay',
				views: {
					'tab-howtoplay': {
						templateUrl: "js/tab/howtoplay/howtoplay.html",
						controller: 'TabHowtoplayCtrl'
					}
				}
			});
	};

})();