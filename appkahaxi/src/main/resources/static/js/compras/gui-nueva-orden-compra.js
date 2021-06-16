var indiceFilaDataTableDetalle = -1;
//**************************************************************** */
var marquee;
var codigoCliente;
var numeroDocumento;
var opcion;
var datoBuscar;
var nroOrdenCompra;
var codRepuesto;
var fechaDesde;
var fechaHasta;
var estadoParam;
var volverParam;

var titulo;
var codigo;
var codigoCliente;
var nroDocReferencia;
var numeroDocumento;
var opcion;

var formOrdenCompra;
var formObservaciones;
var campoBuscar;
var documentoCliente;
var nombreCliente;
var direccion;
var fecConta;
var fecHasta;
var tipoMoneda;
var condPago;
var dias;
var divDias;
var estado;
var fecEntrega;
var tipoCambio;
var referenciaDiv;
var nroDocReferenciaVer;

var divMensajeEliminado;
var btnIrGuiaRemision;
var btnGenerarGuiaRemision;
var btnLimpiar;
var btnVolver;

var btnAgregarArticulo;
var btnEliminarTodosArticulos;
var tableDetalle;
var tableNuevoDetalle;

var observaciones;
var subTotalOC;
var igvOC;
var totalOC;

var btnGrabar;
var btnDuplicar;

var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalleDuplicado;

var guiasPorOrdenCompraModal;
var modalCodigoOrdenCompra;
var tableDetalleGuias;
var dataTableDetalleGuias;

var dateTimePickerInput;

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	marquee = $(".marquee");
	codigoCliente =  $("#codigoCliente");
	numeroDocumento =  $("#numeroDocumento");
	opcion =  $("#opcion");
	datoBuscar =  $("#datoBuscar");
	nroOrdenCompra =  $("#nroOrdenCompra");
	codRepuesto =  $("#codRepuesto");
	fechaDesde =  $("#fechaDesde");
	fechaHasta =  $("#fechaHasta");
	estadoParam =  $("#estadoParam");
	volverParam =  $("#volverParam");
	
	titulo =  $("#titulo");
	codigo = $("#codigo");
	codigoCliente = $("#codigoCliente");
	nroDocReferencia = $("#nroDocReferencia");
	numeroDocumento = $('#numeroDocumento');
	opcion = $("#opcion");

	formOrdenCompra = $("#formOrdenCompra");
	formObservaciones  = $("#formObservaciones");
	campoBuscar = $("#campoBuscar");
	documentoCliente = $("#documentoCliente");
	nombreCliente = $("#nombreCliente");
	direccion = $("#direccion");
	fecConta = $("#fecConta");
	fecHasta = $("#fecHasta");
	tipoMoneda = $("#tipoMoneda");
	condPago = $("#condPago");
	dias = $("#dias");
	divDias = $("#divDias");
	estado = $("#estado");
	fecEntrega = $("#fecEntrega");
	tipoCambio = $("#tipoCambio");
	referenciaDiv = $("#referenciaDiv");
	nroDocReferenciaVer = $("#nroDocReferenciaVer");

	divMensajeEliminado = $("#divMensajeEliminado");
	btnIrGuiaRemision = $("#btnIrGuiaRemision");
	btnGenerarGuiaRemision = $("#btnGenerarGuiaRemision");
	btnLimpiar = $("#btnLimpiar");
	btnVolver = $("#btnVolver");

	btnAgregarArticulo = $("#btnAgregarArticulo");
	btnEliminarTodosArticulos = $("#btnEliminarTodosArticulos");
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalOC = $("#subTotalOC");
	igvOC = $("#igvOC");
	totalOC = $("#totalOC");

	btnGrabar = $("#btnGrabar");
	btnDuplicar = $("#btnDuplicar");
	
	guiasPorOrdenCompraModal = $("#guiasPorOrdenCompraModal");
	modalCodigoOrdenCompra = $("#modalCodigoOrdenCompra");
	tableDetalleGuias = $("#tableDetalleGuias");
	btnAceptarModal = $("#btnAceptarModal");
	
	dateTimePickerInput = $(".datetimepicker-input");
}

function inicializarComponentes() {

	habilitarAnimacionAcordion();
	habilitarMarquee();
	construirFechasPicker();
	retringirSeleccionFechas();
	habilitarAutocompletarBuscarCampos();
	inicializarEventos();
}

function inicializarPantalla() {
	if(opcion.text() == Opcion.NUEVO) {
		inicializarTabla(true);
		cargarPantallaNueva();
	} else {
		inicializarTabla(false);
		cargarPantallaConDatos();
	}
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-up');
    }).on('hide.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-down');
    });
}

function habilitarMarquee(){
	var timeout_ = null;
	$(".marquee").on("mouseover", function() {
		var interval_val = 2;    
		var this_ = this;
    	timeout_ = setInterval(function() {
      		$(this_).scrollLeft(interval_val);
      		interval_val++;
    		}, 25);
  	});

  	$(".marquee").on("mouseout", function() {
    	clearInterval(timeout_);
    	$(this).scrollLeft(0);
  	});	
}

function construirFechasPicker() {
	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});

	fecHasta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});

	fecEntrega.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});
}

function retringirSeleccionFechas() {

	fecConta.on("change.datetimepicker", function (e) {
		fecHasta.datetimepicker('minDate', e.date);
		fecHasta.datetimepicker('maxDate', moment(e.date).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ , 'day'));
		fecHasta.datetimepicker('date', moment(e.date).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ , 'day'));
		
		fecEntrega.datetimepicker('minDate', e.date);
	});	

}

function habilitarAutocompletarBuscarCampos() {

	campoBuscar.autocomplete({
		source: function( request, response ) {
			$.ajax({
				type:"Get",
				contentType : "application/json",
				accept: 'text/plain',
				url : '/appkahaxi/buscarSnLike/' + TipoSocioNegocios.PROVEEDOR + '/' + request.term,
				data : null,
				dataType: 'json',
				beforeSend: function(xhr) {
					loadding(true);
				},
				success:function(resultado){

					response($.map(resultado,function(item) {
						var AC = new Object();
						AC.label = item.numeroDocumento + ' - ' + item.nombreRazonSocial;
						AC.value = request.term;
						AC.codigoSocio 			= item.codigoSocio;
						AC.numeroDocumento 		= item.numeroDocumento;
						AC.nombreRazonSocial	= item.nombreRazonSocial;
						AC.direccionFiscal 		= item.direccionFiscal;
						return AC;
					}));

					loadding(false);
				},
				error: function (xhr, error, code){

					mostrarMensajeError(xhr.responseText);
					loadding(false);
				}
			});
		},

		minLength: 3,
		select: function(event, ui) {

			codigoCliente.val(ui.item.codigoSocio);
			documentoCliente.val(ui.item.numeroDocumento);
			nombreCliente.val(ui.item.nombreRazonSocial);
			direccion.val(ui.item.direccionFiscal);
			campoBuscar.val(CADENA_VACIA);
			if(indiceFilaDataTableDetalle == -1){
				agregarFilaEnTablaDetalle();
			}
		}
	});
}

function inicializarEventos() {

	btnAgregarArticulo.on("click", function() {
		agregarFilaEnTablaDetalle();
	});

	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		mostrarDialogoEliminarFila(dataTableDetalle, $(this));
	});

	$('.readonly').keydown(function(e){
		e.preventDefault();
	});

	$('.sinCaracteresEspeciales').keypress(function(e){
		return sinCaracteresEspeciales(e);
	});

	btnGrabar.on("click", function(e) {
		grabarOrdenCompra(e);
	});

	btnDuplicar.on("click", function() {
		duplicarPantallaOrdenCompra(numeroDocumento.text());
	});
	
	btnLimpiar.on("click", function() {
		limpiarOrdenCompra();
	});

	btnIrGuiaRemision.on("click", function(event) {
		mostrarModalGuiasPorOrdenCompra(event);
	});

	btnGenerarGuiaRemision.on("click", function() {
		mostrarDialogoGenerarGuiaRemision();
	});

	btnVolver.on("click", function() {
		volver();
	});

	condPago.on('change', function(){
		evaluarCambioCondicionPago();
	});

	tipoMoneda.on('change', function(){
		calcularPorTipoMoneda();
	});

	estado.on('change', function() {
		evaluarCambioEstado();
	});

	btnEliminarTodosArticulos.on("click", function() {
		mostrarDialogoEliminarTodo(dataTableDetalle);
	});	
}

function inicializarTabla(paginacion) {

	dataTableDetalle = tableDetalle.DataTable({
		"responsive"	: false,
		"scrollCollapse": false,
		"ordering"      : false,
		"deferRender"   : true,
		"autoWidth"		: false,
		"paging"	    : paginacion,
		"dom"           :   "<'row'<'col-sm-12'rt>>" +
			"<'row'<'col-sm-4 'l><'col-sm-8 'p>>",
		"lengthMenu"	: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
		"fnRowCallback":
			function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				var index = iDisplayIndexFull + 1;
				$('td:eq(0)', nRow).html(index);
				return nRow;
			},
		"language"  : {
			"url": "/appkahaxi/language/Spanish.json"
		}
	});
}

/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function inicializarFechaContaHasta(){
	console.log("inicializarFechaContaHasta")
    
	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecConta.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));
	
	var fecContaVal 	= fecConta.datetimepicker('date');
	var nuevaFechaVal 	= moment(fecContaVal).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ , 'day');
	fecHasta.datetimepicker('date', nuevaFechaVal);
}

function cargarPantallaNueva() {
	inicializarFechaContaHasta();
	obtenerTipoCambio(tipoCambio);

	controlNoRequerido(observaciones);
	titulo.text("NUEVA");
	dias.val(Dias._30);
	
	var volver = volverParam.text();
	if(volver == Volver.SI){
		mostrarControl(btnVolver);
	}
	campoBuscar.focus();
}

function cargarPantallaConDatos() {

	var nroDocReferenciaVal = numeroDocumento.text();

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarOrdenCompra/' + nroDocReferenciaVal ,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){

			if(xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTML(data);
				
				if(opcion.text() == Opcion.VER) {

					verPantallaOrdenCompra(data);
				}else {
					duplicarPantallaOrdenCompra(nroDocReferenciaVal);
				}
				
				dataTableDetalle.destroy();
				inicializarTabla(true);
			}

			loadding(false);
			window.scrollTo(0, 0);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

	mostrarControl(btnVolver);
}

function cargarPantallaHTML(data) {
	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	estado.val(data.codigoEstado);
	
	subTotalOC.val(convertirNumeroAMoneda(data.subTotal));
    igvOC.val(convertirNumeroAMoneda(data.igv));
    totalOC.val(convertirNumeroAMoneda(data.total));
	
	tipoCambio.val(data.tipoCambio);
	observaciones.val(data.observaciones);
	// evaluando si tiene documento de referencia
	if(data.numeroDocumentoRef != CADENA_VACIA){
		nroDocReferencia.val(data.numeroDocumentoRef);
		mostrarControl(referenciaDiv);
	}
	
	if(data.codigoCondPago == CondicionPago.CREDITO){
    	mostrarControl(divDias);
    }

	cantidadDetalleDuplicado = data.detalle.length;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];
		btnAgregarArticulo.click();
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidad);
		$('#cantidadPend_' + i).val(detalle.cantidadPendiente);
		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#igv_' + i).val(convertirNumeroAMoneda(detalle.igvDetalle));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
	}
}

function verPantallaOrdenCompra(data) {

	titulo.text("VER");
	codigo.html(numeroDocumento.text());

	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecHasta.datetimepicker('date', moment(data.fechaValidoHasta));
	fecEntrega.datetimepicker('date', moment(data.fechaEntrega));

	//deshabilitarControl('.datetimepicker-input');
	deshabilitarControl(dateTimePickerInput);

	deshabilitarControl(campoBuscar);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);

	if(data.codigoEstado == EstadoDocumentoInicial.POR_APROBAR){

		habilitarControl(estado);
		mostrarControl(btnDuplicar);
		estado.focus();
	}else if(data.codigoEstado == EstadoDocumentoInicial.RECHAZADO){

		deshabilitarControl(estado);
		mostrarControl(btnDuplicar);
		btnVolver.focus();
	}else{

		// estado APROBADO
		deshabilitarControl(estado);
		mostrarControl(btnDuplicar);
		mostrarControl(btnGenerarGuiaRemision);

		if(data.codigoEstadoProceso == EstadoProceso.ABIERTO){
			// estado proceso ABIERTO
			habilitarControl(btnGenerarGuiaRemision);
			btnGenerarGuiaRemision.removeClass('btn btn-secondary').addClass('btn btn-primary');
		}else{
			// estado proceso CERRADO
			deshabilitarControl(btnGenerarGuiaRemision);
			btnGenerarGuiaRemision.removeClass('btn btn-primary').addClass('btn btn-secondary');
		}

		mostrarControl(btnIrGuiaRemision);
		btnGenerarGuiaRemision.focus();
	}

	deshabilitarControl(observaciones);
	ocultarControl(btnGrabar);
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);
	ocultarControl(btnLimpiar);

	deshabilitarDetalleOrdenCompra();
}

function duplicarPantallaOrdenCompra(nroDocRef) {
	console.log("duplicarPantallaCotizacionVenta....");
	// ****** CABECERA
	titulo.text("DUPLICAR");

	inicializarFechaContaHasta();
	opcion.text(Opcion.DUPLICAR);
	obtenerTipoCambio(tipoCambio);
    codigo.html(CADENA_VACIA);

	nroDocReferencia.val(nroDocRef);
	mostrarControl(referenciaDiv);

	estado.val(EstadoDocumentoInicial.POR_APROBAR);

	//observaciones.val(CADENA_VACIA);
	controlNoRequerido(observaciones);

	//habilitarControl('.datetimepicker-input');
	habilitarControl(dateTimePickerInput);
	habilitarControl(tipoMoneda);
	habilitarControl(condPago);
	habilitarControl(dias);
	deshabilitarControl(estado);
	habilitarControl(observaciones);
	habilitarControl(campoBuscar);

	mostrarControl(btnGrabar);
	mostrarControl(btnAgregarArticulo);
	mostrarControl(btnEliminarTodosArticulos);
	mostrarControl(btnLimpiar);
	
	ocultarControl(btnDuplicar);
	ocultarControl(btnGenerarGuiaRemision);
	
	// ******* DETALLE
	habilitarDetalleOrdenCompra();
	campoBuscar.focus();
}

function deshabilitarDetalleOrdenCompra(){

	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			deshabilitarControl($(this).find(".buscar-det"));
			deshabilitarControl($(this).find(".cantidad-det"));
			deshabilitarControl($(this).find(".precio-det"));
			
			deshabilitarControl($(this).find(".btn-delete"));
		});
	});
}

function habilitarDetalleOrdenCompra(){
	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			habilitarControl($(this).find(".buscar-det"));
			habilitarControl($(this).find(".cantidad-det"));
			habilitarControl($(this).find(".precio-det"));
			
			habilitarControl($(this).find(".btn-delete"));
		});
	});
}

function agregarFilaEnTablaDetalle() {
	var filaHTML = tableNuevoDetalle.find("tr")[0].outerHTML;

	var fila = dataTableDetalle.row.add($(filaHTML)).draw(false);

	indiceFilaDataTableDetalle = fila.index();
	console.log("al agregar fila, indiceFilaDataTableDetalle-->" + indiceFilaDataTableDetalle);
	
	agregarFilaHTMLEnTablaDetalle();

	if(indiceFilaDataTableDetalle >= 0) {
		mostrarControl(btnEliminarTodosArticulos);
		mostrarControl(btnAgregarArticulo);
	}
}

function agregarFilaHTMLEnTablaDetalle() {
	agregarHTMLColumnasDataTable();

	var tipoMonedaValor = tipoMoneda.val();

	if(tipoMonedaValor == Moneda.SOLES){
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}

	$('#buscarArticulo_' + indiceFilaDataTableDetalle).focus();
}

function agregarHTMLColumnasDataTable() {
	var row = $('#tableDetalle').DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");
	var $tds = row.find("td").not(':first').not(':last');

	$.each($tds, function(i, el) {

		switch(i) {

			// buscar artículo
			case 0:		$(this).html(CADENA_VACIA).append(
									"<div>" + 
			    						"<input class='form-control buscar-det' type='text' onkeyup='buscarArticuloKeyUp(event, this, " + indiceFilaDataTableDetalle + ");' maxlength='50' id='buscarArticulo_" + indiceFilaDataTableDetalle + "'>" +
			    					"</div>");
						break;
    		
			// CODIGO ART (OCULTO)
			case 1:		$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// DESCRIPCION CODIGO ART
			case 2:		$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;						
    		        		
			// DESCRIPCION ART
			case 3:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
    					
    		// MARCA ART
			case 4:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
				
			// CANTIDAD
			case 5:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad-det' type='text' onkeyup='cantidadKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);' onkeydown='cantidadKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			// CANTIDAD PENDIENTE
			case 6:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='cantidadPend_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// PRECIO
			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha precio-det' type='text' onkeyup='precioKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
				"onkeydown='precioKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "'>" +
				"</span></div>");
				break;

			// IGV
			case 8:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='igv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			// SUBTOTAL
			case 9:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
		}
	});
	habilitarMarquee();
}


/**************** EVENTOS DETALLE *******************/

function buscarArticuloKeyUp(e, control, fila){
	var codCliente = codigoCliente.val();
	var datoBuscar = control.value.trim();
	var key = window.Event ? e.which : e.keyCode;
	/*	| 38 | (Arriba) |
		| 40 | (Abajo) |
		| 37 | (Izquierda) |
		| 39 | (Derecha) |
	 */
	// no hacer nada si son las teclas direccionales IZQ o DER
	if(key != 37 && key != 39){
		$('#buscarArticulo_' + fila).autocomplete({
			source: function( request, response ) {
				console.log("buscarArticuloKeyUp, autocomplete....");
				$.ajax({
					type:"Get",
			        contentType : "application/json",
			        accept: 'text/plain',
			        url : '/appkahaxi/buscarArticuloLike/' + datoBuscar + '/' + codCliente,
			        data : null,
			        dataType: 'json',							  
			        beforeSend: function(xhr) {
			        	console.log("buscarArticuloKeyUp...beforesend, loading.....");
			        	//loadding(true);
			        },
			        success:function(resultado){
			        	/*
						response($.map(resultado, 
			        				function(item) {
						        		return {
						        				label: item.codigoArticulo + ' - ' + item.codigoEstandar + ' - ' + item.descripcion,
						        				value: item.codigoArticulo + '/' + item.descripcion + '/' + item.descripcionMarcaArticulo + '/' + item.precioVtaUnd
						        	      		}
			        	  		}));
			        	loadding(false);
			        	*/
			        	response($.map(resultado,function(item) {
			        		var AC = new Object();
			    			// requeridos
			        		AC.label = item.codigoEstandar + ' / ' + item.descripcion + ' / ' + item.descripcionMarcaArticulo + ' / ' + 
									   item.descripcionTipo + ' / ' + item.descripcionSeccion + ' / ' + item.descripcionUnidadMedida + ' / ' + 
									   ((item.descripcionMarcaVehiculo == null) ? '(Sin marca vehículo)':item.descripcionMarcaVehiculo) + ' / ' + 
									   ((item.descripcionModelo == null) ? '(Sin modelo)':item.descripcionModelo)	;
	                        AC.value = request.term;;
	                        // personalizando campos
	                        AC.codArticulo				= item.codigoArticulo;
	                        AC.codEstandar				= item.codigoEstandar;
							AC.descripcion				= item.descripcion;
	                        AC.descripcionMarcaArticulo = item.descripcionMarcaArticulo;
	                        AC.precioVentaUnitario		= item.precioVentaUnitario;
							AC.precioReferencia			= item.precioReferencia;
							
	                        return AC;
	        	  		}));
			        	//loadding(false);
			        },
			        error: function (xhr, error, code){
			        	console.log("buscarArticuloKeyUp, error...." + xhr.status);
			        	mostrarMensajeError(xhr.responseText);
			        	//loadding(false);
			        }
			    });
		      },
		    minLength: 3,
		    select: function(event, ui) {
		    	event.preventDefault();
		    	
				$('#buscarArticulo_' + fila).val(CADENA_VACIA);
				$('#codigo_' + fila).val(ui.item.codArticulo);
				$('#descCodigo_' + fila).val(ui.item.codEstandar);
		    	$('#descripcion_' + fila).val(ui.item.descripcion);
		    	$('#marca_' + fila).val(ui.item.descripcionMarcaArticulo);
		    	
		    	$('#cantidad_' + fila).focus();
		    }
	    });
	}
}

function cantidadKeyUp(control, fila) {

	var cantidad = Number(control.value);
	var precio = Number($('#precio_' + fila).val());
	var subTotal = cantidad * precio;	
	var igv = subTotal * ParametrosGenerales.IGV/100;

	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));	
	$('#igv_' + fila).val(convertirNumeroAMoneda(igv));
	$('#cantidadPend_' + fila).val(cantidad);
	
	calcularResumenOrdenCompra();
}

function cantidadKeyDown(e, fila){
	var key = window.Event ? e.which : e.keyCode;
	console.log("cantidadKeyDown, key-->" + key);
	// si es ENTER
	if(key == 13){
		console.log("cantidadKeyDown, foco en PVU");
		$('#precio_' + fila).select();
	}
}

function precioKeyUp(control, fila) {

	var cantidad = Number($('#cantidad_' + fila).val());
	var precio = Number(control.value);
	
	var subTotal = cantidad * precio;
	var igv = subTotal * ParametrosGenerales.IGV/100;

	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	$('#igv_' + fila).val(convertirNumeroAMoneda(igv));
	
	calcularResumenOrdenCompra();
}

function precioKeyDown(e, fila){
	var key = window.Event ? e.which : e.keyCode;
	console.log("precioKeyDown, key-->" + key);
	// si es ENTER
	if(key == 13){
		btnAgregarArticulo.click();
	}
}


/**************** EVENTOS FORMULARIO *******************/

function evaluarCambioCondicionPago() {
	var condPagoVal = condPago.val();

	if(condPagoVal == CondicionPago.CREDITO){
		controlRequerido(dias)
		mostrarControl(divDias);
	}else{
		controlNoRequerido(dias);
		ocultarControl(divDias);
	}
}

function calcularPorTipoMoneda() {
	var tipoMonedaVal = tipoMoneda.val();

	if(tipoMonedaVal == Moneda.SOLES) {
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
		convertirMontosASoles();
	}else{
		$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
		convertirMontosADolares();
	}
}

function evaluarCambioEstado() {
	
	if(estado.val() == EstadoDocumentoInicial.APROBADO) {

		mostrarControl(btnGrabar);
		ocultarControl(btnDuplicar);
		habilitarControl(observaciones);
		controlNoRequerido(observaciones);

	} else if(estado.val() == EstadoDocumentoInicial.RECHAZADO) {

		ocultarControl(btnGenerarGuiaRemision);
		ocultarControl(btnDuplicar);
		mostrarControl(btnGrabar);
		controlRequerido(observaciones);
		habilitarControl(observaciones);
		mostrarMensajeValidacion("Debe ingresar observaciones antes de grabar.", observaciones);

	} else {
		// POR APROBAR
		ocultarControl(btnGenerarGuiaRemision);
		ocultarControl(btnGrabar);
		mostrarControl(btnDuplicar);
		controlNoRequerido(observaciones);
		deshabilitarControl(observaciones);
	}
}

function grabarOrdenCompra(event) {

	if(documentoCliente.val() == CADENA_VACIA){
		mostrarDialogoInformacion("Debe buscar un proveedor", Boton.WARNING, $('#campoBuscar'));
		return false;
	}
	
	if (formOrdenCompra[0].checkValidity() == true) {
		event.stopPropagation();
		console.log("entrando validado....")
		event.preventDefault();
		
		if(validarDetalleOrden()){
			if(estado.val() == EstadoDocumentoInicial.POR_APROBAR){
				registrarOrdenCompra();
			} else {
				if(formObservaciones[0].checkValidity() == true) {
					actualizarOrdenCompra();
				} else {
					console.log("validado FALSE!!!....")
        			event.stopPropagation();
				}
			}
		}
	} else {
		console.log("validado FALSE!!!....")
        event.stopPropagation();
		
	}
	formOrdenCompra.addClass('was-validated');
	formObservaciones.addClass('was-validated');
}

function validarDetalleOrden(){

	if(indiceFilaDataTableDetalle == null || indiceFilaDataTableDetalle == -1){
		mostrarDialogoInformacion("Debe ingresar items a la orden", Boton.WARNING, $('#btnAgregarArticulo'));
		return false;
	}

	for(i=0; i< ( indiceFilaDataTableDetalle + 1) ; i++) {

		if($('#codigo_' + i).val() != undefined ) {

			var codigo = $('#codigo_' + i).val().trim();
			var descripcion = $('#descripcion_' + i).val().trim();
			var cantidad = $('#cantidad_' + i).val().trim();
			var precio = $('#precio_' + i).val().trim();

			if (codigo == CADENA_VACIA || descripcion == CADENA_VACIA) {
				mostrarDialogoInformacion('Debe ingresar el código.', Boton.WARNING, $('#codigo_' + i));
				return false;
			}
			if (cantidad == CADENA_VACIA) {
				mostrarDialogoInformacion('Debe ingresar la cantidad.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}
			if (precio == CADENA_VACIA) {
				mostrarDialogoInformacion('Debe ingresar el precio.', Boton.WARNING, $('#precio_' + i));
				return false;
			}

			if(convertirMonedaANumero(cantidad) == 0){
				mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}

			if(convertirMonedaANumero(precio) == 0){
				mostrarDialogoInformacion('Debe ingresar un precio mayor a cero.', Boton.WARNING, $('#precio_' + i));
				return false;
			}

		}
	}
	return true;
}

function registrarOrdenCompra(){

	var nroDocumento  			= codigo.html();
	var codigoClienteVal  		= codigoCliente.val().trim();
	var fecContaVal 			= fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecHastaVal 			= fecHasta.datetimepicker('date').format('YYYY-MM-DD');
	var fecEntregaVal 			= fecEntrega.datetimepicker('date').format('YYYY-MM-DD');
	var tipoMonedaVal 			= tipoMoneda.val();
	var condPagoVal 			= condPago.val();
	var estadoVal 				= estado.val();
	var tipoCambioVal			= tipoCambio.val();
	var observacionesVal 		= observaciones.val().trim();
	var numeroDocumentoRefVal	= nroDocReferencia.val();
	
	var subTotalVal 			= convertirMonedaANumero(subTotalOC.val().trim());
	var igvVal 					= convertirMonedaANumero(igvOC.val());
	var totalVal 				= convertirMonedaANumero(totalOC.val().trim());
	
	var detalle 				= tableToJSON(tableDetalle);
	var diasVal					= null;

	if(condPagoVal == CondicionPago.CREDITO) {
		diasVal					= dias.val();
	}

	var objetoJson = {

		numeroDocumento:		nroDocumento,
		codigoCliente:  		codigoClienteVal,
		fechaContabilizacion:   fecContaVal,
		fechaValidoHasta:       fecHastaVal,
		fechaEntrega:       	fecEntregaVal,
		codigoTipoMoneda:     	tipoMonedaVal,
		codigoCondPago:     	condPagoVal,
		codigoDias:     		diasVal,
		codigoEstado:       	estadoVal,
		tipoCambio:				tipoCambioVal,
		observaciones:  		observacionesVal,
		numeroDocumentoRef:		numeroDocumentoRefVal,
		subTotal:  				subTotalVal,
		igv:  					igvVal,
		total:  				totalVal,
		detalle:  				detalle
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
		url : '/appkahaxi/registrarOrdenCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				
				limpiarOrdenCompra();

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

function actualizarOrdenCompra() {

	var nroDocumento  		= codigo.html();
	var estadoVal 			= estado.val();
	var observacionesVal 	= observaciones.val().trim();

	var objetoJson = {
		numeroDocumento:	nroDocumento,
		codigoEstado:       estadoVal,
		observaciones:  	observacionesVal
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
		url : '/appkahaxi/actualizarOrdenCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				mostrarNotificacion("El registro fué actualizado correctamente.", "success");

				if(estado.val() == EstadoDocumentoInicial.APROBADO) {
					mostrarControl(btnGenerarGuiaRemision);
					ocultarControl(btnGrabar);
					ocultarControl(btnLimpiar);
					deshabilitarControl(estado);
					controlNoRequerido(observaciones);
					deshabilitarControl(observaciones);
					
					window.scrollTo(0, 0);

				} else {
					volver();
				}

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

function tableToJSON(dataTable) {
	var data = [];
	var $headers = dataTable.find("th").not(':first').not(':last');
	
	dataTable.DataTable().rows().iterator('row', function(context, index){
		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');
		data[index] = {};

		$cells.each(function(cellIndex) {

			if($($headers[cellIndex]).attr('id') == 'codArticulo' && $(this).find("input").val() == CADENA_VACIA){
				return false;
			}else{
				if($($headers[cellIndex]).attr('id') == 'precioUnitario' || $($headers[cellIndex]).attr('id') == 'igvDetalle' || $($headers[cellIndex]).attr('id') == 'subTotal'){
					data[index][$($headers[cellIndex]).attr('id')] = convertirMonedaANumero($(this).find("input").val());
				}else{
					if($($headers[cellIndex]).attr('id') != 'buscarArticulo'){
						data[index][$($headers[cellIndex]).attr('id')] = $(this).find("input").val();
					}
				}
			}
		});

	});

	console.log("data--->" + data);
	// eliminando las filas en blanco
	var newData = [];
	for(i=0, j=0; i<data.length;i++){
		console.log("data[i][codArticulo]--->" + data[i]['codArticulo']);
		if(data[i]['codArticulo'] != UNDEFINED){
			newData[j] = data[i];
			j++;
		}
	}
	
	return newData;
}

function mostrarDialogoEliminarFila(table, row){

	bootbox.confirm({
		message: "¿Está seguro que desea eliminar el registro?",
		
		buttons: {
			confirm: {
				label: 'Sí',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result == true){
				table.row(row.closest('tr')).remove().draw();
				indiceFilaDataTableDetalle--;
				if(indiceFilaDataTableDetalle == -1){
					ocultarControl(btnEliminarTodosArticulos);
				}
				calcularResumenOrdenCompra();
			}
		}
	});
}

function mostrarDialogoEliminarTodo(table) {

	bootbox.confirm({
		message: "¿Está seguro que desea eliminar todos los registros?",
		buttons: {
			confirm: {
				label: 'Sí',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result == true) {
				table.clear().draw();
				indiceFilaDataTableDetalle = -1;
				calcularResumenOrdenCompra();
				ocultarControl(btnEliminarTodosArticulos);
			}
		}
	});
}

function mostrarDialogoGenerarGuiaRemision() {

	bootbox.confirm({
		message: "¿Está seguro de generar Guía de Remisión?",
		buttons: {
			confirm: {
				label: 'Sí',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result == true){
				generarGuiaRemisionPorOrden();
			}
		}
	});
}

function generarGuiaRemisionPorOrden() {

	var opcion = Opcion.NUEVO;
	var params = "numeroDocumento=" + numeroDocumento.text() + "&opcion=" + opcion + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
	window.location.href = "/appkahaxi/nueva-guia-remision?" + params;

}

function cargarGuiaRemisionAsociada(numeroDocumento, opcion) {
	var params;
	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&guias=&volver=" + Volver.NO;

	window.location.href = "/appkahaxi/nueva-guia-remision?" + params;
}

function volver(){
	var params;
	var dato 		= datoBuscar.text();
	var nroOC 		= nroOrdenCompra.text();
	var codRpto 	= codRepuesto.text();
	var fecDesde 	= fechaDesde.text();
	var fecHasta 	= fechaHasta.text();
	var estParam	= estadoParam.text();

	params = "datoBuscar=" + dato + "&nroOrdenCompra=" + nroOC + "&codRepuesto=" + codRpto + 
			 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
	window.location.href = "/appkahaxi/mantenimiento-orden-compra?" + params;
}


function limpiarOrdenCompra() {
	inicializarFechaContaHasta();

	campoBuscar.val(CADENA_VACIA);
	documentoCliente.val(CADENA_VACIA);
	nombreCliente.val(CADENA_VACIA);
	direccion.val(CADENA_VACIA);
	tipoMoneda.val(Moneda.DOLARES);
	condPago.val(CondicionPago.CONTADO);
	dias.val(Dias._30);
	estado.val(EstadoDocumentoInicial.POR_APROBAR);
	subTotalOC.val(CADENA_VACIA);
	igvOC.val(CADENA_VACIA);
	totalOC.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);

	dataTableDetalle.clear().draw();
	indiceFilaDataTableDetalle = -1;

	ocultarControl(divDias);
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);

	formOrdenCompra.removeClass('was-validated');
	formObservaciones.removeClass('was-validated');

	campoBuscar.focus();
}

function mostrarModalGuiasPorOrdenCompra(event) {

	modalCodigoOrdenCompra.text(numeroDocumento.text());
	obtenerDetalleGuiaPorOrdenCompra(event);
	mostrarModal(guiasPorOrdenCompraModal);
}

function obtenerDetalleGuiaPorOrdenCompra(event){

	event.preventDefault();
	event.stopPropagation();

	if ( $.fn.dataTable.isDataTable('#tableDetalleGuias')) {

		dataTableDetalleGuias.clear();
		dataTableDetalleGuias.ajax.reload(null, true);

	} else {

		dataTableDetalleGuias = tableDetalleGuias.DataTable({

			"ajax": {
				data: function ( d ) {
					d.codigoOrdenCompra 	= numeroDocumento.text().trim();
				},
				url: '/appkahaxi/listarGuiaRemisionPorOrdenCompra/',
				dataSrc: function (json) {
					console.log("listarGuiaRemisionPorOrdenCompra...success");
					return json;
				},
				error: function (xhr, error, code){

				}
			},
			"stateSave": true,
			"responsive"	: false,
			"scrollCollapse": false,
			"dom"           :   "<'row'<'col-sm-8'i><'col-sm-4'>>" +
				"<'row'<'col-sm-12'rt>>" +
				"<'row'<'col-sm-4'l><'col-sm-8'p>>",
			"lengthMenu"	: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
			"deferRender"   : true,
			"autoWidth"		: false,
			"columnDefs"    : [
				{
					"width": "30px",
					"targets": [0],
					"data": "numeroDocumento",
					"orderable": false,
					"render": function(data, type, row) {
						return '<a href="#" class="link-ver-guia">' + data + '</a>';
					}
				},
				{
					"width": "30px",
					"targets": [1],
					"data": "fechaDocumento",
					"orderable": false
				},
				{
					"width": "30px",
					"targets": [2],
					"data": "fechaContabilizacion",
					"orderable": false
				},
				{
					"width": "30px",
					"targets": [3],
					"data": "serieCorrelativo",
					"orderable": false
				},
				{
					"width": "20px",
					"targets": [4],
					"data": "subTotal",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  formatearMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [5],
					"data": "igv",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  formatearMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [6],
					"data": "total",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  formatearMoneda(data);
						}
				}
			],
			"fnRowCallback":
				function(row, data, iDisplayIndex, iDisplayIndexFull){

					if(data.codigoTipoMoneda == Moneda.SOLES){
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(6)', row).addClass('dt-body-right listado-symbol-sol');
					}else{
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(6)', row).addClass('dt-body-right listado-symbol-dolar');
					}

					// modificando el tamaño de los caracteres del listado
					return row;

				},
			"language"  : {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});

		$('#tableDetalleGuias tbody').on('click','.link-ver-guia', function () {

			var data = dataTableDetalleGuias.row( $(this).closest('tr')).data();
			cargarGuiaRemisionAsociada(data.numeroDocumento, Opcion.VER);
		});

	}
}


/********************* CALCULOS NUMERICOS ********************/

function calcularResumenOrdenCompra(){

	var subTotal = 0;

	// 1. sumamos el campo subTotal de cada fila
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');
		$cells.each(function(cellIndex) {

			if($($headers[cellIndex]).attr('id') == 'subTotal') {
				
				parcial = ($(this).find("input").val() != CADENA_VACIA && $(this).find("input").val() != UNDEFINED) ? $(this).find("input").val() : 0;
				//console.log("parcial-->" + parcial + "; i-->" + i + "; typeof-->" + (typeof parcial));
				if((typeof parcial) == 'string'){
					parcial = convertirMonedaANumero(parcial);
				}
				subTotal = Number(subTotal) + Number(parcial);
			}
		});
	});

	// 2. hacemos los cáculos del IGV y TOTAL de la OC
	var igv = subTotal * (ParametrosGenerales.IGV/100);
	var total = subTotal + igv;
	
	subTotalOC.val(convertirNumeroAMoneda(subTotal));
	igvOC.val(convertirNumeroAMoneda(igv));
	totalOC.val(convertirNumeroAMoneda(total));
}

function convertirMontosASoles() {
	console.log("convertirMontosASoles.....");
	var tc = Number(tipoCambio.val());
	var nvoPrecio;
	var nvoIgv;
	var nvoSubTotal;
	var subTotal;
	var igv;
	var total;
	
	for(i=0; i < (indiceFilaDataTableDetalle+1); i++) {
		nvoPrecio = Number(convertirMonedaANumero($('#precio_' + i).val())) * tc;
		nvoIgv = Number(convertirMonedaANumero($('#igv_' + i).val())) * tc;
		nvoSubTotal = Number(convertirMonedaANumero($('#subTotal_' + i).val())) * tc;
		
		$('#precio_' + i).val(convertirNumeroAMoneda(nvoPrecio));
		$('#igv_' + i).val(convertirNumeroAMoneda(nvoIgv));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(nvoSubTotal));
	}
	
	subTotal = Number(convertirMonedaANumero(subTotalOC.val())) * tc;
	igv = Number(convertirMonedaANumero(igvOC.val())) * tc;
	total = Number(convertirMonedaANumero(totalOC.val())) * tc;
	
	subTotalOC.val(convertirNumeroAMoneda(subTotal));
	igvOC.val(convertirNumeroAMoneda(igv));
	totalOC.val(convertirNumeroAMoneda(total));
}

function convertirMontosADolares() {
	console.log("convertirMontosADolares.....");
	var tc = Number(tipoCambio.val());
	var nvoPrecio;
	var nvoIgv;
	var nvoSubTotal;
	var subTotal;
	var igv;
	var total;
	
	for(i=0; i < (indiceFilaDataTableDetalle+1); i++) {
		nvoPrecio = Number(convertirMonedaANumero($('#precio_' + i).val())) / tc;
		nvoIgv = Number(convertirMonedaANumero($('#igv_' + i).val())) / tc;
		nvoSubTotal = Number(convertirMonedaANumero($('#subTotal_' + i).val())) / tc;
		
		$('#precio_' + i).val(convertirNumeroAMoneda(nvoPrecio));
		$('#igv_' + i).val(convertirNumeroAMoneda(nvoIgv));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(nvoSubTotal));
	}
	
	subTotal = Number(convertirMonedaANumero(subTotalOC.val())) / tc;
	igv = Number(convertirMonedaANumero(igvOC.val())) / tc;
	total = Number(convertirMonedaANumero(totalOC.val())) / tc;
	
	subTotalOC.val(convertirNumeroAMoneda(subTotal));
	igvOC.val(convertirNumeroAMoneda(igv));
	totalOC.val(convertirNumeroAMoneda(total));
}


/*******************************  */



























































































function reiniciarFechaContaDesdeHasta(){

	var fecContabilizacion = new Date();
	var fecContaHastaVal = moment(fecContabilizacion).add(30 , 'day');
	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecHasta.datetimepicker('date', fecContaHastaVal);
	fecEntrega.datetimepicker('date', null);
}






