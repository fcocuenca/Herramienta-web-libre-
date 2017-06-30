(function (){
	'use strict';

	angular
		.module('app')
		.controller('Specifications.IndexController', Controller);

		function Controller(UserService, FlashService, SpecService)
		{
			var vm = this;
			var i = 0;

			vm.specMod= null;
			vm.specifications = null;
		
		
			vm.saveSpec = saveSpec;
			vm.deleteSpec = deleteSpec;
			vm.updateSpec = updateSpec;
			vm.getIndex = getIndex;

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
							FlashService.Success('Especificación eliminada correctamente')
						})
						.catch(function(error){
							FlashService.Error(error);
						});
					}

				});
			}	

			function updateSpec(index){

				vm.specifications[index] = vm.specMod;
				
				SpecService.Update(vm.specifications[index])
				.then(function(){
					FlashService.Success('Especificación modificada correctamente');
				})
				.catch(function (error){
					FlashService.Error(error);
				});
			}

			function getIndex(index){
					vm.specMod = vm.specifications[index];
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

/*
			function addNewAction(){

				vm.fp.push({'fp': vm.spec.flujoPrin});
				i++;
			}	

			function addNewActionFA(){

				vm.fa.push({'fa': vm.spec.flujoAlt});
				i++;
			}	
	
			function removeChoice(){
			    var lastItem = $scope.choices.length-1;
			    vm.choices.splice(lastItem);
			  };
			*/