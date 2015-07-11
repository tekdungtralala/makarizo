(function() {
	"use strict";

	angular.module('app.game.play')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('game.play', {
				cache: false,
				url: '/play',
				views: {
					'game': {
						templateUrl: "js/game/play/play.html",
						controller: 'PlayCtrl as vm'
					}
				}
			});
	};

})();