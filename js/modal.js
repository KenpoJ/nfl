nfl.controller('NflGameModalCtrl', function ($uibModal, $log, $document) {
	var $ctrl = this;

	$ctrl.info = ['item1', 'item2', 'item3'];

	$ctrl.animationsEnabled = true;

	$ctrl.open = function (size, parentSelector, date) {

		console.log(date);
		var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
		var modalInstance = $uibModal.open({
			animation: $ctrl.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'gameModalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: '$ctrl',
			size: size,
			appendTo: parentElem,
			resolve: {
				info: function () {
					return $ctrl.info;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$ctrl.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$ctrl.openComponentModal = function () {
		var modalInstance = $uibModal.open({
		animation: $ctrl.animationsEnabled,
		component: 'modalComponent',
		resolve: {
			info: function () {
				return $ctrl.info;
			}
		}
		});

		modalInstance.result.then(function (selectedItem) {
			$ctrl.selected = selectedItem;
		}, function () {
			$log.info('modal-component dismissed at: ' + new Date());
		});
	};

	$ctrl.toggleAnimation = function () {
		$ctrl.animationsEnabled = !$ctrl.animationsEnabled;
	};
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

nfl.controller('ModalInstanceCtrl', function ($uibModalInstance, info) {
	var $ctrl = this;
	$ctrl.info = info;
	$ctrl.selected = {
		item: $ctrl.info[0]
	};

	$ctrl.ok = function () {
		$uibModalInstance.close($ctrl.selected.item);
	};

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

nfl.component('modalComponent', {
	templateUrl: 'gameModalContent.html',
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	controller: function () {
		var $ctrl = this;

		$ctrl.$onInit = function () {
			$ctrl.info = $ctrl.resolve.info;
			$ctrl.selected = {
				item: $ctrl.info[0]
			};
		};

		$ctrl.ok = function () {
			$ctrl.close({$value: $ctrl.selected.item});
		};

		$ctrl.cancel = function () {
			$ctrl.dismiss({$value: 'cancel'});
		};
	}
});