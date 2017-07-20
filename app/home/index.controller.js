(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller(UserService, ProjService, FlashService, compartirDatos, RfService, CategoryService, NRfService, CategoryServiceNRf, SpecService, MatrixService, GlosaryService ) {
    var vm = this;
    var idProjectFK = compartirDatos.getString();

    vm.user = null;
    vm.userId;

    vm.idProyecto= null;
    vm.proyectos = [];

    vm.rf = null;
    vm.requisitosFuncionales = [];

    vm.cat = null;
    vm.categorias = [];

    vm.nrf = null;
    vm.requisitosNoFuncionales = [];

    vm.specifications = null;
    vm.especificaciones = [];

    vm.matrix = null;
    vm.matriz = [];

    vm.glosary = null;
    vm.glosario = [];
    

    vm.deleteProject = deleteProject;
    vm.getIdProject = getIdProject;
 
    initController();
    function initController() {
        // get current user
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
    		vm.userId = user._id;
        });
    }

    initProjectController();
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

    rfController();
    function rfController() {
        RfService.GetCurrent().then(function (rf) {            
            vm.rf = rf;
            for(var i =0; i<vm.rf.length; i++)
            {
                if(vm.rf[i].idProject === idProjectFK)
                    vm.requisitosFuncionales.push(vm.rf[i]);
            }
        });
    }

    catController();
    function catController(){
        CategoryService.GetCurrent().then(function (cat){
            vm.cat = cat;
            for(var i =0; i<vm.cat.length; i++){
                if(vm.cat[i].idProject === idProjectFK){
                    vm.categorias.push(vm.cat[i]);
                }
            }
        });
    }

    nrfController();
    function nrfController() {
        NRfService.GetCurrent().then(function (nrf) {
            vm.nrf = nrf;
            for(var i =0; i<vm.nrf.length; i++){
                if(vm.nrf[i].idProject === idProjectFK){
                    vm.requisitosNoFuncionales.push(vm.nrf[i]);
                }
            }
        });
    }
    initSpec();
    function initSpec(){
        SpecService.GetCurrent().then(function(specifications){
            vm.specifications = specifications;
            for(var i =0; i<vm.specifications.length; i++){
                if(vm.specifications[i].idProject === idProjectFK){
                    vm.especificaciones.push(vm.specifications[i]);
                }
            }
        });
    }


    initMatrix();
    function initMatrix(){
        MatrixService.GetCurrent().then(function(matrix){
            vm.matrix = matrix;
             for(var i =0; i<vm.matrix.length; i++)
            {
                if(vm.matrix[i].idProject === idProjectFK)
                    vm.matriz.push(vm.matrix[i]);
            }
        });
    }

    initGlosary();
    function initGlosary(){
        GlosaryService.GetCurrent().then(function(glosary)
        {
            vm.glosary = glosary;
            for(var i =0; i<vm.glosary.length; i++)
            {
                if(vm.glosary[i].idProject === idProjectFK)
                    vm.glosario.push(vm.glosary[i]);
            }
        });
    }

    function deleteProject(index){
    	angular.forEach(vm.proyectos, function(value, key){
        if(index === key)
        {
            var proyectoEliminar = vm.proyectos[key]._id; 

            for(var i=0; i<vm.requisitosFuncionales.length; i++){
                if(vm.requisitosFuncionales[i].idProject == proyectoEliminar){
                    RfService.Delete(vm.requisitosFuncionales[i])
                     .then(function () {
                            FlashService.Success('Requisitos funcional borrado correctamente');
                    })
                    .catch(function (error) {
                            FlashService.Error(error);
                    });
                }
            }

            for(var i=0; i<vm.requisitosNoFuncionales.length; i++){
                if(vm.requisitosNoFuncionales[i].idProject == proyectoEliminar){
                    NRfService.Delete(vm.requisitosNoFuncionales[i])
                     .then(function () {
                            FlashService.Success('Requisitos No funcional borrado correctamente ');
                    })
                    .catch(function (error) {
                            FlashService.Error(error);
                    });
                }
            }

            for(var i=0; i<vm.glosario.length; i++){
                if(vm.glosario[i].idProject == proyectoEliminar){
                    GlosaryService.Delete(vm.glosario[i])
                     .then(function () {
                            FlashService.Success('Glosario eliminado correctamente');
                    })
                    .catch(function (error) {
                            FlashService.Error(error);
                    });
                }
            }

            for(var i=0; i<vm.especificaciones.length; i++){
                if(vm.especificaciones[i].idProject == proyectoEliminar){
                    SpecService.Delete(vm.especificaciones[i])
                    .then(function(){
                        FlashService.Success('Especificación eliminada correctamente')
                    })
                    .catch(function(error){
                        FlashService.Error(error);
                    });
                }
            }

            for(var i=0; i<vm.categorias.length; i++){
                if(vm.categorias[i].idProject == proyectoEliminar){
                    CategoryService.Delete(vm.categorias[i])
                    .then(function () {
                        FlashService.Success('Categoría borrada correctamente');
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
                }
            }
                
            //queda la matriz de trazabilidad
            for(var i =0; i<vm.matriz.length; i++){
                if(vm.matriz[i].idProject === idProjectFK){
                    MatrixService.Delete(vm.matriz[i])
                    .then(function(){
                        FlashService.Success('Has borrado la matriz entera');
                    })
                    .catch(function(){
                        FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
                    });
                }
            }

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