/*####CONTROLADOR DE ANGULAR####*/
(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller(UserService, ProjService, FlashService, compartirDatos, RfService, CategoryService, NRfService, CategoryServiceNRf, SpecService, MatrixService, GlosaryService ) {
    
/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/  

    var vm = this;
    var idProjectFK = compartirDatos.getString();
    vm.flag;
    
    /*####OBTENCIÓN DE DATOS####*/
    vm.user = null;
    vm.userId;
    vm.users = null;
    vm.todosProyectos = null;
    vm.proyectos = [];
    vm.projectShare = [];
    vm.projectsShareOwn = [];
    compartirDatos.setMostrar(false);
    compartirDatos.setMostrarCompartido(false);


    /*####FUNCIONES PROYECTOS####*/
    vm.proyectoCompartidoCon = proyectoCompartidoCon;
    vm.deleteProjectShare = deleteProjectShare;
    vm.eliminarUsuarioInvitado = eliminarUsuarioInvitado;
    vm.getIdProjectCompartido = getIdProjectCompartido;
    vm.enviarEmail = enviarEmail;
    vm.getIdProject = getIdProject;
    vm.deleteProject = deleteProject;
    vm.currentProjectShare= null;
    vm.idProyecto= null;
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
    vm.invitados = null;
    vm.invitadosUser = [];
    vm.compartir = null;
    vm.mostrarMenu = mostrarMenu;
    vm.mostrarMenuCompartido = mostrarMenuCompartido;
    
    vm.indiceProyecto = indiceProyecto;
    vm.indiceProyectoCompartir = null;


    /*####Funciones para obtener todos los usuarios existentes en la bd ####*/
    initController();
    function initController() {
        // get current user
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
    		vm.userId = user._id;
        });
    }

    /*####Funciones para obtener todos los usuarios existentes en la bd ####*/
    initUsersAllController();
    function initUsersAllController(){
        UserService.GetAllUsers().then(function(users){
            vm.users = users;
        });
    }

    /*####Funciones para obtener todos los proyectos existentes en la bd ####*/
    initProjectController();
    function initProjectController(){
        ProjService.GetCurrent().then(function(projects){
           vm.todosProyectos = projects;
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

    /*####Funciones para obtener todos los proyecto compartidos existentes en la bd ####*/
    initProjectShareController();
	function initProjectShareController(){
		ProjService.GetCurrentProjectShare().then(function(projectsShare){
			/*Todos los proyectos con compartidos con un usuario*/
			vm.currentProjectShare = projectsShare;
			for(var i =0; i<vm.currentProjectShare.length; i++){
					if(vm.currentProjectShare[i].compartidoCon === vm.user.email){
						/*Me traigo el proyecto compartido para cada usuario en concreto.*/
						vm.projectsShareOwn.push(vm.currentProjectShare[i]);
					}
			}	
		});
	}

    /*####Funciones para obtener todos los usuarios invitados existentes en la bd ####*/
    initInvitadosController();
    function initInvitadosController(){
    	ProjService.GetCurrentInvitados().then(function(invit){
    		vm.invitados = invit;
    		for(var i=0; i<vm.invitados.length; i++){
    			if(vm.user.email === vm.invitados[i].usuarioOrigen){
    				vm.invitadosUser.push(vm.invitados[i]);
    			}
    		}
    	});
    }

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
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

    /*####Funciones para obtener todos los categorias existentes en la bd ####*/
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

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
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

    /*####Funciones para obtener todos las especificaciones existentes en la bd ####*/
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

    /*####Funciones para obtener todos los checks en la bd ####*/
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

    /*####Funciones para obtener todos los términos existentes en la bd ####*/
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
/*deleleProject: Elimina un proyecto asociado a un usuario*/
    function deleteProject(index){

        for(var i =0; i<vm.invitados.length; i++){
            if(vm.invitados[i].nameProyecto === vm.proyectos[index].name){
                ProjService.DeleteInvitado(vm.invitados[i]);                 
            }
        }       

        for(var i =0; i<vm.currentProjectShare.length; i++){
            if(vm.currentProjectShare[i].name == vm.proyectos[index].name){
                ProjService.Deleteprojectshare(vm.currentProjectShare[i]);
            }
        }
    
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

    function indiceProyecto(indice){
        vm.indiceProyectoCompartir = vm.proyectos[indice].name;
    }

    function mostrarMenu(value){
    	compartirDatos.setMostrar(value);
    }

    function mostrarMenuCompartido(value){
        compartirDatos.setMostrarCompartido(value);
    }

/*getIdProject: obtencion del id del proyecto*/
    function getIdProject(id){
       var idProyecto = id;
       compartirDatos.setString(idProyecto);
    }

/*getIdProjectCompartido: obtencion del proyecto compartido*/
    function getIdProjectCompartido(nameProyectoCompartido){
        var idProyecto;
        
        for(var i=0; i<vm.invitados.length; i++){
            if(nameProyectoCompartido === vm.invitados[i].nameProyecto){
                idProyecto = vm.invitados[i].idProject;
                compartirDatos.setString(idProyecto);
            }
        }
    }

/*enviarEmail: envio de un email al usuario invitado*/
    function enviarEmail(correo){
    	
        var encontradoNameproyect = false;
        var encontradoEmailDestino = false;
        vm.compartir.nameProyecto = correo;

     	for(var i =0; i<vm.proyectos.length; i++){
     		if(vm.proyectos[i].name === vm.compartir.nameProyecto){
     				vm.compartir.idProject = vm.proyectos[i]._id;       			
     		}
     	}

     	vm.compartir.usuarioOrigen = vm.user.email;	

        for(var i =0; i<vm.invitados.length; i++){
                if(vm.invitados[i].nameProyecto === vm.compartir.nameProyecto){
                    encontradoNameproyect = true;
            }
        }

        if(encontradoNameproyect == true){
            for(var i =0; i<vm.invitados.length; i++){
                if(vm.invitados[i].emailDestino === vm.compartir.emailDestino){
                        encontradoEmailDestino = true;
                }
            }
        }                        

        if((encontradoEmailDestino == true ) && (encontradoNameproyect == true)){
            FlashService.Error('Ya se ha compartido');
        }else{
              for(var i =0; i<vm.users.length; i++){
            if(vm.compartir.emailDestino === vm.users[i].email){
                ProjService.compartirProyecto(vm.compartir)
                    .then(function(){
                        FlashService.Success('Proyecto compartido!!!');
                    })
                    .catch(function(error){
                        FlashService.Error(error);
                    });        
            }else{
                FlashService.Error('El usuario destino no está registrado en la aplicación');   
            }
        }
        }
        

    }

/*eliminarUsuarioInvitado: Eliminacion de un usuario invitado a un proyecto*/
    function eliminarUsuarioInvitado(index){
       
         angular.forEach(vm.invitadosUser, function(value, key){
            if(index === key)
            {
                for(var i =0; i<vm.currentProjectShare.length; i++){
                    if(vm.currentProjectShare[i].name == vm.invitadosUser[index].nameProyecto){
                        ProjService.Deleteprojectshare(vm.currentProjectShare[i]);
                        console.log(vm.currentProjectShare[i].name +"==="+vm.invitadosUser[index].nameProyecto) 

                    }
                }
                
                ProjService.DeleteInvitado(vm.invitadosUser[key])
                .then(function () {
                    FlashService.Success('Usuario invitado borrado correctamente');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            } 
            });
      

    }

    /*proyectoComaprtidoCon: obtencion de los proyectos compartidos de un usuario */
    function proyectoCompartidoCon(){
    	/*voy a comprobar si el usuario tiene proyectos compartidos*/
    	vm.flag = false;
    		
    	for(var i =0; i<vm.invitados.length; i++){
    		if(vm.invitados[i].emailDestino === vm.user.email){
    				vm.flag = true;
    		}
    	}

    	/*que proyecto me han compartido los usuarios*/
    	if(vm.flag == true){
    		for(var i=0; i<vm.todosProyectos.length; i++){
    			for(var j=0; j<vm.invitados.length; j++){
    				if(vm.todosProyectos[i]._id === vm.invitados[j].idProject){
    				 	vm.todosProyectos[i]._id = parseInt(vm.todosProyectos[i]._id);
    					vm.todosProyectos[i].compartidoCon=vm.user.email;

    					ProjService.compartidoCon(vm.todosProyectos[i]);
    				}
    				
    			}
    		}
    	}
    }

    /*deleteProjectShare: Eliminacion de proyecto compartido*/
    function deleteProjectShare(index){
        for(var i =0; i<vm.invitados.length; i++){
            if(vm.invitados[i].nameProyecto == vm.projectsShareOwn[index].name){
                ProjService.DeleteInvitado(vm.invitados[i]);                 
            }
        }            

        angular.forEach(vm.projectsShareOwn, function(value, key){
        if(index === key)
        { 
            ProjService.Deleteprojectshare(vm.projectsShareOwn[key])
            .then(function () {
                FlashService.Success('Proyecto eliminado correctamente');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        } 
     });

    }    
}


})();
