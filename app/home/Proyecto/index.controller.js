(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Project.IndexController', Controller);
 
    function Controller(UserService, ProjService) {
        var vm = this;
 
        vm.user = null;
 
        initController();
 
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
    }
 
})();