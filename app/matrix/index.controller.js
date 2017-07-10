(function (){
	'use strict';
	angular
		.module('app')
		.controller('Matrix.IndexController', Controller);

		function Controller(UserService, FlashService, MatrixService, SpecService, RfService)
		{

			var vm = this;
		
			vm.specifications=null;
			vm.rf=null;
			vm.matrix = null;

			vm.isChecked=isChecked;
			vm.selected=[];
			vm.prueba = [];
			vm.edicion =[];

			/*funciones*/
			vm.guardarMatriz = guardarMatriz;
			vm.avisar = avisar;
			vm.eliminar =eliminar;


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


		    function guardarMatriz(){
		    	
		    	isChecked();

		    	if(resul == true){
		    		FlashService.Error('Ya ha sido seleccionado');
		    	}else
		    	{
		    		if(MatrixService.Create(vm.prueba))
		    			FlashService.Success('El resultado se ha almacenado correctamente');
		    		else
		    			FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
		    	} 	
		    }

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

		   	function isChecked(){

		   		for(var i=0; i<vm.prueba.length; i++)
		   		{
		   			for(var j=0; j<vm.matrix.length; j++)
		   			{
		   				if((vm.prueba[i].idRF === vm.matrix[j].idRF) && (vm.prueba[i].idCU === vm.matrix[i].idCU)){
							
							//existe uno repetido  					
		   					return result = true;
		   				}
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