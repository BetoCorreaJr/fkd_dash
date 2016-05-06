fkd.controller('LoginController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    $scope.doLogin = function() {
        if ($scope.view.viewState == "acesso-administrativo") {
            console.log("Fazendo login (Adminstrativo)...");
            console.log("Usuário: " + $scope.loginData.usuario);
            // console.log("Senha: " + $scope.loginData.pwd);
            $scope.adminLogin();
        }
    };

    // Login acesso-administrativo
    $scope.adminLogin = function() {
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
            console.log(data);
            localStorage.setItem('usuario', $scope.usuario.usuario = $scope.loginData.usuario);
            localStorage.setItem('tipo', $scope.usuario.tipo = 'Administrativo');
            localStorage.setItem('login', $scope.usuario.login = true);
            $scope.loginData = {};
            $scope.form.user.$dirty = false;
            $scope.form.pwd.$dirty = false;
            window.location.href = "#/administrativo";
        }).error(function(data) {
            console.log(data);
            swal({
                title: data,
                text: 'Seu usuário ou senha estão errados.',
                timer: 3000,
                type: "error",
                showConfirmButton: false
            });
        });
    };
}]);
