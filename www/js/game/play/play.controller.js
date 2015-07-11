(function() {
	"use strict";
	
	angular.module('app.game.play')
		.controller('PlayCtrl', PlayCtrl);

	function PlayCtrl($interval, $timeout) {

		var TOTAL_IMAGE = 25;
		var WAITING_TIME = 300;
		var TOTAL_CARD = [0, 4, 6, 8, 10, 12, 16, 20];
		function getTotalCard(level) {
			var maxLevel = TOTAL_CARD.length - 1;
			if (level >= maxLevel) {
				return TOTAL_CARD[maxLevel];
			} else {
				return TOTAL_CARD[level];
			}
		}
		var MAX_TIME = [0, 5, 10, 15, 20, 25, 30, 35];
		var imageUrls = [];
		var vm = this;
		vm.defaultCard = "images/cardback.png";

		// header
		vm.level = 0;
		vm.score = 0;
		// knob options
		vm.time = 0;
		vm.options = {
			max:  10,
			bgColor: "#303" ,
			fgColor: "#ffec03",
			displayInput:true,
			width: 60,
			height: 60,
			thickness: 0.2,
			skin: "tron" 
		}
		// deck 
		vm.rows = [];
		vm.cols = [];
		vm.imagesUrl = []; // actualy vm.imagesUrl = [][];
		vm.imageState = [];

		var timeLoop = null; // $interval object
		var flipState = false;
		var isSecondSelect = false;
		var firstSelect = {};
		var totalOpenedCard = 0;

		// function
		vm.getDeckClass = getDeckClass;
		vm.changeImageState = changeImageState;
		
		activate();
		function activate() {
			initImages();
			nextLevel();
		}

		function nextLevel () {
			if (timeLoop) $interval.cancel(timeLoop);

			$timeout(function(){
				vm.time = 0;
				totalOpenedCard = 0;

				initLevel(vm.level + 1);
				vm.options.max = MAX_TIME[vm.level];
				
				restartTime();
			}, WAITING_TIME)
		}

		function initLevel(newLevel) {
			vm.level = newLevel;
			if (1 === vm.level) updateDeck(2, 2, getTotalCard(1));
			else if (2 === vm.level) updateDeck(2, 3, getTotalCard(2));
			else if (3 === vm.level) updateDeck(3, 3, getTotalCard(3), [{i: 1, j: 1}]);
			else if (4 === vm.level) updateDeck(3, 4, getTotalCard(4), [{i: 1, j: 1}, {i: 1, j: 2}]);
			else if (5 === vm.level) updateDeck(3, 4, getTotalCard(5));
			else if (6 === vm.level) updateDeck(4, 4, getTotalCard(6));
			else updateDeck(4, 5, getTotalCard(7));
		} 

		function endGame() {
			$timeout(function(){
				alert('waktu abis')
			}, 100)
		}

		function restartTime () {
			timeLoop = $interval(function () {
				vm.time++;
				if (vm.time >= MAX_TIME[vm.level]) {
					$interval.cancel(timeLoop);
					endGame();
				}
			}, 1000)
		}

		function changeImageState(row, col) {
			if (!flipState && !vm.imageState[row][col]) {
				flipState = true;
				vm.imageState[row][col] = true;

				if (isSecondSelect) {
					var firstValue = vm.imageUrls[firstSelect.row][firstSelect.col];
					var secondValue = vm.imageUrls[row][col];

					if (firstValue !== secondValue) {
						$timeout(function (argument) {
							flipState = false;
							vm.imageState[row][col] = false;
							vm.imageState[firstSelect.row][firstSelect.col] = false;
						}, WAITING_TIME);
					} else {
						vm.score++;
						flipState = false;
						totalOpenedCard = totalOpenedCard + 2;

						if (getTotalCard(vm.level) === totalOpenedCard)
							nextLevel();
					}
				} else {
					firstSelect.row = row;
					firstSelect.col = col;
					$timeout(function (argument) {
						flipState = false;
					}, WAITING_TIME);
				}

				isSecondSelect = !isSecondSelect;
			}
		}

		function updateDeck(totalRow, totalColumn, totalImage, skip) {
			var defaultImages = [];
			for(var v = 0; v < TOTAL_IMAGE; v++) {
				defaultImages.push(v);
			}
			vm.imagesUrl = [];
			vm.rows = [];
			vm.cols = [];

			// init rows and columns
			for (var x = 0; x < totalRow; x++) {
				vm.rows.push(x);
			}
			for (var y = 0; y < totalColumn; y++) {
				vm.cols.push(y);
			}
			totalImage = totalImage / 2;
			var tmp = [];
			for (var z = 0; z < totalImage; z++) {
				var rndm = getRndmItem(defaultImages);
				tmp.push(rndm);
				tmp.push(rndm);
			}

			// init imageUrls
			vm.imageState = new Array(totalRow); 
			vm.imageUrls = new Array(totalRow);
			for (var i = 0; i < totalRow; i++) {

				vm.imageUrls[i] = new Array(totalColumn);
				vm.imageState[i] = new Array(totalColumn);

				for (var j = 0; j < totalColumn; j++) {
					var isSkip = false;
					if (skip) {
						isSkip = _.find(skip, function(d) {
							return d.i === i & d.j === j
						})
					}

					if (!isSkip) vm.imageUrls[i][j] = imageUrls[getRndmItem(tmp)];
					vm.imageState[i][j] = false;
				}
			}
			// test();
		}

		function initImages() {
			for(var i=1; i <= TOTAL_IMAGE; i++) {
				imageUrls.push('images/gambar' + i + '.png');
			}
		}

		function getDeckClass() {
			if (1 === vm.level) return "col-50";
			if (2 === vm.level || 3 === vm.level) return "col-33";
			if (4 === vm.level || 5 === vm.level || 6 === vm.level) return "col-25";
			else return "col-20";
		}

		function getRndmItem(items) {
			var min = 0;
			var max = items.length - 1;
			var rndm = getRandomNmr(min, max);

			var selected = _.remove(items, function(a, b) {
				return rndm == b;
			});
			return selected[0];
		}

		function getRandomNmr(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

})();
