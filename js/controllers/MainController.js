fkd.controller('MainController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    $scope.usuario = {
        login: JSON.parse(localStorage.getItem('login')),
        tipo: localStorage.getItem('tipo'),
        usuario: localStorage.getItem('usuario')
    };

    // Mantém atualizado em que view o app se encontra
    $scope.view = {};
    $scope.setState = function(menuState, viewState) {
        console.log('setState');
        $scope.view.menuState = menuState;
        $scope.view.viewState = viewState;
    };

    // Roda em toda página pra checar o que deve ser exibido/alterado
    $scope.onLoad = function() {
        console.log('onLoad');
        if ($scope.view.menuState == "acesso-menu") {
            // setTimeout(function() {
            $scope.ifLogin();
            // }, 0);
        }
        if ($scope.view.menuState == "acesso-menu") {
            $scope.acessoState();
        } else if ($scope.view.menuState == "administrativo-menu") {
            $scope.administrativoState();
        }
    };

    // Determina se usuário está logado e redireciona ele pra página certa
    $scope.ifLogin = function() {
        console.log('ifLogin');
        if ($scope.usuario.login) {
            console.log("Usuário já logado");
            if ($scope.usuario.tipo == "Administrativo") {
                console.log("Tipo: Administrativo");
                window.location.href = "#/administrativo";
            }
        }
    };

    // Faz logoff
    $scope.doLogout = function() {
        console.log('doLogout');
        $scope.usuario = {
            login: false,
            tipo: null,
            usuario: null
        };
        localStorage.setItem('login', $scope.usuario.login);
        localStorage.setItem('tipo', $scope.usuario.tipo);
        localStorage.setItem('usuario', $scope.usuario.usuario);
        window.location.href = "#/";
    };

    // Determina item ativo no menu Acesso
    $scope.acessoState = function() {
        console.log('acessoState');
        if ($scope.view.viewState == "acesso-home") {
            console.log('acesso-home');
        } else if ($scope.view.viewState == "acesso-administrativo") {
            console.log('acesso-administrativo');
            $("#administrativo").addClass("active");
        } else if ($scope.view.viewState == "acesso-estabelecimento") {
            console.log('acesso-estabelecimento');
            $("#estabelecimento").addClass("active");
        } else if ($scope.view.viewState == "acesso-empresa") {
            console.log('acesso-empresa');
            $("#empresa").addClass("active");
        }
    };

    // Determina item ativo no menu Administrativo
    $scope.administrativoState = function() {
        console.log('adminstrativoState');
        // Admin
        if ($scope.view.viewState == "administrativo-adicionar-admin") {
            console.log('administrativo-adicionar-admin');
            $("#gerenciarAdmins").addClass("active");
            $("#adicionar-admin").addClass("active active-collapsible");
        } else if ($scope.view.viewState == "administrativo-gerenciar-admin") {
            console.log('administrativo-gerenciar-admin');
            $("#gerenciarAdmins").addClass("active");
            $("#gerenciar-admin").addClass("active active-collapsible");
        }
        // Estabelecimento
        else if ($scope.view.viewState == "administrativo-adicionar-estabelecimento") {
            console.log('administrativo-adicionar-estabelecimento');
            $("#gerenciarEstabelecimentos").addClass("active");
            $("#adicionar-estabelecimento").addClass("active active-collapsible");
        } else if ($scope.view.viewState == "administrativo-gerenciar-estabelecimento") {
            console.log('administrativo-gerenciar-estabelecimento');
            $("#gerenciarEstabelecimentos").addClass("active");
            $("#gerenciar-estabelecimento").addClass("active active-collapsible");
        }
        // Empresa
        else if ($scope.view.viewState == "administrativo-adicionar-empresa") {
            console.log('administrativo-adicionar-empresa');
            $("#gerenciarEmpresas").addClass("active");
            $("#adicionar-empresa").addClass("active active-collapsible");
        } else if ($scope.view.viewState == "administrativo-gerenciar-empresa") {
            console.log('administrativo-gerenciar-empresa');
            $("#gerenciarEmpresas").addClass("active");
            $("#gerenciar-empresa").addClass("active active-collapsible");
        }
    };

    $scope.getCoords = function(string) {
        $http.get('http://maps.google.com/maps/api/geocode/json?address=' + string + '&sensor=false')
            .success(function(mapData) {
                if (mapData.status == "OK") {
                    var latLng = mapData.results[0].geometry.location;
                    console.log(latLng);
                    return latLng;
                } else {
                    return false;
                }
            });
    };
}]);
