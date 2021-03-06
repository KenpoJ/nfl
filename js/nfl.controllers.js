var nflControllers = angular.module('nflControllers', []);


nflControllers.controller('HomeController', function HomeController($scope, $http, PlayerService, ScoreboardService, StandingsService) {
	$scope.msg = "home controller";

	PlayerService.playerList(function(PlayerService) {
		$scope.players = PlayerService.cumulativeplayerstats.playerstatsentry;
	});

	ScoreboardService.scoreboard(function(ScoreboardService) {
		$scope.scores = ScoreboardService.scoreboard.gameScore;
	});

	StandingsService.standings(function(StandingsService) {
		$scope.standings = StandingsService.overallteamstandings.teamstandingsentry;
	});

});


nflControllers.controller('PlayerController', function($scope, $http, PlayerService) {
	$scope.sortBy = 'LastName';

	PlayerService.playerList(function(PlayerService) {
		$scope.players = PlayerService.cumulativeplayerstats.playerstatsentry;
		//$scope.tableParams = new NgTableParams({}, { dataset: response });
	});

	$scope.sort = function(key) {
		$scope.sortBy = key;
		//console.log($scope.sortBy)
	}

});


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
