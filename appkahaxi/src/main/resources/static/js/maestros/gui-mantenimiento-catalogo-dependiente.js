// campos globales de catalogo
var tipoMantenimiento;
var codCatalogoPadre;
var flagSunat;
// campos de formulario principal
var formCatalogoDependiente;
var campoBuscar;
var titulo;
var tituloBusqueda;
var tituloLabelMarca;
var tituloLabelMarcaBusqueda;
var tituloLabelMarcaDetalle;
// campos de formulario modal
var form_validado_CatalogoDependiente;
var form_catalogoDependienteModal;
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
var tablaCatalogoDependiente;
var dataTableCatalogoDependiente;


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
	formCatalogoDependiente = $('#formCatalogoDependiente');
	form_validado_CatalogoDependiente = $("#form_validado_CatalogoDependiente");
	form_catalogoDependienteModal = $("#catalogoDependienteModal");
	campoBuscar = $('#campoBuscar');
	marca =  $('#marca');		
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	titulo = $('#titulo');
	tituloBusqueda = $("#titBusqueda");
	tituloLabelMarca = $("#titMarca");
	tituloLabelMarcaBusqueda = $("#titMarcaBus");
	tituloLabelMarcaDetalle = $("#titMarcaDetalle");
	idDC = $("#idDataCatalogo");
	divCodigo = $("#divCodigo");
	divActivo = $("#divActivo");
	codigoModal = $("#codigoModal");
	descripcionModal = $("#descripcionModal");
	marcaModal =  $('#marcaModal');	
	activoModal = $("#activoModal");
	tablaCatalogoDependiente  = $('#tablaCatalogoDependiente');
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

function inicializarEventos(){
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp();
	});
	
	form_catalogoDependienteModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_catalogoDependienteModal.on('shown.bs.modal', function () {
		console.log('flagSunat--->' + flagSunat);
		if (flagSunat == 0) {
			marcaModal.trigger('focus');
		}
		else{
			codigoModal.trigger('focus');
		}
	})
	
	marca.on('change', function (e) {
		buscar();
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_CatalogoDependiente.removeClass('was-validated'); 
    	cargarModalCatalogoDependiente(null, Opcion.NUEVO);
	});
	
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_CatalogoDependiente[0].checkValidity() == false) {
            e.stopPropagation();
        }else{
        	registrarCatalogoDependiente();
        }
    	form_validado_CatalogoDependiente.addClass('was-validated');
	});
}


function inicializarTabla(){
	
	dataTableCatalogoDependiente = tablaCatalogoDependiente.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.codMaestro 		= tipoMantenimiento.text();
				d.codCatalogoPadre 	= codCatalogoPadre;
				d.codDataPadre 		= marca.val().trim();
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
        "dom"			: '<ip<rt>lp>',
        "lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
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
                "width": "75px",
                "targets": [3],
                "data": "marcaDescripcion"
            },
			{
                "width": "50px",
                "targets": [4],
                "data": "userRegistra"
            },
			{
                "width": "50px",
                "targets": [5],
                "data": "fechaRegistro"
            },
			{
                    "width": "5px",
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
                "width": "10px",
                "targets": [7],
                "data": "idDataCatalogo",
               "visible": false
            },            
            {
                    "width": "10px",
                    "targets": [8],
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
  
	$('#tablaCatalogoDependiente tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableCatalogoDependiente.row( $(this).closest('tr')).data();
		cargarCatalogoDependiente(data.idDataCatalogo);
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
	var form1 = formCatalogoDependiente;

	if ( $.fn.dataTable.isDataTable(tablaCatalogoDependiente)) {
		console.log("ya existe el dt....");
		dataTableCatalogoDependiente.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableCatalogoDependiente.ajax.reload(null, true);
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

function cargarCatalogoDependiente(codDataCatalogo){
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
                cargarModalCatalogoDependiente(data, Opcion.MODIFICAR);
            }
            loadding(false);
        }
    });
}

function cargarModalCatalogoDependiente(catalogoDependiente, opcion){	
		if(opcion == Opcion.NUEVO){
			console.log("cargarModalCatalogoDependiente---> NUEVO");
			idDC.text(CADENA_VACIA);	    	
	        descripcionModal.val(CADENA_VACIA);
			marcaModal.val(CADENA_VACIA);
	        activoModal.prop('checked', true);
			titulo.text(DescripcionOpcion.DES_NUEVO + " " + desCatalogo);
			
			// mostrando controles
		    if (flagSunat == 0) {				
				ocultarControl(divCodigo);
				ocultarControl(divActivo);
				codigoModal.val('0');
			}
			else{
				codigoModal.val(CADENA_VACIA);
				mostrarControl(divCodigo);
				mostrarControl(divActivo);
				habilitarControl(codigoModal);
			}	
		}
		if(opcion == Opcion.MODIFICAR){
			console.log("cargarModalCatalogoDependiente---> MODIFICA");		
			// cargando valores
			idDC.text(catalogoDependiente.idDataCatalogo);
			codigoModal.val(catalogoDependiente.codData);
			descripcionModal.val(catalogoDependiente.descData);
			marcaModal.val(catalogoDependiente.codDataPadre);
			if(catalogoDependiente.activo == 1){
				activoModal.prop('checked', true);
			}
			else{
				activoModal.prop('checked', false);
			}
			titulo.text(DescripcionOpcion.DES_MODIFICAR + " " + desCatalogo);
		    // mostrando controles
			mostrarControl(divCodigo);
			mostrarControl(divActivo);
		    deshabilitarControl(codigoModal);		
		}
		
	    // mostrando modal
	    mostrarModal(form_catalogoDependienteModal);
}

function registrarCatalogoDependiente(){
	console.log("registrarCatalogoDependiente...entrando");
	
	var idDataCatalogo   = idDC.html();
	var codMaestro		 = tipoMantenimiento.text();
	var codData  		 = null;
	var descData 		 = descripcionModal.val();
	var activo 			 = null;
	var codDataPadre 	 = marcaModal.val();
	
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
        contentType: false,
        processData: false,
        url : '/appkahaxi/registrarDataCatalogo/',
        data: formData,										  
        beforeSend: function(xhr) {
        	console.log("registrarCatalogoDependiente...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	console.log("resultado--->" + resultado);
        	
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("El registro fué grabado correctamente.", "success");
				form_validado_CatalogoDependiente.removeClass('was-validated'); 		
				btnCerrarModal.click();
				buscar();
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("registrarCatalogoDependiente, Accepted....");
            	mostrarMensajeValidacion(resultado, codigoModal);
            }
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("registrarCatalogoDependiente, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	loadding(false);
        }
    });
}

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	marca.val(CADENA_VACIA);
	marcaModal.val(CADENA_VACIA);
	idDC.val(CADENA_VACIA);
	buscar();
	campoBuscar.focus();
}

function parametrizacionTipoCatalogo(){
	//Define el tipo de Maestro
	var tipoCatalogo = tipoMantenimiento.text();
	
	if (tipoCatalogo == CodigoMaestro.TIPO){
		desCatalogo = DescripcionCatalogo.DES_TIPO_ARTICULO;
		codCatalogoPadre = CodigoMaestro.MARCA_ARTICULO;
		tituloLabelMarca.text('Artículo');
		tituloLabelMarcaBusqueda.text('Artículo');
		tituloLabelMarcaDetalle.text('Artículo');
	}
	if (tipoCatalogo == CodigoMaestro.MODELO){
		desCatalogo = DescripcionCatalogo.DES_MODELO;
		codCatalogoPadre = CodigoMaestro.MARCA_VEHICULO;
		tituloLabelMarca.text('Vehículo');
		tituloLabelMarcaBusqueda.text('Vehículo');
		tituloLabelMarcaDetalle.text('Vehículo');
	}	
	
	// Titulo según el maestro
	tituloBusqueda.text(desCatalogo.toUpperCase());	
}
