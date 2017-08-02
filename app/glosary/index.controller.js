/*####CONTROLADOR DE ANGULAR####*/
(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Glosary.IndexController', Controller)
        .directive('editable', function($timeout) {
            return {
                restrict: 'A',
                require : 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    var loadeditable = function() {
                        angular.element(element).editable({
                            type:'text',
                            mode: 'inline',
                            emptytext: 'campo vacío',
                            onblur:'submit',
                            display: function(value, srcData) {
                                scope.$apply(function(){
                                    ngModel.$setViewValue(value);
                                });
                            }
                        });
                    };
                    $timeout(function() {
                        loadeditable();
                    }, 10);
                }
            };
        });
        
 
    function Controller($window, UserService, FlashService, GlosaryService, $filter, compartirDatos) {
        
/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/   
    var vm = this;
    vm.letraA=[];
    var result;
    var idProjectFK = compartirDatos.getString();

/*####OBTENCIÓN DE DATOS####*/
	vm.glosary= null;

/*####VARIABLES SCOPE####*/
   	vm.termino=null;
    vm.modificadoTerm = null;
    vm.terminos;
    vm.glosario = [];
    
/*####FUNCIONES GLOSARIO####*/
    vm.saveTerm = saveTerm;
    vm.deleteTerm = deleteTerm;
    vm.updateTerm = updateTerm;

/*####VERIFICACIONES####*/    
    vm.comprobar = comprobar;


/*##################################
###########GETCURRENT()#############
###################################*/
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

/*###################################
###########CRUD REQUISITOS###########
#####################################*/

/**
 * saveTerm: llama al servicio create para almacenar el termino en la bd
*/

    function saveTerm(){


            if(vm.termino == null)
            {
                FlashService.Error("No has introducido ningún término, intentalo de nuevo");
            }

            vm.termino.idProject = idProjectFK;

        	GlosaryService.Create(vm.termino)
            .then(function(){
        			FlashService.Success('Término insertado correctamente');
            })
            .catch(function(error){
                FlashService.Error(error);
            });
    }

/**
 * deleteTerm: llama al servicio delete para almacenar el termino en la bd
 * @param  {index}
*/
    function deleteTerm(index){
    	 angular.forEach(vm.glosario, function(value, key){
        if(index === key)
        {
            GlosaryService.Delete(vm.glosario[key])
            .then(function () {
                FlashService.Success('Término borrado correctamente');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
           
    	    } 
	   }); 
    	
     }

/**
 * updateTerm: llama al servicio update para almacenar el termino en la bd
 * @param  {index}
*/
     function updateTerm(index){
     	vm.glosario[index].content =vm.modificadoTerm;

     	GlosaryService.Update(vm.glosario[index])
     	.then(function(){
                    FlashService.Success('Término modificado correctamente');
     		})
     	.catch(function (error) {
                    FlashService.Error(error);
            });
     }

/*################################
############VERIFICACIONES########
################################*/
    function comprobar(){

    	var primeraletra;
        var longitud = vm.glosary.length
        var i=0;
        var str; 
        var res; 
        var palabraA=[];
        var palabraB=[];

        for(i=0; i<longitud; i++)
        {
            str = vm.glosary[i].content;
            res = str.substr(0,1);

            if(res === "A")
                palabraA.push({'content': vm.glosary[i].content});

            /*if(res === "B")
                palabraB.push({'content': vm.glosary[i].content});                    
                */
        }
        
        vm.letraA = palabraA
    }
     

}

})();

/*
     vm.orderReverse = true;

   function orden(){
        vm.orderReverse = !vm.orderReverse;
        vm.glosary = $filter('orderBy')(vm.glosary, 'content', vm.orderReverse);
    }*/