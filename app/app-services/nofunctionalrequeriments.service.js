(function() {
		'use strict';

		angular
			.module('app')
			.factory('NRfService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.Update = Update;

			return service;


			function GetCurrent(){
				return $http.get('/api/nofunctionalrequeriments/current').then(handleSuccess, handleError);
			}

			function Create(nrf){
				return $http.post('/api/nofunctionalrequeriments/createNRf', nrf).then(handleSuccess, handleError);
			}

			function Delete(nrf) {
            	return $http.post('/api/nofunctionalrequeriments/deleteNRf', nrf).then(handleSuccess, handleError);
        	}

        	function Update(nrf) {
            	return $http.post('/api/nofunctionalrequeriments/updateNRf', nrf).then(handleSuccess, handleError);
        	}						

			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();