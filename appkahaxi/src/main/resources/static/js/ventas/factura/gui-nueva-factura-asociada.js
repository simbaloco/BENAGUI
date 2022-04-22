var titulo;
var codigo;
var codigoCliente;
var nroDocReferencia;
var numeroDocumento;
var opcion;
var email;
var datoBuscar;
var nroComprobantePago;
var nroGuiaRemision;
var nroGr;
var nroOrdenVenta;
var codRepuesto;
var fechaDesde;
var fechaHasta;
var estadoParam;
var volverParam;
var desdeDocRefParam;
var origenMnto;

var guiasReferencia;

var formFactura;
var formObservaciones;
var OVReferencia;
var documentoCliente;
var nombreCliente;
var direccion;
var direccionDespacho;
var personaContacto;
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
var btnPdf;

var tableDetalle;
var tableNuevoDetalle;

var observaciones;
var subTotalFactura;
var igvFactura;
var totalFactura;
var dctoTotal;
var dcto;
var chkDctoTotal;
var dctoGRDiv;

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
	email =  $("#email");
	codigoCliente = $("#codigoCliente");
	nroDocReferencia = $("#nroDocReferencia");
	numeroDocumento = $('#numeroDocumento');
	origenMnto = $('#origenMnto');
	opcion = $("#opcion");
	datoBuscar =  $("#datoBuscar");
	nroComprobantePago =  $("#nroComprobantePago");
	nroGuiaRemision =  $("#nroGuiaRemision");
	nroGr = $("#nroGr");
	nroOrdenVenta =  $("#nroOrdenVenta");
	codRepuesto =  $("#codRepuesto");
	fechaDesde =  $("#fechaDesde");
	fechaHasta =  $("#fechaHasta");
	estadoParam =  $("#estadoParam");
	volverParam =  $("#volverParam");	
	guiasReferencia = $("#guiasParam");
	formFactura = $("#formFactura");
	formObservaciones = $("#formObservaciones");
	OVReferencia = $("#OVReferencia");
	documentoCliente = $("#documentoCliente");
	nombreCliente = $("#nombreCliente");
	direccion = $("#direccion");
	direccionDespacho = $("#direccionDespacho");
	personaContacto = $("#personaContacto");
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
	btnPdf =  $("#btnPdf");
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");
	observaciones = $("#observaciones");
	subTotalFactura = $("#subTotalFactura");
	igvFactura = $("#igvFactura");
	totalFactura = $("#totalFactura");
	btnGrabar = $("#btnGrabar");
	estadoPago = $("#estadoPago");
	volverParam = $("#volverParam");
	desdeDocRefParam =  $("#desdeDocRefParam");
	dateTimePickerInput = $(".datetimepicker-input");
	lblAnulado = $("#lblAnulado");
	dctoTotal = $("#dctoTotal");
	dcto = $("#dcto");
	chkDctoTotal = $("#chkDctoTotal");
	dctoGRDiv = $("#dctoGRDiv")
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
	//inicializarFechas();
	controlNoRequerido(observaciones);
	
	if(opcion.text() == Opcion.NUEVO) {
		console.log("es NUEVO!!!")
		inicializarTablaDetalle(true);
		cargarPantallaConDatosGuiaRemisionAsociadas();
		
	}else if(opcion.text() == Opcion.VER) {
		inicializarTablaDetalle(false);
		cargarPantallaConDatosFactura();
	}
}

function construirFechasPicker() {
	/* se construyen del último al primero para que funcionen con el botón "limpiar" */
	
	// La fecha de Vencimiento:
	// •	No puede ser menor que la fecha de contabilización
	fecVencimiento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		//date:		moment(),
		//minDate:	moment()
	});
	
	// La fecha de Documento
	// •	No puede ser mayor que la fecha de contabilización
	// •	No puede ser mayor que la fecha actual.
	fecDocumento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		//date:		moment(),
		//maxDate:	moment()
	});

	// La fecha de contabilización no puede ser mayor a la fecha actual	
	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		//date:		moment(),
		//maxDate:	moment()
	});	
}

function restringirSeleccionFechas() {
	//fecConta.datetimepicker('maxDate', new Date());
	/*
	fecDocumento.on("change.datetimepicker", function (e) {
		fecVencimiento.datetimepicker('minDate', e.date);
	});
	*/
	fecConta.on("change.datetimepicker", function (e) {
		//fecDocumento.datetimepicker('maxDate', e.date < fecVencimiento.datetimepicker('date') ? e.date : fecVencimiento.datetimepicker('date'));
		fecDocumento.datetimepicker('maxDate', e.date);
		fecVencimiento.datetimepicker('minDate', e.date);
	});
	/*
	fecVencimiento.on("change.datetimepicker", function (e) {
		//fecDocumento.datetimepicker('maxDate', e.date < fecConta.datetimepicker('date') ? e.date : fecConta.datetimepicker('date'));
		fecDocumento.datetimepicker('maxDate', e.date);
	});
	*/
}

function inicializarFechas(){
	
	fecVencimiento.datetimepicker('date', moment());
	fecConta.datetimepicker('date', moment());
	
	fecVencimiento.datetimepicker('minDate', moment());
		
	fecDocumento.datetimepicker('maxDate', moment());
	fecConta.datetimepicker('maxDate', moment());
	fecDocumento.datetimepicker('date', moment());	
}

function inicializarEventos() {
	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		if(indiceFilaDataTableDetalle == 0){
			mostrarMensajeValidacion("No se puede eliminar el único item de la Factura.");
		}else{
			mostrarDialogoEliminarFila(dataTableDetalle, $(this));
		}
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

	btnAnular.on("click", function(e) {
		if (observaciones.val().trim() == CADENA_VACIA){
			controlRequerido(observaciones);
			habilitarControl(observaciones);
			mostrarMensajeValidacion("Debe ingresar observaciones antes de anular.", observaciones);
		}else{
			mostrarDialogoAnularFactura(e);
		}
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
	
	btnPdf.click(function(e){
		generarPdf(e);	
    });
	
	serie.on('click', function(event) {
		if (serie.val() > 0) {
			obtenerCorrelativo();
		} else {
			correlativo.val(CADENA_VACIA);
		}
	});

}

function obtenerCorrelativo() {
	console.log("obtenerCorrelativo...");

	var codSerie = serie.val();

	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/obtenerCorrelativo/' + codSerie,
		data: null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(result, textStatus, xhr) {
			if (xhr.status == HttpStatus.OK) {
				correlativo.val(result);
			}
			loadding(false);
		},
		error: function(xhr, error, code) {

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
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
	//fecConta.datetimepicker('maxDate', moment());
	fecVencimiento.datetimepicker('date', moment());
	fecDocumento.datetimepicker('date', moment());
	fecConta.datetimepicker('date', moment());
	fecConta.datetimepicker('maxDate', moment());
}
*/

function cargarPantallaConDatosGuiaRemisionAsociadas() {
	console.log("cargarPantallaConDatosGuiaRemisionAsociadas...nroGuiaRemision-->" + nroGuiaRemision.val());
	var codigoOrdenVenta = numeroDocumento.text();
	var guias = guiasReferencia.text();
	console.log("codigoOrdenVenta-->" + codigoOrdenVenta);
	console.log("guias-->" + guias);
	
	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/generarFacturaVentaPorGuias/' + codigoOrdenVenta  + '/' + guias,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){

			if(xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTMLFacturaConDatosGuiaRemisionAsociadas(data);
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

	OVReferencia.val(data.ordenVenta);
	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	email.val(data.email);
	direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val((data.codigoDias==null || data.codigoDias == CADENA_VACIA) ? Dias._30 : data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	// se obtiene el tc del día
	obtenerTipoCambio(tipoCambio);
	//tipoCambio.val(data.tipoCambio);
	dcto.val(convertirNumeroAMoneda(data.descuento));
	subTotalFactura.val(data.subTotal);
	igvFactura.val(data.igv);
	totalFactura.val(data.total);
	
	if (data.porcDctoTotal != null) {
		dctoTotal.val(data.porcDctoTotal);
		checkControl(chkDctoTotal);
    	mostrarControl(dctoGRDiv);
	}
	
	if(data.codigoCondPago == CondicionPago.CREDITO) {
		mostrarControl(divDias);
	}

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
			$('#precioUnitario_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
			$('#precioUnitarioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
			$('#precioReferencia_' + i).val(convertirNumeroAMoneda(detalle.precioReferencia));
			$('#porcentajeDcto_' + i).val(detalle.porcentajeDcto);
			$('#precioConDcto_' + i).val(convertirNumeroAMoneda(detalle.precioConDcto));	
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
	
	mostrarControl(btnVolver);
	mostrarControl(btnGrabar);
	mostrarControl(btnLimpiar);

	for(i=0; i< cantidadDetalleDuplicado ; i++) {

		deshabilitarControl(null, '#codigo_' + i);
		deshabilitarControl(null, '#almacen_' + i);
		habilitarControl(null, '#cantidad_' + i);
		deshabilitarControl(null, '#precioUnitario_' + i);
	}

	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", false);
	
	serie.focus();
}

function cargarPantallaConDatosFactura() {
	console.log("nroGuiaRemision-->" + nroGuiaRemision.val())
	var nroDocReferenciaVal; 
	//var desdeDocRef = desdeDocRefParam.text();
	
	/*if(desdeDocRef == Respuesta.SI){
		nroDocReferenciaVal = nroComprobantePago.text();
		console.log("nroComprobantePago.text()-->" + nroComprobantePago.text());
	}else{*/
		nroDocReferenciaVal = numeroDocumento.text();
	/*	console.log("numeroDocumento.text()-->" + numeroDocumento.text());
	}	*/
	
	console.log("nroDocReferenciaVal-->" + nroDocReferenciaVal);
	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarFacturaVenta/' + nroDocReferenciaVal ,
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
				console.log("codigo.html5: "+ codigo.html());
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
	
	//codigo.html(numeroDocumento.text());	
	OVReferencia.val(data.ordenVenta);
	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	email.val(data.email);
	direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);
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
	dcto.val(convertirNumeroAMoneda(data.descuento));
	
	if (data.porcDctoTotal != null) {
		dctoTotal.val(data.porcDctoTotal);
		checkControl(chkDctoTotal);
    	mostrarControl(dctoGRDiv);
	}
	
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
		$('#precioUnitario_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#precioUnitarioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
		$('#precioReferencia_' + i).val(convertirNumeroAMoneda(detalle.precioReferencia));
		$('#porcentajeDcto_' + i).val(detalle.porcentajeDcto);
		$('#precioConDcto_' + i).val(convertirNumeroAMoneda(detalle.precioConDcto));		
		$('#subTotal_' + i).val(detalle.subTotal);
		$('#subTotalIgv_' + indice).val(detalle.subTotalIgv);		
		indice++;
	}
	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function verPantallaFactura(data) {
	titulo.text("VER");
	
	//var desdeDocRef = desdeDocRefParam.text();
	
	codigo.html(data.numeroDocumento);
	/*if(desdeDocRef == Respuesta.SI){
		codigo.html(nroComprobantePago.text());
	}else{
		codigo.html(numeroDocumento.text());
	}*/
	
	deshabilitarControl(direccionDespacho);
	deshabilitarControl(personaContacto);
	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecVencimiento.datetimepicker('date', moment(data.fechaEntrega));
	deshabilitarControl(dateTimePickerInput);
	//deshabilitarControl(observaciones);
	//controlNoRequerido(observaciones);
	
	if(data.codigoEstado == EstadoFactura.GENERADO){
		if(estadoPago.val() == EstadoPago.PAGADO) {
			deshabilitarControl(estadoPago);
			ocultarControl(btnAnular);
		} else {
			//deshabilitarControl(observaciones);
			habilitarControl(estadoPago);
			mostrarControl(btnAnular);
			btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
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

	if(volverParam.text() == Respuesta.NO) {
		ocultarControl(btnVolver);
	} else {
		mostrarControl(btnVolver);
	}
	mostrarControl(btnPdf);
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

			// PVU
			case 7: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioUnitario_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			// PVU C/IGV
			case 8: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioUnitarioIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			// PRECIO REFERENCIA
			case 9: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioReferencia_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			// PORC DCTO (OCULTO)
			case 10: $(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='porcentajeDcto_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// PRECIO C/DCTO
			case 11: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioConDcto_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
			
			// SUBTOTAL
			case 12:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
				
			// SUBTOTAL C/IGV	 (OCULTO)
			case 13:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
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
	
	var precio = Number($('#precioUnitario_' + fila).val());
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
					registrarFacturaVenta();
				} else {
					mostrarDialogoRegistrarFacturaPagado();
				}
			}

			if(opcion.text() == Opcion.VER) {
				actualizarFacturaVenta();
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
		
	// verificando que se hayan ingresado por lo menos un item al detalle de la Orden de Venta
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

function registrarFacturaVenta(){

	var nroDocumento  			= codigo.html();
	var ordenVenta  			= OVReferencia.val();
	var serieVal 				= serie.val();
	var correlativoVal 			= correlativo.val();
	var codigoClienteVal  		= codigoCliente.val().trim();
	var dirDespachoVal 			= direccionDespacho.val().trim();
	var perContactoVal 			= personaContacto.val().trim();	
	var fecContaVal 			= fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecDocumentoVal 		= fecDocumento.datetimepicker('date').format('YYYY-MM-DD');
	var fecVencimientoVal 		= fecVencimiento.datetimepicker('date').format('YYYY-MM-DD');
	var tipoMonedaVal 			= tipoMoneda.val();
	var condPagoVal 			= condPago.val();
	var tipoCambioVal			= tipoCambio.val();
	var codigoEstadoPagoVal 	= estadoPago.val().trim();
	var observacionesVal 		= observaciones.val().trim();
	var descuento 				= convertirMonedaANumero(dcto.val().trim() == '' ? '0' : dcto.val().trim());
	var subTotalVal 			= convertirMonedaANumero(subTotalFactura.val().trim());
	var igvVal 					= convertirMonedaANumero(igvFactura.val());
	var totalVal 				= convertirMonedaANumero(totalFactura.val().trim());
		
	var detalle 				= tableToJSON(tableDetalle);
	var diasVal					= null;
	var porcDctoTotal = null;
	if (chkDctoTotal.is(':checked')) {
		porcDctoTotal = dctoTotal.val().trim();
	}

	if(condPagoVal == CondicionPago.CREDITO) {
		diasVal					= dias.val();
	}

	var objetoJson = {

		numeroDocumento:		nroDocumento,
		ordenVenta:				ordenVenta,
		serie:					serieVal,
		correlativo:			correlativoVal,
		codigoCliente:  		codigoClienteVal,
		direccionDespacho: 		dirDespachoVal,
		personaContacto: 		perContactoVal,
		codDireccionDespacho: 	null,
		codPersonaContacto: 	null,
		fechaContabilizacion:   fecContaVal,
		fechaDocumento:      	fecDocumentoVal,
		fechaVencimiento:       fecVencimientoVal,
		codigoTipoMoneda:     	tipoMonedaVal,
		codigoCondPago:     	condPagoVal,
		codigoDias:     		diasVal,
		codigoEstadoPago:   	codigoEstadoPagoVal,
		tipoCambio:				tipoCambioVal,		
		porcDctoTotal: 			porcDctoTotal,
		subTotal: 				subTotalVal,
		descuento: 				descuento,
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
		url : '/appkahaxi/registrarFacturaVenta/',
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
					deshabilitarControl(direccionDespacho);
					deshabilitarControl(personaContacto);
					deshabilitarControl(estadoPago);
					deshabilitarControl(tipoMoneda);
					deshabilitarControl(condPago);
					deshabilitarControl(dias);
					deshabilitarControl(dateTimePickerInput);
					deshabilitarControl(observaciones);
					mostrarControl(btnAnular);
					btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
					mostrarControl(btnVolver);
					ocultarControl(btnGrabar);
					ocultarControl(btnLimpiar);
					mostrarControl(btnPdf);
					// si se grabó con estado PENDIENTE, cambiar a opción = VER
					opcion.text(Opcion.VER);					
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

function actualizarFacturaVenta() {

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
		url : '/appkahaxi/actualizarFacturaVenta/',
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
				if($($headers[cellIndex]).attr('id') == 'precioUnitario' || $($headers[cellIndex]).attr('id') == 'precioUnitarioIgv' || 
				   $($headers[cellIndex]).attr('id') == 'subTotalIgv' || $($headers[cellIndex]).attr('id') == 'subTotal'){
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
				registrarFacturaVenta();
			}
		}
	});
}

function mostrarDialogoAnularFactura(event) {

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
				if (formObservaciones[0].checkValidity() == true) {
					anularFacturaVenta();
				}else {
					event.stopPropagation();
				}
				formObservaciones.addClass('was-validated');
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

	if(estadoPagoVal == EstadoPago.PAGADO){
		ocultarControl(btnAnular);
		mostrarControl(btnGrabar);
		habilitarControl(observaciones);
	} else{
		habilitarControl(observaciones);
		if (codigo.html() != CADENA_VACIA || codigo.html() > 0){
			mostrarControl(btnAnular);
			btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
			
			ocultarControl(btnGrabar);
			//deshabilitarControl(observaciones);
		}else{
			mostrarControl(btnGrabar);
			ocultarControl(btnAnular);			
		}	
	}
}

function anularFacturaVenta(){

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
		url : '/appkahaxi/anularFacturaVenta/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){

				if (opcion.text() == Opcion.NUEVO) {
					var params = "numeroDocumento=" + numeroDocumento.text() + "&opcion=" + Opcion.VER + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
					window.location.href = "/appkahaxi/nueva-factura-venta-directa?" + params;
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
	var dato 			= datoBuscar.text();
	var nroFact 		= nroComprobantePago.text();
	var nroGRem			= nroGuiaRemision.text();
	var nroOV 			= nroOrdenVenta.text();
	var codRpto 		= codRepuesto.text();
	var fecDesde 		= fechaDesde.text();
	var fecHasta 		= fechaHasta.text();
	var estParam		= estadoParam.text();
	var nroDoc			= nroGr.text(); // este debe ser la GR
	var desdeDocRef 	= desdeDocRefParam.text();
	
	if(desdeDocRef == Respuesta.SI){
		
		params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.VER + "&datoBuscar=" + dato + 
				 "&nroGuiaRemision=" + nroGRem + "&nroOrdenVenta=" + nroOV + "&codRepuesto=" + codRpto + 
			 	 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + "&volver=" + Respuesta.SI + 
				 "&desdeDocRef=" + Respuesta.NO + "&origenMnto=" + origenMnto.text();
		window.location.href = "/appkahaxi/cargar-guia-remision-venta?" + params;
	}else{
		
		params = "datoBuscar=" + dato + "&nroComprobantePago=" + nroFact + "&nroOrdenVenta=" + nroOV + "&codRepuesto=" + codRpto +  
			 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
		window.location.href = "/appkahaxi/mantenimiento-factura-venta?" + params;
	}
}

function limpiarFactura() {
	//inicializarFechas();
		
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);
	estadoPago.val(EstadoPago.PENDIENTE);
	condPago.val(CondicionPago.CONTADO);
	dias.val(Dias._30);
	ocultarControl(divDias);
		
	fecVencimiento.datetimepicker('destroy');
	fecDocumento.datetimepicker('destroy');
	fecConta.datetimepicker('destroy');
	
	//fecVencimiento.datetimepicker('minDate', false);	
	//fecDocumento.datetimepicker('maxDate', false);
	
	construirFechasPicker();
	inicializarFechas();
	
	formObservaciones.removeClass('was-validated');
	
	serie.focus();
	
}

/********************* CALCULOS NUMERICOS ********************/

function calcularResumenFactura(){

	var subTotal = 0;
	var dscto = 0;
	
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
	
	// 2. obtenemos el dcto total ingresado
	var descTotal = Number(dctoTotal.val());
	// 2.1. aplicamos el dcto al subTotal obtenido
	if (descTotal != CADENA_VACIA && descTotal != 0) {
		dscto = subTotal * (descTotal / 100);
	}

	// 3.  hacemos los cáculos del IGV y TOTAL de la OC
	var subTotalConDcto = subTotal - dscto;
	var igv = subTotalConDcto * (ParametrosGenerales.IGV / 100);
	var total = subTotalConDcto + igv;
	
	subTotalFactura.val(convertirNumeroAMoneda(subTotal));
	dcto.val(convertirNumeroAMoneda(dscto));
	igvFactura.val(convertirNumeroAMoneda(igv));
	totalFactura.val(convertirNumeroAMoneda(total));
}

function generarPdf(event){
	var nroDocumento = codigo.html();
	var correo = email.val();
	var box = bootbox.dialog({
	    title: 'Enviar correo o descargar comrpobante de venta',
		message: $(".form-content").html().replace('formEmail', 'formEmailReal'),
		buttons: {
	        correo: {
	            label: '<i class="fas fa-at"></i> Enviar por correo',
	            className: Boton.SUCCESS,
	            callback: function(){
									
	                event.preventDefault();
					var form = $(".formEmailReal")
					
			        if (form[0].checkValidity() == false) {
						console.log("validado FALSE!!!....")
			            event.stopPropagation();
						
						box.find('.formEmailReal #emailPDF').addClass('input-validation-error');
						box.find('.formEmailReal #emailPDF').focus();
						box.find('.mensaje-validado-falso').show();
						return false;
			        }else{
						//event.stopPropagation();
						console.log("todo bien....send email....")
						var listaCorreos = $('.formEmailReal #emailPDF').val();
						var enviarCodigo = $('.formEmailReal #chkEnviarCodigo').is(':checked');
						console.log('listaCorreos-->' + listaCorreos);
						console.log('enviarCodigo-->' + enviarCodigo);
					
						enviarMailReporte(nroDocumento, listaCorreos, enviarCodigo);
					}
					form.addClass('was-validated');
	            }
	        },
	        descargar: {
	            label: '<i class="fas fa-download"></i> Descargar',
	            className: Boton.WARNING,
	            callback: function(){
	                console.log('boton descargar...');
					var enviarCodigo = $('.formEmailReal #chkEnviarCodigo').is(':checked');
					console.log('enviarCodigo-->' + enviarCodigo);
					descargarReporte(nroDocumento, enviarCodigo);	
	            }
	        }
	    }
	});
	
	box.on('shown.bs.modal',function(){
	  console.log("$$$on modal...")
		$('.formEmailReal #emailPDF').focus();
		//$('#emailPDF').focus();
		console.log("correo del cliente-->" + correo + "/ NRO DOC-->" + nroDocumento);
		$('.formEmailReal #emailPDF').val(correo);
	});
}

function enviarMailReporte(numeroDocumento, email, enviarCodigo){
    var objetoJson = {
		numeroDocumento		: numeroDocumento,
    	email				: email,
		enviarCodigo		: enviarCodigo
    };

	var entityJsonStr = JSON.stringify(objetoJson);
    console.log("entityJsonStr-->" + entityJsonStr);
    var formData = new FormData();
    formData.append('registro', new Blob([entityJsonStr], {
        type: "application/json"
    }));
	
	$.ajax({
        type:"Post",
        contentType: false,
        processData: false,
		url : '/appkahaxi/enviarEmailReporteFacturaVenta',
        xhrFields: {
            responseType: 'blob'
        },
        data : formData,
        beforeSend: function(xhr) {
        	loadding(true);
        },
        error: function (xhr, error, code){
        	mostrarMensajeError(xhr.responseText);
        	loadding(false);
        },
        success: function (result, status, xhr) {
            mostrarNotificacion("El correo se envió correctamente.", "success");
			loadding(false);                
        }
    });
}

function descargarReporte(numeroDocumento, enviarCodigo){
    $.ajax({
        type:"Post",
        url : '/appkahaxi/reporteFacturaVenta/' + numeroDocumento,
        xhrFields: {
            responseType: 'blob'
        },
        data : null,
        beforeSend: function(xhr) {
        	loadding(true);
        },
        error: function (xhr, error, code){
        	mostrarMensajeError(xhr.responseText);
        	loadding(false);
        },
        success: function (result, status, xhr) {
            if(result.size > 0){
                var filename = "nombre.pdf";
                var disposition = xhr.getResponseHeader('Content-Disposition');

                if (disposition) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, CADENA_VACIA);
                }
                var linkelem = document.createElement('a');
                try {
                    var blob = new Blob([result], { type: 'application/octet-stream' });
                    
                    if (typeof window.navigator.msSaveBlob !== 'undefined') {
                        //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                        window.navigator.msSaveBlob(blob, null);
                    } else {
                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (filename) {
                            // use HTML5 a[download] attribute to specify filename
                            var a = document.createElement("a");

                            // safari doesn't support this yet
                            if (typeof a.download === 'undefined') {
                                window.location = downloadUrl;
                            } else {
                                a.href = downloadUrl;
                                a.download = filename;
                                document.body.appendChild(a);
                                a.target = "_blank";
                                a.click();

                                window.onfocus = function () {
                                    document.body.removeChild(a);
                                    window.URL.revokeObjectURL(downloadUrl);
                                }
                            }
                        } else {
                            window.location = downloadUrl;
                        }
                    }
                    loadding(false);

                } catch (ex) {
                    
                }
            }
        }
    });
}

