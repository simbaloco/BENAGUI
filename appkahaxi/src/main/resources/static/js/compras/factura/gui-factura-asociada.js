var titulo;
var codigo;
var codigoProv;
var nroDocReferencia;
var opcion;
var campoBuscarFiltro;
var nroComprobantePagoFiltro;
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
var listaGRSeleccionadas;
var deListaCP;
var nroComprobantePagoOrigen;

var formFactura;
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
	codigoProv = $("#codigoProv");
	nroDocReferencia = $("#nroDocReferencia");
	opcion = $("#opcion");
	campoBuscarFiltro =  $("#campoBuscarFiltro");
	nroComprobantePagoFiltro =  $("#nroComprobantePagoFiltro");
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
	listaGRSeleccionadas =  $("#listaGRSeleccionadas");
	deListaCP =  $("#deListaCP");
	nroComprobantePagoOrigen =  $("#nroComprobantePagoOrigen");
		
	formFactura = $("#formFactura");
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
	dateTimePickerInput = $(".datetimepicker-input");
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
	/* se construyen del ??ltimo al primero para que funcionen con el bot??n "limpiar" */
	
	// La fecha de Vencimiento:
	// ???	No puede ser menor que la fecha de contabilizaci??n
	fecVencimiento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		//date:		moment(),
		//minDate:	moment()
	});
	
	// La fecha de Documento
	// ???	No puede ser mayor que la fecha de contabilizaci??n
	// ???	No puede ser mayor que la fecha actual.
	fecDocumento.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true,
		//date:		moment(),
		//maxDate:	moment()
	});

	// La fecha de contabilizaci??n no puede ser mayor a la fecha actual	
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
			mostrarMensajeValidacion("No se puede eliminar el ??nico item de la Factura.");
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
	var codigoOrdenCompra = nroOrdenCompraOrigen.text();
	var guias = listaGRSeleccionadas.text();
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
	codigoProv.val(data.codigoProv);
	documentoProv.val(data.nroDocProv);
	nombreProv.val(data.nombreProv);
	direccion.val(data.direccionFiscal);
	direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val((data.codigoDias==null || data.codigoDias == CADENA_VACIA) ? Dias._30 : data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	// se obtiene el tc del d??a
	obtenerTipoCambio(tipoCambio);
	//tipoCambio.val(data.tipoCambio);
	subTotalFactura.val(data.subTotal);
	igvFactura.val(data.igv);
	totalFactura.val(data.total);
	
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
			console.log("detalle.codArticulo-->" + detalle.codArticulo);
			console.log("detalle.codEstandar-->" + detalle.codEstandar);
			
			$('#codigo_' + indice).val(detalle.codArticulo);
			$('#descCodigo_' + indice).val(detalle.codEstandar);
			$('#descripcion_' + indice).val(detalle.descripcionArticulo);
			$('#marca_' + indice).val(detalle.marca);
			$('#cantidad_' + indice).val(detalle.cantidadPendienteGuiaRemision);
			//$('#cantidad_' + indice).data('val', detalle.cantidadPendienteGuiaRemision);
			$('#cantidad_' + indice).data('temporal', detalle.cantidadPendienteGuiaRemision);
			$('#precio_' + indice).val(detalle.precioUnitario);
			$('#precioIgv_' + indice).val(detalle.precioUnitarioIgv);
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

		deshabilitarControl(null, '#descCodigo_' + i);
		deshabilitarControl(null, '#almacen_' + i);
		habilitarControl(null, '#cantidad_' + i);
		deshabilitarControl(null, '#precio_' + i);
	}

	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", false);
	
	serie.focus();
}

function cargarPantallaConDatosFactura() {
	var nroDocReferenciaVal; 
	nroDocReferenciaVal = nroComprobantePagoOrigen.text();
	
	console.log("nroDocReferenciaVal-->" + nroDocReferenciaVal);
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
	OCReferencia.val(data.ordenCompra);
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
		$('#descCodigo_' + indice).val(detalle.codEstandar);
		$('#descripcion_' + indice).val(detalle.descripcionArticulo);
		$('#marca_' + indice).val(detalle.marca);
		$('#cantidad_' + indice).val(detalle.cantidad);
		$('#precio_' + indice).val(detalle.precioUnitario);
		$('#precioIgv_' + indice).val(detalle.precioUnitarioIgv);
		$('#subTotal_' + i).val(detalle.subTotal);
		$('#subTotalIgv_' + indice).val(detalle.subTotalIgv);		
		indice++;
	}
	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function verPantallaFactura(data) {
	titulo.text("VER");
	
	codigo.html(data.numeroDocumento);
	
	deshabilitarControl(direccionDespacho);
	deshabilitarControl(personaContacto);
	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecVencimiento.datetimepicker('date', moment(data.fechaEntrega));
	deshabilitarControl(dateTimePickerInput);
		
	if(data.codigoEstado == EstadoFactura.GENERADO){
		if(estadoPago.val() == EstadoPago.PAGADO) {
			deshabilitarControl(estadoPago);
			ocultarControl(btnAnular);
			deshabilitarControl(observaciones);
			controlNoRequerido(observaciones);
		} else {
			habilitarControl(estadoPago);
			mostrarControl(btnAnular);
			btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
		}
	}else{
		// si es ANULADO
		deshabilitarControl(estadoPago);
		ocultarControl(btnAnular);
		mostrarControl(lblAnulado);
		deshabilitarControl(observaciones);
		controlNoRequerido(observaciones);
	}	
	
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	deshabilitarControl(serie);
	deshabilitarControl(correlativo);

	// siempre se muestra el bot??n volver, ya que aqu?? se llega desde el listado de CP o desde una GR
	mostrarControl(btnVolver);
	
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

			// CODIGO ART (OCULTO)
			case 2:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
					break;
						
			// DESCRIPCION CODIGO ART
			case 3:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control codigo-det' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
					break;						
    		
			// DESCRIPCION ARTICULO
			case 4:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// MARCA
			case 5:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// ALMACEN
			case 6:	$(this).html(CADENA_VACIA).append(
					"<div>" + 
						$(".almacen-hidden").html().replace('reemplazar', 'almacen_' + indiceFilaDataTableDetalle) + 
					"</div>");
					$('#almacen_' + indiceFilaDataTableDetalle).val(data.detalle[indiceFilaDataTableDetalle].codAlmacen);
					break;

			// CANTIDAD
			case 7:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' onchange='dispararEventosCambioCantidad(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);'" +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			// PRECIO UNITARIO
			case 8:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha precio_table' type='text' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
			
			// PRECIO C/IGV
			case 9: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
			
			// SUBTOTAL
			case 10:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
				
			// SUBTOTAL C/IGV	 (OCULTO)
			case 11:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
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
	
	// si la cantidad de filas vac??as es igual al contador de filas, mostrar mensaje
	if(contadorVacios == (indiceFilaDataTableDetalle + 1)){
		mostrarMensajeValidacion("No se puede grabar una Factura sin art??culos.", null, '#buscarArticulo_' + indiceFilaDataTableDetalle);
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

function registrarFacturaCompra(){

	var nroDocumento  			= codigo.html();
	var ordenCompra  			= OCReferencia.val();
	var serieVal 				= serie.val();
	var correlativoVal 			= correlativo.val();
	var codigoProvVal  			= codigoProv.val().trim();
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
	
	var subTotalVal 			= convertirMonedaANumero(subTotalFactura.val().trim());
	var igvVal 					= convertirMonedaANumero(igvFactura.val());
	var totalVal 				= convertirMonedaANumero(totalFactura.val().trim());
	
	var detalle 				= tableToJSON(tableDetalle);
	var diasVal					= null;

	if(condPagoVal == CondicionPago.CREDITO) {
		diasVal					= dias.val();
	}

	var objetoJson = {

		numeroDocumento:		nroDocumento,
		ordenCompra:			ordenCompra,
		serie:					serieVal,
		correlativo:			correlativoVal,
		codigoProv:  			codigoProvVal,
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

				mostrarNotificacion("El registro fu?? grabado correctamente.", "success");

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
					habilitarControl(observaciones);
					mostrarControl(btnAnular);
					btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
					mostrarControl(btnVolver);
					ocultarControl(btnGrabar);
					ocultarControl(btnLimpiar);

					// si se grab?? con estado PENDIENTE, cambiar a opci??n = VER
					opcion.text(Opcion.VER);					
					deshabilitarDetalleFactura();

				} else {
					volver();
				}

			} else if(xhr.status == HttpStatus.Accepted){

				mostrarMensajeValidacion(resultado, serie);
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

				mostrarNotificacion("El registro fu?? actualizado correctamente.", "success");

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
				calcularResumenFactura();
			}
		}
	});
}

function mostrarDialogoRegistrarFacturaPagado() {

	bootbox.confirm({
		message: "??Est?? seguro que esta factura ya ha sido pagada?",
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
				registrarFacturaCompra();
			}
		}
	});
}

function mostrarDialogoAnularFactura(event) {

	bootbox.confirm({
		message: "Esta operaci??n es IRREVERSIBLE.</br>??Est?? seguro que desea anular la Factura?",
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
					anularFacturaCompra();
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
		message: "No se puede registrar una cantidad mayor a la de la Guia de Remisi??n de Referencia",
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

function volver(){
	var params;
	
	var dato		= campoBuscarFiltro.text();
	var nroFact 	= nroComprobantePagoFiltro.text();
	var nroGRem		= nroGuiaRemisionFiltro.text();
	var nroOC 		= nroOrdenCompraFiltro.text();
	var codRpto 	= codRepuestoFiltro.text();
	var fecDesde 	= fecDesdeFiltro.text();
	var fecHasta 	= fecHastaFiltro.text();
	var estParam	= estadoFiltro.text();
	var nroDoc		= nroGuiaRemisionOrigen.text();
	
	var listaOC		= deListaOC.text();
	var nroOCSelec	= nroOrdenCompraOrigen.text();
	var listaGR		= deListaGR.text();
	var listaCP		= deListaCP.text();	
	
	if(listaCP == Respuesta.SI){
		params = 
			"campoBuscarFiltro=" + dato +
			"&nroComprobantePagoFiltro=" + nroFact + 
			"&nroOrdenCompraFiltro=" + nroOC + 
			"&codRepuestoFiltro=" + codRpto +
			"&fecDesdeFiltro=" + fecDesde + 
			"&fecHastaFiltro=" + fecHasta + 
			"&estadoFiltro=" + estParam;
			
		window.location.href = "/appkahaxi/mantenimiento-factura-compra?" + params;
	}else{
		params = 
			"campoBuscarFiltro=" + dato +
			"&nroGuiaRemisionFiltro=" + nroGRem +
			"&nroOrdenCompraFiltro=" + nroOC + 
			"&codRepuestoFiltro=" + codRpto +
			"&fecDesdeFiltro=" + fecDesde + 
			"&fecHastaFiltro=" + fecHasta + 
			"&estadoFiltro=" + estParam +
			 
			"&deListaOC=" + listaOC +
			"&nroOrdenCompraOrigen=" + nroOCSelec +
			
			"&deListaGR=" + listaGR +
			"&nroGuiaRemisionOrigen=" + nroDoc +
			
			"&opcion=" + Opcion.VER;
		
		window.location.href = "/appkahaxi/cargar-guia-remision-compra?" + params;
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