var nflServices = angular.module('nflServices', ['ngResource']);

/*nflServices.factory('PlayerService', ['$resource', function($resource) {
	return $resource('player-details/:playerID.json', {}, {
		query: {
			method: 'get',
			params: {
				playerID: 'player-detail'
			},
			isArray: false
		}
	})
}]);
*/