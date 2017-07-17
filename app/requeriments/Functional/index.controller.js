/*####CONTROLADOR DE ANGULAR####*/
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
##########DECLARACIÓN DE VARIABLES###########
###########################################*/    
    var vm = this;
    var result;
    var vacio;

/*####OBTENCIÓN DE DATOS####*/
    vm.user=null;
    vm.rf = null;
    vm.cat=null;

/*####VARIABLES SCOPE####*/
    vm.requisito=null;
    vm.categoria=null;
    vm.modcategory=null;
    vm.modificado=null;
    vm.priority=null;
    vm.required = false;

/*####FUNCIONES REQUISITOS FUNCIONALES####*/
    vm.saveRf = saveRf;
    vm.deleteRf=deleteRf;
    vm.updateRf=updateRf;

/*####FUNCIONES CATEGORIAS####*/
    vm.saveCat = saveCat;
    vm.updateCat = updateCat;
    vm.deleteCat = deleteCat;

/*####VERIFICACIONES####*/
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
 * saveRf: llama al servicio Create y inserta un requisito en la bd
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
                    (RfService.Create(vm.requisito))
                     .then(function(){
                        FlashService.Success('Requisito funcional introducido correctamente');
                     })  
                    .catch(function(error){
                         FlashService.Error(error);
                    });
                       
                
                }
    } 


/**
 * deleteRf: llama al servicio Delete y borra un requisito de la bd
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
 * updateRf: llama al servicio update y modifica un requisito de la bd
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
/**
 * saveCat: almacena una categoria en la base de datos.
 * @param  {}
*/
    function saveCat(){
        if(CategoryService.Create(vm.categoria))
            FlashService.Success('Categoria introducida correctamente');
        else
            FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
    }

/**
 * updateCat: llama al servicio update y modifica una categoria de la bd
 * @param  {index}
*/
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

/**
 * deleteCat: llama al servicio delete y elimina una categoria.
 * @param  {index}
*/
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
############VERIFICACIONES########
################################*/
/**
 * verificarReqRepe: verificacion de id repetido en la bd
 * @param  {index}
*/
    function verificarReqRepe(){
        
        angular.forEach(vm.rf, function(value, key){

            if(vm.requisito.number === vm.rf[key].number)
                 return result = true;
       });
    }

}


})();

    