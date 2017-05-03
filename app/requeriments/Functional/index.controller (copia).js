(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('FunctionalRequeriments.IndexController', Controller);
        
 
    function Controller(UserService, RfService, FlashService) {
        var vm = this;
 		vm.user=null;
        vm.rf = null;
        vm.requisito=null;
        vm.modificado=null;
        vm.saveRf = saveRf;
        vm.deleteRf=deleteRf;
        vm.updateRf=updateRf;


        initController();
        rfController();

       


        function initController() {
          
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }
        
        //trae un array con los requisitos que existen en Mongo
        function rfController() {
           
            RfService.GetCurrent().then(function (rf) {
                vm.rf = rf;
            });
        }
        
        //encargado de Guardar en mongo el requisito.
        function saveRf(){

            if(RfService.Create(vm.requisito))
                FlashService.Success('Requisitos funcional introducido correctamente');
            else
                FlashService.Success('Ha ocurrido un error, intentalo de nuevo');

        } 

        function deleteRf(index){
           
           var id;
           angular.forEach(vm.rf, function(value, key){
                if(index === key)
                {
                    RfService.Delete(vm.rf[key])
                    .then(function () {
                        FlashService.Success('Requisitos funcional borrado correctamente: '+vm.rf[key]._id);
                    })
                    .catch(function (error) {
                        FlashService.Error(error);
                    });
                   
                } 
           }); 
        }

        function updateRf(index){
            var id;

           angular.forEach(vm.rf, function(value, key){
                if(index === key)
                {
                    vm.rf[key].tittle = vm.modificado.tittle;
                    vm.rf[key].content = vm.modificado.content;

                     RfService.Update(vm.rf[key])
                        .then(function () {
                            FlashService.Success('Requisitos funcional modificado correctamente: '+vm.rf[key]._id);
                        })
                        .catch(function (error) {
                            FlashService.Error(error);
                        });
                } 
           });
        }

        
                 
    }

 
})();

    