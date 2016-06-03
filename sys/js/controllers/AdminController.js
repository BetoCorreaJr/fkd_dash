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

        // Pode ser usado caso precise esconder conteúdo enquanto dados são carregados antes de exibí-lo
        $scope.exibirConteudo = false;

        // Verifica qual é o viewState pra carregar os dados corretos
        if ($scope.view.viewState == "administrativo-gerenciar-admin") {
            console.log('Carregando Administradores...');
            $("#adminLoader").removeClass("hide");
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
        } else if ($scope.view.viewState == "administrativo-editar-admin") {
            $scope.adminSelect = JSON.parse(sessionStorage.getItem('adminSelect'));
        } else if ($scope.view.viewState == "administrativo-editar-senha-admin") {
            $scope.adminSelect = JSON.parse(sessionStorage.getItem('adminSelect'));
        } else if ($scope.view.viewState == "administrativo-adicionar-estabelecimento") {
            console.log('Carregando lista de segmentos...');
            showPreloader();

            $http.jsonp('http://' + getServerIP() + '/tabela/segmento.json?callback=JSON_CALLBACK')
                .success(function(data) {
                    $scope.segmentosList = data;
                    console.log('...Carregado');
                    hidePreloader();
                    $scope.exibirConteudo = true;
                })
                .error(function(data) {
                    console.log(data);
                });
        } else if ($scope.view.viewState == "administrativo-gerenciar-estabelecimento") {
            console.log('Carregando Estabelecimentos...');
            $("#estabelecimentosLoader").removeClass("hide");
            var estabelecimentosUrl = 'http://' + getServerIP() + '/tabela/view_estabelecimento.json?callback=JSON_CALLBACK';
            $http.jsonp(estabelecimentosUrl)
                .success(function(data) {
                    $scope.estabelecimentosList = data;
                    console.log('...Carregado');
                    $("#estabelecimentosLoader").addClass("hide");
                })
                .error(function(data) {
                    console.log(data);
                });
        } else if ($scope.view.viewState == "administrativo-gerenciar-empresa") {
            console.log('Carregando Estabelecimentos...');
            $("#empresasLoader").removeClass("hide");
            var empresasUrl = 'http://' + getServerIP() + '/tabela/view_empresa.json?callback=JSON_CALLBACK';
            $http.jsonp(empresasUrl)
                .success(function(data) {
                    console.log(data);
                    $scope.empresasList = data;
                    console.log('...Carregado');
                    $("#empresasLoader").addClass("hide");
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

    $scope.editarAdmin = function(data) {
        // Salva dados para ser carregado novamente onLoad após mudança de view
        sessionStorage.setItem('adminSelect', JSON.stringify(data));
        window.location.href = "#/administrativo/editar-admin";
    };

    $scope.popupEditarAdmin = function() {
        $('#modalEditarAdmin').openModal();
        $('#pwd').focus();
    };

    $scope.atualizaAdmin = function() {
        showPreloader();

        $http({
            method: 'POST',
            url: 'http://' + getServerIP() + '/atualiza_admin',
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
                usuario: $scope.usuario.usuario,
                senha: $scope.updateData.pwd,
                id: $scope.adminSelect.id_admin,
                nome: $scope.adminSelect.nome,
                sobrenome: $scope.adminSelect.sobrenome,
                usuario_alterado: $scope.adminSelect.usuario
            }
        }).success(function(data) {
            hidePreloader();
            Materialize.toast(data, 4000);
            $scope.updateData.pwd = "";
            $scope.form.pwd.$dirty = false;
            $('#modalEditarAdmin').closeModal();
            window.location.href = "#/administrativo/gerenciar-admin";
            $scope.adminOnLoad();
        }).error(function(data) {
            hidePreloader();
            $scope.updateData.pwd = "";
            Materialize.toast('Senha errada.', 4000);
            console.log(data);
        });
    };

    $scope.popupRemoveAdmin = function(data) {
        $scope.adminSelect = data;
        $('#modalRemoveAdmin').openModal();
        $('#pwd').focus();
    };

    $scope.removeAdmin = function() {
        showPreloader();

        $http({
            method: 'POST',
            url: 'http://' + getServerIP() + '/remover_admin',
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
                usuario: $scope.usuario.usuario,
                senha: $scope.deleteData.pwd,
                id: $scope.adminSelect.id_admin
            }
        }).success(function(data) {
            hidePreloader();
            Materialize.toast(data, 4000);
            $scope.deleteData.pwd = "";
            $scope.form.pwd.$dirty = false;
            $('#modalRemoveAdmin').closeModal();
            $scope.adminOnLoad();
        }).error(function(data) {
            hidePreloader();
            $scope.deleteData.pwd = "";
            Materialize.toast('Senha errada.', 4000);
            console.log(data);
        });
    };

    $scope.imgTest = function() {
        showPreloader();
        $http({
            method: 'POST',
            url: 'http://' + getServerIP() + '/remover_admin',
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
                img: $scope.usuario.usuario
            }
        }).success(function(data) {
            hidePreloader();
            console.log(data);
        }).error(function(data) {
            hidePreloader();
            console.log(data);
        });
    };
}]);
