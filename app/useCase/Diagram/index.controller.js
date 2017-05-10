(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Diagram.IndexController', Controller);
 
    function Controller($window, UserService, FlashService, DService) {
        var vm = this;
        vm.prueba=0;
    }
 
})();