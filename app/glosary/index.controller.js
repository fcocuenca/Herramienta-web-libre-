(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Glosary.IndexController', Controller);
 
    function Controller($window, UserService, FlashService, GlosaryService) {
        var vm = this;
        vm.prueba=0;
    }
 
})();