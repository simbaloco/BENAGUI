// campos globales de catalogo
var desCatalogo;
var flagSunat;
// campos de formulario principal
var formDataCatalogo;
var tipoMantenimiento;
var campoBuscar;
var titulo;
var tituloBusqueda;
// campos de formulario modal
var form_validado_dataCatalogo;
var form_dataCatalogoModal;
var idDC;
var divCodigo;
var divActivo;
var codigoModal;
var descripcionModal;
var activoModal;
// botones
var btnLimpiar;
var btnNuevo;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaDataCatalogo;
var dataTableDataCatalogo;

/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {		
	inicializarVariables();
	parametrizacionTipoCatalogo();
	inicializarComponentes();
	inicializarPantalla();

});

function inicializarVariables() {
	tipoMantenimiento = $('#tipoCatalogo');
	formDataCatalogo = $('#formMntoDataCatalogo');
	form_validado_dataCatalogo = $("#form_validado_dataCatalogo");
	form_dataCatalogoModal = $("#dataCatalogoModal");
	campoBuscar = $('#campoBuscar');	
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	titulo = $('#titulo');
	tituloBusqueda = $("#titBusqueda");
	idDC = $("#idDataCatalogo");
	divCodigo = $("#divCodigo");
	divActivo = $("#divActivo");
	codigoModal = $("#codigoModal");
	descripcionModal = $("#descripcionModal");
	activoModal = $("#activoModal")
	tablaDataCatalogo  = $('#tablaDatacatalogo');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {
	campoBuscar.focus();
	cargarFlagSunat();	
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-up');
    }).on('hide.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-down');
    });
}

function inicializarEventos(){
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
	});
	
	form_dataCatalogoModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_dataCatalogoModal.on('shown.bs.modal', function () {
		console.log('flagSunat--->' + flagSunat);
		if (flagSunat == 0) {
			descripcionModal.trigger('focus');
		}
		else{
			codigoModal.trigger('focus');
		}
	})
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_dataCatalogo.removeClass('was-validated'); 
    	cargarModalDataCatalogo(null, Opcion.NUEVO);
	});
	
	btnGrabarModal.on("click", function(e) {		
		e.preventDefault();
        if (form_validado_dataCatalogo[0].checkValidity() == false) {
            e.stopPropagation();
        }else{
			console.log('else registra--->');
        	registrarDataCatalogo();
        }
    	form_validado_dataCatalogo.addClass('was-validated');
	});
}
	
function inicializarTabla(){
	
	dataTableDataCatalogo = tablaDataCatalogo.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.codMaestro 		= tipoMantenimiento.text();
				d.codCatalogoPadre 	= CADENA_VACIA;
				d.codDataPadre 		= CADENA_VACIA;
				d.datoCliente 		= campoBuscar.val().trim();
		    },
            url: '/appkahaxi/buscarDataCatalogoLike/',
            dataSrc: function (json) {
				console.log("buscarDataCatalogoLike...success");
            	return json;
            },
            error: function (xhr, error, code){

            }
        },
        "responsive"	: false,
        "scrollCollapse": false,
		"ordering"      : true,
        "dom"           :   "<'row'<'col-sm-8'i><'col-sm-4'>>" +
			                "<'row'<'col-sm-12'rt>>" +
			                "<'row'<'col-sm-4'l><'col-sm-8'p>>",
		"lengthMenu"	: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        "deferRender"   : true,
        "autoWidth"		: false,
        "columnDefs"    : [
            {
                "width": "5px",
                "targets": [0],
                "data": "id"
            },
            {
                "width": "10px",
                "targets": [1],
                "data": "codData"
            },
            {
                "width": "75px",
                "targets": [2],
                "data": "descData"
            },
			{
                "width": "50px",
                "targets": [3],
                "data": "userRegistra"
            },
			{
                "width": "50px",
                "targets": [4],
                "data": "fechaRegistro"
            },
			{
                    "width": "5px",
                    "targets": [5],
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
                "width": "10px",
                "targets": [6],
                "data": "idDataCatalogo",
               "visible": false
            },            
            {
                    "width": "10px",
                    "targets": [7],
                    "className": "dt-center",
                    "data": null,
                    "orderable": false,
					"render":
                    function (data, type, row ) {
                    	return  "<div>" +
                        			"<button title='Modificar' class='btn-edit btn btn-primary btn-xs'>" +
                        				"<span><i class=\"fas fa-edit\"></i></span>" +
					                "</button>" +					                
				                "</div>";
                    }                    
                }           
         ],
         "fnRowCallback":
                 function(row, data, iDisplayIndex, iDisplayIndexFull){					
                     var index = iDisplayIndexFull + 1;
					 // colocando la numeración
                     $('td:eq(0)', row).html(index);
					// modificando el tamaño de los caracteres del listado 
					$(row).addClass("listado-tam-caracteres");
                     return row;
                 },
         "language"  : {
            "url": "/appkahaxi/language/Spanish.json"
         }
    });
  
	$('#tablaDatacatalogo tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableDataCatalogo.row( $(this).closest('tr')).data();
		cargarDataCatalogo(data.idDataCatalogo);
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
	var form1 = formDataCatalogo;
	
	if ( $.fn.dataTable.isDataTable(tablaDatacatalogo)) {
		console.log("ya existe el dt....");
		dataTableDataCatalogo.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableDataCatalogo.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function cargarFlagSunat(){
	console.log("cargarFlagSunat");
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarFlagSunat/' ,
        data : {
				codMaestro: tipoMantenimiento.text()
        },
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){
        	console.log("cargarFlagSunat---> success" + result);
        	if(xhr.status == HttpStatus.OK){
        		var data = JSON.parse(result);
                flagSunat = data;
            }
            loadding(false);
        }
    });
}

function cargarDataCatalogo(codDataCatalogo){
	console.log("cargarDataCatalogo---> codDataCatalogo:" + codDataCatalogo);
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarDataCatalogo/' ,
        data : {
				codMaestro: tipoMantenimiento.text(),
				codDataCatalogo : codDataCatalogo
        },
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){
        	console.log("cargarDataCatalogo---> success" + result);
        	if(xhr.status == HttpStatus.OK){
        		var data = JSON.parse(result);
                cargarModalDataCatalogo(data, Opcion.MODIFICAR);
            }
            loadding(false);
        }
    });
}

function cargarModalDataCatalogo(data, opcion){
	
	if(opcion == Opcion.NUEVO){
		console.log("cargarModalDataCatalogo---> NUEVO");
		
		idDC.text(CADENA_VACIA);    	
        descripcionModal.val(CADENA_VACIA);
        activoModal.prop('checked', true);
		titulo.text(DescripcionOpcion.DES_NUEVO + " " + desCatalogo);
		// mostrando controles
	    if (flagSunat == 0) {
			codigoModal.val('0');
			ocultarControl(divCodigo);
			ocultarControl(divActivo);
		}
		else{
			mostrarControl(divCodigo);
			ocultarControl(divActivo);
			codigoModal.val(CADENA_VACIA);
			habilitarControl(codigoModal);
		}	
	}		
	if(opcion == Opcion.MODIFICAR){
		console.log("cargarModalDataCatalogo---> MODIFICA");		
		// cargando valores
		idDC.text(data.idDataCatalogo);
		codigoModal.val(data.codData);
		descripcionModal.val(data.descData);
		if(data.activo == 1){
			activoModal.prop('checked', true);
		}
		else{
			activoModal.prop('checked', false);
		}
		titulo.text(DescripcionOpcion.DES_MODIFICAR + " " + desCatalogo)
	    // mostrando controles
		mostrarControl(divCodigo);
		mostrarControl(divActivo);
	    deshabilitarControl(codigoModal);		
	}
    // mostrando modal
    mostrarModal(form_dataCatalogoModal);
}


function registrarDataCatalogo(){
	console.log("registrarDataCatalogo...entrando" + idDataCatalogo);
		
	var idDataCatalogo   = idDC.html();
	var codMaestro		 = tipoMantenimiento.text();
	var codData  		 = null;
	var descData 		 = descripcionModal.val();
	var activo 			 = null;
	var codCatalogoPadre = null;
	var codDataPadre 	 = null;
	
	if(idDataCatalogo > 0){
		codData = codigoModal.val().trim();
	}
	else{
		if (flagSunat == 0){codData = '0'} else{codData = codigoModal.val().trim()}
	}
	
	if (activoModal.is(':checked')){activo = 1} else{activo = 0}
	
    var objetoJson = {
    		idDataCatalogo:	  idDataCatalogo,
			codMaestro:		  codMaestro,
    		codData:  		  codData,
    		descData:   	  descData,
			codCatalogoPadre: codCatalogoPadre,
			codDataPadre: 	  codDataPadre,
			flagSunat:		  flagSunat,
    		activo:       	  activo,
    };

    var entityJsonStr = JSON.stringify(objetoJson);
    console.log("entityJsonStr-->" + entityJsonStr);
    var formData = new FormData();
    formData.append('registro', new Blob([entityJsonStr], {
        type: "application/json"
    }));
        
    $.ajax({
        type:"POST",
        //cache: false,
        contentType: false,
        processData: false,
        url : '/appkahaxi/registrarDataCatalogo/',
        data: formData,										  
        beforeSend: function(xhr) {
        	console.log("registrarDataCatalogo...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	console.log("resultado--->" + resultado);
        	
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("El registro fué grabado correctamente.", "success");
				form_validado_dataCatalogo.removeClass('was-validated'); 		
				btnCerrarModal.click();
				buscar();
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("registrarDataCatalogo, Accepted....");
            	mostrarMensajeValidacion(resultado, codigoModal);
            }
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("registrarDataCatalogo, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	loadding(false);
        }
    });
}

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	buscar();	
	campoBuscar.focus();
}

function parametrizacionTipoCatalogo(){
	//Define el tipo de Maestro
	var tipoCatalogo = tipoMantenimiento.text();
	
	if (tipoCatalogo == CodigoMaestro.MARCA_ARTICULO){
		desCatalogo = DescripcionCatalogo.DES_MARCA_ARTICULO;
	}
	if (tipoCatalogo == CodigoMaestro.SECCION){
		desCatalogo = DescripcionCatalogo.DES_SECCION;
	}	
	if (tipoCatalogo == CodigoMaestro.UND_MEDIDA){
		desCatalogo = DescripcionCatalogo.DES_UND_MEDIDA;
	}
	if (tipoCatalogo == CodigoMaestro.MARCA_VEHICULO){
		desCatalogo = DescripcionCatalogo.DES_MARCA_VEHICULO;
	}
	if (tipoCatalogo == CodigoMaestro.MODELO){
		desCatalogo = DescripcionCatalogo.DES_MODELO;
	}
	if (tipoCatalogo == CodigoMaestro.MOTOR){
		desCatalogo = DescripcionCatalogo.DES_MOTOR;
	}
	if (tipoCatalogo == CodigoMaestro.APLICACION){
		desCatalogo = DescripcionCatalogo.DES_APLICACION;
	}
	if (tipoCatalogo == CodigoMaestro.ESTADO_COTI_VTA){
		desCatalogo = DescripcionCatalogo.DES_ESTADO_DOC_SISTEMA;
	}
	if (tipoCatalogo == CodigoMaestro.ESTADO_DOC_SUNAT){
		desCatalogo = DescripcionCatalogo.DES_ESTADO_DOC_SUNAT;
	}
	if (tipoCatalogo == CodigoMaestro.COND_PAGO){
		desCatalogo = DescripcionCatalogo.DES_COND_PAGO;
	}	
	if (tipoCatalogo == CodigoMaestro.DIAS){
		desCatalogo = DescripcionCatalogo.DES_DIAS;
	}	
	if (tipoCatalogo == CodigoMaestro.MONEDA){
		desCatalogo = DescripcionCatalogo.DES_MONEDA;
	}
	if (tipoCatalogo == CodigoMaestro.TIPO_SOCIO_NEGOCIOS){
		desCatalogo = DescripcionCatalogo.DES_TIPO_SOCIO_NEGOCIOS;
	}
	if (tipoCatalogo == CodigoMaestro.TIPO_PERSONA){
		desCatalogo = DescripcionCatalogo.DES_TIPO_PERSONA;
	}
	if (tipoCatalogo == CodigoMaestro.TIPO_DOC_IDENTIDAD){
		desCatalogo = DescripcionCatalogo.DES_TIPO_DOC_IDENTIDAD;
	}	
	if (tipoCatalogo == CodigoMaestro.TIPO_OPE_INVENTARIO){
		desCatalogo = DescripcionCatalogo.DES_TIPO_OPE_INVENTARIO;
	}
	if (tipoCatalogo == CodigoMaestro.TIPO_DOC_SISTEMA){
		desCatalogo = DescripcionCatalogo.DES_TIPO_DOC_SISTEMA;
	}
	if (tipoCatalogo == CodigoMaestro.TIPO_DOC_SUNAT){
		desCatalogo = DescripcionCatalogo.DES_TIPO_DOC_SUNAT;
	}
	if (tipoCatalogo == CodigoMaestro.TIPO_TRASLADO){
		desCatalogo = DescripcionCatalogo.DES_TIPO_TRASLADO;
	}
	if (tipoCatalogo == CodigoMaestro.ESTADO_PAGO){
		desCatalogo = DescripcionCatalogo.DES_ESTADO_PAGO;
	}	
	
	// Titulo según el maestro
	tituloBusqueda.text(desCatalogo.toUpperCase());
}

