angular.module('quotesubmit.controller', ['quotesubmit.service'])
.controller('quotesubmitCtrl', ['$scope', 'quotesubmit', '$location', function ($scope, quotesubmit, $location) {
    window.scrollTo(0, 0);

    RemoveStoredCustomerdata();
    RemoveStoredModulesData();
    RemoveStoredAddonsData();

}]);