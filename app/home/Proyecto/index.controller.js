/*####CONTROLADOR DE ANGULAR####*/
(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Project.IndexController', Controller)
        .directive('datepicker', function($timeout) {
            return {
                restrict: 'A',
                require : 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    var loadeditable = function() {
                        angular.element(element).datepicker({
                            type:'text',
                            mode: 'inline',
                            dateFormat: 'dd.mm.yy',
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
 
 
    function Controller(UserService, ProjService, FlashService) {
/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/ 
    var vm = this;

 /*####OBTENCIÓN DE DATOS####*/
	vm.user = null;
	vm.projects = null;

 /*####VARIABLES SCOPE####*/
	vm.project=null;

/*####FUNCIONES PROYECTOS####*/
	vm.saveProj = saveProj;

/*####Funciones para obtener todos los usuarios existentes en la bd ####*/
	initController();

/*####Funciones para obtener todos los proyectos existentes en la bd ####*/
	initProjectController();

/*##################################
###########GETCURRENT()#############
###################################*/
    function initController() {
       
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }


    function initProjectController(){

        ProjService.GetCurrent().then(function(projects){
            vm.projects = projects;
        });
    }


/**
 * saveRf: llama al servicio Create y inserta un proyecto en la bd
*/
    function saveProj(){

        vm.project.iniciadoPor=vm.user.email;
        vm.project.userId=vm.user._id;

          (ProjService.Create(vm.project))
                 .then(function(){
                    FlashService.Success('Proyecto creado correctamente');
                 })  
                .catch(function(error){
                     FlashService.Error(error);
                });
    }
}
 
})();