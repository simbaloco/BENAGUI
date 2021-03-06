$(document).ready(function () {
		
    var urlMenu = window.location.protocol+'//'+window.location.host+'/appkahaxi/cargarMenu';
    $.get(urlMenu, function (listaOpciones) {
        //console.log("Informacion", listaOpciones);
        var listPadrePrincipales = getPadrePrincipales(listaOpciones);
        for (var opcion of listPadrePrincipales) {
            esPadre(opcion, listaOpciones)			
        }
    });

    function getPadrePrincipales(listaOpciones) {
        var listPadrePrincipales = new Array();
        for (var opcion of listaOpciones) {
            if (opcion.nivel == 0) {
                listPadrePrincipales.push(opcion);
            }
        }
        //console.log(listPadrePrincipales);
        return listPadrePrincipales;
    }

    function esPadre(opcion, listaOpciones) {
        //console.log("Sera padre", opcion);
        if (opcion.url == '#') {
            //console.log("Si es padre", opcion);
            crearPadre(opcion);
            buscarHijos(opcion, listaOpciones);
        } else {
            //console.log("Si es hijo", opcion);
            crearHijo(opcion);
        }
    }

    function buscarHijos(opcion, listaOpciones) {
        //console.log("Buscando Hijos");
        for (var hijo of listaOpciones) {
            if (hijo.idPadre == opcion.id) {
                esPadre(hijo, listaOpciones);
            }
        }
    }

    function crearPadre(opcion) {
        var idDominio = "#Opcion" + opcion.idPadre;
        var idLista = "Opcion" + opcion.id;

        console.log("Icono", opcion.icono);
        //console.log("idDominio", idDominio);
        //console.log("idLista", idLista);
        var paddingleft = 20 + 7 * opcion.nivel;

		var insertHtml = 	"<li class='closed' style='padding:10px 25px 10px 0;'>" +
	        					"<a  href='#' style='padding-left:" + paddingleft + "px;'><span class='" + opcion.icono + "'></span>" + opcion.descripcion + "</a> " +
								"<ul class='collapse nav-submenu'  id='" + idLista + "'></ul>" +
	        					/*"<ul class='collapse nav-submenu' style='box-shadow:0 0 30px rgb(255 255 255 / 40%);' id='" + idLista + "'></ul>" +*/
        					"</li>";

        $(idDominio).append(insertHtml);

    }

    function crearHijo(opcion) {
        //console.log("*************** inicio crear hijo *************");
    	var idDominio = "#Opcion" + opcion.idPadre;
    	//console.log("idDominio--->" + idDominio);
        var idHijo = "Opcion" + opcion.id;
        //console.log("idHijo--->" + idHijo);
        var attrlink = opcion.url;
        //console.log("attrlink--->" + attrlink);
        
        var paddingleft = 20 + 10 * opcion.nivel;

        var insertHtml = 	"<li>" +
        						"<a id='" + idHijo + "' style='padding: 10px 20px;padding-left:" + paddingleft + "px;'>" + opcion.descripcion + "</a>" +
        					"</li>";

        $(idDominio).append(insertHtml);
        $("#" + idHijo).attr('href', attrlink);
        //console.log("*************** fin crear hijo *************");
    }
	
	//Codigo para mostrar men?? responsivo
	var contador = 1;
	function main(){
		$('.menu_bar').click(function(){
			if(contador == 1){
				$('nav').animate({
					left: '0'
				});
				contador = 0;
			} else {	
				contador = 1;
				$('nav').animate({
					left: '-100%'
				});
			} 
		});
	};
	main();	

});

