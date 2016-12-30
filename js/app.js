var nfl = angular.module('nfl', [
	'ngRoute',
	'nflControllers',
	'ngOrderObjectBy',
	'angularUtils.directives.dirPagination',
	'ui.bootstrap'
	//'Player'
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

