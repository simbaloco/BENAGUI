var tipoCambioModal;
var tipoCambio;
var grabarModal;
var fecha;

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables(){
	tipoCambioModal = $('#tipoCambioModal');
	tipoCambio = $('#tipoCambio');
	grabarModal = $('#grabarModal');
	fecha = $('#fecha');
}

function inicializarComponentes(){
	// este bloque permite que no se cierre la pantalla modal
    tipoCambioModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });

	tipoCambioModal.on('shown.bs.modal', function() {
	  tipoCambio.focus();
	})

	grabarModal.on("click", function(event) {
		grabar(event);
	});	
	
	tipoCambio.on("keydown", function(e) {
		tcKeyDown(e);
	});
}

function inicializarPantalla(){
	obtenerTC();
}


function obtenerTC(){
	console.log("obtenerTC...entrando");
	// obteniendo dia, mes y año
	var f = new Date();
	var nombreDia = f.getDay();
	var dia = f.getDate();
	var mes = f.getMonth() + 1;
	var anio = f.getFullYear();
	console.log("dia-->" + dia + "/mes-->" + mes + "/año-->" + anio);
	var fechaMostrar = diasSemana[nombreDia] + ", " + dia + " de " + meses[mes] + " del " + anio
	console.log("fecha full--->" + fechaMostrar);
	$.ajax({
        type:"Get",
        contentType: false,
        processData: false,
        url : '/appkahaxi/buscarTc/' + dia + '/' + mes + '/' + anio,
        data: null,
		beforeSend: function(xhr) {
        	console.log("obtenerTC...beforesend, loading.....");
        	loadding(true);
        },
		success:function(resultado,textStatus,xhr){
        	console.log("obtenerTC resultado--->" + resultado);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		console.log("obtenerTC respondio exito.....");
				if(resultado == ''){
					console.log("no hay valores para TC para el día de hoy...");
					// abrir modal para ingresar TC
					mostrarModal(tipoCambioModal);
					fecha.val(fechaMostrar);
					//tipoCambio.focus();
				}
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("obtenerTC, Accepted....");
            	mostrarMensajeError(resultado);
            }
        	
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("obtenerTC, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });
}

function grabar(event){
	var form = $("#form-tc")
	event.preventDefault();
    if (form[0].checkValidity() === false) {
		console.log("validado FALSE!!!....")
        
        event.stopPropagation();
    }else{
		event.stopPropagation();
		console.log("entrando validado....")
		registrarTc();
		
	}
	form.addClass('was-validated');
}

function registrarTc(){
	console.log("registrarTc...entrando");
	// obteniendo dia, mes y año
	var f = new Date();
	var dia = f.getDate();
	var mes = f.getMonth() + 1;
	var anio = f.getFullYear();
	var tc = tipoCambio.val();
	console.log("dia-->" + dia + "/mes-->" + mes + "/año-->" + anio);
	console.log("tc--->" + tc);
	var objetoJson = {
		dia		:	dia,
		mes		:  	mes,
		anio	:   anio,
		tc		:   tc
    };
    var entityJsonStr = JSON.stringify(objetoJson);
    console.log("entityJsonStr-->" + entityJsonStr);
    var formData = new FormData();
    formData.append('registro', new Blob([entityJsonStr], {
        type: "application/json"
    }));
	
    $.ajax({
        type:"POST",
        contentType: false,
        processData: false,
        url : '/appkahaxi/registrarTc/',
        data: formData,										  
        beforeSend: function(xhr) {
        	console.log("registrarTc...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	//console.log("registrarCotizacionVenta, success--->" + xhr.status);
        	console.log("resultado--->" + resultado);
        	//var resultado = JSON.parse(result);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("Se grabó el Tipo de Cambio correctamente.", "success");
        		ocultarModal(tipoCambioModal);
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("registrarTc, Accepted....");
            	mostrarMensajeError(resultado);
            }
        	
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("registrarTc, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });
}

function tcKeyDown(e) {
	var key = window.Event ? e.which : e.keyCode;
	console.log("tcKeyDown, key-->" + key);
	// si es ENTER
	if (key == 13) {
		console.log("es enter");
		grabarModal.click();
	}
}

