(function (){
	'use strict';

	angular
		.module('app')
		.controller('Specifications.IndexController', Controller)
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


		function Controller(UserService, FlashService, SpecService)
		{
			var vm = this;

			vm.spec = null;
			vm.specifications = null;
			vm.fp = [];

			vm.saveSpec = saveSpec;
			vm.deleteSpec = deleteSpec;
			vm.updateSpec = updateSpec;

			initSpec();

			function initSpec(){
				SpecService.GetCurrent().then(function(specifications){
					vm.specifications = specifications;
				});
			}

			function saveSpec(){
				SpecService.Create(vm.spec)
					.then(function(){
						FlashService.Success('Especificacion almacenada correctamente');
					})
					.catch(function(error){
						FlashService.Error(error);
					});
					

			}

			function deleteSpec(index){
				angular.forEach(vm.specifications, function(value, key){
					if(index === key){
						SpecService.Delete(vm.specifications[key])
						.then(function(){
							FlashService.Success('Especificación'+vm.spec[key].name +'eliminada correctamente')
						})
						.catch(function(error){
							FlashService.Error(error);
						});
					}

				});
			}

			function updateSpec(index){
				SpecService.Update(vm.specifications[index])
				.then(function(){
					FlashService.Success('Especificación modificada correctamente');
				})
				.catch(function (error){
					FlashService.Error(error);
				});
			}
		}

})();

/*
function verificarReqRepe(){
        
        angular.forEach(vm.rf, function(value, key){

            if(vm.requisito.number === vm.rf[key].number)
                 return result = true;
       });
    }*/