(function(){

    angular.module('veganistan.services', [])
    /**
     * Holds the currently chosen resturant
     */
        .factory('entryService', function(){
            return {
                set: function(_entry_){
                    localStorage.setItem('currentEntry', JSON.stringify(_entry_));
                    console.log("now set to", localStorage.getItem('currentEntry'));
                },
                get: function(){
                    console.log("returning", JSON.parse(localStorage.getItem('currentEntry')));
                    return JSON.parse(localStorage.getItem('currentEntry'));
                }
            }
        })

    function SaveToLocalStorage(result){
        localStorage.setItem('entries', JSON.stringify(result.data));
        res = localStorage.getItem('entries');
        console.log("saved to localstorage");
        return res;
    }


    /*
     .factory('entryStorage', function($http){
     var factory = {};

     factory.clearIfNewExists = function(){
     // TODO: Call the API for the latest entry
     // Clear if newer data exists at the API
     localStorage.removeItem('entries');
     console.log("cleared entries from localstorage");
     return factory;
     }

     factory.fetch = function(){

     // do we have a locally stored cache?
     if(localStorage.getItem('entries') === null){

     entries = $http.get('/api/entries.json')
     .then(SaveToLocalStorage)
     .then(function(result){
     return result;
     });
     console.log("fetched", entries);
     return factory;
     }
     entries = JSON.parse(localStorage.getItem('entries'));
     console.log("fetched and returning", entries);
     this.entries = entries;
     return factory;
     }
     return factory;
     })
     */
    ;

})();
