// campos de formulario
var formFactura;
var campoBuscar;
var nroComprobantePago;
var nroOC;
var codRepuesto;
var fecContaDesde;
var fecContaHasta;
var fContaDesde;
var fContaHasta;
var estado;
var fechaDesde;
var fechaHasta;
// botones
var btnLimpiar;
var btnNuevo;
// tablas
var tablaFactura;
var dataTableFactura;

var esLimpiar = false;
/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	formFactura = $('#formFactura');
	campoBuscar = $('#campoBuscar');
	nroComprobantePago = $('#nroComprobantePago');
	nroOC = $('#nroOC');
	codRepuesto = $('#codRepuesto');
	fecContaDesde = $('#fecContaDesde');
	fecContaHasta = $('#fecContaHasta');
	
	fContaDesde = $('#fContaDesde');
	fContaHasta = $('#fContaHasta');
	
	estado = $('#estado');
	fechaDesde = $('#fechaDesde');
	fechaHasta = $('#fechaHasta');
	
	btnBuscar = $('#btnBuscar');
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');

	tablaFactura  = $('#tablaFactura');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	construirFechasPicker();
	retringirSeleccionFechas();
	inicializarFechaContaDesdeHasta();
	
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {
	campoBuscar.focus();
}

function construirFechasPicker() {
	fecContaHasta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly: true,
		date:			moment(),
		maxDate:		moment()
    });

    fecContaDesde.datetimepicker({
		locale: 		'es',
		format: 		'L',
		ignoreReadonly: true,
		date:			moment().add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day'),
		maxDate:		moment()
    });
}

function retringirSeleccionFechas() {
	
	fecContaDesde.on("change.datetimepicker", function (e) {
		if(!esLimpiar){
			if(validarFechas()){
				fecContaHasta.datetimepicker('minDate', e.date);
				buscar(e);
				
			}else{
				mostrarMensajeValidacion("El rango de fechas es máximo de 3 meses.");
				fecContaDesde.datetimepicker('date', e.oldDate);
			}	
		}
    });
	
    fecContaHasta.on("change.datetimepicker", function (e) {
		if(!esLimpiar){
			if(validarFechas()){
				fecContaDesde.datetimepicker('maxDate', e.date);
				buscar(e);
				
			}else{
				mostrarMensajeValidacion("El rango de fechas es máximo de 3 meses.");
				fecContaHasta.datetimepicker('date', e.oldDate);
			}
		}
    });
}

function inicializarFechaContaDesdeHasta(){
	
	if(fechaDesde.text() != '' || fechaHasta.text() != ''){
		fecContaHasta.datetimepicker('date', fechaHasta.text() == '' ? moment() : fechaHasta.text());
		fecContaHasta.datetimepicker('maxDate', moment());
		
		var fecContaHastaVal = fecContaHasta.datetimepicker('date');
		var nuevaFecContaDesdeVal 	= moment(fecContaHastaVal).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day');
		fecContaDesde.datetimepicker('date', fechaDesde.text() == '' ? nuevaFecContaDesdeVal : fechaDesde.text());
		fecContaDesde.datetimepicker('maxDate', moment());
	}
}

function validarFechas(){
	
	var fecContaDesdeVal = moment(fecContaDesde.datetimepicker('date'));
	var fecContaHastaVal = moment(fecContaHasta.datetimepicker('date'));
	var diferencia = fecContaHastaVal.diff(fecContaDesdeVal, 'days');
	console.log("diferencia--->" + diferencia);
	if(diferencia > ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS){
		return false;
	}else{
		return true;
	}	
}

function inicializarEventos(){

	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
	});
	
	nroComprobantePago.on('keyup', function (e) {
		nroFacturaKeyUp(e);
	});
	
	nroOC.on('keyup', function (e) {
		nroOCKeyUp(e);
	});
	
	codRepuesto.on('keyup', function (e) {
		codRepuestoKeyUp(e);
	});
	
	estado.on('change', function (e) {
		buscar(e);
	});
		
    btnLimpiar.click(function(e){
		limpiar(e);
	});

	btnNuevo.click(function(){
		cargarFacturaDirecta(null, Opcion.NUEVO);
	});
	
	fContaDesde.on('keydown', function(e){
		var key = window.Event ? e.which : e.keyCode;
		// si es <>TAB, cancelar
		if(key != 9){
			return false;
		}
	});
	
	fContaHasta.on('keydown', function(e){
		var key = window.Event ? e.which : e.keyCode;
		// si es <>TAB, cancelar
		if(key != 9){
			return false;
		}
	});
}

function inicializarTabla(){
	
	dataTableFactura = tablaFactura.DataTable({
        "ajax": {
            // se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 			= campoBuscar.val().trim();
            	d.nroComprobantePago	= nroComprobantePago.val().trim();
            	d.nroOrdenCompra		= nroOC.val().trim();
            	d.codRepuesto			= codRepuesto.val().trim();
            	d.codEstado 			= estado.val();
            	d.fechaDesde 			= fecContaDesde.datetimepicker('date').format('YYYY-MM-DD');
            	d.fechaHasta 			= fecContaHasta.datetimepicker('date').format('YYYY-MM-DD');
		    },
            url: '/appkahaxi/listarFacturaCompra/',
            dataSrc: function (json) {
            	console.log("listarFacturaCompra...success");
            	return json;
            },
            error: function (xhr, error, code){
            	
            }
        },

		/*
		"dom"           :   "<'row'<'col-sm-8'i><'col-sm-4'>>" +
			                "<'row'<'col-sm-12'rt>>" +
			                "<'row'<'col-sm-4'l><'col-sm-8'p>>",
        */
		"responsive"	: false,
		"scrollCollapse": false,
		"ordering"      : true,
		"deferRender"   : true,
		"autoWidth"		: false,
		"paging"	    : true,
		"stateSave"		: true,
		"dom"			: '<ip<rt>lp>',
        "lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],

        "columnDefs"    : [
            {
                "width": "1px",
                "targets": [0],
                "data": "id"
            },
            {
                "width": "10px",
                "targets": [1],
                "data": "numeroDocumento"
            },
			{
				"width": "50px",
				"targets": [2],
				"data": "ordenCompra"
			},
			{
				"width": "10px",
				"targets": [3],
				"data": "fechaRegistroFormato"
			},
			{
				"width": "5px",
				"targets": [4],
				"data": "serieCorrelativo"
			},
            {
                "width": "25px",
                "targets": [5],
                "data": "nroDocProv"
            },
            {
                "width": "200px",
                "targets": [6],
                "data": "nombreProv"
            },
            {
                "width": "10px",
                "targets": [7],
                "data": "fechaContabilizacion"
            },
            {
                "width": "20px",
                "targets": [8],
                "data": "descripcionTipoMoneda"
                
            },
            {
                "width": "10px",
                "targets": [9],
                "data": "descripcionCondPago"
                
            },
			{
				"width": "10px",
				"targets": [10],
				"data": "descripcionEstadoPago"

			},
			{
                "width": "10px",
                "targets": [11],
                "data": "descripcionEstado"
            },
            {
				"width": "20px",
				"targets": [12],
				"data": "total",
				"render":
					function (data, type, row ) {
						return  convertirNumeroAMoneda(data);
					}
			},
            {
                "width": "5px",
                "targets": [13],
                "data": "activo",
                "className": "dt-body-center",
                "orderable": false,
                "render":
                    function (data, type, row ) {
						
						return  "<div>" +
                        			"<button title='Ver Factura' class='btn-view btn btn-info btn-xs'>" +
                        				"<span><i class=\"fas fa-eye\"></i></span>" +
					                "</button>" +
				                "</div>";			
                    }
            }
         ],
         "fnRowCallback":
             function(row, data, iDisplayIndex, iDisplayIndexFull){
                var index = iDisplayIndexFull + 1;
                // colocando el estilo de la moneda
				if(data.codigoTipoMoneda == Moneda.SOLES){
					$('td:eq(12)', row).addClass('dt-body-right listado-symbol-sol');
				}else{
					$('td:eq(12)', row).addClass('dt-body-right listado-symbol-dolar');
				}
				
				// poniendo en negritas las filas de FACTURA DIRECTA
				if(data.ordenCompra == 'DIRECTA'){
					$(row).addClass('facturaDirecta');
				}
				
				// pintando las filas según estado
                if(data.codigoEstado == EstadoFactura.ANULADO){
            		// si anulamos una FACTURA DIRECTA
					if(data.ordenCompra == 'DIRECTA'){
						$(row).addClass('facturaDirectaAnulada');
					}else{
						$(row).addClass("estadoRechazado");	
					}
            	}else if(data.codigoEstado == EstadoFactura.GENERADO){
					
					if(data.codigoEstadoProceso == EstadoProceso.CERRADO){
						// si es FACTURA DIRECTA
						if(data.ordenCompra == 'DIRECTA'){
							$(row).addClass('facturaDirectaCerrada');
						}else{
							$(row).addClass("estadoAprobadoCerrado");	
						}	
					}else{
						// si es FACTURA DIRECTA
						if(data.ordenCompra == 'DIRECTA'){
							$(row).addClass('facturaDirecta');
						}	
					}
            	}
                // colocando la numeración
                $('td:eq(0)', row).html(index);
                 
				// modificando el tamaño de los caracteres del listado 
				$(row).addClass("listado-tam-caracteres");
                return row;
             },
         "language"  : {
            "url": "/appkahaxi/language/Spanish.json"
         }
    });
	
	$('#tablaFactura tbody').on('click','.btn-view', function () {
	    var data = dataTableFactura.row( $(this).closest('tr')).data();

	    if(data.ordenCompra == 'DIRECTA') {
			cargarFacturaDirecta(data.numeroDocumento, Opcion.VER);
		} else {
			cargarFacturaAsociada(data.numeroDocumento, Opcion.VER);
		}
	});
}



/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function nroFacturaKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function nroOCKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function codRepuestoKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function cargarFacturaDirecta(numeroDocumento, opcion) {
	var params;
	var datoBuscar 			= campoBuscar.val();
	var nroFacturaVal 		= nroComprobantePago.val();
	var nroOCVal 			= nroOC.val();
	var codRpto 			= codRepuesto.val();
	var fecContDesde 		= fecContaDesde.datetimepicker('date').format('L');
	var fecContHasta 		= fecContaHasta.datetimepicker('date').format('L');
	var est 				= estado.val();
	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar +  
			 "&nroComprobantePago=" + nroFacturaVal + "&nroOrdenCompra=" + nroOCVal + "&codRepuesto=" + codRpto +
			 "&fechaDesde=" + fecContDesde + "&fechaHasta=" + fecContHasta + "&estadoParam=" + est + "&volver=" + Respuesta.SI + "&desdeDocRef=" + Respuesta.NO;
		
	window.location.href = "/appkahaxi/nueva-factura-compra-directa?" + params;
}

function cargarFacturaAsociada(numeroDocumento, opcion) {

	var params;
	var datoBuscar 			= campoBuscar.val();
	var nroFacturaVal 		= nroComprobantePago.val();
	var nroOCVal 			= nroOC.val();
	var codRpto 			= codRepuesto.val();
	var fecContDesde 		= fecContaDesde.datetimepicker('date').format('L');
	var fecContHasta 		= fecContaHasta.datetimepicker('date').format('L');
	var est 				= estado.val();
	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar +
			 "&nroComprobantePago=" + nroFacturaVal + "&nroOrdenCompra=" + nroOCVal + "&codRepuesto=" + codRpto +
			 "&fechaDesde=" + fecContDesde + "&fechaHasta=" + fecContHasta + "&estadoParam=" + est + "&volver=" + Respuesta.SI + "&desdeDocRef=" + Respuesta.NO + 
			 "&nroGuiaRemision=&nroGr=" + numeroDocumento + "&guias=" + "&origenMnto=" + Respuesta.NO;
		"&guias=";

	window.location.href = "/appkahaxi/nueva-factura-compra-asociada?" + params;
}

function buscar(event){
	var form1 = formFactura;
	event.preventDefault();

	if (form1[0].checkValidity() == false) {
		event.stopPropagation();
    }else{
		event.stopPropagation();
		if ( $.fn.dataTable.isDataTable('#tablaFactura')) {
		    //dataTableFactura.clear().draw(); <--- al usar esta rutina se produce un parpadeo de la tabla
			dataTableFactura.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
			dataTableFactura.ajax.reload(null, true);
		}
	}
	form1.addClass('was-validated');
}

function limpiar(e){
	esLimpiar = true;
	
	campoBuscar.val(CADENA_VACIA);
	nroComprobantePago.val(CADENA_VACIA);
	nroOC.val(CADENA_VACIA);
	codRepuesto.val(CADENA_VACIA);
	estado.val(CADENA_VACIA);
	
	fecContaHasta.datetimepicker('destroy');
	fecContaDesde.datetimepicker('destroy');
	construirFechasPicker();
	
	buscar(e);
	campoBuscar.focus();
}