(function() {
		'use strict';

		angular
			.module('app')
			.factory('GlosaryService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.Update = Update;

			return service;


			function GetCurrent(){
				return $http.get('/api/glosary/current').then(handleSuccess, handleError);
			}

			function Create(word){
				return $http.post('/api/glosary/createW', word).then(handleSuccess, handleError);
			}

			function Delete(word) {
            	return $http.post('/api/glosary/deleteW', word).then(handleSuccess, handleError);
        	}

        	function Update(word) {
            	return $http.post('/api/glosary/updateW', word).then(handleSuccess, handleError);
        	}

			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();