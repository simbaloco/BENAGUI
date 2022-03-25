// campos de formulario principal
var fecInicio;
var fecFin;
var fInicio;
var fFin;
var campoBuscar;
var tablaCompras
var dataTableCompras;
// botones
//var btnBuscar;
var btnExportalExcel;
var btnExportalPdf;
var btnLimpiar;

/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
});

function inicializarVariables() {
	fecInicio = $('#fecInicio');
	fecFin = $('#fecFin');
	fInicio = $('#fInicio');
	fFin = $('#fFin');
	campoBuscar = $('#campoBuscar');
	tablaCompras = $('#tablaCompras');
	//btnBuscar = $('#btnBuscar');
	btnExportalExcel = $('#btnExportalExcel');
	btnExportalPdf = $("#btnExportalPdf");
	btnLimpiar = $("#btnLimpiar");
}

function inicializarComponentes() {
	construirFechasPicker();
	retringirSeleccionFechas();
	inicializarEventos();
	inicializarTabla();
}


function construirFechasPicker() {
	console.log("construirFechasPicker...");

	fecFin.datetimepicker({
		locale: 		'es',
		format: 		'L',
		maxDate:		new Date(),
		ignoreReadonly:  true,
		//minDate:		moment(new Date()).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day'),
		//date: 			new Date()
		date: 			moment(new Date())
    });

    fecInicio.datetimepicker({
		locale: 		'es',
		format: 		'L',
		maxDate:		new Date(),
		ignoreReadonly:  true,
		date:			moment(new Date()).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day')
    });
}

function retringirSeleccionFechas() {
	console.log("retringirSeleccionFechas...");

	fecInicio.on("change.datetimepicker", function(e) {
		console.log("entrando change fec desde....")
		if (validarFechas()) {
			fecFin.datetimepicker('minDate', e.date);
			buscar(e);
		} else {
			mostrarDialogoInformacion("El rango de fechas es máximo de 6 meses.", Boton.WARNING);
			fecInicio.datetimepicker('date', e.oldDate);
		}
	});

	fecFin.on("change.datetimepicker", function(e) {
		console.log("entrando change fec hasta....")
		if (validarFechas()) {
			fecInicio.datetimepicker('maxDate', e.date);
			buscar(e);
		} else {
			mostrarDialogoInformacion("El rango de fechas es máximo de 6 meses.", Boton.WARNING);
			fecFin.datetimepicker('date', e.oldDate);
		}
	});
}

function inicializarEventos() {

	campoBuscar.on('keyup', function(e) {
		campoBuscarKeyUp(e);
	});

	fInicio.on('keydown', function(e) {
		var key = window.Event ? e.which : e.keyCode;
		// si es <>TAB, cancelar
		if (key != 9) {
			return false;
		}
	});

	fFin.on('keydown', function(e) {
		var key = window.Event ? e.which : e.keyCode;
		// si es <>TAB, cancelar
		if (key != 9) {
			return false;
		}
	});
		
	btnExportalExcel.click(function() {
		generarReporte(TipoReporte.EXCEL);
	});

	btnExportalPdf.click(function() {
		generarReporte(TipoReporte.PDF);
	});
	
	btnLimpiar.click(function() {
		limpiar();
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

function limpiar(){
	campoBuscar.val(CADENA_VACIA);	
	inicializarFechaInicioFin();
	buscar();
	campoBuscar.focus();
}

function inicializarFechaInicioFin() {
	console.log("inicializarFechaInicioFin....");
	fecFin.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecFin.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));

	var fecFinVal = fecFin.datetimepicker('date');
	var nuevaFecInicioVal = moment(fecFinVal).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO, 'day');
	fecInicio.datetimepicker('date', nuevaFecInicioVal);
	fecInicio.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));
}

function validarFechas() {
	var fecfecInicioVal = moment(fecInicio.datetimepicker('date'));
	var fecFinVal = moment(fecFin.datetimepicker('date'));
	var diferencia = fecFinVal.diff(fecfecInicioVal, 'days');
	console.log("diferencia--->" + diferencia);
	if (diferencia > ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_REPORTES) {
		return false;
	} else {
		return true;
	}
}

function generarReporte(tipo) {

	$.ajax({
		type: "Post",
		url: '/appkahaxi/reporteCompras/',
		xhrFields: {
			responseType: 'blob'
		},
		data: {
				fechaInicio	:fecInicio.datetimepicker('date').format('DD/MM/YYYY'),
				fechaFin	:fecFin.datetimepicker('date').format('DD/MM/YYYY'),
				datoBuscar	:campoBuscar.val().trim(),
				tipoReporte	:tipo
		},
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
									//document.body.removeChild(a);
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

function buscar(){	
	if ( $.fn.dataTable.isDataTable(tablaCompras)) {
		console.log("ya existe el dt....");
		dataTableCompras.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableCompras.ajax.reload(null, true);
	}
}

function inicializarTabla(){
	
	dataTableCompras = tablaCompras.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {				
				d.fechaInicio	= fecInicio.datetimepicker('date').format('DD/MM/YYYY');
				d.fechaFin		= fecFin.datetimepicker('date').format('DD/MM/YYYY');
				d.datoBuscar	= campoBuscar.val().trim();
		    },
            url: '/appkahaxi/listarReporteCompras/',
            dataSrc: function (json) {
				console.log("listarReporteCompras...success , JSON-->" + json);
				var data = JSON.stringify(json);
				console.log("data--->" + data);
            	return json;
            },
            error: function (xhr, error, code){

            }
        },
        "responsive"	: false,
        "scrollCollapse": false,
		"dom"			: '<ip<rt>lp>',
       	"lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
        "deferRender"   : true,
        "autoWidth"		: false,
		// por defecto, datatable ordena segùn criterio ASC, ignorando el order by de la query
		// colocamos ordering true para que el usuario pueda reordenar las columnas
		// e indicamos que se ordene según la 1ra columna.
		"ordering"      : true,
        "order"			: [[0, 'desc']],
        "columnDefs"    : [
            {
                "width": "1px",
                "targets": [0],
                "data": "NRO_DOCUMENTO"
            },
            {
                "width": "5px",
                "targets": [1],
                "data": "NRO_DOCUMENTO"
            },
			{
                "width": "10px",
                "targets": [2],
                "data": "NRO_DOCUMENTO_INTERNO"
            },
            {
				"width": "75px",
                "targets": [3],
				"data": "FEC_CONTABILIZACION"
            },			
			{
				"width": "50px",
                "targets": [4],
				"data": "NRO_DOC_PROVEEDOR"
            },
			{
				"width": "50px",
                "targets": [5],
				"data": "NOMBRE_PROVEEDOR"
            },			
            {
                "width": "10px",
                "targets": [6],
                "data": "MONEDA"
            },            
            {
                "width": "10px",
                "targets": [7],
                "data": "SUBTOTAL"
            },  
			{
                "width": "10px",
                "targets": [8],
                "data": "IGV"
            },  
			{
                "width": "10px",
                "targets": [9],
                "data": "TOTAL"
            }, 
			{
                "width": "10px",
                "targets": [10],
                "data": "NRO_PEDIDO" 
            }, 
			{
                "width": "10px",
                "targets": [11],
                "data": "ESTADO_PAGO"
            }			        
         ],
         "fnRowCallback":
                 function(row, data, iDisplayIndex, iDisplayIndexFull){
                    var index = iDisplayIndexFull + 1;
					 
					// pintando las filas según estado
		      		if(data.ESTADO_PAGO == EstadoPagoReporte.PENDIENTE){
		            	$(row).addClass("estadoRechazado");
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
  
}
