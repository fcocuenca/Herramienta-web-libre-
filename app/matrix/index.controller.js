/*####CONTROLADOR DE ANGULAR####*/
(function (){
	'use strict';
	angular
		.module('app')
		.controller('Matrix.IndexController', Controller);

function Controller(UserService, FlashService, MatrixService, SpecService, RfService, compartirDatos)
{
/*###########################################
##########DECLARACIÓN DE VARIABLES###########
###########################################*/  
	var vm = this;
	var result;
	var modificado;
	var idProjectFK = compartirDatos.getString();


/*####OBTENCIÓN DE DATOS####*/
	vm.specifications=null;
	vm.rf=null;
	vm.matrix = null;

/*####VARIABLES SCOPE####*/
	vm.isChecked=isChecked;
	vm.selected=[];
	vm.selectedMod=[];
	vm.prueba = [];
	vm.idRFidCU;
	vm.estado;
	vm.especificaciones = []
	vm.requisitosFuncionales = [];
	vm.matriz = [];
	vm.elementosSeleccionados = [];


/*####FUNCIONES MATRIZ DE TRAZABILIDAD####*/
	vm.guardarMatriz = guardarMatriz;
	vm.avisar = avisar;
	vm.eliminar =eliminar;
	vm.quitarMatrix = quitarMatrix;
	vm.updateMatrix = updateMatrix;
	vm.eliminarTodo = eliminarTodo;

    /*####Funciones para obtener todos las especificaciones existentes en la bd ####*/
	initSpec();			

    /*####Funciones para obtener todos los requisitos existentes en la bd ####*/
	rfController();

    /*####Funciones para obtener todos las matrices existentes en la bd ####*/
    initMatrix();

/*##################################
###########GETCURRENT()#############
###################################*/
	function initSpec(){
		SpecService.GetCurrent().then(function(specifications){
			vm.specifications = specifications;
			for(var i =0; i<vm.specifications.length; i++)
            {
                if(vm.specifications[i].idProject === idProjectFK)
                    vm.especificaciones.push(vm.specifications[i]);
            }
			
		});
	}

	
	function rfController() {
        RfService.GetCurrent().then(function (rf) {
            vm.rf = rf;
            for(var i =0; i<vm.rf.length; i++)
            {
                if(vm.rf[i].idProject === idProjectFK)
                    vm.requisitosFuncionales.push(vm.rf[i]);
            }
        });
    }

    function initMatrix(){
    	MatrixService.GetCurrent().then(function(matrix){
    		vm.matrix = matrix;
    		 for(var i =0; i<vm.matrix.length; i++)
            {
                if(vm.matrix[i].idProject === idProjectFK)
                    vm.matriz.push(vm.matrix[i]);
            }
    	});
    }

/*###################################
#####CRUD MATRIZ DE TRAZABILIDAD#####
#####################################*/

/**
 * guardarMatriz: llama al servicio Create y inserta un vector donde esta la matriz en la bd
*/
    /*reesctructurar esto con if anidados*/
    function guardarMatriz(elemento){
   
    		MatrixService.Create(elemento)
    		.then(function(){
    			FlashService.Success('La matriz se ha guardado correctamente');
    		})
    		.catch(function(err){
    			FlashService.Error(err);
    		});	 			
    	
    }

 /**
 * updateMatrix: quita el check de la matriz
 * @param  {checkEliminar}
*/
	function updateMatrix(checkEliminar){   
		var eliminar = checkEliminar; 	
    	MatrixService.DeleteCheck(eliminar)
    	.then(function(){
    		FlashService.Success('La matriz ha sido modificada');
    	})
    	.catch(function(error){
    		FlashService.Error(error);
    	})
	}

/**
 * avisar: Selecciona o deselecciona el elemento en el array
 * @param  {name, number, id}
*/
    /*quitar y poner cuando se ha seleccionado/deselccionado en el array prueba*/
    function avisar(name, number, id){
    	
    		var i=0;
    		
    		if(vm.selected[id] == true){
    			 
    			vm.prueba.push({'idRF': number, 'idCU': name, 'id': id, 'selected': true, 'idProject': idProjectFK});
    			i++;
    			console.log("añado"+id);
    		}

    		if(vm.selected[id] == false)
    		{
    			for(i=0; i<vm.prueba.length; i++)
    			{
	    			if(id == vm.prueba[i].id)
	    			{
	    				vm.eliminar(i);
	    			}
	    		}
    		}		    		
    }

/**
 * eliminar: Elimina el elemento del vector prueba
 * @param  {id}
*/
    function eliminar(id)
    {
    	vm.prueba.splice(id, 1);
    	console.log(vm.prueba);
   	}

   	/*comprobar que existe uno repetido en la bd*/
   	function isChecked(){
   		var eliminard;
   		for(var i=0; i<vm.prueba.length; i++)
   		{
   			for(var j=0; j<vm.matriz.length; j++)
   			{
   				if((vm.prueba[i].idRF == vm.matriz[j].idRF) && (vm.prueba[i].idCU == vm.matriz[j].idCU)){
					updateMatrix(vm.matriz[j]);
					eliminard = vm.matriz[j].id;
					vm.prueba.splice(eliminar, 1);
   				}
   			}
   			guardarMatriz(vm.prueba[i])
   		}

   		
   	}

 /**
 * quitarMatriz: modifica el elemento que hay que quitar de la matriz
 * @param  {idCU, idRF, id}
*/

  /*para saber que elemento se tiene que quitar.*/
	function quitarMatrix(idCU, idRF, id){
		if(vm.selectedMod[id] == true)
		{   					
		for(var i=0; i<vm.matriz.length; i++)
			{
				if((idRF == vm.matriz[i].idRF) && (idCU === vm.matriz[i].idCU))
				{
					console.log("modifica RF:"+vm.matriz[i].idRF+" CU"+vm.matriz[i].idCU);
					updateMatrix(vm.matriz[i]);
			}
			}
		}
	}



 /**
 * eliminarTodo: elimina la matriz por completo
*/
	function eliminarTodo(){

		 for(var i =0; i<vm.matriz.length; i++){
		 	if(vm.matriz[i].idProject === idProjectFK){
		 		MatrixService.Delete(vm.matriz[i])
		 		.then(function(){
		 			FlashService.Success('La matriz de trazabilidad ha sido borrada');
				})
				.catch(function(){
					FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
				});
		 	}
		 }
	}
   	
}
})();

		    /*
		    function guardarMatriz(){
		    	if(MatrixService.Create(vm.resultado))
		    		FlashService.Success('El resultado se ha almacnado correctamente');
		    	else
		    		FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
		    }
		    */