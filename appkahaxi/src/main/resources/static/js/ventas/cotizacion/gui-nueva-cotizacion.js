var indiceFilaDataTableDetalle = -1;
//**************************************************************** */
var codigoCliente;
var email;
var celular;
var numeroDocumento;
var opcion;
var datoBuscar;
var nroCotizacion;
var nroReq;
var codRepuesto;
var fechaDesde;
var fechaHasta;
var estadoParam;
var volverParam;

var titulo;
var codigo;
var referenciaDiv;
var nroDocReferencia;
var campoBuscar;
var documentoCliente;
var nombreCliente;
var direccion;
var fecConta;
var fecHasta;
var fecContaInput;
var fecHastaInput
var dateTimePickerInput;
var tipoMoneda;
var condPago;
var dias;
var divDias;
var estado;
var chkDctoTotal;
var dctoTotal;
var nroRequerimiento;
var asunto;
var tipoCambio;
var observaciones;
var subTotalCoti;
var dctoCotiDiv;
var dctoCoti;
var igvCoti;
var totalCoti;

var tableDetalle;
var tableNuevoDetalle;
var dataTableDetalle;

var formCotizacion;
var formObservaciones;

var btnPdf;
var btnVolver;
var btnGenerarOV;
var btnIrOV;
var btnAgregarArticulo;
var btnEliminarTodosArticulos;
var btnGrabar;
var btnDuplicar;
var btnNuevo;
var btnLimpiar;

var chkEnviarCodigo;
//********************
var antiguoRequerimiento;
var antiguoAsunto;

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	codigoCliente =  $("#codigoCliente");
	email =  $("#email");
	celular =  $("#celular");
	numeroDocumento =  $("#numeroDocumento");
	opcion =  $("#opcion");
	datoBuscar =  $("#datoBuscar");
	nroCotizacion =  $("#nroCotizacion");
	nroReq =  $("#nroReq");
	codRepuesto =  $("#codRepuesto");
	fechaDesde =  $("#fechaDesde");
	fechaHasta =  $("#fechaHasta");
	estadoParam =  $("#estadoParam");
	volverParam =  $("#volverParam");
	
	titulo =  $("#titulo");
	codigo =  $("#codigo");
	referenciaDiv =  $("#referenciaDiv");
	nroDocReferencia =  $("#nroDocReferencia");
	campoBuscar =  $("#campoBuscar");
	documentoCliente =  $("#documentoCliente");
	nombreCliente =  $("#nombreCliente");
	direccion =  $("#direccion");
	fecConta =  $("#fecConta");
	fecHasta =  $("#fecHasta");
	fecContaInput =  $("#fecContaInput");
	fecHastaInput =  $("#fecHastaInput");
	dateTimePickerInput = $(".datetimepicker-input");
	tipoMoneda =  $("#tipoMoneda");
	condPago =  $("#condPago");
	dias =  $("#dias");
	divDias =  $("#divDias");
	estado =  $("#estado");
	chkDctoTotal =  $("#chkDctoTotal");
	dctoTotal =  $("#dctoTotal");
	nroRequerimiento =  $("#nroRequerimiento");
	asunto =  $("#asunto");
	tipoCambio =  $("#tipoCambio");
	observaciones =  $("#observaciones");
	subTotalCoti =  $("#subTotalCoti");
	dctoCotiDiv =  $("#dctoCotiDiv");
	dctoCoti =  $("#dctoCoti");
	igvCoti =  $("#igvCoti");
	totalCoti =  $("#totalCoti");
	
	tableDetalle =  $("#tableDetalle");
	tableNuevoDetalle =  $("#tableNuevoDetalle");
	
	formCotizacion =  $("#formCotizacion");
	formObservaciones =  $("#formObservaciones");
	
	btnPdf =  $("#btnPdf");
	btnVolver =  $("#btnVolver");
	btnGenerarOV =  $("#btnGenerarOV");
	btnIrOV =  $("#btnIrOV");
	btnAgregarArticulo =  $("#btnAgregarArticulo");
	btnEliminarTodosArticulos =  $("#btnEliminarTodosArticulos");
	btnGrabar =  $("#btnGrabar");
	btnDuplicar =  $("#btnDuplicar");
	btnNuevo = $('#btnNuevo');
	btnLimpiar = $("#btnLimpiar");
	
	chkEnviarCodigo = $("#chkEnviarCodigo");
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	habilitarMarquee();
	habilitarAutocompletarBuscarCampos();
	
	construirFechasPicker();
	inicializarFechas();
	restringirSeleccionFechas();
	
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

function construirFechasPicker() {
	fecHasta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});
	
	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly:  true
	});	    
}

function restringirSeleccionFechas() {
	
	fecConta.on("change.datetimepicker", function (e) {
		//reiniciarFechaHasta();
		
		fecHasta.datetimepicker('maxDate', moment(e.date).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ , 'day'));
		fecHasta.datetimepicker('minDate', moment(e.date));
		fecHasta.datetimepicker('date', moment(e.date).add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ , 'day'));
	});	
}

function inicializarFechas(){
	console.log("inicializarFechas...")
	fecConta.datetimepicker('date', moment());
	fecHasta.datetimepicker('date', moment().add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ , 'day'));
	
	fecConta.datetimepicker('maxDate', moment());
	
	fecHasta.datetimepicker('minDate', moment());
	fecHasta.datetimepicker('maxDate', moment().add(ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ, 'day'));
}

function habilitarAutocompletarBuscarCampos() {
	
	campoBuscar.autocomplete({
		source: function( request, response ) {
			$.ajax({
				type:"Get",
		        contentType : "application/json",
		        accept: 'text/plain',
		        url : '/appkahaxi/buscarSnLike/' + TipoSocioNegocios.CLIENTE + '/' + request.term,
		        data : null,
		        dataType: 'json',							  
		        beforeSend: function(xhr) {
		        	//loadding(true);
		        },
		        success:function(resultado){
		        	
					response($.map(resultado,function(item) {
		        		var AC = new Object();
		    			// requeridos
		        		AC.label = item.numeroDocumento + ' - ' + item.nombreRazonSocial;
                        AC.value = request.term;
                        // personalizando campos
                        AC.codigoSocio 			= item.codigoSocio;
                        AC.numeroDocumento 		= item.numeroDocumento;
                        AC.nombreRazonSocial	= item.nombreRazonSocial;
                        AC.direccionFiscal 		= item.direccionFiscal;
						AC.email			    = item.email;
						AC.celular				= item.celular;

                        return AC;
        	  		}));
		        	//loadding(false);
		        },
		        error: function (xhr, error, code){
		        	console.log("clienteKeyUp, error...." + xhr.status);
		        	mostrarMensajeError(xhr.responseText);
		        	//loadding(false);
		        }
		    });
	      },
	    
		minLength: 3,
	    select: function(event, ui) {
	    	event.preventDefault();
	    	
	    	codigoCliente.val(ui.item.codigoSocio);
	    	documentoCliente.val(ui.item.numeroDocumento);
	    	nombreCliente.val(ui.item.nombreRazonSocial);
	    	direccion.val(ui.item.direccionFiscal);
			email.val(ui.item.email);
			celular.val(ui.item.celular);
			
			campoBuscar.val(CADENA_VACIA);
			console.log("campobuscar indiceFilaDataTableDetalle--->" + indiceFilaDataTableDetalle);
			if(indiceFilaDataTableDetalle == -1){
				agregarFilaEnTablaDetalle();
			}
	    }
	});
}

function inicializarEventos(){
	
	btnAgregarArticulo.click(function() {
		agregarFilaEnTablaDetalle();
	});
	
	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		mostrarDialogoEliminarFila(dataTableDetalle, $(this));
	});	
	
	btnGrabar.click(function(event) {
		grabarCotizacionVenta(event);			
	});
		
	btnDuplicar.click(function() {
		//duplicar(codigo.html());
		duplicarPantallaCotizacionVenta(numeroDocumento.text());
	});
	
	btnLimpiar.click(function() {
		limpiarCotizacion();
	});
	
	btnGenerarOV.click(function() {
		generarOrdenVenta();
	});
	
	btnIrOV.click(function(){
		irOrdenVenta();
	});
	
	btnVolver.click(function() {
		volver();
	});
	
	btnPdf.click(function(e){
		generarPdf(e);	
    });
    
	btnNuevo.click(function(){
    	nuevaCotizacionVenta();
	});
	
	condPago.on('change', function(){
		evaluarCambioCondicionPago();
	});
		
	tipoMoneda.on('change', function(){
		evaluarCambioTipoMoneda();
	});
		
	estado.on('change', function () {
	    evaluarCambioEstado();
		
	});
	
	chkDctoTotal.on('click', function(){
    	clickCheckBoxDctoTotal($(this));
    });
		
	dctoTotal.on('keyup', function(){
		calcularResumenCotizacion();
	});
			
	fecContaInput.on('keydown', function(e){
		soloPermitirTab(e);
	});
	
	fecHastaInput.on('keydown', function(e){
		soloPermitirTab(e);
	});
	
	asunto.on('keypress', function(e){
		evaluarKeyPressAsunto(e);
	});
	
	btnEliminarTodosArticulos.click(function() {
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
        "paging"        : paginacion,
        /*"dom"           :   "<'row'<'col-sm-12'rt>>" +
			                "<'row'<'col-sm-4 'l><'col-sm-8 'p>>",*/
	    "dom"			: '<ip<rt>lp>',
        "lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
        "fnRowCallback":
             function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
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
	
	fecConta.datetimepicker('date', moment());
	fecConta.datetimepicker('maxDate', moment());
	
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
	if(volver == Respuesta.SI){
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
        url : '/appkahaxi/buscarCotizacionVenta/' + nroDocReferenciaVal ,
        data : null,
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        
		success:function(result,textStatus,xhr){
        	console.log("buscarCotizacionVenta---> success");
        	if(xhr.status == HttpStatus.OK){
        		
				var data = JSON.parse(result);
				//var porcDctoTotal = data.porcDctoTotal;
        		cargarPantallaHTML(data);
				
				if(opcion.text() == Opcion.VER) {
					verPantallaCotizacionVenta(data);
				}else {
					duplicarPantallaCotizacionVenta(nroDocReferenciaVal);
				}
                dataTableDetalle.destroy();
				inicializarTabla(true);
		
            }
            loadding(false);
			window.scrollTo(0, 0);
        },
        error: function (xhr, error, code){
        	//console.log("eliminarArticulo, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
			loadding(false);
        }
    });
	
	mostrarControl(btnVolver);
}

function cargarPantallaHTML(data) {
	// ****** CABECERA
	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
    nombreCliente.val(data.nombreCliente);
    direccion.val(data.direccionFiscal);
	email.val(data.email);
	celular.val(data.celular);
    tipoMoneda.val(data.codigoTipoMoneda);
    condPago.val(data.codigoCondPago);
    dias.val(data.codigoDias);
    estado.val(data.codigoEstado);
    nroRequerimiento.val(data.nroRequerimiento);
    asunto.val(data.asunto);
	// salvando el req y el asunto antiguos para luego comparar
	antiguoRequerimiento = data.nroRequerimiento;
	antiguoAsunto = data.asunto;
	
	subTotalCoti.val(convertirNumeroAMoneda(data.subTotal));
    dctoCoti.val(convertirNumeroAMoneda(data.descuento));
    igvCoti.val(convertirNumeroAMoneda(data.igv));
    totalCoti.val(convertirNumeroAMoneda(data.total));

	tipoCambio.val(data.tipoCambio);
	observaciones.val(data.observaciones);
	// si hay dcto por toda la cotización
    console.log("data.porcDctoTotal--->" + data.porcDctoTotal);
	if(data.porcDctoTotal != null){
		console.log("dentro del if...");
    	dctoTotal.val(data.porcDctoTotal);
    	//habilitarControl(dctoTotal);
    	checkControl(chkDctoTotal);
    	mostrarControl(dctoCotiDiv);
    }
	// evaluando si tiene documento de referencia
	if(data.numeroDocumentoRef != CADENA_VACIA){
		nroDocReferencia.val(data.numeroDocumentoRef);
		mostrarControl(referenciaDiv);
	}
	if(data.codigoCondPago == CondicionPago.CREDITO){
    	mostrarControl(divDias);
    }
    
	// ******* DETALLE
    var tamDetalle = data.detalle.length;
    for(i=0; i<tamDetalle; i++){
    	var detalle = data.detalle[i];
    	// forzando el click
    	btnAgregarArticulo.click();
    	// poniendo los valores
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
}

function verPantallaCotizacionVenta(data) {
	// ****** CABECERA
    titulo.text("VER");
	codigo.html(numeroDocumento.text());
	
	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
    fecHasta.datetimepicker('date', moment(data.fechaValidoHasta));
    tipoCambio.val(data.tipoCambio);
    
	deshabilitarControl(campoBuscar);
    deshabilitarControl(dateTimePickerInput);
	deshabilitarControl(tipoMoneda);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	
	if(data.codigoEstado == EstadoDocumentoInicial.POR_APROBAR){
		habilitarControl(estado);
		
		estado.focus();
	}else if(data.codigoEstado == EstadoDocumentoInicial.RECHAZADO){
		deshabilitarControl(estado);
		
		btnVolver.focus();
	}else{
		
		// estado APROBADO
		deshabilitarControl(estado);
		
		if(data.codigoEstadoProceso == EstadoProceso.ABIERTO){
			// estado proceso ABIERTO
			// si estado proceso está abierto, mostrar botón "generar orden de venta", ocultar "ir a la OV"
			mostrarControl(btnGenerarOV);
			ocultarControl(btnIrOV);
		}else{
			// estado proceso CERRADO
			// si estado proceso está cerrado, mostrar botón "ir a la OV", ocultar "generar orden de venta" 
			ocultarControl(btnGenerarOV);
			mostrarControl(btnIrOV);
		}
		
		btnGenerarOV.focus();
	}
	
	deshabilitarControl(dctoTotal);
	deshabilitarControl(chkDctoTotal);
	deshabilitarControl(observaciones);
	deshabilitarControl(nroRequerimiento);
	deshabilitarControl(asunto);
	
	ocultarControl(btnGrabar);
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);
	ocultarControl(btnLimpiar);
	mostrarControl(btnPdf);
	
	mostrarControl(btnDuplicar);
	btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
		
	deshabilitarDetalleCotizacion();
}

function duplicarPantallaCotizacionVenta(numDocReferencia) {
	console.log("duplicarPantallaCotizacionVenta....");
	// ****** CABECERA
	titulo.text("DUPLICAR");
	
	inicializarFechaContaHasta();
	opcion.text(Opcion.DUPLICAR);
	obtenerTipoCambio(tipoCambio);
    codigo.html(CADENA_VACIA);
	
	nroDocReferencia.val(numDocReferencia);
	mostrarControl(referenciaDiv);
	
	estado.val(EstadoDocumentoInicial.POR_APROBAR);
	//observaciones.val(CADENA_VACIA);
	controlNoRequerido(observaciones);
    
	// habilitar controles
	habilitarControl(dateTimePickerInput);
	habilitarControl(tipoMoneda);
	habilitarControl(condPago);
	habilitarControl(dias);
	deshabilitarControl(estado);
	// evaluando para mostrar dcto total
	console.log("dctoTotal-->" + dctoTotal.val() + "<---");
	if(dctoTotal.val() != CADENA_VACIA){
		habilitarControl(dctoTotal);
	}
	habilitarControl(chkDctoTotal);
	habilitarControl(nroRequerimiento);
	habilitarControl(asunto);
	habilitarControl(observaciones);
	habilitarControl(campoBuscar);
	
	mostrarControl(btnGrabar);
	mostrarControl(btnAgregarArticulo);
	mostrarControl(btnEliminarTodosArticulos);
	mostrarControl(btnLimpiar);
	
	ocultarControl(btnDuplicar);
	ocultarControl(btnGenerarOV);
	ocultarControl(btnIrOV);
	ocultarControl(btnPdf);
	
	// ******* DETALLE
    habilitarDetalleCotizacion();
	campoBuscar.focus();
}

function deshabilitarDetalleCotizacion(){
	
	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			habilitarControlSoloLectura($(this).find(".buscar-det"));
			habilitarControlSoloLectura($(this).find(".cantidad-det"));
			habilitarControlSoloLectura($(this).find(".pvu-det"));
			habilitarControlSoloLectura($(this).find(".porc-dcto-det"));
			
			deshabilitarControl($(this).find(".btn-delete"));
		});
	});	
}

function habilitarDetalleCotizacion(){
	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			deshabilitarControlSoloLectura($(this).find(".buscar-det"));
			deshabilitarControlSoloLectura($(this).find(".cantidad-det"));
			deshabilitarControlSoloLectura($(this).find(".pvu-det"));
			deshabilitarControlSoloLectura($(this).find(".porc-dcto-det"));
			
			habilitarControl($(this).find(".btn-delete"));
		});
	});
}

function agregarFilaEnTablaDetalle() {
	// agregando una nueva fila a la tabla de detalle
	var filaHTML = tableNuevoDetalle.find("tr")[0].outerHTML;
	var fila = dataTableDetalle.row.add($(filaHTML)).draw(false);
	// actualizando el índice
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
	// poniendo el símbolo de moneda que corresponde (sólo para el caso de SOLES)
	var tipoMonedaValor = tipoMoneda.val();
	if(tipoMonedaValor == Moneda.SOLES){
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}

	$('#buscarArticulo_' + indiceFilaDataTableDetalle).focus();
}

function agregarHTMLColumnasDataTable() {
	var row = tableDetalle.DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");
	// obteniendo un array de columnas de la última fila
	var $tds = row.find("td").not(':first').not(':last');
    
	// recorriendo las columnas
    $.each($tds, function(i, el) {
    	switch(i){
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
			case 2:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control codigo-det' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;						
    		        		
			// DESCRIPCION ART
			case 3:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control desc-det' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
    					
    		// MARCA ART
			case 4:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control marca-det' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
				
			// CANTIDAD
    		case 5:		$(this).html(CADENA_VACIA).append(
									"<input class='form-control cantidad-det alineacion-derecha' type='text' maxlength='4' " + 
										    "onkeyup='cantidadKeyUp(this, " + indiceFilaDataTableDetalle + ");' " + 
											"onkeydown='cantidadKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
											"onkeypress='return soloEnteros(event);' readonly='readonly' " +
											"id='cantidad_" + indiceFilaDataTableDetalle + "' >");
										
    					break;
    					
    		// PVU
			case 6:		$(this).html(CADENA_VACIA).append(
									"<div>" + 
										"<span class='simbolo-moneda input-symbol-dolar'>" + 
											"<input class='form-control alineacion-derecha pvu-det' type='text' maxlength='13' " +
													"onkeyup='precioKeyUp(this, " + indiceFilaDataTableDetalle + ");' " + 
													"onchange='precioKeyUp(this, " + indiceFilaDataTableDetalle + ");' " + 
													"onkeydown='precioKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
													"onkeypress='return soloDecimales(event, this);' readonly='readonly' " +
													"id='precio_" + indiceFilaDataTableDetalle + "'  >" +
										"</span>" + 
									"</div>");
    					break;
			
			// PVU C/IGV
			case 7:		$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
						"<input class='form-control alineacion-derecha' type='text' id='precioIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1'>" +
						"</span></div>");
						break;
    					
    		// PVU REFERENCIA
			case 8:		$(this).html(CADENA_VACIA).append(
								"<div>" + 
									"<span class='simbolo-moneda input-symbol-dolar'>" + 
					        			"<input class='form-control alineacion-derecha pvu-ref-det' type='text' id='precioRef_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
									"</span>" + 
								"</div>");
    					break;

    		// PORC DCTO
			case 9:		$(this).html(CADENA_VACIA).append(
								"<input class='form-control alineacion-derecha porc-dcto-det' type='number' min='0' max='100' maxlength='3' " +
										"onkeyup='porcDctoKeyUp(this, " + indiceFilaDataTableDetalle + ");' " + 
										"onchange='porcDctoKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
										"onkeydown='porcDctoKeyDown(event)' " +
										"onkeypress='return soloEnteros(event);' readonly='readonly' " +
										"id='porcDcto_" + indiceFilaDataTableDetalle + "' >");
						break;
			
    		// PRECIO C/DCTO
			case 10:		$(this).html(CADENA_VACIA).append(
							"<div>" + 
								"<span class='simbolo-moneda input-symbol-dolar'>" + 
				        			"<input class='form-control alineacion-derecha' type='text' id='precioDcto_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
								"</span>" + 
							"</div>");
    					break;

    		// SUBTOTAL
			case 11:	$(this).html(CADENA_VACIA).append(
								"<div>" + 
									"<span class='simbolo-moneda input-symbol-dolar'>" + 
					        			"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >" +
									"</span>" + 
								"</div>");
						break;
									
			// SUBTOTAL C/IGV  (OCULTO)
			case 12:	$(this).html(CADENA_VACIA).append(
					        	"<input class='form-control alineacion-derecha' type='text' id='subTotalIgv_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");    		
			
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
				console.log("buscarArticuloKeyUp, autocomplete....datoBuscar:" + datoBuscar + "/codCliente:" + codCliente);
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
		    	// evaluamos si estamos cotizando en SOLES o DOLARES
				var precio;
				var precioRef;
				var tc = tipoCambio.val();
				
				deshabilitarControlSoloLectura(null, '#cantidad_' + fila);
				deshabilitarControlSoloLectura(null, '#precio_' + fila);
				deshabilitarControlSoloLectura(null, '#porcDcto_' + fila);
				
				var tipMoneda = tipoMoneda.val();
				if(tipMoneda == Moneda.SOLES){
					precio 		= ui.item.precioVentaUnitario * tc;
					precioRef 	= ui.item.precioReferencia * tc;
					//$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
				}else{
					precio 		= ui.item.precioVentaUnitario;
					precioRef 	= ui.item.precioReferencia;
					//$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
				}
				
				$('#precio_' + fila).val(convertirNumeroAMoneda(precio));
				//$('#precio_' + fila).prop('min', precio);
				
				var precioIgv = precio + (precio * (ParametrosGenerales.IGV / 100));
				$('#precioIgv_' + fila).val(convertirNumeroAMoneda(precioIgv));
				
				$('#precioRef_' + fila).val(convertirNumeroAMoneda(precioRef));
				$('#cantidad_' + fila).focus();
				
				var key = window.Event ? event.which : event.keyCode;
				
				if(key != 13){
					if ($('#cantidad_' + fila).val() > 0){						
						cantidadKeyUp($('#cantidad_' + fila)[0], fila);
					}				
				}
		    }
	    });
	}
}

function cantidadKeyUp(control, fila){
	console.log("cantidadKeyUp...");
	
	var cantidad = Number(control.value);
	var precio = convertirMonedaANumero($('#precio_' + fila).val());
	var subTotal = cantidad * precio;
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV/100));
	
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	
	calcularResumenCotizacion();
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

function precioKeyUp(control, fila){
	console.log("precioKeyUp....");
	var cantidad = Number($('#cantidad_' + fila).val());
	var precio = Number(control.value);
	
	var subTotal = cantidad * precio;
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV/100));
	var precioIgv = precio + (precio * (ParametrosGenerales.IGV / 100));
	
	$('#precioIgv_' + fila).val(convertirNumeroAMoneda(precioIgv));
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	
	calcularResumenCotizacion();
}

function precioKeyDown(e, fila){
	var key = window.Event ? e.which : e.keyCode;
	console.log("precioKeyDown, key-->" + key);
	// si es ENTER
	if(key == 13){
		// preguntamos si está activo el check de dcto totalCoti
		// si está activo, al presionar ENTER entonces INSERTAMOS UNA NUEVA FILA
		if (chkDctoTotal.is(':checked')) {
			btnAgregarArticulo.click();
		}else{
			// caso contrario, le damos el foco al campo PORCENTAJE DCTO
			$('#porcDcto_' + fila).select();
		}
	}
}

function porcDctoKeyUp(control, fila){
	console.log("porcDctoKeyUp....");
	var cantidad = Number($('#cantidad_' + fila).val());
	var precio = convertirMonedaANumero($('#precio_' + fila).val());
	var subTotal;
	
	var porcDcto = Number(control.value);
	var max = Number(control.max);
	
	if (porcDcto > max){
		if(control.value.length == 4){
			control.value = control.value.substring(0, 3);	
		}else{
			control.value = control.value.substring(0, 2);
		}
		return;
	}
	
	if (porcDcto != CADENA_VACIA && porcDcto != '0') {
		var montoDcto = precio * (porcDcto / 100);
		// precio con porcDcto
		var nuevoPrecio = precio - montoDcto;
		subTotal = cantidad * nuevoPrecio;
		$('#precioDcto_' + fila).val(convertirNumeroAMoneda(nuevoPrecio));
	}else{
		subTotal = cantidad * precio;
		$('#precioDcto_' + fila).val(CADENA_VACIA);
	}
	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	calcularResumenCotizacion();
}

function porcDctoKeyDown(e){
	var key = window.Event ? e.which : e.keyCode;
	console.log("porcDctoKeyDown, key-->" + key);
	// si es ENTER
	if(key == 13){
		console.log("porcDctoKeyDown, nueva fila");
		btnAgregarArticulo.click();		
	}
}


/**************** EVENTOS FORMULARIO *******************/

function evaluarCambioCondicionPago(){
	var cPago = condPago.val();
	
	if(cPago == CondicionPago.CREDITO){
		controlRequerido(dias)
		mostrarControl(divDias);
	}else{
		controlNoRequerido(dias);
		ocultarControl(divDias);
	}
}

function evaluarCambioTipoMoneda(){
	var tipMoneda = tipoMoneda.val();
	
	if(tipMoneda == Moneda.SOLES){
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
		convertirMontosASoles();
	}else{
		$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
		convertirMontosADolares();
	}
}

function evaluarCambioEstado(){
	habilitarControl(nroRequerimiento);
	habilitarControl(asunto);

	if(estado.val() == EstadoDocumentoInicial.APROBADO){
		//mostrarControl(btnGenerarOV);
		mostrarControl(btnGrabar);
		ocultarControl(btnDuplicar);
		habilitarControl(observaciones);
		controlNoRequerido(observaciones);
				
	}else if(estado.val() == EstadoDocumentoInicial.RECHAZADO){
		ocultarControl(btnGenerarOV);
		ocultarControl(btnDuplicar);
		mostrarControl(btnGrabar);
		controlRequerido(observaciones);
		habilitarControl(observaciones);
		mostrarMensajeValidacion("Debe ingresar observaciones antes de grabar.", observaciones);
		
	}else{ 
		// POR APROBAR
		ocultarControl(btnGenerarOV);
		ocultarControl(btnGrabar);
		mostrarControl(btnDuplicar);
		btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
		
		deshabilitarControl(nroRequerimiento);
		deshabilitarControl(asunto);
		
		controlNoRequerido(observaciones);
		deshabilitarControl(observaciones);
	}
}

function clickCheckBoxDctoTotal(control){
	if (control.is(':checked')) {
		habilitarControl(dctoTotal);
		mostrarControl(dctoCotiDiv);
		calcularActivarDctoTotal();
		dctoTotal.focus();
	}else{
		calcularDesactivarDctoTotal();
		ocultarControl(dctoCotiDiv);
		deshabilitarControl(dctoTotal);
		dctoTotal.val(CADENA_VACIA);
	}
}

function soloPermitirTab(e){
	var key = window.Event ? e.which : e.keyCode;
	console.log("key-->" + key)
	// si es <>TAB
	if(key != 9){
		return false;
	}
}

function evaluarKeyPressAsunto(e){
	var key = window.Event ? e.which : e.keyCode;
	// si es ENTER
	if(key == 13){
		btnAgregarArticulo.click();
	}
}

function grabarCotizacionVenta(event){
	
	if (formCotizacion[0].checkValidity() == true) {
		event.stopPropagation();
		console.log("entrando validado....")
		event.preventDefault();
		
		if(validar()){
			console.log("validar() es true");
			// aqui llamo al 1er modal
			validarRequerimiento(event);
		}
	} else {
		console.log("validado FALSE!!!....")
        event.stopPropagation();
		
	}
	formCotizacion.addClass('was-validated');
}

function validar(){
	var cantidad;
	var precio;
	var flag = false;
	var exitEach = false;
	var exitIterator = false;
		
	// verificando que se hayan ingresado por lo menos un item al detalle de la cotizacion
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
		mostrarMensajeValidacion("Debe ingresar items a la cotización", null, '#buscarArticulo_' + indiceFilaDataTableDetalle);
		return false;	
	}
	
	// verificando que no hayan detalles con cantidad y precio vacíos
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
			console.log("valor de flag al iniciar new recorrido-->" + flag);
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
					console.log("cantidad-->" + cantidad);
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
			
			// evaluamos el PRECIO	
			if($($headers[cellIndex]).attr('id') == 'precioUnitario') {
				// siempre y cuando hayan datos (flag TRUE)
				if(flag == true){
					precio = $(this).find("input").val();
					console.log("precio-->" + precio);
					if(precio == CADENA_VACIA){
						mostrarMensajeValidacion('Debe ingresar el precio.', $(this).find("input"));
						exitEach = true;
						return false;
					}else {
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
		
	if(exitEach == true || exitIterator == true){
		console.log("exitEach||exititerator es true!");
		return false;
	}else{
		return true;	
	}
}

function validarRequerimiento(event){
	console.log("aqui en validarRequerimiento!!!");
	console.log("opcion--->" + opcion.text());
	// verificando que, de tratarse de un duplicado, se hayan cambiado el req y el asunto
	if(opcion.text() == Opcion.DUPLICAR){
		console.log("es DUPLICAR");
		var req = nroRequerimiento.val().trim();
		console.log("req-->" + req + "<---");
		console.log("antiguoRequerimiento-->" + antiguoRequerimiento + "<---");
		// si no ha habido cambio en los datos de requerimiento, preguntar 
		if(req == antiguoRequerimiento && req != CADENA_VACIA){
			console.log("sin cambios, mostrar dialogo...");
			
			var box = bootbox.confirm({
				message: "<p>¿Está seguro de mantener el mismo requerimiento?</p>",
			    size: 'medium',
			    centerVertical: true,
			    buttons: {
			        confirm: {
			            label: "Sí",
			            className: Boton.SUCCESS
			        },
					cancel: {
			            label: "No",
			            className: Boton.DANGER
			        }
			    },
				callback: function (result) {
					console.log("result 1er dialogo-->" + result);
					if(result == true){
						console.log("es true...llamando a b (el 2do dialogo)");
						validarAsunto(event);
					}
				}
			});
			
			box.on('hidden.bs.modal',function(){
				nroRequerimiento.select();
		    });

		}else{
			console.log("req tuvo cambios, no mostrar 1er dialogo!");
			console.log("mostrar 2do dialogo! b)");
			validarAsunto(event);
		}
	}else{
		console.log("en a...no es duplicar, lanzar d) y FIN!!! YEEEE");
		registrar(event);
	}
}

function validarAsunto(event){
	console.log("aqui en validarAsunto!!!");
	var asu = asunto.val().trim();
	console.log("asu-->" + asu + "<---");
	console.log("antiguoAsunto-->" + antiguoAsunto + "<---");
	// si no ha habido cambio en los datos de asunto, preguntar 
		
	if(asu == antiguoAsunto && asu != CADENA_VACIA){
		console.log("el asunto no cambió, ....mostrando 2do dialogo");
		var box = bootbox.confirm({
			message: "<p>¿Está seguro de mantener el mismo asunto?</p>",
		    size: 'medium',
		    centerVertical: true,
		    buttons: {
		        confirm: {
		            label: "Sí",
		            className: Boton.SUCCESS
		        },
				cancel: {
		            label: "No",
		            className: Boton.DANGER
		        }
		    },
			callback: function (result) {
				console.log("2do result-->" + result);
				if(result == true){
					console.log("true....llamando a d) y fin...")
					registrar(event);
				}
			}
		});
		
		box.on('hidden.bs.modal',function(){
			asunto.select();
	    });

	}else{
		console.log("el asunto cambió, d) y fin!!");
		registrar(event);
	}
}

function registrar(event){
	console.log("en registrar y CERRANDO!!!");
	if(estado.val() == EstadoDocumentoInicial.POR_APROBAR){
		registrarCotizacionVenta();
		
	} else {
		if(formObservaciones[0].checkValidity() == true) {
			actualizarCotizacionVenta();
		} else {
			console.log("validado FALSE!!!....")
        	event.stopPropagation();
		}
	}
	
	formObservaciones.addClass('was-validated');
}

function registrarCotizacionVenta(){
	console.log("registrarCotizacionVenta...entrando");
	var codCliente  		= codigoCliente.val().trim();
	var fConta 				= fecConta.datetimepicker('date').format('YYYY-MM-DD');
	var fHasta 				= fecHasta.datetimepicker('date').format('YYYY-MM-DD');
	var tipMoneda 			= tipoMoneda.val();
	var cPago 				= condPago.val();
	var diasCred			= null;
	console.log("condPago-->" + cPago)
	if(cPago == '02'){
		console.log("dentro del if, seteando dias")
		diasCred 				= dias.val();
	}
	var est 				= estado.val();
	var numRequerimiento  	= nroRequerimiento.val().trim().toUpperCase();
	var asun  				= asunto.val().trim().toUpperCase();
	var tc					= tipoCambio.val(); 
	var obs 				= observaciones.val().trim().toUpperCase();
	var numeroDocumentoRef	= nroDocReferencia.val() == 0 ? CADENA_VACIA : nroDocReferencia.val();
	var porcDctoTotal 		= null;
	if (chkDctoTotal.is(':checked')) {
		porcDctoTotal 		= dctoTotal.val().trim();
	}
	var subTotal 			= convertirMonedaANumero(subTotalCoti.val().trim());
	var dcto 				= convertirMonedaANumero(dctoCoti.val().trim() == '' ? '0' : dctoCoti.val().trim());
	var igv 				= convertirMonedaANumero(igvCoti.val());
	var total 				= convertirMonedaANumero(totalCoti.val().trim());
	// obteniendo la data de la tabla
	var detalle 			= tableToJSON(tableDetalle);
	console.log("******llegue hasta aqui.....");
	console.log("codigoCliente-------->" + codCliente);
    console.log("fecConta------------->" + fConta);
    console.log("fecHasta------------->" + fHasta);
    console.log("tipoMoneda----------->" + tipMoneda);
    console.log("condPago------------->" + cPago);
    console.log("dias----------------->" + diasCred);
    console.log("estado--------------->" + est);
    console.log("nroRequerimiento----->" + numRequerimiento);
    console.log("asunto--------------->" + asun);
	console.log("tc------------------->" + tc);
	console.log("observaciones-------->" + obs);
    console.log("numeroDocumentoRef--->" + numeroDocumentoRef);
    console.log("porcDctoTotal-------->" + porcDctoTotal);
    console.log("subTotal------------->" + subTotal);
    console.log("dcto----------------->" + dcto);
    console.log("igvCoti------------------>" + igv);
    console.log("totalCoti---------------->" + total);
    console.log("detalle-------------->" + detalle);
	
    var objetoJson = {
    		codigoCliente:  		codCliente,
    		fechaContabilizacion:   fConta,
    		fechaValidoHasta:       fHasta,
    		codigoTipoMoneda:     	tipMoneda,
			codigoCondPago:     	cPago,
			codigoDias:     		diasCred,
			codigoEstado:       	est,
			nroRequerimiento:  		numRequerimiento,
			asunto:  				asun,
			tipoCambio:				tc,
			observaciones:  		obs,
			numeroDocumentoRef:		numeroDocumentoRef,
			porcDctoTotal:			porcDctoTotal,	
			subTotal:  				subTotal,
			descuento:  			dcto,
			igv:  					igv,
			total:  				total,
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
        //cache: false,
        contentType: false,
        processData: false,
        url : '/appkahaxi/registrarCotizacionVenta/',
        //enctype: 'multipart/form-data',
        data: formData,										  
        beforeSend: function(xhr) {
        	console.log("registrarCotizacionVenta...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	console.log("registrarCotizacionVenta, success--->" + xhr.status);
        	console.log("resultado--->" + resultado);
        	//var resultado = JSON.parse(result);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("El registro fué grabado correctamente.", "success");
        		
				// despues de grabar, sólo mostramos el botón para enviar/descargar pdf
				mostrarControl(btnPdf);
				//mostrarControl(btnNuevo);
				mostrarControl(btnDuplicar);
				btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
				
				ocultarControl(btnGrabar);
				ocultarControl(btnLimpiar);					
				ocultarControl(btnAgregarArticulo);
				ocultarControl(btnEliminarTodosArticulos);
				
				deshabilitarControl(campoBuscar);
				//deshabilitarControl('.datetimepicker-input');
				deshabilitarControl(dateTimePickerInput);
				
				deshabilitarControl(tipoMoneda);
				deshabilitarControl(condPago);
				deshabilitarControl(dias);
				deshabilitarControl(chkDctoTotal);
				deshabilitarControl(dctoTotal);
				
				habilitarControl(estado);
				
				deshabilitarControl(nroRequerimiento);
				deshabilitarControl(asunto);
				deshabilitarControl(observaciones);
				
				deshabilitarDetalleCotizacion();
				
				codigo.html(resultado);
				numeroDocumento.text(resultado);
	
				window.scrollTo(0, 0);
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("registrarCotizacionVenta, Accepted....");
            	mostrarMensajeError(resultado);
            }
        	
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("registrarCotizacionVenta, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });
}

function actualizarCotizacionVenta(){
	console.log("actualizarCotizacionVenta...entrando");
	var nroDocumento  		= codigo.html();
	var estadoVal 			= estado.val();
	var observacionesVal 	= observaciones.val().trim();
	var numRequerimiento  	= nroRequerimiento.val().trim().toUpperCase();
	var asun  				= asunto.val().trim().toUpperCase();
	
	console.log("nroDocumento--------->" + nroDocumento);
	console.log("estado--------------->" + estadoVal);
    console.log("observaciones-------->" + observacionesVal);
	console.log("numRequerimiento----->" + numRequerimiento);
    console.log("asun----------------->" + asun);
    
	var objetoJson = {
    		numeroDocumento:		nroDocumento,
    		codigoEstado:       	estadoVal,
			observaciones:  		observacionesVal,
			nroRequerimiento:  		numRequerimiento,
			asunto:  				asun,
    };

    var entityJsonStr = JSON.stringify(objetoJson);
    console.log("entityJsonStr-->" + entityJsonStr);
    var formData = new FormData();
    formData.append('registro', new Blob([entityJsonStr], {
        type: "application/json"
    }));
    
    
    $.ajax({
        type:"POST",
        //cache: false,
        contentType: false,
        processData: false,
        url : '/appkahaxi/actualizarCotizacionVenta/',
        //enctype: 'multipart/form-data',
        data: formData,										  
        beforeSend: function(xhr) {
        	console.log("actualizarCotizacionVenta...beforesend, loading.....");
        	loadding(true);
        },
        success:function(resultado,textStatus,xhr){
        	//console.log("registrarCotizacionVenta, success--->" + xhr.status);
        	console.log("resultado--->" + resultado);
        	//var resultado = JSON.parse(result);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		mostrarNotificacion("El registro fué actualizado correctamente.", "success");
				
				if(estado.val() == EstadoDocumentoInicial.APROBADO) {
					mostrarControl(btnGenerarOV);
					mostrarControl(btnPdf);
					mostrarControl(btnDuplicar);
        			ocultarControl(btnGrabar);
					btnDuplicar.removeClass('btn-flotante-duplicar').addClass('btn-flotante-grabar');
				
					ocultarControl(btnLimpiar);
					deshabilitarControl(estado);
					deshabilitarControl(nroRequerimiento);
					deshabilitarControl(asunto);
					
					controlNoRequerido(observaciones);
					deshabilitarControl(observaciones);
					
					window.scrollTo(0, 0);

				} else {
					volver();
				}

            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("actualizarCotizacionVenta, Accepted....");
            	mostrarMensajeError(resultado);
            }
        	
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("registrarCotizacionVenta, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });
}

function tableToJSON(dataTable){
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
				if($($headers[cellIndex]).attr('id') == 'precioUnitario'  || $($headers[cellIndex]).attr('id') == 'precioUnitarioIgv' ||
				   $($headers[cellIndex]).attr('id') == 'precioReferencia' || $($headers[cellIndex]).attr('id') == 'precioConDcto' || 
				   $($headers[cellIndex]).attr('id') == 'subTotal' || $($headers[cellIndex]).attr('id') == 'subTotalIgv'){
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

function generarPdf(event){
	var nroDocumento = codigo.html();
	var correo = email.val();
	var box = bootbox.dialog({
	    title: 'Enviar correo o descargar cotización',
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
		url : '/appkahaxi/enviarEmailReporteCotizacionesVenta',
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
        url : '/appkahaxi/reporteCotizacionesVenta/' + numeroDocumento + '/' + enviarCodigo,
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
	        	calcularResumenCotizacion();	        	
	        }
	    }
	});
}

function mostrarDialogoEliminarTodo(table){
	
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
	        if(result == true){
	        	table.clear().draw();
				indiceFilaDataTableDetalle = -1;
				
				calcularResumenCotizacion();
				ocultarControl(btnEliminarTodosArticulos);
	        }
	    }
	});
}

function generarOrdenVenta(){
	var params;
	var nroDoc = numeroDocumento.text();
	var dato 	= datoBuscar.text();
	var nroCotiz = nroCotizacion.text();
	var nroRequerimiento = nroReq.text();
	var codRpto = codRepuesto.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();
	alert("nroDoc-->" + nroDoc);
	alert("nroCotiz-->" + nroCotiz);
	
	// aquí viaja el nro de la cotización del documento actual
	params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.NUEVO + 
		// a partir de aquí son los filtros que se arrastran de la pantalla de búsqueda de cotizaciones
		"&datoBuscar=" + dato +
		"&nroCotizacion=" + nroCotiz + "&nroRequerimiento=" + nroRequerimiento + "&codRepuesto=" + codRpto +
		"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + 
		// indica que se debe VOLVER a la cotización desde la OV
		"&volver=" + Respuesta.SI + 
		// indica que se está yendo a la página de OV desde una cotización
		"&desdeDocRef=" + Respuesta.SI + 
		// indica que no se va desde la pantalla de mantenimiento de cotizaciones
		"&origenMnto=" + Respuesta.NO;
	window.location.href = "/appkahaxi/nueva-orden-venta?" + params;
}

function irOrdenVenta(){
	var params;
	var nroDoc = numeroDocumento.text();
	var dato 	= datoBuscar.text();
	var nroCotiz = nroCotizacion.text();
	var nroRequerimiento = nroReq.text();
	var codRpto = codRepuesto.text();
	var fecDesde = fechaDesde.text();
	var fecHasta = fechaHasta.text();
	var estParam = estadoParam.text();
	alert("nroDoc-->" + nroDoc);
	alert("nroCotiz-->" + nroCotiz);
	
	// aquí viaja el nro de la cotización del documento actual
	params = "numeroDocumento=" + nroDoc + "&opcion=" + Opcion.VER + 
		// a partir de aquí son los filtros que se arrastran de la pantalla de búsqueda de cotizaciones
		"&datoBuscar=" + dato +
		"&nroCotizacion=" + nroCotiz + "&nroRequerimiento=" + nroRequerimiento + "&codRepuesto=" + codRpto +
		"&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + 
		// indica que se debe VOLVER a la cotización desde la OV
		"&volver=" + Respuesta.SI + 
		// indica que se está yendo a la página de OV desde una cotización
		"&desdeDocRef=" + Respuesta.SI + 
		// indica que no se va desde la pantalla de mantenimiento de cotizaciones
		"&origenMnto=" + Respuesta.NO;
	window.location.href = "/appkahaxi/nueva-orden-venta?" + params;
}

function nuevaCotizacionVenta(){
	var params;
	// armando los parámetros
	params = "numeroDocumento=&opcion=&datoBuscar=&nroCotizacion=&nroRequerimiento=&codRepuesto=&fechaDesde=&fechaHasta=&estadoParam=&volver=0";
	window.location.href = "/appkahaxi/nueva-cotizacion?" + params;
}

function volver(){
	var params;
	var dato 		= datoBuscar.text();
	var nroCotiz 	= nroCotizacion.text();
	var numReq 		= nroReq.text();
	var codRpto 	= codRepuesto.text();
	var fecDesde 	= fechaDesde.text();
	var fecHasta 	= fechaHasta.text();
	var estParam	= estadoParam.text();
	// armando los parámetros
	params = "datoBuscar=" + dato + "&nroCotizacion=" + nroCotiz + "&nroRequerimiento=" + numReq + "&codRepuesto=" + codRpto + 
			 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
	window.location.href = "/appkahaxi/mantenimiento-cotizacion?" + params;
}
/*
function reiniciarFechaHasta(){
	console.log("reiniciarFechaHasta...inicio");
	
	fecHasta.datetimepicker('maxDate', moment());
	fecHasta.datetimepicker('minDate', moment());
	
	fecHasta.datetimepicker('maxDate', false);
	fecHasta.datetimepicker('minDate', false);
	
	console.log("fin...");
}
*/
function limpiarCotizacion(){
	//inicializarFechaContaHasta();
	
	tipoMoneda.val(Moneda.DOLARES);
	evaluarCambioTipoMoneda();
	condPago.val(CondicionPago.CONTADO);
	dias.val(Dias._30);
	ocultarControl(divDias);
	estado.val(EstadoDocumentoInicial.POR_APROBAR);
	//uncheckControl(chkDctoTotal);
	//dctoTotal.val(CADENA_VACIA);
	//deshabilitarControl(dctoTotal);
	
	/*
	dctoTotal.val(CADENA_VACIA);
	subTotalCoti.val(CADENA_VACIA);
	dctoCoti.val(CADENA_VACIA);
	igvCoti.val(CADENA_VACIA);
	totalCoti.val(CADENA_VACIA);
	*/
	nroRequerimiento.val(CADENA_VACIA);
	asunto.val(CADENA_VACIA);
	observaciones.val(CADENA_VACIA);
	/*
	dataTableDetalle.clear().draw();
	indiceFilaDataTableDetalle = -1;
	ocultarControl(dctoCotiDiv);	
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);
	*/
	
	fecHasta.datetimepicker('destroy');
	fecConta.datetimepicker('destroy');
	
	construirFechasPicker();
	inicializarFechas();
		
	formCotizacion.removeClass('was-validated');
	formObservaciones.removeClass('was-validated');
	
	nroRequerimiento.focus();
}


/********************* CALCULOS NUMERICOS ********************/

function calcularResumenCotizacion(){
	var subTotal = 0;
	var parcial = 0;
	var dcto = 0;
	console.log("$$indiceFilaDataTableDetalle--->" + indiceFilaDataTableDetalle);
	
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
					console.log("es string, convertir XD");
					parcial = convertirMonedaANumero(parcial);
				}
				subTotal = Number(subTotal) + Number(parcial);
			}

		});

	});
	
	// 2. AHORA calculamos el DCTO en función al check
	// si el check está habilitado, aplicamos dcto total ingresado
	if (chkDctoTotal.is(':checked')) {
		console.log('is checked-->');
		// obtenemos el dcto total ingresado
		var descTotal = Number(dctoTotal.val());
		console.log('dctoTotal-->' + descTotal);
		// 2.1. aplicamos el dcto al subTotal obtenido
		if(descTotal != CADENA_VACIA && descTotal != 0){
			dcto = subTotal * (descTotal/100);
		}
	}
	
	// 3. hacemos los cáculos del SUBTOTAL, IGV y TOTAL de la cotización
	var subTotalConDcto = subTotal - dcto;
	var igv = subTotalConDcto * (ParametrosGenerales.IGV/100);
	var total = subTotalConDcto + igv;
	
	// 4. mostramos los resultados
	subTotalCoti.val(convertirNumeroAMoneda(subTotal));
	dctoCoti.val(convertirNumeroAMoneda(dcto));
	igvCoti.val(convertirNumeroAMoneda(igv));
	totalCoti.val(convertirNumeroAMoneda(total));
}

function calcularActivarDctoTotal(){
	// 1. calcular la suma totalCoti de cantidad*precio
	var cantidad;
	var precio;
	var subTotal;
	
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			// 1.1 recalculando el subtotal x cada fila
			if($($headers[cellIndex]).attr('id') == 'cantidad') {
				cantidad = Number($(this).find("input").val());
			}
			if($($headers[cellIndex]).attr('id') == 'precioUnitario') {
				precio = Number($(this).find("input").val());
			}
			
			if($($headers[cellIndex]).attr('id') == 'subTotal') {
				subTotal = cantidad * precio;
				$(this).find("input").val(convertirNumeroAMoneda(subTotal));
			}
			
			// 1.2 deshabilitar el campo dcto x cada fila
			if($($headers[cellIndex]).attr('id') == 'porcentajeDcto') {
				habilitarControlSoloLectura(null, $(this).find("input"));
				$(this).find("input").addClass("atenuar-input-disabled");
			}
			
			if($($headers[cellIndex]).attr('id') == 'precioConDcto') {
				$(this).find("input").addClass("atenuar-input-disabled");
			}
			
		});
	});
	
	calcularResumenCotizacion();
}

function calcularDesactivarDctoTotal(){
	// 1. calcular la suma totalCoti de cantidad*precio
	var cantidad;
	var precio;
	var subTotal;
	var dcto;
	
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			// 1.1 recalculando el subtotal x cada fila
			if($($headers[cellIndex]).attr('id') == 'cantidad') {
				cantidad = Number($(this).find("input").val());
			}
			if($($headers[cellIndex]).attr('id') == 'precioUnitario') {
				precio = Number($(this).find("input").val());
			}
			
			if($($headers[cellIndex]).attr('id') == 'subTotal') {
				subTotal = cantidad * precio;
				subTotal = subTotal - (subTotal * dcto/100);
				$(this).find("input").val(convertirNumeroAMoneda(subTotal));
			}
			
			// 1.2 deshabilitar el campo dcto x cada fila
			if($($headers[cellIndex]).attr('id') == 'porcentajeDcto') {
				dcto = Number($(this).find("input").val());
				deshabilitarControlSoloLectura(null, $(this).find("input"));
				$(this).find("input").removeClass("atenuar-input-disabled");
			}
			
			if($($headers[cellIndex]).attr('id') == 'precioConDcto') {
				$(this).find("input").removeClass("atenuar-input-disabled");
			}
			
		});
	});
	
	calcularResumenCotizacion();
}

function convertirMontosASoles(){
	console.log("convertirMontosASoles.....");
	var tc = Number(tipoCambio.val());
	var nvoPrecio;
	var nvoPrecioRef;
	var nvoPrecioDcto;
	var nvoSubTotal;
	var subTotal;
	var subTotalIgv;
	var dcto;
	var igv;
	var total;
	
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			if($($headers[cellIndex]).attr('id') == 'precioUnitario') {
				nvoPrecio = Number(convertirMonedaANumero($(this).find("input").val())) * tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoPrecio));
			}
			if($($headers[cellIndex]).attr('id') == 'precioReferencia') {
				nvoPrecioRef = Number(convertirMonedaANumero($(this).find("input").val())) * tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoPrecioRef));
			}
			if($($headers[cellIndex]).attr('id') == 'precioConDcto') {
				nvoPrecioDcto = Number(convertirMonedaANumero($(this).find("input").val())) * tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoPrecioDcto));
			}
			if($($headers[cellIndex]).attr('id') == 'subTotal') {
				nvoSubTotal = Number(convertirMonedaANumero($(this).find("input").val())) * tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoSubTotal));
			}
			if($($headers[cellIndex]).attr('id') == 'subTotalIgv') {
				subTotalIgv = Number(convertirMonedaANumero($(this).find("input").val())) * tc;
				$(this).find("input").val(convertirNumeroAMoneda(subTotalIgv));
			}
			
		});
	});
	
	subTotal = Number(convertirMonedaANumero(subTotalCoti.val())) * tc;
	dcto = Number(convertirMonedaANumero(dctoCoti.val())) * tc;
	igv = Number(convertirMonedaANumero(igvCoti.val())) * tc;
	total = Number(convertirMonedaANumero(totalCoti.val())) * tc;
	
	subTotalCoti.val(convertirNumeroAMoneda(subTotal));
	dctoCoti.val(convertirNumeroAMoneda(dcto));
	igvCoti.val(convertirNumeroAMoneda(igv));
	totalCoti.val(convertirNumeroAMoneda(total));
}

function convertirMontosADolares(){
	console.log("convertirMontosADolares.....");
	var tc = Number(tipoCambio.val());
	var nvoPrecio;
	var nvoPrecioRef;
	var nvoPrecioDcto;
	var nvoSubTotal;
	var subTotal;
	var subTotalIgv;
	var dcto;
	var igv;
	var total;
	
	var $headers = tableDetalle.find("th").not(':first').not(':last');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first').not(':last');

		$cells.each(function(cellIndex) {
			if($($headers[cellIndex]).attr('id') == 'precioUnitario') {
				nvoPrecio = Number(convertirMonedaANumero($(this).find("input").val())) / tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoPrecio));
			}
			if($($headers[cellIndex]).attr('id') == 'precioReferencia') {
				nvoPrecioRef = Number(convertirMonedaANumero($(this).find("input").val())) / tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoPrecioRef));
			}
			if($($headers[cellIndex]).attr('id') == 'precioConDcto') {
				nvoPrecioDcto = Number(convertirMonedaANumero($(this).find("input").val())) / tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoPrecioDcto));
			}
			if($($headers[cellIndex]).attr('id') == 'subTotal') {
				nvoSubTotal = Number(convertirMonedaANumero($(this).find("input").val())) / tc;
				$(this).find("input").val(convertirNumeroAMoneda(nvoSubTotal));
			}
			if($($headers[cellIndex]).attr('id') == 'subTotalIgv') {
				subTotalIgv = Number(convertirMonedaANumero($(this).find("input").val())) / tc;
				$(this).find("input").val(convertirNumeroAMoneda(subTotalIgv));
			}
		});
	});
	
	subTotal = Number(convertirMonedaANumero(subTotalCoti.val())) / tc;
	dcto = Number(convertirMonedaANumero(dctoCoti.val())) / tc;
	igv = Number(convertirMonedaANumero(igvCoti.val())) / tc;
	total = Number(convertirMonedaANumero(totalCoti.val())) / tc;
	
	subTotalCoti.val(convertirNumeroAMoneda(subTotal));
	dctoCoti.val(convertirNumeroAMoneda(dcto));
	igvCoti.val(convertirNumeroAMoneda(igv));
	totalCoti.val(convertirNumeroAMoneda(total));
}