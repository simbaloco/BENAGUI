var titulo;
var codigo;
var codigoCliente;
var nroDocReferencia;
var numeroDocumento;
var opcion;
var datoBuscar;
var nroComprobantePago;
var nroOrdenCompra;
var codRepuesto;
var fechaDesde;
var fechaHasta;
var estadoParam;
var volverParam;

var guiasReferencia;

var formFactura;
var OCReferencia;
var documentoCliente;
var nombreCliente;
var direccion;
var fecConta;
var fecDocumento;
var tipoMoneda;
var condPago;
var dias;
var divDias;
var fecVencimiento;
var tipoCambio;
var serie;
var correlativo;

var divMensajeEliminado;
var btnAnular;
var btnLimpiar;
var btnVolver;

var tableDetalle;
var tableNuevoDetalle;

var observaciones;
var subTotalFactura;
var igvFactura;
var totalFactura;

var btnGrabar;

var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalleDuplicado;

var estadoPago;
var volverParam;

var dateTimePickerInput;
var valorIGV;
var lblAnulado;

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	titulo =  $("#titulo");
	codigo = $("#codigo");
	codigoCliente = $("#codigoCliente");
	nroDocReferencia = $("#nroDocReferencia");
	numeroDocumento = $('#numeroDocumento');
	opcion = $("#opcion");
	
	datoBuscar =  $("#datoBuscar");
	nroComprobantePago =  $("#nroComprobantePago");
	nroOrdenCompra =  $("#nroOrdenCompra");
	codRepuesto =  $("#codRepuesto");
	fechaDesde =  $("#fechaDesde");
	fechaHasta =  $("#fechaHasta");
	estadoParam =  $("#estadoParam");
	volverParam =  $("#volverParam");
	
	guiasReferencia = $("#guiasParam");

	formFactura = $("#formFactura");
	OCReferencia = $("#OCReferencia");
	documentoCliente = $("#documentoCliente");
	nombreCliente = $("#nombreCliente");
	direccion = $("#direccion");
	fecConta = $("#fecConta");
	fecDocumento = $("#fecDocumento");
	tipoMoneda = $("#tipoMoneda");
	condPago = $("#condPago");
	dias = $("#dias");
	divDias = $("#divDias");
	fecVencimiento = $("#fecVencimiento");
	serie = $("#serie");
	correlativo = $("#correlativo");
	tipoCambio = $("#tipoCambio");

	divMensajeEliminado = $("#divMensajeEliminado");
	btnAnular = $("#btnAnular");
	btnLimpiar = $("#btnLimpiar");
	btnVolver = $("#btnVolver");

	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalFactura = $("#subTotalFactura");
	igvFactura = $("#igvFactura");
	totalFactura = $("#totalFactura");

	btnGrabar = $("#btnGrabar");

	estadoPago = $("#estadoPago");

	volverParam = $("#volverParam");
	dateTimePickerInput = $(".datetimepicker-input");
	lblAnulado = $("#lblAnulado");
}

function inicializarComponentes() {

	habilitarAnimacionAcordion();
	habilitarMarquee();
	construirFechasPicker();
	restringirSeleccionFechas();
	inicializarEventos();
}

function inicializarPantalla() {
	 
	if(opcion.text() == Opcion.NUEVO) {
		inicializarTablaDetalle(true);
		inicializarFechas();
		cargarPantallaConDatosGuiaRemisionAsociadas();
		
	}else if(opcion.text() == Opcion.VER) {
		inicializarTablaDetalle(false);
		cargarPantallaConDatosFactura();
	}
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-up');
    }).on('hide.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-down');
    });
}

function construirFechasPicker() {

	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});

	fecDocumento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});

	fecVencimiento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});
}

function restringirSeleccionFechas() {

	fecConta.datetimepicker('maxDate', new Date());

	fecDocumento.on("change.datetimepicker", function (e) {
		fecVencimiento.datetimepicker('minDate', e.date);
	});

	fecConta.on("change.datetimepicker", function (e) {
		fecDocumento.datetimepicker('maxDate', e.date < fecVencimiento.datetimepicker('date') ? e.date : fecVencimiento.datetimepicker('date'));
	});

	fecVencimiento.on("change.datetimepicker", function (e) {
		fecDocumento.datetimepicker('maxDate', e.date < fecConta.datetimepicker('date') ? e.date : fecConta.datetimepicker('date'));
	});
}

function inicializarEventos() {
	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		mostrarDialogoEliminarFila(dataTableDetalle, $(this));
	});

	$('.readonly').keydown(function(e){
		e.preventDefault();
	});

	btnGrabar.on("click", function() {
		grabarFactura();
	});

	btnLimpiar.on("click", function() {
		limpiarFactura();
	});

	btnAnular.on("click", function() {
		mostrarDialogoAnularFactura();
	});

	estadoPago.on('change', function(){
		mostrarOcultarBotonAnular();
	});

	condPago.on('change', function(){
		evaluarCambioCondicionPago();
	});

	btnVolver.on("click", function() {
		volver();
	});
	/*
	tipoMoneda.on('change', function(){
		calcularPorTipoMoneda();
	});
	*/
	serie.on('keypress', function(event){
		return soloAlfaNumericos(event);
	});

	correlativo.on('keypress', function(event){
		return soloEnteros(event);
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

function inicializarFechas(){
	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecConta.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));
	fecDocumento.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecVencimiento.datetimepicker('date', moment().format('DD/MM/YYYY'));
}

function cargarPantallaConDatosGuiaRemisionAsociadas() {
	console.log("cargarPantallaConDatosGuiaRemisionAsociadas...");
	var codigoOrdenCompra = numeroDocumento.text();
	var guias = guiasReferencia.text();
	console.log("codigoOrdenCompra-->" + codigoOrdenCompra);
	console.log("guias-->" + guias);
	
	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/generarFacturaCompraPorGuias/' + codigoOrdenCompra  + '/' + guias,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){

			if(xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTMLFacturaConDatosGuiaRemisionAsociadas(data);

				if(data.codigoCondPago == CondicionPago.CREDITO) {
					mostrarControl(divDias);
				}

				habilitarPantallaConDatosGuiaRemisionAsociadas();
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function cargarPantallaHTMLFacturaConDatosGuiaRemisionAsociadas(data) {

	OCReferencia.val(data.ordenCompra);
	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	tipoCambio.val(data.tipoCambio);
	subTotalFactura.val(data.subTotal);
	igvFactura.val(data.igv);
	totalFactura.val(data.total);

	cantidadDetalleDuplicado = data.detalle.length;

	var indice = 0;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];

		if(Number(detalle.cantidadPendienteGuiaRemision) > 0 ) {

			agregarFilaEnTablaDetalle(data);

			$('#codigoGuiaRemision_' + indice).val(detalle.codGuiaRemision);
			$('#lineaReferencia_' + indice).val(detalle.lineaReferencia);
			$('#codigo_' + indice).val(detalle.codArticulo);
			$('#descripcion_' + indice).val(detalle.descripcionArticulo);
			$('#marca_' + indice).val(detalle.marca);
			$('#cantidad_' + indice).val(detalle.cantidadPendienteGuiaRemision);
			//$('#cantidad_' + indice).data('val', detalle.cantidadPendienteGuiaRemision);
			$('#cantidad_' + indice).data('temporal', detalle.cantidadPendienteGuiaRemision);
			$('#precio_' + indice).val(detalle.precioUnitario);
			$('#subTotal_' + indice).val(detalle.subTotal);
			$('#subTotalIgv_' + indice).val(detalle.subTotalIgv);
			calcularCantidadNuevaFactura(null, $('#cantidad_' + i), i);
			indice++;
		}
	}

	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function habilitarPantallaConDatosGuiaRemisionAsociadas() {

	titulo.text("NUEVA");
	
	habilitarControl(dateTimePickerInput);
	deshabilitarControl(tipoMoneda);
	habilitarControl(condPago);
	habilitarControl(dias);
	habilitarControl(estadoPago);
	habilitarControl(serie);
	habilitarControl(correlativo);

	mostrarControl(btnGrabar);
	mostrarControl(btnLimpiar);

	for(i=0; i< cantidadDetalleDuplicado ; i++) {

		deshabilitarControl(null, '#codigo_' + i);
		deshabilitarControl(null, '#almacen_' + i);
		habilitarControl(null, '#cantidad_' + i);
		deshabilitarControl(null, '#precio_' + i);
	}

	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", false);
	
	serie.focus();
}

function cargarPantallaConDatosFactura() {

	var nroDocReferenciaVal = numeroDocumento.text();

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarFacturaCompra/' + nroDocReferenciaVal ,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){

			if(xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTMLFactura(data);

				if(data.codigoCondPago == CondicionPago.CREDITO) {
					mostrarControl(divDias);
				}

				verPantallaFactura(data);
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function cargarPantallaHTMLFactura(data) {

	OCReferencia.val(data.ordenCompra);
	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	estadoPago.val(data.codigoEstadoPago);
	tipoCambio.val(data.tipoCambio);
	subTotalFactura.val(data.subTotal);
	igvFactura.val(data.igv);
	totalFactura.val(data.total);
	observaciones.val(data.observaciones);
	
	cantidadDetalleDuplicado = data.detalle.length;

	var indice = 0;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		agregarFilaEnTablaDetalle(data);

		var detalle = data.detalle[i];

		$('#codigoGuiaRemision_' + indice).val(detalle.codGuiaRemision);
		$('#lineaReferencia_' + indice).val(detalle.lineaReferencia);
		$('#codigo_' + indice).val(detalle.codArticulo);
		$('#descripcion_' + indice).val(detalle.descripcionArticulo);
		$('#marca_' + indice).val(detalle.marca);
		$('#cantidad_' + indice).val(detalle.cantidad);
		$('#precio_' + indice).val(detalle.precioUnitario);
		$('#subTotal_' + i).val(detalle.subTotal);
		$('#subTotalIgv_' + indice).val(detalle.subTotalIgv);
		
		indice++;
	}

	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function verPantallaFactura(data) {

	titulo.text("VER");
	codigo.html(numeroDocumento.text());

	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecVencimiento.datetimepicker('date', moment(data.fechaEntrega));

	//deshabilitarControl('.datetimepicker-input');
	deshabilitarControl(dateTimePickerInput);
	deshabilitarControl(observaciones);
	
	if(data.codigoEstado == EstadoFactura.GENERADO){
		if(estadoPago.val() == EstadoPago.PAGADO) {
			deshabilitarControl(estadoPago);
			ocultarControl(btnAnular);
		} else {
			habilitarControl(observaciones);
			habilitarControl(estadoPago);
			mostrarControl(btnAnular);
		}
	}else{
		// si es ANULADO
		deshabilitarControl(estadoPago);
		ocultarControl(btnAnular);
		mostrarControl(lblAnulado);
	}	
	
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	deshabilitarControl(serie);
	deshabilitarControl(correlativo);

	if(volverParam.text() == Volver.NO) {

		ocultarControl(btnVolver);

	} else {

		mostrarControl(btnVolver);
	}


	ocultarControl(btnGrabar);
	ocultarControl(btnLimpiar);

	deshabilitarDetalleFactura();
}

function deshabilitarDetalleFactura(){

	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			habilitarControlSoloLectura($(this).find(".codigo_table"));
			deshabilitarControl($(this).find(".almacen_table"));
			habilitarControlSoloLectura($(this).find(".cantidad_table"));
			habilitarControlSoloLectura($(this).find(".precio_table"));
			
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

			// GUIA REMISION
			case 0:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigoGuiaRemision_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// LINEA REFERENCIA
			case 1:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='lineaReferencia_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// COD ARTICULO
			case 2:	$(this).html(CADENA_VACIA).append("<div>" +
				"<input class='marquee form-control codigo_table' type='text' maxlength='20'  id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</div>");
				break;

			// DESCRIPCION ARTICULO
			case 3:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// MARCA
			case 4:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// ALMACEN
			case 5:	$(this).html(CADENA_VACIA).append(
					"<div>" + 
						$(".almacen-hidden").html().replace('reemplazar', 'almacen_' + indiceFilaDataTableDetalle) + 
					"</div>");
					$('#almacen_' + indiceFilaDataTableDetalle).val(data.detalle[indiceFilaDataTableDetalle].codAlmacen);
					break;

			// CANTIDAD
			case 6:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' onchange='dispararEventosCambioCantidad(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);'" +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			// PRECIO UNITARIO
			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha precio_table' type='text' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			// SUBTOTAL
			case 8:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
				
			// SUBTOTAL C/IGV	
			case 9:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

		}
	});
	habilitarMarquee();
}

/**************** EVENTOS DETALLE *******************/

function dispararEventosCambioCantidad(control, fila) {

	var cantidad = Number(control.value);
	var cantidadGR = Number($('#cantidad_' + fila).val());

	if(cantidad > cantidadGR) {
		mostrarDialogoCantidadMayorAlPendiente(control, fila);
		return false;
	}

	$('#cantidad_' + fila).data('temporal', cantidad);
	calcularCantidadNuevaFactura(control, null, fila);

}
/*
function calcularCantidadKeyUp(control, fila) {

	var cantidad = Number(control.value);
	var precio = Number($('#precio_' + fila).val());
	var subTotal = cantidad * precio;	
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV/100));
	
	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));	
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));

	calcularResumenFactura();
}
*/

function calcularCantidadNuevaFactura(control1, control2, fila) {

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
	
	calcularResumenFactura();
}

/**************** EVENTOS FORMULARIO *******************/

function evaluarCambioCondicionPago() {
	var condPagoVal = condPago.val();

	if(condPagoVal == CondicionPago.CREDITO){
		controlRequerido(dias);
		mostrarControl(divDias);
	}else{
		controlNoRequerido(dias);
		ocultarControl(divDias);
	}
}

function grabarFactura() {

	if (formFactura[0].checkValidity() == true) {
		if(validarDetalleFactura()) {
			if(opcion.text() == Opcion.NUEVO) {
				if(estadoPago.val() == EstadoPago.PENDIENTE) {
					registrarFacturaCompra();
				} else {
					mostrarDialogoRegistrarFacturaPagado();
				}
			}

			if(opcion.text() == Opcion.VER) {
				actualizarFacturaCompra();
			}
		}
	} else {
		formFactura.addClass('was-validated');
	}
}

function validarDetalleFactura(){

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
	
	// si la cantidad de filas vacías es igual al contador de filas, mostrar mensaje
	if(contadorVacios == (indiceFilaDataTableDetalle + 1)){
		mostrarMensajeValidacion("No se puede grabar una Factura sin artículos.", null, '#buscarArticulo_' + indiceFilaDataTableDetalle);
		return false;	
	}
	
	
	// verificando que no hayan detalles con cantidad y almacen vacíos
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
			// verificamos que estamos en una fila con código (es decir, con datos para validar)
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
					}else if(convertirMonedaANumero(cantidad) == 0){
						mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $(this).find("input"));
						exitEach = true;
						return false;
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

function registrarFacturaCompra(){

	var nroDocumento  			= codigo.html();
	var ordenCompra  			= OCReferencia.val();
	var serieVal 				= serie.val();
	var correlativoVal 			= correlativo.val();
	var codigoClienteVal  		= codigoCliente.val().trim();
	var fecContaVal 			= fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecDocumentoVal 		= fecDocumento.datetimepicker('date').format('YYYY-MM-DD');
	var fecVencimientoVal 		= fecVencimiento.datetimepicker('date').format('YYYY-MM-DD');
	var tipoMonedaVal 			= tipoMoneda.val();
	var condPagoVal 			= condPago.val();
	var tipoCambioVal			= tipoCambio.val();
	var codigoEstadoPagoVal 	= estadoPago.val().trim();
	var observacionesVal 		= observaciones.val().trim();
	
	var subTotalVal 			= convertirMonedaANumero(subTotalFactura.val().trim());
	var igvVal 					= convertirMonedaANumero(igvFactura.val());
	var totalVal 				= convertirMonedaANumero(totalFactura.val().trim());
	
	var detalle 				= tableToJSON(tableDetalle);
	var diasVal					= null;

	if(condPagoVal == '02') {
		diasVal					= dias.val();
	}

	var objetoJson = {

		numeroDocumento:		nroDocumento,
		ordenCompra:			ordenCompra,
		serie:					serieVal,
		correlativo:			correlativoVal,
		codigoCliente:  		codigoClienteVal,
		fechaContabilizacion:   fecContaVal,
		fechaDocumento:      	fecDocumentoVal,
		fechaVencimiento:       fecVencimientoVal,
		codigoTipoMoneda:     	tipoMonedaVal,
		codigoCondPago:     	condPagoVal,
		codigoDias:     		diasVal,
		codigoEstadoPago:   	codigoEstadoPagoVal,
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
		url : '/appkahaxi/registrarFacturaCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				mostrarNotificacion("El registro fué grabado correctamente.", "success");

				if(codigoEstadoPagoVal == EstadoPago.PENDIENTE) {

					codigo.html(resultado);

					deshabilitarControl(serie);
					deshabilitarControl(correlativo);
					deshabilitarControl(estadoPago);

					deshabilitarControl(tipoMoneda);
					deshabilitarControl(condPago);
					deshabilitarControl(dias);

					//deshabilitarControl('.datetimepicker-input');
					deshabilitarControl(dateTimePickerInput);

					mostrarControl(btnAnular);
					mostrarControl(btnVolver);
					ocultarControl(btnGrabar);
					ocultarControl(btnLimpiar);

					deshabilitarDetalleFactura();

				} else {
					volver();
				}

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

function actualizarFacturaCompra() {

	var nroDocumento  		= codigo.html();
	var estadoPagoVal 		= estadoPago.val();
	var observacionesVal 	= observaciones.val().trim();

	var objetoJson = {
		numeroDocumento:	nroDocumento,
		codigoEstadoPago:   estadoPagoVal,
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
		url : '/appkahaxi/actualizarFacturaCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				mostrarNotificacion("El registro fué actualizado correctamente.", "success");

				volver();

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
				if($($headers[cellIndex]).attr('id') == 'precioUnitario' || $($headers[cellIndex]).attr('id') == 'subTotalIgv' || $($headers[cellIndex]).attr('id') == 'subTotal'){
					data[index][$($headers[cellIndex]).attr('id')] = convertirMonedaANumero($(this).find("input").val());
				}else{
					
					var valor = $(this).find("input").val();
					// para el COMBO de almacén
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
				calcularResumenFactura();
			}
		}
	});
}

function mostrarDialogoRegistrarFacturaPagado() {

	bootbox.confirm({
		message: "¿Está seguro que esta factura ya ha sido pagada?",
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
				registrarFacturaCompra();
			}
		}
	});
}

function mostrarDialogoAnularFactura() {

	bootbox.confirm({
		message: "¿Está seguro que desea anular la Factura?",
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
				anularFacturaCompra();
			}
		}
	});
}

function mostrarDialogoCantidadMayorAlPendiente(control, fila) {

	bootbox.alert({
		message: "No se puede registrar una cantidad mayor a la de la Guia de Remisión de Referencia",
		callback: function () {

			var cantidad = Number($('#cantidad_' + fila).data('temporal'));
			$('#cantidad_' + fila).val(cantidad);
			$('#cantidad_' + fila).focus();
		}
	});
}

function mostrarOcultarBotonAnular() {

	var estadoPagoVal = estadoPago.val();

	if(opcion.text() == Opcion.VER) {

		if(estadoPagoVal == EstadoPago.PAGADO){
			ocultarControl(btnAnular);
			mostrarControl(btnGrabar);
		} else{
			mostrarControl(btnAnular);
			ocultarControl(btnGrabar);
		}
	}
}

function anularFacturaCompra(){

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
		url : '/appkahaxi/anularFacturaCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				if (opcion.text() == Opcion.NUEVO) {
					var params = "numeroDocumento=" + numeroDocumento.text() + "&opcion=" + Opcion.VER + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
					window.location.href = "/appkahaxi/nueva-factura-compra-directa?" + params;
				}

				if(opcion.text() == Opcion.VER) {
					volver();
				}

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

function volver(){
	var params;
	var dato 		= datoBuscar.text();
	var nroFact 	= nroComprobantePago.text();
	var nroOC 		= nroOrdenCompra.text();
	var codRpto 	= codRepuesto.text();
	var fecDesde 	= fechaDesde.text();
	var fecHasta 	= fechaHasta.text();
	var estParam	= estadoParam.text();

	params = "datoBuscar=" + dato + "&nroComprobantePago=" + nroFact + "&nroOrdenCompra=" + nroOC + "&codRepuesto=" + codRpto +  
			 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
	window.location.href = "/appkahaxi/mantenimiento-factura-compra?" + params;
}

function limpiarFactura() {
	inicializarFechas();
	
	fecDocumento.datetimepicker('date', null);
	fecVencimiento.datetimepicker('date', null);
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);
	estadoPago.prop("selectedIndex", 0);
	serie.focus();
}

/********************* CALCULOS NUMERICOS ********************/

function calcularResumenFactura(){

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

	subTotalFactura.val(convertirNumeroAMoneda(subTotal));
	igvFactura.val(convertirNumeroAMoneda(igv));
	totalFactura.val(convertirNumeroAMoneda(total));
}


/*
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

function convertirMontosASoles() {

	var tc = tipoCambio.val();

	for(i=0; i < (indiceFilaDataTableDetalle+1); i++) {

		$('#precio_' + i).val($('#precio_' + i).val() * tc);
		$('#subTotalIgv_' + i).val(($('#subTotalIgv_' + i).val() * tc).toFixed(2));
		$('#subTotal_' + i).val($('#subTotal_' + i).val() * tc);
	}

	subTotalFactura.val(subTotalFactura.val() * tc);
	igvFactura.val(igvFactura.val() * tc);
	totalFactura.val(totalFactura.val() * tc);
}

function convertirMontosADolares() {

	var tc = tipoCambio.val();

	for(i=0; i < (indiceFilaDataTableDetalle+1); i++) {

		$('#precio_' + i).val($('#precio_' + i).val() / tc);
		$('#subTotalIgv_' + i).val(($('#subTotalIgv_' + i).val() / tc).toFixed(2));
		$('#subTotal_' + i).val($('#subTotal_' + i).val() / tc);
	}

	subTotalFactura.val(subTotalFactura.val() / tc);
	igvFactura.val(igvFactura.val() / tc);
	totalFactura.val(totalFactura.val() / tc);
}
*/