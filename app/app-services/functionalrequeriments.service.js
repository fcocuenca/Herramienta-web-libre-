(function() {
		'use strict';

		angular
			.module('app')
			.factory('RfService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.Update = Update;
			
			return service;


			function GetCurrent(){
				return $http.get('/api/functionalrequeriments/current').then(handleSuccess, handleError);
			}

			function Create(rf){
				return $http.post('/api/functionalrequeriments/createRf', rf).then(handleSuccess, handleError);
			}


			function Delete(rf) {
            	return $http.post('/api/functionalrequeriments/deleteRf', rf).then(handleSuccess, handleError);
        	}

        	function Update(rf) {
            	return $http.post('/api/functionalrequeriments/updateRf', rf).then(handleSuccess, handleError);
        	}

			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();