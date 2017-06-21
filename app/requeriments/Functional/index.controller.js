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
        
 

function Controller(UserService, RfService, FlashService, CategoryService, $filter) {

/*###########################################
###Declaracion de variables##################
###########################################*/    
    var vm = this;
    var result;


    vm.user=null;
    vm.rf = null;
    vm.cat=null;

    vm.requisito=null;

    vm.categoria=null;
    vm.modcategory=null;
    
    vm.modificado=null;
    vm.priority=null;

    vm.saveRf = saveRf;
    vm.deleteRf=deleteRf;
    vm.updateRf=updateRf;

    vm.saveCat = saveCat;
    vm.updateCat = updateCat;
    vm.deleteCat = deleteCat;
    vm.verificarReqRepe = verificarReqRepe;

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    initController();

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
    rfController();

    /*####Funcion para obtener todaas las categorias de la bd*/
    catController();


/*##################################
###########GETCURRENT()#############
###################################*/


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

    function catController(){
        CategoryService.GetCurrent().then(function (cat){
            vm.cat = cat;
        });
    }



/*###################################
###########CRUD REQUISITOS###########
#####################################*/

/**
 * saveRf: llama al controlador Create y inserta un requisito en la bd
*/
    function saveRf(){

        /*conversion del string a numero*/    
       vm.requisito.number =  parseInt(vm.requisito.number);

        verificarReqRepe();

        if(result == true)
        {
            FlashService.Error('Este id ya esta insertado');
        }else
        {
            if(RfService.Create(vm.requisito))
                    FlashService.Success('Requisito funcional introducido correctamente');
            else
                FlashService.Success('Ha ocurrido un error, intentalo de nuevo');
        }

        
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
    

/*###################################
###########CRUD CATEGORIAS###########
#####################################*/
    function saveCat(){
        if(CategoryService.Create(vm.categoria))
            FlashService.Success('Categoria introducida correctamente');
        else
            FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
    }



    function updateCat(index){
        vm.cat[index].category = vm.modcategory;

                CategoryService.Update(vm.cat[index])
                    .then(function () {
                        FlashService.Success('Categoría modificada correctamente: '+vm.cat[index].category);
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
    }

    function deleteCat(index){
        angular.forEach(vm.cat, function(value, key){
            if(index === key)
            {
                CategoryService.Delete(vm.cat[key])
                .then(function () {
                    FlashService.Success('Categoría borrada correctamente: '+vm.cat[key].category);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
               
            } 
       }); 
    }
    

    /*################################
    ############COMPROBACIONES########
    ################################*/

    function verificarReqRepe(){
        
        angular.forEach(vm.rf, function(value, key){

            if(vm.requisito.number === vm.rf[key].number)
                 return result = true;
       });
    }



}

})();

    