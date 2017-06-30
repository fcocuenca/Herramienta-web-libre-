(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller(UserService, ProjService) {
        var vm = this;
 
        vm.user = null;
 
        initController();

        initProjectController();
 
        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

         function initProjectController(){

            ProjService.GetCurrent().then(function(projects){
                vm.projects = projects;
            });
        }
    }
 
})();