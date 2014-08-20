'use strict';

function AppRun($rootScope, $state, $stateParams){
    $rootScope = $state;
    $rootScope.$stateParams = $stateParams;
}

function AppConfig($stateProvider, $urlRouterProvider){
    // redirects
    $urlRouterProvider
        .otherwise('/');
}

angular.module('app', [
        'app.search',
        'ui.router'
    ])
    .run(['$rootScope', '$state', '$stateParams', AppRun])
    .config(['$stateProvider', '$urlRouterProvider', AppConfig]);


function AppSearchConfig($stateProvider, $urlRouterProvider){

    $stateProvider
        // the state string corresponds to the value inside a ``ui-sref=""``
        .state('search', {
            // empty url means this child state will become active
            // when its parent's url is navigated to. urls of child states are
            // automatically appended to the urls of their parents.
            url: '/',
            templateUrl: 'app/tpl/search.tpl.html',
            controller: function(){
                console.log("search contrller")
            }
        })
        .state('result', {
            abstract: true,
            url: '/result',
            templateUrl: 'app/tpl/result.tpl.html'

        })
        .state('result.map', {
            //parent: 'result',
            url: '/map',
            // NOTE:: Since this is not a top level state (it has a parent)
            // this template will be inserted into the ``ui-view``
            // of ``result.tpl.html``
            templateUrl: 'app/tpl/result.map.tpl.html',
            controller: function(){
                console.log("result map contrller")
            }
        })
        .state('result.list', {
            //parent: 'result',
            url: '/list',
            templateUrl: 'app/tpl/result.list.tpl.html',
            controller: function(){
                console.log("result list contrller")
            }
        })
}


angular.module('app.search', [
        'app',
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', AppSearchConfig]);