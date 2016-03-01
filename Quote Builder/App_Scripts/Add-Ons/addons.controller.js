angular.module('addons.controller', ['addons.service'])
.controller('addonsCtrl', ['$scope', 'addons', '$location', function ($scope, addons, $location) {

    window.scrollTo(0, 0);
    if (window.screen.width < 1345) {

        $scope.datatoggel = 'top';

    } else {
        $scope.datatoggel = 'right';


    }
    $scope.AddonsData = RetrieveStoredAddonsData();
    $scope.ModulesData = RetrieveStoredModulesData();

    $scope.add = function () {

        if ($scope.ModulesData[1].isChecked == false && $scope.AddonsData[4].isChecked == true) {
            alert("Mobile App cannot be purchased without the Inspection module.");
        }
        else if ($scope.ModulesData[0].isChecked == false && $scope.AddonsData[1].childElements[0].isChecked == true) {
            alert("Incident Public Web Form cannot be purchased without the Incidents Module.");
        }
        else if ($scope.ModulesData[3].isChecked == false && $scope.AddonsData[1].childElements[2].isChecked == true) {
            alert("Observation Public Web Form cannot be purchased without the Observations Module.");
        }
        else if ($scope.ModulesData[0].isChecked == false && $scope.AddonsData[2].childElements[3].isChecked == true) {
            alert("Hours interface cannot be purchased without the Incidents Module.");
        }
        else if ($scope.ModulesData[0].isChecked == false && $scope.AddonsData[2].childElements[4].isChecked == true) {
            alert("Incident interface cannot be purchased without the Incidents Module.");
        }
        else if ($scope.ModulesData[2].isChecked == false && $scope.AddonsData[2].childElements[5].isChecked == true) {
            alert("Training interface cannot be purchased without the Training Module.");
        }
        else {
            StoreAddonsData($scope.AddonsData);
            
            $location.path('/Summary');
        }
    }

    $scope.back = function () {
        $location.path('/Modules');
    }

    $scope.popup = function (id) {
        
        $('#myModal').modal('show');

        $scope.childElementObj = $scope.AddonsData[id].childElements;
        $scope.title = $scope.AddonsData[id].childElementTitle;
        $scope.parentID = id;
        $scope.description = $scope.AddonsData[id].description;
        $scope.subTitle = $scope.AddonsData[id].childElementSubTitle;
        $scope.buttontype = $scope.AddonsData[id].childElementbutton;
        if (id !== 3)
        { $scope.modelZise = "modal-sm"; }
        else { $scope.modelZise = null; }
    }

    $scope.addAddOns = function () {


        StoreAddonsData($scope.AddonsData);
        
        $('#myModal').modal('hide');
    }

    $scope.$on('onRepeatLast', function (scope, element, attrs) {
        $('[data-toggle="tooltip"]').tooltip();

        if(window.screen.width < 1345 )
        {
            
            $scope.datatoggel = 'top';
            
        }else
        {
            $scope.datatoggel = 'right';
           
            
        }

    });
}]);