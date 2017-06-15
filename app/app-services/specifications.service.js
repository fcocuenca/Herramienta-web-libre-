(function() {
		'use strict';

		angular
			.module('app')
			.factory('SpecService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.Update = Update;
			
			return service;


			function GetCurrent(){
				return $http.get('/api/specifications/current').then(handleSuccess, handleError);
			}
			
			function Create(spec){
				return $http.post('/api/specifications/createSpec', spec).then(handleSuccess, handleError);
			}


			function Delete(spec) {
            	return $http.post('/api/specifications/deleteSpec', spec).then(handleSuccess, handleError);
        	}

        	function Update(spec) {
            	return $http.post('/api/specifications/updateSpec', spec).then(handleSuccess, handleError);
        	}

			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();