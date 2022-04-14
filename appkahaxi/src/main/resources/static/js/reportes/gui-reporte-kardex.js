// campos de formulario
var fecInicio;
var fecFin;
var fInicio;
var fFin;
var almacen;
var campoBuscar;
var tablaKardex;
var dataTableKardex;
// botones
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
	almacen = $('#almacen');
	fFin = $('#fFin');
	tablaKardex = $('#tablaKardex');
	campoBuscar = $('#campoBuscar');
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
	
	fecInicio.on("change.datetimepicker", function (e) {
		console.log("entrando change fec desde....")
		if(validarFechas()){
			fecFin.datetimepicker('minDate', e.date);
			buscar(e);
		}else{
			mostrarMensajeValidacion("El rango de fechas es máximo de 6 meses.");
			fecInicio.datetimepicker('date', e.oldDate);
		}
    });
	
    fecFin.on("change.datetimepicker", function (e) {
		console.log("entrando change fec hasta....")
		if(validarFechas()){
			fecInicio.datetimepicker('maxDate', e.date);
			buscar(e);
		}else{
			mostrarMensajeValidacion("El rango de fechas es máximo de 6 meses.");
			fecFin.datetimepicker('date', e.oldDate);
		}
    });
}

function inicializarEventos(){
	
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
	});
	
	almacen.on('change', function (e) {
		buscar();
	});
	
	fInicio.on('keydown', function(e){
		var key = window.Event ? e.which : e.keyCode;
		// si es <>TAB, cancelar
		if(key != 9){
			return false;
		}
	});
	
	fFin.on('keydown', function(e){
		var key = window.Event ? e.which : e.keyCode;
		// si es <>TAB, cancelar
		if(key != 9){
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

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	almacen.val(CADENA_VACIA);
	inicializarFechaInicioFin();
	buscar();
	campoBuscar.focus();
}

function inicializarFechaInicioFin(){
	console.log("inicializarFechaInicioFin....");
	fecFin.datetimepicker('date', moment().format('DD/MM/YYYY'));
	fecFin.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));
	
	var fecFinVal = fecFin.datetimepicker('date');
	var nuevaFecInicioVal 	= moment(fecFinVal).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day');
	fecInicio.datetimepicker('date', nuevaFecInicioVal);
	fecInicio.datetimepicker('maxDate', moment().format('DD/MM/YYYY'));
}

function validarFechas(){
	console.log("validarFechas...");
	
		var fecfecInicioVal = moment(fecInicio.datetimepicker('date'));
		var fecFinVal = moment(fecFin.datetimepicker('date'));
		var diferencia = fecFinVal.diff(fecfecInicioVal, 'days');
		console.log("diferencia--->" + diferencia);
		if(diferencia > ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_REPORTES){
			console.log("dif > 180, falso-....")
			return false;
		}else{
			console.log("dif <= 180, true....")
			return true;
		}			
}

function campoBuscarKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function generarReporte(tipo){
		
    $.ajax({
        type:"Post",
        url : '/appkahaxi/reporteKardex/',
        xhrFields: {
            responseType: 'blob'
        },
        data: {
			fechaInicio	:fecInicio.datetimepicker('date').format('DD/MM/YYYY'),
			fechaFin	:fecFin.datetimepicker('date').format('DD/MM/YYYY'),
			codAlmacen	:almacen.val(),
			desAlmacen	:$("#almacen option:selected").text(),
			datoBuscar	:campoBuscar.val().trim(),
			tipoReporte	:tipo
		},
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
	if ( $.fn.dataTable.isDataTable(tablaKardex)) {
		console.log("ya existe el dt....");
		dataTableKardex.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableKardex.ajax.reload(null, true);
	}
}

function inicializarTabla(){
	
	dataTableKardex = tablaKardex.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.fechaInicio	= fecInicio.datetimepicker('date').format('DD/MM/YYYY');
				d.fechaFin		= fecFin.datetimepicker('date').format('DD/MM/YYYY');
				d.codAlmacen	= almacen.val();
				d.datoBuscar	= campoBuscar.val().trim();
		    },
            url: '/appkahaxi/listarReporteKardex/',
            dataSrc: function (json) {
				console.log("listarReporteKardex...success");
            	return json;
            },
            error: function (xhr, error, code){

            }
        },
        "responsive"	: false,
        "scrollCollapse": false,
		"ordering"      : true,
        "dom"			: '<ip<rt>lp>',
       	"lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
        "deferRender"   : true,
        "autoWidth"		: false,
        "columnDefs"    : [
            {
                "width": "5px",
                "targets": [0],
                "data": "NRO_DOCUMENTO"
            },
            {
                "width": "10px",
                "targets": [1],
                "data": "FEC_REGISTRO"
            },
            {
                "width": "75px",
                "targets": [2],
                "data": "TIPO_OPERACION"
            },
			{
                "width": "50px",
                "targets": [3],
                "data": "TIPO_DOCUMENTO"
            },
			{
                "width": "50px",
                "targets": [4],
                "data": "NRO_DOCUMENTO"
            },
			{
                "width": "50px",
                "targets": [5],
                "data": "ALMACEN"
            },
			{
                "width": "50px",
                "targets": [6],
                "data": "COD_ESTANDAR"
            },
			{
                "width": "50px",
                "targets": [7],
                "data": "COD_ANTIGUO"
            },
            {
                "width": "10px",
                "targets": [8],
                "data": "ARTICULO"
            },            
            {
                "width": "10px",
                "targets": [9],
                "data": "N_CANTIDAD"
            }       
         ],
         "fnRowCallback":
                 function(row, data, iDisplayIndex, iDisplayIndexFull){					
                     var index = iDisplayIndexFull + 1;
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

