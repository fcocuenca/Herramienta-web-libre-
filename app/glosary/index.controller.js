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
        
 
    function Controller($window, UserService, FlashService, GlosaryService) {
        var vm = this;
        vm.glosary= null;
    	vm.termino=null;
        vm.modificadoTerm = null;
        vm.saveTerm = saveTerm;
        vm.deleteTerm = deleteTerm;
        vm.updateTerm = updateTerm;

        initGlosary();

        /*Obtener TODOS los datos de la BD*/
        function initGlosary(){
        	GlosaryService.GetCurrent().then(function(glosary)
        	{
        		vm.glosary = glosary;
        	});
        }

        function saveTerm(){
        	if(GlosaryService.Create(vm.termino))
        			FlashService.Success('Término introducido correctamente');
        	else
        		FlashService.Success('Ha ocurrido un error, intentalo de nuevo');
        }

        function deleteTerm(index){
        	 angular.forEach(vm.glosary, function(value, key){
            if(index === key)
            {
                GlosaryService.Delete(vm.glosary[key])
                .then(function () {
                    FlashService.Success('Término borrado correctamente: '+vm.glosary[key].content);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
               
        	    } 
    	   }); 
        	
         }

         function updateTerm(index){
         	vm.glosary[index].content =vm.modificadoTerm;

         	GlosaryService.Update(vm.glosary[index])
         	.then(function(){
	                    FlashService.Success('Término modificado correctamente: '+vm.glosary[index].content);
         		})
         	.catch(function (error) {
	                    FlashService.Error(error);
	            });
         }
    }
 
})();