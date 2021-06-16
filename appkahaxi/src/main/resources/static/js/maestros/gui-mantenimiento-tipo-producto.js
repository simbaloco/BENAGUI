// campos globales de catalogo
var codMaestro;
var codCatalogoPadre;
// campos de formulario principal
var formTipoProducto;
var campoBuscar;
var titulo;
var cargarComboMarca;
// campos de formulario modal
var form_validado_TipoProducto;
var idDC;
var codigoModal;
var descripcionModal;
var activoModal;
var cargarComboMarcaModal;
// botones
var btnLimpiar;
var btnNuevo;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaTipoProducto;
var dataTableTipoProducto;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	parametrizacionTipoCatalogo();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	formTipoProducto = $('#formTipoProducto');
	form_validado_TipoProducto = $("#form_validado_tipoproducto");
	campoBuscar = $('#campoBuscar');
	marca =  $('#marca');	
	cargarComboMarca = $('#cargarComboMarca');
	
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	titulo = $('#titulo');
	idDC = $("#idDataCatalogo");
	codigoModal = $("#codigoModal");
	descripcionModal = $("#descripcionModal");
	marcaModal =  $('#marcaModal');
	cargarComboMarcaModal = $('#cargarComboMarcaModal');
	
	activoModal = $("#activoModal");
	tablaTipoProducto  = $('#tablaTipoproducto');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {
	cargarComboMarcaModal.click();
	cargarComboMarca.click();
	campoBuscar.focus();
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
		campoBuscarKeyUp();
	});
	
	marca.on('change', function (e) {
		buscar();
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_TipoProducto.removeClass('was-validated'); 
    	cargarModalTipoProducto(null, Opcion.NUEVO);
	});
	
	cargarComboMarca.click(function() {
        cargarCombo('#marca', true, codCatalogoPadre, function(id){
			if(id != 1){
				mostrarMensajeError(id);
			}
	    });
	});
	
	cargarComboMarcaModal.click(function() {
        cargarCombo('#marcaModal', true, codCatalogoPadre, function(id){
			if(id != 1){
	            mostrarMensajeError(id);
			}
	    });
	});
	
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_TipoProducto[0].checkValidity() === false) {
            e.stopPropagation();
            codigoModal.focus();
        }else{
        	registrarTipoProducto();
        }
    	form_validado_TipoProducto.addClass('was-validated');
	});
}


function inicializarTabla(){
	
	dataTableTipoProducto = tablaTipoProducto.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.codMaestro 		= codMaestro;
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
                        			"<button title='Modificar' class='btn-edit btn btn-outline-success btn-xs'>" +
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
  
	$('#tablaTipoproducto tbody').on( 'click','.btn-edit', function () {
		console.log('btnEditar1--->');
	    var data = dataTableTipoProducto.row( $(this).closest('tr')).data();
		console.log('btnEditar2--->' + data.idDataCatalogo);
		cargarTipoProducto(data.idDataCatalogo);
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
	var form1 = formTipoProducto;

	if ( $.fn.dataTable.isDataTable('#tablaTipoproducto')) {
		console.log("ya existe el dt....");
		dataTableTipoProducto.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableTipoProducto.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function cargarTipoProducto(codDataCatalogo){
	console.log("cargarDataCatalogo---> codDataCatalogo:" + codDataCatalogo);
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarDataCatalogo/' ,
        data : {
				codMaestro: codMaestro,
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
                cargarModalTipoProducto(data, Opcion.MODIFICAR);
            }
            loadding(false);
        }
    });
}

function cargarModalTipoProducto(tipoProducto, opcion){	
		if(opcion == 0){
			console.log("cargarModalTipoProducto---> NUEVO");
			idDC.text(CADENA_VACIA);
	    	codigoModal.val(CADENA_VACIA);
	        descripcionModal.val(CADENA_VACIA);
			marcaModal.val(CADENA_VACIA);
	        activoModal.prop('checked', true);
			titulo.text(DescripcionOpcion.DES_NUEVO + " " + DescripcionCatalogo.DES_TIPO_PRODUCTO);
			// mostrando controles
		    deshabilitarControlSoloLectura('#codigoModal');	
		}
		if(opcion == 3){
			console.log("cargarModalDataCatalogo---> MODIFICA");		
			// cargando valores
			idDC.text(tipoProducto.idDataCatalogo);
			codigoModal.val(tipoProducto.codData);
			descripcionModal.val(tipoProducto.descData);
			marcaModal.val(tipoProducto.codDataPadre);
			if(tipoProducto.activo == 1){
				activoModal.prop('checked', true);
			}
			else{
				activoModal.prop('checked', false);
			}
			titulo.text(DescripcionOpcion.DES_MODIFICAR + " " + DescripcionCatalogo.DES_TIPO_PRODUCTO);
		    // mostrando controles
		    habilitarControlSoloLectura('#codigoModal');			
		}
		
	    // mostrando modal
	    mostrarModal("#tipoProductoModal");
}

function registrarTipoProducto(){
	console.log("registrarTipoProducto...entrando");
	
	var idDataCatalogo   = idDC.html();
	var codData  		 = codigoModal.val().trim();
	var descData 		 = descripcionModal.val();
	var activo 			 = null;
	var codDataPadre 	 = marcaModal.val();
	if (activoModal.is(':checked')){activo = 1} else{activo = 0}
	
	console.log("idDataCatalogo --------->" + idDataCatalogo);
	
    var objetoJson = {
    		idDataCatalogo:	  idDataCatalogo,
			codMaestro:		  codMaestro,
    		codData:  		  codData,
    		descData:   	  descData,
			codCatalogoPadre: codCatalogoPadre,
			codDataPadre: 	  codDataPadre,
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
        	console.log("registrarTipoProducto...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	console.log("resultado--->" + resultado);
        	
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("El registro fué grabado correctamente.", "success");
				form_validado_TipoProducto.removeClass('was-validated'); 		
				btnCerrarModal.click();
				buscar();
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("registrarTipoProducto, Accepted....");
            	mostrarMensajeExcepcion(resultado);
            }
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("registrarTipoProducto, error...." + xhr.status);
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
	codMaestro = CodigoMaestro.TIPO;
	codCatalogoPadre = CodigoMaestro.MARCA_PRODUCTO;
}
