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
			abstract: true,
			templateUrl: "js/tab/tab.html"
		})

		// Each tab has its own nav history stack:

		.state('tab.dash', {
			url: '/dash',
			views: {
				'tab-dash': {
					templateUrl: 'templates/tab-dash.html',
					controller: 'DashCtrl'
				}
			}
		})

		.state('tab.chats', {
				url: '/chats',
				views: {
					'tab-chats': {
					templateUrl: 'templates/tab-account.html',
					controller: 'AccountCtrl'
					}
				}
			})

		.state('tab.account', {
			url: '/account',
			views: {
				'tab-account': {
					templateUrl: 'templates/tab-dash.html',
					controller: 'DashCtrl'
				}
			}
		})

		.state('tab.account2', {
			url: '/account2',
			views: {
				'tab-account2': {
					templateUrl: 'templates/tab-account.html',
					controller: 'AccountCtrl'
				}
			}
		});
	};

})();