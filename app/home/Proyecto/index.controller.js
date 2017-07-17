(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Project.IndexController', Controller)
        .directive('datepicker', function($timeout) {
            return {
                restrict: 'A',
                require : 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    var loadeditable = function() {
                        angular.element(element).datepicker({
                            type:'text',
                            mode: 'inline',
                            dateFormat: 'dd.mm.yy',
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
 
    function Controller(UserService, ProjService, FlashService) {
        var vm = this;
 
        vm.user = null;
        vm.projects = null;

        vm.project=null;
        vm.saveProj = saveProj;
        
        initController();

        initProjectController();
 
        function initController() {
            // get current user

            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }


        function initProjectController(){

            ProjService.GetCurrent().then(function(projects){
                vm.projects = projects;
            });
        }

        function saveProj(){

            vm.project.iniciadoPor=vm.user.email;
            vm.project.userId=vm.user._id;

              (ProjService.Create(vm.project))
                     .then(function(){
                        FlashService.Success('Proyecto creado correctamente');
                     })  
                    .catch(function(error){
                         FlashService.Error(error);
                    });
        }




    }
 
})();