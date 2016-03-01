angular.module('signup.controller', ['signup.service'])
.controller('signupCtrl', ['$scope', 'signup', '$location', function ($scope, signup, $location) {

    window.scrollTo(0, 0);

    CustomerData = RetrieveStoredCustomerdata();
    $scope.mainurl = window.location.origin;
    $scope.CustomerData = {
        firstname: CustomerData.firstname,
        lastname: CustomerData.lastname,
        title: CustomerData.title,
        company: CustomerData.company,
        email: CustomerData.email,
        phone: CustomerData.phone,
        numberofusers: CustomerData.numberofusers,
        address: CustomerData.address,
        city: CustomerData.city,
        state: CustomerData.state,
        zip: CustomerData.zip,
        country: CustomerData.country,
        billingcycle: CustomerData.billingcycle,

    }

    

    $scope.add = function () {

        var flag = $("#signupform").valid();

        if (flag == true || flag == 'true') {

            if ($scope.CustomerData.numberofusers == '10 Plus') {
                alert('For more than 10 users please contact an IndustrySafe Sales Representative');
                $scope.CustomerData.numberofusers = "";
            }
            else
            {
                CustomerData = RetrieveStoredCustomerdata();
                CustomerData =
                {
                    firstname: $scope.CustomerData.firstname,
                    lastname: $scope.CustomerData.lastname,
                    title: $scope.CustomerData.title,
                    company: $scope.CustomerData.company,
                    email: $scope.CustomerData.email,
                    phone: $scope.CustomerData.phone,
                    numberofusers: $scope.CustomerData.numberofusers,
                    address: $scope.CustomerData.address,
                    city: $scope.CustomerData.city,
                    state: $scope.CustomerData.state,
                    zip: $scope.CustomerData.zip,
                    country: $scope.CustomerData.country,
                    billingcycle: $scope.CustomerData.billingcycle,
                    isquote: false,
                    SubmittedOn: new Date()
                }

                StoreCustomerdata(CustomerData);
                $("body").addClass('loading');
                $("#buyform").submit();
                //$location.path('/Modules');
            }
           
        }
    };
}]);