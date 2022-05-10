// campos de formulario
var formGuiaRemision;
var campoBuscar;
var nroGuia;
var nroOV;
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
// tablas
var tablaGuiaRemision;
var dataTableGuiaRemision;

var esLimpiar = false;
/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function(){
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	formGuiaRemision = $('#formGuiaRemision');
	campoBuscar = $('#campoBuscar');
	nroGuia = $('#nroGuia');
	nroOV = $('#nroOV');
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

	tablaGuiaRemision  = $('#tablaGuiaRemision');
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
				mostrarDialogoInformacion("El rango de fechas es máximo de 3 meses.", Boton.WARNING);
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
				mostrarDialogoInformacion("El rango de fechas es máximo de 3 meses.", Boton.WARNING);
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
	
	nroGuia.on('keyup', function (e) {
		nroGuiaKeyUp(e);
	});
	
	nroOV.on('keyup', function (e) {
		nroOVKeyUp(e);
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
	
	dataTableGuiaRemision = tablaGuiaRemision.DataTable({
        "ajax": {
            // se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 		= campoBuscar.val().trim();
				d.nroGuiaRemision	= nroGuia.val().trim();
            	d.nroOrdenVenta		= nroOV.val().trim();
            	d.codRepuesto		= codRepuesto.val().trim();
            	d.codEstado 		= estado.val();
            	d.fechaDesde 		= fecContaDesde.datetimepicker('date').format('YYYY-MM-DD');
            	d.fechaHasta 		= fecContaHasta.datetimepicker('date').format('YYYY-MM-DD');
		    },
            url: '/appkahaxi/listarGuiaRemisionVenta/',
            dataSrc: function (json) {
            	console.log("listarGuiaRemisionVenta...success");
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
				"data": "ordenVenta"
			},
			{
				"targets": [3],
				"data": "fechaRegistroFormato"
			},
            {
                "targets": [4],
                "data": "codigoCliente",
				"visible": false
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
                "data": "total",
				"render":
                    function (data, type, row ) {
                        return  convertirNumeroAMoneda(data);
                    }
            },
            {
                "targets": [12],
                "data": "activo",
                "className": "dt-body-center",
                "orderable": false,
                "render":
                    function (data, type, row ) {
                    	return  "<div>" +
									"<button title='Descargar GR' class='btn-download btn btn-warning btn-xs'>" +
                        				"<span><i class=\"fas fa-download\"></i></span>" +
					                "</button>" +
                        			"<button title='Ver guía' class='btn-view btn btn-info btn-xs'>" +
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
					$('td:eq(10)', row).addClass('dt-body-right listado-symbol-sol');
				}else{
					$('td:eq(10)', row).addClass('dt-body-right listado-symbol-dolar');
				}
				
				// pintando las filas según estado
                if(data.codigoEstado == EstadoGuiaRemision.ANULADO){
            		$(row).addClass("estadoRechazado");
            	}else if(data.codigoEstado == EstadoGuiaRemision.GENERADO){
					if(data.codigoEstadoProceso == EstadoProceso.CERRADO){
						$(row).addClass("estadoAprobadoCerrado");
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

	$('#tablaGuiaRemision tbody').on('click','.btn-download', function () {
	    var data = dataTableGuiaRemision.row( $(this).closest('tr')).data();
	    console.log("data.numeroDocument-->" + data.numeroDocumento)
		descargarReporte(data.numeroDocumento);
	});
	
	$('#tablaGuiaRemision tbody').on('click','.btn-view', function () {
	    var data = dataTableGuiaRemision.row( $(this).closest('tr')).data();
	    cargarGuiaRemision(data.numeroDocumento, Opcion.VER);
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

function nroGuiaKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function nroOVKeyUp(e){
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

function cargarGuiaRemision(numeroDocumento, opcion) {
	var params;
	var datoBuscar 			= campoBuscar.val();
	var nroGuiaVal 			= nroGuia.val();
	var nroOVVal 			= nroOV.val();
	var codRpto 			= codRepuesto.val();
	var fecContDesde 		= fecContaDesde.datetimepicker('date').format('L');
	var fecContHasta 		= fecContaHasta.datetimepicker('date').format('L');
	var est 				= estado.val();
	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar +  
			 "&nroCotizacion=&nroGuiaRemision=" + nroGuiaVal + "&nroOrdenVenta=" + nroOVVal + "&codRepuesto=" + codRpto + 
		     "&fechaDesde=" + fecContDesde + "&fechaHasta=" + fecContHasta + "&estadoParam=" + est + "&volver=" + Respuesta.SI + 
			 "&desdeDocRef=" + Respuesta.NO + "&origenMnto=" + Respuesta.SI;
	
	window.location.href = "/appkahaxi/cargar-guia-remision-venta?" + params;	
}

function buscar(event){
	var form1 = formGuiaRemision;
	event.preventDefault();

	if (form1[0].checkValidity() == false) {
		event.stopPropagation();
    }else{
		event.stopPropagation();
		if ( $.fn.dataTable.isDataTable('#tablaGuiaRemision')) {
		    //dataTableGuiaRemision.clear().draw(); <--- al usar esta rutina se produce un parpadeo de la tabla
			dataTableGuiaRemision.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
			dataTableGuiaRemision.ajax.reload(null, true);
		}
	}
	form1.addClass('was-validated');
}

function limpiar(e){
	esLimpiar = true;
	
	campoBuscar.val(CADENA_VACIA);
	nroGuia.val(CADENA_VACIA);
	nroOV.val(CADENA_VACIA);
	codRepuesto.val(CADENA_VACIA);
	estado.val(CADENA_VACIA);
	
	fecContaHasta.datetimepicker('destroy');
	fecContaDesde.datetimepicker('destroy');
	construirFechasPicker();
	
	buscar(e);
	campoBuscar.focus();
}

function descargarReporte(numeroDocumento){
    $.ajax({
        type:"Post",
        url : '/appkahaxi/reporteGuiaRemisionVenta/' + numeroDocumento,
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

