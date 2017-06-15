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
        
 

function Controller(UserService, NRfService, FlashService, CategoryServiceNRf, $filter) {
    
    /*###Declaracion de variables y funciones####*/    
	var vm = this;
    var result;

	vm.user=null;
    vm.nrf = null;
    vm.catnrf= null;

    vm.requisitonf=null;
    vm.modificadonf=null;

    vm.categorianrf=null;
    vm.modcategorynrf=null;

    vm.saveNRf = saveNRf;
    vm.deleteNRf=deleteNRf;
    vm.updateNRf=updateNRf;

    vm.saveCatNrf = saveCatNrf;
    vm.updateCatNrf= updateCatNrf;
    vm.deleteCatNrf = deleteCatNrf;
    vm.verificarReqRepe = verificarReqRepe;
    vm.orden = orden;


    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    initController();

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    nrfController();

    CatNRfController();
    
	function initController() {
	  
	    UserService.GetCurrent().then(function (user) {
	        vm.user = user;
	    });
	}

    function CatNRfController() {
      
        CategoryServiceNRf.GetCurrent().then(function (catnrf) {
            vm.catnrf = catnrf;
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

        vm.requisitonf.number = parseInt(vm.requisitonf.number);

        verificarReqRepe();

        if(result == true){
            FlashService.Error('Este id ya esta insertado');
        }else{

            if(NRfService.Create(vm.requisitonf))
                FlashService.Success('Requisito no funcional introducido correctamente');
            else
                FlashService.Success('Ha ocurrido un error, intentalo de nuevo');    
        }

	    
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
	
	function saveCatNrf(){
    
        if(CategoryServiceNRf.Create(vm.categorianrf))
            FlashService.Success('Categoria introducida correctamente');
        else
            FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
    }


	function updateCatNrf(index){
        vm.catnrf[index].category = vm.modcategorynrf;

                CategoryServiceNRf.Update(vm.catnrf[index])
                    .then(function () {
                        FlashService.Success('Categoría modificada correctamente: '+vm.catnrf[index].category);
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
    }

    function deleteCatNrf(index){
        angular.forEach(vm.catnrf, function(value, key){
            if(index === key)
            {
                CategoryServiceNRf.Delete(vm.catnrf[key])
                .then(function () {
                    FlashService.Success('Categoría borrada correctamente: '+vm.catnrf[key].category);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
               
            } 
       }); 
    }

    function verificarReqRepe(){
        
        angular.forEach(vm.nrf, function(value, key){

            if(vm.requisitonf.number === vm.nrf[key].number)
                 return result = true;
       });
    }

   vm.orderReverse = true;

    function orden(){
        vm.orderReverse = !vm.orderReverse;
        vm.nrf = $filter('orderBy')(vm.nrf, 'number', vm.orderReverse);
    }


}

})();

    