var titulo;
var codigo;
var codigoCliente;
var nroDocReferencia;
var numeroDocumento;
var opcion;

var formGuiaRemision;
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
var fecEntrega;
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
var subTotalOC;
var igv;
var total;

var btnGrabar;

var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalleDuplicado;

var guiasPorOrdenCompraModal;
var modalCodigoOrdenCompra;
var tableDetalleGuias;
var dataTableDetalleGuias;
var btnAceptarModal;

var btnIrFactura;
var facturasPorGuiaRemisionModal;
var modalCodigoGuiaRemision;
var tableDetalleFactura;
var dataTableDetalleFactura;

var dateTimePickerInput;
var valorIGV;

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

	formGuiaRemision = $("#formGuiaRemision");
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
	fecEntrega = $("#fecEntrega");
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
	subTotalOC = $("#subTotalOC");
	igv = $("#igv");
	total = $("#total");

	btnGrabar = $("#btnGrabar");

	guiasPorOrdenCompraModal = $("#guiasPorOrdenCompraModal");
	modalCodigoOrdenCompra = $("#modalCodigoOrdenCompra");
	tableDetalleGuias = $("#tableDetalleGuias");
	btnAceptarModal = $("#btnAceptarModal");

	btnIrFactura = $("#btnIrFactura");

	facturasPorGuiaRemisionModal = $("#facturasPorGuiaRemisionModal");
	modalCodigoGuiaRemision = $("#modalCodigoGuiaRemision");
	tableDetalleFactura = $("#tableDetalleFactura");

	dateTimePickerInput = $(".datetimepicker-input");
}

function inicializarComponentes() {

	habilitarAnimacionAcordion();
	construirFechasPicker();
	restringirSeleccionFechas();

	obtenerIGV();
	inicializarTablaDetalle(false);
	habilitarAutocompletarBuscarCampos();
	inicializarEventos();
}

function inicializarEventos() {

	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		mostrarDialogoEliminarFila(dataTableDetalle, $(this));
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
		mostrarDialogoGenerarFactura(event);
	});

	btnAnular.on("click", function() {
		mostrarDialogoAnularGuiaRemision();
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

	btnAceptarModal.on("click", function() {
		generarFacturaAsociada();
	});

	btnIrFactura.on("click", function(event) {
		mostrarModalFacturasPorGuia(event);
	});

}


function volver(){
	var params;
	var datoBuscar 	= $('#datoBuscar').text();
	var fechaDesde 	= $('#fechaDesde').text();
	var fechaHasta 	= $('#fechaHasta').text();
	var estadoParam	= $('#estadoParam').text();

	params = "datoBuscar=" + datoBuscar + "&fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaHasta + "&estadoParam=" + estadoParam;
	window.location.href = "/appkahaxi/mantenimiento-guia-remision?" + params;
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

function inicializarPantalla() {

	if(opcion.text() == Opcion.NUEVO) {

		cargarPantallaConDatosOrdenCompra();
		inicializarFechaContabilidad();
		obtenerTipoCambio();
	}

	if(opcion.text() == Opcion.VER) {
		cargarPantallaConDatosGuiaRemision();
	}

}

function cargarPantallaConDatosGuiaRemision() {

	var nroDocReferenciaVal = numeroDocumento.text();

	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarGuiaRemision/' + nroDocReferenciaVal ,
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

				dinamicaVerPantallaGuiaRemision(data);
			}

			loadding(false);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function dinamicaVerPantallaGuiaRemision(data) {

	titulo.text("VER");
	codigo.html(numeroDocumento.text());

	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecEntrega.datetimepicker('date', moment(data.fechaEntrega));

	//deshabilitarControl('.datetimepicker-input');
	deshabilitarControl(dateTimePickerInput);

	deshabilitarControl(tipoMoneda);
	deshabilitarControl(motivoTraslado);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	deshabilitarControl(serie);
	deshabilitarControl(correlativo);

	if(data.codigoEstado == EstadoGuiaRemision.GENERADO){

		// estado APROBADO
		mostrarControl(btnGenerarFactura);

		if(data.codigoEstadoProceso == EstadoProceso.ABIERTO){
			// estado proceso ABIERTO
			habilitarControl(btnGenerarFactura);
			btnGenerarFactura.removeClass('btn btn-secondary').addClass('btn btn-primary');
			if(data.cantidadFacturasAsociadas > 0) {
				ocultarControl(btnAnular);
			} else {
				mostrarControl(btnAnular);
			}

		}else{
			// estado proceso CERRADO
			deshabilitarControl(btnGenerarFactura);
			btnGenerarFactura.removeClass('btn btn-primary').addClass('btn btn-secondary');
		}

		btnGenerarFactura.focus();
		mostrarControl(btnIrFactura);

	}else if(data.codigoEstado == EstadoGuiaRemision.ANULADO){

		btnVolver.focus();
	}

	mostrarControl(btnVolver);
	ocultarControl(btnGrabar);
	ocultarControl(btnLimpiar);

	deshabilitarDetalleGuiaRemision();
}

function cargarPantallaConDatosOrdenCompra() {

	var nroDocReferenciaVal = numeroDocumento.text();

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

				var data = JSON.parse(result);

				cargarPantallaHTMLOrdenCompra(data);

				if(data.codigoCondPago == CondicionPago.CREDITO) {
					mostrarControl(divDias);
				}

				dinamicaNuevaPantallaGuiaRemision();
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

	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	motivoTraslado.val(data.codigoMotivoTraslado);
	tipoCambio.val(data.tipoCambio);
	subTotalOC.val(data.subTotal);
	igv.val(data.igv);
	total.val(data.total);
	OCReferencia.val(data.ordenCompra);

	cantidadDetalleDuplicado = data.detalle.length;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		agregarFilaEnTablaDetalle(data);

		var detalle = data.detalle[i];
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidad);
		$('#cantidadPend_' + i).val(detalle.cantidadPendiente);
		$('#cantidadPend_' + i).data('val', detalle.cantidadPendiente);
		$('#precio_' + i).val(detalle.precioUnitario);
		$('#igv_' + i).val(detalle.igvDetalle);
		$('#subTotal_' + i).val(detalle.subTotal);

	}

	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function cargarPantallaHTMLOrdenCompra(data) {

	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	subTotalOC.val(data.subTotal);
	igv.val(data.igv);
	total.val(data.total);

	cantidadDetalleDuplicado = data.detalle.length;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];

		agregarFilaEnTablaDetalle(data);
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidadPendiente);
		$('#cantidadPend_' + i).val(detalle.cantidadPendiente);
		$('#cantidadPend_' + i).data('val', detalle.cantidadPendiente);
		$('#precio_' + i).val(detalle.precioUnitario);
		$('#igv_' + i).val(detalle.igvDetalle);
		$('#subTotal_' + i).val(detalle.subTotal);
		$('#lineaReferencia_' + i).val(detalle.linea);

		calcularCantidadNuevaGuia($('#cantidad_' + i), i);

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

	fecEntrega.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});
}

function restringirSeleccionFechas() {

	fecConta.datetimepicker('maxDate', new Date());

	fecDocumento.on("change.datetimepicker", function (e) {
		fecEntrega.datetimepicker('minDate', e.date);
	});

	fecConta.on("change.datetimepicker", function (e) {
		fecDocumento.datetimepicker('maxDate', e.date);
		fecEntrega.datetimepicker('maxDate', e.date);
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

function habilitarAutocompletarBuscarCampos() {

	OCReferencia.autocomplete({

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
			OCReferencia.val(CADENA_VACIA);
			fecConta.focus();
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

			case 0:	$(this).html(CADENA_VACIA).append("<div>" +
				"<input class='form-control' type='text' onkeyup='codigoArticuloKeyUp(event, this, " + indiceFilaDataTableDetalle + ");' maxlength='20'  id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</div>");
				break;

			case 1:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 2:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 3:	$(this).html(CADENA_VACIA).append("<div>" +
				"<select class='form-control almacen_table' id='almacen_" + indiceFilaDataTableDetalle + "'> </select>" +
				"</div>");
				cargarComboAlmacen("#almacen_" + indiceFilaDataTableDetalle , data)	;
				break;

			case 4:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' onchange='dispararEventosCambioCantidad(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);'" +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			case 5:	$(this).html(CADENA_VACIA).append("<input class='alineacion-derecha' type='text' id='cantidadPend_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			case 6:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='igv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			case 8:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			case 9:	$(this).html(CADENA_VACIA).append("<input class='alineacion-derecha' type='text' id='lineaReferencia_" + indiceFilaDataTableDetalle + "'>");
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
				calcularResumenGuiaRemision();
			}
		}
	});
}

function calcularResumenGuiaRemision(){

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

function grabarGuiaRemision() {

	if (formGuiaRemision[0].checkValidity() === true) {

		if(validarDetalleGuiaRemision()) {

			if(opcion.text() == Opcion.NUEVO) {

				registrarGuiaRemision();

			}

		}

	} else {

		formGuiaRemision.addClass('was-validated');
	}

}

function validarDetalleGuiaRemision(){

	if(indiceFilaDataTableDetalle == null || indiceFilaDataTableDetalle == -1){
		mostrarDialogoInformacion("Debe ingresar items a la orden", Boton.WARNING);
		return false;
	}

	for(i=0; i< ( indiceFilaDataTableDetalle + 1) ; i++) {

		if($('#almacen_' + i).val() != undefined ) {

			var almacen = $('#almacen_' + i).val().trim();
			var cantidad = $('#cantidad_' + i).val().trim();

			if(almacen == ''){
				mostrarDialogoInformacion('Debe ingresar el almacen.', Boton.WARNING, $('#almacen_' + i));
				return false;
			}
			if(cantidad == ''){
				mostrarDialogoInformacion('Debe ingresar la cantidad.', Boton.WARNING,  $('#cantidad_' + i));
				return false;
			}

			if(getNum(cantidad) == 0){
				mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}
		}


	}
	return true;
}

function registrarGuiaRemision(){

	var nroDocumento  			= codigo.html();
	var serieVal 				= serie.val();
	var correlativoVal 			= correlativo.val();
	var codigoClienteVal  		= codigoCliente.val().trim();
	var ordenCompra	  			= OCReferencia.val().trim();
	var fecContaVal 			= fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecDocumentoVal 		= fecDocumento.datetimepicker('date').format('YYYY-MM-DD');
	var fecEntregaVal 			= fecEntrega.datetimepicker('date').format('YYYY-MM-DD');
	var tipoMonedaVal 			= tipoMoneda.val();
	var condPagoVal 			= condPago.val();
	var tipoCambioVal			= tipoCambio.val();
	var codigoMotivoTraslado	= motivoTraslado.val().trim();
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
		serie:					serieVal,
		correlativo:			correlativoVal,
		codigoCliente:  		codigoClienteVal,
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
		url : '/appkahaxi/registrarGuiaRemision/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				mostrarNotificacion("El registro fué grabado correctamente.", "success");

				codigo.html(resultado);

				deshabilitarControl(serie);
				deshabilitarControl(correlativo);
				deshabilitarControl(motivoTraslado);

				//deshabilitarControl('.datetimepicker-input');
				deshabilitarControl(dateTimePickerInput);

				mostrarControl(btnGenerarFactura);
				mostrarControl(btnAnular);
				ocultarControl(btnGrabar);
				ocultarControl(btnLimpiar);

				deshabilitarDetalleGuiaRemision();

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

function anularGuiaRemision(){

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
		url : '/appkahaxi/anularGuiaRemision/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				if (opcion.text() == Opcion.NUEVO) {
					var params = "numeroDocumento=" + numeroDocumento.text() + "&opcion=" + Opcion.VER + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
					window.location.href = "/appkahaxi/nueva-orden-compra?" + params;
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

function deshabilitarDetalleGuiaRemision(){

	$("#tableDetalle tbody tr").find(".almacen_table").prop("disabled", true);
	$("#tableDetalle tbody tr").find(".cantidad_table").prop("disabled", true);
	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", true);

}

function dinamicaNuevaPantallaGuiaRemision() {

	titulo.text("NUEVA");

	deshabilitarControl(OCReferencia);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);

	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", false);

}

function limpiarGuiaRemision() {

	inicializarFechaContabilidad();
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	motivoTraslado.prop("selectedIndex", 0);
}

function inicializarFechaContabilidad(){

	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
}

function mostrarDialogoGenerarFactura(event) {

	bootbox.confirm({
		message: "¿Está seguro de generar Factura?",
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
				mostrarModalGuiasPorOrdenCompra(event);
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

function obtenerDetalleFacturasPorGuiaRemision(event){

	event.preventDefault();
	event.stopPropagation();

	if ( $.fn.dataTable.isDataTable('#tableDetalleFactura')) {

		dataTableDetalleFactura.clear();
		dataTableDetalleFactura.ajax.reload(null, true);

	} else {

		dataTableDetalleFactura = tableDetalleFactura.DataTable({

			"ajax": {
				data: function ( d ) {
					d.codigoGuiaRemision 	= codigo.html().trim();
				},
				url: '/appkahaxi/listarFacturaPorGuiaRemision/',
				dataSrc: function (json) {
					console.log("listarFacturaPorGuiaRemision...success");
					mostrarModal(facturasPorGuiaRemisionModal);
					return json;
				},
				error: function (xhr, error, code) {
					mostrarMensajeValidacion(xhr.responseText);
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
						return '<a href="#" class="link-ver-factura">' + data + '</a>';
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
				},
				{
					"width": "10px",
					"targets": [7],
					"data": "descripcionEstadoPago",
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

					// modificando el tamaño de los caracteres del listado

					return row;

				},
			"language"  : {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});

		$('#tableDetalleFactura tbody').on('click','.link-ver-factura', function () {

			var data = dataTableDetalleFactura.row( $(this).closest('tr')).data();
			cargarFacturaAsociada(data.numeroDocumento, Opcion.VER);
		});
	}
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
					d.codigoOrdenCompra 	= OCReferencia.val().trim();
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
					"orderable": false
				},
				{
					"width": "30px",
					"targets": [1],
					"data": "serieCorrelativo",
					"orderable": false
				},
				{
					"width": "20px",
					"targets": [2],
					"data": "subTotal",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  formatearMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [3],
					"data": "igv",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  formatearMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [4],
					"data": "total",
					"orderable": false,
					"render":
						function (data, type, row ) {
							return  formatearMoneda(data);
						}
				},
				{
					"width": "10px",
					"targets": [5],
					"data": "activo",
					"className": "dt-body-left",
					"orderable": false,
					"render": function(data, type, row) {
						return '<input type="checkbox" class="chk_guia_remision">';
					},
					"className": "dt-body-center text-center"
				}
			],
			"fnRowCallback":
				function(row, data, iDisplayIndex, iDisplayIndexFull){

					if(data.codigoTipoMoneda == Moneda.SOLES){
						$('td:eq(2)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(3)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-sol');
					}else{
						$('td:eq(2)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(3)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-dolar');
					}

					// modificando el tamaño de los caracteres del listado
					return row;

				},
			"language"  : {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});

	}
}

function cargarFacturaAsociada(numeroDocumento, opcion) {

	var params;

	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&guias=&volver=" + Volver.NO;

	window.location.href = "/appkahaxi/nueva-factura-asociada?" + params;
}

function mostrarDialogoAnularGuiaRemision() {

	bootbox.confirm({
		message: "¿Está seguro que desea anular la Guía de Remisión?",
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
				anularGuiaRemision();
			}
		}
	});
}

function mostrarOcultarDiasPorCondicionPago() {

	var condPagoVal = condPago.val();

	if(condPagoVal == CondicionPago.CONTADO){
		ocultarControl(divDias);
	}else{
		mostrarControl(divDias);
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
	var cantidadPendiente = getNum(parseInt($('#cantidadPend_' + fila).data('val')));

	if(cantidad > cantidadPendiente) {
		mostrarDialogoCantidadMayorAlPendiente(control, fila);
		return false;
	}

	calcularCantidadKeyUp(control, fila);

}

function calcularCantidadKeyUp(control, fila) {

	var cantidad = getNum(parseInt(control.value));
	var precio = getNum(parseFloat($('#precio_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val((subTotal * valorIGV).toFixed(2));
	$('#cantidadPend_' + fila).val(cantidad);

	calcularResumenGuiaRemision();

}

function calcularCantidadNuevaGuia(control, fila) {

	var cantidad = getNum(parseInt(control.val()));
	var precio = getNum(parseFloat($('#precio_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val((subTotal * valorIGV).toFixed(2));
	$('#cantidadPend_' + fila).val(cantidad);

	calcularResumenGuiaRemision();

}

function generarFacturaAsociada() {

	var data = [];
	var indice = 0;

	var cabeceras = tableDetalleGuias.find("th").not(':last');

	tableDetalleGuias.find("tbody tr").each(function(index) {

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

	var opcion = Opcion.NUEVO;
	var params = "numeroDocumento=" + OCReferencia.val() + "&opcion=" + opcion + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0&guias=" + guiasRemision;
	window.location.href = "/appkahaxi/nueva-factura-asociada?" + params;

}

function mostrarDialogoCantidadMayorAlPendiente(control, fila) {

	bootbox.confirm({
		message: "¿Está seguro de registrar una cantidad mayor que la cantidad solicitada?",
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

				calcularCantidadKeyUp(control, fila)

			} else {

				var cantidadPendiente = getNum(parseInt($('#cantidadPend_' + fila).val()));
				$('#cantidad_' + fila).val(cantidadPendiente);
				$('#cantidad_' + fila).focus();
			}
		}
	});
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

			if(opcion.text() == Opcion.VER) {

				cantidadDetalleDuplicado = data.detalle.length;

				for(i=0; i < cantidadDetalleDuplicado; i++) {
					var detalle = data.detalle[i];
					$('#almacen_' + i).val(detalle.codAlmacen);
				}
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
