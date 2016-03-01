angular.module('quote.service', [])
    .factory('quote', ['$http', function ($http) {

        var instance = {};

        return instance;
    }]);