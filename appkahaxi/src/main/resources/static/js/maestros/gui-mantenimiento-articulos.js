// campos de formulario principal
var formArticulo;
var campoBuscar;
var marca;
var tipo;
var seccion;
var undMedida;
// campos de formulario modal
var form_validado_articulo;
var form_articuloModal;
var titulo;
var codigoArticuloModal;
var codigoEstandarModal;
var codigoAntiguoModal;
var codBarrasModal;
var descripcionModal;
var marcaArticuloModal;
var tipoModal;
var seccionModal;
var undMedidaModal;
var marcaVehiculoModal;
var modeloModal;
var motorModal;
var aplicacionModal;
var observacionesModal;
var activoModal;
var imagenModal;
var nombreArchivoModal;
var selectorImagen;
// botones
var btnLimpiar;
var btnNuevo;
var btnCargarImagen;
var btnBorrarImagen;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaArticulo;
var dataTableArticulo;



/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	formArticulo = $('#formArticulo');
	form_articuloModal = $('#articuloModal');
	form_validado_articulo = $("#form_validado_articulo");
	titulo = $('#titulo');
	campoBuscar = $('#campoBuscar');
	marca =  $('#marca');	
	tipo =  $('#tipo');	
	seccion = $('#seccion');	 
	undMedida = $('#unidadMedida');	
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnCargarImagen = $('#btnCargarImg');
	btnBorrarImagen = $('#btnQuitarImg');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	codigoArticuloModal = $("#codigoArticulo");
	codigoEstandarModal = $("#codigoEstandarModal");
	codigoAntiguoModal = $("#codigoAntiguoModal");
	codBarrasModal = $("#codBarrasModal");
	descripcionModal = $("#descripcionModal");
	marcaArticuloModal = $('#marcaArticuloModal');
	tipoModal = $("#tipoModal");
	seccionModal = $("#seccionModal");
	undMedidaModal = $("#undMedidaModal");
	marcaVehiculoModal = $("#marcaVehiculoModal");
	modeloModal = $("#modeloModal");
	motorModal = $("#motorModal");
	aplicacionModal = $("#aplicacionModal");	
	observacionesModal = $("#observacionesModal");
	activoModal = $("#activoModal");
	imagenModal = $("#imagenModal");
	nombreArchivoModal = $("#nombreArchivoModal");
	selectorImagen = $("#selectorImagen");	
	tablaArticulo  = $('#tablaArticulo');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {	
	campoBuscar.focus();
	marcaArticuloModal.trigger('click', [CADENA_VACIA]);			
	marcaVehiculoModal.trigger('click', [CADENA_VACIA]);
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
	
	form_articuloModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_articuloModal.on('shown.bs.modal', function () {
	  codigoEstandarModal.trigger('focus');
	})
	
	marca.on('click', function (e, valor) {
		console.log('marca--->' + marca);
		cargarComboPadre(tipo, true, CodigoMaestro.TIPO, CodigoMaestro.MARCA_ARTICULO, marca.val(), function(id){
			if(id != 1){
				mostrarMensajeError(id);
			}
			else{
				tipo.val(valor);
			}
	    });
		buscar();
	});
	
	tipo.on('change', function (e) {
		console.log('tipo--->' + tipo);
		buscar();
	});
	
	seccion.on('change', function (e) {
		console.log('seccion--->' + seccion);
		buscar();
	});
	
	undMedida.on('change', function (e) {
		console.log('undMedida--->' + undMedida);
		buscar();
	});
	
	marcaArticuloModal.on("click", function(e, valor) {
		cargarComboPadre(tipoModal, true, CodigoMaestro.TIPO, CodigoMaestro.MARCA_ARTICULO, marcaArticuloModal.val(), function(id){
			if(id != 1){
				mostrarMensajeError(id);
			}
			else{
				tipoModal.val(valor);
			}
	    });
	});
	
	marcaVehiculoModal.on("click", function(e, valor) {
		cargarComboPadre(modeloModal, true, CodigoMaestro.MODELO, CodigoMaestro.MARCA_VEHICULO, marcaVehiculoModal.val(), function(id){
			
			if(id != 1){
				mostrarMensajeError(id);
			}
			else{							
				modeloModal.val(valor);				
			}
	    });
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_articulo.removeClass('was-validated'); 
    	cargarModalArticulo(null, Opcion.NUEVO);
	});
		
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_articulo[0].checkValidity() === false) {
            e.stopPropagation();
        }else{
        	registrarArticulo();
        }
    	form_validado_articulo.addClass('was-validated');
	});
	
	btnCerrarModal.on("click", function(e) {
		form_articuloModal.modal('hide');//ocultamos el modal
	});
	
		
	btnBorrarImagen.on("click", function() {
		console.log('btnQuitarImagen--->' );
        imagenModal.attr('src', CADENA_VACIA);
		nombreArchivoModal.text(CADENA_VACIA);		
		selectorImagen.val(CADENA_VACIA);
		ocultarControl(btnBorrarImagen);
    });

	btnCargarImagen.on("click", function() {
		console.log('btnCargarImagen--->' );
        selectorImagen.click();
    });

	selectorImagen.on('change', function () {
		console.log('selectorImagen--->' );
        var file = selectorImagen.get(0).files[0];

        if ($(this).val() != CADENA_VACIA) {
            nomArchivo   =   file.name;
            var ext      =   file.name.split('.').pop().toLowerCase();

            if(ext == 'jpg' || ext == 'jpeg' || ext == 'png'){
                // máximo 50kb
                if($(this)[0].files[0].size > 51200){
                	mostrarDialogoInformacion("Se solicita un archivo con un tamaño no mayor a 50KB . Por favor verifique.", Boton.WARNING, null, selectorImagen);
                }else{
                	cargarPreview(this);
                	nombreArchivoModal.text(nomArchivo);
					mostrarControl(btnBorrarImagen);
                }
            }else{
            	mostrarDialogoInformacion("Sólo se permite un archivo de imagen (extensión jpg/jpeg/png). <br>Extensión no permitida: " + ext, Boton.WARNING, null, selectorImagen);
            }
        }
    });

}


function inicializarTabla(){
	
	dataTableArticulo = tablaArticulo.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 		= campoBuscar.val().trim();
				d.codMarcaArticulo	= marca.val().trim();
				d.codTipo 			= tipo.val().trim();
				d.codSeccion 		= seccion.val().trim();
				d.codUndMedida 		= undMedida.val().trim();
		    },
            url: '/appkahaxi/listarArticulos/',
                dataSrc: function (json) {
				console.log("listarArticulos...success");
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
                    "width": "3px",
                    "targets": 0,
                    "data": "id"
                },
                {
                    "width": "35px",
                    "targets": [1],
                    "data": "codigoArticulo"
                },
				{
                    "width": "35px",
                    "targets": [2],
                    "data": "codigoEstandar"
                },
				{
                    "width": "35px",
                    "targets": [3],
                    "data": "codigoAntiguo"
                },
                {
                    "width": "280px",
                    "targets": [4],
                    "data": "descripcion"
                },
                {
                    "width": "30px",
                    "targets": [5],
                    "data": "descripcionMarcaArticulo"
                },
                {
                    "width": "100px",
                    "targets": [6],
                    "data": "descripcionTipo"
                },
				{
                    "width": "100px",
                    "targets": [7],
                    "data": "descripcionSeccion"
                },
                {
                    "width": "100px",
                    "targets": [8],
                    "data": "descripcionUnidadMedida"
                },                
                {
                    "width": "20px",
                    "targets": [9],
                    "data": "codigoMarcaArticulo",
                    "visible": false
                    
                },
				{
                    "width": "20px",
                    "targets": [10],
                    "data": "codigoTipo",
                    "visible": false
                    
                },
				{
                    "width": "20px",
                    "targets": [11],
                    "data": "codigoSeccion",
                    "visible": false
                    
                },
				{
                    "width": "20px",
                    "targets": [12],
                    "data": "codigoUnidadMedida",
                    "visible": false
                    
                },
                {
                    "width": "40px",
                    "targets": [13],
                    "data": "stock",
					"className": "dt-body-right",
                },
                {
                    "width": "60px",
                    "targets": [14],
                    "data": "ultimoPrecioCompra",
					"className": "dt-body-right",
                },
				{
                    "width": "3px",
                    "targets": [15],
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
                    "targets": [16],
                    "className": "dt-body-left",
                    "orderable": false,
					"render":
                    function (data, type, row ) {
                    	return  "<div style='display:flex;justify-content:space-around;'>" +
                        			"<button title='Ver' class='btn-view btn btn-info btn-xs'>" +
							                    "<span><i class=\"fas fa-eye\"></i></span>" +
							                "</button>" +
											"<button title='Duplicar' class='btn-copy btn btn-success btn-xs'>" +
					                            "<span><i class=\"far fa-copy\"></i></span>" +
					                        "</button>" +
							                "<button title='Modificar' class='btn-edit btn btn-primary btn-xs'>" +
                                                "<span><i class=\"fas fa-edit\"></i></span>" +
                                            "</button>" +											
				                "</div>";
                    }
                }
             ],
             "fnRowCallback":
                 function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                     var index = iDisplayIndexFull + 1;
                     $('td:eq(0)', nRow).html(index);
					
					// modificando el tamaño de los caracteres del listado 
					$(nRow).addClass("listado-tam-caracteres");
                     return nRow;
                 },
             "language"  : {
                "url": "/appkahaxi/language/Spanish.json"
            }
    });
	
	
	
	$('#tablaArticulo tbody').on( 'click','.btn-view', function () {
	    var data = dataTableArticulo.row( $(this).closest('tr')).data();	    
		console.log('ver articulo--->' + data.codigoArticulo);
		cargarArticulo(data.codigoArticulo, Opcion.VER);
	});
	
	$('#tablaArticulo tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableArticulo.row( $(this).closest('tr')).data();
		console.log('editar articulo--->' + data.codigoArticulo);
		cargarArticulo(data.codigoArticulo, Opcion.MODIFICAR);
	});
	 
	$('#tablaArticulo tbody').on( 'click','.btn-copy', function () {
	    var data = dataTableArticulo.row( $(this).closest('tr')).data();
		console.log('Duplicar articulo--->' + data.codigoArticulo);
		cargarArticulo(data.codigoArticulo, Opcion.DUPLICAR);
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
	var form1 = formArticulo;

	if ( $.fn.dataTable.isDataTable(tablaArticulo)) {
		dataTableArticulo.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableArticulo.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function cargarModalArticulo(articulo, opcion){	
		selectorImagen.val(CADENA_VACIA);
		
		if(opcion == Opcion.NUEVO){
			console.log("cargarModalArticulo---> NUEVO");
			codigoArticuloModal.text(CADENA_VACIA);
			codigoEstandarModal.val(CADENA_VACIA);
			codigoAntiguoModal.val(CADENA_VACIA);			
			codBarrasModal.val(CADENA_VACIA);
	        descripcionModal.val(CADENA_VACIA);
			marcaArticuloModal.val(CADENA_VACIA);
			tipoModal.val(CADENA_VACIA);			
			seccionModal.val(CADENA_VACIA);
			undMedidaModal.val(CADENA_VACIA);
			marcaVehiculoModal.val(CADENA_VACIA);
			modeloModal.val(CADENA_VACIA);
			motorModal.val(CADENA_VACIA);
			aplicacionModal.val(CADENA_VACIA);			
			observacionesModal.val(CADENA_VACIA);
	        activoModal.prop('checked', true);
			imagenModal.attr('src', CADENA_VACIA);
			nombreArchivoModal.text(CADENA_VACIA);			
			titulo.text(DescripcionOpcion.DES_NUEVO);
			
			habilitarControl(codigoEstandarModal);
			habilitarControl(codigoAntiguoModal);
			habilitarControl(codBarrasModal);
			habilitarControl(descripcionModal);
			habilitarControl(marcaArticuloModal);
			habilitarControl(tipoModal);
			habilitarControl(seccionModal);
			habilitarControl(undMedidaModal);
			habilitarControl(marcaVehiculoModal);				
			habilitarControl(modeloModal);
			habilitarControl(motorModal);
			habilitarControl(aplicacionModal);
			habilitarControl(observacionesModal);
			habilitarControl(activoModal);
			habilitarControl(btnCargarImagen);
			habilitarControl(btnBorrarImagen);
			habilitarControl(btnGrabarModal);
		}
		
		if(opcion == Opcion.MODIFICAR || opcion == Opcion.DUPLICAR || opcion == Opcion.VER){		
			// cargando valores			
			codigoArticuloModal.text(articulo.codigoArticulo);
			codigoEstandarModal.val(articulo.codigoEstandar);
			codigoAntiguoModal.val(articulo.codigoAntiguo);			
			codBarrasModal.val(articulo.codigoBarras);
	        descripcionModal.val(articulo.descripcion);
			marcaArticuloModal.val(articulo.codigoMarcaArticulo);
			marcaArticuloModal.trigger('click', [articulo.codigoTipo]);							
			seccionModal.val(articulo.codigoSeccion);
			undMedidaModal.val(articulo.codigoUnidadMedida);
			marcaVehiculoModal.val(articulo.codigoMarcaVehiculo);
			marcaVehiculoModal.trigger('click', [articulo.codigoModelo]);
			motorModal.val(articulo.codigoMotor);
			aplicacionModal.val(articulo.codigoAplicacion);			
			observacionesModal.val(articulo.observaciones);
	        if(articulo.activo == 1){
				activoModal.prop('checked', true);
			}
			else{
				activoModal.prop('checked', false);
			}
					
			if(articulo.imagen != null){
				imagenModal.attr('src', atob(articulo.imagen));
			}
			else{
				imagenModal.attr('src', CADENA_VACIA);
			}
			nombreArchivoModal.text(CADENA_VACIA);	
			
			if(opcion == Opcion.VER){
				titulo.text(DescripcionOpcion.DES_VER);
				deshabilitarControl(codigoEstandarModal);
				deshabilitarControl(codigoAntiguoModal);
				deshabilitarControl(codBarrasModal);
				deshabilitarControl(descripcionModal);
				deshabilitarControl(marcaArticuloModal);
				deshabilitarControl(tipoModal);
				deshabilitarControl(seccionModal);
				deshabilitarControl(undMedidaModal);
				deshabilitarControl(marcaVehiculoModal);				
				deshabilitarControl(modeloModal);
				deshabilitarControl(motorModal);
				deshabilitarControl(aplicacionModal);
				deshabilitarControl(observacionesModal);
				deshabilitarControl(activoModal);
				ocultarControl(btnCargarImagen);
				ocultarControl(btnBorrarImagen);
				ocultarControl(btnGrabarModal);
			}
			
			if(opcion == Opcion.MODIFICAR){				
				titulo.text(DescripcionOpcion.DES_MODIFICAR);
				habilitarControl(codigoEstandarModal);
				habilitarControl(codigoAntiguoModal);
				habilitarControl(codBarrasModal);
				habilitarControl(descripcionModal);
				habilitarControl(marcaArticuloModal);
				habilitarControl(tipoModal);
				habilitarControl(seccionModal);
				habilitarControl(undMedidaModal);
				habilitarControl(marcaVehiculoModal);				
				habilitarControl(modeloModal);
				habilitarControl(motorModal);
				habilitarControl(aplicacionModal);
				habilitarControl(observacionesModal);				
				mostrarControl(btnCargarImagen);
				mostrarControl(btnGrabarModal);				
				if(articulo.imagen != null && articulo.imagen != CADENA_VACIA){
					mostrarControl(btnBorrarImagen);
				}
				else{
					ocultarControl(btnBorrarImagen);
				}
				
				//Si tiene OC asociadas con estado de proceso Abierto o Stock > 0 no puede inactivar el articulo
				if (articulo.flagOcAsociada > 0 || articulo.stock > 0){
					deshabilitarControl(activoModal);
				}
				else{
					habilitarControl(activoModal);
				}
			}
			
			if(opcion == Opcion.DUPLICAR){		
				titulo.text(DescripcionOpcion.DES_NUEVO);
				codigoArticuloModal.text(CADENA_VACIA);
				observacionesModal.val(CADENA_VACIA);
		        activoModal.prop('checked', true);
				imagenModal.attr('src', CADENA_VACIA);
				nombreArchivoModal.text(CADENA_VACIA);
				
				habilitarControl(codigoEstandarModal);
				habilitarControl(codigoAntiguoModal);
				habilitarControl(codBarrasModal);
				habilitarControl(descripcionModal);
				habilitarControl(marcaArticuloModal);
				habilitarControl(tipoModal);
				habilitarControl(seccionModal);
				habilitarControl(undMedidaModal);
				habilitarControl(marcaVehiculoModal);				
				habilitarControl(modeloModal);
				habilitarControl(motorModal);
				habilitarControl(aplicacionModal);
				habilitarControl(observacionesModal);				
				habilitarControl(btnCargarImagen);
				habilitarControl(btnGrabarModal);
				habilitarControl(activoModal);
				ocultarControl(btnBorrarImagen);	
			}
			
		}
		
	    // mostrando modal
	    mostrarModal(form_articuloModal);
}

function cargarPreview(input) {
	console.log("cargarPreview...entrando");
	if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
        	imagenModal.attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function cargarArticulo(codigoArticulo, opcion){
	
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarArticulo/' + codigoArticulo, 
        data : null,
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){
			
			if(xhr.status == HttpStatus.OK){
                var data = JSON.parse(result);
                cargarModalArticulo(data, opcion);
            }
			loadding(false);			
        }

    });
}

function registrarArticulo(){
	
	var activo = null;
	if (activoModal.is(':checked')){activo = 1} else{activo = 0}
	
	var objetoJson = {
		codigoArticulo		: codigoArticuloModal.text(),
		codigoEstandar		: codigoEstandarModal.val(),
		codigoAntiguo		: codigoAntiguoModal.val(),
		codigoBarras		: codBarrasModal.val(),
		descripcion			: descripcionModal.val(),
		codigoMarcaArticulo	: marcaArticuloModal.val(),
		codigoTipo			: tipoModal.val(),
		codigoSeccion		: seccionModal.val(),
		codigoUnidadMedida	: undMedidaModal.val(),
		codigoMarcaVehiculo	: marcaVehiculoModal.val(),
		codigoModelo		: modeloModal.val(),
		codigoMotor			: motorModal.val(),
		codigoAplicacion	: aplicacionModal.val(),
		observaciones		: observacionesModal.val(),
		imagen				: btoa(imagenModal.attr('src')),
		activo				: activo
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
		url : '/appkahaxi/registrarArticulo/',
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
				mostrarMensajeValidacion(resultado, codigoArticuloModal);
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
	marca.val(CADENA_VACIA);
	marca.trigger('click', [CADENA_VACIA]);
	seccion.val(CADENA_VACIA);
	undMedida.val(CADENA_VACIA);
	buscar();
	campoBuscar.focus();
}



