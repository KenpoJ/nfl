var nfl = angular.module('nfl', [
	'ngRoute',
	'nflControllers',
	'angularUtils.directives.dirPagination',
	'ui.bootstrap'
	//'ngOrderObjectBy',
	//'ngResource',
	//'ngTable'
]);

nfl.constant('MODEL_DATA', {
	PLAYERS_URI: 'js/json/players.json',
	STANDINGS_URI: 'js/json/standings.json',
	SCOREBOARD_URI: 'js/json/scoreboard/scoreboard.json'
});


nfl.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'pages/home.html',
		controller: 'HomeController'
	})
	.when('/players', {
		templateUrl: 'pages/players.html',
		controller: 'PlayerController'
	})
	.when('/playerdetail/:playerID', {
		templateUrl: 'pages/playerdetail.html',
		controller: 'PlayerDetailController'
	})
	.when('/games', {
		templateUrl: 'pages/games.html',
		controller: 'GamesController'
	})
	.when('/standings', {
		templateUrl: 'pages/standings.html',
		controller: 'StandingsController'
	})
	.otherwise({
		redirectTo: '/home'
	});
	$locationProvider.html5Mode('false');
}]);

nfl.factory('PlayerService', function($http, MODEL_DATA) {
	return {
		playerList: function(callback) {
			$http.get(MODEL_DATA.PLAYERS_URI).success(callback);
		}
	}
});
nfl.factory('ScoreboardService', function($http, MODEL_DATA) {
	return {
		scoreboard: function(callback) {
			$http.get(MODEL_DATA.SCOREBOARD_URI).success(callback);
		}
	}
});
nfl.factory('StandingsService', function($http, MODEL_DATA) {
	return {
		standings: function(callback) {
			$http.get(MODEL_DATA.STANDINGS_URI).success(callback);
		}
	}
});

nfl.filter('playerFilter', function() {
	return function(filterBy) {
		var out = filterBy;
		console.log(out)
		return out;
	}
});

