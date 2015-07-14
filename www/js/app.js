// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

(function() {
	"use strict";

	angular.module('app', [
		'ionic', 
		'ui.knob',

		'app.home',
		'app.tab',
		'app.game',
	])

	.run(function($ionicPlatform, $state) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				// StatusBar.styleLightContent();
				StatusBar.hide();
			}
		});

		var goTabHomeList = ['tab.highscore', 'tab.howtoplay', 'tab.product', 'game.signin'];
		var doNothingList = ['game.play', 'game.finish'];
		$ionicPlatform.registerBackButtonAction(function () {

			if ($state && $state.current && $state.current.name) {
				var stateName = $state.current.name;

				var backToTabHome = _.find(goTabHomeList, function(t) { return t === stateName;})
				if (backToTabHome) { $state.go('tab.home'); return false; }

				var doNothing = _.find(doNothingList, function(t) { return t === stateName;})
				if (doNothing) {return false; }
			}

			navigator.app.exitApp();
		}, 100);
	})

	.config(function($stateProvider, $urlRouterProvider) {
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/game/play');
	});

})();