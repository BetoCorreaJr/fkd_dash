fkd.controller('LoginController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    // Efetua o login
    $scope.doLogin = function() {
        // Verifica qual é o tipo de login e chama sua função correspondente
        if ($scope.view.viewState == "acesso-administrativo") {
            console.log("Fazendo login (Adminstrativo)...");
            console.log("Usuário: " + $scope.loginData.usuario);
            // console.log("Senha: " + $scope.loginData.pwd);
            $scope.adminLogin();
        }
    };

    // Login acesso-administrativo
    $scope.adminLogin = function() {
        showPreloader();
        $http({
            method: 'POST',
            url: 'http://' + getServerIP() + '/login_admin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                usuario: $scope.loginData.usuario,
                senha: $scope.loginData.pwd
            }
        }).success(function(data) {
            hidePreloader();
            console.log(data);
            localStorage.setItem('usuario', $scope.usuario.usuario = $scope.loginData.usuario);
            localStorage.setItem('tipo', $scope.usuario.tipo = 'Administrativo');
            localStorage.setItem('login', $scope.usuario.login = true);
            $scope.loginData = {};
            $scope.form.user.$dirty = false;
            $scope.form.pwd.$dirty = false;
            window.location.href = "#/administrativo";
        }).error(function(data) {
            hidePreloader();
            console.log(data);
            swal({
                title: data,
                text: 'Por favor, verifique seus dados.',
                timer: 3000,
                type: "error",
                showConfirmButton: false
            });
        });
    };
}]);
