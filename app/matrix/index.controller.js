(function (){
	'use strict';
	angular
		.module('app')
		.controller('Matrix.IndexController', Controller);

		function Controller(UserService, FlashService, MatrixService, SpecService, RfService)
		{

			var vm = this;
			var result;
			var modificado;
		
			vm.specifications=null;
			vm.rf=null;
			vm.matrix = null;

			vm.isChecked=isChecked;
			vm.selected=[];
			vm.selectedMod=[];
			vm.prueba = [];
			vm.idRFidCU;
			vm.estado;

			/*funciones*/
			vm.guardarMatriz = guardarMatriz;
			vm.avisar = avisar;
			vm.eliminar =eliminar;
			vm.quitarMatrix = quitarMatrix;
			vm.updateMatrix = updateMatrix;
			vm.eliminarTodo = eliminarTodo;

			initSpec();			
			function initSpec(){
				SpecService.GetCurrent().then(function(specifications){
					vm.specifications = specifications;
				});
			}

			
			rfController();
			function rfController() {
		        RfService.GetCurrent().then(function (rf) {
		            vm.rf = rf;
		        });
		    }

		    initMatrix();
		    function initMatrix(){
		    	MatrixService.GetCurrent().then(function(matrix){
		    		vm.matrix = matrix;
		    	});
		    }

		    /*reesctructurar esto con if anidados*/
		    function guardarMatriz(){
		    	
		    	isChecked();

		    	if(result == true){
		    		FlashService.Error('CU/RF ya ha sido seleccionado');
		    	}else{
		    		if(MatrixService.Create(vm.prueba))
		    			FlashService.Success('El resultado se ha almacenado correctamente');
		    		else
		    			FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
		    	}
		    }

		    /*quitar y poner cuando se ha seleccionado/deselccionado en el array prueba*/
		    function avisar(name, number, id){
		    	
		    		var i=0;
		    		
		    		if(vm.selected[id] == true){

		    			vm.prueba.push({'idRF': number, 'idCU': name, 'id': id, 'selected': true});
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

		    function eliminar(id)
		    {
		    	vm.prueba.splice(id, 1);
		    	console.log(vm.prueba);
		   	}

		   	/*comprobar que existe uno repetido en la bd*/
		   	function isChecked(){

		   		for(var i=0; i<vm.prueba.length; i++)
		   		{
		   			for(var j=0; j<vm.matrix.length; j++)
		   			{
		   				if((vm.prueba[i].idRF === vm.matrix[j].idRF) && (vm.prueba[i].idCU === vm.matrix[j].idCU)){
							
							//existe uno repetido
		   					return result = true;
		   				}
		   				
		   			}
		   		}
		   	}

		  /*para saber que elemento se tiene que quitar.*/
		function quitarMatrix(idCU, idRF, id){
   				if(vm.selectedMod[id] == true)
   				{   					
					for(var i=0; i<vm.matrix.length; i++)
   					{
   						if((idRF == vm.matrix[i].idRF) && (idCU === vm.matrix[i].idCU))
   						{
   							console.log("modifica RF:"+vm.matrix[i].idRF+" CU"+vm.matrix[i].idCU);
   							updateMatrix(vm.matrix[i]);
						}
   					}
   				}
   		}

   		function updateMatrix(checkEliminar)
   		{   
   			var eliminar = checkEliminar; 	
		    if(MatrixService.DeleteCheck(eliminar));
		    	
   		}

   		function eliminarTodo(){
   			if(MatrixService.Delete(vm.prueba))
		    			FlashService.Success('Has borrado la matriz entera');
		    		else
		    			FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
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