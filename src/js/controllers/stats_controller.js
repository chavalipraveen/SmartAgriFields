angular.module('SmartAgriField.controllers.Main').controller('statsController',statsController);

statsController.$inject = ['$scope','$rootScope','$http'];

function statsController($scope,$rootScope,$http) {
    console.log($rootScope.scrollItems);
    // $scope.labels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    $scope.labels = [];
    $scope.data = [];
    $scope.series = [];
    $scope.chartType = 'line';

    $scope.setChartType = function(value) {
        $scope.chartType = value;
    };

    angular.forEach($rootScope.scrollItems, function(value, key) {
        $scope.fieldId = value.id;
        $scope.fieldName = value.name;
        $scope.fieldKey = value.key;
        $scope.series.push(value.name);
        var url = "http://api.thingspeak.com/channels/" + $scope.fieldId + "/feeds.json?api_key=" + $scope.fieldKey;
        $http.get(url).then(function(response) {
            $scope.feeds = response.data.feeds;
            var dataMap = [];
            angular.forEach($scope.feeds, function(value, key) {
                if(key % 10 == 0) {
                    dataMap.push(value.field2);
                    $scope.labels.push(value.created_at);
                }
            });

            $scope.data.push(dataMap);
        });
    });
    console.log($scope.data);
    console.log($scope.labels);
    console.log($scope.series);
}