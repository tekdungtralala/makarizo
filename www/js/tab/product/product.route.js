(function() {
	"use strict";

	angular.module('app.tab.product')
		.config(routeConfig);

	function routeConfig($stateProvider) {
		$stateProvider
			.state('tab.product', {
				url: '/product',
				views: {
					'tab-product': {
						templateUrl: "js/tab/product/product.html",
						controller: 'TabProductCtrl as vm'
					}
				},
				cache: false
			});
	};

})();