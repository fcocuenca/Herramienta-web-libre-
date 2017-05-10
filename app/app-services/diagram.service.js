(function() {
		'use strict';

		angular
			.module('app')
			.factory('DService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.Update = Update;

			return service;


			function GetCurrent(){
				return $http.get('/api/diagram/current').then(handleSuccess, handleError);
			}

			function Create(d){
				return $http.post('/api/diagram/createDiagram', d).then(handleSuccess, handleError);
			}

			function Delete(d) {
            	return $http.post('/api/diagram/deleteDiagram', d).then(handleSuccess, handleError);
        	}

        	function Update(d) {
            	return $http.post('/api/diagram/updateDiagram', d).then(handleSuccess, handleError);
        	}

			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();