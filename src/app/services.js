
angular.module('app.services', [])
    /**
     * Holds the currently chosen resturant
     */
    .factory('entryService', function(){
        return {
            set: function(_entry_){
                console.log("setting", _entry_);
                this.entry = _entry_;
                console.log("now set to", this.entry);
                return;
            },
            get: function(){
                console.log("returning", this.entry);
                return this.entry;
            }
        }

    });