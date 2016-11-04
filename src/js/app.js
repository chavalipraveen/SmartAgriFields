angular.module('SmartAgriField', [
  'ngRoute',
  'mobile-angular-ui',
  'SmartAgriField.controllers.Main'
])

.config(function($routeProvider) {
        $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
        $routeProvider.when('/settings', {templateUrl:'settings.html',  reloadOnSearch: false});
        $routeProvider.when('/fields', {templateUrl:'fields.html',  reloadOnSearch: false});
        $routeProvider.when('/statistics', {templateUrl:'statistics.html',  reloadOnSearch: false});
        $routeProvider.when('/field', {templateUrl:'field.html',  reloadOnSearch: false});
});