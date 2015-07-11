(function() {
	"use strict";

	angular.module('app.home')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "js/home/home.html",
				controller: 'HomeCtrl as vm'
			});
	};

})();