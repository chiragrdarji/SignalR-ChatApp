angular.module('summary.service', [])
    .factory('summary', ['$http', function ($http) {

        var instance = {};

        return instance;
    }]);