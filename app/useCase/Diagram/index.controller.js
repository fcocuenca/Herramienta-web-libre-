/*####CONTROLADOR DE ANGULAR####*/
(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Diagram.IndexController', Controller);
 
function Controller($window, UserService, FlashService, DService, $http, compartirDatos) {

/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/ 
    var vm = this;
    var idProjectFK = compartirDatos.getString();
    vm.result = null;
/*####OBTENCIÓN DE DATOS####*/
    vm.diagrama = [];
    vm.diagram = null;

/*####FUNCIONES DIAGRAMA####*/
    vm.crearDiagrama  = crearDiagrama;
    vm.modificarJson = modificarJson;
    //vm.existsDiagrama= existsDiagrama;
    vm.eliminarDiagrama= eliminarDiagrama;
    //vm.pintarDiag = pintarDiag;
    
/*####Funciones para obtener todos los diagramas existentes en la bd ####*/
    initDiagram();


/*##################################
###########GETCURRENT()#############
###################################*/

    function initDiagram(){
      
        var json;
        var id;
            DService.GetCurrent().then(function(diagram){
               vm.diagram = diagram;
               for( var i =0; i<vm.diagram.length; i++){
                if(vm.diagram[i].idProject === idProjectFK){
                        vm.diagrama.push(vm.diagram[i]);
                        vm.result = true;
                        localStorage.setItem('angularToHtml', vm.diagram[i].json);
                }
               }
            });
            
            vm.result=false;
}



/*
*existsDiagrama: comprobar que existe un diagrama para un proyecto determinado

    function existsDiagrama(){   
        for(var i=0; i<vm.diagrama.length; i++){
            if(vm.diagrama[i].idProject === idProjectFK){
                 return true;
            }
        }
        return false;
        //localStorage.removeItem('angularToHtml');
   }
*/

/*recibeJson: verifica que recibe el json con los elementos del diagrama y lo inserta en la bd*/
    function crearDiagrama(){
        var d = []
        var jsonString = localStorage.getItem('addJson');
          
        d.push({idProject: idProjectFK, json: jsonString});

            DService.Create(d)
            .then(function(){
                FlashService.Success('Diagrama creado correctamente');
            })
            .catch(function(error){
                FlashService.Error(error)
            });
    }

/*modificarJson_ recibe correctamente el json y seguidamente realiza una modificacion en la bd*/
    function modificarJson(){
        for(var i =0; i<vm.diagrama.length; i++){
            if(vm.diagrama[i].idProject === idProjectFK){

                var jsonString = localStorage.getItem('addJson');
                vm.diagrama[i].json = jsonString;
                localStorage.setItem('angularToHtml', jsonString);    

                DService.Update(vm.diagrama[i])
                .then(function () {
                    FlashService.Success('Diagrama modificado correctamente');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            }else{
                //localStorage.clear();
            }
                
        }
    }

    function eliminarDiagrama(){

    	for(var i =0; i<vm.diagrama.length; i++){
	    	if(vm.diagrama[i].idProject == idProjectFK){
	    		DService.Delete(vm.diagrama[i])
		        .then(function () {
		            FlashService.Success('Diagrama borrado correctamente');
		        })
		        .catch(function (error) {
		            FlashService.Error(error);
		        });	
	    	}
    	}
    }
            


}
    
 
})();