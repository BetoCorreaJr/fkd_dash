fkd.controller('AdminController', ['$scope', '$sce', '$http', 'NgMap', function($scope, $sce, $http, NgMap) {
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
            var estabelecimentosUrl = 'http://' + getServerIP() + '/tabela/view_estabelecimento_admin.json?callback=JSON_CALLBACK';
            $http.jsonp(estabelecimentosUrl)
                .success(function(data) {
                    $scope.estabelecimentosList = data;
                    console.log('...Carregado');
                    $("#estabelecimentosLoader").addClass("hide");
                })
                .error(function(data) {
                    console.log(data);
                });
        } else if ($scope.view.viewState == "administrativo-editar-estabelecimento") {
            $scope.estabelecimentoSelect = JSON.parse(sessionStorage.getItem('estabelecimentoSelect'));
            console.log($scope.estabelecimentoSelect);
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

    $scope.popupSenhaAdmin = function() {
        if ($scope.adminSelect.senha === "" || $scope.adminSelect.senha === undefined) {
            Materialize.toast('Você precisa inserir uma senha.', 4000);
        } else if ($scope.adminSelect.confirmaSenha === "" || $scope.adminSelect.confirmaSenha === undefined) {
            Materialize.toast('Você precisa confirmar a senha.', 4000);
        } else {
            $('#modalSenhaAdmin').openModal();
            $('#pwd').focus();
        }
    };

    $scope.alteraSenha = function() {
        showPreloader();
        $http({
            method: 'POST',
            url: 'http://' + getServerIP() + '/troca_senha_admin',
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
                senha_alterada: $scope.adminSelect.senha
            }
        }).success(function(data) {
            hidePreloader();
            console.log(data);
            window.location.href = "#/administrativo/gerenciar-admin";
            Materialize.toast(data, 4000);
            $scope.updateData.pwd = "";
            $scope.adminSelect.senha = "";
            $scope.adminSelect.confirmaSenha = "";
            $scope.form.pwd.$dirty = false;
            $('#modalSenhaAdmin').closeModal();
        }).error(function(data) {
            hidePreloader();
            Materialize.toast(data, 4000);
            console.log(data);
        });
    };

    $scope.popupAdicionarEstabelecimento = function() {
        if ($scope.estabelecimentoData.nome === "" || $scope.estabelecimentoData.nome === undefined) {
            Materialize.toast('Você precisa inserir um nome.', 4000);
        } else if ($scope.estabelecimentoData.segmento === "" || $scope.estabelecimentoData.segmento === undefined) {
            Materialize.toast('Você precisa inserir um segmento.', 4000);
        } else if ($scope.estabelecimentoData.endereco === "" || $scope.estabelecimentoData.endereco === undefined) {
            Materialize.toast('Você precisa inserir um endereço.', 4000);
        } else if ($scope.estabelecimentoData.numero === "" || $scope.estabelecimentoData.numero === undefined) {
            Materialize.toast('Você precisa inserir um número.', 4000);
        } else if ($scope.estabelecimentoData.bairro === "" || $scope.estabelecimentoData.bairro === undefined) {
            Materialize.toast('Você precisa inserir um bairro.', 4000);
        } else if ($scope.estabelecimentoData.cep === "" || $scope.estabelecimentoData.cep === undefined) {
            Materialize.toast('Você precisa inserir um CEP.', 4000);
        } else if ($scope.estabelecimentoData.cidade === "" || $scope.estabelecimentoData.cidade === undefined) {
            Materialize.toast('Você precisa inserir uma cidade.', 4000);
        } else if ($scope.estabelecimentoData.uf === "" || $scope.estabelecimentoData.uf === undefined) {
            Materialize.toast('Você precisa inserir um estado.', 4000);
        } else if ($scope.estabelecimentoData.email === "" || $scope.estabelecimentoData.email === undefined) {
            Materialize.toast('Você precisa inserir um email.', 4000);
        } else if ($scope.estabelecimentoData.telefone === "" || $scope.estabelecimentoData.telefone === undefined) {
            Materialize.toast('Você precisa inserir um telefone.', 4000);
        } else if ($scope.estabelecimentoData.cnpj === "" || $scope.estabelecimentoData.cnpj === undefined) {
            Materialize.toast('Você precisa inserir um CNPJ.', 4000);
        } else {
            $('#modalAdicionarEstabelecimento').openModal();
            $('#pwd').focus();
        }
    };

    $scope.estabelecimentoPost = function() {
        showPreloader();
        var segmento = "";
        var end = $scope.estabelecimentoData.endereco + " " + $scope.estabelecimentoData.numero + " " + $scope.estabelecimentoData.cep + " " + $scope.estabelecimentoData.cidade + " " + $scope.estabelecimentoData.uf;
        Materialize.toast('Descobrindo coordenadas GPS.', 1500);
        $http.get('http://maps.google.com/maps/api/geocode/json?address=' + end + '&sensor=false')
            .success(function(mapData) {
                if (mapData.status == "OK") {
                    var latLng = mapData.results[0].geometry.location;
                    Materialize.toast('Sucesso.', 1500);
                    for (var i = 0; i < $scope.segmentosList.length; i++) {
                        if ($scope.segmentosList[i].nome == $scope.estabelecimentoData.segmento) {
                            segmento = $scope.segmentosList[i].id_segmento;
                        }
                    }
                    console.log(segmento);
                    Materialize.toast('Cadastrando...', 2000);
                    $http({
                        method: 'POST',
                        url: 'http://' + getServerIP() + '/inserir/estabelecimento',
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
                            nome: $scope.estabelecimentoData.nome,
                            segmento: segmento,
                            endereco: $scope.estabelecimentoData.endereco,
                            numero: $scope.estabelecimentoData.numero,
                            complemento: $scope.estabelecimentoData.complemento,
                            bairro: $scope.estabelecimentoData.bairro,
                            cep: $scope.estabelecimentoData.cep,
                            cidade: $scope.estabelecimentoData.cidade,
                            uf: $scope.estabelecimentoData.uf,
                            lat: latLng.lat,
                            lng: latLng.lng,
                            email: $scope.estabelecimentoData.email,
                            telefone: $scope.estabelecimentoData.telefone,
                            cnpj: $scope.estabelecimentoData.cnpj,
                            senha: $scope.estabelecimentoData.senha,
                            descricao: $scope.estabelecimentoData.descricao,
                            site: $scope.estabelecimentoData.site,
                            admin: $scope.usuario.usuario,
                            pass: $scope.modal.pwd
                        }
                    }).success(function(data) {
                        hidePreloader();
                        console.log(data);
                        $('#modalAdicionarEstabelecimento').closeModal();
                        window.location.href = "#/administrativo/gerenciar-estabelecimento";
                        Materialize.toast(data, 4000);
                    }).error(function(data) {
                        hidePreloader();
                        $('#modalAdicionarEstabelecimento').closeModal();
                        Materialize.toast(data, 4000);
                        console.log(data);
                    });
                } else {
                    hidePreloader();
                    Materialize.toast('Erro no serviço de geolocalização, tente mais tarde.', 4000);
                }
            });
    };

    $scope.editarEstabelecimento = function(item) {
        // Salva dados para ser carregado novamente onLoad após mudança de view
        sessionStorage.setItem('estabelecimentoSelect', JSON.stringify(item));
        window.location.href = "#/administrativo/editar-estabelecimento";
    };

    $scope.popupAtivaEstabelecimento = function(item) {
        sessionStorage.setItem('id', item.id_estabelecimento);
        sessionStorage.setItem('ativo', item.ativo);
        $scope.estabelecimentoData = item;
        $('#modalAtivaEstabelecimento').openModal();
        $('#pwd').focus();
    };

    $scope.postAtivaEstabelecimento = function() {
        var set;
        var id = sessionStorage.getItem('id');
        if (sessionStorage.getItem('ativo') == "1") {
            set = 0;
            console.log("Desativando " + id);
        } else {
            set = 1;
            console.log("Ativando " + id);
        }
        showPreloader();
        $http({
            method: 'POST',
            url: 'http://' + getServerIP() + '/admin/ativar-estabelecimento',
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
                admin: $scope.usuario.usuario,
                senha: $scope.modal.pwd,
                id: id,
                ativo: set
            }
        }).success(function(data) {
            hidePreloader();
            console.log(data);
            $scope.modal.pwd = "";
            $scope.form.pwd.$dirty = false;
            $('#modalAtivaEstabelecimento').closeModal();
            $scope.adminOnLoad();
            Materialize.toast(data, 4000);
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('ativo');
        }).error(function(data) {
            hidePreloader();
            Materialize.toast(data, 4000);
            console.log(data);
        });
    };

    $scope.estabModal = function(type) {
        console.log("estabModal");
        sessionStorage.setItem('estabModal', type);
        switch (type) {
            case "editar":
			sessionStorage.setItem('confModal', type);
                console.log("editar");
                showPreloader();
                $http.jsonp('http://' + getServerIP() + '/tabela/segmento.json?callback=JSON_CALLBACK')
                    .success(function(data) {
                        $scope.segmentosList = data;
                        console.log('...Carregado');
                        hidePreloader();
                        $scope.estabelecimentoEdit = JSON.parse(sessionStorage.getItem('estabelecimentoSelect'));
                        $scope.exibirConteudo = true;
                        $('#modalEditarEstabelecimento').openModal();
                    })
                    .error(function(data) {
                        console.log(data);
                    });
                break;
            case "horarios":
			sessionStorage.setItem('confModal', type);
                console.log("horarios");
                break;
            case "logo":
			sessionStorage.setItem('confModal', type);
                console.log("logo");
                break;
            case "senha":
			sessionStorage.setItem('confModal', type);
                console.log("senha");
                break;
            case "confirmaSenha":
                console.log("confirmaSenha");
                $('#modalConfirmaSenha').openModal();
                break;
            default:
                break;
        }
    };

    $scope.confirmaSenhaEstabelecimento = function() {
		console.log('confirmaSenha');
        var type = sessionStorage.getItem('confModal');
		console.log('Type = ' + type);
		var id = JSON.parse(sessionStorage.getItem('estabelecimentoSelect'));
        id = id.estabelecimento_id;
        switch (type) {
            case "editar":
                showPreloader();
                var segmento = "";
                var end = $scope.estabelecimentoEdit.endereco + " " + $scope.estabelecimentoEdit.numero + " " + $scope.estabelecimentoEdit.cep + " " + $scope.estabelecimentoEdit.cidade + " " + $scope.estabelecimentoEdit.uf;
                Materialize.toast('Recalculando coordenadas GPS.', 1500);
                $http.get('http://maps.google.com/maps/api/geocode/json?address=' + end + '&sensor=false')
                    .success(function(mapData) {
                        if (mapData.status == "OK") {
                            var latLng = mapData.results[0].geometry.location;
                            Materialize.toast('Sucesso.', 1500);
                            for (var i = 0; i < $scope.segmentosList.length; i++) {
                                if ($scope.segmentosList[i].nome == $scope.estabelecimentoEdit.segmento) {
                                    segmento = $scope.segmentosList[i].id_segmento;
                                }
                            }
                            console.log(segmento);
                            Materialize.toast('Alterando...', 2000);
                            $http({
                                method: 'POST',
                                url: 'http://' + 'localhost:4567' + '/admin/atualizar-dados-estabelecimento',
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
                                    id: id,
                                    nome: $scope.estabelecimentoEdit.nome,
                                    segmento: segmento,
                                    endereco: $scope.estabelecimentoEdit.endereco,
                                    numero: $scope.estabelecimentoEdit.numero,
                                    complemento: $scope.estabelecimentoEdit.complemento,
                                    bairro: $scope.estabelecimentoEdit.bairro,
                                    cep: $scope.estabelecimentoEdit.cep,
                                    cidade: $scope.estabelecimentoEdit.cidade,
                                    uf: $scope.estabelecimentoEdit.uf,
                                    lat: latLng.lat,
                                    lng: latLng.lng,
                                    email: $scope.estabelecimentoEdit.email,
                                    telefone: $scope.estabelecimentoEdit.telefone,
                                    cnpj: $scope.estabelecimentoEdit.cnpj,
                                    descricao: $scope.estabelecimentoEdit.descricao,
                                    site: $scope.estabelecimentoEdit.site,
                                    admin: $scope.usuario.usuario,
                                    senha: $scope.updateData.pwd
                                }
                            }).success(function(data) {
                                hidePreloader();
                                console.log(data);
                                $('#modalEditarEstabelecimento').closeModal();
                                window.location.href = "#/administrativo/gerenciar-estabelecimento";
                                $('#modalConfirmaSenha').closeModal();
                                Materialize.toast(data, 4000);
                            }).error(function(data) {
                                hidePreloader();
                                $('#modalEditarEstabelecimento').closeModal();
                                $('#modalConfirmaSenha').closeModal();
                                Materialize.toast(data, 4000);
                                console.log(data);
                            });
                        } else {
                            hidePreloader();
                            Materialize.toast('Erro no serviço de geolocalização, tente mais tarde.', 4000);
                        }
                    });
                break;
            default:
                break;
        }
    };

    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
}]);