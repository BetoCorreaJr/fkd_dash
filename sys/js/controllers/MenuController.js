fkd.controller('MenuController', ['$scope', '$sce', function($scope, $sce) {
    $scope.acessoState = function() {
        console.log('acessoState');
        if ($scope.view.viewState == "acesso-home") {
            console.log('acesso-home');
            $("#administrativo").removeClass("active");
            $("#estabelecimento").removeClass("active");
            $("#empresa").removeClass("active");
        } else if ($scope.view.viewState == "acesso-administrativo") {
            console.log('acesso-administrativo');
            $("#administrativo").addClass("active");
            $("#estabelecimento").removeClass("active");
            $("#empresa").removeClass("active");
        } else if ($scope.view.viewState == "acesso-estabelecimento") {
            console.log('acesso-estabelecimento');
            $("#administrativo").removeClass("active");
            $("#estabelecimento").addClass("active");
            $("#empresa").removeClass("active");
        } else if ($scope.view.viewState == "acesso-empresa") {
            console.log('acesso-empresa');
            $("#administrativo").removeClass("active");
            $("#estabelecimento").removeClass("active");
            $("#empresa").addClass("active");
        }
    };
}]);
