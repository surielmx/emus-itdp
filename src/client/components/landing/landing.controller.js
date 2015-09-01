(function(){
	/*
	* Langind Module
	*/
	'use strict';

	var LandingController = function($scope,$window,$state){

		var menuClick = angular.element(document.getElementById('menu'));
		var menuLanding = angular.element(document.getElementsByClassName('landing-menu'));
		
		menuClick.on('click', function(event){
			event.preventDefault();
			menuLanding.toggleClass('show_menu');
		});
		
		angular.element($window).bind("scroll", function() {
			var header = angular.element(document.getElementById('header'));
			var item = angular.element(document.getElementsByClassName('item'));
			var itemButton = angular.element(document.getElementById('item-button'));
			var body = angular.element(document.getElementsByTagName('body'));
			if(body[0].scrollTop >= 65 && body[0].scrollWidth >= 768){
				header.addClass('black');
				//itemButton.removeClass('btn-landing');
				//itemButton.addClass('btn-landing1');
				
			}
			else{
				header.removeClass('black');
				//itemButton.removeClass('btn-landing1');
				//itemButton.addClass('btn-landing');
			}
		});
	};
	
	LandingController.$inject = ['$scope', '$window','$state'];
	
	angular.module('emus.landing', []).
	controller('LandingController', LandingController);

}());