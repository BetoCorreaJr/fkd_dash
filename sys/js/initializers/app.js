var fkd = angular.module('fkdDash', ['ui.materialize', 'ui.router', 'angular.filter']);

fkd.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // UI-Router //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('acesso-home', {
            url: "/",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso.html"
                }
            }
        })
        .state('acesso-administrativo', {
            url: "/acesso-administrativo",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso-administrativo.html"
                }
            }
        })
        .state('acesso-estabelecimento', {
            url: "/acesso-estabelecimento",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso-estabelecimento.html"
                }
            }
        })
        .state('acesso-empresa', {
            url: "/acesso-empresa",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso-empresa.html"
                }
            }
        });
}]);
