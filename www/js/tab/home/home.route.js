(function() {
	"use strict";

	angular.module('app.tab.home')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('tab.home', {
				url: '/home',
				views: {
					'tab-home': {
						templateUrl: "js/tab/home/home.html",
						controller: 'HomeCtrl'
					}
				}
			});
	};

})();