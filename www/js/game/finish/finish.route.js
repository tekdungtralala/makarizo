(function() {
	"use strict";

	angular.module('app.game.finish')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('game.finish', {
				cache: false,
				url: '/finish?level&score',
				views: {
					'game': {
						templateUrl: "js/game/finish/finish.html",
						controller: 'GameFinishCtrl as vm'
					}
				}
			});
	};

})();