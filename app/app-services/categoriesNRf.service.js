(function(){
	'use strict';

	angular
		.module('app')
		.factory('CategoryServiceNRf', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.Update = Update

			return service;
		
		
		function Create(cat){
			return $http.post('/api/nofunctionalrequeriments/createCatNRf', cat).then(handleSuccess, handleError);
		}

		function GetCurrent(){
			return $http.get('/api/nofunctionalrequeriments/currentCatNRf').then(handleSuccess, handleError);
		}


		function Delete(cat){
			return $http.post('/api/nofunctionalrequeriments/deleteCatNRf', cat).then(handleSuccess, handleError);
		}

		function Update(cat){
			return $http.post('/api/nofunctionalrequeriments/updateCatNRf', cat).then(handleSuccess, handleError);
		}


		function handleSuccess(res) {
           	return res.data;
        }
 
        function handleError(res) {
        	return $q.reject(res.data);
       	}

	}
})();
