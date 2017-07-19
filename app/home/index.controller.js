(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller(UserService, ProjService, FlashService, compartirDatos) {
        var vm = this;
       
        vm.user = null;
        vm.proyectos = [];
        vm.userId;
        vm.idProyecto= null;

        vm.deleteProject = deleteProject;
        vm.getIdProject = getIdProject;
 
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
                	if(vm.userId === projects[i].userId){
                   		vm.proyectos.push(projects[i]);
                	}else{
                		console.log("no tiene proyecto creado!!!"+i);
                	}
                }
                
            });
        }

        function deleteProject(index){
        	angular.forEach(vm.proyectos, function(value, key){
            if(index === key)
            {
                ProjService.Delete(vm.proyectos[key])
                .then(function () {
                    FlashService.Success('Proyecto borrado correctamente.');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
               
            } 
            }); 
        }

        function getIdProject(id){
           var idProyecto = id;
           compartirDatos.setString(idProyecto);
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