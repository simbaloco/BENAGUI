// campos de formulario principal 
var fecInicio;
var fecFin;
var fInicio;
var fFin;
var rbCliente;
var rbArticulo;
// botones
var btnExportalExcel;
var btnExportalPdf;
//var esLimpiar = false;

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
	rbCliente = $('#rbCliente');
	rbArticulo = $('#rbArticulo');	
	btnExportalExcel = $('#btnExportalExcel');
	btnExportalPdf = $("#btnExportalPdf");
}

function inicializarComponentes() {
	construirFechasPicker();
	retringirSeleccionFechas();
	//inicializarFechaInicioFin();
	inicializarEventos();
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
		} else {
			mostrarDialogoInformacion("El rango de fechas es máximo de 6 meses.", Boton.WARNING);
			fecInicio.datetimepicker('date', e.oldDate);
		}
	});

	fecFin.on("change.datetimepicker", function(e) {
		console.log("entrando change fec hasta....")
		if (validarFechas()) {
			fecInicio.datetimepicker('maxDate', e.date);
		} else {
			mostrarDialogoInformacion("El rango de fechas es máximo de 6 meses.", Boton.WARNING);
			fecFin.datetimepicker('date', e.oldDate);
		}
	});
}

function inicializarEventos() {
	
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

}

/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function inicializarFechaInicioFin() {
	console.log("inicializarFechaInicioFin....");
	fecFin.datetimepicker('date', moment().format('DD/MM/YYYY'));
	console.log("2");
	fecFin.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));

	var fecFinVal = fecFin.datetimepicker('date');
	var nuevaFecInicioVal = moment(fecFinVal).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO, 'day');
	console.log("3");
	fecInicio.datetimepicker('date', nuevaFecInicioVal);
	console.log("4");
	fecInicio.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));
	console.log("5");
}

function validarFechas() {
	console.log("validarFechas...");

	var fecfecInicioVal = moment(fecInicio.datetimepicker('date'));
	var fecFinVal = moment(fecFin.datetimepicker('date'));
	var diferencia = fecFinVal.diff(fecfecInicioVal, 'days');
	console.log("diferencia--->" + diferencia);
	if (diferencia > ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_REPORTES) {
		console.log("dif > 180, falso-....")
		return false;
	} else {
		console.log("dif <= 180, true....")
		return true;
	}
}

function campoBuscarKeyUp(e) {
	var datoBuscar = campoBuscar.val().trim();
	console.log('datoBuscar--->' + datoBuscar);
	var key = window.Event ? e.which : e.keyCode;
	console.log("***key--->" + key)
	/*if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
	}*/
}

function generarReporte(tipo) {

	var iOpcion = 1;
	
	if (rbCliente.is(":checked")){
		iOpcion = 1;
	}
	if (rbArticulo.is(":checked")){
		iOpcion = 2;
	}

	$.ajax({
		type: "Post",
		url: '/appkahaxi/reporteAnalisisVentas/',
		xhrFields: {
			responseType: 'blob'
		},
		data: {
				fechaInicio	:fecInicio.datetimepicker('date').format('DD/MM/YYYY'),
				fechaFin	:fecFin.datetimepicker('date').format('DD/MM/YYYY'),
				opcion		:iOpcion,
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



