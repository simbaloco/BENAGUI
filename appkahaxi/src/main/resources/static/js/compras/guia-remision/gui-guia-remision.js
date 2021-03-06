var titulo;
var codigo;
var codigoProv;
var nroDocReferencia;
var opcion;
var campoBuscarFiltro;
var nroGuiaRemisionFiltro;
var nroOrdenCompraFiltro;
var codRepuestoFiltro;
var fecDesdeFiltro;
var fecHastaFiltro;
var estadoFiltro;
var deListaOC;
var nroOrdenCompraOrigen;
var deListaGR;
var nroGuiaRemisionOrigen;

var formGuiaRemision;
var formObservaciones;
var OCReferencia;
var documentoProv;
var nombreProv;
var direccion;
var direccionDespacho;
var personaContacto;
var fecConta;
var fecDocumento;
var tipoMoneda;
var condPago;
var dias;
var divDias;
var fecRecepcion;
var tipoCambio;
var serie;
var correlativo;
var motivoTraslado;
var referenciaDiv;
var nroDocReferenciaVer;

var divMensajeEliminado;
var btnGenerarFactura;
var btnAnular;
var btnLimpiar;
var btnVolver;

var tableDetalle;
var tableNuevoDetalle;

var observaciones;
var subTotalGR;
var igvGR;
var totalGR;

var btnGrabar;

var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalleDuplicado;

var guiasPorOrdenCompraModal;
var modalCodigoOrdenCompra;
var tableSeleccionGR;
var dataTableSeleccionGR;
var btnAceptarModal;

var btnIrFactura;
var facturasPorGuiaRemisionModal;
var modalCodigoGuiaRemision;
var tableSeleccionDocumento;
var dataTableSeleccionDocumento;

var dateTimePickerInput;
var valorIGV;
var listaAlmacenModel;
var lblAnulado;

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	titulo =  $("#titulo");
	codigo = $("#codigo");
	codigoProv = $("#codigoProv");
	nroDocReferencia = $("#nroDocReferencia");
	opcion =  $("#opcion");
	campoBuscarFiltro =  $("#campoBuscarFiltro");
	nroGuiaRemisionFiltro =  $("#nroGuiaRemisionFiltro");
	nroOrdenCompraFiltro =  $("#nroOrdenCompraFiltro");
	codRepuestoFiltro =  $("#codRepuestoFiltro");
	fecDesdeFiltro =  $("#fecDesdeFiltro");
	fecHastaFiltro =  $("#fecHastaFiltro");
	estadoFiltro =  $("#estadoFiltro");
	deListaOC =  $("#deListaOC");
	nroOrdenCompraOrigen =  $("#nroOrdenCompraOrigen");
	deListaGR =  $("#deListaGR");
	nroGuiaRemisionOrigen =  $("#nroGuiaRemisionOrigen");
	
	formGuiaRemision = $("#formGuiaRemision");
	formObservaciones = $("#formObservaciones");
	OCReferencia = $("#OCReferencia");
	documentoProv = $("#documentoProv");
	nombreProv = $("#nombreProv");
	direccion = $("#direccion");
	direccionDespacho = $("#direccionDespacho");
	personaContacto = $("#personaContacto");
	fecConta = $("#fecConta");
	fecDocumento = $("#fecDocumento");
	tipoMoneda = $("#tipoMoneda");
	condPago = $("#condPago");
	dias = $("#dias");
	divDias = $("#divDias");
	fecRecepcion = $("#fecRecepcion");
	serie = $("#serie");
	correlativo = $("#correlativo");
	motivoTraslado = $("#motivoTraslado");
	tipoCambio = $("#tipoCambio");
	referenciaDiv = $("#referenciaDiv");
	nroDocReferenciaVer = $("#nroDocReferenciaVer");

	divMensajeEliminado = $("#divMensajeEliminado");
	btnGenerarFactura = $("#btnGenerarFactura");
	btnAnular = $("#btnAnular");
	btnLimpiar = $("#btnLimpiar");
	btnVolver = $("#btnVolver");

	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalGR = $("#subTotalGR");
	igvGR = $("#igvGR");
	totalGR = $("#totalGR");

	btnGrabar = $("#btnGrabar");

	guiasPorOrdenCompraModal = $("#guiasPorOrdenCompraModal");
	modalCodigoOrdenCompra = $("#modalCodigoOrdenCompra");
	tableSeleccionGR = $("#tableSeleccionGR");
	btnAceptarModal = $("#btnAceptarModal");

	btnIrFactura = $("#btnIrFactura");

	facturasPorGuiaRemisionModal = $("#facturasPorGuiaRemisionModal");
	modalCodigoGuiaRemision = $("#modalCodigoGuiaRemision");
	tableSeleccionDocumento = $("#tableSeleccionDocumento");

	dateTimePickerInput = $(".datetimepicker-input");
	listaAlmacenModel = $("#listaAlmacenModel");
	lblAnulado = $("#lblAnulado");
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	habilitarMarquee();
	
	construirFechasPicker();
	inicializarFechas();
	restringirSeleccionFechas();
	
	inicializarEventos();
}

function inicializarPantalla() {
	console.log("inicializar pantalla---> opcion.text()--->" + opcion.text());
	//inicializarFechas();
	
	if(opcion.text() == Opcion.NUEVO) {
		console.log("siiii");
		inicializarTablaDetalle(true);		
		cargarPantallaConDatosOrdenCompra();		
	}else {
		console.log("noooooo");
		inicializarTablaDetalle(false);
		cargarPantallaConDatosGuiaRemision();
	}
}

function construirFechasPicker() {
	console.log("construirFechasPicker...")
	/* se construyen del ??ltimo al primero para que funcionen con el bot??n "limpiar" */
	
	// La fecha de Recepci??n de la Gu??a de Remisi??n:
	// ???	No puede ser mayor que la fecha actual.
	// ???	No puede ser mayor que la fecha de contabilizaci??n
	// ???	No puede ser menor que la fecha de Documento.
	fecRecepcion.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		date:		moment(),
		//minDate:	moment(),
		//maxDate:	moment(),
	});
	
	// La fecha de Documento de la Gu??a de Remisi??n:
	// ???	No puede ser mayor que la fecha actual.
	// ???	No puede ser mayor que la fecha de contabilizaci??n
	fecDocumento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly: true,
		date:		moment(),
		//maxDate:	moment(),
	});
		
	// La fecha de contabilizaci??n no puede ser mayor a la fecha actual	
	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		date:		moment(),
		//maxDate:	moment(),
	});	
}

function restringirSeleccionFechas() {

	fecDocumento.on("change.datetimepicker", function (e) {
		console.log("aaa");
		//reiniciarMinFechaEntrega();
		fecRecepcion.datetimepicker('minDate', e.date);
	});

	fecConta.on("change.datetimepicker", function (e) {
		//reiniciarMaxFechas();
		console.log("bbb");
		
		fecDocumento.datetimepicker('maxDate', e.date);
		fecRecepcion.datetimepicker('maxDate', e.date);
	});
}

function inicializarFechas(){
	console.log("inicializarFechas...");
	
	fecConta.datetimepicker('maxDate', moment());
	console.log("1");
		
	fecConta.datetimepicker('date', moment());
	console.log("2");
	
	fecDocumento.datetimepicker('date', moment());
	console.log("3");
			
	fecRecepcion.datetimepicker('date', moment());
	console.log("4");
	
	fecDocumento.datetimepicker('maxDate', moment());
	console.log("5");
	
	//fecRecepcion.datetimepicker('minDate', moment());
	//fecRecepcion.datetimepicker('maxDate', moment());
	
	
}

function inicializarEventos() {

	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		if(indiceFilaDataTableDetalle == 0){
			mostrarMensajeValidacion("No se puede eliminar el ??nico item de la Gu??a de Remisi??n.");
		}else{
			mostrarDialogoEliminarFila(dataTableDetalle, $(this));
		}
	});

	$('.readonly').keydown(function(e){
		e.preventDefault();
	});

	btnGrabar.on("click", function() {
		grabarGuiaRemision();
	});

	btnLimpiar.on("click", function() {
		limpiarGuiaRemision();
	});

	btnGenerarFactura.on("click", function(event) {
		//mostrarDialogoGenerarFactura(event);
		mostrarModalGuiasPorOrdenCompra(event);
	});

	btnAnular.on("click", function(event) {
		if (observaciones.val().trim() == CADENA_VACIA){
			controlRequerido(observaciones);
			habilitarControl(observaciones);
			mostrarMensajeValidacion("Debe ingresar observaciones antes de anular.", observaciones);
		}else{
			mostrarDialogoAnularGuiaRemision(event);
		}		
	});
	
	btnVolver.on("click", function() {
		volver();
	});
	
	serie.on('keypress', function(event){
		return soloAlfaNumericos(event);
	});

	correlativo.on('keypress', function(event){
		return soloEnteros(event);
	});

	btnAceptarModal.on("click", function() {
		generarFacturaAsociada();
	});

	btnIrFactura.on("click", function(event) {
		mostrarModalFacturasPorGuia(event);
	});
}

function inicializarTablaDetalle(paginacion) {

	dataTableDetalle = tableDetalle.DataTable({

		"responsive"	: false,
		"scrollCollapse": false,
		"ordering"      : false,
		"deferRender"   : true,
		"autoWidth"		: false,
		"paging"	    : paginacion,
		/*"dom"           :   "<'row'<'col-sm-12'rt>>" +
			"<'row'<'col-sm-4 'l><'col-sm-8 'p>>",*/
		"dom"			: '<ip<rt>lp>',
        "lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
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
/*
function inicializarFechas(){
	console.log("Inicializando fechas...");
	fecRecepcion.datetimepicker('date', moment());
	fecDocumento.datetimepicker('date', moment());
	fecConta.datetimepicker('date', moment());	
	fecConta.datetimepicker('maxDate', moment());
}
*/
function cargarPantallaConDatosOrdenCompra() {
	console.log("cargarPantallaConDatosOrdenCompra...");
	var nroDocReferenciaVal = nroOrdenCompraOrigen.text();

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarOrdenCompraParaGuiaRemision/' + nroDocReferenciaVal ,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){

			if(xhr.status == HttpStatus.OK) {
				console.log("result--->" + result);
				var data = JSON.parse(result);
				console.log("data--->" + data);
				cargarPantallaHTMLOrdenCompra(data);
				nuevaPantallaGuiaRemision();
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function cargarPantallaHTMLOrdenCompra(data) {
	codigoProv.val(data.codigoProv);
	documentoProv.val(data.nroDocProv);
	nombreProv.val(data.nombreProv);
	direccion.val(data.direccionFiscal);
	direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);	
	tipoMoneda.val(data.codigoTipoMoneda);
	motivoTraslado.val(MotivoTraslado.COMPRA_NACIONAL);
	// se obtiene el tc del d??a
	obtenerTipoCambio(tipoCambio);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	subTotalGR.val(data.subTotal);
	igvGR.val(data.igv);
	totalGR.val(data.total);
	
	if(data.codigoCondPago == CondicionPago.CREDITO) {
		mostrarControl(divDias);
	}
	
	cantidadDetalleDuplicado = data.detalle.length;
	console.log("cantidadDetalleDuplicado--->" + cantidadDetalleDuplicado);
	for(i=0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];

		agregarFilaEnTablaDetalle(data);
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descCodigo_' + i).val(detalle.codEstandar);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidadPendiente);
		$('#cantidadPend_' + i).val(detalle.cantidadPendiente);
		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#precioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
		$('#lineaReferencia_' + i).val(detalle.linea);

		calcularCantidadNuevaGuia(null, $('#cantidad_' + i), i);

	}
	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function nuevaPantallaGuiaRemision() {
	titulo.text("NUEVA");
	
	controlNoRequerido(observaciones);
	deshabilitarControl(OCReferencia);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	mostrarControl(btnVolver);

	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", false);
	
	serie.focus();
}

function cargarPantallaConDatosGuiaRemision() {

	var nroDocReferenciaVal; 
	nroDocReferenciaVal = nroGuiaRemisionOrigen.text();
	
	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarGuiaRemisionCompra/' + nroDocReferenciaVal ,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){

			if(xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTMLGuiaRemision(data);

				if(data.codigoCondPago == CondicionPago.CREDITO) {
					mostrarControl(divDias);
				}
				verPantallaGuiaRemision(data);				
				dataTableDetalle.destroy();
				inicializarTablaDetalle(true);
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function cargarPantallaHTMLGuiaRemision(data) {
	
	codigoProv.val(data.codigoProv);
	documentoProv.val(data.nroDocProv);
	nombreProv.val(data.nombreProv);
	direccion.val(data.direccionFiscal);
	direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	motivoTraslado.val(data.codigoMotivoTraslado);
	tipoCambio.val(data.tipoCambio);
	subTotalGR.val(data.subTotal);
	igvGR.val(data.igv);
	totalGR.val(data.total);
	OCReferencia.val(data.ordenCompra);
	observaciones.val(data.observaciones);
	
	cantidadDetalleDuplicado = data.detalle.length;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		agregarFilaEnTablaDetalle(data);

		var detalle = data.detalle[i];
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descCodigo_' + i).val(detalle.codEstandar);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidad);
		$('#cantidadPend_' + i).val(detalle.cantidadPendiente);
		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#precioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));

	}
}

function verPantallaGuiaRemision(data) {

	titulo.text("VER");	
	codigo.html(nroGuiaRemisionOrigen.text());
	
	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecRecepcion.datetimepicker('date', moment(data.fechaEntrega));

	//deshabilitarControl('.datetimepicker-input');
	deshabilitarControl(direccionDespacho);
	deshabilitarControl(personaContacto);
	deshabilitarControl(dateTimePickerInput);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(motivoTraslado);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	deshabilitarControl(serie);
	deshabilitarControl(correlativo);
	habilitarControl(observaciones);
	
	if(data.codigoEstado == EstadoGuiaRemision.GENERADO){
		if(data.codigoEstadoProceso == EstadoProceso.CERRADO){
			// estado proceso CERRADO: ya no se puede anular
			ocultarControl(btnGenerarFactura);
			mostrarControl(btnIrFactura);
			deshabilitarControl(observaciones);
		}else{
			// estado proceso ABIERTO o EN_PROCESO
			mostrarControl(btnGenerarFactura);
			// EN PROCESO: ya no se puede anular
			if(data.cantidadFacturasAsociadas > 0) {
				ocultarControl(btnAnular);
				mostrarControl(btnIrFactura);
				deshabilitarControl(observaciones);
			} else {
				// ABIERTO: se puede anular y se deben poner observaciones
				mostrarControl(btnAnular);
				btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
				//habilitarControl(observaciones);
				ocultarControl(btnIrFactura);
			}
		}

	}else{
		// es ANULADO
		mostrarControl(lblAnulado);
		deshabilitarControl(observaciones);
	}
	
	var listaGR = deListaGR.text();
	var nroOCSelec = nroOrdenCompraOrigen.text();
	// si viene del listado de GR o desde una OC, mostrar VOLVER
	if(listaGR == Respuesta.SI || nroOCSelec != CADENA_VACIA){
		mostrarControl(btnVolver);
	}
	
	ocultarControl(btnGrabar);
	//btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
	
	ocultarControl(btnLimpiar);

	deshabilitarDetalleGuiaRemision();
}

function deshabilitarDetalleGuiaRemision(){

	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			deshabilitarControl($(this).find(".almacen_table"));
			habilitarControlSoloLectura($(this).find(".cantidad_table"));
			
			deshabilitarControl($(this).find(".btn-delete"));
		});
	});
}

function agregarFilaEnTablaDetalle(data) {

	var filaHTML = tableNuevoDetalle.find("tr")[0].outerHTML;

	var fila = dataTableDetalle.row.add($(filaHTML)).draw(false);

	indiceFilaDataTableDetalle = fila.index();

	agregarFilaHTMLEnTablaDetalle(data);

}

function agregarFilaHTMLEnTablaDetalle(data) {

	agregarHTMLColumnasDataTable(data);

	var tipoMonedaValor = tipoMoneda.val();

	if(tipoMonedaValor == Moneda.SOLES){
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}

}

function agregarHTMLColumnasDataTable(data) {
	var row = tableDetalle.DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");

	var $tds = row.find("td").not(':first').not(':last');
	
	$.each($tds, function(i, el) {

		switch(i) {

			// CODIGO ART (OCULTO)
			case 0:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
					break;
						
			// DESCRIPCION CODIGO ART
			case 1:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control codigo-det' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
					break;						
    		        		
			// DESCRIPCION
			case 2:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
					break;

			// MARCA
			case 3:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
					break;

			// ALMACEN
			case 4:	$(this).html(CADENA_VACIA).append(
					"<div>" + 
						$(".almacen-hidden").html().replace('reemplazar', 'almacen_' + indiceFilaDataTableDetalle) + 
					"</div>");
					if(data.detalle[indiceFilaDataTableDetalle].codAlmacen != UNDEFINED){
						$('#almacen_' + indiceFilaDataTableDetalle).val(data.detalle[indiceFilaDataTableDetalle].codAlmacen);	
					}
					break;					

			// CANTIDAD
			case 5:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' " + 
					"onchange='dispararEventosCambioCantidad(this, " + indiceFilaDataTableDetalle + ");' " +
					"onkeypress='return soloEnteros(event);'" +
					"onkeydown='cantidadKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
					"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
					break;

			// CANTIDAD PENDIENTE
			case 6:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='cantidadPend_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
					break;

			// PU
			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
					"<input class='form-control alineacion-derecha' type='text' id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
					"</span></div>");
					break;
			
			// PRECIO C/IGV
			case 8: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
			
			// SUBTOTAL
			case 9:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
					"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
					"</span></div>");
					break;
			
			// SUBTOTAL C/IGV (OCULTO)
			case 10:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
					break;

			// LINEA REFERENCIA
			case 11:	$(this).html(CADENA_VACIA).append("<input class='alineacion-derecha' type='text' id='lineaReferencia_" + indiceFilaDataTableDetalle + "'>");
						break;
		}
	});
	habilitarMarquee();
}

/**************** EVENTOS DETALLE *******************/

function dispararEventosCambioCantidad(control, fila) {
	var cantidad = Number(control.value);
	var cantidadPendiente = Number($('#cantidadPend_' + fila).val());
	console.log("cantidad-->" + cantidad);
	console.log("cantidadPendiente-->" + cantidadPendiente);
	
	if(cantidad > cantidadPendiente) {
		mostrarDialogoCantidadMayorAlPendiente(control, fila);
		return false;
	}

	calcularCantidadNuevaGuia(control, null, fila);
}

function calcularCantidadNuevaGuia(control1, control2, fila) {

	//var cantidad = getNum(parseInt(control.val()));
	//var precio = getNum(parseFloat($('#precio_' + fila).val()));
	//var subTotal = parseFloat(cantidad * precio).toFixed(2);

	/*
	$('#subTotal_' + fila).val(subTotal);
	$('#subTotalIgv_' + fila).val((subTotal * (ParametrosGenerales.IGV/100)).toFixed(2));
	$('#cantidadPend_' + fila).val(cantidad);
	*/
	console.log("calcularCantidadNuevaGuia....");
	
	var cantidad;
	if(control1 == null){
		cantidad = Number(control2.val());
	}else{
		cantidad = Number(control1.value);
	}
	
	var precio = Number($('#precio_' + fila).val());
	var subTotal = cantidad * precio;	
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV/100));

	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));	
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#cantidadPend_' + fila).val(cantidad);

	calcularResumenGuiaRemision();
}

function cantidadKeyDown(e, fila){
	var key = window.Event ? e.which : e.keyCode;
	console.log("cantidadKeyDown, key-->" + key);
	// si es ENTER
	if(key == 13){
		console.log("es ENTER");
		var nuevaFila = Number(fila) + 1;
		console.log("nuevaFila-->" + nuevaFila);
		console.log("indiceFilaDataTableDetalle-->" + indiceFilaDataTableDetalle);
		
		if(indiceFilaDataTableDetalle >= nuevaFila){
			var nuevaFilaReal = nuevaFila;
			// iteramos mientras encontremos filas que se hayan eliminado
			while($('#cantidad_' + nuevaFilaReal).val() == UNDEFINED){
				nuevaFilaReal++;
			}
			// encontramos la sgte fila h??bil
			$('#cantidad_' + nuevaFilaReal).select();
		}
	}
}

/**************** EVENTOS FORMULARIO *******************/

function grabarGuiaRemision() {

	if (formGuiaRemision[0].checkValidity() === true) {		
				
		if(validarDetalleGuiaRemision()) {

			if(opcion.text() == Opcion.NUEVO) {
				registrarGuiaRemisionCompra();
			}
		}
	} else {

		formGuiaRemision.addClass('was-validated');
	}
}

function validarDetalleGuiaRemision(){

	var cantidad;
	var flag = false;
	var exitEach = false;
	var exitIterator = false;
	
	// verificando que se hayan ingresado por lo menos un item al detalle de la Orden de Compra
	var contadorVacios = 0;
	// recorriendo todos los detalles
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			if($($headers[cellIndex]).attr('id') == 'codArticulo') {
				
				if($(this).find("input").val() == CADENA_VACIA || $(this).find("input").val() == UNDEFINED){
					contadorVacios++;
				}
			}
		});
	});
	// si la cantidad de filas vac??as es igual al contador de filas, mostrar mensaje
	if(indiceFilaDataTableDetalle == UNDEFINED || (contadorVacios == (indiceFilaDataTableDetalle + 1))){
		mostrarMensajeValidacion("No se puede grabar una Gu??a de Remisi??n sin art??culos.", null, '#buscarArticulo_' + indiceFilaDataTableDetalle);
		return false;	
	}
	
	// verificando que no hayan detalles con cantidad y almacen vac??os
	tableDetalle.DataTable().rows().iterator('row', function(context, index){
		
		if(exitEach == true){
			console.log("exirteach es true!");
			exitIterator = true;
			return false;
		}

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		flag = false;
		
		$cells.each(function(cellIndex) {
			// verificamos que estamos en una fila con c??digo (es decir, con datos para validar)
			if($($headers[cellIndex]).attr('id') == 'codArticulo') {
				
				if($(this).find("input").val() != CADENA_VACIA && $(this).find("input").val() != UNDEFINED){
					flag = true;	
				}
			}
			
			// evaluamos la CANTIDAD				
			if($($headers[cellIndex]).attr('id') == 'cantidad') {
				// siempre y cuando hayan datos (flag TRUE)
				if(flag == true){
					cantidad = $(this).find("input").val();
					if(cantidad == CADENA_VACIA){
						mostrarMensajeValidacion('Debe ingresar la cantidad.', $(this).find("input"));
						exitEach = true;
						console.log("cantidad es cadena vacia");
						return false;
					}else {
						var c = convertirMonedaANumero(cantidad);
						if (c <= 0) {
							mostrarMensajeValidacion('Debe ingresar una cantidad mayor a cero.', $(this).find("input"));
							exitEach = true;
							return false;
						}
					}
				}
			}
		});
	});
		
	if(exitEach == true || exitIterator == true){
		console.log("exitEach||exititerator es true!");
		return false;
	}else{
		return true;	
	}	
}

function registrarGuiaRemisionCompra(){

	var nroDocumento  			= codigo.html();
	var serieVal 				= serie.val();
	var correlativoVal 			= correlativo.val();
	var codigoProvVal  			= codigoProv.val().trim();
	var dirDespachoVal 			= direccionDespacho.val().trim();
	var perContactoVal			= personaContacto.val().trim();	
	var ordenCompra	  			= OCReferencia.val().trim();
	var fecContaVal 			= fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecDocumentoVal 		= fecDocumento.datetimepicker('date').format('YYYY-MM-DD');
	var fecEntregaVal 			= fecRecepcion.datetimepicker('date').format('YYYY-MM-DD');
	var tipoMonedaVal 			= tipoMoneda.val();
	var condPagoVal 			= condPago.val();
	var tipoCambioVal			= tipoCambio.val();
	var codigoMotivoTraslado	= motivoTraslado.val().trim();
	var observacionesVal 		= observaciones.val().trim();
	
	var subTotalVal 			= convertirMonedaANumero(subTotalGR.val().trim());
	var igvVal 					= convertirMonedaANumero(igvGR.val());
	var totalVal 				= convertirMonedaANumero(totalGR.val().trim());
	
	var detalle 				= tableToJSON(tableDetalle);
	var diasVal					= null;

	if(condPagoVal == CondicionPago.CREDITO) {
		diasVal					= dias.val();
	}

	console.log("detalle-------------->" + detalle);
	
	var objetoJson = {

		numeroDocumento:		nroDocumento,
		serie:					serieVal,
		correlativo:			correlativoVal,
		codigoProv:  			codigoProvVal,
		direccionDespacho: 		dirDespachoVal,
		personaContacto: 		perContactoVal,
		ordenCompra: 			ordenCompra,
		fechaContabilizacion:   fecContaVal,
		fechaDocumento:      	fecDocumentoVal,
		fechaEntrega:       	fecEntregaVal,
		codigoTipoMoneda:     	tipoMonedaVal,
		codigoCondPago:     	condPagoVal,
		codigoDias:     		diasVal,
		codigoMotivoTraslado:   codigoMotivoTraslado,
		tipoCambio:				tipoCambioVal,
		subTotal:  				subTotalVal,
		igv:  					igvVal,
		total:  				totalVal,
		observaciones:  		observacionesVal,
		detalle:  				detalle
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
		url : '/appkahaxi/registrarGuiaRemisionCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){
				mostrarNotificacion("El registro fu?? grabado correctamente.", "success");

				codigo.html(resultado);
				deshabilitarControl(serie);
				deshabilitarControl(correlativo);
				deshabilitarControl(motivoTraslado);
				habilitarControl(observaciones);
				deshabilitarControl(dateTimePickerInput);
				deshabilitarControl(direccionDespacho);
				deshabilitarControl(personaContacto);
				mostrarControl(btnGenerarFactura);
				mostrarControl(btnAnular);
				btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
				ocultarControl(btnGrabar);
				ocultarControl(btnLimpiar);

				deshabilitarDetalleGuiaRemision();

			} else if(xhr.status == HttpStatus.Accepted){
				console.log("aaaa")
				mostrarMensajeValidacion(resultado, serie);
			}

			loadding(false);
		},
		error: function (xhr, error, code){
			console.log("bbbbb")
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function anularGuiaRemisionCompra(){
	
	var nroDocumento  		= codigo.html();
	var observacionesVal 	= observaciones.val().trim();
	
	var objetoJson = {
		numeroDocumento:	nroDocumento,
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
		url : '/appkahaxi/anularGuiaRemisionCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				mostrarNotificacion("El registro fu?? actualizado correctamente.", "success");
				/*
				window.scrollTo(0, 0);
				mostrarControl(lblAnulado);
				ocultarControl(btnGenerarFactura);
				ocultarControl(btnIrFactura);
				ocultarControl(btnAnular);				
				deshabilitarControl(observaciones);
				*/
				volver();
			} else if(xhr.status == HttpStatus.Accepted){

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
				if($($headers[cellIndex]).attr('id') == 'precioUnitario' || $($headers[cellIndex]).attr('id') == 'precioUnitarioIgv'|| 
				   $($headers[cellIndex]).attr('id') == 'subTotalIgv' || $($headers[cellIndex]).attr('id') == 'subTotal'){
					data[index][$($headers[cellIndex]).attr('id')] = convertirMonedaANumero($(this).find("input").val());
				}else{
					
					var valor = $(this).find("input").val();
					// para el COMBO de almac??n
					if(valor == null || valor == undefined) {
						valor = $(this).find("select").val();
					}
					
					data[index][$($headers[cellIndex]).attr('id')] = valor;
				}
			}
		});

	});

	return data;
}

function mostrarDialogoEliminarFila(table, row){

	bootbox.confirm({
		message: "??Est?? seguro que desea eliminar el registro?",
		buttons: {
			confirm: {
				label: 'S??',
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
				calcularResumenGuiaRemision();
			}
		}
	});
}

function mostrarDialogoAnularGuiaRemision(event) {

	bootbox.confirm({
		message: "Esta operaci??n es IRREVERSIBLE.</br>??Est?? seguro que desea anular la Gu??a de Remisi??n?",
		buttons: {
			confirm: {
				label: 'S??',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result == true){				
				if (formObservaciones[0].checkValidity() == true) {
					anularGuiaRemisionCompra();
				}else {
					event.stopPropagation();
				}
				formObservaciones.addClass('was-validated');
			}
		}
	});
}
/*
function mostrarDialogoGenerarFactura(event) {

	bootbox.confirm({
		message: "??Est?? seguro de generar la Factura?",
		buttons: {
			confirm: {
				label: 'S??',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result == true){
				mostrarModalGuiasPorOrdenCompra(event);
			}
		}
	});
}
*/
function mostrarDialogoCantidadMayorAlPendiente(control, fila) {

	bootbox.confirm({
		message: "??Est?? seguro de registrar una cantidad mayor que la cantidad solicitada?",
		buttons: {
			confirm: {
				label: 'S??',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {

			if(result == true){

				calcularCantidadNuevaGuia(control, null, fila)

			} else {

				var cantidadPendiente = Number($('#cantidadPend_' + fila).val());
				$('#cantidad_' + fila).val(cantidadPendiente);
				$('#cantidad_' + fila).focus();
			}
		}
	});
}

function mostrarModalGuiasPorOrdenCompra(event) {

	modalCodigoOrdenCompra.text(OCReferencia.val());
	obtenerDetalleGuiaPorOrdenCompra(event);
	mostrarModal(guiasPorOrdenCompraModal);
}

function mostrarModalFacturasPorGuia(event) {

	modalCodigoGuiaRemision.text(codigo.html());
	obtenerDetalleFacturasPorGuiaRemision(event);
}

function obtenerDetalleGuiaPorOrdenCompra(event){

	event.preventDefault();
	event.stopPropagation();

	if ( $.fn.dataTable.isDataTable('#tableSeleccionGR')) {

		dataTableSeleccionGR.clear();
		dataTableSeleccionGR.ajax.reload(null, true);

	} else {

		dataTableSeleccionGR = tableSeleccionGR.DataTable({

			"ajax": {
				data: function ( d ) {
					d.codigoOrdenCompra 	= OCReferencia.val().trim();
				},
				url: '/appkahaxi/listarGuiaRemisionCompraPorOrdenCompra/',
				dataSrc: function (json) {
					console.log("listarGuiaRemisionCompraPorOrdenCompra...success");
					return json;
				},
				error: function (xhr, error, code){

				}
			},
			"stateSave"		: true,
			"responsive"	: false,
			"scrollCollapse": false,
			"dom"			: '<ip<rt>lp>',
        	"lengthMenu"	: [[10, 20, 30, 40, -1], [10, 20, 30, 40, "Todos"]],
			"deferRender"   : true,
			"autoWidth"		: false,
			"columnDefs"    : [
				{
					"width": "10px",
					"targets": [0],
					"data": "activo",
					"className": "dt-body-center text-center",
					"orderable": false,
					"render": function(data, type, row) {
						return '<input type="checkbox" class="chk_guia_remision">';
					}
				},
				{
					"width": "30px",
					"targets": [1],
					"data": "numeroDocumento",
					"orderable": false
				},
				{
					"width": "30px",
					"targets": [2],
					"data": "serieCorrelativo",
					"orderable": false
				},
				{
					"width": "20px",
					"targets": [3],
					"data": "subTotal",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [4],
					"data": "igv",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [5],
					"data": "total",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  convertirNumeroAMoneda(data);
						}
				}
			],
			"fnRowCallback":
				function(row, data, iDisplayIndex, iDisplayIndexFull){

					if(data.codigoTipoMoneda == Moneda.SOLES){
						$('td:eq(3)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-sol');
					}else{
						$('td:eq(3)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-dolar');
					}

					// modificando el tama??o de los caracteres del listado
					return row;

				},
			
			"language"  : {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});
		/*
		$('#tableSeleccionGR tbody').on('click', 'tr', function () {
			var nTds = $('td', this);
			var numeroDocumento = $(nTds[0]).text();
			
			cargarGuiaRemisionAsociada(numeroDocumento);			
		});
		*/
	}
}

function obtenerDetalleFacturasPorGuiaRemision(event){

	event.preventDefault();
	event.stopPropagation();

	if ( $.fn.dataTable.isDataTable('#tableSeleccionDocumento')) {

		dataTableSeleccionDocumento.clear();
		dataTableSeleccionDocumento.ajax.reload(null, true);

	} else {

		dataTableSeleccionDocumento = tableSeleccionDocumento.DataTable({

			"ajax": {
				data: function ( d ) {
					d.codigoGuiaRemision 	= codigo.html().trim();
				},
				url: '/appkahaxi/listarFacturaCompraPorGuiaRemision/',
				dataSrc: function (json) {
					console.log("listarFacturaCompraPorGuiaRemision...success");
					mostrarModal(facturasPorGuiaRemisionModal);
					return json;
				},
				error: function (xhr, error, code) {
					mostrarMensajeValidacion(xhr.responseText);
				}
			},
			"stateSave"		: true,
			"responsive"	: false,
			"scrollCollapse": false,
			"dom"			: '<ip<rt>lp>',
        	"lengthMenu"	: [[10, 20, 30, 40, -1], [10, 20, 30, 40, "Todos"]],
			"deferRender"   : true,
			"autoWidth"		: false,
			"columnDefs"    : [
				{
					"width": "30px",
					"targets": [0],
					"data": "numeroDocumento",
					"orderable": false,
					/*"render": function(data, type, row) {
						return '<a href="#" class="link-ver-factura">' + data + '</a>';
					}*/
				},
				{
					"width": "30px",
					"targets": [1],
					"data": "fechaDocumento",
					"className": "dt-center",
					"orderable": false
				},
				{
					"width": "30px",
					"targets": [2],
					"data": "fechaContabilizacion",
					"className": "dt-center",
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
							return  convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [5],
					"data": "igv",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [6],
					"data": "total",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "10px",
					"targets": [7],
					"data": "descripcionEstadoPago",
					"className": "dt-center",
					"orderable": false
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

					// modificando el tama??o de los caracteres del listado

					return row;

				},
			"language"  : {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});
		/*
		$('#tableSeleccionDocumento tbody').on('click','.link-ver-factura', function () {

			var data = dataTableSeleccionDocumento.row( $(this).closest('tr')).data();
			cargarFacturaAsociada(data.numeroDocumento, Opcion.VER);
		});
		*/
		$('#tableSeleccionDocumento tbody').on('click', 'tr', function () {
			var nTds = $('td', this);
			var numeroDocumento = $(nTds[0]).text();
			cargarFacturaAsociada(numeroDocumento);			
		});
	}
}

function generarFacturaAsociada() {

	var data = [];
	var indice = 0;

	var cabeceras = tableSeleccionGR.find("th").not(':last');

	tableSeleccionGR.find("tbody tr").each(function(index) {

		var esSeleccionado = $(this).find("input").is(':checked');

		if(esSeleccionado) {

			$cells = $(this).find("td").not(':last');

			data[indice] = {};

			$cells.each(function(cellIndex) {

				var valor = $(this).text();
				data[indice][$(cabeceras[cellIndex]).attr('id')] = valor;
			});

			indice ++;
		}

	});

	var guiasRemision = "";

	$.each( data, function( key, value ) {
		guiasRemision += value.codigoGuiaRemision + ",";
	});

	guiasRemision = guiasRemision.slice(0,-1);
	
	var dato 		= campoBuscarFiltro.text();
	var nroOC 		= nroOrdenCompraFiltro.text();
	var nroGrParam 	= nroGuiaRemisionFiltro.text();
	var codRpto 	= codRepuestoFiltro.text();
	var fecDesde 	= fecDesdeFiltro.text();
	var fecHasta 	= fecHastaFiltro.text();
	var estParam 	= estadoFiltro.text();

	var listaOC 	= deListaOC.text();
	var nroOCSelec 	= OCReferencia.val();
	var listaGR 	= deListaGR.text();	
																   
   	params = 
		"campoBuscarFiltro=" + dato +
		"&nroGuiaRemisionFiltro=" + nroGrParam +
		"&nroOrdenCompraFiltro=" + nroOC + 
		"&codRepuestoFiltro=" + codRpto +
		"&fecDesdeFiltro=" + fecDesde + 
		"&fecHastaFiltro=" + fecHasta + 
		"&estadoFiltro=" + estParam +
		 
		"&nroComprobantePagoFiltro=" +
	
		"&deListaOC=" + listaOC +
		"&nroOrdenCompraOrigen=" + nroOCSelec +
		
		"&deListaGR=" + listaGR +
		"&nroGuiaRemisionOrigen=" + codigo.html() +
		"&listaGRSeleccionadas=" + guiasRemision +
		
		"&deListaCP=" + Respuesta.NO +
		"&nroComprobantePagoOrigen=" +
		
		"&opcion=" + Opcion.NUEVO;
	
	window.location.href = "/appkahaxi/cargar-factura-compra-asociada?" + params;
}

function volver(){
	var params;
	
	var dato 		= campoBuscarFiltro.text();
	var nroGR 		= nroGuiaRemisionFiltro.text();
	var nroOC 		= nroOrdenCompraFiltro.text(); 
	var codRpto 	= codRepuestoFiltro.text();
	var fecDesde 	= fecDesdeFiltro.text();
	var fecHasta 	= fecHastaFiltro.text();
	var estParam	= estadoFiltro.text();
	
	var listaOC		= deListaOC.text();
	var nroOCSelec	= nroOrdenCompraOrigen.text();
	var listaGR		= deListaGR.text();	
	
	if(listaGR == Respuesta.SI){
		params = "campoBuscarFiltro=" + dato + "&nroGuiaRemisionFiltro=" + nroGR + "&nroOrdenCompraFiltro=" + nroOC + "&codRepuestoFiltro=" + codRpto + 
			 	 "&fecDesdeFiltro=" + fecDesde + "&fecHastaFiltro=" + fecHasta + "&estadoFiltro=" + estParam;
		window.location.href = "/appkahaxi/mantenimiento-guia-remision-compra?" + params;
		
	}else{
		params = 
			"campoBuscarFiltro=" + dato +  
			"&nroOrdenCompraFiltro=" + nroOC + 
			"&codRepuestoFiltro=" + codRpto + 
			"&fecDesdeFiltro=" + fecDesde + 
			"&fecHastaFiltro=" + fecHasta + 
			"&estadoFiltro=" + estParam + 
			
			"&deListaOC=" + listaOC + 
			"&opcion=" + Opcion.VER +
			"&nroOrdenCompraOrigen=" + nroOCSelec;
	
		window.location.href = "/appkahaxi/cargar-orden-compra?" + params;
	}
}

function cargarFacturaAsociada(nroComprobantePagoOrigen) {
	
	var dato 		= campoBuscarFiltro.text();
	var nroOC 		= nroOrdenCompraFiltro.text();
	var nroGrParam 	= nroGuiaRemisionFiltro.text();
	var codRpto 	= codRepuestoFiltro.text();
	var fecDesde 	= fecDesdeFiltro.text();
	var fecHasta 	= fecHastaFiltro.text();
	var estParam 	= estadoFiltro.text();

	var listaOC 	= deListaOC.text();
	var nroOCSelec 	= nroOrdenCompraOrigen.text();
	var nroGRSelec 	= nroGuiaRemisionOrigen.text();
	var listaGR 	= deListaGR.text();	
																   
   	params = 
		"campoBuscarFiltro=" + dato +
		"&nroGuiaRemisionFiltro=" + nroGrParam +
		"&nroOrdenCompraFiltro=" + nroOC + 
		"&codRepuestoFiltro=" + codRpto +
		"&fecDesdeFiltro=" + fecDesde + 
		"&fecHastaFiltro=" + fecHasta + 
		"&estadoFiltro=" + estParam +
		 
		"&nroComprobantePagoFiltro=" +
	
		"&deListaOC=" + listaOC +
		"&nroOrdenCompraOrigen=" + nroOCSelec +
		
		"&deListaGR=" + listaGR +
		"&nroGuiaRemisionOrigen=" + nroGRSelec +
		"&listaGRSeleccionadas=" +
		
		"&deListaCP=" + Respuesta.NO +
		"&nroComprobantePagoOrigen=" + nroComprobantePagoOrigen +
		
		"&opcion=" + Opcion.VER;
	
	window.location.href = "/appkahaxi/cargar-factura-compra-asociada?" + params;
}

function limpiarGuiaRemision() {
	console.log("limpiarGuiaRemision...")
	//inicializarFechas();
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);
	motivoTraslado.val(MotivoTraslado.COMPRA_NACIONAL);
	
	
	//fecRecepcion.datetimepicker('minDate', false);
	//fecRecepcion.datetimepicker('maxDate', false);
	
	//fecDocumento.datetimepicker('maxDate', false);
	//fecConta.datetimepicker('maxDate', false);
	fecRecepcion.datetimepicker('destroy');
	console.log("xxx")
	
	fecDocumento.datetimepicker('destroy');	
	console.log("yyy")
	
	fecConta.datetimepicker('destroy');
	console.log("zzz")
	
	
	construirFechasPicker();
	//restringirSeleccionFechas();
	inicializarFechas();
		
	formObservaciones.removeClass('was-validated');
	
	serie.focus();
}


/********************* CALCULOS NUMERICOS ********************/

function calcularResumenGuiaRemision(){

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

	// 2. hacemos los c??culos del IGV y TOTAL de la OC
	var igv = subTotal * (ParametrosGenerales.IGV/100);
	var total = subTotal + igv;

	subTotalGR.val(convertirNumeroAMoneda(subTotal));
	igvGR.val(convertirNumeroAMoneda(igv));
	totalGR.val(convertirNumeroAMoneda(total));
}