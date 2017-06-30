(function () {
    'use strict';
 
    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run)
        .controller('IndexController', Controller);
 
    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");
 
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('project', {
                url: '/project',
                templateUrl: 'home/Proyecto/index.html',
                controller: 'Project.IndexController',
                controllerAs: 'vm',
                data: {activeTab: 'project'}
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('functionalrequeriments', {
                url: '/functionalrequeriments',
                templateUrl: 'requeriments/Functional/index.html',
                controller: 'FunctionalRequeriments.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'functionalrequeriments' }
            })
            .state('nofunctionalrequeriments', {
                url: '/nofunctionalrequeriments',
                templateUrl: 'requeriments/NoFunctional/index.html',
                controller: 'NoFunctionalRequeriments.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'nofunctionalrequeriments' }
            })
            .state('glosary',{
                url:'/glosary',
                templateUrl:'glosary/index.html',
                controller: 'Glosary.IndexController',
                controllerAs: 'vm',
                data:{activeTab:'glosary'}
            })
            .state('diagram',{
                url:'/diagram',
                templateUrl:'useCase/Diagram/index.html',
                controller:'Diagram.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'diagram'}
            })
            .state('specifications',{
                url:'/specifications',
                templateUrl:'useCase/Specifications/index.html',
                controller:'Specifications.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'specifications'}
            })
            .state('verEspecificaciones',{
                url:'/verEspecificaciones',
                templateUrl:'useCase/Specifications/verEspecificaciones.html',
                controller:'Specifications.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'specifications'}
            })
            .state('editarEspecificaciones',{
                url:'/editarEspecificaciones',
                templateUrl:'useCase/Specifications/edit.html',
                controller:'Specifications.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'specifications'}
            })
            .state('matrixTrazability',{
                url:'/matrixTrazability',
                templateUrl:'matrix/index.html',
                controller:'Matrix.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'matrixTrazability'}
            });
    }

    function Controller(UserService){

        var vm = this
        vm.user = null

        initController();
        function initController() {
          
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
    }

    }
 
    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
 
        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }
 
    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;
 
            angular.bootstrap(document, ['app']);
        });
    });
})();