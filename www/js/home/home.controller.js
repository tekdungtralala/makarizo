(function() {
	"use strict";

	angular.module('app.home')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($state, $timeout) {
		var vm = this;

		vm.playGame = playGame;
		vm.bonusMsg = null;
		vm.showMsg = false;

		var DURATION = 3000;

		activate();
		function activate() {
			initialize();
		}

		function playGame() {
			$state.go('tab.home')
		}

		function showingMessage() {
			$timeout(function() {
				vm.showMsg = true;
			}, 100);
		}

		function initialize() {
			var padding = {top:0, right:50, bottom:0, left:50},
				w = window.innerWidth - padding.left - padding.right,
				h = window.innerWidth - padding.top  - padding.bottom,
				r = Math.min(w, h)/2,
				rotation = 0,
				oldrotation = 0,
				picked = 100000,
				color = d3.scale.category20();

			var data = [
				{"label":"Lorem Ipsum 1"}, 
				{"label":"Lorem Ipsum 2"}, 
				{"label":"Lorem Ipsum 3"}, 
				{"label":"Lorem Ipsum 4"}, 
				{"label":"Lorem Ipsum 5"}, 
				{"label":"Lorem Ipsum 6"}, 
				{"label":"Lorem Ipsum 7"}, 
				{"label":"Lorem Ipsum 8"}, 
				{"label":"Lorem Ipsum 9"}
			];


			var svg = d3.select('#chart')
				.append("svg")
				.data([data])
				.attr("width",  w + padding.left + padding.right)
				.attr("height", h + padding.top + padding.bottom);

			var container = svg.append("g")
				.attr("class", "chartholder")
				.attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

			var vis = container
				.append("g");
				
			var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

			// declare an arc generator function
			var arc = d3.svg.arc().outerRadius(r);

			// select paths, use arc generator to draw
			var arcs = vis.selectAll("g.slice")
				.data(pie)
				.enter()
				.append("g")
				.attr("class", "slice");

			arcs.append("path")
				.attr("fill", function(d, i){ return color(i); })
				.attr("d", function (d) { return arc(d); });

			// add the text
			arcs.append("text").attr("transform", function(d){
					d.innerRadius = 0;
					d.outerRadius = r;
					d.angle = (d.startAngle + d.endAngle)/2;
					return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
				})
				.attr("text-anchor", "end")
				.text( function(d, i) {
					return data[i].label;
				});

			container.on("click", spin);


			function spin(d) {

				var  ps       = 360/data.length,
					 pieslice = Math.round(1440/data.length),
					 rng      = Math.floor((Math.random() * 1440) + 360);
					
				rotation = (Math.round(rng / ps) * ps);
				
				picked = Math.round(data.length - (rotation % 360)/ps);
				picked = picked >= data.length ? (picked % data.length) : picked;

				vm.bonusMsg = data[picked].label

				rotation += 90 - Math.round(ps/2);

				vis.transition()
					.duration(DURATION)
					.attrTween("transform", rotTween)
					.each("end", function(){
						oldrotation = rotation;
						showingMessage();
					});
			}

			//make arrow
			svg.append("g")
				.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
				.append("path")
				.attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
				.style({"fill":"black"});

			//draw spin circle
			container.append("circle")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", 60)
				.style({"fill":"white","cursor":"pointer"});

			//spin text
			container.append("text")
				.attr("x", 0)
				.attr("y", 15)
				.attr("text-anchor", "middle")
				.text("Spin")
				.style({"font-weight":"bold", "font-size":"30px"});


			function rotTween(to) {
			  var i = d3.interpolate(oldrotation % 360, rotation);
			  return function(t) {
				return "rotate(" + i(t) + ")";
			  };
			}
		}
	}

})();