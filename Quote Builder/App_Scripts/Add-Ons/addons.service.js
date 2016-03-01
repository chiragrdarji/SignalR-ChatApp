angular.module('addons.service', [])
    .factory('addons', ['$http', function ($http) {

        var instance = {};

        return instance;
    }]);