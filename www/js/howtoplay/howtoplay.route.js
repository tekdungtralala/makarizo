(function() {
	"use strict";

	angular.module('app.howtoplay')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('tab.howtoplay', {
					url: '/howtoplay',
					views: {
						'tab-howtoplay': {
						templateUrl: "js/howtoplay/howtoplay.html",
						controller: 'HowtoplayCtrl'
						}
					}
				});
	};

})();