var titulo;
var codigo;
var codigoCliente;
var nroDocReferencia;
var numeroDocumento;
var origenMnto;
var opcion;
var datoBuscar;
var nroGuiaRemision;
var nroOrdenVenta;
var nroCotizacion;
var nroRequerimiento;
var codRepuesto;
var fechaDesde;
var fechaHasta;
var estadoParam;
var volverParam;
var desdeDocRefParam;

var formGuiaRemision;
var formObservaciones;
var OVReferencia;
var documentoCli;
var nombreCli;
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

var guiasPorOrdenVentaModal;
var modalCodigoOrdenVenta;
var tableSeleccionGR;
var dataTableSeleccionGR;
var btnAceptarModal;

var btnIrFactura;
var facturasPorGuiaRemisionModal;
var modalCodigoGuiaRemision;
var tableSeleccionDocumento;
var dataTableSeleccionDocumento;
var chkDctoTotal;
var dctoTotal;
var dctoGRDiv;
var dcto;

var dateTimePickerInput;
var valorIGV;
var listaAlmacenModel;
var lblAnulado;
var flgGraba = 0;

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	titulo = $("#titulo");
	codigo = $("#codigo");
	codigoCliente = $("#codigoCliente");
	nroDocReferencia = $("#nroDocReferencia");
	numeroDocumento = $('#numeroDocumento');
	origenMnto = $('#origenMnto');
	opcion = $("#opcion");
	datoBuscar = $("#datoBuscar");
	nroGuiaRemision = $("#nroGuiaRemision");
	nroOrdenVenta = $("#nroOrdenVenta");
	nroCotizacion = $("#nroCotizacion");
	nroRequerimiento = $("#nroRequerimiento");
	codRepuesto = $("#codRepuesto");
	fechaDesde = $("#fechaDesde");
	fechaHasta = $("#fechaHasta");
	estadoParam = $("#estadoParam");
	volverParam = $("#volverParam");
	desdeDocRefParam = $("#desdeDocRefParam");

	formGuiaRemision = $("#formGuiaRemision");
	formObservaciones = $("#formObservaciones");
	OVReferencia = $("#OVReferencia");
	documentoCli = $("#documentoCli");
	nombreCli = $("#nombreCli");
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

	guiasPorOrdenVentaModal = $("#guiasPorOrdenVentaModal");
	modalCodigoOrdenVenta = $("#modalCodigoOrdenVenta");
	tableSeleccionGR = $("#tableSeleccionGR");
	btnAceptarModal = $("#btnAceptarModal");

	btnIrFactura = $("#btnIrFactura");

	facturasPorGuiaRemisionModal = $("#facturasPorGuiaRemisionModal");
	modalCodigoGuiaRemision = $("#modalCodigoGuiaRemision");
	tableSeleccionDocumento = $("#tableSeleccionDocumento");

	dateTimePickerInput = $(".datetimepicker-input");
	listaAlmacenModel = $("#listaAlmacenModel");
	lblAnulado = $("#lblAnulado");
	chkDctoTotal = $("#chkDctoTotal");
	dctoTotal = $("#dctoTotal");
	dctoGRDiv = $("#dctoGRDiv");
	dcto = $("#dcto");
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

	if (opcion.text() == Opcion.NUEVO) {
		console.log("siiii");
		inicializarTablaDetalle(true);
		cargarPantallaConDatosOrdenVenta();
	} else {
		console.log("noooooo");
		inicializarTablaDetalle(false);
		cargarPantallaConDatosGuiaRemision();
	}
}

function construirFechasPicker() {
	console.log("construirFechasPicker...")
	/* se construyen del último al primero para que funcionen con el botón "limpiar" */

	// La fecha de Recepción de la Guía de Remisión:
	// •	No puede ser mayor que la fecha actual.
	// •	No puede ser mayor que la fecha de contabilización
	// •	No puede ser menor que la fecha de Documento.
	fecRecepcion.datetimepicker({
		locale: 'es',
		format: 'L',
		ignoreReadonly: true,
		date: moment(),
		//minDate:	moment(),
		//maxDate:	moment(),
	});

	// La fecha de Documento de la Guía de Remisión:
	// •	No puede ser mayor que la fecha actual.
	// •	No puede ser mayor que la fecha de contabilización
	fecDocumento.datetimepicker({
		locale: 'es',
		format: 'L',
		ignoreReadonly: true,
		date: moment(),
		//maxDate:	moment(),
	});

	// La fecha de contabilización no puede ser mayor a la fecha actual	
	fecConta.datetimepicker({
		locale: 'es',
		format: 'L',
		ignoreReadonly: true,
		date: moment(),
		//maxDate:	moment(),
	});
}

function restringirSeleccionFechas() {

	fecDocumento.on("change.datetimepicker", function(e) {
		console.log("aaa");
		//reiniciarMinFechaEntrega();
		fecRecepcion.datetimepicker('minDate', e.date);
	});

	fecConta.on("change.datetimepicker", function(e) {
		//reiniciarMaxFechas();
		console.log("bbb");

		fecDocumento.datetimepicker('maxDate', e.date);
		fecRecepcion.datetimepicker('maxDate', e.date);
	});
}

function inicializarFechas() {
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

	$('#tableDetalle tbody').on('click', '.btn-delete', function() {
		if (indiceFilaDataTableDetalle == 0) {
			mostrarMensajeValidacion("No se puede eliminar el único item de la Guía de Remisión.");
		} else {
			mostrarDialogoEliminarFila(dataTableDetalle, $(this));
		}
	});

	$('.readonly').keydown(function(e) {
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
		mostrarModalGuiasPorOrdenVenta(event);
	});

	btnAnular.on("click", function(event) {
		if (observaciones.val().trim() == CADENA_VACIA) {
			controlRequerido(observaciones);
			habilitarControl(observaciones);
			mostrarMensajeValidacion("Debe ingresar observaciones antes de anular.", observaciones);
		} else {
			mostrarDialogoAnularGuiaRemision(event);
		}
	});

	btnVolver.on("click", function() {
		volver();
	});

	serie.on('click', function(event) {
		if (serie.val() > 0) {
			obtenerCorrelativo();
		} else {
			correlativo.val(CADENA_VACIA);
		}
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

		"responsive": false,
		"scrollCollapse": false,
		"ordering": false,
		"deferRender": true,
		"autoWidth": false,
		"paging": paginacion,
		/*"dom"           :   "<'row'<'col-sm-12'rt>>" +
			"<'row'<'col-sm-4 'l><'col-sm-8 'p>>",*/
		"dom": '<ip<rt>lp>',
		"lengthMenu": [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
		"fnRowCallback":
			function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				var index = iDisplayIndexFull + 1;
				$('td:eq(0)', nRow).html(index);
				return nRow;
			},
		"language": {
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

function cargarPantallaConDatosOrdenVenta() {
	console.log("cargarPantallaConDatosOrdenVenta..." + nroOrdenVenta.text());
	var nroDocReferenciaVal = nroOrdenVenta.text();
	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarOrdenVentaParaGuiaRemision/' + nroDocReferenciaVal,
		data: null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(result, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {
				console.log("result--->" + result);
				var data = JSON.parse(result);
				console.log("data--->" + data);
				cargarPantallaHTMLOrdenVenta(data);
				nuevaPantallaGuiaRemision();
			}

			loadding(false);
		},
		error: function(xhr, error, code) {

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function cargarPantallaHTMLOrdenVenta(data) {
	codigoCliente.val(data.codigoCliente);
	documentoCli.val(data.nroDocCliente);
	nombreCli.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);
	tipoMoneda.val(data.codigoTipoMoneda);
	motivoTraslado.val(MotivoTraslado.VENTA_NACIONAL);
	// se obtiene el tc del día
	obtenerTipoCambio(tipoCambio);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	dcto.val(convertirNumeroAMoneda(data.descuento));
	subTotalGR.val(data.subTotal);
	igvGR.val(data.igv);
	totalGR.val(data.total);

	if(data.porcDctoTotal != null){
		console.log("dentro del if...");
    	dctoTotal.val(data.porcDctoTotal);
    	//habilitarControl(dctoTotal);
    	checkControl(chkDctoTotal);
    	mostrarControl(dctoGRDiv);
    }


	if (data.codigoCondPago == CondicionPago.CREDITO) {
		mostrarControl(divDias);
	}

	cantidadDetalleDuplicado = data.detalle.length;
	console.log("cantidadDetalleDuplicado--->" + cantidadDetalleDuplicado);

	for (i = 0; i < cantidadDetalleDuplicado; i++) {
		var detalle = data.detalle[i];


		console.log("detalle.cantidad--->" + detalle.cantidad);
		console.log("detalle.cantidadPendiente--->" + detalle.cantidadPendiente);
		agregarFilaEnTablaDetalle(data);
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descCodigo_' + i).val(detalle.codEstandar);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidadPendiente);
		$('#cantidadPendiente_' + i).val(detalle.cantidadPendiente);
		$('#precioUnitario_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#precioUnitarioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
		$('#precioReferencia_' + i).val(convertirNumeroAMoneda(detalle.precioReferencia));
		$('#porcentajeDcto_' + i).val(detalle.porcentajeDcto);
		$('#precioConDcto_' + i).val(convertirNumeroAMoneda(detalle.precioConDcto));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
		$('#lineaReferencia_' + i).val(detalle.linea);

		calcularCantidadNuevaGuia(null, $('#cantidad_' + i), i);

	}
	dataTableDetalle.destroy();
	inicializarTablaDetalle(true);
}

function nuevaPantallaGuiaRemision() {
	titulo.text("NUEVA");

	controlNoRequerido(observaciones);
	deshabilitarControl(OVReferencia);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	mostrarControl(btnVolver);

	$("#tableDetalle tbody tr").find(".btn-delete").prop("disabled", false);

	serie.focus();
}

function cargarPantallaConDatosGuiaRemision() {
	console.log("ingresa");
	var nroDocReferenciaVal;
	
	if (flgGraba == 1){
		nroDocReferenciaVal = codigo.html();
	}else{
		nroDocReferenciaVal = numeroDocumento.text();
	}	

	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarGuiaRemisionVenta/' + nroDocReferenciaVal,
		data: null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(result, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTMLGuiaRemision(data);
				
				if (flgGraba == 0) {
					if (data.codigoCondPago == CondicionPago.CREDITO) {
						mostrarControl(divDias);
					}
					verPantallaGuiaRemision(data);
					dataTableDetalle.destroy();
					inicializarTablaDetalle(true);
				}

			}

			loadding(false);
		},
		error: function(xhr, error, code) {

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function cargarPantallaHTMLGuiaRemision(data) {
	serie.val(data.serie);
	correlativo.val(data.correlativo.padStart(CANT_CERO_CORRELATIVO, '0'));

	if (flgGraba == 0) {
		codigoCliente.val(data.codigoCliente);
		documentoCli.val(data.nroDocCliente);
		nombreCli.val(data.nombreCliente);
		direccion.val(data.direccionFiscal);
		direccionDespacho.val(data.direccionDespacho);
		personaContacto.val(data.personaContacto);
		tipoMoneda.val(data.codigoTipoMoneda);
		condPago.val(data.codigoCondPago);
		dias.val(data.codigoDias);

		motivoTraslado.val(data.codigoMotivoTraslado);
		tipoCambio.val(data.tipoCambio);
		subTotalGR.val(data.subTotal);
		igvGR.val(data.igv);
		totalGR.val(data.total);
		dcto.val(convertirNumeroAMoneda(data.descuento));

		if(data.porcDctoTotal != null){
			console.log("dentro del if...");
	    	dctoTotal.val(data.porcDctoTotal);
	    	//habilitarControl(dctoTotal);
	    	checkControl(chkDctoTotal);
	    	mostrarControl(dctoGRDiv);
	    }
		
		OVReferencia.val(data.ordenVenta);
		observaciones.val(data.observaciones);

		cantidadDetalleDuplicado = data.detalle.length;

		for (i = 0; i < cantidadDetalleDuplicado; i++) {

			agregarFilaEnTablaDetalle(data);

			var detalle = data.detalle[i];
			$('#codigo_' + i).val(detalle.codArticulo);
			$('#descCodigo_' + i).val(detalle.codEstandar);
			$('#descripcion_' + i).val(detalle.descripcionArticulo);
			$('#marca_' + i).val(detalle.marca);
			$('#cantidad_' + i).val(detalle.cantidad);
			$('#cantidadPendiente_' + i).val(detalle.cantidadPendiente);
			$('#precioUnitario_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
			$('#precioUnitarioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
			$('#precioReferencia_' + i).val(convertirNumeroAMoneda(detalle.precioReferencia));
			$('#porcentajeDcto_' + i).val(detalle.porcentajeDcto);
			$('#precioConDcto_' + i).val(convertirNumeroAMoneda(detalle.precioConDcto));
			$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
			$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));

		}
	}

}

function verPantallaGuiaRemision(data) {

	titulo.text("VER");

	var desdeDocRef = desdeDocRefParam.text();

	if (desdeDocRef == Respuesta.SI) {
		codigo.html(nroGuiaRemision.text());
	} else {
		codigo.html(numeroDocumento.text());
	}

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
	deshabilitarControl(observaciones);
	controlNoRequerido(observaciones);

	if (data.codigoEstado == EstadoGuiaRemision.GENERADO) {
		if (data.codigoEstadoProceso == EstadoProceso.ABIERTO) {
			// estado proceso ABIERTO
			mostrarControl(btnGenerarFactura);
			if (data.cantidadFacturasAsociadas > 0) {
				ocultarControl(btnAnular);
				mostrarControl(btnIrFactura);
			} else {
				mostrarControl(btnAnular);
				btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
				//habilitarControl(observaciones);
				ocultarControl(btnIrFactura);
			}

		} else {
			// estado proceso CERRADO
			ocultarControl(btnGenerarFactura);
			mostrarControl(btnIrFactura);
		}

	} else {
		// es ANULADO
		mostrarControl(lblAnulado);
	}

	var volver = volverParam.text();
	if (volver == Respuesta.SI) {
		mostrarControl(btnVolver);
	}

	ocultarControl(btnGrabar);
	btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');

	ocultarControl(btnLimpiar);

	deshabilitarDetalleGuiaRemision();
}

function deshabilitarDetalleGuiaRemision() {

	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

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

	if (tipoMonedaValor == Moneda.SOLES) {
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}

}

function agregarHTMLColumnasDataTable(data) {
	var row = tableDetalle.DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");

	var $tds = row.find("td").not(':first').not(':last');

	$.each($tds, function(i, el) {

		switch (i) {

			// CODIGO ART (OCULTO)
			case 0: $(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			// DESCRIPCION CODIGO ART
			case 1: $(this).html(CADENA_VACIA).append("<input class='marquee form-control codigo-det' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			// DESCRIPCION
			case 2: $(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// MARCA
			case 3: $(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// ALMACEN
			case 4: $(this).html(CADENA_VACIA).append(
				"<div>" +
				$(".almacen-hidden").html().replace('reemplazar', 'almacen_' + indiceFilaDataTableDetalle) +
				"</div>");
				if (data.detalle[indiceFilaDataTableDetalle].codAlmacen != UNDEFINED) {
					$('#almacen_' + indiceFilaDataTableDetalle).val(data.detalle[indiceFilaDataTableDetalle].codAlmacen);
				}
				break;

			// CANTIDAD
			case 5: $(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' " +
				"onchange='dispararEventosCambioCantidad(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);'" +
				"onkeydown='cantidadKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			// CANTIDAD PENDIENTE
			case 6: $(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='cantidadPendiente_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
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
			case 12: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			// SUBTOTAL C/IGV (OCULTO)
			case 13: $(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// LINEA REFERENCIA
			case 14: $(this).html(CADENA_VACIA).append("<input class='alineacion-derecha' type='text' id='lineaReferencia_" + indiceFilaDataTableDetalle + "'>");
				break;
		}
	});
	habilitarMarquee();
}

/**************** EVENTOS DETALLE *******************/

function dispararEventosCambioCantidad(control, fila) {
	var cantidad = Number(control.value);
	var cantidadPendiente = Number($('#cantidadPendiente_' + fila).val());
	console.log("cantidad-->" + cantidad);
	console.log("cantidadPendiente-->" + cantidadPendiente);

	if (cantidad > cantidadPendiente) {
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
	if (control1 == null) {
		cantidad = Number(control2.val());
	} else {
		cantidad = Number(control1.value);
	}

	var precio = Number($('#precioUnitario_' + fila).val());
	var subTotal = cantidad * precio;
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV / 100));

	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#cantidadPendiente_' + fila).val(cantidad);

	calcularResumenGuiaRemision();
}

function cantidadKeyDown(e, fila) {
	var key = window.Event ? e.which : e.keyCode;
	console.log("cantidadKeyDown, key-->" + key);
	// si es ENTER
	if (key == 13) {
		console.log("es ENTER");
		var nuevaFila = Number(fila) + 1;
		console.log("nuevaFila-->" + nuevaFila);
		console.log("indiceFilaDataTableDetalle-->" + indiceFilaDataTableDetalle);

		if (indiceFilaDataTableDetalle >= nuevaFila) {
			var nuevaFilaReal = nuevaFila;
			// iteramos mientras encontremos filas que se hayan eliminado
			while ($('#cantidad_' + nuevaFilaReal).val() == UNDEFINED) {
				nuevaFilaReal++;
			}
			// encontramos la sgte fila hábil
			$('#cantidad_' + nuevaFilaReal).select();
		}
	}
}

/**************** EVENTOS FORMULARIO *******************/

function grabarGuiaRemision() {

	if (formGuiaRemision[0].checkValidity() === true) {

		if (validarDetalleGuiaRemision()) {

			if (opcion.text() == Opcion.NUEVO) {
				registrarGuiaRemisionVenta();				
			}
		}
	} else {

		formGuiaRemision.addClass('was-validated');
	}
}

function validarDetalleGuiaRemision() {

	var cantidad;
	var flag = false;
	var exitEach = false;
	var exitIterator = false;

	// verificando que se hayan ingresado por lo menos un item al detalle de la Orden de Venta
	var contadorVacios = 0;
	// recorriendo todos los detalles
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			if ($($headers[cellIndex]).attr('id') == 'codArticulo') {

				if ($(this).find("input").val() == CADENA_VACIA || $(this).find("input").val() == UNDEFINED) {
					contadorVacios++;
				}
			}
		});
	});
	// si la cantidad de filas vacías es igual al contador de filas, mostrar mensaje
	if (indiceFilaDataTableDetalle == UNDEFINED || (contadorVacios == (indiceFilaDataTableDetalle + 1))) {
		mostrarMensajeValidacion("No se puede grabar una Guía de Remisión sin artículos.", null, '#buscarArticulo_' + indiceFilaDataTableDetalle);
		return false;
	}

	// verificando que no hayan detalles con cantidad y almacen vacíos
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		if (exitEach == true) {
			console.log("exirteach es true!");
			exitIterator = true;
			return false;
		}

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		flag = false;

		$cells.each(function(cellIndex) {
			// verificamos que estamos en una fila con código (es decir, con datos para validar)
			if ($($headers[cellIndex]).attr('id') == 'codArticulo') {

				if ($(this).find("input").val() != CADENA_VACIA && $(this).find("input").val() != UNDEFINED) {
					flag = true;
				}
			}

			// evaluamos la CANTIDAD				
			if ($($headers[cellIndex]).attr('id') == 'cantidad') {
				// siempre y cuando hayan datos (flag TRUE)
				if (flag == true) {
					cantidad = $(this).find("input").val();
					if (cantidad == CADENA_VACIA) {
						mostrarMensajeValidacion('Debe ingresar la cantidad.', $(this).find("input"));
						exitEach = true;
						console.log("cantidad es cadena vacia");
						return false;
					} else {
						var c = convertirMonedaANumero(cantidad);
						if (c == 0 || c < 0) {
							mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $(this).find("input"));
							exitEach = true;
							return false;
						}
					}
				}
			}
		});
	});

	if (exitEach == true || exitIterator == true) {
		console.log("exitEach||exititerator es true!");
		return false;
	} else {
		return true;
	}
}

function registrarGuiaRemisionVenta() {

	var correlativoInt = parseInt(correlativo.val(), 10);
	var nroDocumento = codigo.html();
	var serieVal = serie.val();
	var correlativoVal = correlativoInt;
	var codigoClienteVal = codigoCliente.val().trim();
	var dirDespachoVal = direccionDespacho.val().trim();
	var perContactoVal = personaContacto.val().trim();
	var ordenVenta = OVReferencia.val().trim();
	var fecContaVal = fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecDocumentoVal = fecDocumento.datetimepicker('date').format('YYYY-MM-DD');
	var fecEntregaVal = fecRecepcion.datetimepicker('date').format('YYYY-MM-DD');
	var tipoMonedaVal = tipoMoneda.val();
	var condPagoVal = condPago.val();
	var tipoCambioVal = tipoCambio.val();
	var codigoMotivoTraslado = motivoTraslado.val().trim();
	var observacionesVal = observaciones.val().trim();
	var subTotalVal = convertirMonedaANumero(subTotalGR.val().trim());
	var descuento = convertirMonedaANumero(dcto.val().trim() == '' ? '0' : dcto.val().trim());
	var igvVal = convertirMonedaANumero(igvGR.val());
	var totalVal = convertirMonedaANumero(totalGR.val().trim());
	var detalle = tableToJSON(tableDetalle);
	var diasVal = null;
	var porcDctoTotal = null;
	if (chkDctoTotal.is(':checked')) {
		porcDctoTotal = dctoTotal.val().trim();
	}
	

	if (condPagoVal == CondicionPago.CREDITO) {
		diasVal = dias.val();
	}

	console.log("detalle-------------->" + detalle);

	var objetoJson = {
		numeroDocumento: nroDocumento,
		serie: serieVal,
		correlativo: correlativoVal,
		codigoCliente: codigoClienteVal,
		direccionDespacho: dirDespachoVal,
		personaContacto: perContactoVal,
		ordenVenta: ordenVenta,
		fechaContabilizacion: fecContaVal,
		fechaDocumento: fecDocumentoVal,
		fechaEntrega: fecEntregaVal,
		codigoTipoMoneda: tipoMonedaVal,
		codigoCondPago: condPagoVal,
		codigoDias: diasVal,
		codigoMotivoTraslado: codigoMotivoTraslado,
		tipoCambio: tipoCambioVal,
		porcDctoTotal: porcDctoTotal,
		subTotal: subTotalVal,
		descuento: descuento,
		igv: igvVal,
		total: totalVal,
		observaciones: observacionesVal,
		detalle: detalle
	};

	var entityJsonStr = JSON.stringify(objetoJson);
	console.log("entityJsonStr-->" + entityJsonStr);

	var formData = new FormData();

	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));


	$.ajax({
		type: "POST",
		contentType: false,
		processData: false,
		url: '/appkahaxi/registrarGuiaRemisionVenta/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(resultado, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {
				flgGraba = 1;
				mostrarNotificacion("El registro fué grabado correctamente.", "success");
				codigo.html(resultado);
				deshabilitarControl(serie);
				deshabilitarControl(motivoTraslado);
				deshabilitarControl(observaciones);
				deshabilitarControl(dateTimePickerInput);
				deshabilitarControl(direccionDespacho);
				deshabilitarControl(personaContacto);
				mostrarControl(btnGenerarFactura);
				mostrarControl(btnAnular);
				btnAnular.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
				ocultarControl(btnGrabar);
				ocultarControl(btnLimpiar);
				deshabilitarDetalleGuiaRemision();	
				
				console.log("flgGraba:"+flgGraba);
				cargarPantallaConDatosGuiaRemision();	
						
			} else if (xhr.status == HttpStatus.Accepted) {
				mostrarMensajeValidacion(resultado);
			}

			loadding(false);
		},
		error: function(xhr, error, code) {
			console.log("bbbbb")
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function anularGuiaRemisionVenta() {

	var nroDocumento = codigo.html();
	var observacionesVal = observaciones.val().trim();

	var objetoJson = {
		numeroDocumento: nroDocumento,
		observaciones: observacionesVal
	};

	var entityJsonStr = JSON.stringify(objetoJson);

	var formData = new FormData();

	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));


	$.ajax({
		type: "POST",
		contentType: false,
		processData: false,
		url: '/appkahaxi/anularGuiaRemisionVenta/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(resultado, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {

				mostrarNotificacion("El registro fué actualizado correctamente.", "success");

				window.scrollTo(0, 0);
				mostrarControl(lblAnulado);
				ocultarControl(btnGenerarFactura);
				ocultarControl(btnIrFactura);
				ocultarControl(btnAnular);
				deshabilitarControl(observaciones);
			} else if (xhr.status == HttpStatus.Accepted) {
				mostrarMensajeValidacion(resultado);
			}

			loadding(false);
		},
		error: function(xhr, error, code) {

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function tableToJSON(dataTable) {
	var data = [];
	var $headers = dataTable.find("th").not(':first').not(':last');

	dataTable.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());

		$cells = node.find("td").not(':first').not(':last');

		data[index] = {};

		$cells.each(function(cellIndex) {

			if ($($headers[cellIndex]).attr('id') == 'codArticulo' && $(this).find("input").val() == CADENA_VACIA) {
				return false;
			} else {
				if ($($headers[cellIndex]).attr('id') == 'cantidad' || $($headers[cellIndex]).attr('id') == 'cantidadPendiente' ||
					$($headers[cellIndex]).attr('id') == 'precioUnitario' || $($headers[cellIndex]).attr('id') == 'precioUnitarioIgv' ||
					$($headers[cellIndex]).attr('id') == 'subTotalIgv' || $($headers[cellIndex]).attr('id') == 'subTotal') {
					data[index][$($headers[cellIndex]).attr('id')] = convertirMonedaANumero($(this).find("input").val());
				} else {

					var valor = $(this).find("input").val();
					// para el COMBO de almacén
					if (valor == null || valor == undefined) {
						valor = $(this).find("select").val();
					}

					data[index][$($headers[cellIndex]).attr('id')] = valor;
				}
			}
		});

	});

	return data;
}

function mostrarDialogoEliminarFila(table, row) {

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
		callback: function(result) {

			if (result == true) {
				table.row(row.closest('tr')).remove().draw();
				indiceFilaDataTableDetalle--;
				calcularResumenGuiaRemision();
			}
		}
	});
}

function mostrarDialogoAnularGuiaRemision(event) {

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
		callback: function(result) {
			if (result == true) {
				if (formObservaciones[0].checkValidity() == true) {
					anularGuiaRemisionVenta();
				} else {
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
		message: "¿Está seguro de generar la Factura?",
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
				mostrarModalGuiasPorOrdenVenta(event);
			}
		}
	});
}
*/
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
		callback: function(result) {

			if (result == true) {

				calcularCantidadNuevaGuia(control, null, fila)

			} else {

				var cantidadPendiente = Number($('#cantidadPendiente_' + fila).val());
				$('#cantidad_' + fila).val(cantidadPendiente);
				$('#cantidad_' + fila).focus();
			}
		}
	});
}

function mostrarModalGuiasPorOrdenVenta(event) {
	modalCodigoOrdenVenta.text(OVReferencia.val());
	obtenerDetalleGuiaPorOrdenVenta(event);
	mostrarModal(guiasPorOrdenVentaModal);
}

function mostrarModalFacturasPorGuia(event) {

	modalCodigoGuiaRemision.text(codigo.html());
	obtenerDetalleFacturasPorGuiaRemision(event);
}

function obtenerDetalleGuiaPorOrdenVenta(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($.fn.dataTable.isDataTable('#tableSeleccionGR')) {
		dataTableSeleccionGR.clear();
		dataTableSeleccionGR.ajax.reload(null, true);
	} else {
		dataTableSeleccionGR = tableSeleccionGR.DataTable({

			"ajax": {
				data: function(d) {
					d.codigoOrdenVenta = OVReferencia.val().trim();
				},
				url: '/appkahaxi/listarGuiaRemisionVentaPorOrdenVenta/',
				dataSrc: function(json) {
					console.log("listarGuiaRemisionVentaPorOrdenVenta...success");
					return json;
				},
				error: function(xhr, error, code) {

				}
			},
			"stateSave": true,
			"responsive": false,
			"scrollCollapse": false,
			"dom": '<ip<rt>lp>',
			"lengthMenu": [[10, 20, 30, 40, -1], [10, 20, 30, 40, "Todos"]],
			"deferRender": true,
			"autoWidth": false,
			"columnDefs": [
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
						function(data, type, row) {
							return convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [4],
					"data": "igv",
					"orderable": false,
					"render":
						function(data, type, row) {
							return convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [5],
					"data": "total",
					"orderable": false,
					"render":
						function(data, type, row) {
							return convertirNumeroAMoneda(data);
						}
				}
			],
			"fnRowCallback":
				function(row, data, iDisplayIndex, iDisplayIndexFull) {

					if (data.codigoTipoMoneda == Moneda.SOLES) {
						$('td:eq(3)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-sol');
					} else {
						$('td:eq(3)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-dolar');
					}

					// modificando el tamaño de los caracteres del listado
					return row;

				},

			"language": {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});

	}
}

function obtenerDetalleFacturasPorGuiaRemision(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($.fn.dataTable.isDataTable('#tableSeleccionDocumento')) {

		dataTableSeleccionDocumento.clear();
		dataTableSeleccionDocumento.ajax.reload(null, true);

	} else {

		dataTableSeleccionDocumento = tableSeleccionDocumento.DataTable({

			"ajax": {
				data: function(d) {
					d.codigoGuiaRemision = codigo.html().trim();
				},
				url: '/appkahaxi/listarFacturaVentaPorGuiaRemision/',
				dataSrc: function(json) {
					console.log("listarFacturaVentaPorGuiaRemision...success");
					mostrarModal(facturasPorGuiaRemisionModal);
					return json;
				},
				error: function(xhr, error, code) {
					mostrarMensajeValidacion(xhr.responseText);
				}
			},
			"stateSave": true,
			"responsive": false,
			"scrollCollapse": false,
			"dom": '<ip<rt>lp>',
			"lengthMenu": [[10, 20, 30, 40, -1], [10, 20, 30, 40, "Todos"]],
			"deferRender": true,
			"autoWidth": false,
			"columnDefs": [
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
						function(data, type, row) {
							return convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [5],
					"data": "igv",
					"orderable": false,
					"render":
						function(data, type, row) {
							return convertirNumeroAMoneda(data);
						}
				},
				{
					"width": "20px",
					"targets": [6],
					"data": "total",
					"orderable": false,
					"render":
						function(data, type, row) {
							return convertirNumeroAMoneda(data);
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
				function(row, data, iDisplayIndex, iDisplayIndexFull) {

					if (data.codigoTipoMoneda == Moneda.SOLES) {
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-sol');
						$('td:eq(6)', row).addClass('dt-body-right listado-symbol-sol');
					} else {
						$('td:eq(4)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(5)', row).addClass('dt-body-right listado-symbol-dolar');
						$('td:eq(6)', row).addClass('dt-body-right listado-symbol-dolar');
					}

					// modificando el tamaño de los caracteres del listado

					return row;

				},
			"language": {
				"url": "/appkahaxi/language/Spanish.json"
			}
		});

		$('#tableSeleccionDocumento tbody').on('click', 'tr', function() {
			var nTds = $('td', this);
			var numeroDocumento = $(nTds[0]).text();

			cargarFacturaAsociada(numeroDocumento, Opcion.VER);
		});
	}
}

function generarFacturaAsociada() {
	var data = [];
	var indice = 0;

	var cabeceras = tableSeleccionGR.find("th").not(':last');

	tableSeleccionGR.find("tbody tr").each(function(index) {

		var esSeleccionado = $(this).find("input").is(':checked');

		if (esSeleccionado) {

			$cells = $(this).find("td").not(':last');

			data[indice] = {};

			$cells.each(function(cellIndex) {

				var valor = $(this).text();
				data[indice][$(cabeceras[cellIndex]).attr('id')] = valor;
			});

			indice++;
		}

	});

	var guiasRemision = "";

	$.each(data, function(key, value) {
		guiasRemision += value.codigoGuiaRemision + ",";
	});

	guiasRemision = guiasRemision.slice(0, -1);

	var nroGr = codigo.html();
	var nroGrParam = nroGuiaRemision.text();
	var OvRef = OVReferencia.val();
	var dato = datoBuscar.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();
	var opcion = Opcion.NUEVO;

	//var params = "numeroDocumento=" + OCReferencia.val() + "&opcion=" + opcion + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&volver=0&desdeDocRef=&guias=" + guiasRemision;
	var params = "numeroDocumento=" + OvRef + "&opcion=" + opcion + "&datoBuscar=" + dato + "&fechaDesde=" + fecDesde +
		"&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + "&volver=" + Respuesta.SI + "&desdeDocRef=" + Respuesta.SI +
		"&nroGuiaRemision=" + nroGrParam + "&nroGr=" + nroGr + "&guias=" + guiasRemision + "&origenMnto=" + origenMnto.text();
	window.location.href = "/appkahaxi/nueva-factura-venta-asociada?" + params;

}

function volver() {
	var params;
	var dato = datoBuscar.text();
	var nroGR = nroGuiaRemision.text();
	var nroOV = nroOrdenVenta.text();// este debe ser el valor del campo a buscar en el filtro de oc en el mantenimiento de oc 
	var nroCoti = nroCotizacion.text();
	var nroReq = nroRequerimiento.text();
	var codRpto = codRepuesto.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();
	var nroDoc = OVReferencia.val(); //numeroDocumento.text(); // este debe ser la OC
	var desdeDocRef = desdeDocRefParam.text();

	if (desdeDocRef == Respuesta.SI) {
		alert("si")
		params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.VER + "&datoBuscar=" + dato + "&nroOrdenVenta=" + nroOV + 
			"&nroCotizacion=" + nroCoti + "&nroRequerimiento=" + nroReq + "&codRepuesto=" + codRpto +
			"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + 
			"&volver=" + Respuesta.SI + 
			"&desdeDocRef=" + Respuesta.NO + 
			"&origenMnto=" + origenMnto.text();
		window.location.href = "/appkahaxi/nueva-orden-venta?" + params;
	} else {
		console.log("else nroDoc:" + nroDoc);
		console.log("origenMnto:" + origenMnto.text());
		if (origenMnto.text() == Respuesta.NO) {
			params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.VER + "&datoBuscar=" + dato + "&nroOrdenVenta=" + nroOC + 
				"&nroCotizacion=" + nroCoti + "&nroRequerimiento=" + nroReq + "&codRepuesto=" + codRpto +
				"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + 
				"&volver=" + Respuesta.SI + 
				"&desdeDocRef=" + Respuesta.NO + 
				"&origenMnto=" + Respuesta.SI;
			window.location.href = "/appkahaxi/nueva-orden-venta?" + params;
		} else {
			params = "datoBuscar=" + dato + "&nroGuiaRemision=" + nroGR + "&nroOrdenVenta=" + nroOV + "&codRepuesto=" + codRpto +
				"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
			
			window.location.href = "/appkahaxi/mantenimiento-guia-remision-venta?" + params;
		}
	}
}

function cargarFacturaAsociada(numeroDocumento, opcion) {

	/*
	var params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=&fechaDesde=&fechaHasta=&estadoParam=&guias=&volver=" + Respuesta.NO;

	window.location.href = "/appkahaxi/nueva-factura-compra-asociada?" + params;
	*/
	console.log("cargar factura asociada--> nroDoc (GR origen)-->" + codigo.html());
	var params;
	var dato = datoBuscar.val();
	var nroGuiaRem = nroGuiaRemision.text();
	var nroOV = nroOrdenVenta.text();
	var codRpto = codRepuesto.val();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var est = estadoParam.val();
	// armando los parámetros
	//params = "numeroDocumento=" + codigo.html() + "&opcion=" + opcion + "&datoBuscar=" + dato +
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=" + dato +
		"&nroComprobantePago=" + numeroDocumento + "&nroOrdenVenta=" + nroOV + "&codRepuesto=" + codRpto +
		"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + est + "&volver=" + Respuesta.SI +
		"&desdeDocRef=" + Respuesta.SI + "&nroGuiaRemision=" + nroGuiaRem + "&nroGr=" + codigo.html() + "&guias=" +
		"&origenMnto=" + origenMnto.text();

	window.location.href = "/appkahaxi/nueva-factura-venta-asociada?" + params;

}

function limpiarGuiaRemision() {
	console.log("limpiarGuiaRemision...")
	//inicializarFechas();
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);
	motivoTraslado.val(MotivoTraslado.VENTA_NACIONAL);


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

function calcularResumenGuiaRemision() {

	var subTotal = 0;
	var dscto = 0;

	// 1. sumamos el campo subTotal de cada fila
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');
		$cells.each(function(cellIndex) {

			if ($($headers[cellIndex]).attr('id') == 'subTotal') {

				parcial = ($(this).find("input").val() != CADENA_VACIA && $(this).find("input").val() != UNDEFINED) ? $(this).find("input").val() : 0;
				//console.log("parcial-->" + parcial + "; i-->" + i + "; typeof-->" + (typeof parcial));
				if ((typeof parcial) == 'string') {
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

	// 3. hacemos los cáculos del IGV y TOTAL de la OC
	var subTotalConDcto = subTotal - dscto;
	var igv = subTotalConDcto * (ParametrosGenerales.IGV / 100);
	var total = subTotalConDcto + igv;

	subTotalGR.val(convertirNumeroAMoneda(subTotal));
	dcto.val(convertirNumeroAMoneda(dscto));
	igvGR.val(convertirNumeroAMoneda(igv));
	totalGR.val(convertirNumeroAMoneda(total));
}