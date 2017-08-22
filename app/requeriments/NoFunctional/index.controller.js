/*####CONTROLADOR DE ANGULAR####*/
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
        
 

function Controller(UserService, NRfService, FlashService, CategoryServiceNRf, $filter, compartirDatos) {
    
/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/ 
	var vm = this;
    var result;
    var idProjectFK = compartirDatos.getString();

/*####OBTENCIÓN DE DATOS####*/
	vm.user=null;
    vm.nrf = null;
    vm.catnrf= null;

/*####VARIABLES SCOPE####*/
    vm.requisitonf=null;
    vm.modificadonf=null;
    vm.categorianrf=null;
    vm.modcategorynrf=null;
    vm.requisitosNoFuncionales = [];
    vm.categorias= [];

/*FUNCIONES REQUISITOS NO FUNCIONALES*/
    vm.saveNRf = saveNRf;
    vm.deleteNRf=deleteNRf;
    vm.updateNRf=updateNRf;

/*####FUNCIONES CATEGORIAS####*/
    vm.saveCatNrf = saveCatNrf;
    vm.updateCatNrf= updateCatNrf;
    vm.deleteCatNrf = deleteCatNrf;

/*####VERIFICACIONES####*/
    vm.verificarReqRepe = verificarReqRepe;
    vm.orden = orden;


    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    initController();

    /*####Funciones para obtener todos los requisitos no funcionales existentes en la bd ####*/
    nrfController();

    /*####Funciones para obtener todas las categorias existentes en la bd ####*/
    CatNRfController();


/*##################################
###########GETCURRENT()#############
###################################*/

	function initController() {
	  
	    UserService.GetCurrent().then(function (user) {
	        vm.user = user;
	    });
	}

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

    function CatNRfController() {
      
        CategoryServiceNRf.GetCurrent().then(function (catnrf) {
            vm.catnrf = catnrf;
            for(var i =0; i<vm.catnrf.length; i++){
                if(vm.catnrf[i].idProject === idProjectFK){
                    vm.categorias.push(vm.catnrf[i]);
                }
            }
        });
    }

/*###################################
###########CRUD REQUISITOS###########
#####################################*/


/**
 * saveNRf: llama al controlador Create y inserta un requisito no funcional en la bd
*/
	function saveNRf(){

        vm.requisitonf.number = parseInt(vm.requisitonf.number);
        vm.requisitonf.idProject = idProjectFK;

        verificarReqRepe();

        if(result == true){
            FlashService.Error('Este id ya esta insertado');
        }else{
            NRfService.Create(vm.requisitonf)
                .then(function (){
                    FlashService.Success('Requisito no funcional introducido correctamente');  
                })
                .catch(function(error){
                    FlashService.Error(error);    
                });
                
        }
	} 

/**
 * deleteNRf: llama al controlador Delete y borra un requisito de la bd
*/
	function deleteNRf(index){
	   
	  	angular.forEach(vm.requisitosNoFuncionales, function(value, key){
	        if(index === key)
	        {
	            NRfService.Delete(vm.requisitosNoFuncionales[key])
	            .then(function () {
	                FlashService.Success('Requisito no funcional borrado correctamente');
	            })
	            .catch(function (error) {
	                FlashService.Error(error);
	            });
	           
	        } 
	   }); 
	}

/**
 * updateRf: llama al controlador update y modifica un requisito de la bd
*/
	function updateNRf(index){

	            vm.requisitosNoFuncionales[index].content = vm.modificadonf;

	            NRfService.Update(vm.requisitosNoFuncionales[index])
	               	.then(function () {
	                    FlashService.Success('Requisito no funcional modificado correctamente');
	                })
	                .catch(function (error) {
	                    FlashService.Error(error);
	                });
	}

/*###################################
###########CRUD CATEGORIAS###########
#####################################*/	

/**
 * saveCat: almacena una categoria en la base de datos.
*/
    function saveCatNrf(){

        if(CategoryServiceNRf.Create(vm.categorias))
            FlashService.Success('Categoria introducida correctamente');
        else
            FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
    }

/**
 * updateCat: llama al controlador update y modifica una categoria de la bd
*/
	function updateCatNrf(index){
        vm.catnrf[index].category = vm.modcategorynrf;

                CategoryServiceNRf.Update(vm.categoria[index])
                    .then(function () {
                        FlashService.Success('Categoría modificada correctamente: '+vm.categorias[index].category);
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
    }
    
/**
 * deleteCat: llama al contraolador delete y elimina una categoria.
*/
    function deleteCatNrf(index){
        angular.forEach(vm.catnrf, function(value, key){
            if(index === key)
            {
                CategoryServiceNRf.Delete(vm.categorias[key])
                .then(function () {
                    FlashService.Success('Categoría borrada correctamente: '+vm.categorias[key].category);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
               
            } 
       }); 
    }

/*################################
############VERIFICACIONES########
################################*/
    function verificarReqRepe(){
        
        angular.forEach(vm.requisitosNoFuncionales, function(value, key){

            if(vm.requisitonf.number === vm.requisitosNoFuncionales[key].number)
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

    