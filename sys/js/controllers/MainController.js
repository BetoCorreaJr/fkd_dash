fkd.controller('MainController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    $scope.usuario = {
        login: JSON.parse(localStorage.getItem('login')),
        tipo: localStorage.getItem('tipo'),
        usuario: localStorage.getItem('usuario')
    };

    $scope.view = {};
    $scope.setState = function(menuState, viewState) {
        console.log('setState');
        $scope.view.menuState = menuState;
        $scope.view.viewState = viewState;
    };

    $scope.onLoad = function() {
        console.log('onLoad');
        if ($scope.view.menuState == "acesso-menu") {
            $scope.acessoState();
        }
    };

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
