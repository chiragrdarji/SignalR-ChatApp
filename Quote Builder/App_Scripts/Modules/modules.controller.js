angular.module('modules.controller', ['modules.service'])
.controller('modulesCtrl', ['$scope', 'modules', '$location', function ($scope, modules, $location) {
    if (window.screen.width < 1345) {

        $scope.datatoggel = 'top';

    } else {
        $scope.datatoggel = 'right';


    }
    window.scrollTo(0, 0);
    
    $scope.ModulesData = RetrieveStoredModulesData();
    
    $scope.add = function () {

       

        var flagincidents = false, flagClaims = false;
        $.each($scope.ModulesData, function (a, e) {
           

            if (e.name.toLowerCase() == 'incidents' && e.isChecked == true) {
                flagincidents = true;
            }
            if (e.name.toLowerCase() == 'claims' && e.isChecked == true) {
                flagClaims = true;
            }

        });

        
        if (flagincidents == false && flagClaims == true) {
            alert("Claim module cannot be purchased without the Incident module.");
        }
        else {
            StoreModulesData($scope.ModulesData);
            $location.path('/Add-Ons');
        }


    }

    $scope.back = function () {

        CustomerData = RetrieveStoredCustomerdata();

        if (CustomerData.isquote) {
            $location.path('/Quote');
        } else {
            $location.path('/AccountSignUp');
        }


    }

    $scope.$on('onRepeatLast', function (scope, element, attrs) {
        $('[data-toggle="tooltip"]').tooltip();

        if (window.screen.width < 1345) {

            $scope.datatoggel = 'top';

        } else {
            $scope.datatoggel = 'right';


        }
    });

   



}]);