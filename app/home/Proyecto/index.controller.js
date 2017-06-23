(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Project.IndexController', Controller);
 
    function Controller(UserService, ProjService) {
        var vm = this;
 
        vm.user = null;
        vm.projects = null;

        vm.project=null;
        vm.saveProj = saveProj;
        
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

        function saveProj(){
            console.log("saveProj");
            ProjService.Create(vm.project);
        }




    }
 
})();