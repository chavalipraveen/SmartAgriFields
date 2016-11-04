angular.module('SmartAgriField.controllers.Main').controller('fieldController',fieldController);

fieldController.$inject = ['$scope','$location','$http','SharedState','$timeout'];

function fieldController($scope,$location,$http,SharedState,$timeout) {
    console.log($scope.fieldId);
    $scope.fieldId = $location.$$search.fieldId;
    $scope.fieldKey = $location.$$search.fieldKey;
    $scope.fieldName = $location.$$search.fieldName;
    $scope.automode = false;
    $scope.pumpbulb = false;
    $scope.$on('mobile-angular-ui.state.changed.automode', function(e, newVal, oldVal) {
        console.log('automode changed from: ' + oldVal + ' to: ' + newVal);
        if(oldVal != undefined) {
            var value = 0;
            if (newVal === true) {
                value = 0;
            } else {
                value = 2;
            }

            $http.delete('http://api.thingspeak.com/channels/178869/feeds.json?api_key=DIHETELUSEIUKCLT').then(function (response) {
                console.log('deleted config settings');
            });
            $timeout($http.get('http://api.thingspeak.com/update.json?api_key=DTGFZQY29W7140M8&field1=' + $scope.fieldId + '&field2=' + value).then(function (response) {
                console.log(response);
            }, function(response) {
                console.log(response);
            }), 15000);
        }
    });
    $scope.$on('mobile-angular-ui.state.changed.pumpbulb', function(e, newVal, oldVal) {
        console.log('pumpbulb changed from: ' + oldVal + ' to: ' + newVal);
        if(oldVal != undefined) {
            var value = 0;
            if (newVal === true) {
                value = 1;
            } else {
                value = 2;
            }


            $http.delete('http://api.thingspeak.com/channels/178869/feeds.json?api_key=DIHETELUSEIUKCLT').then(function (response) {
                console.log('deleted config settings');
            });
            $timeout($http.get('http://api.thingspeak.com/update.json?api_key=DTGFZQY29W7140M8&field1=' + $scope.fieldId + '&field2=' + value).then(function (response) {
                console.log(response);
            }, function (response) {
                console.log(response);
            }), 15000);
        }
    });
    var configUrl = "http://api.thingspeak.com/channels/178869/feeds.json?api_key=PM2SSSFJ9X4VWPFW";
    $http.get(configUrl).then(function(response) {
        angular.forEach(response.data.feeds, function(value, key) {
            var fieldId = value.field1;
            if(fieldId === $scope.fieldId) {
                if(value.field2 === "0") {
                    $scope.automode = true;
                    SharedState.set("automode", true);
                } else if(value.field2 === "1") {
                    $scope.pumpbulb = true;
                    SharedState.set("pumpbulb", true);
                }
            }
        });

        var url = "http://api.thingspeak.com/channels/" + $scope.fieldId + "/fields/2/last.json?api_key=" + $scope.fieldKey;
        $http.get(url).then(function(response) {
            $scope.updatedAt = response.data.created_at;
            $scope.moistureLevel = response.data.field2;
        });
    });
}