(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var ModalityTypeController = function($log, $scope, $rootScope, $stateParams, $state, ModalityFactory){
		var type_modality = $stateParams.tipo;
		console.warn(type_modality);

		ModalityFactory.getModality(type_modality).
		then(function(result){
			$scope.set_m = result;
		}, function(error){
			$log.error(error);
		});

	};
	
	ModalityTypeController.$inject = ['$log', '$scope', '$rootScope', '$stateParams', '$state','ModalityFactory'];
	
	angular.module('emus.modalities.type', []).
	controller('ModalityTypeController', ModalityTypeController);

}());