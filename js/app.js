!function(){"use strict";angular.module("emus",["emus.routes","emus.landing","emus.about","emus.modalities","emus.modalities.type","emus.modality.factory","emus.modality.more.directive","emus.modality.hide.directive","emus.modality.project.directive","emus.form","emus.summary","emus.modal.controller","emus.form.factory","emus.form.factory.mun","emus.form.directives","duScroll","ncy-angular-breadcrumb","ngAnimate","ui.bootstrap","nya.bootstrap.select","angularUtils.directives.uiBreadcrumbs","akoenig.deckgrid"]).value("duScrollDuration",750).run(["$rootScope","$state","$stateParams",function(e,o,t){return e.$state=o,e.$stateParams=t,e.$on("$stateChangeStart",function(o,t){return e.title=t.data.title,e.title}),e.$on("$stateChangeSuccess",function(o){return e.state=o.targetScope.$state.current,e.state}),e}]).config(["$modalProvider",function(e){e.options.animation=!0}])}(),function(){"use strict";angular.module("emus.routes",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(e,o){o.otherwise("/"),e.state("inicio",{url:"/",controller:"LandingController",templateUrl:"./components/landing/landing.html",data:{title:""},ncyBreadcrumb:{label:"Inicio"}}).state("modalidades",{url:"/modalidades",controller:"ModalitiesController",data:{title:"Modalidades de la Estrategia de Movilidad Urbana Sustentable (EMUS)"},templateUrl:"./components/modalities/modalities.html",ncyBreadcrumb:{label:"Modalidades",parent:"inicio"}}).state("modalidades.tipo",{url:"/:tipo",controller:"ModalityTypeController",templateUrl:"./components/modalities/type/template.html",ncyBreadcrumb:{label:"Modalidades",parent:"inicio"}}).state("modalidades.calculadora",{"abstract":!0,url:"/calculadora",templateUrl:"./components/calculator/calculator.html"}).state("modalidades.calculadora.formulario",{url:"/formulario",templateUrl:"./components/calculator/form/form.html",controller:"FormController",data:{title:"Calculadora"},ncyBreadcrumb:{label:"Calculadora",parent:"modalidades.calculadora"}}).state("modalidades.calculadora.resumen",{url:"/resumen",templateUrl:"./components/calculator/summary/summary.html",controller:"SummaryController",data:{title:"Resumen"},ncyBreadcrumb:{label:"Resumen",parent:"modalidades.calculadora.formulario"}}).state("acerca",{url:"/acerca",templateUrl:"./components/about/about.html",controller:"AboutController",data:{title:"Acerca de EMUS"},ncyBreadcrumb:{label:"Acerca de EMUS",parent:"inicio"}})}])}(),function(){"use strict";var e=function(e,o){o.scrollTop(0);var t=angular.element(document.getElementById("menu")),a=angular.element(document.getElementsByClassName("about-menu"));t.on("click",function(e){e.preventDefault(),a.toggleClass("show_menu")}),o.on("scroll",function(){var e=angular.element(document.getElementById("header"));o.scrollTop()>=65?e.addClass("black"):e.removeClass("black")})};e.$inject=["$scope","$document"],angular.module("emus.about",[]).controller("AboutController",e)}(),function(){"use strict";var e=function(e,o){o.scrollTop(0);var t=angular.element(document.getElementById("menu")),a=angular.element(document.getElementsByClassName("landing-menu"));t.on("click",function(e){e.preventDefault(),a.toggleClass("show_menu")}),o.on("scroll",function(){var e=angular.element(document.getElementById("header"));o.scrollTop()>=65?e.addClass("black"):e.removeClass("black")})};e.$inject=["$scope","$document"],angular.module("emus.landing",[]).controller("LandingController",e)}(),function(){"use strict";var e=function(e,o,t,a){var l,s;e.scrollTop(0),o.showModalities=function(){return"modalidades"===a.current.name||"modalidades.tipo"===a.current.name?!0:void 0},angular.element(t).bind("scroll",function(){l=angular.element(document.getElementById("header")),s=angular.element(document.getElementsByTagName("body")),s[0].scrollTop>=65&&s[0].scrollWidth>=768?l.addClass("black"):l.removeClass("black")})};e.$inject=["$document","$scope","$window","$state"],angular.module("emus.modalities",[]).controller("ModalitiesController",e)}(),function(){"use strict";var e=function(e,o,t,a,l,s,r,i,n,c,m,u,d,f){function p(){g(),n.info("Iniciando..."),null!==N&&(s.calculator=JSON.parse(N),"true"==F&&(s.flagPozos=!0,s.form.PozosProyecto1=s.calculator.PozosProyecto,s.calculator.PozosProyecto=s.form.PozosProyecto1,s.submitted=!0,s.pozos="d"),"false"==F&&(s.flagPozos=!1,s.form.PozosProyecto2=s.calculator.PozosProyecto,s.calculator.PozosProyecto=s.form.PozosProyecto2,s.submitted=!0,s.pozos="c",s.firstPozo=function(e){v(e)}),"true"==E&&(s.flagRejillas=!0,s.form.RejillasProyecto1=s.calculator.RejillasProyecto,s.calculator.RejillasProyecto=s.form.RejillasProyecto1,s.submitted=!0,s.rejillas="d"),"false"==E&&(s.flagRejillas=!1,s.form.RejillasProyecto2=s.calculator.RejillasProyecto,s.calculator.RejillasProyecto=s.form.RejillasProyecto2,s.submitted=!0,s.rejillas="c",s.firstRejilla=function(e){C(e)}),"true"==B&&(s.flagCocheras=!0,s.form.CocherasProyecto1=s.calculator.Cocheras,s.calculator.Cocheras=s.form.CocherasProyecto1,s.submitted=!0,s.cocheras="d"),"false"==B&&(s.flagCocheras=!1,s.form.CocherasProyecto2=s.calculator.Cocheras,s.calculator.Cocheras=s.form.CocherasProyecto2,s.submitted=!0,s.cocheras="c",s.firstCochera=function(e){z(e)}),"true"==R&&(s.flagBicie=!0,s.submitted=!0,s.biciestacionamiento="default"),"false"==R&&(s.flagBicie=!1,s.calc.bicie=s.calculator.Biciestacionamientos,s.calculator.Biciestacionamientos=s.calc.bicie,s.submitted=!0,s.biciestacionamiento="c",s.firstBiciE=function(e){A(e)})),k&&"true"===J?s.area=JSON.parse(k):"false"!==J&&y()}function g(){var e=!1;O?o(function(){e||(e=!0,D=angular.element(document.getElementById(O)),D.addClass("radio_active"))},1e3):e=!1}function y(){return n.warn("Lanzando Modal"),o(function(){t.open({controller:"ModalController",controllerAs:"modalCtrl",templateUrl:"./components/calculator/modal/modal.html",resolve:{area:function(){return s.area}}})},1500)}function h(e){D=angular.element(document.getElementById(e)),D.addClass("radio_active"),sessionStorage.setItem("currentInfrastructure",D[0].id)}function b(e){_=parseInt(1e3*s.calculator.KmEvaluables/200),s.form.PozosProyecto1=_,s.calculator.PozosProyecto=s.form.PozosProyecto1,s.tmPozos=s.form.PozosProyecto2,s.form.PozosProyecto2=null,sessionStorage.setItem("flagPozos",!0),s.flagPozos=!0}function v(e){s.form.PozosProyecto2=e,s.calculator.PozosProyecto=s.form.PozosProyecto2,s.tmPozos=s.form.PozosProyecto1,s.form.PozosProyecto1=null,sessionStorage.setItem("flagPozos",!1),s.flagPozos=!1}function P(e){Q=parseInt(1e3*s.calculator.KmEvaluables/200),s.form.RejillasProyecto1=Q,s.calculator.RejillasProyecto=s.form.RejillasProyecto1,s.tmRejillas=s.form.RejillasProyecto2,s.form.RejillasProyecto2=null,sessionStorage.setItem("flagRejillas",!0),s.flagRejillas=!0}function C(e){s.form.RejillasProyecto2=e,s.calculator.RejillasProyecto=s.form.RejillasProyecto2,s.tmRejillas=s.form.RejillasProyecto1,s.form.RejillasProyecto1=null,sessionStorage.setItem("flagRejillas",!1),s.flagRejillas=!1}function S(e){$=parseInt(25*s.calculator.KmEvaluables),s.form.CocherasProyecto1=$,s.calculator.Cocheras=s.form.CocherasProyecto1,s.tmCocheras=s.form.CocherasProyecto2,s.form.CocherasProyecto2=null,sessionStorage.setItem("flagCocheras",!0),s.flagCocheras=!0}function z(e){s.form.CocherasProyecto2=e,s.calculator.Cocheras=s.form.CocherasProyecto2,s.tmCocheras=s.form.CocherasProyecto1,s.form.CocherasProyecto1=null,sessionStorage.setItem("flagCocheras",!1),s.flagCocheras=!1}function j(){s.calculator.Biciestacionamientos="default",s.tmBicie=s.calc.bicie,s.calc.bicie=null,sessionStorage.setItem("flagBicie",!0),s.flagBicie=!0}function A(e){s.calc.bicie=e,s.calculator.Biciestacionamientos=e,sessionStorage.setItem("flagBicie",!1),s.flagBicie=!1}function I(){function e(e,o){K={};for(var t in e)K[t]=e[t];for(var t in o)K[t]=o[t];return K}var o=JSON.parse(sessionStorage.getItem("area")),t=JSON.parse(sessionStorage.getItem("setQuote"));return T=e(o,t),G(T)}e.scrollTop(0);var $,x,T,R,B,F,E,M,O,k,N,J,D,K,_,w,Q,U,W,q,L=(d.$state.current.name,[]);s.calculator={},s.form={},s.calc={},s.area={estado:"",municipio:""},s.form.PozosProyecto1="",s.form.PozosProyecto2="",s.form.RejillasProyecto1="",s.form.RejillasProyecto2="",s.form.CocherasProyecto1="",s.form.CocherasProyecto2="",s.biciestacionamiento="",s.calc.bicie="",s.submitted="",s.k_u=!1,s.resultado=null,R=sessionStorage.getItem("flagBicie"),B=sessionStorage.getItem("flagCocheras"),F=sessionStorage.getItem("flagPozos"),E=sessionStorage.getItem("flagRejillas"),M=sessionStorage.getItem("area"),O=sessionStorage.getItem("currentInfrastructure"),k=sessionStorage.getItem("modal"),N=sessionStorage.getItem("setQuote"),J=sessionStorage.getItem("state"),W=sessionStorage.getItem("Bicie"),L.push("flagPozos","flagRejillas","flagCocheras"),p(),s.Modal=function(){return y()},s.getType=function(e){if(w=D,x=angular.element(document.getElementById(U)),w&&(x?w.removeClass("radio_active"):x.removeClass("radio_active")),U=e.infraestructura,h(U),n.info("sessionStorage not empty"),e)switch(U){case"Ciclovia":s.calculator.tipo_calle="Primaria";break;case"Ciclocarril":s.calculator.tipo_calle="Secundaria";break;case"Busbici":s.calculator.tipo_calle="Primaria"}q=JSON.stringify(s.calculator),sessionStorage.setItem("setQuote",q),i.go("modalidades.calculadora.formulario")},null!==N&&(s.calculator=JSON.parse(N),n.info("sessionStorage not empty")),s.getKlValue=function(e){"true"==F&&"d"===s.pozos&&(e||void 0===s.tmPozos?b():e?(s.submitted=!0,_="",s.form.PozosProyecto1=_,s.calculator.PozosProyecto=s.form.PozosProyecto1,sessionStorage.setItem("flagPozos",!0),s.flagPozos=!0):(s.emptyWKl=!0,s.submitted=!1,s.form.PozosProyecto1="")),"false"===F&&"d"===s.pozos&&b(),null===F&&"d"===s.pozos&&b(),"true"===E&&"d"===s.rejillas&&(e||void 0===s.tmRejillas?P():e?(s.submitted=!0,Q="",s.form.RejillasProyecto1=Q,s.calculator.RejillasProyecto=s.form.RejillasProyecto1,sessionStorage.setItem("flagRejillas",!0),s.flagRejillas=!0):(s.emptyRKl=!0,s.submitted=!1,s.form.RejillasProyecto1="")),"false"===E&&"d"===s.rejillas&&P(),null===E&&"d"===s.rejillas&&P(),"true"===B&&"d"===s.cocheras&&(e||void 0===s.tmCocheras?S():e?(s.submitted=!0,$="",s.form.CocherasProyecto1=$,s.calculator.Cocheras=s.form.CocherasProyecto1,sessionStorage.setItem("flagCocheras",!0),s.flagCocheras=!0):(s.emptyCKl=!0,s.submitted=!1,s.form.CocherasProyecto1="")),"false"===B&&"d"===s.cocheras&&S(),null===B&&"d"===s.cocheras&&S()},s.getPozos=function(e){s.emptyWKl=void 0===s.calculator.KmEvaluables?!0:!1,"d"===e&&(s.pozos=e,s.calculator.PozosProyecto="",s.tmPozos,b(),_=parseInt(1e3*s.calculator.KmEvaluables/200),s.form.PozosProyecto1=_,s.calculator.PozosProyecto=s.form.PozosProyecto1),"c"===e&&(s.pozos=e,s.calculator.PozosProyecto="",s.tmPozos?(v(s.tmPozos),sessionStorage.setItem("flagPozos",!1),s.flagPozos=!1):(s.tmPozos=s.form.PozosProyecto1,s.form.PozosProyecto1=null),s.firstPozo=function(e){v(e),sessionStorage.setItem("flagPozos",!1),s.flagPozos=!1})},s.getRejillas=function(e){s.emptyRKl=void 0===s.calculator.KmEvaluables?!0:!1,"d"===e&&(s.rejillas=e,s.calculator.RejillasProyecto="",s.tmRejillas,P(),Q=parseInt(1e3*s.calculator.KmEvaluables/200),s.form.RejillasProyecto1=Q,s.calculator.RejillasProyecto=s.form.RejillasProyecto1),"c"===e&&(s.rejillas=e,s.calculator.RejillasProyecto="",s.tmRejillas?(C(s.tmRejillas),sessionStorage.setItem("flagRejillas",!1),s.flagRejillas=!1):(s.tmRejillas=s.form.RejillasProyecto1,s.form.RejillasProyecto1=null),s.firstRejilla=function(e){C(e),sessionStorage.setItem("flagRejillas",!1),s.flagRejillas=!1})},s.getCocheras=function(e){s.emptyCKl=void 0===s.calculator.KmEvaluables?!0:!1,"d"===e&&(s.cocheras=e,s.calculator.Cocheras="",s.tmCocheras,S(),$=parseInt(25*s.calculator.KmEvaluables),s.form.CocherasProyecto1=$,s.calculator.Cocheras=s.form.CocherasProyecto1),"c"===e&&(s.cocheras=e,s.calculator.Cocheras="",s.tmCocheras?(z(s.tmCocheras),sessionStorage.setItem("flagCocheras",!1),s.flagCocheras=!1):(s.tmCocheras=s.form.CocherasProyecto1,s.form.CocherasProyecto1=null),s.firstCochera=function(e){z(e),sessionStorage.setItem("flagCocheras",!1),s.flagCocheras=!1})},s.getBiciE=function(e){"default"===e&&(s.biciestacionamiento=e,s.tmBicie,j(),sessionStorage.setItem("flagBicie",!0),s.flagBicie=!0),"c"===e&&(s.biciestacionamiento=e,s.firstBiciE=function(e){A(e),sessionStorage.setItem("flagBicie",!1),s.flagBicie=!1})},s.saveQuote=function(e,o){var t=sessionStorage.getItem("modal");if(e.$valid===!0){var a=JSON.stringify(o);sessionStorage.setItem("setQuote",a),t?(n.info("Sin modal"),I()):(n.warn("Lanzando Modal"),y())}else n.info("Formulario no válido"),s.calculatorForm.submitted=!0};var G=function(o){n.info("Enviando formulario"),m.sendQuote(o).then(function(o){o&&(e.scrollTop(0),sessionStorage.setItem("results",JSON.stringify(o)),i.go("modalidades.calculadora.resumen"),n.info("Ok"))},function(e){n.error("Error: "+e)})}};e.$inject=["$document","$timeout","$modal","$modalStack","$window","$scope","$location","$state","$log","$filter","SendQuote","$stateParams","$rootScope","Mun"],angular.module("emus.form",[]).controller("FormController",e)}(),function(){"use strict";function e(){var e='<input type="number" class="form-control" ng-change="getKlValue(calculator.KmEvaluables)" placeholder="ejemplo: 00.00" step="0.01" required>';return{restrict:"EA",template:e,require:"ngModel",replace:!0}}angular.module("emus.form.directives",[]).directive("kilometerField",e)}(),function(){angular.module("emus.form.factory",[]).factory("SendQuote",["$http","$q",function(e,o){return{sendQuote:function(t){var a=JSON.stringify(t),l=o.defer(),s=e({method:"POST",url:"api/index.php/estimate",data:a,headers:{"Content-Type":"application/json"}});return s.then(function(e){l.resolve(e.data.results)},function(e){l.reject(e)}),l.promise}}}])}(),function(){angular.module("emus.form.factory.mun",[]).factory("Mun",["$http","$q",function(e,o){return{getMun:function(t){var a=o.defer(),l=e.get("./components/calculator/claves/"+t+".json");return l.then(function(e){a.resolve(e.data)},function(e){a.reject(e)}),a.promise}}}])}(),function(){"use strict";var e=function(e,o,t,a,l,s,r,i,n,c){function m(){y=sessionStorage.getItem("area"),h=sessionStorage.getItem("setQuote"),p=JSON.parse(sessionStorage.getItem("estado")),v=JSON.parse(sessionStorage.getItem("municipio")),y&&(P=JSON.parse(y),s.k_u=!0,u(P.estado))}function u(e){c.getMun(e).then(function(e){s.municipios=e},function(e){i.error("Error: "+e)})}function d(){function e(e,o){b={};for(var t in e)b[t]=e[t];for(var t in o)b[t]=o[t];return b}var o=JSON.parse(sessionStorage.getItem("area")),t=JSON.parse(sessionStorage.getItem("setQuote"));return g=e(o,t),f(g)}function f(o){i.info("Enviando formulario"),n.sendQuote(o).then(function(o){o&&(e.scrollTop(0,1e3),s.own=o.options,s.result=o,r.go("modalidades.calculadora.resumen"),i.info("Ok"))},function(e){i.error("Error: "+e)})}var p,g,y,h,b,v,P;s.area=o,m(),s.estados=[{est:"Aguascalientes",cveestado:1},{est:"Baja California",cveestado:2},{est:"Baja California Sur",cveestado:3},{est:"Campeche",cveestado:4},{est:"Chiapas",cveestado:7},{est:"Chihuahua",cveestado:8},{est:"Coahuila",cveestado:5},{est:"Colima",cveestado:6},{est:"Distrito Federal",cveestado:9},{est:"Durango",cveestado:10},{est:"Guanajuato",cveestado:11},{est:"Guerrero",cveestado:12},{est:"Hidalgo",cveestado:13},{est:"Jalisco",cveestado:14},{est:"México",cveestado:15},{est:"Michoacán de Ocampo",cveestado:16},{est:"Morelos",cveestado:17},{est:"Nayarit",cveestado:18},{est:"Nuevo León",cveestado:19},{est:"Oaxaca",cveestado:20},{est:"Puebla",cveestado:21},{est:"Querétaro",cveestado:22},{est:"Quintana Roo",cveestado:23},{est:"San Luis Potosí",cveestado:24},{est:"Sinaloa",cveestado:25},{est:"Sonora",cveestado:26},{est:"Tabasco",cveestado:27},{est:"Tamaulipas",cveestado:28},{est:"Tlaxcala",cveestado:29},{est:"Veracruz",cveestado:30},{est:"Yucatán",cveestado:31},{est:"Zacatecas",cveestado:32}],s.stateChanged=function(e){s.estados.some(function(o){o.est===e&&(u(o.cveestado),p={estado:o.cveestado},sessionStorage.setItem("estado",JSON.stringify(p)))})},s.munChanged=function(e){s.municipios.some(function(o){o.mun===e&&(v={municipio:o.cvemun},sessionStorage.setItem("municipio",JSON.stringify(v)))})},s.saveArea=function(){function e(e){var o={estado:e.estado,municipio:e.municipio};o=JSON.stringify(o),sessionStorage.setItem("modal",o)}function o(e,o){b={};for(var t in e)b[t]=e[t];for(var t in o)b[t]=o[t];return b}e(s.area),g=o(p,v),P=JSON.stringify(g),sessionStorage.setItem("area",P),sessionStorage.setItem("state","true"),t.close(),null!==h&&(d(),t.close(),sessionStorage.setItem("state","true"))},s.updateArea=function(){function e(e){var o={estado:e.estado,municipio:e.municipio};o=JSON.stringify(o),sessionStorage.setItem("modal",o)}function o(e,o){b={};for(var t in e)b[t]=e[t];for(var t in o)b[t]=o[t];return b}e(s.area),g=o(p,v),P=JSON.stringify(g),sessionStorage.setItem("area",P),sessionStorage.setItem("state","true"),t.close()},s.notYet=function(){sessionStorage.setItem("state","false"),t.close("notYet")}};e.$inject=["$document","area","$modalInstance","$modal","$modalStack","$scope","$state","$log","SendQuote","Mun"],angular.module("emus.modal.controller",[]).controller("ModalController",e)}(),function(){"use strict";var e=function(e,o,t,a,l,s,r,i,n,c,m,u){function d(){b=sessionStorage.getItem("results"),g=JSON.parse(sessionStorage.getItem("modal")),v=JSON.parse(b),console.log(v),h=v.options,y=v,s.inputResult=v,b&&f(v),s.first={open:!1}}function f(e){P=e.ingresos.porcentajes,C=e.ingresos.porcentajes1000,delete P.cveestado,delete P.nomestado,delete C.cveestado,delete C.nomestado,S=e.egresos.porcentajes,z=e.egresos.porcentajes1000,delete S.cveestado,delete S.nomestado,delete z.cveestado,delete z.nomestado;AmCharts.makeChart("Ingresos",{type:"serial",theme:"light",rotate:!0,legend:{autoMargins:!1,borderAlpha:.2,equalWidths:!0,horizontalGap:10,markerSize:10,useGraphSettings:!0,valueAlign:"left",valueWidth:0},dataProvider:[{titulo:"Ingresos Promedio",im5:P.im5,im8:P.im8,im11:P.im11,im14:P.im14,im17:P.im17,im20:P.im20,im23:P.im23,im26:P.im26,im29:P.im29,im32:P.im32,im35:P.im35},{titulo:"Ingresos cada 1000 hab.",im5:C.im6,im8:C.im9,im11:C.im12,im14:C.im15,im17:C.im18,im20:C.im21,im23:C.im24,im26:C.im27,im29:C.im30,im32:C.im33,im35:C.im36}],valueAxes:[{stackType:"100%",axisAlpha:0,gridAlpha:0,labelsEnabled:!0,position:"top"}],graphs:[{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Impuestos",type:"column",valueField:"im5"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Cuotas y Aportaciones de Seguridad Social",type:"column",valueField:"im8"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Contribuciones de Mejoras",type:"column",valueField:"im11"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Derechos",type:"column",valueField:"im14"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Productos",type:"column",valueField:"im17"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Aprovechamientos",type:"column",valueField:"im20"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Participaciones federales",type:"column",valueField:"im23"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Aportaciones federales y estatales",type:"column",valueField:"im26"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Otros ingresos",type:"column",valueField:"im29"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Financiamiento",type:"column",valueField:"im32"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Disponibilidad inicial",type:"column",valueField:"im35"}],marginTop:30,marginRight:20,marginLeft:80,marginBottom:40,autoMargins:!1,categoryField:"titulo",categoryAxis:{gridPosition:"middle",axisAlpha:0,gridAlpha:0,ignoreAxisWidth:!0,autoWrap:!0},"export":{enabled:!0}}),AmCharts.makeChart("Egresos",{type:"serial",theme:"light",rotate:!0,legend:{autoMargins:!1,borderAlpha:.2,equalWidths:!0,horizontalGap:10,markerSize:10,useGraphSettings:!0,valueAlign:"left",valueWidth:0},dataProvider:[{titulo:"Egresos Promedio",em4:S.em4,em7:S.em7,em10:S.em10,em13:S.em13,em16:S.em16,em19:S.em19,em22:S.em22,em25:S.em25,em28:S.em28,em31:S.em31},{titulo:"Egresos cada 1000 hab.",em4:z.em5,em7:z.em8,em10:z.em11,em13:z.em14,em16:z.em17,em19:z.em20,em22:z.em23,em25:z.em26,em28:z.em29,em31:z.em32}],valueAxes:[{stackType:"100%",axisAlpha:0,gridAlpha:0,labelsEnabled:!0,position:"top"}],graphs:[{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Impuestos",type:"column",valueField:"em4"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Cuotas y Aportaciones de Seguridad Social",type:"column",valueField:"em7"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Contribuciones de Mejoras",type:"column",valueField:"em10"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Derechos",type:"column",valueField:"em13"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Productos",type:"column",valueField:"em16"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Aprovechamientos",type:"column",valueField:"em19"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Participaciones federales",type:"column",valueField:"em22"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Aportaciones federales y estatales",type:"column",valueField:"em25"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Otros ingresos",type:"column",valueField:"em28"},{balloonText:"[[title]], [[category]]<br><span style='font-size:14px;'><b>[[value]]</b> ([[percents]]%)</span>",fillAlphas:.9,fillColorsField:"color",fontSize:11,labelText:"[[percents]]%",lineAlpha:.5,title:"Financiamiento",type:"column",valueField:"em31"}],marginTop:30,marginRight:20,marginLeft:80,marginBottom:40,autoMargins:!1,categoryField:"titulo",categoryAxis:{gridPosition:"middle",axisAlpha:0,gridAlpha:0,ignoreAxisWidth:!0,autoWrap:!0}})}function p(e){var o=0;for(var t in e)e.hasOwnProperty(t)&&(o+=parseFloat(e[t]));return o}var g,y,h,b,v,P,C,S,z;d(),"ObraCompl_Completa"===h.ObraComp&&(s.ObraComp="Pintura en cruces peatonales, bolardos, banqueta y guías táctiles."),"ObraCompl_Semi"===h.ObraComp&&(s.ObraComp="Sólo pintura en cruces peatonales y bolardos."),"ObraCompl_Basica"===h.ObraComp&&(s.ObraComp="Sólo pintura en cruces peatonales."),"BacheoSuperficial"===h.TipoDeBacheo&&(s.TipoDeBacheo="Bacheo superficial"),"Slurry"===h.TipoDeBacheo&&(s.TipoDeBacheo="Bacheo tipo slurry"),"BacheoProfundo"===h.TipoDeBacheo&&(s.TipoDeBacheo="Bacheo profundo"),"BacheoPromedio"===h.TipoDeBacheo&&(s.TipoDeBacheo="Bacheo promedio"),"MinSenalHor"===h.senalizacion&&(s.senalizacion="Los mínimos requeridos (señalización horizontal)"),"MaxSenalHor"===h.senalizacion&&(s.senalizacion="Señalización completa (señalización horizontal, señalización vertical)"),s.MantenimientoAnual="SinMantAnual"===h.MantenimientoAnual?"Sin mantenimiento anual":"Con mantenimiento anual",s.infraestructura=h.infraestructura,s.tipo_calle=h.tipo_calle,s.KmEvaluables=h.KmEvaluables,s.Anchoefectivo=h.Anchoefectivo,s.Sentidos=h.Sentidos,s.AnchoCalle=h.AnchoCalle,s.IntersSemaf=h.IntersSemaf,s.IntersTotales=h.IntersTotales,s.PozosProyecto=h.PozosProyecto,s.RejillasProyecto=h.RejillasProyecto,s.Cocheras=h.Cocheras,s.Biciestacionamientos=h.Biciestacionamientos,s.modalidad="Calles",s.area=g.municipio?g.estado+" - "+g.municipio:g.estado,delete y.egresos,delete y.ingresos,delete y.options,y.horizontal=y.senalizacion.horizontal,y.vertical=y.senalizacion.vertical,y.seleccionada=y.senalizacion.seleccionada,delete y.senalizacion,s.total=p(y),s.createPdf=function(){var e=new jsPDF("p","pt","a4");e.addHTML(document.body,function(){e.save("demo.pdf")})}};e.$inject=["$document","$timeout","$modal","$modalStack","$window","$scope","$location","$state","$log","$filter","$stateParams","$rootScope"],angular.module("emus.summary",[]).controller("SummaryController",e)}(),function(){angular.module("emus.modality.factory",[]).factory("ModalityFactory",["$http","$q",function(e,o){return{getModality:function(t){var a=o.defer(),l=e.get("http://52.8.65.73/emus-itdp/api/index.php/modalidades/"+t);return l.then(function(e){a.resolve(e.data.results[0])},function(e){a.reject(e)}),a.promise}}}])}(),function(){"use strict";var e=function(e,o,t,a,l,s){var r=a.tipo;s.getModality(r).then(function(e){o.set_m=e,console.log(o.set_m)},function(o){e.error(o)})};e.$inject=["$log","$scope","$rootScope","$stateParams","$state","ModalityFactory"],angular.module("emus.modalities.type",[]).controller("ModalityTypeController",e)}(),function(){"use strict";function e(e){var o;return{restrict:"A",scope:{closeId:"=hideDescription"},link:function(e,t){t.bind("click",function(){o=angular.element(document.getElementById(e.closeId)),o.removeClass("more")})}}}e.$inject=["$log"],angular.module("emus.modality.hide.directive",[]).directive("hideDescription",e)}(),function(){"use strict";function e(e){var o,t;return{restrict:"A",scope:{id:"=moreDescription"},link:function(e,a,l){a.bind("click",function(){t=o,o=angular.element(document.getElementById(e.id)),angular.equals(t,o)?[t="",o.addClass("more")]:o.addClass("more"),t&&(o?t.removeClass("more"):[o.removeClass("more"),o=""])})}}}e.$inject=["$log"],angular.module("emus.modality.more.directive",[]).directive("moreDescription",e)}(),function(){"use strict";function e(e){return{restrict:"A",scope:{projectStatus:"=projectActive"},link:function(e,o){console.log(e),"inactivo"===e.projectStatus&&($scope.project=!1,console.log($scope.project))}}}e.$inject=["$log","$scope"],angular.module("emus.modality.project.directive",[]).directive("projectActive",e)}();