/*####CONTROLADOR DE ANGULAR####*/
(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Account.IndexController', Controller);
 
    function Controller($window, UserService, FlashService) {

/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/  
    var vm = this;
 
 /*####OBTENCIÓN DE DATOS####*/
    vm.user = null;

/*####FUNCIONES USUARIOS####*/
    vm.saveUser = saveUser;
    vm.deleteUser = deleteUser;

/*####Funciones para obtener todos los usuarios existentes en la bd ####*/
    initController();

/*##################################
###########GETCURRENT()#############
###################################*/

    function initController() {
        // get current user
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }
    

/*###################################
###########CRUD USUARIOS#############
#####################################*/

/**
 * saveUser: llama al servicio Create y inserta un usuario en la bd
*/
    function saveUser() {
        UserService.Update(vm.user)
            .then(function () {
                FlashService.Success('Usuario modificado correctamente');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
    }

/**
 * deleteUser: llama al servicio Delete y borra un usuario de la bd
*/
    function deleteUser() {
        UserService.Delete(vm.user._id)
            .then(function () {
                // log user out
                $window.location = '/login';
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
    }
}
 
})();