// campos de formulario principal
var almacen;
var campoBuscar;
// botones
var btnExportalExcel;
var btnExportalPdf;

/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();	
	inicializarComponentes();
});

function inicializarVariables() {	
	almacen = $('#almacen');
	campoBuscar = $('#campoBuscar');
	btnExportalExcel = $('#btnExportalExcel');	
	btnExportalPdf = $("#btnExportalPdf");
}

function inicializarComponentes() {
	inicializarEventos();
}

function inicializarEventos(){
		
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
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

function campoBuscarKeyUp(e){
	var datoBuscar = campoBuscar.val().trim();
	console.log('datoBuscar--->' + datoBuscar);
	var key = window.Event ? e.which : e.keyCode;
	console.log("***key--->" + key)
	/*if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
	}*/
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



