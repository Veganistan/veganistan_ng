
angular.module('app.services', [])
    /**
     * Holds the currently chosen resturant
     */
    .factory('entryService', function(){
        return {
            set: function(_entry_){
                localStorage.setItem('entry', JSON.stringify(_entry_));
                console.log("now set to", localStorage.getItem('entry'));
            },
            get: function(){
                console.log("returning", JSON.parse(localStorage.getItem('entry')));
                return JSON.parse(localStorage.getItem('entry'));
            }
        }

    });