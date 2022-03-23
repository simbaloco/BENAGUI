// campos de formulario principal
var formSerie;
var campoBuscar;
// campos de formulario modal
var form_validado_serie;
var form_serieModal;
var campoBuscar;
var tipoDocumento;
var titulo;
var divCodigo;
var divActivo;
var codigoModal;
var tipodocModal;
var descripcionModal;
var activoModal;
var nroserieModal;
var correlativoModal;
var maxcorrelativoModal;
// botones
var btnLimpiar;
var btnNuevo;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaSerie;
var dataTableSerie;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/
$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables(){
	formSerie = $('#formSerie');
	campoBuscar = $('#campoBuscar');
	form_validado_serie = $('#form_validado_serie');
	form_serieModal = $('#form_serieModal');
	tipoDocumento = $('#tipoDocumento');
	titulo = $('#titulo');
	divCodigo = $('#divCodigo');
	divActivo = $('#divActivo');
	codigoModal = $('#codigoModal');
	tipodocModal = $('#tipodocModal');
	descripcionModal = $('#descripcionModal');
	activoModal = $('#activoModal');
	nroserieModal = $('#nroserieModal');
	correlativoModal = $('#correlativoModal');
	maxcorrelativoModal = $('#maxcorrelativoModal');
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	tablaSerie = $('#tablaSerie');
}

function inicializarComponentes(){
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla(){	
	campoBuscar.focus();
}

function inicializarEventos(){
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp();
	});
	
	form_serieModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_serieModal.on('shown.bs.modal', function (){
	  tipodocModal.trigger('focus');
	})
		
	tipoDocumento.on('click', function (e) {
		buscar();
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_serie.removeClass('was-validated'); 
    	cargarModalSerie(null, Opcion.NUEVO);
	});
		
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_serie[0].checkValidity() === false) {
            e.stopPropagation();
			console.log("if btn grabar");
        }else{
			console.log("else btn grabar");
        	registrarSerie();
        }
    	form_validado_serie.addClass('was-validated');
	});
	
	btnCerrarModal.on("click", function() {
		form_serieModal.modal('hide');
	});
	
	correlativoModal.on('keypress', function(event){
		return soloEnteros(event);
	});
	
	maxcorrelativoModal.on('keypress', function(event){
		return soloEnteros(event);
	});
	
}


function inicializarTabla(){
	
	dataTableSerie = tablaSerie.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 	= campoBuscar.val().trim();
				d.tipoDoc		= (tipoDocumento.val() == CADENA_VACIA) ? 0 : tipoDocumento.val();
		    },
            url: '/appkahaxi/listarSeries/',
                dataSrc: function (json) {
				console.log("listarSeries...success");
            	return json;
            },
            error: function (xhr, error, code){
				
            }
        },
            "responsive"	: false,
	        "scrollCollapse": false,
			"ordering"      : true,
	        "dom"			: '<ip<rt>lp>',
        	"lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
	        "deferRender"   : true,
	        "autoWidth"		: false,
            "columnDefs"    : [
                {
                    "width": "3px",
                    "targets": 0,
                    "data": "id"
                },
                {
                    "width": "25px",
                    "targets": [1],
                    "data": "codSerie"
                },				
				{
                    "width": "35px",
                    "targets": [2],
                    "data": "desTipoDocumento"                    
                },
                {
                    "width": "35px",
                    "targets": [3],
                    "data": "nroSerie"
                },
                {
                    "width": "35px",
                    "targets": [4],
                    "data": "correlativo"
                },
				{
                    "width": "35px",
                    "targets": [5],
                    "data": "maxcorrelativo"
                },				
				{
                    "width": "3px",
                    "targets": [6],
                    "data": "activo",
                    render: function(data, type, row) {
                        if (data === 1) {
                            return '<input type="checkbox" class="editor-active" onclick="return false;" checked>';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    },
                    className: "dt-body-center text-center"
            	},
                {
                    "width": "20px",
                    "targets": [7],
                    "className": "dt-body-center",
                    "orderable": false,
					"render":
                    function (data, type, row ) {
                    	return  "<div style='display:flex;justify-content:space-around;'>" +
                        			"<button title='Ver' class='btn-view btn btn-info btn-xs'>" +
							                    "<span><i class=\"fas fa-eye\"></i></span>" +
							                "</button>" +											
							                "<button title='Modificar' class='btn-edit btn btn-primary btn-xs'>" +
                                                "<span><i class=\"fas fa-edit\"></i></span>" +
                                            "</button>" +
				                "</div>";
                    }
                }
             ],
             "fnRowCallback":
                 function(row, aData, iDisplayIndex, iDisplayIndexFull){
                    var index = iDisplayIndexFull + 1;
                    $('td:eq(0)', row).html(index);
					
					// modificando el tamaño de los caracteres del listado
					$(row).addClass("listado-tam-caracteres");
                    return row;
                 },
             "language"  : {
                "url": "/appkahaxi/language/Spanish.json"
            }
    });
		
	$('#tablaSerie tbody').on( 'click','.btn-view', function (){
	    var data = dataTableSerie.row( $(this).closest('tr')).data();	    
		console.log('ver serie --->' + data.codSerie);
		cargarSerie(data.codSerie, Opcion.VER);
	});
	
	$('#tablaSerie tbody').on( 'click','.btn-edit', function (){
	    var data = dataTableSerie.row( $(this).closest('tr')).data();
		console.log('editar serie --->' + data.codSerie);
		cargarSerie(data.codSerie, Opcion.MODIFICAR);
	});
	
}



/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(){
	var datoBuscar = campoBuscar.val().trim();
	console.log('datoBuscar--->' + datoBuscar);
	buscar();
	
}

function buscar(){
	var form1 = formSerie;

	if ( $.fn.dataTable.isDataTable(tablaSerie)) {
		dataTableSerie.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableSerie.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function cargarModalSerie(serie, opcion){
		if(opcion == Opcion.NUEVO){
			console.log("cargarModalSerie---> NUEVO");
			tipodocModal.val(CADENA_VACIA);
			descripcionModal.val(CADENA_VACIA);
	        nroserieModal.val(CADENA_VACIA);
			correlativoModal.val(CADENA_VACIA);
			maxcorrelativoModal.val(CADENA_VACIA);
			activoModal.prop('checked', true);		
			titulo.text(DescripcionOpcion.DES_NUEVA);
			
			codigoModal.val('0');
			ocultarControl(divCodigo);
			ocultarControl(divActivo);
			habilitarControl(tipodocModal);
			habilitarControl(descripcionModal);
			habilitarControl(nroserieModal);
			habilitarControl(correlativoModal);
			habilitarControl(maxcorrelativoModal);	
			mostrarControl(btnGrabarModal);			
		}
		
		if(opcion == Opcion.MODIFICAR || opcion == Opcion.VER){
			// cargando valores
			mostrarControl(divCodigo);
			mostrarControl(divActivo);
			codigoModal.val(serie.codSerie);
			tipodocModal.val(serie.tipoDocumento);
			descripcionModal.val(serie.descripcion);
			nroserieModal.val(serie.nroSerie);
	        correlativoModal.val(serie.correlativo);
			maxcorrelativoModal.val(serie.maxcorrelativo);
			
	        if(serie.activo == 1){
				activoModal.prop('checked', true);
			}
			else{
				activoModal.prop('checked', false);
			}
			
			if(opcion == Opcion.VER){
				titulo.text(DescripcionOpcion.DES_VER);
				deshabilitarControl(codigoModal);
				deshabilitarControl(tipodocModal);
				deshabilitarControl(descripcionModal);
				deshabilitarControl(nroserieModal);
				deshabilitarControl(correlativoModal);
				deshabilitarControl(maxcorrelativoModal);			
				deshabilitarControl(activoModal)
				ocultarControl(btnGrabarModal);				
			}
			
			if(opcion == Opcion.MODIFICAR){
				titulo.text(DescripcionOpcion.DES_MODIFICAR);
				deshabilitarControl(codigoModal);
				deshabilitarControl(tipodocModal);
				habilitarControl(descripcionModal);
				habilitarControl(nroserieModal);
				habilitarControl(correlativoModal);
				habilitarControl(maxcorrelativoModal);
				habilitarControl(activoModal);
				mostrarControl(btnGrabarModal);				
			}
			
		}
		
	    // mostrando modal
	    mostrarModal(form_serieModal);
}

function cargarSerie(codSerie, opcion){
	
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarSerie/' + codSerie, 
        data : null,
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){
			
			if(xhr.status == HttpStatus.OK){
                var data = JSON.parse(result);
                cargarModalSerie(data, opcion);
            }
			loadding(false);			
        }
    });
}


function registrarSerie(){	
	var activo;
	var iOpcion;
	
	(codigoModal.val() == 0 || codigoModal.val() == CADENA_VACIA) ? iOpcion = Opcion.NUEVO: iOpcion = Opcion.MODIFICAR;
	activo = (activoModal.is(':checked')) ? 1 : 0;
	
	var objetoJson = {
		opcion			: iOpcion,
		codSerie		: codigoModal.val(),
		tipoDocumento	: tipodocModal.val(),
		descripcion		: descripcionModal.val(),
		activo			: activo,
		nroSerie		: nroserieModal.val(),
		correlativo		: correlativoModal.val(),
		maxcorrelativo	: maxcorrelativoModal.val()
	};
	
	var entityJsonStr = JSON.stringify(objetoJson);
	console.log("entityJsonStr: " + entityJsonStr);
	var formData = new FormData();
	
	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));

	$.ajax({
		type:"POST",
		contentType: false,
		processData: false,
		url : '/appkahaxi/registrarSerie/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){
			if(xhr.status == HttpStatus.OK){
				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				btnCerrarModal.click();
				buscar();
			}else if(xhr.status == HttpStatus.Accepted){
				mostrarMensajeValidacion(resultado, tipodocModal);
			}
			loadding(false);
		},
		error: function (xhr, error, code){
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});	
}

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	tipoDocumento.val(CADENA_VACIA);	
	buscar();
	campoBuscar.focus();
}

