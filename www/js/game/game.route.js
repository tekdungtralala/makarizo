(function() {
	"use strict";

	angular.module('app.game')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('game', {
				url: "/game",
				templateUrl: "js/game/game.html"
			});
	};

})();