// campos de formulario principal y modal
var igv;
var igvModal;
var form_validado_Igv;
// botones
var btnGrabarModal;
var btnCerrarModal;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();	
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	igv = $('#igv');
	igvModal = $('#igvModal');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');	
	form_validado_Igv = $("#form-validado-igv");
}

function inicializarComponentes() {
	inicializarEventos();
	inicializarIgv();
}

function inicializarPantalla() {
	mostrarModal(igvModal);
}

function inicializarEventos(){
	
	igvModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	igvModal.on('shown.bs.modal', function () {
		igv.trigger('focus');		
	})
		
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_Igv[0].checkValidity() == false) {
            e.stopPropagation();
        }else{
        	modificarIgv();
        }
    	form_validado_Igv.addClass('was-validated');
	});
}

/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/


function inicializarIgv() {
	
	$.ajax({
        type:"Get",
        contentType: false,
        processData: false,
        url : '/appkahaxi/buscarIgv/',
        data: null,										  
        beforeSend: function(xhr) {
        	console.log("buscarIgv...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	console.log("buscarIgv--->" + resultado);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		igv.val(resultado);
            }
			else if(xhr.status == HttpStatus.Accepted){
            	console.log("buscarIgv, Accepted....");
            	mostrarMensajeValidacion(resultado, igv);
            }
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("buscarIgv, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });

	
};


function modificarIgv(){
	console.log("modificarIgv...entrando");	
	var valIgv = igv.val();

    // guardando en una variable FormData
	var data = new FormData();
    data.append('igv', valIgv);
    
    $.ajax({
        type:"POST",
        cache: false,
        contentType: false,
        processData: false,
        url : '/appkahaxi/modificarIgv/',
        enctype: 'multipart/form-data',
        data: data,										  
        beforeSend: function(xhr) {
        	console.log("modificarIgv...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	console.log("resultado--->" + resultado);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("El registro fué grabado correctamente.", "success");
        		ocultarModal(igvModal);
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("modificarIgv, Accepted....");
            	mostrarMensajeValidacion(resultado, igv);
            }        	
        	loadding(false);
        },
        error: function (xhr, error, code){
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });
}




