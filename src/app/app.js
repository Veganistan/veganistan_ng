'use strict';

function AppRun($rootScope, $state, $stateParams){
    $rootScope = $state;
    $rootScope.$stateParams = $stateParams;
}

function AppConfig($stateProvider, $urlRouterProvider){

    function templateProvider(view){
        return 'app/tpl/location.'+view+'.tpl.html';
    }

    // redirects
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('location', {
            resolve: {
                entryService: 'entryService'
            },
            url: '/location/:slug',
            views: {
                'map': {
                    templateUrl: templateProvider('map'),
                    controller: function($scope){
                        console.log("hej");
                        $scope.map = "Hello";
                    }
                },
                'detail': {
                    templateUrl: templateProvider('detail'),
                    controller: function($scope){
                        $scope.detail = "detail stuff"
                    }
                }
            }

        })
}

angular.module('app', [
        'app.search',
        'ui.router'
    ])
    .run(['$rootScope', '$state', '$stateParams', AppRun])
    .config(['$stateProvider', '$urlRouterProvider', AppConfig]);


