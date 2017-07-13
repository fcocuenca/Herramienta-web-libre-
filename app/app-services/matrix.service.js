
(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('MatrixService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.GetCurrent = GetCurrent;
        service.Create = Create;
        service.DeleteCheck = DeleteCheck;
        service.Delete = Delete;
    
        return service;
 
        function GetCurrent() {
            return $http.get('/api/matrixTrazability/current').then(handleSuccess, handleError);
        }
 
        function Create(result) {
            return $http.post('/api/matrixTrazability/createMat', result).then(handleSuccess, handleError);
        }

        function DeleteCheck(result) {
            return $http.post('/api/matrixTrazability/deleteCheck', result).then(handleSuccess, handleError);
        }

        function Delete(result) {
            return $http.post('/api/matrixTrazability/delete', result).then(handleSuccess, handleError);
        }



        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
 
})();