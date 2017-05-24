(function(){
	'use strict';

	angular
		.module('app')
		.factory('CategoryService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;

			return service;
		
		
		function Create(cat){
			return $http.post('/api/functionalrequeriments/createCatRf', cat).then(handleSuccess, handleError);
		}

		function GetCurrent(){
			return $http.get('/api/functionalrequeriments/currentCatRf').then(handleSuccess, handleError);
		}

		function handleSuccess(res) {
           	return res.data;
        }
 
        function handleError(res) {
        	return $q.reject(res.data);
       	}

	}
})();
