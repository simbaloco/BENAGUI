var indiceFilaDataTableDetalle = -1;
//**************************************************************** */
var cantidadDetalleDuplicado;
var codigoCliente;
var email;
var opcion;
var datoBuscar;
var nroOrdenVenta;
var codRepuesto;
var fechaDesde;
var fechaHasta;
var estadoParam;
var volverParam;
var desdeDocRefParam;
var origenMnto;

var titulo;
var codigo;
var nroDocReferencia;
var nroCotiReferencia;
var numeroDocumento;
var opcion;
var flagEnvio;

var formOrdenVenta;
var formObservaciones;
var campoBuscar;
var documentoCli;
var nombreCli;
var direccion;
var direccionDespacho;
var personaContacto;
var fecConta;
var fecHasta;
var tipoMoneda;
var condPago;
var dias;
var lblDias;
var estado;
var chkDctoTotal;
var dctoTotal;
var fecEntrega;
var tipoCambio;
var nroPedido;
var cotizacionSap;
var lblPedido;
var referenciaDiv;
var cotizacionDiv;
var nroDocReferenciaVer;

var divMensajeEliminado;
var btnIrGuiaRemision;
var btnGenerarGuiaRemision;
var btnLimpiar;
var btnVolver;
var btnNuevo;
var btnAgregarArticulo;

var tableDetalle;
var tableNuevoDetalle;

var observaciones;
var subTotalOV;
var dctoOVDiv;
var dctoOV;
var igvOV;
var totalOV;

var btnGrabar;
var btnDuplicar;
var btnPdf;

var dataTableDetalle;
var indiceFilaDataTableDetalle;

//var guiasPorOrdenCompraModal;
//var modalCodigoOrdenCompra;
var tableSeleccionDocumento;
var dataTableDetalleGuias;

var dateTimePickerInput;
var lblAnulado;
var flgNuevo;

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	opcion = $("#opcion");
	datoBuscar = $("#datoBuscar");
	email = $("#email");
	nroOrdenVenta = $("#nroOrdenVenta");
	codRepuesto = $("#codRepuesto");
	fechaDesde = $("#fechaDesde");
	fechaHasta = $("#fechaHasta");
	estadoParam = $("#estadoParam");
	volverParam = $("#volverParam");
	desdeDocRefParam = $("#desdeDocRefParam");
	origenMnto = $('#origenMnto');

	titulo = $("#titulo");
	codigo = $("#codigo");
	codigoCliente = $("#codigoCliente");
	nroDocReferencia = $("#nroDocReferencia");
	nroCotiReferencia = $("#nroCotiReferencia");
	numeroDocumento = $('#numeroDocumento');
	opcion = $("#opcion");
	flagEnvio = $("#flagEnvio");

	formOrdenVenta = $("#formOrdenVenta");
	formObservaciones = $("#formObservaciones");
	campoBuscar = $("#campoBuscar");
	documentoCli = $("#documentoCli");
	nombreCli = $("#nombreCli");
	direccion = $("#direccion");
	direccionDespacho = $("#direccionDespacho");
	personaContacto = $("#personaContacto");
	fecConta = $("#fecConta");
	fecHasta = $("#fecHasta");
	tipoMoneda = $("#tipoMoneda");
	condPago = $("#condPago");
	dias = $("#dias");
	lblDias = $("#lblDias");
	estado = $("#estado");
	chkDctoTotal = $("#chkDctoTotal");
	dctoTotal = $("#dctoTotal");
	fecEntrega = $("#fecEntrega");
	tipoCambio = $("#tipoCambio");
	referenciaDiv = $("#referenciaDiv");
	cotizacionDiv = $("#cotizacionDiv");
	nroDocReferenciaVer = $("#nroDocReferenciaVer");

	lblPedido = $("#lblPedido");
	divMensajeEliminado = $("#divMensajeEliminado");
	btnIrGuiaRemision = $("#btnIrGuiaRemision");
	btnGenerarGuiaRemision = $("#btnGenerarGuiaRemision");
	btnLimpiar = $("#btnLimpiar");
	btnVolver = $("#btnVolver");
	btnNuevo = $('#btnNuevo');
	btnAgregarArticulo = $('btnAgregarArticulo'); 
	
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalOV = $("#subTotalOV");
	dctoOVDiv = $("#dctoOVDiv");
	dctoOV = $("#dctoOV");
	igvOV = $("#igvOV");
	totalOV = $("#totalOV");

	btnGrabar = $("#btnGrabar");
	btnDuplicar = $("#btnDuplicar");
	btnPdf = $("#btnPdf");

	/*guiasPorOrdenCompraModal = $("#guiasPorOrdenCompraModal");
	modalCodigoOrdenCompra = $("#modalCodigoOrdenCompra");*/
	tableSeleccionDocumento = $("#tableSeleccionDocumento");
	btnAceptarModal = $("#btnAceptarModal");

	dateTimePickerInput = $(".datetimepicker-input");
	lblAnulado = $("#lblAnulado");
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	habilitarMarquee();
	//habilitarAutocompletarBuscarCampos();

	construirFechasPicker();
	inicializarFechas();
	restringirSeleccionFechas();
	
	inicializarEventos();
}

function inicializarPantalla() {
	console.log("entra aqui");
	if (opcion.text() == Opcion.NUEVO) {
		inicializarTabla(true);
		cargarPantallaConDatosCotizacion();
	} else {
		inicializarTabla(false);
		cargarPantallaConDatosOrdenVenta();
	}
}

function construirFechasPicker() {
	/* se construyen del último al primero para que funcionen con el botón "limpiar" */
	
	// La fecha de Entrega  no puede ser menor que la fecha de contabilización
	fecEntrega.datetimepicker({
		locale: 'es',
		format: 'L',
		ignoreReadonly: true,
		//date:		moment(),
		//minDate:	moment()
	});
	
	// La fecha Válido hasta no puede ser menor que la fecha de contabilización
	fecHasta.datetimepicker({
		locale: 'es',
		format: 'L',
		ignoreReadonly: true,
		date:		moment().add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'),
		//maxDate:	moment().add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'),
		//minDate:	moment()
	});
	
	// La fecha de contabilización no puede ser mayor a la fecha actual	
	fecConta.datetimepicker({
		locale: 'es',
		format: 'L',
		ignoreReadonly: true,
		//date:		moment(),
		//maxDate:	moment()
	});
	
	
}

function restringirSeleccionFechas() {

	fecConta.on("change.datetimepicker", function(e) {
		//reiniciarFechaHasta();
		console.log("xxx")

		fecHasta.datetimepicker('maxDate', moment(e.date).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'));
		fecHasta.datetimepicker('minDate', e.date);
		//fecHasta.datetimepicker('date', moment(e.date).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'));

		fecEntrega.datetimepicker('minDate', e.date);
	});
}

function inicializarFechas(){
	console.log("inicializarFechas...")
	fecConta.datetimepicker('date', moment());
	fecEntrega.datetimepicker('date', moment());
	
	fecEntrega.datetimepicker('minDate', moment());
	fecHasta.datetimepicker('minDate', moment());
	
	fecConta.datetimepicker('maxDate', moment());
	fecHasta.datetimepicker('maxDate', moment().add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'));
	
	fecHasta.datetimepicker('date', moment().add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'));
	
}



function inicializarEventos() {
	btnAgregarArticulo.on("click", function() {
		agregarFilaEnTablaDetalle();
	});

	$('.readonly').keydown(function(e) {
		e.preventDefault();
	});

	$('.sinCaracteresEspeciales').keypress(function(e) {
		return sinCaracteresEspeciales(e);
	});

	btnGrabar.on("click", function(e) {
		grabarOrdenVenta(e);
	});

	/*btnDuplicar.on("click", function() {
		duplicarPantallaOrdenCompra(numeroDocumento.text());
	});*/

	btnLimpiar.on("click", function() {
		limpiarOrdenVenta();
	});

	btnIrGuiaRemision.on("click", function(event) {
		//mostrarModalGuiasPorOrdenCompra(event);
	});

	btnGenerarGuiaRemision.on("click", function() {
		mostrarDialogoGenerarGuiaRemision();
	});

	btnNuevo.click(function() {
		nuevaOrdenVenta();
	});

	btnVolver.on("click", function() {
		volver();
	});

	btnPdf.click(function(e) {
		generarPdf(e);
	});

	condPago.on('change', function() {
		evaluarCambioCondicionPago();
	});

	estado.on('change', function() {
		evaluarCambioEstado();
	});

}

function inicializarTabla(paginacion) {

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
function cargarPantallaConDatosCotizacion() {
	console.log("cargarPantallaConDatosCotizacion...");
	var nroCotiReferenciaVal = numeroDocumento.text();
	flgNuevo = 1;

	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarCotizacionParaOrdenVenta/' + nroCotiReferenciaVal,
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
				cargarPantallaHTMLCotizacion(data);
				nuevaPantallaOrdenVenta();
			}

			loadding(false);
		},
		error: function(xhr, error, code) {

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function cargarPantallaHTMLCotizacion(data) {

	direccionDespacho.find('option').not(':first').remove();
	personaContacto.find('option').not(':first').remove();

	let dirDespachoArray = data.direccionDespachoConcat.split('|');
	let perContactoArray = data.personaContactoConcat.split('|');
	llenarCombosDirDespachoPerContacto(dirDespachoArray, perContactoArray, data.codDireccionDespacho, data.codPersonaContacto);
	
	nroCotiReferencia.val(numeroDocumento.text());
	codigoCliente.val(data.codigoCliente);
	documentoCli.val(data.nroDocCliente);
	nombreCli.val(data.nombreCliente);
	direccion.val(data.direccionFiscal);
	/*direccionDespacho.val(data.direccionDespacho);
	personaContacto.val(data.personaContacto);*/
	tipoMoneda.val(data.codigoTipoMoneda);
	// se obtiene el tc del día
	obtenerTipoCambio(tipoCambio);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	subTotalOV.val(data.subTotal);
	igvOV.val(data.igv);
	totalOV.val(data.total);

	/*if(data.codigoCondPago == CondicionPago.CREDITO) {
		mostrarControl(divDias);
	}*/
	evaluarCambioCondicionPago();

	cantidadDetalleDuplicado = data.detalle.length;
	console.log("cantidadDetalleDuplicado--->" + cantidadDetalleDuplicado);
	for (i = 0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];

		agregarFilaEnTablaDetalle(data);
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descCodigo_' + i).val(detalle.codEstandar);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidad);

		var precio = convertirNumeroAMoneda(detalle.precioUnitario);
		var precioIgv = convertirNumeroAMoneda(detalle.precioUnitarioIgv);
		$('#precio_' + i).val(precio);
		$('#precioIgv_' + i).val(precioIgv);
		$('#precioRef_' + i).val(convertirNumeroAMoneda(detalle.precioReferencia));
		$('#porcDcto_' + i).val(detalle.porcentajeDcto);
		$('#precioDcto_' + i).val(convertirNumeroAMoneda(detalle.precioConDcto));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
	}

	dataTableDetalle.destroy();
	inicializarTabla(true);
}

function nuevaPantallaOrdenVenta() {
	titulo.text("NUEVA");

	controlNoRequerido(observaciones);
	mostrarControl(cotizacionDiv);
	deshabilitarControl(nroDocReferencia);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(tipoCambio);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	habilitarControl(estado);
	
	mostrarControl(btnVolver);
	mostrarControl(btnDuplicar);

	direccionDespacho.focus();
}


function cargarPantallaConDatos() {
	flgNuevo=0;
	var nroDocReferenciaVal = numeroDocumento.text();

	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarOrdenCompra/' + nroDocReferenciaVal,
		data: null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},

		success: function(result, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {

				var data = JSON.parse(result);

				cargarPantallaHTML(data);

				if (opcion.text() == Opcion.VER || opcion.text() == Opcion.MODIFICAR) {

					verPantallaOrdenCompra(data);
				} else {
					duplicarPantallaOrdenCompra(nroDocReferenciaVal);
				}

				dataTableDetalle.destroy();
				inicializarTabla(true);
			}

			loadding(false);
			window.scrollTo(0, 0);
		},
		error: function(xhr, error, code) {

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

	mostrarControl(btnVolver);
}

function cargarPantallaHTML(data) {
	// ****** CABECERA
	codigoProveedor.val(data.codigoProv);
	documentoProv.val(data.nroDocProv);
	nombreProv.val(data.nombreProv);
	direccion.val(data.direccionFiscal);
	
	//direccionDespacho.val(data.direccionDespacho);
	//personaContacto.val(data.personaContacto);	
	let dirDespachoArray = data.direccionDespachoConcat.split('|');
	let perContactoArray = data.personaContactoConcat.split('|');
	llenarCombosDirDespachoPerContacto(dirDespachoArray, perContactoArray, data.codDireccionDespacho, data.codPersonaContacto);
		
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	estado.val(data.codigoEstado);
	email.val(data.email);
	flagEnvio.val(data.flagEnvio);
	
	subTotalOC.val(convertirNumeroAMoneda(data.subTotal));
	igvOC.val(convertirNumeroAMoneda(data.igv));
	totalOC.val(convertirNumeroAMoneda(data.total));

	tipoCambio.val(data.tipoCambio);
	tipoCambioSave.val(data.tipoCambio);
	observaciones.val(data.observaciones);
	nroPedido.val(data.nroPedido);
	cotizacionSap.val(data.cotizacionSap);
	
	// evaluando si tiene documento de referencia
	if (data.numeroDocumentoRef != CADENA_VACIA) {
		nroDocReferencia.val(data.numeroDocumentoRef);
		mostrarControl(referenciaDiv);
	}

	if (data.codigoCondPago == CondicionPago.CREDITO) {
		mostrarControl(dias);
		mostrarControl(lblDias);		
	}

	// ******* DETALLE
	cantidadDetalleDuplicado = data.detalle.length;

	for (i = 0; i < cantidadDetalleDuplicado; i++) {

		var detalle = data.detalle[i];
		btnAgregarArticulo.click();
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descCodigo_' + i).val(detalle.codEstandar);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidad);

		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#precioIgv_' + i).val(convertirNumeroAMoneda(detalle.precioUnitarioIgv));
				
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
	}
}

function verPantallaOrdenCompra(data) {
	// ****** CABECERA
	codigo.html(numeroDocumento.text());
	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecHasta.datetimepicker('date', moment(data.fechaValidoHasta));
	fecEntrega.datetimepicker('date', data.fechaEntrega != null ? moment(data.fechaEntrega) : data.fechaEntrega);

	deshabilitarControl(campoBuscar);
	controlNoRequerido(observaciones);			
	ocultarControl(btnNuevo);
	mostrarControl(btnPdf);
	//ocultarControl(btnLimpiar);
	if (data.codigoCondPago == CondicionPago.CREDITO) {
		mostrarControl(dias);
		mostrarControl(lblDias);		
	}else{
		ocultarControl(dias);
		ocultarControl(lblDias);
	}

	mostrarControl(lblPedido);
	mostrarControl(nroPedido);
		
	if (opcion.text() == Opcion.VER) {
		titulo.text("VER");
		deshabilitarControl(direccionDespacho);
		deshabilitarControl(personaContacto);
		deshabilitarControl(dateTimePickerInput);
		deshabilitarControl(tipoMoneda);
		deshabilitarControl(condPago);
		deshabilitarControl(dias);
		
		deshabilitarControl(estado);
		deshabilitarControl(tipoCambio);
		//mostrarControl(divNroPedido);
		deshabilitarControl(nroPedido);
		deshabilitarControl(cotizacionSap);
		deshabilitarControl(observaciones);
		
		ocultarControl(btnGrabar);
		ocultarControl(btnLimpiar);
		btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
		
		ocultarControl(btnAgregarArticulo);
		ocultarControl(btnEliminarTodosArticulos);
		deshabilitarDetalleOrdenCompra();
		mostrarControl(btnDuplicar);
		
		mostrarControl(btnGenerarGuiaRemision);
		mostrarControl(btnIrGuiaRemision);

		if (data.codigoEstadoProceso == EstadoProceso.ABIERTO) {
			// estado proceso ABIERTO
			habilitarControl(btnGenerarGuiaRemision);
			if (data.cantidadGrAsociadas > 0) {
				mostrarControl(btnIrGuiaRemision);
			} else {
				ocultarControl(btnIrGuiaRemision);
			}
		} else {
			// estado proceso CERRADO
			ocultarControl(btnGenerarGuiaRemision);
			mostrarControl(btnIrGuiaRemision);
		}
		
		if (data.codigoEstado == EstadoDocumentoInicial.RECHAZADO) {
			ocultarControl(btnGenerarGuiaRemision);
			ocultarControl(btnIrGuiaRemision);
			mostrarControl(lblAnulado);
		}
		
		//habilitarControl(estado);
		/*
		if (data.codigoEstado == EstadoDocumentoInicial.RECHAZADO) {
			//deshabilitarControl(estado);
			controlRequerido(observaciones);
			mostrarControl(lblAnulado);
		} else if (data.codigoEstado == EstadoDocumentoInicial.APROBADO) {
			//habilitarControl(estado);
			mostrarControl(btnGenerarGuiaRemision);
			mostrarControl(btnIrGuiaRemision);

			if (data.codigoEstadoProceso == EstadoProceso.ABIERTO) {
				// estado proceso ABIERTO
				habilitarControl(btnGenerarGuiaRemision);
				if (data.cantidadGrAsociadas > 0) {
					mostrarControl(btnIrGuiaRemision);
				} else {
					ocultarControl(btnIrGuiaRemision);
				}
			} else {
				// estado proceso CERRADO
				ocultarControl(btnGenerarGuiaRemision);
				mostrarControl(btnIrGuiaRemision);
			}
		}
		*/
	}else if (opcion.text() == Opcion.MODIFICAR) {
		titulo.text("MODIFICAR");
				
		if (data.codigoEstado == EstadoDocumentoInicial.POR_APROBAR) {
			
			fecConta.datetimepicker('maxDate', moment());			
			habilitarControl(direccionDespacho);
			habilitarControl(personaContacto);			
			habilitarControl(dateTimePickerInput);
			habilitarControl(tipoMoneda);
			habilitarControl(condPago);
			habilitarControl(dias);
			habilitarControl(tipoCambio);
			habilitarControl(estado);
			habilitarControl(cotizacionSap);
			
			estado.focus();
			mostrarControl(btnGrabar);
			mostrarControl(btnDuplicar);
			mostrarControl(btnAgregarArticulo);
			mostrarControl(btnEliminarTodosArticulos);
			habilitarDetalleOrdenCompra();
		} else {
			// estado APROBADO O RECHAZADO
			deshabilitarControl(direccionDespacho);
			deshabilitarControl(personaContacto);			
			deshabilitarControl(dateTimePickerInput);
			deshabilitarControl(tipoMoneda);
			deshabilitarControl(condPago);
			deshabilitarControl(dias);
			deshabilitarControl(tipoCambio);
			deshabilitarControl(estado);
			deshabilitarControl(cotizacionSap);
			deshabilitarControl(observaciones);
			mostrarControl(btnDuplicar);
			mostrarControl(btnGenerarGuiaRemision);
			mostrarControl(btnIrGuiaRemision);
			deshabilitarDetalleOrdenCompra();
			ocultarControl(btnAgregarArticulo);
			ocultarControl(btnGrabar);
			ocultarControl(btnEliminarTodosArticulos);
			
			if (data.codigoEstado == EstadoDocumentoInicial.APROBADO) {
			
				if (data.codigoEstadoProceso == EstadoProceso.ABIERTO) {
					// estado proceso ABIERTO
					habilitarControl(btnGenerarGuiaRemision);
					if (data.cantidadGrAsociadas > 0) {
						mostrarControl(btnIrGuiaRemision);
					} else {
						ocultarControl(btnIrGuiaRemision);
					}
				} else {
					// estado proceso CERRADO
					ocultarControl(btnGenerarGuiaRemision);
					mostrarControl(btnIrGuiaRemision);
				}
			}else{
				ocultarControl(btnGenerarGuiaRemision);
				ocultarControl(btnIrGuiaRemision);				
			}
				
		}
	}


	/*if (data.codigoEstado == EstadoDocumentoInicial.POR_APROBAR) {
		habilitarControl(estado);
		mostrarControl(btnDuplicar);
		estado.focus();
	} else if (data.codigoEstado == EstadoDocumentoInicial.RECHAZADO) {
		deshabilitarControl(estado);
		mostrarControl(btnDuplicar);
		mostrarControl(lblAnulado);
	} else {
		// estado APROBADO
		deshabilitarControl(estado);
		mostrarControl(btnDuplicar);
		mostrarControl(btnGenerarGuiaRemision);
		mostrarControl(btnIrGuiaRemision);

		if (data.codigoEstadoProceso == EstadoProceso.ABIERTO) {
			// estado proceso ABIERTO
			habilitarControl(btnGenerarGuiaRemision);
			if (data.cantidadGrAsociadas > 0) {
				mostrarControl(btnIrGuiaRemision);
			} else {
				ocultarControl(btnIrGuiaRemision);
			}
		} else {
			// estado proceso CERRADO
			ocultarControl(btnGenerarGuiaRemision);
			mostrarControl(btnIrGuiaRemision);
		}
	}*/

	
}

function duplicarPantallaOrdenCompra(nroDocRef) {
	console.log("duplicarPantallaOrdenCompra....");
	// ****** CABECERA
	flgNuevo = 1;
	titulo.text("DUPLICAR");
	
	//inicializarFechaContaHasta();
	opcion.text(Opcion.DUPLICAR);	
	//obtenerTipoCambio(tipoCambio);
	codigo.html(CADENA_VACIA);

	nroDocReferencia.val(nroDocRef);
	mostrarControl(referenciaDiv);
	//ocultarControl(divNroPedido);
	ocultarControl(lblPedido);
	ocultarControl(nroPedido);
	nroPedido.val(CADENA_VACIA);
	estado.val(EstadoDocumentoInicial.POR_APROBAR);

	//observaciones.val(CADENA_VACIA);
	controlNoRequerido(observaciones);	
	habilitarControl(direccionDespacho);
	habilitarControl(personaContacto);	
	habilitarControl(dateTimePickerInput);
	habilitarControl(tipoMoneda);
	habilitarControl(condPago);
	habilitarControl(cotizacionSap);
	habilitarControl(dias);
	deshabilitarControl(estado);
	habilitarControl(observaciones);
	habilitarControl(campoBuscar);
	habilitarControl(tipoCambio);

	mostrarControl(btnGrabar);
	mostrarControl(btnAgregarArticulo);
	mostrarControl(btnEliminarTodosArticulos);
	mostrarControl(btnLimpiar);

	ocultarControl(btnDuplicar);
	ocultarControl(btnNuevo);
	ocultarControl(btnGenerarGuiaRemision);
	ocultarControl(btnIrGuiaRemision);
	ocultarControl(lblAnulado);
	ocultarControl(btnPdf);

	// ******* DETALLE - Recuperando la cantidad pendiente (para el caso de las OC cerradas y con cant pendiente = 0)
	var cantidadSalvada;
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			if ($($headers[cellIndex]).attr('id') == 'cantidad') {
				cantidadSalvada = $(this).find("input").val();
			}
			if ($($headers[cellIndex]).attr('id') == 'cantidadPendiente') {
				$(this).find("input").val(cantidadSalvada);
			}
		});
	});

	habilitarDetalleOrdenCompra();
	campoBuscar.focus();
}

function deshabilitarDetalleOrdenVenta() {

	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');

		$cells.each(function(cellIndex) {
			habilitarControlSoloLectura($(this).find(".buscar-det"));
			habilitarControlSoloLectura($(this).find(".cantidad-det"));
			habilitarControlSoloLectura($(this).find(".precio-det"));
			
		});
	});
}

function agregarFilaEnTablaDetalle() {
	var filaHTML = tableNuevoDetalle.find("tr")[0].outerHTML;

	var fila = dataTableDetalle.row.add($(filaHTML)).draw(false);

	indiceFilaDataTableDetalle = fila.index();
	console.log("al agregar fila, indiceFilaDataTableDetalle-->" + indiceFilaDataTableDetalle);

	agregarFilaHTMLEnTablaDetalle();
	
}

function agregarFilaHTMLEnTablaDetalle() {
	agregarHTMLColumnasDataTable();

	var tipoMonedaValor = tipoMoneda.val();

	if (tipoMonedaValor == Moneda.SOLES) {
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}

	$('#buscarArticulo_' + indiceFilaDataTableDetalle).focus();
}

function agregarHTMLColumnasDataTable() {
	var row = $('#tableDetalle').DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");
	var $tds = row.find("td").not(':first');

	$.each($tds, function(i, el) {

		switch (i) {

			// CODIGO ART (OCULTO)
			case 0: $(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			// DESCRIPCION CODIGO ART
			case 1: $(this).html(CADENA_VACIA).append("<input class='marquee form-control codigo-det' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			// DESCRIPCION ART
			case 2: $(this).html(CADENA_VACIA).append("<input class='marquee form-control desc-det' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			// MARCA ART
			case 3: $(this).html(CADENA_VACIA).append("<input class='marquee form-control marca-det' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			// CANTIDAD
			case 4: $(this).html(CADENA_VACIA).append(
				"<input class='form-control cantidad-det alineacion-derecha' type='text' maxlength='4' " +
				"id='cantidad_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
				break;

			/*// CANTIDAD PENDIENTE
			case 6: $(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha' type='text' id='cantidadPend_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;
			
			// PRECIO
			case 7: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha precio-det' type='number' maxlength='13' " +
				"onkeyup='precioKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
				"onchange='precioKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeydown='precioKeyDown(event)' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
			
			// PRECIO C/IGV
			case 8: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
				
			// SUBTOTAL
			case 9: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;
			
			// SUBTOTAL C/IGV (OCULTO)
			case 10: $(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
			*/
			// PVU
			case 5: $(this).html(CADENA_VACIA).append(
				"<div>" +
				"<span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha pvu-det' type='text' maxlength='13' " +
				"id='precio_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
				"</span>" +
				"</div>");
				break;

			// PVU C/IGV
			case 6: $(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1'>" +
				"</span></div>");
				break;

			// PVU REFERENCIA
			case 7: $(this).html(CADENA_VACIA).append(
				"<div>" +
				"<span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha pvu-ref-det' type='text' id='precioRef_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
				"</span>" +
				"</div>");
				break;

			// PORC DCTO
			case 8: $(this).html(CADENA_VACIA).append(
				"<input class='form-control alineacion-derecha porc-dcto-det' type='number' min='0' max='100' maxlength='3' " +
				"id='porcDcto_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1'>");
				break;

			// PRECIO C/DCTO
			case 9: $(this).html(CADENA_VACIA).append(
				"<div>" +
				"<span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='precioDcto_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
				"</span>" +
				"</div>");
				break;

			// SUBTOTAL
			case 10: $(this).html(CADENA_VACIA).append(
				"<div>" +
				"<span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
				"</span>" +
				"</div>");
				break;

			// SUBTOTAL C/IGV  (OCULTO)
			case 11: $(this).html(CADENA_VACIA).append(
				"<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");

		}
	});
	habilitarMarquee();
}


/**************** EVENTOS DETALLE *******************/

function buscarArticuloKeyUp(e, control, fila) {
	var codProv = codigoCliente.val();
	var datoBuscar = control.value.trim();
	var key = window.Event ? e.which : e.keyCode;
	/*	| 38 | (Arriba) |
		| 40 | (Abajo) |
		| 37 | (Izquierda) |
		| 39 | (Derecha) |
	 */
	// no hacer nada si son las teclas direccionales IZQ o DER
	if (key != 37 && key != 39) {
		$('#buscarArticulo_' + fila).autocomplete({
			source: function(request, response) {
				console.log("buscarArticuloKeyUp, autocomplete....");
				$.ajax({
					type: "Get",
					contentType: "application/json",
					accept: 'text/plain',
					url: '/appkahaxi/buscarArticuloLike/' + datoBuscar + '/' + codProv,
					data: null,
					dataType: 'json',
					beforeSend: function(xhr) {
						console.log("buscarArticuloKeyUp...beforesend, loading.....");
						//loadding(true);
					},
					success: function(resultado) {
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
						response($.map(resultado, function(item) {
							var AC = new Object();
							// requeridos
							AC.label = item.codigoEstandar + ' / ' + item.descripcion + ' / ' + item.descripcionMarcaArticulo + ' / ' +
								item.descripcionTipo + ' / ' + item.descripcionSeccion + ' / ' + item.descripcionUnidadMedida + ' / ' +
								((item.descripcionMarcaVehiculo == null) ? '(Sin marca vehículo)' : item.descripcionMarcaVehiculo) + ' / ' +
								((item.descripcionModelo == null) ? '(Sin modelo)' : item.descripcionModelo);
							AC.value = request.term;;
							// personalizando campos
							AC.codArticulo = item.codigoArticulo;
							AC.codEstandar = item.codigoEstandar;
							AC.descripcion = item.descripcion;
							AC.descripcionMarcaArticulo = item.descripcionMarcaArticulo;
							AC.precioVentaUnitario = item.precioVentaUnitario;
							AC.precioReferencia = item.precioReferencia;

							return AC;
						}));
						//loadding(false);
					},
					error: function(xhr, error, code) {
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

				// evaluamos si estamos cotizando en SOLES o DOLARES
				var precio;
				var tc = tipoCambio.val();

				deshabilitarControlSoloLectura(null, '#cantidad_' + fila);
				deshabilitarControlSoloLectura(null, '#precio_' + fila);

				var tipMoneda = tipoMoneda.val();
				if (tipMoneda == Moneda.SOLES) {
					precio = ui.item.precioVentaUnitario * tc;
				} else {
					precio = ui.item.precioVentaUnitario;
				}

				$('#precio_' + fila).val(convertirNumeroAMoneda(precio));
				//$('#precio_' + fila).prop('min', precio);

				var precioIgv = precio + (precio * (ParametrosGenerales.IGV / 100));
				$('#precioIgv_' + fila).val(convertirNumeroAMoneda(precioIgv));

				$('#cantidad_' + fila).focus();

				var key = window.Event ? event.which : event.keyCode;

				if (key != 13) {
					if ($('#cantidad_' + fila).val() > 0) {
						cantidadKeyUp($('#cantidad_' + fila)[0], fila);
					}
				}
			}
		});
	}
}

function cantidadKeyUp(control, fila) {

	var cantidad = Number(control.value);
	var precio = convertirMonedaANumero($('#precio_' + fila).val());
	var subTotal = cantidad * precio;
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV / 100));

	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#cantidadPend_' + fila).val(cantidad);

	calcularResumenOrdenVenta();
}

/**************** EVENTOS FORMULARIO *******************/

function evaluarCambioCondicionPago() {
	var condPagoVal = condPago.val();
	console.log("condPagoVal");
	if (condPagoVal == CondicionPago.CREDITO) {
		controlRequerido(dias)
		mostrarControl(dias);
		mostrarControl(lblDias);
	} else {
		controlNoRequerido(dias);
		ocultarControl(dias);
		ocultarControl(lblDias);
	}
}

function evaluarCambioEstado() {
	mostrarControl(btnGrabar);
	mostrarControl(btnDuplicar);
	btnDuplicar.removeClass('btn-flotante-grabar').addClass('btn-flotante-duplicar');

	if (estado.val() == EstadoDocumentoInicial.APROBADO) {
		//ocultarControl(btnDuplicar);
		habilitarControl(observaciones);
		habilitarControl(estado);
		controlNoRequerido(observaciones);

	} else if (estado.val() == EstadoDocumentoInicial.RECHAZADO) {
		//ocultarControl(btnDuplicar);
		ocultarControl(btnGenerarGuiaRemision);
		controlRequerido(observaciones);
		habilitarControl(observaciones);
		habilitarControl(estado);
		mostrarMensajeValidacion("Debe ingresar observaciones antes de grabar.", observaciones);

	} else {
		// POR APROBAR
		/*if (flgNuevo == 1){
			ocultarControl(btnGrabar);
			btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
		}
		else{
			mostrarControl(btnGrabar);
			btnDuplicar.removeClass('btn-flotante-grabar').addClass('btn-flotante-duplicar');
		}
		*/

		if (opcion.text() == Opcion.VER || opcion.text() == CADENA_VACIA) {
			ocultarControl(btnGrabar);
			btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
		}



		ocultarControl(btnGenerarGuiaRemision);
		mostrarControl(btnDuplicar);
		controlNoRequerido(observaciones);
		deshabilitarControl(observaciones);
	}
}

function grabarOrdenVenta(event) {

	if (documentoCli.val() == CADENA_VACIA) {
		mostrarMensajeValidacion("Debe buscar un cliente", $('#campoBuscar'));
		return false;
	}

	if (formOrdenVenta[0].checkValidity() == true) {
		event.stopPropagation();
		console.log("entrando validado....")
		event.preventDefault();

		if (validarDetalleOrden()) {

			if (flgNuevo == 1) {
				registrarOrdenVenta();
			} else {
				if (formObservaciones[0].checkValidity() == true) {
					console.log("actualiza....")
					actualizarOrdenVenta();
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
	formOrdenVenta.addClass('was-validated');
	formObservaciones.addClass('was-validated');
}

function validarDetalleOrden() {

	var cantidad;
	var precio;
	var flag = false;
	var exitEach = false;
	var exitIterator = false;

	// verificando que se hayan ingresado por lo menos un item al detalle de la Orden de Venta
	var contadorVacios = 0;
	// recorriendo todos los detalles
	var $headers = tableDetalle.find("th").not(':first');
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');

		$cells.each(function(cellIndex) {
			if ($($headers[cellIndex]).attr('id') == 'codArticulo') {

				if ($(this).find("input").val() == CADENA_VACIA || $(this).find("input").val() == UNDEFINED) {
					contadorVacios++;
				}
			}
		});
	});

	// si la cantidad de filas vacías es igual al contador de filas, mostrar mensaje
	if (contadorVacios == (indiceFilaDataTableDetalle + 1)) {
		mostrarMensajeValidacion("Debe ingresar items a la Orden de Venta", null, '#buscarArticulo_' + indiceFilaDataTableDetalle);
		return false;
	}

	// verificando que no hayan detalles con cantidad y precio vacíos
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		if (exitEach == true) {
			console.log("exirteach es true!");
			exitIterator = true;
			return false;
		}

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');

		flag = false;

		$cells.each(function(cellIndex) {
			console.log("valor de flag al iniciar new recorrido-->" + flag);
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
					console.log("cantidad-->" + cantidad);
					if (cantidad == CADENA_VACIA) {
						mostrarMensajeValidacion('Debe ingresar la cantidad.', $(this).find("input"));
						exitEach = true;
						console.log("cantidad es cadena vacia");
						return false;
					} else {
						var c = convertirMonedaANumero(cantidad);
						if (c <= 0) {
							mostrarMensajeValidacion('Debe ingresar una cantidad mayor a cero.', $(this).find("input"));
							exitEach = true;
							return false;
						}
					}
				}
			}

			// evaluamos el PRECIO	
			if ($($headers[cellIndex]).attr('id') == 'precioUnitario') {
				// siempre y cuando hayan datos (flag TRUE)
				if (flag == true) {
					precio = $(this).find("input").val();
					console.log("precio-->" + precio);
					if (precio == CADENA_VACIA) {
						mostrarMensajeValidacion('Debe ingresar el precio.', $(this).find("input"));
						exitEach = true;
						return false;
					} else {
						var p = convertirMonedaANumero(precio);
						if (p <= 0) {
							mostrarMensajeValidacion('Debe ingresar un precio mayor a cero.', $(this).find("input"));
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

function registrarOrdenVenta() {

	var nroDocumento = codigo.html();
	var nroCotizVentaVal = nroCotiReferencia.val().trim();
	var codigoCliVal = codigoCliente.val().trim();
	var dirDespachoVal = direccionDespacho.val().trim();
	var perContactoVal = personaContacto.val().trim();
	var fecContaVal = fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecHastaVal = fecHasta.datetimepicker('date').format('YYYY-MM-DD');
	var fecEntregaVal = fecEntrega.datetimepicker('date') != null ? fecEntrega.datetimepicker('date').format('YYYY-MM-DD') : fecEntrega.datetimepicker('date');
	var tipoMonedaVal = tipoMoneda.val();
	var condPagoVal = condPago.val();
	var estadoVal = estado.val();
	var tipoCambioVal = tipoCambio.val();
	var observacionesVal = observaciones.val().trim();
	var numeroDocumentoRefVal = nroDocReferencia.val();
	var subTotalVal = convertirMonedaANumero(subTotalOV.val().trim());
	var descuento = convertirMonedaANumero(dctoOV.val().trim() == '' ? '0' : dctoOV.val().trim());
	var igvVal = convertirMonedaANumero(igvOV.val());
	var totalVal = convertirMonedaANumero(totalOV.val().trim());
	var detalle = tableToJSON(tableDetalle);
	var diasVal = null;
	var porcDctoTotal = null;
	if (chkDctoTotal.is(':checked')) {
		porcDctoTotal = dctoTotal.val().trim();
	}

	if (condPagoVal == CondicionPago.CREDITO) {
		diasVal = dias.val();
	}

	var objetoJson = {

		numeroDocumento: nroDocumento,
		codigoCliente: codigoCliVal,
		nroCotizVenta: nroCotizVentaVal,
		direccionDespacho: dirDespachoVal,
		personaContacto: perContactoVal,
		fechaContabilizacion: fecContaVal,
		fechaValidoHasta: fecHastaVal,
		fechaEntrega: fecEntregaVal,
		codigoTipoMoneda: tipoMonedaVal,
		codigoCondPago: condPagoVal,
		codigoDias: diasVal,
		codigoEstado: estadoVal,
		tipoCambio: tipoCambioVal,
		observaciones: observacionesVal,
		numeroDocumentoRef: numeroDocumentoRefVal,
		porcDctoTotal: porcDctoTotal,
		subTotal: subTotalVal,
		descuento: descuento,
		igv: igvVal,
		total: totalVal,
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
		url: '/appkahaxi/registrarOrdenVenta/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(resultado, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {

				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				//mostrarControl(btnNuevo);
				mostrarControl(btnGenerarGuiaRemision);
				ocultarControl(btnLimpiar);
				ocultarControl(btnGrabar);

				mostrarControl(btnDuplicar);
				ocultarControl(btnGrabar);
				btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');

				mostrarControl(btnPdf);
				deshabilitarControl(direccionDespacho);
				deshabilitarControl(personaContacto);
				deshabilitarControl(campoBuscar);
				deshabilitarControl(dateTimePickerInput);
				deshabilitarControl(tipoMoneda);
				deshabilitarControl(condPago);
				deshabilitarControl(dias);
				habilitarControl(estado);
				deshabilitarControl(tipoCambio);
				deshabilitarControl(observaciones);
				deshabilitarDetalleOrdenVenta();

				codigo.html(resultado);
				flgNuevo = 0;
				numeroDocumento.text(resultado);

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

function actualizarOrdenVenta() {
	/*
	if(nroPedido.val().trim() == CADENA_VACIA && flagEnvio.val() == 1){
		mostrarMensajeValidacion("Debe ingresar el número de pedido antes de grabar.", nroPedido);
		return;
	}
	*/
	var nroDocumento = codigo.html();
	var dirDespachoVal = direccionDespacho.val().trim();
	var perContactoVal = personaContacto.val().trim();
	var estadoVal = estado.val();
	var observacionesVal = observaciones.val().trim();
	var numeroPedido = nroPedido.val().trim();
	var nroCotizacionSap = cotizacionSap.val().trim();
	var fecContaVal = fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fecHastaVal = fecHasta.datetimepicker('date').format('YYYY-MM-DD');
	var fecEntregaVal = fecEntrega.datetimepicker('date') != null ? fecEntrega.datetimepicker('date').format('YYYY-MM-DD') : fecEntrega.datetimepicker('date');
	
	var tipoMonedaVal = tipoMoneda.val();
	var condPagoVal = condPago.val();
	var tipoCambioVal = tipoCambio.val();
	var subTotalVal = convertirMonedaANumero(subTotalOC.val().trim());
	var igvVal = convertirMonedaANumero(igvOC.val());
	var totalVal = convertirMonedaANumero(totalOC.val().trim());
	var detalle = tableToJSON(tableDetalle);
	var diasVal = null;

	if (condPagoVal == CondicionPago.CREDITO) {
		diasVal = dias.val();
	}

	var objetoJson = {
		numeroDocumento: nroDocumento,
		direccionDespacho: dirDespachoVal,
		personaContacto: perContactoVal,
		codigoEstado: estadoVal,
		observaciones: observacionesVal,
		nroPedido: numeroPedido,
		cotizacionSap: nroCotizacionSap,
		fechaContabilizacion: fecContaVal,
		fechaValidoHasta: fecHastaVal,
		fechaEntrega: fecEntregaVal,
		codigoTipoMoneda: tipoMonedaVal,
		codigoCondPago: condPagoVal,
		codigoDias: diasVal,
		tipoCambio: tipoCambioVal,
		subTotal: subTotalVal,
		igv: igvVal,
		total: totalVal,
		detalle: detalle
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
		url: '/appkahaxi/actualizarOrdenCompra/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(resultado, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {
				mostrarNotificacion("El registro fué actualizado correctamente.", "success");

				if (estado.val() == EstadoDocumentoInicial.APROBADO) {
					deshabilitarControl(direccionDespacho);
					deshabilitarControl(personaContacto);
					deshabilitarControl(estado);
					deshabilitarControl(tipoCambio);
					deshabilitarControl(nroPedido);
					deshabilitarControl(cotizacionSap);
					mostrarControl(btnGenerarGuiaRemision);

					mostrarControl(btnDuplicar);
					ocultarControl(btnGrabar);
					btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');

					ocultarControl(btnLimpiar);
					deshabilitarControl(estado);
					controlNoRequerido(observaciones);
					deshabilitarControl(observaciones);
					deshabilitarDetalleOrdenVenta();
					deshabilitarControl(dateTimePickerInput);
					deshabilitarControl(tipoMoneda);
					deshabilitarControl(condPago);
					deshabilitarControl(dias);
					deshabilitarControl(tipoCambio);
					mostrarControl(btnPdf);
					window.scrollTo(0, 0);
				} else if (estado.val() == EstadoDocumentoInicial.POR_APROBAR) {
					/*deshabilitarControl(estado);
					deshabilitarControl(tipoCambio);
					deshabilitarControl(nroPedido);
					deshabilitarControl(cotizacionSap);
					deshabilitarDetalleOrdenCompra();
					deshabilitarControl(dateTimePickerInput);
					deshabilitarControl(tipoMoneda);
					deshabilitarControl(condPago);
					deshabilitarControl(dias);
					deshabilitarControl(tipoCambio);*/
					mostrarControl(btnPdf);
					mostrarControl(btnDuplicar);
					mostrarControl(btnGrabar);
					mostrarControl(btnLimpiar);

				}
				else {
					volver();
				}

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
	var $headers = dataTable.find("th").not(':first');

	dataTable.DataTable().rows().iterator('row', function(context, index) {
		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');
		data[index] = {};

		$cells.each(function(cellIndex) {

			if ($($headers[cellIndex]).attr('id') == 'codArticulo' && $(this).find("input").val() == CADENA_VACIA) {
				return false;
			} else {
				if ($($headers[cellIndex]).attr('id') == 'precioUnitario' || $($headers[cellIndex]).attr('id') == 'precioUnitarioIgv' ||
					$($headers[cellIndex]).attr('id') == 'subTotalIgv' || $($headers[cellIndex]).attr('id') == 'subTotal') {
					data[index][$($headers[cellIndex]).attr('id')] = convertirMonedaANumero($(this).find("input").val());
				} else {
					if ($($headers[cellIndex]).attr('id') != 'buscarArticulo') {
						data[index][$($headers[cellIndex]).attr('id')] = $(this).find("input").val();
					}
				}
			}
		});

	});

	console.log("data--->" + data);
	// eliminando las filas en blanco
	var newData = [];
	for (i = 0, j = 0; i < data.length; i++) {
		console.log("data[i][codArticulo]--->" + data[i]['codArticulo']);
		if (data[i]['codArticulo'] != UNDEFINED) {
			newData[j] = data[i];
			j++;
		}
	}

	return newData;
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
		callback: function(result) {
			if (result == true) {
				table.clear().draw();
				indiceFilaDataTableDetalle = -1;
				calcularResumenOrdenCompra();
			}
		}
	});
}
/*
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
		callback: function(result) {
			if (result == true) {
				generarGuiaRemisionPorOrden();
			}
		}
	});
}
*/
function generarGuiaRemisionPorOrden() {
	var params;
	var nroDoc = numeroDocumento.text();
	var dato = datoBuscar.text();
	var nroOV = nroOrdenVenta.text();
	var codRpto = codRepuesto.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();

	params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.NUEVO + "&datoBuscar=" + dato +
		"&nroGuiaRemision=&nroOrdenVenta=" + nroOV + "&codRepuesto=" + codRpto +
		"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam +
		"&volver=" + Respuesta.SI + "&desdeDocRef=" + Respuesta.SI + "&origenMnto=" + Respuesta.NO;

	window.location.href = "/appkahaxi/cargar-guia-remision-venta?" + params;
}

function cargarGuiaRemisionAsociada(numDocumento) {
	var params;
	var nroDoc = numeroDocumento.text();
	var dato = datoBuscar.text();
	var nroOC = nroOrdenCompra.text();
	var codRpto = codRepuesto.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();

	//params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.VER + "&datoBuscar=" + dato +
	params = "numeroDocumento=" + numDocumento + "&opcion=" + Opcion.VER + "&datoBuscar=" + dato +
		"&nroGuiaRemision=" + numDocumento + "&nroOrdenCompra=" + nroOC + "&codRepuesto=" + codRpto +
		"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + "&volver=" + Respuesta.SI +
		"&desdeDocRef=" + Respuesta.SI + "&origenMnto=" + Respuesta.NO;;

	window.location.href = "/appkahaxi/cargar-guia-remision-compra?" + params;
}

function nuevaOrdenCompra() {
	var params;
	// armando los parámetros
	params = "numeroDocumento=&opcion=&datoBuscar=&nroOrdenCompra=&codRepuesto=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
	window.location.href = "/appkahaxi/nueva-orden-compra?" + params;
}

function volver() {
	var params;
	var dato = datoBuscar.text();
	var nroOC = nroOrdenCompra.text();
	var codRpto = codRepuesto.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();

	params = "datoBuscar=" + dato + "&nroOrdenCompra=" + nroOC + "&codRepuesto=" + codRpto +
		"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
	window.location.href = "/appkahaxi/mantenimiento-orden-compra?" + params;
}
/*
function reiniciarFechaHasta() {
	console.log("reiniciarFechaHasta...inicio");
	fecHasta.datetimepicker('maxDate', false);
	fecHasta.datetimepicker('minDate', false);

}
*/
function limpiarOrdenVenta() {
	direccionDespacho.val(CADENA_VACIA);
	personaContacto.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);
	
	fecEntrega.datetimepicker('destroy');	
	fecHasta.datetimepicker('destroy');
	fecConta.datetimepicker('destroy');
	
	construirFechasPicker();
	inicializarFechas();
	
	direccionDespacho.focus();
}

function mostrarModalGuiasPorOrdenCompra(event) {

	modalCodigoOrdenCompra.text(numeroDocumento.text());
	obtenerDetalleGuiaPorOrdenCompra(event);
	mostrarModal(guiasPorOrdenCompraModal);
}

function obtenerDetalleGuiaPorOrdenCompra(event) {

	event.preventDefault();
	event.stopPropagation();

	if ($.fn.dataTable.isDataTable('#tableSeleccionDocumento')) {

		dataTableDetalleGuias.clear();
		dataTableDetalleGuias.ajax.reload(null, true);

	} else {

		dataTableDetalleGuias = tableSeleccionDocumento.DataTable({

			"ajax": {
				data: function(d) {
					d.codigoOrdenCompra = numeroDocumento.text().trim();
				},
				url: '/appkahaxi/listarGuiaRemisionCompraPorOrdenCompra/',
				dataSrc: function(json) {
					console.log("listarGuiaRemisionCompraPorOrdenCompra...success");
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
					"width": "20px",
					"targets": [0],
					"data": "numeroDocumento",
					"orderable": false/*,
					"render": function(data, type, row) {
						return '<a href="#" class="link-ver-guia">' + data + '</a>';
					}*/
				},
				{
					"width": "20px",
					"targets": [1],
					"data": "fechaDocumento",
					"className": "dt-center",
					"orderable": false
				},
				{
					"width": "20px",
					"targets": [2],
					"data": "fechaContabilizacion",
					"className": "dt-center",
					"orderable": false
				},
				{
					"width": "70px",
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
		/*
		$('#tableSeleccionDocumento tbody').on('click', '.link-ver-guia', function() {

			var data = dataTableDetalleGuias.row($(this).closest('tr')).data();
			cargarGuiaRemisionAsociada(data.numeroDocumento);
		});
		*/
		$('#tableSeleccionDocumento tbody').on('click', 'tr', function() {
			var nTds = $('td', this);
			var numeroDocumento = $(nTds[0]).text();

			cargarGuiaRemisionAsociada(numeroDocumento);
		});
	}
}


/********************* CALCULOS NUMERICOS ********************/

function calcularResumenOrdenVenta() {

	var subTotal = 0;

	// 1. sumamos el campo subTotal de cada fila
	var $headers = tableDetalle.find("th").not(':first');
	tableDetalle.DataTable().rows().iterator('row', function(context, index) {

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');
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

	// 2. hacemos los cáculos del IGV y TOTAL de la OC
	var igv = subTotal * (ParametrosGenerales.IGV / 100);
	var total = subTotal + igv;

	subTotalOV.val(convertirNumeroAMoneda(subTotal));
	igvOV.val(convertirNumeroAMoneda(igv));
	totalOV.val(convertirNumeroAMoneda(total));
}

function generarPdf(event) {
	var nroDocumento = codigo.html();
	var correo = email.val();
	var box = bootbox.dialog({
		title: 'Enviar correo o descargar orden de compra',
		message: $(".form-content").html().replace('formEmail', 'formEmailReal'),
		buttons: {
			correo: {
				label: '<i class="fas fa-at"></i> Enviar por correo',
				className: Boton.SUCCESS,
				callback: function() {

					event.preventDefault();
					var form = $(".formEmailReal")

					if (form[0].checkValidity() == false) {
						console.log("validado FALSE!!!....")
						event.stopPropagation();

						box.find('.formEmailReal #emailPDF').addClass('input-validation-error');
						box.find('.formEmailReal #emailPDF').focus();
						box.find('.mensaje-validado-falso').show();
						return false;
					} else {
						//event.stopPropagation();
						console.log("todo bien....send email....")
						var listaCorreos = $('.formEmailReal #emailPDF').val();
						console.log('listaCorreos-->' + listaCorreos);

						enviarMailReporte(nroDocumento, listaCorreos);
					}
					form.addClass('was-validated');
				}
			},
			descargar: {
				label: '<i class="fas fa-download"></i> Descargar',
				className: Boton.WARNING,
				callback: function() {
					console.log('boton descargar...');
					descargarReporte(nroDocumento);
				}
			}
		}
	});

	box.on('shown.bs.modal', function() {
		console.log("$$$on modal...")
		$('.formEmailReal #emailPDF').focus();
		//$('#emailPDF').focus();
		console.log("correo del cliente-->" + correo + "/ NRO DOC-->" + nroDocumento);
		$('.formEmailReal #emailPDF').val(correo);
	});
}

function enviarMailReporte(numeroDocumento, email) {
	var objetoJson = {
		numeroDocumento: numeroDocumento,
		email: email
	};

	var entityJsonStr = JSON.stringify(objetoJson);
	console.log("entityJsonStr-->" + entityJsonStr);
	var formData = new FormData();
	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));

	$.ajax({
		type: "Post",
		contentType: false,
		processData: false,
		url: '/appkahaxi/enviarEmailReporteOrdenCompra',
		xhrFields: {
			responseType: 'blob'
		},
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		error: function(xhr, error, code) {
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		},
		success: function(result, status, xhr) {
			mostrarNotificacion("El correo se envió correctamente.", "success");
			loadding(false);
		}
	});
}

function descargarReporte(numeroDocumento) {
	$.ajax({
		type: "Post",
		url: '/appkahaxi/reporteOrdenCompra/' + numeroDocumento,
		xhrFields: {
			responseType: 'blob'
		},
		data: null,
		beforeSend: function(xhr) {
			loadding(true);
		},
		error: function(xhr, error, code) {
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		},
		success: function(result, status, xhr) {
			if (result.size > 0) {
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

								window.onfocus = function() {
									// document.body.removeChild(a);
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


