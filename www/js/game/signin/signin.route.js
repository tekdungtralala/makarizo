(function() {
	"use strict";

	angular.module('app.game.signin')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('game.signin', {
				cache: false,
				url: '/signin',
				views: {
					'game': {
						templateUrl: "js/game/signin/signin.html",
						controller: 'GameSigninCtrl as vm'
					}
				}
			});
	};

})();