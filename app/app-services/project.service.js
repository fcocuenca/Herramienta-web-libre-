(function() {
		'use strict';

		angular
			.module('app')
			.factory('ProjService', Service);

		function Service($http, $q){
			var service = {};

			service.Create = Create;
			service.GetCurrent = GetCurrent;
			service.Delete = Delete;
			service.compartirProyecto = compartirProyecto;
			service.GetCurrentInvitados = GetCurrentInvitados;
			service.DeleteInvitado= DeleteInvitado;
			service.compartidoCon = compartidoCon;
			service.GetCurrentProjectShare = GetCurrentProjectShare;
			service.Deleteprojectshare = Deleteprojectshare;

			return service;

			function GetCurrent(){
				return $http.get('/api/project/current').then(handleSuccess, handleError);
			}

			function GetCurrentProjectShare(){
				return $http.get('/api/project/currentShare').then(handleSuccess, handleError);
			}

			function GetCurrentInvitados(){
				return $http.get('/api/project/currentInvitados').then(handleSuccess, handleError);
			}

			function Create(proj){
				return $http.post('/api/project/createProj', proj).then(handleSuccess, handleError);
			}
			
			function Delete(proj){
				return $http.post('/api/project/deleteProj', proj).then(handleSuccess, handleError);
			}

			function DeleteInvitado(proj){
				return $http.post('/api/project/deleteInvitado', proj).then(handleSuccess, handleError);
			}
			function Deleteprojectshare(proj){
				return $http.post('/api/project/deleteProjectShare', proj).then(handleSuccess, handleError);
			}

			function compartirProyecto(proj){
				return $http.post('/api/project/compartirProj', proj).then(handleSuccess, handleError);
			}

			function compartidoCon(proj){
				return $http.post('/api/project/compartidoCon', proj).then(handleSuccess, handleError);
			}

       
			function handleSuccess(res) {
           		 return res.data;
        	}
 
        	function handleError(res) {
           		return $q.reject(res.data);
       		}

		}
})();