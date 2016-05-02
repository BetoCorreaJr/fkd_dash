 var app = angular.module('fkd', ['ui.router', 'ui.materialize']);

 app.config(function($stateProvider, $urlRouterProvider, ) {});
  //
  // For any unmatched url, redirect to /state1
   $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
   $stateProvider
  //
  // Paginas Principais
     .state('home', {
       url: "/",
       templateUrl: "templates/home.html"
     })
     .state('contato', {
       url: "/contato",
       templateUrl: "templates/contato.html"
     })
     .state('quemsomos', {
       url: "/quemsomos",
       templateUrl: "templates/quemsomos.html"
     })
     .state('404', {
       url: "/erro",
       templateUrl: "templates/404.html"
     })
     .state('listaParceiroNegociacao', {
       url: "/parceiros-em-negociacao",
       templateUrl: "templates/lista-parceiros-negociacao.html",
       controller: "ListagemParceirosController"
     })

   .state('parceiro', {
       url: "/parceiro",
       templateUrl: "templates/parceiro.html",
       controller: "RootController"
     })
    //  Categorias
    //  Gastronomia
    .state('categoriaGastronomia', {
       url: "/gastronomia",
       templateUrl: "templates/parceiros/gastronomia/gastronomia.html",
       controller: "RootController"
     })
    //  Gastronomia > Bares e Restaurantes
     .state('categoriaGastronomiaBareseRestaurantes', {
       url: "/gastronomia/bares-e-restaurantes",
       templateUrl: "templates/parceiros/gastronomia/bares-e-restaurantes.html",
       controller: "RootController"
     })
    //  Gastronomia > Lanchonetes
     .state('categoriaGastronomiaLanchonetes', {
       url: "/gastronomia/lanchonetes",
       templateUrl: "templates/parceiros/gastronomia/lanchonetes.html",
       controller: "RootController"
     })
     //  Gastronomia > Delivery
     .state('categoriaGastronomiaDelivery', {
       url: "/gastronomia/delivery",
       templateUrl: "templates/parceiros/gastronomia/delivery.html",
       controller: "RootController"
     })
    //  Outros
    .state('categoriaOutros', {
       url: "/outros",
       templateUrl: "templates/parceiros/outros/outros.html",
       controller: "RootController"
     })
    //  Outros > Saude
     .state('categoriaOutrosSaude', {
       url: "/outros/saude",
       templateUrl: "templates/parceiros/outros/saude.html",
       controller: "RootController"
     })
     //  Outros > Fitness
     .state('categoriaOutrosFitness', {
       url: "/outros/fitness",
       templateUrl: "templates/parceiros/outros/fitness.html",
       controller: "RootController"
     })
    //  Viagens
    //  Excursoes
    .state('categoriaTurismoExcursoes', {
      url: "/turismo/excursoes",
      templateUrl: "templates/parceiros/turismo/excursoes.html",
      controller: "RootController"
     })
    // Estilo & Beleza
    // Estilo & Beleza > Estética
    .state('categoriaEstiloEstetica', {
      url: "/estilo-e-beleza/estetica",
      templateUrl: "templates/parceiros/estilo-e-beleza/estetica.html",
      controller: "RootController"
     });
 });
