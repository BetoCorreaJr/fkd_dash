var fkd = angular.module('fkdDash', ['ui.router', 'angular.filter']);

fkd.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // UI-Router //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('index', {
            url: "/",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html"
                },
                "view": {
                    templateUrl: "templates/acesso.html"
                }
            }
        });
}]);
