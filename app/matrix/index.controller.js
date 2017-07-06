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

			vm.name=null;
			vm.selected=null;
			vm.prueba = [];

			/*funciones*/
			vm.avisar = avisar;
			vm.comprobar = comprobar;


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

		    function avisar(name, number, id){
		    		console.log(name);
		    		console.log(number);
		    		console.log(id)
		    		var i=0;
		    		
		    		if(vm.selected[id] == true){
		    			vm.prueba.push({'idRF': number, 'idCU': name, 'id': id});
		    			i++;
		    		}

	    			if(vm.selected[id] == false)
	    			{
	    				
	    			}

		    }

		    function comprobar(id){
					
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