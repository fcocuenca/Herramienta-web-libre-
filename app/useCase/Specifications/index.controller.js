/*####CONTROLADOR DE ANGULAR####*/
(function (){
	'use strict';

	angular
		.module('app')
		.controller('Specifications.IndexController', Controller);

function Controller(UserService, FlashService, SpecService, compartirDatos){

/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/    
	var vm = this;
	var i = 0;
	var idProjectFK = compartirDatos.getString();


/*####OBTENCIÓN DE DATOS####*/
	vm.specifications = null;

/*####VARIABLES SCOPE####*/
	vm.specMod= null;
	vm.especificaciones = [];

/*####FUNCIONES ESPECIFICACIONES####*/
	vm.saveSpec = saveSpec;
	vm.deleteSpec = deleteSpec;
	vm.updateSpec = updateSpec;
	vm.getIndex = getIndex;

/*####Funciones para obtener todos las especificaciones existentes en la bd ####*/
	initSpec();


/*##################################
###########GETCURRENT()#############
###################################*/

	function initSpec(){
		SpecService.GetCurrent().then(function(specifications){
			vm.specifications = specifications;
			for(var i =0; i<vm.specifications.length; i++){
                if(vm.specifications[i].idProject === idProjectFK){
                    vm.especificaciones.push(vm.specifications[i]);
                }
            }
		});
	}

/*###################################
###########CRUD ESPECIFICACIONES#####
#####################################*/

/**
 * saveSpec: llama al servicio Create y inserta una especificacion en la bd
*/
	function saveSpec(){

		vm.spec.idProject = idProjectFK;
		vm.spec.id =  parseInt(vm.spec.id);
		
		SpecService.Create(vm.spec)
			.then(function(){
				FlashService.Success('Especificacion insertada correctamente');
			})
			.catch(function(error){
				FlashService.Error(error);
			});
	}


/**
 * deleteSpec: llama al servicio Delete y borra una especificacion de la bd
 * @param  {index}
*/
	function deleteSpec(index){
		angular.forEach(vm.especificaciones, function(value, key){
			if(index === key){
				SpecService.Delete(vm.especificaciones[key])
				.then(function(){
					FlashService.Success('Especificación eliminada correctamente')
				})
				.catch(function(error){
					FlashService.Error(error);
				});
			}

		});
	}	

/**
 * updateSpec: llama al servicio update y modifica una especificacion de la bd
 * @param  {index}
*/
	function updateSpec(index){

		vm.especificaciones[index] = vm.specMod;
		
		SpecService.Update(vm.especificaciones[index])
		.then(function(){
			FlashService.Success('Especificación modificada correctamente');
		})
		.catch(function (error){
			FlashService.Error(error);
		});
	}

	function getIndex(index){
			vm.specMod = vm.especificaciones[index];
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