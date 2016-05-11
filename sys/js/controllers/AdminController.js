fkd.controller('AdminController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    $scope.adminData = {
        nome: "",
        sobrenome: "",
        usuario: "",
        senha: ""
    };

    // Carrega Dados da API
    $scope.adminOnLoad = function() {
        console.log('adminOnLoad');

        if ($scope.view.viewState == "administrativo-editar-admin") {
            console.log('Carregando Administradores...');
            var adminUrl = 'http://' + getServerIP() + '/tabela/view_admin.json?callback=JSON_CALLBACK';
            $http.jsonp(adminUrl)
                .success(function(data) {
                    $scope.adminList = data;
                    console.log('...Carregado');
                    $("#adminLoader").addClass("hide");
                })
                .error(function(data) {
                    console.log(data);
                });
        } else if ($scope.view.viewState == "administrativo-editar-estabelecimento") {
            console.log('Carregando Estabelecimentos...');
            var estabelecimentosUrl = 'http://' + getServerIP() + '/tabela/view_estabelecimento.json?callback=JSON_CALLBACK';
            $http.jsonp(estabelecimentosUrl)
                .success(function(data) {
                    console.log(data);
                    $scope.estabelecimentosList = data;
                    console.log('...Carregado');
                    $("#estabelecimentosLoader").addClass("hide");
                })
                .error(function(data) {
                    console.log(data);
                });
        }
    };

    $scope.adminPost = function() {
        console.log('adminPost');
        if ($scope.adminData.nome === "" || $scope.adminData.nome === undefined) {
            Materialize.toast('Você precisa inserir um nome.', 4000);
        } else if ($scope.adminData.sobrenome === "" || $scope.adminData.sobrenome === undefined) {
            Materialize.toast('Você precisa inserir um sobrenome.', 4000);
        } else if ($scope.adminData.usuario === "" || $scope.adminData.usuario === undefined) {
            Materialize.toast('Você precisa inserir um usuário.', 4000);
        } else if ($scope.adminData.senha === "" || $scope.adminData.senha === undefined) {
            Materialize.toast('Você precisa inserir uma senha.', 4000);
        } else {
            console.log('Cadastrando usuário: ' + $scope.adminData.usuario);
            showPreloader();
            $http({
                method: 'POST',
                url: 'http://' + getServerIP() + '/registra_admin',
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
                    nome: $scope.adminData.nome,
                    sobrenome: $scope.adminData.sobrenome,
                    usuario: $scope.adminData.usuario,
                    senha: $scope.adminData.senha
                }
            }).success(function(data) {
                hidePreloader();
                console.log(data);
                $scope.adminData = {};
                $scope.form.nome.$dirty = false;
                $scope.form.sobrenome.$dirty = false;
                $scope.form.usuario.$dirty = false;
                $scope.form.senha.$dirty = false;
                swal({
                    title: data,
                    text: 'Sucesso.',
                    timer: 1500,
                    type: "success",
                    showConfirmButton: false
                });
                // Materialize.toast(data, 4000); ????
            }).error(function(data) {
                hidePreloader();
                console.log(data);
                swal({
                    title: data,
                    text: 'Erro no cadastro.',
                    timer: 3000,
                    type: "error",
                    showConfirmButton: false
                });
            });
        }
    };

    $scope.popupRemoveAdmin = function(id) {
        var usuario = $scope.usuario.usuario;
        swal({
            title: "An input!",
            text: "Write something interesting:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something"
        }, function(inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false;
            }
            swal("Nice!", "You wrote: " + inputValue, "success");
        });
    };
}]);