var titulo;
var codigo;
var codigoCliente;
var nroDocReferencia;
var numeroDocumento;
var opcion;
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
var subTotalOC;
var igv;
var total;

var btnGrabar;

var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalleDuplicado;

var estadoPago;
var btnAgregarArticulo;

var volverParam;

var dateTimePickerInput;
var valorIGV;

$(document).ready(function(){
	initVariables();
	initComponentes();
	initPantalla();
});

function initVariables() {

	titulo =  $("#titulo");
	codigo = $("#codigo");
	codigoCliente = $("#codigoCliente");
	nroDocReferencia = $("#nroDocReferencia");
	numeroDocumento = $('#numeroDocumento');
	opcion = $("#opcion");
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

	btnAgregarArticulo = $("#btnAgregarArticulo");
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalOC = $("#subTotalOC");
	igv = $("#igv");
	total = $("#total");

	btnGrabar = $("#btnGrabar");

	estadoPago = $("#estadoPago");

	volverParam = $("#volverParam");
	dateTimePickerInput = $(".datetimepicker-input");
}

function initComponentes() {

	habilitarAnimacionAcordion();
	construirFechasPicker();
	retringirSeleccionFechas();

	obtenerIGV();
	inicializarTablaDetalle(false);

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
		mostrarOcultarDiasPorCondicionPago();
	});

	btnVolver.on("click", function() {
		volver();
	});

	tipoMoneda.on('change', function(){
		calcularPorTipoMoneda();
	});

	serie.on('keypress', function(event){
		return soloAlfaNumericos(event);
	});

	correlativo.on('keypress', function(event){
		return soloEnteros(event);
	});

	btnAgregarArticulo.on("click", function() {
		agregarFilaEnTablaDetalle();
	});

}


function volver(){
	var params;
	var datoBuscar 	= $('#datoBuscar').text();
	var fechaDesde 	= $('#fechaDesde').text();
	var fechaHasta 	= $('#fechaHasta').text();
	var estadoParam	= $('#estadoParam').text();

	params = "datoBuscar=" + datoBuscar + "&fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaHasta + "&estadoParam=" + estadoParam;
	window.location.href = "/appkahaxi/mantenimiento-factura?" + params;
}

function obtenerIGV(){

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarDataCatalogo/' ,
		data : {
			codMaestro: CodigoMaestro.IGV,
			codDataCatalogo : CodigoDataCatalogo.IGV
		},
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				var data = JSON.parse(result);
				valorIGV = getNum(data.descData)/100;
			}
			loadding(false);
		}
	});
}

function initPantalla() {

	if(opcion.text() == Opcion.NUEVO) {

		inicializarFechaContabilidad();
		obtenerTipoCambio();
		cargarPantallaConDatosGuiaRemisionAsociadas();
	}

	if(opcion.text() == Opcion.VER) {
		cargarPantallaConDatosFactura();
	}

}

function cargarPantallaConDatosGuiaRemisionAsociadas() {

	var codigoOrdenCompra = numeroDocumento.text();
	var guias = guiasReferencia.text();

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/generarFacturaPorGuias/' + codigoOrdenCompra  + '/' + guias,
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

				dinamicaPantallaConDatosGuiaRemisionAsociadas();
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function cargarPantallaConDatosFactura() {

	var nroDocReferenciaVal = numeroDocumento.text();

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarFactura/' + nroDocReferenciaVal ,
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

				dinamicaVerPantallaFactura(data);
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function dinamicaVerPantallaFactura(data) {

	titulo.text("VER");
	codigo.html(numeroDocumento.text());

	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecVencimiento.datetimepicker('date', moment(data.fechaEntrega));

	//deshabilitarControl('.datetimepicker-input');
	deshabilitarControl(dateTimePickerInput);

	if(estadoPago.val() == EstadoPago.PAGADO) {
		deshabilitarControl(estadoPago);
		ocultarControl(btnAnular);
	} else {
		habilitarControl(estadoPago);
		mostrarControl(btnAnular);
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

function dinamicaPantallaConDatosGuiaRemisionAsociadas() {

	habilitarControl('.datetimepicker-input');
	habilitarControl(tipoMoneda);
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
	subTotalOC.val(data.subTotal);
	igv.val(data.igv);
	total.val(data.total);

	cantidadDetalleDuplicado = data.detalle.length;

	var indice = 0;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];

		if(getNum(detalle.cantidadPendienteGuiaRemision) > 0 ) {

			agregarFilaEnTablaDetalle(data);

			$('#codigoGuiaRemision_' + indice).val(detalle.codGuiaRemision);
			$('#lineaReferencia_' + indice).val(detalle.lineaReferencia);
			$('#codigo_' + indice).val(detalle.codArticulo);
			$('#descripcion_' + indice).val(detalle.descripcionArticulo);
			$('#marca_' + indice).val(detalle.marca);
			$('#cantidad_' + indice).val(detalle.cantidadPendienteGuiaRemision);
			$('#cantidad_' + indice).data('val', detalle.cantidadPendienteGuiaRemision);
			$('#cantidad_' + indice).data('temporal', detalle.cantidadPendienteGuiaRemision);
			$('#precio_' + indice).val(detalle.precioUnitario);
			$('#igv_' + indice).val(detalle.igvDetalle);
			$('#subTotal_' + indice).val(detalle.subTotal);

			calcularCantidadNuevaFactura($('#cantidad_' + i), i);
			indice++;
		}

	}

	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
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
	subTotalOC.val(data.subTotal);
	igv.val(data.igv);
	total.val(data.total);

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
		$('#igv_' + indice).val(detalle.igvDetalle);$('#subTotal_' + i).val(detalle.subTotal);

		indice++;

	}

	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function habilitarAnimacionAcordion() {

	$(".collapse.show").each(function(){

		$(this).prev(".card-header").find(".fas").addClass("fa-angle-up").removeClass("fa-angle-down");
	});

	$(".collapse").on('show.bs.collapse', function(){

		$(this).prev(".card-header").find(".fas").removeClass("fa-angle-down").addClass("fa-angle-up");
	}).on('hide.bs.collapse', function(){

		$(this).prev(".card-header").find(".fas").removeClass("fa-angle-up").addClass("fa-angle-down");
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

function construirFechasPicker() {

	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		defaultDate:	new Date(),
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

function retringirSeleccionFechas() {

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

function inicializarTablaDetalle(paginacion) {

	dataTableDetalle = tableDetalle.DataTable({

		"responsive"	: false,
		"scrollCollapse": false,
		"ordering"      : false,
		"dom"           :   "<'row'<'col-sm-12'rt>>" +
			"<'row'<'col-sm-4 'l><'col-sm-8 'p>>",
		"paging"	    : paginacion,
		"lengthMenu"	: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
		"deferRender"   : true,
		"autoWidth"		: false,
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

	var row = $('#tableDetalle').DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");

	var $tds = row.find("td").not(':first').not(':last');

	$.each($tds, function(i, el) {

		switch(i) {

			case 0:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigoGuiaRemision_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 1:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='lineaReferencia_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 2:	$(this).html(CADENA_VACIA).append("<div>" +
				"<input class='form-control codigo_table' type='text' maxlength='20'  id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</div>");
				break;

			case 3:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 4:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 5:	$(this).html(CADENA_VACIA).append("<div>" +
				"<select class='form-control almacen_table' id='almacen_" + indiceFilaDataTableDetalle + "'> </select>" +
				"</div>");
				cargarComboAlmacen("#almacen_" + indiceFilaDataTableDetalle , data)	;
				break;

			case 6:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' onchange='dispararEventosCambioCantidad(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);'" +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha precio_table' type='text' onkeyup='calcularPrecioKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			case 8:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='igv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			case 9:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

		}
	});

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

function calcularResumenFactura(){

	var subTotal = 0;

	var $headers = tableDetalle.find("th").not(':first').not(':last');

	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());

		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {

			if($($headers[cellIndex]).attr('id') == 'subTotal') {

				var valor = $(this).find("input").val();
				subTotal += getNum(valor);
			}

		});

	});

	var igvVal = parseFloat(subTotal*valorIGV).toFixed(2);
	var totalVal = parseFloat(subTotal) + parseFloat(igvVal);
	var totalVal = parseFloat(totalVal).toFixed(2);

	subTotalOC.val(subTotal);
	igv.val(igvVal);
	total.val(totalVal);
}

function grabarFactura() {

	if (formFactura[0].checkValidity() === true) {

		if(validarDetalleFactura()) {

			if(opcion.text() == Opcion.NUEVO) {

				if(estadoPago.val() == EstadoPago.PENDIENTE) {
					registrarFactura();
				} else {
					mostrarDialogoRegistrarFacturaPagado();
				}
			}

			if(opcion.text() == Opcion.VER) {

				actualizarFactura();
			}

		}

	} else {

		formFactura.addClass('was-validated');
	}



}

function actualizarFactura() {

	var nroDocumento  		= codigo.html();
	var estadoPagoVal 		= estadoPago.val();

	var objetoJson = {
		numeroDocumento:	nroDocumento,
		codigoEstadoPago:   estadoPagoVal
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
		url : '/appkahaxi/actualizarFactura/',
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

function validarDetalleFactura(){

	if(indiceFilaDataTableDetalle == null || indiceFilaDataTableDetalle == -1){
		mostrarDialogoInformacion("Debe ingresar items a la orden", Boton.WARNING);
		return false;
	}

	for(i=0; i< ( indiceFilaDataTableDetalle + 1) ; i++) {


		if($('#almacen_' + i).val() != undefined ) {

			var almacen = $('#almacen_' + i).val().trim();
			var cantidad = $('#cantidad_' + i).val().trim();

			if (almacen == '') {
				mostrarDialogoInformacion('Debe ingresar el almacen.', Boton.WARNING, $('#almacen_' + i));
				return false;
			}
			if (cantidad == '') {
				mostrarDialogoInformacion('Debe ingresar la cantidad.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}

			if (getNum(cantidad) == 0) {
				mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}
		}

	}
	return true;
}

function registrarFactura(){

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
	var subTotalVal 			= subTotalOC.val().trim();
	var igvVal 					= igv.val();
	var totalVal 				= total.val().trim();
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
		url : '/appkahaxi/registrarFactura/',
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

function anularFactura(){

	var nroDocumento  			= codigo.html();

	var objetoJson = {
		numeroDocumento:		nroDocumento
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
		url : '/appkahaxi/anularFactura/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				if (opcion.text() == Opcion.NUEVO) {
					var params = "numeroDocumento=" + numeroDocumento.text() + "&opcion=" + Opcion.VER + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
					window.location.href = "/appkahaxi/nueva-factura-directa?" + params;
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

function tableToJSON(dataTable) {

	var data = [];

	var $headers = dataTable.find("th").not(':first').not(':last');

	dataTable.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());

		$cells = node.find("td").not(':first').not(':last');

		data[index] = {};

		$cells.each(function(cellIndex) {

			var valor = $(this).find("input").val();

			if(valor == null || valor == undefined) {
				valor = $(this).find("select").val();
			}

			data[index][$($headers[cellIndex]).attr('id')] = valor;
		});

	});

	return data;
}

function deshabilitarDetalleFactura(){

	$("#tableDetalle tbody tr").find(".codigo_table").prop("disabled", true);
	$("#tableDetalle tbody tr").find(".almacen_table").prop("disabled", true);
	$("#tableDetalle tbody tr").find(".cantidad_table").prop("disabled", true);
	$("#tableDetalle tbody tr").find(".precio_table").prop("disabled", true);
	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", true);

}

function limpiarFactura() {

	inicializarFechaContabilidad();
	fecDocumento.datetimepicker('date', null);
	fecVencimiento.datetimepicker('date', null);
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	estadoPago.prop("selectedIndex", 0);
}

function inicializarFechaContabilidad(){

	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
}

function mostrarDialogoRegistrarFacturaPagado() {

	bootbox.confirm({
		message: "¿Está seguro de que esta factura ya ha sido pagada?",
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
				registrarFactura();
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
				anularFactura();
			}
		}
	});
}

function mostrarOcultarDiasPorCondicionPago() {

	var condPagoVal = condPago.val();

	if(condPagoVal == CondicionPago.CREDITO){
		controlRequerido(dias);
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

function convertirMontosASoles() {

	var tc = tipoCambio.val();

	for(i=0; i < (indiceFilaDataTableDetalle+1); i++) {

		$('#precio_' + i).val($('#precio_' + i).val() * tc);
		$('#igv_' + i).val(($('#igv_' + i).val() * tc).toFixed(2));
		$('#subTotal_' + i).val($('#subTotal_' + i).val() * tc);
	}

	subTotalOC.val(subTotalOC.val() * tc);
	igv.val(igv.val() * tc);
	total.val(total.val() * tc);
}

function convertirMontosADolares() {

	var tc = tipoCambio.val();

	for(i=0; i < (indiceFilaDataTableDetalle+1); i++) {

		$('#precio_' + i).val($('#precio_' + i).val() / tc);
		$('#igv_' + i).val(($('#igv_' + i).val() / tc).toFixed(2));
		$('#subTotal_' + i).val($('#subTotal_' + i).val() / tc);
	}

	subTotalOC.val(subTotalOC.val() / tc);
	igv.val(igv.val() / tc);
	total.val(total.val() / tc);
}

function obtenerTipoCambio() {

	var f = new Date();
	var dia = f.getDate();
	var mes = f.getMonth() + 1;
	var anio = f.getFullYear();

	$.ajax({
		type:"GET",
		contentType: false,
		processData: false,
		url : '/appkahaxi/buscarTc/' + dia + '/' + mes + '/' + anio,
		data: null,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr) {

			if(xhr.status == HttpStatus.OK) {

				tipoCambio.val(resultado);

			} else if(xhr.status == HttpStatus.Accepted) {

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

function dispararEventosCambioCantidad(control, fila) {

	var cantidad = getNum(parseInt(control.value));

	var cantidadGR = getNum(parseInt($('#cantidad_' + fila).data('val')));

	if(cantidad > cantidadGR) {
		mostrarDialogoCantidadMayorAlPendiente(control, fila);
		return false;
	}

	$('#cantidad_' + fila).data('temporal', cantidad);

	calcularCantidadKeyUp(control, fila);

}

function calcularCantidadKeyUp(control, fila) {

	var cantidad = getNum(parseInt(control.value));
	var precio = getNum(parseFloat($('#precio_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val((subTotal * valorIGV).toFixed(2));

	calcularResumenFactura();

}

function calcularCantidadNuevaFactura(control, fila) {

	var cantidad = getNum(parseInt(control.val()));
	var precio = getNum(parseFloat($('#precio_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val((subTotal * valorIGV).toFixed(2));

	calcularResumenFactura();

}

function mostrarDialogoCantidadMayorAlPendiente(control, fila) {

	bootbox.alert({
		message: "No se puede registrar una cantidad mayor al de la Guia de Remisión de Referencia",
		callback: function () {

			var cantidad = getNum(parseInt($('#cantidad_' + fila).data('temporal')));
			$('#cantidad_' + fila).val(cantidad);
			$('#cantidad_' + fila).focus();
		}
	});
}

function calcularPrecioKeyUp(control, fila) {

	var precio = getNum(parseFloat(control.value));
	var cantidad = getNum(parseInt($('#cantidad_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val(subTotal * valorIGV);

	calcularResumenFactura();

}

function cargarComboAlmacen(control, data) {

	$.ajax({
		type:"GET",
		cache: false,
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarAlmacen',
		data : null,
		dataType: 'text',
		success:function(result,textStatus,xhr){

			var resultado = JSON.parse(result);

			if(xhr.status == HttpStatus.OK) {
				var tam = resultado.length;
				for(var i = 0; i < tam; i++){
					if(resultado[i].predeterminado == '1') {
						$(control).append($('<option selected> </option').val(resultado[i].codigoAlmacen).html(resultado[i].descripcion));
					} else {
						$(control).append($('<option />').val(resultado[i].codigoAlmacen).html(resultado[i].descripcion));
					}

				}
			} else if(xhr.status == HttpStatus.Accepted){
				console.log("cargarCombo, Accepted....");
			}

			cantidadDetalleDuplicado = data.detalle.length;

			for(i=0; i < cantidadDetalleDuplicado; i++) {
				var detalle = data.detalle[i];
				$('#almacen_' + i).val(detalle.codAlmacen);
			}
		},
		error: function (xhr, error, code){
			console.log("cargarCombo, error...." + xhr.status);
		}
	});
}

function codigoArticuloKeyUp(e, control, fila) {

	var codigoClienteVal = codigoCliente.val();
	var datoBuscar = control.value.trim();

	var key = window.Event ? e.which : e.keyCode;

	if(key != 37 && key != 39) {

		$('#codigo_' + fila).autocomplete({

			source: function( request, response ) {

				$.ajax({
					type:"GET",
					contentType : "application/json",
					accept: 'text/plain',
					url : '/appkahaxi/buscarArticuloLike/' + datoBuscar + '/' + codigoClienteVal,
					data : null,
					dataType: 'json',
					beforeSend: function(xhr) {
						loadding(true);
					},
					success:function(resultado){

						response($.map(resultado,
							function(item) {
								return {
									label: item.codigoArticulo + ' - ' + item.descripcion,
									value: item.codigoArticulo + '/' + item.descripcion + '/' + item.descripcionMarcaArticulo + '/' + item.precioVtaUnd
								}
							}));

						loadding(false);

						response($.map(resultado,function(item) {

							var AC = new Object();
							AC.label = item.codigoArticulo + ' - ' + item.descripcion;
							AC.value = item.codigoArticulo;
							AC.descripcion		= item.descripcion;
							AC.descripcionMarcaArticulo = item.descripcionMarcaArticulo;
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
				event.preventDefault();

				$('#codigo_' + fila).val(ui.item.value);
				$('#descripcion_' + fila).val(ui.item.descripcion);
				$('#marca_' + fila).val(ui.item.descripcionMarcaArticulo);
				$('#cantidad_' + fila).focus();
			}
		});
	}
}
