angular.module('confirmbuy.controller', ['confirmbuy.service'])
.controller('confirmbuyCtrl', ['$scope', 'confirmbuy', '$location', function ($scope, confirmbuy, $location) {

    window.scrollTo(0, 0);

    $scope.add = function () {
        $location.path('/Modules');        
    }
}]);