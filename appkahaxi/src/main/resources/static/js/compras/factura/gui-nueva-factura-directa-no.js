var marquee;
var titulo;
var codigo;
var codigoCliente;
var email;
var celular;
var nroDocReferencia;
var numeroDocumento;
var opcion;

var formFactura;
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

var campoBuscar;
var estadoPago;
var btnAgregarArticulo;
var btnEliminarTodosArticulos;

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
	email =  $("#email");
	celular =  $("#celular");
	nroDocReferencia = $("#nroDocReferencia");
	numeroDocumento = $('#numeroDocumento');
	opcion = $("#opcion");

	formFactura = $("#formFactura");
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
	btnEliminarTodosArticulos = $("#btnEliminarTodosArticulos");
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle");

	observaciones = $("#observaciones");
	subTotalOC = $("#subTotalOC");
	igv = $("#igv");
	total = $("#total");

	btnGrabar = $("#btnGrabar");

	campoBuscar = $("#campoBuscar");
	estadoPago = $("#estadoPago");
	
	dateTimePickerInput = $(".datetimepicker-input");
}

function inicializarComponentes() {

	habilitarAnimacionAcordion();
	habilitarMarquee();
	construirFechasPicker();
	retringirSeleccionFechas();
	habilitarAutocompletarBuscarCampos();
	
	inicializarEventos();
}

function inicializarPantalla() {
	if(opcion.text() == Opcion.NUEVO) {
		inicializarTablaDetalle(true);
		cargarPantallaNueva();
	}else {
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

function habilitarMarquee(){
	var timeout_ = null;
	marquee.on("mouseover", function() {
		var interval_val = 2;    
		var this_ = this;
    	timeout_ = setInterval(function() {
      		$(this_).scrollLeft(interval_val);
      		interval_val++;
    		}, 25);
  	});

  	marquee.on("mouseout", function() {
    	clearInterval(timeout_);
    	$(this).scrollLeft(0);
  	});	
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

	condPago.on('change', function(){
		mostrarOcultarDiasPorCondicionPago();
	});

	estadoPago.on('change', function(){
		mostrarOcultarBotonAnular();
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
		dataTableDetalle.destroy();
		inicializarTablaDetalle(false);
		agregarFilaEnTablaDetalle();
	});

	btnEliminarTodosArticulos.on("click", function() {
		mostrarDialogoEliminarTodo();
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

					loadding(false);
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
		"dom"			: '<lp<rt>ip>',
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

function inicializarFechaContabilidad(){

	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
}

function cargarPantallaNueva() {
	inicializarFechaContabilidad();
	obtenerTipoCambio(tipoCambio);

	controlNoRequerido(observaciones);
	titulo.text("NUEVA");
	dias.val(Dias._30);
	
	var volver = volverParam.text();
	if(volver == Volver.SI){
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
		url : '/appkahaxi/buscarGuiaRemisionCompra/' + nroDocReferenciaVal ,
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

	codigoCliente.val(data.codigoCliente);
	documentoCliente.val(data.nroDocCliente);
	nombreCliente.val(data.nombreCliente);
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
	subTotalOC.val(data.subTotal);
	igv.val(data.igv);
	total.val(data.total);

	cantidadDetalleDuplicado = data.detalle.length;

	for(i=0; i < cantidadDetalleDuplicado; i++) {

		agregarFilaEnTablaDetalle(data);

		var detalle = data.detalle[i];
		$('#codigo_' + i).val(detalle.codArticulo);
		$('#descripcion_' + i).val(detalle.descripcionArticulo);
		$('#marca_' + i).val(detalle.marca);
		$('#cantidad_' + i).val(detalle.cantidad);
		
		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precioUnitario));
		$('#subTotal_' + i).val(convertirNumeroAMoneda(detalle.subTotal));
		$('#subTotalIgv_' + i).val(convertirNumeroAMoneda(detalle.subTotalIgv));
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

	deshabilitarControl(tipoMoneda);

	if(estadoPago.val() == EstadoPago.PAGADO) {
		deshabilitarControl(estadoPago);
		ocultarControl(btnAnular);
	} else {
		habilitarControl(estadoPago);
		mostrarControl(btnAnular);
	}

	deshabilitarControl(condPago);
	deshabilitarControl(dias);
	deshabilitarControl(serie);
	deshabilitarControl(correlativo);

	mostrarControl(btnVolver);
	ocultarControl(btnGrabar);
	ocultarControl(btnLimpiar);

	deshabilitarDetalleFactura();
}

function deshabilitarDetalleFactura(){

	// ******* DETALLE
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');//.not(':last');

		$cells.each(function(cellIndex) {
			deshabilitarControl($(this).find(".codigo_table"));
			deshabilitarControl($(this).find(".almacen_table"));
			deshabilitarControl($(this).find(".cantidad_table"));
			deshabilitarControl($(this).find(".precio_table"));
			
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

	var row = $('#tableDetalle').DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");

	var $tds = row.find("td").not(':first').not(':last');

	$.each($tds, function(i, el) {

		switch(i) {

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
			case 3:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// MARCA ART
			case 4:	$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='marca_" + indiceFilaDataTableDetalle + "' readonly='readonly'>");
				break;

			// ALMACEN
			case 5:	$(this).html(CADENA_VACIA).append("<div>" +
				"<select class='form-control almacen_table' id='almacen_" + indiceFilaDataTableDetalle + "'> </select>" +
				"</div>");
				cargarComboAlmacen("#almacen_" + indiceFilaDataTableDetalle , data)	;
				break;

			// CANTIDAD
			case 6:	$(this).html(CADENA_VACIA).append("<input class='form-control alineacion-derecha cantidad_table' type='text' onkeyup='calcularCantidadKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
				"onkeypress='return soloEnteros(event);'" +
				"id='cantidad_" + indiceFilaDataTableDetalle + "'>");
				break;

			// PVU
			case 7:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha precio_table' type='text' onkeyup='calcularPrecioKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "'>" +
				"</span></div>");
				break;

			case 8:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='igv_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

			case 9:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='text' id='subTotal_" + indiceFilaDataTableDetalle + "' readonly='readonly'>" +
				"</span></div>");
				break;

		}
	});
	habilitarMarquee();
}


/**************** EVENTOS DETALLE *******************/

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

			minLength: 1,
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




































function volver(){
	var params;
	var datoBuscar 	= $('#datoBuscar').text();
	var fechaDesde 	= $('#fechaDesde').text();
	var fechaHasta 	= $('#fechaHasta').text();
	var estadoParam	= $('#estadoParam').text();

	params = "datoBuscar=" + datoBuscar + "&fechaDesde=" + fechaDesde + "&fechaHasta=" + fechaHasta + "&estadoParam=" + estadoParam;
	window.location.href = "/appkahaxi/mantenimiento-comprobante-pago?" + params;
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
				registrarComprobantePagoCompra();
			}
		}
	});
}


function grabarFactura() {

	if(documentoCliente.val() == ''){

		mostrarDialogoInformacion("Debe buscar un proveedor", Boton.WARNING, $('#campoBuscar'));
		return false;
	}

	if (formFactura[0].checkValidity() === true) {

		if(validarDetalleFactura()) {

			if(opcion.text() == Opcion.NUEVO) {

				if(estadoPago.val() == EstadoPago.PENDIENTE) {
					registrarComprobantePagoCompra();
				} else {
					mostrarDialogoRegistrarFacturaPagado();
				}

			}

			if(opcion.text() == Opcion.VER) {

				actualizarComprobantePagoCompra();
			}

		}

	} else {

		formFactura.addClass('was-validated');
	}

}

function actualizarComprobantePagoCompra() {

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
		url : '/appkahaxi/actualizarComprobantePagoCompra/',
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

		if($('#codigo_' + i).val() != undefined ) {

			var codigo = $('#codigo_' + i).val().trim();
			var descripcion = $('#descripcion_' + i).val().trim();
			var cantidad = $('#cantidad_' + i).val().trim();
			var precio = $('#precio_' + i).val().trim();

			if (codigo == '' || descripcion == '') {
				mostrarDialogoInformacion('Debe ingresar el código.', Boton.WARNING, $('#codigo_' + i));
				return false;
			}
			if (cantidad == '') {
				mostrarDialogoInformacion('Debe ingresar la cantidad.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}
			if (precio == '') {
				mostrarDialogoInformacion('Debe ingresar el precio.', Boton.WARNING, $('#precio_' + i));
				return false;
			}

			if(getNum(cantidad) == 0){
				mostrarDialogoInformacion('Debe ingresar una cantidad mayor a cero.', Boton.WARNING, $('#cantidad_' + i));
				return false;
			}

			if(getNum(precio) == 0){
				mostrarDialogoInformacion('Debe ingresar un precio mayor a cero.', Boton.WARNING, $('#precio_' + i));
				return false;
			}

		}

	}
	return true;
}

function registrarComprobantePagoCompra(){

	var nroDocumento  			= codigo.html();
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
		url : '/appkahaxi/registrarComprobantePagoCompra/',
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


				} else {

					volver();
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

function anularComprobantePagoCompra(){

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
		url : '/appkahaxi/anularComprobantePagoCompra/',
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

function reiniciarFechaContaDesdeHasta(){

	fecDocumento.datetimepicker('maxDate', false);
	fecVencimiento.datetimepicker('minDate', false);
	
	fecConta.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecDocumento.datetimepicker('date', null);
	fecVencimiento.datetimepicker('date', null);
}

function limpiarFactura() {

	reiniciarFechaContaDesdeHasta();

	campoBuscar.val(CADENA_VACIA);
	documentoCliente.val(CADENA_VACIA);
	nombreCliente.val(CADENA_VACIA);
	direccion.val(CADENA_VACIA);
	serie.val(CADENA_VACIA);
	correlativo.val(CADENA_VACIA);
	estadoPago.val(EstadoPago.PENDIENTE);
	condPago.val(CondicionPago.CONTADO);
	tipoMoneda.val(Moneda.DOLARES);

	subTotalOC.val(CADENA_VACIA);
	igv.val(CADENA_VACIA);
	total.val(CADENA_VACIA);

	dataTableDetalle.clear().draw();
	indiceFilaDataTableDetalle = -1;

	ocultarControl(divDias);
	ocultarControl(btnAgregarArticulo);
	ocultarControl(btnEliminarTodosArticulos);

	formFactura.removeClass('was-validated');

	campoBuscar.focus();
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
				anularComprobantePagoCompra();
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

function calcularCantidadKeyUp(control, fila) {

	var cantidad = getNum(parseInt(control.value));
	var precio = getNum(parseFloat($('#precio_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);
	var igv = parseFloat(subTotal * valorIGV).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val(igv);

	calcularResumenFactura();

}

function calcularPrecioKeyUp(control, fila) {

	var precio = getNum(parseFloat(control.value));
	var cantidad = getNum(parseInt($('#cantidad_' + fila).val()));
	var subTotal = parseFloat(cantidad * precio).toFixed(2);
	var igv = parseFloat(subTotal * valorIGV).toFixed(2);

	$('#subTotal_' + fila).val(subTotal);
	$('#igv_' + fila).val(igv);

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

				for(var i = 0; i < tam; i++) {
					if(resultado[i].predeterminado == '1') {
						$(control).append($('<option selected> </option').val(resultado[i].codigoAlmacen).html(resultado[i].descripcion));
					} else {
						$(control).append($('<option />').val(resultado[i].codigoAlmacen).html(resultado[i].descripcion));
					}

				}

				dataTableDetalle.destroy();
				inicializarTablaDetalle(true);

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


