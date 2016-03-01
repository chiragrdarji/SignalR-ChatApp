angular.module('summary.controller', ['summary.service'])
.controller('summaryCtrl', ['$scope', 'summary', '$location', function ($scope, summary, $location) {

       window.scrollTo(0, 0);

    $scope.CustomerData = RetrieveStoredCustomerdata();
    $scope.ModulesData = RetrieveStoredModulesData();
    $scope.AddonsData = RetrieveStoredAddonsData();

    if ($scope.CustomerData.isquote) {
        $scope.summaryType = 'QUOTE SUMMARY';
    } else {
        $scope.summaryType = 'BUY SUMMARY';
    }

    // On-Going Fees  -- Start

    $scope.totalUsers = $scope.CustomerData.numberofusers;
    $scope.OnGoingFeesObjects = [];
    $scope.MonthlyTotal = 0;
    $scope.AnnualTotal = 0;

    $scope.StandardConfigurationHours = 0;
    $scope.StandardConfigurationAmount = 0;

    $scope.adminTraining = 0;
    $scope.Webinars = 0;
    $scope.EndUserTraining = 0;

    $scope.trainingOnSite = 0;


    // Always Display - Start
    var OnGoingFeesObject =
    {
        name: AlwaysHomeBase.name,
        cost: ($scope.CustomerData.billingcycle == 'Quarterly' ? (AlwaysHomeBase.monthlyFee * 3) : $scope.CustomerData.billingcycle == 'Annually' ? (AlwaysHomeBase.monthlyFee * 12) : AlwaysHomeBase.monthlyFee),
        users: $scope.totalUsers,
        total: (ConverttoInt($scope.totalUsers) * ($scope.CustomerData.billingcycle == 'Quarterly' ? (AlwaysHomeBase.monthlyFee * 3) : $scope.CustomerData.billingcycle == 'Annually' ? (AlwaysHomeBase.monthlyFee * 12) : AlwaysHomeBase.monthlyFee))
    }

    $scope.MonthlyTotal = (ConverttoInt($scope.totalUsers) * AlwaysHomeBase.monthlyFee);
    $scope.OnGoingFeesObjects.push(OnGoingFeesObject);

    $scope.StandardConfigurationHours = AlwaysHomeBase.hoursConfiguraitonAssistance;

    $scope.adminTraining = AlwaysHomeBase.hoursEHSAdminTraining;
    $scope.Webinars = AlwaysHomeBase.hoursEndUserWebinars;
    $scope.EndUserTraining = AlwaysHomeBase.hoursEndUserTraining;

    // Always Display - End

    $.each($scope.ModulesData, function (key, value) {

        if (value.isChecked == true) {

            // Add Standard Configuration
            AddStandardConfiguration(value);
            // End Standard Configuration

            var cost = ConverttoInt(value.monthlyFee);
            var users = ConverttoInt($scope.totalUsers);

            if ($scope.CustomerData.billingcycle == 'Quarterly') {
                OnGoingFeesObject =
                {
                    name: value.name,
                    cost: formatDollar(value.monthlyFee * 3),
                    users: $scope.totalUsers,
                    total: formatDollar(((cost * 3) * users))
                }
            }
            else if ($scope.CustomerData.billingcycle == 'Annually') {
                OnGoingFeesObject =
                {

                    name: value.name,
                    cost: formatDollar(value.monthlyFee * 12),
                    users: $scope.totalUsers,
                    total: formatDollar(((cost * 12) * users))
                }
            }
            else {
                OnGoingFeesObject =
                  {
                      name: value.name,
                      cost: formatDollar(value.monthlyFee),
                      users: $scope.totalUsers,
                      total: formatDollar((cost * users))
                  }
            }

            $scope.OnGoingFeesObjects.push(OnGoingFeesObject);
            $scope.MonthlyTotal = $scope.MonthlyTotal + (cost * users);
        }

    });

    $.each($scope.AddonsData, function (key, value) {

        if (value.isChecked == true) {

            if (value.monthlyFee != '') {

                if (value.perUserFees == 'Yes') {

                    // Add Standard Configuration
                    AddStandardConfiguration(value);
                    // End Standard Configuration


                    var cost = ConverttoInt(value.monthlyFee);
                    var users = ConverttoInt($scope.totalUsers);



                    if ($scope.CustomerData.billingcycle == 'Quarterly') {
                        OnGoingFeesObject =
                    {
                        name: value.name,
                        cost: formatDollar(value.monthlyFee * 3),
                        users: $scope.totalUsers,
                        total: formatDollar(((cost * 3) * users))
                    }
                    }
                    else if ($scope.CustomerData.billingcycle == 'Annually') {
                        OnGoingFeesObject =
                     {
                         name: value.name,
                         cost: formatDollar(value.monthlyFee * 12),
                         users: $scope.totalUsers,
                         total: formatDollar(((cost * 12) * users))
                     }
                    }
                    else {

                        OnGoingFeesObject =
                     {
                         name: value.name,
                         cost: formatDollar(value.monthlyFee),
                         users: $scope.totalUsers,
                         total: formatDollar((cost * users))
                     }

                    }
                    $scope.OnGoingFeesObjects.push(OnGoingFeesObject);
                    $scope.MonthlyTotal = $scope.MonthlyTotal + (cost * users);
                }
                else {

                    // Add Standard Configuration
                    AddStandardConfiguration(value);
                    // End Standard Configuration



                    if ($scope.CustomerData.billingcycle == 'Quarterly') {
                        OnGoingFeesObject =
                     {
                         name: value.name,
                         cost: formatDollar(value.monthlyFee * 3),
                         users: "N/A",
                         total: formatDollar(value.monthlyFee * 3)
                     }
                    }
                    else if ($scope.CustomerData.billingcycle == 'Annually') {
                        OnGoingFeesObject =
                    {
                        name: value.name,
                        cost: formatDollar(value.monthlyFee * 12),
                        users: "N/A",
                        total: formatDollar(value.monthlyFee * 12)
                    }
                    }
                    else {
                        OnGoingFeesObject =
                     {
                         name: value.name,
                         cost: formatDollar(value.monthlyFee),
                         users: "N/A",
                         total: formatDollar(value.monthlyFee)
                     }
                    }

                    $scope.OnGoingFeesObjects.push(OnGoingFeesObject);
                    $scope.MonthlyTotal = $scope.MonthlyTotal + (ConverttoInt(value.monthlyFee));

                }
            }

        }
        else {
            $.each(value.childElements, function (childkey, childvalue) {

                if (childvalue.isChecked == true) {
                    if (childvalue.monthlyFee != '') {
                        if (childvalue.perUserFees == 'Yes') {

                            // Add Standard Configuration
                            AddStandardConfiguration(childvalue);
                            // End Standard Configuration


                            var cost = ConverttoInt(childvalue.monthlyFee);
                            var users = ConverttoInt($scope.totalUsers);



                            if ($scope.CustomerData.billingcycle == 'Quarterly') {
                                OnGoingFeesObject =
                            {
                                name: childvalue.name,
                                cost: formatDollar(childvalue.monthlyFee * 3),
                                users: $scope.totalUsers,
                                total: formatDollar(((cost * 3) * users))
                            }
                            }
                            else if ($scope.CustomerData.billingcycle == 'Annually') {
                                OnGoingFeesObject =
                            {
                                name: childvalue.name,
                                cost: formatDollar(childvalue.monthlyFee * 12),
                                users: $scope.totalUsers,
                                total: formatDollar(((cost * 12) * users))
                            }
                            }
                            else {
                                OnGoingFeesObject =
                            {
                                name: childvalue.name,
                                cost: formatDollar(childvalue.monthlyFee),
                                users: $scope.totalUsers,
                                total: formatDollar((cost * users))
                            }
                            }


                            $scope.OnGoingFeesObjects.push(OnGoingFeesObject);
                            $scope.MonthlyTotal = $scope.MonthlyTotal + (cost * users);
                        }
                        else {
                            // Add Standard Configuration
                            AddStandardConfiguration(childvalue);
                            // End Standard Configuration

                            if ($scope.CustomerData.billingcycle == 'Quarterly') {
                                OnGoingFeesObject =
                            {
                                name: childvalue.name,
                                cost: formatDollar(childvalue.monthlyFee * 3),
                                users: "N/A",
                                total: formatDollar(childvalue.monthlyFee * 3)
                            }

                            }
                            else if ($scope.CustomerData.billingcycle == 'Annually') {
                                OnGoingFeesObject =
                             {
                                 name: childvalue.name,
                                 cost: formatDollar(childvalue.monthlyFee * 12),
                                 users: "N/A",
                                 total: formatDollar(childvalue.monthlyFee * 12)
                             }

                            } else {
                                OnGoingFeesObject =
                            {
                                name: childvalue.name,
                                cost: formatDollar(childvalue.monthlyFee),
                                users: "N/A",
                                total: formatDollar(childvalue.monthlyFee)
                            }
                            }

                            $scope.OnGoingFeesObjects.push(OnGoingFeesObject);
                            $scope.MonthlyTotal = $scope.MonthlyTotal + (ConverttoInt(childvalue.monthlyFee));

                        }
                    }
                }



            });
        }

    });

    $scope.AnnualTotal = formatDollar($scope.MonthlyTotal * 12);

    //Start Total [Billing Cycle] Fees
    if (CustomerData.isquote == false) {
        if ($scope.CustomerData.billingcycle == 'Quarterly') {
            $scope.TotalBillingCycleFees = formatDollar($scope.MonthlyTotal * 3);
            $scope.billingcyclename = 'Quarterly';
        }
        else if ($scope.CustomerData.billingcycle == 'Annually') {
            $scope.TotalBillingCycleFees = formatDollar($scope.MonthlyTotal * 12);
            $scope.billingcyclename = 'Annual';
        } else {
            $scope.TotalBillingCycleFees = formatDollar($scope.MonthlyTotal);
            $scope.billingcyclename = 'Monthly';
        }
    }

    //End Total [Billing Cycle] Fees

    // On-Going Fees  -- End

    //Start code one time fee

    $scope.OneTimetotalUsers = $scope.CustomerData.numberofusers;
    $scope.OneTimeFeesObjects = [];
    $scope.OneTimeTotal = 0;
    $scope.OneTimeAnnualTotal = 0;

    // Always Display - Start
    
    if (!$scope.CustomerData.isquote) {

        var OneTimeFeesObject =
            {
                name: AlwaysSiteSetUpFee.name,
                cost: AlwaysSiteSetUpFee.onetimeFee,
                users: $scope.totalUsers,
                total: (ConverttoInt($scope.totalUsers) * AlwaysSiteSetUpFee.onetimeFee)
            }

        $scope.OneTimeTotal = (ConverttoInt($scope.totalUsers) * AlwaysSiteSetUpFee.onetimeFee);
        $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
    }

    


    $.each($scope.AddonsData, function (key, value) {

        if (value.isChecked == true) {

            if (value.oneTimeFee != '') {

                if (value.perUserFees == 'Yes') {

                    // Add Standard Configuration
                    AddStandardConfiguration(value);
                    // End Standard Configuration

                    var cost = ConverttoInt(value.oneTimeFee);
                    var users = ConverttoInt($scope.totalUsers);

                    OneTimeFeesObject =
                    {
                        name: value.name,
                        cost: formatDollar(value.oneTimeFee),
                        users: $scope.totalUsers,
                        total: formatDollar((cost * users))
                    }

                    $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                    $scope.OneTimeTotal = $scope.OneTimeTotal + (cost * users);
                }
                else {
                    // Add Standard Configuration
                    AddStandardConfiguration(value);
                    // End Standard Configuration


                    OneTimeFeesObject =
                        {
                            name: value.name,
                            cost: formatDollar(value.oneTimeFee),
                            users: "N/A",
                            total: formatDollar(value.oneTimeFee)
                        }


                    $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                    $scope.OneTimeTotal = $scope.OneTimeTotal + (ConverttoInt(value.oneTimeFee));

                }
            }
        }
        else {
            $.each(value.childElements, function (childkey, childvalue) {

                if (childvalue.isChecked == true) {

                    if (childvalue.oneTimeFee != '') {
                        if (childvalue.perUserFees == 'Yes') {
                            // Add Standard Configuration
                            AddStandardConfiguration(childvalue);
                            // End Standard Configuration

                            var cost = ConverttoInt(childvalue.oneTimeFee);
                            var users = ConverttoInt($scope.totalUsers);

                            OneTimeFeesObject =
                                {
                                    name: childvalue.name,
                                    cost: formatDollar(childvalue.oneTimeFee),
                                    users: $scope.totalUsers,
                                    total: formatDollar((cost * users))
                                }

                            $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                            $scope.OneTimeTotal = $scope.OneTimeTotal + (cost * users);
                        }
                        else {

                            if (childvalue.oneTimeFeeCategory != 'Interface Setup') {
                                // Add Standard Configuration
                                AddStandardConfiguration(childvalue);
                                // End Standard Configuration
                            }

                            if (childvalue.name == 'EHS Admin Training On-Site') {

                                OneTimeFeesObject =
                                    {
                                        name: childvalue.name + " - " + $scope.adminTraining + " Hours",
                                        cost: formatDollar(childvalue.oneTimeFee + ($scope.adminTraining * EHSAdminTrainingOnSiteFees)),
                                        users: "N/A",
                                        total: formatDollar(childvalue.oneTimeFee + ($scope.adminTraining * EHSAdminTrainingOnSiteFees))
                                    }

                                $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                                $scope.OneTimeTotal = $scope.OneTimeTotal + (ConverttoInt(childvalue.oneTimeFee + ($scope.adminTraining * EHSAdminTrainingOnSiteFees)));

                            }
                            else if (childvalue.name == 'End User Training On-Site') {

                                OneTimeFeesObject =
                                    {
                                        name: childvalue.name + " - " + $scope.EndUserTraining + " Hours",
                                        cost: formatDollar(childvalue.oneTimeFee + ($scope.EndUserTraining * EndUserTrainingOnSiteFees)),
                                        users: "N/A",
                                        total: formatDollar(childvalue.oneTimeFee + ($scope.EndUserTraining * EndUserTrainingOnSiteFees))
                                    }

                                $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                                $scope.OneTimeTotal = $scope.OneTimeTotal + (ConverttoInt(childvalue.oneTimeFee + ($scope.EndUserTraining * EndUserTrainingOnSiteFees)));
                            }
                            else {

                                OneTimeFeesObject =
                                    {
                                        name: childvalue.name,
                                        cost: formatDollar(childvalue.oneTimeFee),
                                        users: "N/A",
                                        total: formatDollar(childvalue.oneTimeFee)
                                    }

                                $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                                $scope.OneTimeTotal = $scope.OneTimeTotal + (ConverttoInt(childvalue.oneTimeFee));

                            }



                        }
                    }
                    else {

                        if (childvalue.name == 'EHS Admin Training Via the Web') {

                            AddStandardConfiguration(childvalue);

                            OneTimeFeesObject =
                            {
                                name: childvalue.name + " - " + $scope.adminTraining + " Hours",
                                cost: formatDollar(($scope.adminTraining * (ConverttoInt(childvalue.hourlyFees)))),
                                users: "N/A",
                                total: formatDollar(($scope.adminTraining * (ConverttoInt(childvalue.hourlyFees))))
                            }

                            $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                            $scope.OneTimeTotal = $scope.OneTimeTotal + (($scope.adminTraining * (ConverttoInt(childvalue.hourlyFees))));
                        }

                        if (childvalue.name == 'End-User Webinars') {

                            AddStandardConfiguration(childvalue);
                            OneTimeFeesObject =
                            {
                                
                                name: childvalue.name + " - " + $scope.Webinars + " Hours",
                                cost: formatDollar(((ConverttoInt(childvalue.hourlyFees)) * $scope.Webinars) * EndUserWebinarsPreparationHour),
                                users: "N/A",
                                total: formatDollar((ConverttoInt(childvalue.hourlyFees)) * $scope.Webinars * EndUserWebinarsPreparationHour)
                            }
                            $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
                            $scope.OneTimeTotal = $scope.OneTimeTotal + (ConverttoInt(childvalue.hourlyFees) * $scope.Webinars * EndUserWebinarsPreparationHour);
                        }
                    }
                }



            });
        }

    });


    //Standard Configuration [Total Standard Configuration Hours] --- Start
    OneTimeFeesObject =
     {
         name: 'Standard Configuration- ' + $scope.StandardConfigurationHours + ' Hours',
         cost: formatDollar($scope.StandardConfigurationHours * StandardConfigurationFees),
         users: "N/A",
         total: formatDollar($scope.StandardConfigurationHours * StandardConfigurationFees)
     }

    $scope.OneTimeFeesObjects.push(OneTimeFeesObject);
    $scope.OneTimeTotal = formatDollar($scope.OneTimeTotal + ($scope.StandardConfigurationHours * StandardConfigurationFees));

    //Standard Configuration [Total Standard Configuration Hours] --- End

    //End code one time fee


    // Start mail content

    $scope.mailBodyContentObject = [];

    $.each($scope.ModulesData, function (key, value) {

        if (value.isChecked == true) {
            var tempmailBodyContentObject =
              {
                  name: value.name,
                  desc: value.longdescription
              }
            $scope.mailBodyContentObject.push(tempmailBodyContentObject);
        }
    });

    $scope.mailBodyContentannualObject = [];

    $.each($scope.AddonsData, function (key, value) {

        if (value.isChecked == true) {

            if (value.name == 'EHS Admin Training Via the Web') {

                var tempmailBodyContentObject =
                  {
                      name: value.name,
                      desc: ReplaceString(value.longdescription, " X ", ' ' + $scope.adminTraining + ' ')
                  }
            }
            else if (value.name == 'End-User Webinars') {

                var tempmailBodyContentObject =
                  {
                      name: value.name,
                      desc: ReplaceString(value.longdescription, " X ", ' ' + $scope.Webinars + ' ')
                  }
            }
            else if (value.name == 'EHS Admin Training On-Site') {

                var tempmailBodyContentObject =
                   {
                       name: value.name,
                       desc: ReplaceString(value.longdescription, " X ", ' ' + $scope.adminTraining + ' ')
                   }
            }
            else if (value.name == 'End User Training On-Site') {

                var tempmailBodyContentObject =
                   {
                       name: value.name,
                       desc: ReplaceString(value.longdescription, " X ", ' ' + $scope.EndUserTraining + ' ')
                   }
            }
            else {

                var tempmailBodyContentObject =
                 {
                     name: value.name,
                     desc: value.longdescription
                 }
            }
            $scope.mailBodyContentannualObject.push(tempmailBodyContentObject);
        }
        else {
            $.each(value.childElements, function (childkey, childvalue) {


                if (childvalue.isChecked == true) {

                    if (childvalue.name == 'EHS Admin Training Via the Web') {
                        var tempmailBodyContentObject =
                          {
                              name: childvalue.name,
                              desc: ReplaceString(childvalue.longdescription, " X ", ' ' + $scope.adminTraining + ' ')
                          }
                    }
                    else if (childvalue.name == 'End-User Webinars') {
                        var tempmailBodyContentObject =
                          {
                              name: childvalue.name,
                              desc: ReplaceString(childvalue.longdescription, " X ", ' ' + $scope.Webinars + ' ')
                          }
                    }
                    else if (childvalue.name == 'EHS Admin Training On-Site') {

                        var tempmailBodyContentObject =
                           {
                               name: childvalue.name,
                               desc: ReplaceString(childvalue.longdescription, " X ", ' ' + $scope.adminTraining + ' ')
                           }
                    }
                    else if (childvalue.name == 'End User Training On-Site') {

                        var tempmailBodyContentObject =
                           {
                               name: childvalue.name,
                               desc: ReplaceString(childvalue.longdescription, " X ", ' ' + $scope.EndUserTraining + ' ')
                           }
                    } else {

                        var tempmailBodyContentObject =
                         {
                             name: childvalue.name,
                             desc: childvalue.longdescription
                         }
                    }

                    $scope.mailBodyContentannualObject.push(tempmailBodyContentObject);
                }
            });
        }
    });

    $scope.ESTTime = convertToServerTimeZone();

    // End mail content

    $scope.add = function () {

        var formail =
        {
            subject: '',
            email: '',
            body: '',
            bcc: ''
        }

        if ($scope.CustomerData.isquote) {
            formail.subject = 'IndustrySafe Safety Software Quote';
            formail.bcc = 'sales@industrysafe.com';

        } else {
            formail.subject = 'IndustrySafe Safety Software Order Confirmation';
            formail.bcc = 'sales@industrysafe.com,trait@industrysafe.com';
        }

        formail.email = $scope.CustomerData.email;
        formail.body = $("#idmailcontent").html();

        $.ajaxSetup({ async: false });
        $("body").addClass('loading');
        jQuery.ajax({
            url: "/MailSend.aspx/SendmailAPI",
            data: JSON.stringify(formail),
            dataType: "json",
            type: "POST",
            contentType: "application/json; chartset=utf-8",
            success: function (data) {
            }
        });
        $("body").removeClass('loading');
        $.ajaxSetup({ async: true });




        if ($scope.CustomerData.isquote) {


            $location.path('/quote_submit');
        }
        else {

            var buyTextFile = '0\n';
            buyTextFile += $scope.CustomerData.company + '\n';
            buyTextFile += $scope.CustomerData.firstname + '\n';
            buyTextFile += $scope.CustomerData.lastname + '\n';
            buyTextFile += $scope.CustomerData.email + '\n';
            buyTextFile += $scope.CustomerData.firstname + ' ' + $scope.CustomerData.lastname + '\n';
            buyTextFile += $scope.CustomerData.email + '\n';
            buyTextFile += $scope.CustomerData.title + '\n';
            buyTextFile += $scope.CustomerData.address + '\n';
            buyTextFile += $scope.CustomerData.city + '\n';
            buyTextFile += $scope.CustomerData.state + '\n';
            buyTextFile += $scope.CustomerData.zip + '\n';
            buyTextFile += $scope.CustomerData.country + '\n';
            buyTextFile += ($scope.CustomerData.billingcycle == 'Monthly' ? '12' : $scope.CustomerData.billingcycle == 'Quarterly' ? '4' : '1') + '\n';
            buyTextFile += '2' + '\n';
            buyTextFile += '30' + '\n';
            buyTextFile += GetMMDDYYDate($scope.CustomerData.SubmittedOn) + '\n';
            buyTextFile += GetMMDDYYDate($scope.CustomerData.SubmittedOn) + '\n';
            buyTextFile += $scope.CustomerData.numberofusers + '\n';
            buyTextFile += '0' + '\n';
            buyTextFile += '0' + '\n';
            buyTextFile += '0' + '\n';
            buyTextFile += ($scope.ModulesData[5].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.ModulesData[3].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += '2' + '\n';
            buyTextFile += '0' + '\n';
            buyTextFile += ($scope.AddonsData[0].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += '2' + '\n';
            buyTextFile += ($scope.ModulesData[6].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[2].childElements[0].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += '2' + '\n';
            buyTextFile += ($scope.AddonsData[2].childElements[3].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[1].childElements[0].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[1].childElements[1].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[1].childElements[2].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.ModulesData[0].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.ModulesData[2].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[4].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.ModulesData[1].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += '2' + '\n';
            buyTextFile += '2' + '\n';
            buyTextFile += ($scope.ModulesData[4].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[2].childElements[2].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[2].childElements[4].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[2].childElements[1].isChecked == true ? '0' : '2') + '\n';
            buyTextFile += ($scope.AddonsData[2].childElements[5].isChecked == true ? '0' : '2') + '\n';

            $.ajaxSetup({ async: false });
            $("body").addClass('loading');
            jQuery.ajax({
               
                url: "/BuyTextFile.aspx/generateTextFileForBuy",
                data: JSON.stringify({ 'data': buyTextFile }),
                dataType: "json",
                type: "POST",
                contentType: "application/json; chartset=utf-8",
                success: function (data) {

                }
            });
            $("body").removeClass('loading');
            $.ajaxSetup({ async: true });


            $location.path('/buy_submit');
        }


    }

    $scope.back = function () {
        $location.path('/Add-Ons');
    }


    function AddStandardConfiguration(value) {

        // Add Standard Configuration

        if (value.hoursConfiguraitonAssistance != '') {
            $scope.StandardConfigurationHours = $scope.StandardConfigurationHours + value.hoursConfiguraitonAssistance;
        }
        if (value.hoursEHSAdminTraining != typeof (undefined) && value.hoursEHSAdminTraining != '') {
            $scope.adminTraining = $scope.adminTraining + value.hoursEHSAdminTraining;
        }

        if (value.hoursEndUserTraining != typeof (undefined) && value.hoursEndUserTraining != '') {

            $scope.EndUserTraining = $scope.EndUserTraining + value.hoursEndUserTraining;
        }
        if (value.hoursEndUserWebinars != typeof (undefined) && value.hoursEndUserWebinars != '') {

            $scope.Webinars = $scope.Webinars + value.hoursEndUserWebinars;
        }

        // End Standard Configuration


    }

}]);