app.controller('RootController', function($scope, $http) {

  $scope.estabelecimentos = JSON.parse(localStorage.getItem('estabelecimentos'));
  $scope.promocoes = JSON.parse(localStorage.getItem('promocoes'));

  $scope.loadJSON = function() {
    var serverIP = 'fika-a-dica.herokuapp.com';

    // $scope.estabelecimentos = JSON.parse(localStorage.getItem('estabelecimentos'));
    $http.jsonp('http://' + serverIP + '/tabela/view_estabelecimento_completo.json?callback=JSON_CALLBACK')
      .success(function(data) {
        localStorage.setItem('estabelecimentos', JSON.stringify($scope.estabelecimentos = data));
        // Aleatorio
        randomList($scope.estabelecimentos);
        localStorage.setItem('estabelecimentos', JSON.stringify($scope.estabelecimentos = data));
      })
      .error(function(data) {
        console.log('Erro carregando estabelecimentos.');
      });

    // $scope.promocoes = JSON.parse(localStorage.getItem('promocoes'));
    $http.jsonp('http://' + serverIP + '/tabela/view_promocao_completo.json?callback=JSON_CALLBACK')
      .success(function(data) {
        localStorage.setItem('promocoes', JSON.stringify($scope.promocoes = data));
        for (var i = 0; i < $scope.promocoes.length; i++) {
          $scope.promocoes[i].preco = parseFloat($scope.promocoes[i].preco).toFixed(2);
          $scope.promocoes[i].economia = (($scope.promocoes[i].preco * $scope.promocoes[i].desconto) / 100).toFixed(2);
          $scope.promocoes[i].precoFinal = ($scope.promocoes[i].preco - $scope.promocoes[i].economia).toFixed(2);

          if ($scope.promocoes[i].preco == 'NaN') {
            $scope.promocoes[i].temPreco = false;
          } else {
            $scope.promocoes[i].temPreco = true;
          }

          if ($scope.promocoes[i].segunda == 1) {

            $scope.promocoes[i].segunda_inicio = parseTime($scope.promocoes[i].segunda_inicio);
            $scope.promocoes[i].segunda_final = parseTime($scope.promocoes[i].segunda_final);
          }
          if ($scope.promocoes[i].terca == 1) {
            $scope.promocoes[i].terca_inicio = parseTime($scope.promocoes[i].terca_inicio);
            $scope.promocoes[i].terca_final = parseTime($scope.promocoes[i].terca_final);
          }
          if ($scope.promocoes[i].quarta == 1) {
            $scope.promocoes[i].quarta_inicio = parseTime($scope.promocoes[i].quarta_inicio);
            $scope.promocoes[i].quarta_final = parseTime($scope.promocoes[i].quarta_final);
          }
          if ($scope.promocoes[i].quinta == 1) {
            $scope.promocoes[i].quinta_inicio = parseTime($scope.promocoes[i].quinta_inicio);
            $scope.promocoes[i].quinta_final = parseTime($scope.promocoes[i].quinta_final);
          }
          if ($scope.promocoes[i].sexta == 1) {
            $scope.promocoes[i].sexta_inicio = parseTime($scope.promocoes[i].sexta_inicio);
            $scope.promocoes[i].sexta_final = parseTime($scope.promocoes[i].sexta_final);
          }
          if ($scope.promocoes[i].sabado == 1) {
            $scope.promocoes[i].sabado_inicio = parseTime($scope.promocoes[i].sabado_inicio);
            $scope.promocoes[i].sabado_final = parseTime($scope.promocoes[i].sabado_final);
          }
          if ($scope.promocoes[i].domingo == 1) {
            $scope.promocoes[i].domingo_inicio = parseTime($scope.promocoes[i].domingo_inicio);
            $scope.promocoes[i].domingo_final = parseTime($scope.promocoes[i].domingo_final);
          }
        }
        // Aleatorio
        randomList($scope.promocoes);

        localStorage.setItem('promocoes', JSON.stringify($scope.promocoes));
      })
      .error(function(data) {
        console.log('Erro carregando promoções.');
      });

    $http.jsonp('http://' + serverIP + '/tabela/view_promocao_destaque.json?callback=JSON_CALLBACK')
      .success(function(data) {
        localStorage.setItem('destaque', JSON.stringify($scope.destaque = data));
      })
      .error(function(data) {
        console.log('Erro carregando destaque.');
      });
  };

  

  $scope.guardaEstabelecimento = function(estabelecimento) {
    localStorage.setItem('estabelecimentoView', $scope.estabelecimentoView = estabelecimento);
    $scope.pegaCoordenadas();
  };
  $scope.estabelecimentoView = localStorage.getItem('estabelecimentoView');

  $scope.pegaCoordenadas = function() {
    for (var i = 0; i < $scope.estabelecimentos.length; i++) {
      if ($scope.estabelecimentos[i].nome == $scope.estabelecimentoView) {
        localStorage.setItem('lat', $scope.estabelecimentos[i].lat);
        localStorage.setItem('lng', $scope.estabelecimentos[i].lng);
      }
    }
  };
});

app.controller('GMapController', function($scope, uiGmapGoogleMapApi) {
  var lat = localStorage.getItem('lat');
  var lng = localStorage.getItem('lng');

  //Google Maps
  $scope.map = {
    center: {
      latitude: lat,
      longitude: lng
    },
    zoom: 17,
    options: {
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false
    }
  };


  $scope.addressMarker = {
    id: 1,
    coords: {
      latitude: lat,
      longitude: lng
    },
    options: {
      icon: 'img/maps/coordsMarker.png'
    }
  };

  uiGmapGoogleMapApi.then(function(maps) {

  });
  // Fim do Google Maps
});

app.controller('ListagemParceirosController', function($scope) {
  $scope.riodejaneiro = [
    //RIO DE JANEIRO
    {
      empresa: 'CLASSIC TIE',
      segmento: 'Bar',
    }, {
      empresa: 'MEGA MATTE',
      segmento: '',
    }, {
      empresa: 'ESPAÇO ELAS POR ELAS',
      segmento: '',
    }, {
      empresa: 'RUBRO CAFÉ',
      segmento: '',
    }, {
      empresa: 'ACQUA GYM FITNESS CENTER',
      segmento: '',
    }, {
      empresa: 'YES IDIOMAS',
      segmento: '',
    }, {
      empresa: 'ESMALTERIA CARIOCA',
      segmento: '',
    }, {
      empresa: 'SN SMART NUTRITION',
      segmento: '',
    }, {
      empresa: 'SPAZIO CAPELLI INSTITUTO DE BELEZA',
      segmento: '',
    }, {
      empresa: 'GUSTATTI GRILL',
      segmento: '',
    }, {
      empresa: 'CASA DO PÃO DE QUEIJO',
      segmento: '',
    }, {
      empresa: 'FIBRA ÓTICA',
      segmento: '',
    }, {
      empresa: 'SHOPPING DA SAÚDE',
      segmento: '',
    }, {
      empresa: 'AUTO ESCOLA RIO DE JANEIRO',
      segmento: '',
    }, {
      empresa: 'CURVES CENTRO DE ESTÉTICA',
      segmento: '',
    }, {
      empresa: 'CINELÂNDIA PET SHOP',
      segmento: '',
    }, {
      empresa: 'BERGUTI DELICATESSEN',
      segmento: '',
    }, {
      empresa: 'DESACATO',
      segmento: '',
    }
  ];

  $scope.angradosreis = [
    //ANGRA DOS REIS
    {
      empresa: 'CASA DA PINHA',
      segmento: '',
    }, {
      empresa: 'TOCA DO PINTADO',
      segmento: '',
    }, {
      empresa: 'ART SUSHI',
      segmento: '',
    }, {
      empresa: 'CASA BONITA',
      segmento: '',
    }, {
      empresa: 'MG BRASIL ROUPAS',
      segmento: '',
    }, {
      empresa: 'GREEN GROUP JÓIAS',
      segmento: '',
    }, {
      empresa: 'STRIKE',
      segmento: '',
    }, {
      empresa: 'VILA GALÉ',
      segmento: '',
    }
  ];
});
