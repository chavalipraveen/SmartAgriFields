angular.module('SmartAgriField.controllers.Main', ['chart.js'])

.controller('MainController', function($scope,$rootScope){
        $rootScope.scrollItems = [];
        $rootScope.scrollItems.push({'name':'Rice Field','id':178350,'key':'EAA0TN54M6W0K9UP','type':'rice','image':'images/rice.jpg'});
        $rootScope.scrollItems.push({'name':'Toor Dal Field','id':178830,'key':'BMOHIE1IHXP9EG8T','type':'dal','image':'images/dal.jpg'});
        $rootScope.scrollItems.push({'name':'Wheat Field','id':178831,'key':'6OT93AMNX80B12RZ','type':'wheat','image':'images/wheat.jpg'});
});