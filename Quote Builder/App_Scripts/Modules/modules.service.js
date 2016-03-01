angular.module('modules.service', [])
    .factory('modules', ['$http', function ($http) {

        var instance = {};
        
        return instance;
    }]);