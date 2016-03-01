var app = angular.module('app', [
    'ngRoute',
    'quote.controller',
    'signup.controller',
    'addons.controller',
    'confirmbuy.controller',
    'modules.controller',
    'summary.controller',
    'quotesubmit.controller',
    'buysubmit.controller'

]);


app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/Quote', {
            templateUrl: 'Quote.html',
            controller: 'quoteCtrl'
        }).
        when('/AccountSignUp', {
            caseInsensitiveMatch: true,
            templateUrl: 'AccountSignUp.html',
            controller: 'signupCtrl'
        }).
        when('/Modules', {
            caseInsensitiveMatch: true,
            templateUrl: 'Modules.html',
            controller: 'modulesCtrl'
        }).
        when('/Add-Ons', {
            caseInsensitiveMatch: true,
            templateUrl: 'Add-Ons.html',
            controller: 'addonsCtrl'
        }).
        when('/Summary', {
            caseInsensitiveMatch: true,
            templateUrl: 'Summary.html',
            controller: 'summaryCtrl'
        }).
        when('/quote_submit', {
            caseInsensitiveMatch: true,
            templateUrl: 'quote_submit.html',
            controller: 'quotesubmitCtrl'
        }).
        when('/buy_submit', {
            caseInsensitiveMatch: true,
            templateUrl: 'buy_submit.html',
            controller: 'buysubmitCtrl'
        }).
        otherwise({
            redirectTo: 'Quote'
        });


  }]);

app.directive('onLastRepeat', function () {
    return function (scope, element, attrs) {
        if (scope.$last) setTimeout(function () {
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
})

function convertToServerTimeZone() {

    //EST
    offset = -5.0

    clientDate = new Date();
    utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
    serverDate = new Date(utc + (3600000 * offset));
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (monthNames[(serverDate.getMonth())] + ' ' + serverDate.getDate() + ', ' + serverDate.getFullYear() + ' at ' + GetTime(serverDate));
}

function GetTime(currentTime) {

    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    if (minutes < 10)
        minutes = "0" + minutes;

    var suffix = "AM";
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    var current_time = hours + ":" + minutes + " " + suffix;
    return current_time;
}
function formatDollar(num) {
   
    var p = num.toFixed(2).split(".");
    var chars = p[0].split("").reverse();
    var newstr = '';
    var count = 0;
    for (x in chars) {
        count++;
        if (count % 3 == 1 && count != 1) {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    
    return newstr;
}
function GetMMDDYYDate(NewclientDate) {

    clientDate = new Date(NewclientDate);
    return ((clientDate.getMonth() + 1) + '/' + clientDate.getDate() + '/' + clientDate.getFullYear());
}
