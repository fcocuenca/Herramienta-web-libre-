(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Diagram.IndexController', Controller);
 
function Controller($window, UserService, FlashService, DService, $http, compartirDatos) {
    var vm = this;
    var idProjectFK = compartirDatos.getString();
    vm.diagrama=[];
    vm.diagram = null;
    vm.result = null;

    vm.recibeJson  = recibeJson;
    vm.modificarJson = modificarJson;
    vm.existsDiagrama= existsDiagrama;

initDiagram();
function initDiagram(){
    var json;
    var id;
    DService.GetCurrent().then(function(diagram){
       vm.diagram = diagram;
        console.log(localStorage)
       for( var i =0; i<vm.diagram.length; i++){
        if(vm.diagram[i].idProject === idProjectFK){
                vm.diagrama.push(vm.diagram[i]);

                /*llevarlo al html y pintarlo*/
                json = vm.diagrama[i].json;
                id = vm.diagrama[i].idProject;
                localStorage.setItem('angularToHtml', json); 
                localStorage.setItem('idProject', id);
                vm.result = true;
        }
       }
    });
    localStorage.removeItem('angularToHtml');
    vm.result = false;
}


function existsDiagrama(){   
    for(var i=0; i<vm.diagrama.length; i++){
        if(vm.diagrama[i].idProject === idProjectFK){
             return true;
        }
    }
    return false;
    localStorage.removeItem(angularToHtml);
}


function recibeJson(){
        var d = []
        var jsonString = localStorage.getItem('addJson');
        console.log("recibejson:"+jsonString);

        d.push({idProject: idProjectFK, json: jsonString});

        DService.Create(d)
        .then(function(){
            FlashService.Success('Diagrama creado correctamente');
        })
        .catch(function(error){
            FlashService.Error(error)
        });
}


function modificarJson(){
    for(var i =0; i<vm.diagrama.length; i++){
        if(vm.diagrama[i].idProject === idProjectFK){

            var jsonString = localStorage.getItem('addJson');
            vm.diagrama[i].json = jsonString;
            localStorage.setItem('angularToHtml', jsonString);    

            DService.Update(vm.diagrama[i])
            .then(function () {
                FlashService.Success('Diagrama modificado correctamente');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }else{
            //localStorage.clear();
        }
            
    }
}
        


}
    
 
})();