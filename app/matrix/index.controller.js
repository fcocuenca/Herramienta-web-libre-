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

			vm.resultado = null;

			vm.guardarMatriz = guardarMatriz;

			/*FUNCIONAMIENTO: tenemos que acceder al campo id en la especificaciones y al campo
			number en los requisitos para poder rellenar la matriz, posteriormente realizaremos
			con un checkbox para saber donde se ha marcado.*/

			//Con esta funcion nos traemos el id de las especificaciones

			initSpec();
			
			
			
			function initSpec(){
				SpecService.GetCurrent().then(function(specifications){
					vm.specifications = specifications;
				});
			}

			
			rfController();
			/*con esta funcion traremos el numero del requisito funcional*/
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
		    	if(MatrixService.Create(vm.resultado))
		    		FlashService.Success('El resultado se ha almacnado correctamente');
		    	else
		    		FlashService.Success('Ha ocurrido un error, intentelo de nuevo');
		    }



		}

})();