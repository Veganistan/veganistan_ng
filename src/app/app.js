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

        // the state string corresponds to the value inside a ``ui-sref=""``
        .state('search', {
            /**
             * Inject entryService into the SearchCtrl controller
             */
            resolve: {
              entryService: 'entryService'
            },
            // empty url means this child state will become active
            // when its parent's url is navigated to. urls of child states are
            // automatically appended to the urls of their parents.
            url: '/',
            templateUrl: 'app/tpl/search.tpl.html',
            controller: SearchCtrl
        })
        .state('location', {
            resolve: {
                entryService: 'entryService',
                entry: function(entryService){
                           return entryService.get()
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
        'app.services',
        'ui.router'
    ])
    .run(['$rootScope', '$state', '$stateParams', AppRun])
    .config(['$stateProvider', '$urlRouterProvider', AppConfig])
    .factory('appState', function(){
        // TODO: Consider dumping the app state into localstorage
        var state = {
            sidebarClosed: true,
            toggleSidebar: function(){
                this.sidebarClosed = !this.sidebarClosed;
                return this.sidebarClosed;
            }
        };

        return {
            state: state
        }
    })
    .controller('TopNavCtrl', ['$scope', 'appState', function($scope, appState){
        $scope.state = appState.state;

        $scope.toggleSidebar = function(){
            return appState.state.toggleSidebar();
        }
    }])
    .controller('SidebarCtrl', ['$scope', 'appState', function($scope, appState){
        $scope.state = appState.state;
    }]);
