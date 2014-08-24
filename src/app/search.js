

function filterData(data, params){
    console.log("filtering", data, params);
    // filter by towns
    return data.filter(function(e){

       return e.town == params.town.name;
    });
}

function SearchCtrl($scope, $http, entryService, apiData){

    // TODO: Fetch data from API upon app-opening

    console.log(apiData.entries);

    console.log(apiData.town);
    var form = {
        towns: apiData.town,
        query: ""
    };

    $scope.form = form;
    $scope.searchParams = {
        town: '',
        query: ''
    }

    $scope.result = apiData.entries;
    // handle the submission of form
    $scope.submit = function(form){
        console.log($scope.searchParams);
        // filter the data upon submission since the data is already provided
        $scope.submittedForm = angular.copy(form);
        console.log("submitting");
    }

    $scope.setCurrentEntry = function(entry){
        entryService.set(entry);
    }
}


angular.module('app.search', ['app', 'app.services', 'ui.router', 'slugifier']);
