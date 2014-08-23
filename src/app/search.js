

function filterData(data, params){
    // filter by towns
    return data.data.filter(function(e){
       return e.town == "Stockholm";
    });
}

function SearchCtrl($scope, $http, entryService){
    // some default values

    var form = {
        towns: [
            {id: 0, name: "Stockholm"},
            {id: 1, name: "Malmö"},
            {id: 2, name: "Uppsala"}
        ],
        query: ""
    };

    $scope.form = form;

    // handle the submission of form
    $scope.submit = function(form){
        // filter the data upon submission since the data is already provided
        $scope.submittedForm = angular.copy(form);
        var submittedForm = form;
        $http.get('app/json/veganistan_data.json')
            .then(function(data){
                return filterData(data, submittedForm);
            })
            .then(function(data){
                console.log("later", data)
                // bind the results to the DOM
                $scope.result = data;

                // reset the form
                $scope.form = form;
                return data;
            });
    }

    $scope.setCurrentEntry = function(entry){
        entryService.set(entry);
    }
}


angular.module('app.search', ['app', 'app.services', 'ui.router', 'slugifier']);
