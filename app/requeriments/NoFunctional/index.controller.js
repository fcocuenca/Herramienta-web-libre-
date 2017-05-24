(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('NoFunctionalRequeriments.IndexController', Controller)
        .directive('editablenrf', function($timeout) {
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
        
 

function Controller(UserService, NRfService, FlashService) {
    
    /*###Declaracion de variables y funciones####*/    
	var vm = this;
	vm.user=null;
    vm.nrf = null;
    vm.requisitonf=null;
    vm.modificadonf=null;
    vm.saveNRf = saveNRf;
    vm.deleteNRf=deleteNRf;
    vm.updateNRf=updateNRf;


    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    initController();

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    nrfController();

    
	function initController() {
	  
	    UserService.GetCurrent().then(function (user) {
	        vm.user = user;
	    });
	}

	function nrfController() {
	   
	    NRfService.GetCurrent().then(function (nrf) {
	        vm.nrf = nrf;
	    });
	}

/**
 * saveRf: llama al controlador Create y inserta un requisito en la bd
*/
	function saveNRf(){

	    if(NRfService.Create(vm.requisitonf))
	        FlashService.Success('Requisito no funcional introducido correctamente');
	    else
	        FlashService.Success('Ha ocurrido un error, intentalo de nuevo');
	} 

/**
 * deleteRf: llama al controlador Delete y borra un requisito de la bd
 * @param  {index}
*/
	function deleteNRf(index){
	   
	  	angular.forEach(vm.nrf, function(value, key){
	        if(index === key)
	        {
	            NRfService.Delete(vm.nrf[key])
	            .then(function () {
	                FlashService.Success('Requisitos no funcional borrado correctamente: '+vm.nrf[key].content);
	            })
	            .catch(function (error) {
	                FlashService.Error(error);
	            });
	           
	        } 
	   }); 
	}
/**
 * updateRf: llama al controlador update y modifica un requisito de la bd
 * @param  {index}
*/
	function updateNRf(index){

	            vm.nrf[index].content = vm.modificadonf;

	            NRfService.Update(vm.nrf[index])
	               	.then(function () {
	                    FlashService.Success('Requisito no funcional modificado correctamente: '+vm.nrf[index].content);
	                })
	                .catch(function (error) {
	                    FlashService.Error(error);
	                });
	}	         
}

})();

    