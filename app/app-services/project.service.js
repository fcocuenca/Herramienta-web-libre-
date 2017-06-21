(function() {
		'use strict';

		angular
			.module('app')
			.factory('ProjService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
		
			return service;

			function GetCurrent(){
				return $http.get('/api/project/current').then(handleSuccess, handleError);
			}

			function Create(proj){
				return $http.post('/api/project/createProj', proj).then(handleSuccess, handleError);
			}
       

			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();