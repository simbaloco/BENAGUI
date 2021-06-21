var formParametrosGenerales;
var btnGrabar;
var btnCerrar;


$(document).ready(function(){
	inicializarVariables();
	
	inicializarPantalla();
	inicializarComponentes();
});

function inicializarVariables() {
	formParametrosGenerales = $("#formParametrosGenerales");
	btnGrabar = $("#btnGrabar");
	btnCerrar = $("#btnCerrar");
}

function inicializarPantalla() {
	agregarEventoOnKeyPress();
}

function inicializarComponentes() {
	inicializarEventos();
}

function inicializarEventos() {
	
	btnGrabar.on("click", function(e) {
		grabarParametrosGenerales(e);
	});
	
	btnCerrar.on("click", function() {
		window.location.href = "/appkahaxi/principal";
	});
	
}

/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function agregarEventoOnKeyPress(){
	
	var input = jQuery("body").find('.form-control');
	var valida = jQuery("body").find('.invalid-feedback');
	var etiqueta = jQuery("body").find('.control');
	
	for(var i = 0; i < input.length ; i++){
		
		if (input[i].name == TipoCampo.ENTERO){
			$('#' + input[i].id).attr('onkeypress', 'return soloEnteros(event);');
		}
		
		$('#' + valida[i].id).text('Ingrese ' + etiqueta[i].value);
	}
	
	return true;
}


function obtenerValoresMatriz(){
	var array = [];
	
	var input = jQuery("body").find('.form-control');
	
	for (i = 0; i < input.length; i++) {
		array[i] = {};
		array[i]['codParametro'] = input[i].id;
		array[i]['valor'] = input[i].value;			
	};
	
	return array;	
}

function grabarParametrosGenerales(e){
	
	if (formParametrosGenerales[0].checkValidity() == false) {
        e.stopPropagation();
    }
	else{
		e.stopPropagation();
		registrarParametrosGenerales();		
	}	
	formParametrosGenerales.addClass('was-validated');
	
}

function registrarParametrosGenerales(){
	var matriz = obtenerValoresMatriz();
	
	var objetoJson = {
		lista:  matriz
	};
	
	var entityJsonStr = JSON.stringify(objetoJson);
	var formData = new FormData();
	
	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));
		
	$.ajax({
		type:"POST",
		contentType: false,
		processData: false,
		url : '/appkahaxi/actualizarParametrosGenerales/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){						
			if(xhr.status == HttpStatus.OK){
				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				window.location.href = "/appkahaxi/principal";
			}else if(xhr.status == HttpStatus.Accepted){
				mostrarMensajeValidacion(resultado);
			}
			loadding(false);
		},
		error: function (xhr, error, code){
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
		
}

