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
                entryService: 'entryService',
                entry: function(entryService){
                    return this.entryService.get();
                }
            },
            url: '/location/:slug',
            views: {
                'map': {
                    templateUrl: templateProvider('map'),
                    controller: function($scope, entry){
                        console.log("hej");
                        $scope.entry = entry;
                    }
                },
                'detail': {
                    templateUrl: templateProvider('detail'),
                    controller: function($scope, entry){
                        $scope.entry = entry;
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


