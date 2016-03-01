angular.module('buysubmit.controller', ['buysubmit.service'])
.controller('buysubmitCtrl', ['$scope', 'buysubmit', '$location', function ($scope, buysubmit, $location) {

    window.scrollTo(0, 0);

    RemoveStoredCustomerdata();
    RemoveStoredModulesData();
    RemoveStoredAddonsData();

}]);