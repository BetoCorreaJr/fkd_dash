var fkd = angular.module('fkdDash', ['ui.materialize', 'ui.router', 'angular.filter', 'lr.upload']);

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
                    templateUrl: "templates/menu/acesso-menu.html",
                    controller: "MenuController"
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
                    templateUrl: "templates/menu/acesso-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso-administrativo.html",
                    controller: "LoginController"
                }
            }
        })
        .state('acesso-estabelecimento', {
            url: "/acesso-estabelecimento",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso-estabelecimento.html",
                    controller: "LoginController"
                }
            }
        })
        .state('acesso-empresa', {
            url: "/acesso-empresa",
            views: {
                "menu": {
                    templateUrl: "templates/menu/acesso-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/acesso/acesso-empresa.html",
                    controller: "LoginController"
                }
            }
        })
        .state('administrativo-home', {
            url: "/administrativo",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-adicionar-admin', {
            url: "/administrativo/adicionar-admin",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-adicionar-admin.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-gerenciar-admin', {
            url: "/administrativo/gerenciar-admin",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-gerenciar-admin.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-editar-admin', {
            url: "/administrativo/editar-admin",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-editar-admin.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-editar-senha-admin', {
            url: "/administrativo/editar-senha-admin",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-editar-senha-admin.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-adicionar-estabelecimento', {
            url: "/administrativo/adicionar-estabelecimento",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-adicionar-estabelecimento.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-gerenciar-estabelecimento', {
            url: "/administrativo/gerenciar-estabelecimento",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-gerenciar-estabelecimento.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-adicionar-empresa', {
            url: "/administrativo/adicionar-empresa",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-adicionar-empresa.html",
                    controller: "AdminController"
                }
            }
        })
        .state('administrativo-gerenciar-empresa', {
            url: "/administrativo/gerenciar-empresa",
            views: {
                "menu": {
                    templateUrl: "templates/menu/administrativo-menu.html",
                    controller: "MenuController"
                },
                "view": {
                    templateUrl: "templates/administrativo/administrativo-gerenciar-empresa.html",
                    controller: "AdminController"
                }
            }
        });
}]);
