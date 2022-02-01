// campos de formulario principal
var almacen;
var campoBuscar;
var tablaInventario;
var dataTableInventario;
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
	almacen = $('#almacen');
	campoBuscar = $('#campoBuscar');
	tablaInventario = $('#tablaInventario');
	btnExportalExcel = $('#btnExportalExcel');	
	btnExportalPdf = $("#btnExportalPdf");
	btnLimpiar = $("#btnLimpiar");
}

function inicializarComponentes() {
	inicializarEventos();
	inicializarTabla();
}

function inicializarEventos(){
		
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
	});
	
	almacen.on('change', function (e) {
		buscar();
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
	almacen.val(CADENA_VACIA);	
	buscar();
	campoBuscar.focus();
}

function generarReporte(tipo){
	
    $.ajax({
        type:"Post",
        url : '/appkahaxi/reporteInventario/',
        xhrFields: {
            responseType: 'blob'
        },
        data: {
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
	if ( $.fn.dataTable.isDataTable(tablaInventario)) {
		console.log("ya existe el dt....");
		dataTableInventario.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableInventario.ajax.reload(null, true);
	}
}

function inicializarTabla(){
	
	dataTableInventario = tablaInventario.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.codAlmacen	= almacen.val();
				d.datoBuscar	= campoBuscar.val().trim();
		    },
            url: '/appkahaxi/listarReporteInventario/',
            dataSrc: function (json) {
				console.log("listarReporteInventario...success");
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
                "data": "ALMACEN"
            },
            {
                "width": "10px",
                "targets": [1],
                "data": "ALMACEN"
            },
            {
                "width": "75px",
                "targets": [2],
                "data": "COD_ESTANDAR"
            },
			{
                "width": "50px",
                "targets": [3],
                "data": "COD_ANTIGUO"
            },
			{
                "width": "50px",
                "targets": [4],
                "data": "ARTICULO"
            },
			{
                "width": "50px",
                "targets": [5],
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


