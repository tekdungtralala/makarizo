angular.module('ui.knob', []).directive('knob', ['$timeout', function($timeout) {
	'use strict';

	return {
		restrict: 'EA',
		replace: true,
		template: "<input class='times' value='{{ knobData }}' />",
		scope: {
			knobData: '=',
			knobOptions: '&',
			knobMax: '=',
		},
		link: function($scope, $element) {
			var knobInit = $scope.knobOptions() || {};

			knobInit.release = function(newValue) {
				$timeout(function() {
					$scope.knobData = newValue;
					$scope.$apply();
				});
			};

			$scope.$watch('knobMax', function(newValue, oldValue) {
				$($element).trigger('configure', {
					max: newValue
				});
			});

			$scope.$watch('knobData', function(newValue, oldValue) {
				if (newValue != oldValue) {
					$($element).val(newValue).change();
				}
			});


			knobInit.draw =  function() {
			  // "tron" case
			  if(knobInit.skin == 'tron') {

				this.cursorExt = 0.3;

				var a = this.arc(this.cv)  // Arc
				, pa                   // Previous arc
				, r = 1;

				this.g.lineWidth = this.lineWidth;

				if (this.o.displayPrevious) {
				  pa = this.arc(this.v);
				  this.g.beginPath();
				  this.g.strokeStyle = this.pColor;
				  this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
				  this.g.stroke();
				}

				this.g.beginPath();
				this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
				this.g.stroke();

				this.g.lineWidth = 2;
				this.g.beginPath();
				this.g.strokeStyle = this.o.fgColor;
				this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
				this.g.stroke();

				return false;
			  }
			}
			$($element).val($scope.knobData).knob(knobInit);
		}
	};
}]);