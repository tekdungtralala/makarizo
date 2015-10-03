(function() {
	"use strict";

	angular.module('app.home')
		.controller('HomeCtrl', HomeCtrl);

	function HomeCtrl($state, $timeout) {
		var vm = this;
		var fbData = {};

		vm.playGame = playGame;
		vm.bonusMsg = null;
		vm.showMsg = false;

		var DURATION = 3000;

		activate();
		function activate() {
			// initialize();
			// playGame();
			renderImage();
			window.doRefresh = true;
			setTimeout(function(){ 
				if (window.doRefresh) window.location.reload();
			}, 5000);
		}

		function renderImage() {
			// the game itself
			var game;
			// the spinning wheel
			var wheel; 
			// can the wheel spin?
			var canSpin;
			// slices (prizes) placed in the wheel
			var slices = 8;
			// prize names, starting from 12 o'clock going clockwise
			var slicePrizes = [
				"I-Phone 6", 
				"Voucher 50k", 
				"Voucher 50k", 
				"Samsung Galaxy S6", 
				"Samsung Galaxy S6", 
				"Voucher 50k", 
				"Voucher 50k", 
				"I-Phone 6"
			];
			// the prize you are about to win
			var prize;
			// text field where to show the prize
			var prizeText;
			// PLAYGAME STATE

			var playGame = function(game){};

			playGame.prototype = {
				// function to be executed once the state preloads
				preload: function(){
					// preloading graphic assets
					game.load.image("wheel", "images/e-wheel.png");
					game.load.image("pin", "images/pin.png");
					game.load.image("background", "images/bgGame3.png");
				},
				// funtion to be executed when the state is created
				create: function(){
					// game.add.tileSprite(0, 0, 1000, 600, 'background');
					// giving some color to background
					// game.stage.backgroundColor = "#ffffff";
					// adding the wheel in the middle of the canvas
					wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
					var imageSize = game.width/450;
					wheel.scale.setTo(imageSize, imageSize);
					// setting wheel registration point in its center
					wheel.anchor.set(0.5);
					// adding the pin in the middle of the canvas
					var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
					// setting pin registration point in its center
					pin.anchor.set(0.5);
					// adding the text field
					prizeText = game.add.text(game.world.centerX, 480, "");
					// setting text field registration point in its center
					prizeText.anchor.set(0.5);
					// aligning the text to center
					prizeText.align = "center";
					// the game has just started = we can spin the wheel
					canSpin = true;
					// waiting for your input, then calling "spin" function
					game.input.onDown.add(this.spin, this);		
				},
				// function to spin the wheel
				spin: function(){
					// can we spin the wheel?
					if(canSpin){  
						window.doRefresh = false;
						// resetting text field
						prizeText.text = "";
						// the wheel will spin round from 2 to 4 times. This is just coreography
						var rounds = game.rnd.between(2, 4);
						// then will rotate by a random number from 0 to 360 degrees. This is the actual spin
						var degrees = game.rnd.between(0, 360);
						// before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
						prize = slices - 1 - Math.floor(degrees / (360 / slices));
						// now the wheel cannot spin because it's already spinning
						canSpin = false;
						// animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
						// the quadratic easing will simulate friction
						var spinTween = game.add.tween(wheel).to({
							angle: 360 * rounds + degrees
						}, 3000, Phaser.Easing.Quadratic.Out, true);
						// once the tween is completed, call winPrize function
						spinTween.onComplete.add(this.winPrize, this);
					}
				},
				// function to assign the prize
				winPrize: function(){
					// now we can spin the wheel again
					canSpin = true;
					// writing the prize you just won
					var text = slicePrizes[prize];
					finishSpin(text);
				}
			}

			var size = $(window).width();
			// creation of a 458x488 game
			game = new Phaser.Game(size, size, Phaser.AUTO, 'game-area', null, true);
			// adding "PlayGame" state
			game.state.add("PlayGame",playGame);
			// launching "PlayGame" state
			game.state.start("PlayGame");
		}

		function finishSpin(price) {
			window.doRefresh = false
			vm.showMsg = true;
			vm.bonusMsg = price;
			alert("Mendapatkan : " + price);
			playGame();
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

			var stillSpin = false;
			function spin(d) {
				if (stillSpin) return;
				stillSpin = true;
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
						stillSpin = false;
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