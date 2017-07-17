(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller(UserService, ProjService, FlashService) {
        var vm = this;
       
        vm.user = null;
        vm.projects = null;
        vm.userId;

        vm.deleteProject = deleteProject;
 
        initController();

        initProjectController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
        		vm.userId = user._id;
            });
        }

        function initProjectController(){

            ProjService.GetCurrent().then(function(projects){
               
                for(var i=0; i<projects.length; i++)
                {
                	if(vm.userId===projects[i].userId){
                		 vm.projects = projects;
                	}else{
                		console.log("no tiene proyecto creado!!!");
                	}
                }
                
            });
        }

        function deleteProject(index){
        	angular.forEach(vm.projects, function(value, key){
            if(index === key)
            {
                ProjService.Delete(vm.projects[key])
                .then(function () {
                    FlashService.Success('Proyecto borrado correctamente.');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
               
            } 
       }); 
        }

    }
 
})();

/*for(var i=0; i<vm.projects.length; i++)
        	{
        		if( === vm.projects[i].userId)
        		{
        			vm.misProyectos[i] = vm.projects[i];
        		}
        	}*/