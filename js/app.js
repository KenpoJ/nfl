var nfl = angular.module('nfl', [
	'ngRoute',
	'nflControllers',
	'angularUtils.directives.dirPagination',
	'ui.bootstrap',
	'PlayerService'
	//'ngOrderObjectBy',
	//'ngResource',
	//'ngTable'
]);

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

nfl.filter('playerFilter', function() {
	return function(filterBy) {
		var out = filterBy;
		console.log(out)
		return out;
	}
});

