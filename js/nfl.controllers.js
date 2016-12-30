var nflControllers = angular.module('nflControllers', []);


nflControllers.controller('HomeController', function($scope, $http) {
	$scope.msg = "home controller"

	$http.get('js/json/players.json').then(function(response) {
		$scope.players = response.data.cumulativeplayerstats.playerstatsentry;
		//console.log('$scope.players');
	});

	$http.get('js/json/scoreboard/scoreboard.json').then(function(response) {
		$scope.scores = response.data.scoreboard.gameScore;
		$scope.date = $scope.scores[0].game.date;
		//console.log($scope.scores[0].game.date);
	});

	$http.get('js/json/standings.json').then(function(response) {
		$scope.standings = response.data.overallteamstandings.teamstandingsentry;
		//console.log($scope.standings);
	});

});


nflControllers.controller('PlayerController', [ '$scope', '$http', function($scope, $http) {
	$scope.sortBy = 'LastName';

	$scope.sort = function(key) {
		$scope.sortBy = key;
		console.log($scope.sortBy)
	}

	$http.get('js/json/players.json').then(function(response) {
		$scope.playerList = response.data.cumulativeplayerstats.playerstatsentry;
		//$scope.tableParams = new NgTableParams({}, { dataset: response });
	});

}]);


nflControllers.controller('PlayerDetailController', [ '$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

	$http.get('js/json/players.json').then(function(response) {
		$scope.players = response.data.cumulativeplayerstats.playerstatsentry;

		angular.forEach($scope.players, function(val, key) {
			if(val.player.ID == $routeParams.playerID) {
				$scope.playerSet = val;
				$scope.player = val.player;
				$scope.team = val.team;
				$scope.stats = val.stats;
				console.log($scope.stats)
			}
		})

	});

}]);


nflControllers.controller('GamesController', [ '$scope', '$http', function($scope, $http, $uibmodal) {
	$scope.date = '20150910';

	$scope.modalCtrl = function($uibmodal, $log, $document) {
		console.log($uibmodal, $log, $document);
		var $ctrl = this;
		$ctrl.items = ['item1', 'item2', 'item3'];

		$ctrl.open = function(size, parentSelector) {
			var parentElem = parentSelector ? angular.element($document[0].querySelector('#game-modal ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				templateUrl: 'myModalContent.html',
				controller: 'modalInstanceController',
				appendTo: parentElem,
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			});
		}

		$ctrl.openComponentModal = function() {
			var modalInstance = $uibmodal.open({
				component: 'modalComponent',
				resolve: {
					items: function() {
						return $ctrl.items;
					}
				}
			})
		}
	}


/*
	var ModalDemoCtrl = function ($scope, $modal, $log) {

		var modalInstance = $modal.open({
			templateUrl: 'pages/gameInfoModal.html',
			controller: ModalInstanceCtrl,
			resolve: {
				test: function () {
					return 'test variable';
				}
			}
		});
	};
*/
	$scope.loadJson = function(date) {
		$http.get('js/json/scoreboard/' + date + '.json').then(function(response) {
			$scope.scores = response.data.scoreboard.gameScore;
			$scope.formatDate(date);
		});
	}

	$scope.formatDate = function(date) {
		y = date.slice(0, 4);
		m = date.slice(4, 6);
		d = date.slice(6, 8);
		$scope.formattedDate = m + '/' + d + '/' + y;
		return $scope.formattedDate;
	}

	$scope.loadJson($scope.date);

}]);

nflControllers.controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
	var $ctrl = this;
		$ctrl.items = items;
		$ctrl.selected = {
		item: $ctrl.items[0]
	};

	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.selected.item);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

nflControllers.controller('StandingsController', ['$scope', '$http', function($scope, $http) {
	$scope.parseInt = parseInt;

	$scope.loadJson = function() {
		$http.get('js/json/standings.json').then(function(response) {
			$scope.standings = response.data.overallteamstandings.teamstandingsentry;
			/*for(i = 0; i <= $scope.standings.length; i++) {
				$scope.percentage = ( parseInt($scope.standings[i].stats.Wins['#text']) ) / 16;
			}*/
			
			//$scope.percentage = parseInt($scope.standings.team.stats.Wins) + parseInt($scope.standings.team.stats.Losses);
		})
	}
	$scope.loadJson();
}]);
