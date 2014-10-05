(function(){

    angular.module('veganistan.search', ['veganistan', 'veganistan.services', 'ui.router', 'slugifier'])
        .controller('SearchCtrl', [SearchCtrl]);

    function filterData(data, params){
        console.log("filtering", data, params);
        // filter by towns
        return data.filter(function(e){

            return e.town == params.town.name;
        });
    }

    function SearchCtrl($scope, $http, entryService, apiData){

        // TODO: Fetch data from API upon app-opening

        // holds either the whole or a filtered data set of resturants etc
        var data = {}, filteredResult = {}, searchParams = {};
        console.log(apiData.entries);

        // do we have already filtered search results in localstorage?
        if(localStorage.getItem('filteredResult') === null){
            console.log("no filteredResult");
            data = apiData;
        }else{
            console.log("we have filtered in localstorage");
            filteredResult = JSON.parse(localStorage.getItem('filteredResult'));
            data.entries = filteredResult;
        }

        var form = {
            towns: apiData.town,
            query: ""
        };
        // data in the search form
        $scope.form = form;

        // actual search performed by the user
        if(localStorage.getItem('searchParams') === null){
            $scope.searchParams = {
                town: null,
                query: null
            };
        }else{
            $scope.searchParams = localStorage.getItem('searchParams');
        }

        // bind the resturants, etc to the scope
        $scope.result = data.entries;

        $scope.filterChange = function(){
            console.log("changed filter", $scope.searchParams);
            filteredResult = apiData.entries.filter(function(e){
                // TODO: e shouldn't be a list, it should be a value
                // TODO: This has to be changed in the API backend so that towns for an entry is never saved as a list
                // a resturant can't belong to many towns
                // NOTE: https://github.com/Veganistan/veganistan_scraper/issues/5
                return e.town[0].value.toLowerCase() == $scope.searchParams.town.value.toLowerCase();
            });
            // avoid using $scope.$watch, just bind new value to result

            localStorage.setItem('filteredResult', JSON.stringify(filteredResult));
            $scope.result = filteredResult;
        };

        // save the current entry to be shared between controllers
        $scope.setCurrentEntry = function(entry){
            entryService.set(entry);
        };

        /**
         * Reset $scope.result to the original data set and clear all filters
         */
        $scope.clearFilter = function(){
            $scope.searchParams = {};
            $scope.result = data.entries;
        };
    }
})();
