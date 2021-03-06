// campos de formulario
var formCotizacion;
var campoBuscar;
var nroCotizacion;
var nroRequerimiento;
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
var tablaCotizacionVenta;
var dataTableCotizacionVenta;

var esLimpiar = false;
/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});
	
function inicializarVariables() {
	formCotizacion = $('#formCotizacion');
	campoBuscar = $('#campoBuscar');
	nroCotizacion = $('#nroCotizacion');
	nroRequerimiento = $('#nroRequerimiento');
	codRepuesto = $('#codRepuesto');
	fecContaDesde = $('#fecContaDesde');
	fecContaHasta = $('#fecContaHasta');
	
	fContaDesde = $('#fContaDesde');
	fContaHasta = $('#fContaHasta');
	
	estado = $('#estado');
	fechaDesde = $('#fechaDesde');
	fechaHasta = $('#fechaHasta');
	
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	
	tablaCotizacionVenta  = $('#tablaCotizacionVenta');
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
				mostrarMensajeValidacion("El rango de fechas es m??ximo de 3 meses.");
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
				mostrarMensajeValidacion("El rango de fechas es m??ximo de 3 meses.");
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
	
	nroCotizacion.on('keyup', function (e) {
		nroCotizacionKeyUp(e);
	});
	
	nroRequerimiento.on('keyup', function (e) {
		nroRequerimientoKeyUp(e);
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
    	nuevaCotizacionVenta(null, Opcion.NUEVO);
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
	console.log("inicializarTabla...");
	dataTableCotizacionVenta = tablaCotizacionVenta.DataTable({
        "ajax": {
            // se pasa la data de esta forma para poder reinicializar luego s??lo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 		= campoBuscar.val().trim();
            	d.nroCotizacion		= nroCotizacion.val().trim();
            	d.nroRequerimiento	= nroRequerimiento.val().trim();
            	d.codRepuesto		= codRepuesto.val().trim();
            	d.codEstado 		= estado.val();
            	d.fechaDesde 		= fecContaDesde.datetimepicker('date').format('YYYY-MM-DD');
            	d.fechaHasta 		= fecContaHasta.datetimepicker('date').format('YYYY-MM-DD');
		    },
            url: '/appkahaxi/listarCotizacionesVenta/',
            dataSrc: function (json) {
            	console.log("listarCotizacionesVenta...success");
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
		"autoWidth"		: true,
		"paging"	    : true,
		"stateSave"		: true,
		// GENIAL! se usa esta propiedad para no perder el color de las filas al ordenar las columnas
		"sortClasses"	: false,
		"dom"			: '<ip<rt>lp>',
        "lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],

        "columnDefs"    : [
            {
                "targets": [0],
                "data": "id"
            },
            {
                "targets": [1],
                "data": "numeroDocumento"
            },
            {
                "targets": [2],
                "data": "nroRequerimiento"
            },
            {
                "targets": [3],
                "data": "codigoCliente",
                "visible": false
            },
            {
                "targets": [4],
                "data": "fechaRegistro"
            },
            {
                "targets": [5],
                "data": "nroDocCliente"
            },
            {
                "targets": [6],
                "data": "nombreCliente"
            },
            {
                "targets": [7],
                "data": "fechaContabilizacion"
            },
            {
                "targets": [8],
                "data": "descripcionTipoMoneda"
                
            },
            {
                "targets": [9],
                "data": "descripcionCondPago"
                
            },
            {
                "targets": [10],
                "data": "descripcionEstado"
            },
            {
               
                "targets": [11],
                "data": "codigoEstadoProceso",
				"render":
                    function (data, type, row ) {		
						if(data == EstadoProceso.ABIERTO){
							return "ABIERTO";
						}else if(data == EstadoProceso.EN_PROCESO){
							return "EN PROCESO";
						}else{
							return "CERRADO";
						}
                    }
            },
            {
                "targets": [12],
                "data": "total",
				"render":
                    function (data, type, row ) {
                        return  convertirNumeroAMoneda(data);
                    }
            },
            {
                "targets": [13],
                "data": "activo",
                "className": "dt-body-center",
                "orderable": false,
                "render":
                    function (data, type, row ) {
                    	return  "<div>" +
                        			"<button title='Ver cotizaci??n' class='btn-view btn btn-info btn-xs'>" +
                        				"<span><i class=\"fas fa-eye\"></i></span>" +
					                "</button>" +
					                "<button title='Duplicar' class='btn-copy btn btn-success btn-xs'>" +
			                            "<span><i class=\"far fa-copy\"></i></span>" +
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
					$('td:eq(11)', row).addClass('dt-body-right listado-symbol-sol');
				}else{
					$('td:eq(11)', row).addClass('dt-body-right listado-symbol-dolar');
				}
				
				// pintando las filas seg??n estado
                if(data.codigoEstado == EstadoDocumentoInicial.ANULADO){
            		$(row).addClass("estadoRechazado");
            	}else if(data.codigoEstado == EstadoDocumentoInicial.APROBADO){
					if(data.codigoEstadoProceso == EstadoProceso.ABIERTO){
						$(row).addClass("estadoAprobadoAbierto");	
					}else{
						$(row).addClass("estadoAprobadoCerrado");
					}
            	}
                // colocando la numeraci??n
                $('td:eq(0)', row).html(index);
                 
				// modificando el tama??o de los caracteres del listado 
				$(row).addClass("listado-tam-caracteres");
                return row;
             },
         "language"  : {
            "url": "/appkahaxi/language/Spanish.json"
         }
    });
	
	$('#tablaCotizacionVenta tbody').on( 'click','.btn-view', function () {
	    var data = dataTableCotizacionVenta.row( $(this).closest('tr')).data();
	    nuevaCotizacionVenta(data.numeroDocumento, Opcion.VER);
	});
	 
	$('#tablaCotizacionVenta tbody').on( 'click','.btn-copy', function () {
	    var data = dataTableCotizacionVenta.row( $(this).closest('tr')).data();
	    nuevaCotizacionVenta(data.numeroDocumento, Opcion.DUPLICAR);
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

function nroCotizacionKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function nroRequerimientoKeyUp(e){
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

function nuevaCotizacionVenta(numeroDocumento, opcion){
	var params;
	var datoBuscar 			= campoBuscar.val();
	var nroCotiz 			= nroCotizacion.val();
	var nroReq 				= nroRequerimiento.val();
	var codRpto 			= codRepuesto.val();
	var fecContDesde 		= fecContaDesde.datetimepicker('date').format('L');
	var fecContHasta 		= fecContaHasta.datetimepicker('date').format('L');
	
	var est 				= estado.val();
	// armando los par??metros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + 
			 // a partir de aqu?? son los valores de los filtros de la pantalla de b??squeda
			 "&datoBuscar=" + datoBuscar + 
			 "&nroCotizacion=" + nroCotiz + "&nroRequerimiento=" + nroReq + "&codRepuesto=" + codRpto + 
			 "&fechaDesde=" + fecContDesde + "&fechaHasta=" + fecContHasta + "&estadoParam=" + est + 
			 // indica que se debe VOLVER, ya que se invoca desde la pantalla de b??squeda
		     "&volver=" + Respuesta.SI;
	
	window.location.href = "/appkahaxi/cargar-cotizacion?" + params;
}

function buscar(event){
	var form1 = formCotizacion;
	event.preventDefault();
	
	if (form1[0].checkValidity() == false) {
		event.stopPropagation();
    }else{
		event.stopPropagation();
		if ( $.fn.dataTable.isDataTable('#tablaCotizacionVenta')) {
		    //dataTableCotizacionVenta.clear().draw(); <--- al usar esta rutina se produce un parpadeo de la tabla
			dataTableCotizacionVenta.clear(); // usamos esta instrucci??n para limpiar la tabla sin que haya parpadeo
			dataTableCotizacionVenta.ajax.reload(null, true);
		}
	}
	form1.addClass('was-validated');
}

function limpiar(e){
	esLimpiar = true;
	
	campoBuscar.val(CADENA_VACIA);
	nroCotizacion.val(CADENA_VACIA);
	nroRequerimiento.val(CADENA_VACIA);
	codRepuesto.val(CADENA_VACIA);
	estado.val(CADENA_VACIA);
	
	fecContaHasta.datetimepicker('destroy');
	fecContaDesde.datetimepicker('destroy');
	construirFechasPicker();
	
	buscar(e);
	campoBuscar.focus();
}