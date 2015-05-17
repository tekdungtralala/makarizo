(function() {
	"use strict";

	angular.module('app.tab')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider
			// setup an abstract state for the tabs directive
			.state('tab', {
				url: "/tab",
				templateUrl: "js/tab/tab.html"
			});
	};

})();