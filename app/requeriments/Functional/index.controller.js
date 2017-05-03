(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('FunctionalRequeriments.IndexController', Controller)
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
        
 

function Controller(UserService, RfService, FlashService) {
    
    /*###Declaracion de variables y funciones####*/    
    var vm = this;
    vm.user=null;
    vm.rf = null;
    vm.requisito=null;
    vm.modificado=null;
    vm.saveRf = saveRf;
    vm.deleteRf=deleteRf;
    vm.updateRf=updateRf;
    vm.print = print;


    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    initController();

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    rfController();

    
    function initController() {
      
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }

    function rfController() {
       
        RfService.GetCurrent().then(function (rf) {
            vm.rf = rf;
        });
    }

/**
 * saveRf: llama al controlador Create y inserta un requisito en la bd
*/
    function saveRf(){

        if(RfService.Create(vm.requisito))
            FlashService.Success('Requisito funcional introducido correctamente');
        else
            FlashService.Success('Ha ocurrido un error, intentalo de nuevo');
    } 

/**
 * deleteRf: llama al controlador Delete y borra un requisito de la bd
 * @param  {index}
*/
    function deleteRf(index){
       
        angular.forEach(vm.rf, function(value, key){
            if(index === key)
            {
                RfService.Delete(vm.rf[key])
                .then(function () {
                    FlashService.Success('Requisitos funcional borrado correctamente: '+vm.rf[key].content);
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
    function updateRf(index){

                vm.rf[index].content = vm.modificado;

                RfService.Update(vm.rf[index])
                    .then(function () {
                        FlashService.Success('Requisito funcional modificado correctamente: '+vm.rf[index].content);
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
       
    }

}

})();

    