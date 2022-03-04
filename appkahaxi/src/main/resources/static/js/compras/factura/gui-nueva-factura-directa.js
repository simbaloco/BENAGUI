var indiceFilaDataTableDetalle = -1;
//**************************************************************** */
var titulo;
var codigo;
var codigoProv;
var email;
var celular;
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
var desdeDocRef;

var formFactura;
var formObservaciones;

var documentoProv;
var nombreProv;
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

var tableDetalle;
var tableNuevoDetalle;

var observaciones;
var subTotalFactura;
var igvFactura;
var totalFactura;

var btnGrabar;
var btnNuevo;
var btnVolver;

var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalleDuplicado;

var campoBuscar;
var estadoPago;
var btnAgregarArticulo;
var btnEliminarTodosArticulos;

var dateTimePickerInput;
var valorIGV;
var lblAnulado;

var limpiarVolver = false;

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	titulo =  $("#titulo");
	codigo = $("#codigo");
	codigoProv = $("#codigoProv");
	email =  $("#email");
	celular =  $("#celular");
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
	desdeDocRef = $("#desdeDocRef");
	
	formFactura = $("#formFactura");
	documentoProv = $("#documentoProv");
	nombreProv = $("#nombreProv");
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
	btnVolver =  $("#btnVolver");
	
	btnAgregarArticulo = $("#btnAgregarArticulo");
	btnEliminarTodosArticulos = $("#btnEliminarTodosArticulos");
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalFactura = $("#subTotalFactura");
	igvFactura = $("#igvFactura");
	totalFactura = $("#totalFactura");

	btnGrabar = $("#btnGrabar");
	btnNuevo = $("#btnNuevo");
	
	campoBuscar = $("#campoBuscar");
	estadoPago = $("#estadoPago");
	
	dateTimePickerInput = $(".datetimepicker-input");
	lblAnulado = $("#lblAnulado");
}

function inicializarComponentes() {

	habilitarAnimacionAcordion();
	habilitarMarquee();
	construirFechasPicker();
	restringirSeleccionFechas();
	habilitarAutocompletarBuscarCampos();
	
	inicializarEventos();
}

function inicializarPantalla() {
	if(opcion.text() == Opcion.NUEVO) {
		inicializarTablaDetalle(true);
		inicializarFechas();
		cargarPantallaNueva();
	}else {
		inicializarTablaDetalle(false);
		cargarPantallaConDatosFactura();
	}

}

function construirFechasPicker() {

	fecConta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		//defaultDate:	new Date(),
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
					// loadding(false);
				},
				error: function (xhr, error, code){

					mostrarMensajeError(xhr.responseText);
					//loadding(false);
				}
			});
		},

		minLength: 3,
		select: function(event, ui) {
			event.preventDefault();
	    	
			codigoProv.val(ui.item.codigoSocio);
			documentoProv.val(ui.item.numeroDocumento);
			nombreProv.val(ui.item.nombreRazonSocial);
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

function inicializarEventos() {
	
	$('#tableDetalle tbody').on('click','.btn-delete', function () {
		mostrarDialogoEliminarFila(dataTableDetalle, $(this));
	});

	$('.readonly').keydown(function(e){
		e.preventDefault();
	});

	$('.sinCaracteresEspeciales').keypress(function(e){
		return sinCaracteresEspeciales(e);
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
	
	btnNuevo.click(function(){
    	nuevaFacturaDirecta();
	});
	
	btnVolver.click(function() {
		volver(false);
	});
		
	condPago.on('change', function(){
		evaluarCambioCondicionPago();
	});

	estadoPago.on('change', function(){
		evaluarCambioEstadoPago();
	});

	tipoMoneda.on('change', function(){
		evaluarCambioTipoMoneda();
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

	btnEliminarTodosArticulos.on("click", function() {
		mostrarDialogoEliminarTodo();
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
	fecConta.datetimepicker('date', moment());
	fecConta.datetimepicker('maxDate', moment());
	fecDocumento.datetimepicker('date', moment());
	fecVencimiento.datetimepicker('date', moment());
}

function cargarPantallaNueva() {
	//obtenerTipoCambio(tipoCambio);

	controlNoRequerido(observaciones);
	titulo.text("NUEVA");
	dias.val(Dias._30);
	
	var volver = volverParam.text();
	if(volver == Respuesta.SI){
		mostrarControl(btnVolver);
	}
	
	campoBuscar.focus();
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
				
				dataTableDetalle.destroy();
				inicializarTablaDetalle(true);
			}

			loadding(false);
			window.scrollTo(0, 0);
		},
		error: function (xhr, error, code){

			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});

}

function cargarPantallaHTMLFactura(data) {

	codigoProv.val(data.codigoProv);
	documentoProv.val(data.nroDocProv);
	nombreProv.val(data.nombreProv);
	direccion.val(data.direccionFiscal);
	email.val(data.email);
	celular.val(data.celular);
	tipoMoneda.val(data.codigoTipoMoneda);
	condPago.val(data.codigoCondPago);
	dias.val(data.codigoDias);
	serie.val(data.serie);
	correlativo.val(data.correlativo);
	estadoPago.val(data.codigoEstadoPago);
	tipoCambio.val(data.tipoCambio);
	observaciones.val(data.observaciones);
	
	subTotalFactura.val(convertirNumeroAMoneda(data.subTotal));
    igvFactura.val(convertirNumeroAMoneda(data.igv));
    totalFactura.val(convertirNumeroAMoneda(data.total));

	cantidadDetalleDuplicado = data.detalle.length;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		agregarFilaEnTablaDetalle(data);

		var detalle = data.detalle[i];
		
		$('#codigo_' + i).val(detalle.codArticulo);
    	$('#descCodigo_' + i).val(detalle.codEstandar);
    	$('#descripcion_' + i).val(detalle.descripcionArticulo);
    	$('#marca_' + i).val(detalle.marca);
    	$('#almacen_' + i).val(detalle.codAlmacen);
		$('#cantidad_' + i).val(detalle.cantidad);
		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
	}
}

function verPantallaFactura(data) {

	titulo.text("VER");
	codigo.html(numeroDocumento.text());

	fecConta.datetimepicker('date', moment(data.fechaContabilizacion));
	fecDocumento.datetimepicker('date', moment(data.fechaDocumento));
	fecVencimiento.datetimepicker('date', moment(data.fechaEntrega));

	deshabilitarControl(campoBuscar);
	deshabilitarControl(dateTimePickerInput);
	deshabilitarControl(tipoMoneda);

	if(data.codigoEstado == EstadoFactura.GENERADO){
		if(estadoPago.val() == EstadoPago.PAGADO) {
			deshabilitarControl(estadoPago);
			ocultarControl(btnAnular);
		} else {
			habilitarControl(estadoPago);
			mostrarControl(btnAnular);
		}
	}else{
		// estado ANULADO
		deshabilitarControl(estadoPago);
		mostrarControl(lblAnulado);
	}
	mostrarControl(btnVolver);
	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	deshabilitarControl(serie);
	deshabilitarControl(correlativo);
	deshabilitarControl(observaciones);

	ocultarControl(btnGrabar);
	ocultarControl(btnLimpiar);
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);

	deshabilitarDetalleFactura();
}

function deshabilitarDetalleFactura(){

	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			habilitarControlSoloLectura($(this).find(".buscar-det"));
			habilitarControlSoloLectura($(this).find(".codigo-det"));
			habilitarControlSoloLectura($(this).find(".desc-det"));
			habilitarControlSoloLectura($(this).find(".marca-det"));
			deshabilitarControl($(this).find(".almacen_table"));
			habilitarControlSoloLectura($(this).find(".cantidad-det"));
			habilitarControlSoloLectura($(this).find(".precio-det"));
			
			deshabilitarControl($(this).find(".btn-delete"));
		});
	});	

}

function agregarFilaEnTablaDetalle(data) {

	var filaHTML = tableNuevoDetalle.find("tr")[0].outerHTML;
	var fila = dataTableDetalle.row.add($(filaHTML)).draw(false);

	indiceFilaDataTableDetalle = fila.index();

	agregarFilaHTMLEnTablaDetalle(data);

	if(indiceFilaDataTableDetalle > 0) {
		mostrarControl(btnEliminarTodosArticulos);
		mostrarControl(btnAgregarArticulo);
	}
}

function agregarFilaHTMLEnTablaDetalle(data) {
	agregarHTMLColumnasDataTable(data);
	// poniendo el símbolo de moneda que corresponde (sólo para el caso de SOLES)
	var tipoMonedaValor = tipoMoneda.val();
	if(tipoMonedaValor == Moneda.SOLES){
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}
	
	$('#buscarArticulo_' + indiceFilaDataTableDetalle).focus();
}

function agregarHTMLColumnasDataTable(data) {

	var row = tableDetalle.DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");

	var $tds = row.find("td").not(':first').not(':last');

	$.each($tds, function(i, el) {

		switch(i) {

			// buscar artículo
			case 0:		$(this).html(CADENA_VACIA).append(
									"<div>" + 
			    						"<input class='form-control buscar-det' type='text' " + 
										"onkeyup='buscarArticuloKeyUp(event, this, " + indiceFilaDataTableDetalle + ");' maxlength='50' " + 
										"id='buscarArticulo_" + indiceFilaDataTableDetalle + "'>" +
			    					"</div>");
						break;
    		
			// CODIGO ART (OCULTO)
			case 1:		$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// DESCRIPCION CODIGO ART
			case 2:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control codigo-det' type='text' id='descCodigo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;	
						
			// DESCRIPCION ART
			case 3:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control desc-det' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
					break;

			// MARCA ART
			case 4:	$(this).html(CADENA_VACIA).append("<input class='marquee form-control marca-det' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
					break;

			// ALMACEN
			case 5:	$(this).html(CADENA_VACIA).append(
					"<div>" + 
						$(".almacen-hidden").html().replace('reemplazar', 'almacen_' + indiceFilaDataTableDetalle) + 
					"</div>");
					// cargando el valor por defecto (si existe)
					if(data != UNDEFINED){
						$('#almacen_' + indiceFilaDataTableDetalle).val(data.detalle[indiceFilaDataTableDetalle].codAlmacen);	
					}
					break;

			// CANTIDAD
			case 6:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad-det' type='text' " + 
						"onkeyup='cantidadKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
						"onkeydown='cantidadKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
						"onkeypress='return soloEnteros(event);' readonly='readonly' " +
						"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
					break;

			// PRECIO UNITARIO
			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
						"<input class='form-control alineacion-derecha precio-det' type='number' maxlength='13' " +
							"onkeyup='precioKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
							"onkeypress='return soloDecimales(event, this);' " +
							"onchange='precioKeyUp(this, " + indiceFilaDataTableDetalle + ");'  readonly='readonly' " + 
							"onkeydown='precioKeyDown(event, " + indiceFilaDataTableDetalle + ")' " +
							"id='precio_" + indiceFilaDataTableDetalle + "'>" +
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
	window.scrollTo(0, document.body.scrollHeight);
}


/**************** EVENTOS DETALLE *******************/

function buscarArticuloKeyUp(e, control, fila){
	var codCliente = codigoProv.val();
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

			console.log(" item.precioVentaUnitario;:"+ item.precioVentaUnitario);
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
				//var precio;
				var tc = tipoCambio.val();
				
				deshabilitarControlSoloLectura(null, '#cantidad_' + fila);
				deshabilitarControlSoloLectura(null, '#precio_' + fila);
				
				var tipMoneda = tipoMoneda.val();
				if(tipMoneda == Moneda.SOLES){
					precio 		= ui.item.precioVentaUnitario * tc;
					//$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
				}else{
					precio 		= ui.item.precioVentaUnitario;
					//$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
				}
				
				$('#precio_' + fila).val(convertirNumeroAMoneda(precio));
				$('#precio_' + fila).prop('min', precio);
				
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

function cantidadKeyUp(control, fila) {

	var cantidad = Number(control.value);
	var precio = Number($('#precio_' + fila).val());		
	var subTotal = cantidad * precio;
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV/100));
	
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	
	calcularResumenFactura();

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
	var subTotalIgv = subTotal + (subTotal * (ParametrosGenerales.IGV/100));
	
	$('#subTotalIgv_' + fila).val(convertirNumeroAMoneda(subTotalIgv));
	$('#subTotal_' + fila).val(convertirNumeroAMoneda(subTotal));
	
	calcularResumenFactura();
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
		controlRequerido(dias);
		mostrarControl(divDias);
	}else{
		controlNoRequerido(dias);
		ocultarControl(divDias);
	}
}

function evaluarCambioTipoMoneda() {
	var tipoMonedaVal = tipoMoneda.val();

	if(tipoMonedaVal == Moneda.SOLES) {
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
		convertirMontosASoles();
	}else{
		$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
		convertirMontosADolares();
	}
}

function evaluarCambioEstadoPago() {
	var estadoPagoVal = estadoPago.val();

	if(estadoPagoVal == EstadoPago.PAGADO){
		ocultarControl(btnAnular);
		mostrarControl(btnGrabar);
	} else{
		if (codigo.html() != CADENA_VACIA || codigo.html() > 0){
			mostrarControl(btnAnular);
			ocultarControl(btnGrabar);
		}else{
			mostrarControl(btnGrabar);
			ocultarControl(btnAnular);
		}		
	}
}

function grabarFactura() {
	if(documentoProv.val() == ''){
		mostrarDialogoInformacion("Debe buscar un proveedor", Boton.WARNING, $('#campoBuscar'));
		return false;
	}

	if (formFactura[0].checkValidity() === true) {
		
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
	var precio;
	var flag = false;
	var exitEach = false;
	var exitIterator = false;
		
	// verificando que se hayan ingresado por lo menos un item al detalle de la factura
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
					}else if(convertirMonedaANumero(cantidad) == 0){
						mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $(this).find("input"));
						exitEach = true;
						return false;
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
					}else if(convertirMonedaANumero(precio) == 0){
						mostrarDialogoInformacion('Debe ingresar un precio mayor a cero.', Boton.WARNING, $(this).find("input"));
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
	var serieVal 				= serie.val();
	var correlativoVal 			= correlativo.val();
	var codigoProvVal  			= codigoProv.val().trim();
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
		serie:					serieVal,
		correlativo:			correlativoVal,
		codigoProv:  			codigoProvVal,
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
				
				codigo.html(resultado);

				deshabilitarControl(serie);
				deshabilitarControl(correlativo);
				deshabilitarControl(estadoPago);

				deshabilitarControl(tipoMoneda);
				deshabilitarControl(condPago);
				deshabilitarControl(dias);

				deshabilitarControl(dateTimePickerInput);

				mostrarControl(btnNuevo);
				
				ocultarControl(btnGrabar);
				ocultarControl(btnLimpiar);
					
				if(codigoEstadoPagoVal == EstadoPago.PENDIENTE) {
					habilitarControl(observaciones);
					habilitarControl(estadoPago);
					mostrarControl(btnAnular);
					// si se grabó con estado PENDIENTE, cambiar a opción = VER
					opcion.text(Opcion.VER); 
				} else {
					// CANCELADO
					deshabilitarControl(observaciones);
					ocultarControl(btnAnular);
					limpiarVolver = true;
				}

				deshabilitarDetalleFactura();

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
				
				volver(true);

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
				calcularResumenFactura();
			}
		}
	});
}

function mostrarDialogoEliminarTodo() {

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
				dataTableDetalle.clear().draw();
				indiceFilaDataTableDetalle = -1;

				calcularResumenFactura();
				ocultarControl(btnEliminarTodosArticulos);
			}
		}
	});
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

				volver(true);

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

function nuevaFacturaDirecta(){
	var params;
	var dato 		= datoBuscar.text();
	var nroFact 	= nroComprobantePago.text();
	var nroOC 		= nroOrdenCompra.text();
	var codRpto 	= codRepuesto.text();
	var fecDesde 	= fechaDesde.text();
	var fecHasta 	= fechaHasta.text();
	var estParam	= estadoParam.text();
	var desDocRef 	= desdeDocRef.text();
	
	var volver = volverParam.text();
	console.log("volver: "+volver);
	if(volver == Respuesta.SI){
		// armando los parámetros
		params = "numeroDocumento=&opcion=&datoBuscar=" + dato +  
			 	 "&nroComprobantePago=" + nroFact + "&nroOrdenCompra=" + nroOC + "&codRepuesto=" + codRpto +
			 	 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam + "&volver=" + Respuesta.SI + "&desdeDocRef=" + desDocRef;
	}else{
		params = "numeroDocumento=&opcion=&datoBuscar=&nroComprobantePago=" + 
				 "&nroOrdenCompra=&codRepuesto=&fechaDesde=&fechaHasta=&estadoParam=&volver=0&desdeDocRef=";
	}
	
	console.log("cargarFactura---> params:" + params);
	window.location.href = "/appkahaxi/nueva-factura-compra-directa?" + params;
}

function volver(listadoTotal){
	var params;
	var dato 		= datoBuscar.text();
	var nroFact 	= nroComprobantePago.text();
	var nroOC 		= nroOrdenCompra.text();
	var codRpto 	= codRepuesto.text();
	var fecDesde 	= fechaDesde.text();
	var fecHasta 	= fechaHasta.text();
	var estParam	= estadoParam.text();

	if(listadoTotal == true || limpiarVolver == true){
		params = "datoBuscar=&nroComprobantePago=&nroOrdenCompra=&codRepuesto=&fechaDesde=&fechaHasta=&estadoParam=";
	}else{
		params = "datoBuscar=" + dato + "&nroComprobantePago=" + nroFact + "&nroOrdenCompra=" + nroOC + "&codRepuesto=" + codRpto +  
			 	 "&fechaDesde=" + fecDesde + "&fechaHasta=" + fecHasta + "&estadoParam=" + estParam;
	}
	
	window.location.href = "/appkahaxi/mantenimiento-factura-compra?" + params;
}

function limpiarFactura() {
	inicializarFechas();

	campoBuscar.val(CADENA_VACIA);
	documentoProv.val(CADENA_VACIA);
	nombreProv.val(CADENA_VACIA);
	direccion.val(CADENA_VACIA);
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	estadoPago.val(EstadoPago.PENDIENTE);
	condPago.val(CondicionPago.CONTADO);
	tipoMoneda.val(Moneda.DOLARES);
	observaciones.val(CADENA_VACIA);
	
	subTotalFactura.val(CADENA_VACIA);
	igvFactura.val(CADENA_VACIA);
	totalFactura.val(CADENA_VACIA);

	dataTableDetalle.clear().draw();
	indiceFilaDataTableDetalle = -1;

	ocultarControl(divDias);
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);

	formFactura.removeClass('was-validated');

	campoBuscar.focus();
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

function convertirMontosASoles(){
	console.log("convertirMontosASoles.....");
	var tc = Number(tipoCambio.val());
	var nvoPrecio;
	var nvoSubTotal;
	var subTotal;
	var subTotalIgv;
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
	
	subTotal = Number(convertirMonedaANumero(subTotalFactura.val())) * tc;
	igv = Number(convertirMonedaANumero(igvFactura.val())) * tc;
	total = Number(convertirMonedaANumero(totalFactura.val())) * tc;
	
	subTotalFactura.val(convertirNumeroAMoneda(subTotal));
	igvFactura.val(convertirNumeroAMoneda(igv));
	totalFactura.val(convertirNumeroAMoneda(total));
}

function convertirMontosADolares(){
	console.log("convertirMontosADolares.....");
	var tc = Number(tipoCambio.val());
	var nvoPrecio;
	var nvoSubTotal;
	var subTotal;
	var subTotalIgv;
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
	
	subTotal = Number(convertirMonedaANumero(subTotalFactura.val())) / tc;
	igv = Number(convertirMonedaANumero(igvFactura.val())) / tc;
	total = Number(convertirMonedaANumero(totalFactura.val())) / tc;
	
	subTotalFactura.val(convertirNumeroAMoneda(subTotal));
	igvFactura.val(convertirNumeroAMoneda(igv));
	totalFactura.val(convertirNumeroAMoneda(total));
}