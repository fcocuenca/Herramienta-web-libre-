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
        
 
    function Controller($window, UserService, FlashService, GlosaryService, $filter) {
        var vm = this;
        vm.letraA=[];

        vm.glosary= null;
    	vm.termino=null;
        vm.modificadoTerm = null;
        vm.saveTerm = saveTerm;
        vm.deleteTerm = deleteTerm;
        vm.updateTerm = updateTerm;
        vm.terminos;
        var result;
        vm.comprobar = comprobar;
       // vm.bubbleSort = bubbleSort;


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


	    function comprobar(){

        	var primeraletra;
            var longitud = vm.glosary.length
            var i=0;
            var str; 
            var res; 
            var palabraA=[];
            var palabraB=[];

            for(i=0; i<longitud; i++)
            {
                str = vm.glosary[i].content;
                res = str.substr(0,1);

                if(res === "A")
                    palabraA.push({'content': vm.glosary[i].content});

                /*if(res === "B")
                    palabraB.push({'content': vm.glosary[i].content});                    
                    */
            }
            
           // vm.bubbleSort(palabraA);
            vm.letraA = palabraA
        }
         

    }
 
})();

/*
        function bubbleSort(array){
            var size = array.length;
            var pass = 1;
            var left = 0;
            for(pass = 1; pass<size; pass++){
                for(left; left<(size-pass); left++){
                    var right = left + 1;
                    if(array[left] > array[right]){
                        FlashService.Success('esto va del carajo')
                    } 
                }
            }
            return array;
        }
  


         vm.orderReverse = true;

	   function orden(){
	        vm.orderReverse = !vm.orderReverse;
	        vm.glosary = $filter('orderBy')(vm.glosary, 'content', vm.orderReverse);
	    }*/