var fileAdjunto;
var campoBuscar;
// botones
var titulo;
var listaPrecioModal;
var form_validado_listaPrecio;
var btnLimpiar;
var btnNuevo;
var btnDescargar;
var btnDescargarMod;
var divDescargar;

var frmListaPrecios;
var idListaPre;
var descripcionModal;
var monedaModal;
var activoModal;
var fileExcel;
var nombreArchivo;
var btnCargar;
var btnGrabarModal;
var btnCerrarModal;

// tablas
var tablaListaPrecios;
var dataTableListaPrecios;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {		
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	campoBuscar = $('#campoBuscar');	
	btnLimpiar = $('#btnLimpiar');
	listaPrecioModal = $('#listaPrecioModal');
	form_validado_listaPrecio = $('#form_validado_listaPrecio');
	btnNuevo = $('#btnNuevo');
	btnDescargar = $('#btnDescargar');
	btnDescargarMod = $('#btnDescargarMod');
	divDescargar = $('#divDescargar');
	tablaListaPrecios  = $('#tablaListaPrecios');
	frmListaPrecios = $('#frmListaPrecios');
	idListaPre = $('#idListaPre');
	descripcionModal = $('#descripcionModal');
	monedaModal = $('#monedaModal');
	activoModal = $('#activoModal'); 
	fileExcel = $('#fileExcel');
	nombreArchivo = $('#nombreArchivo');
	btnCargar = $('#btnCargar');
	
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	titulo = $('#titulo');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {
	idListaPre.text('0');
	activoModal.prop('checked', true);
	deshabilitarControl(nombreArchivo);
	campoBuscar.focus();
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-up');
    }).on('hide.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-down');
    });
}

function inicializarEventos(){
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
	
	btnDescargar.on("click", function(e) {
		descargar('0');
		descripcionModal.focus();
	});
	
	btnDescargarMod.on("click", function(e) {
		descargar(idListaPre.text());
	});	
	
	btnCargar.on("click", function(e) {
		console.log("boton");
		fileExcel.click();
	});
	
	fileExcel.on("change",function(){
		console.log("fileexcel");
        var file =  fileExcel.get(0).files[0];

        if ($(this).val() != CADENA_VACIA) {
            nombreFile   =   file.name;
            var ext      =   file.name.split('.').pop().toLowerCase();
			var bytes 	 = 	 fileExcel[0].files[0].size;

            if(ext == 'xls' || ext == 'xlsx'){
                // máximo 100kb
                if(bytes > 307200){
					mostrarMensajeValidacion("Se solicita un archivo con un tamaño no mayor a 300KB . Por favor verificar.");
                }
				else if(bytes == 0){
					mostrarMensajeValidacion("El archivo no puede estar vacío. Por favor verificar.");
                }
				else{
					nombreArchivo.text(nombreFile);
					fileAdjunto = file;
				}
            }else{
				mostrarMensajeValidacion("Sólo se permite un archivo Excel (extensión xls o xlsx). Extensión no permitida: " + ext);
            }
        }
    });

	btnGrabarModal.on("click", function(e) {
		e.preventDefault();			
        if (form_validado_listaPrecio[0].checkValidity() === false) {            
            e.stopPropagation();
        }else {
            console.log('else registra lista--->');
			if (fileAdjunto == CADENA_VACIA || fileAdjunto == UNDEFINED) {
				mostrarDialogoGrabarLista();
			}
			else{
				registrarListaPrecio();
			}			
        }
        form_validado_listaPrecio.addClass('was-validated');
	});
	
	btnCerrarModal.on("click", function(e) {
		limpiarModal();
	});
        
	btnNuevo.on("click", function() {
		form_validado_listaPrecio.removeClass('was-validated');
		ocultarControl(divDescargar);
		mostrarModal(listaPrecioModal);
		titulo.text(DescripcionOpcion.DES_NUEVO);
		fileAdjunto = CADENA_VACIA;
		idListaPre.text('0');
	});
	
	listaPrecioModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
}

function inicializarTabla(){
	
	dataTableListaPrecios = tablaListaPrecios.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar	= campoBuscar.val().trim();
		    },
            url: '/appkahaxi/listarListaPrecios/',
            dataSrc: function (json) {
				console.log("listarListaPrecios...success");
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
                "data": "id"
            },
            {
                "width": "10px",
                "targets": [1],
                "data": "id",
				"visible": false
            },
            {
                "width": "75px",
                "targets": [2],
                "data": "descripcion"
            },
			{
                "width": "75px",
                "targets": [3],
                "data": "desMoneda"
            },
			{
                "width": "50px",
                "targets": [4],
                "data": "codigoUsuarioRegistra"
            },
			{
                "width": "50px",
                "targets": [5],
                "data": "fechaRegistro"
            },
			{
                    "width": "5px",
                    "targets": [6],
                    "data": "activo",
                    render: function(data, type, row) {
                        if (data === 1) {
                            return '<input type="checkbox" class="editor-active" onclick="return false;" checked>';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    },
                    className: "dt-body-center text-center"
            },   
            {
                    "width": "10px",
                    "targets": [7],
                    "className": "dt-center",
                    "data": null,
                    "orderable": false,
					"render":
                    function (data, type, row ) {
                    	return  "<div style='display:flex;justify-content:space-around;'>" +
                        			"<button title='Ver' class='btn-view btn btn-info btn-xs'>" +
							                    "<span><i class=\"fas fa-eye\"></i></span>" +
							                "</button>" +											
							                "<button title='Modificar' class='btn-edit btn btn-primary btn-xs'>" +
                                                "<span><i class=\"fas fa-edit\"></i></span>" +
                                            "</button>" +											
				                "</div>";
                    }                    
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

	$('#tablaListaPrecios tbody').on( 'click','.btn-view', function () {
	    var data = dataTableListaPrecios.row( $(this).closest('tr')).data();
		verListaPrecio((data.idListaPrecio == null) ? 0 : data.idListaPrecio, Opcion.VER);
	});
  
	$('#tablaListaPrecios tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableListaPrecios.row( $(this).closest('tr')).data();		
		editarListaPrecio(data);
	});
}

/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(){
	var datoBuscar = campoBuscar.val().trim();
	console.log('datoBuscar--->' + datoBuscar);
	buscar();
}

function nuevaListaPrecio(idListaPrecio, opcion){
	var params;
	var datoBuscar 	= campoBuscar.val();
	
	// armando los parámetros
	params = "idListaPrecio=" + idListaPrecio + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar;
	console.log("nuevaListaPrecio---> params:" + params);
	window.location.href = "/appkahaxi/nueva-lista-precio?" + params;
}

function verListaPrecio(idListaPrecio, opcion){
	var params;
	var datoBuscar 	= campoBuscar.val();
	
	// armando los parámetros
	params = "idListaPrecio=" + idListaPrecio + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar;
	console.log("verListaPrecio---> params:" + params);
	window.location.href = "/appkahaxi/ver-lista-precio?" + params;
}

function buscar(){	
	if ( $.fn.dataTable.isDataTable(tablaListaPrecios)) {
		console.log("ya existe el dt....");
		dataTableListaPrecios.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableListaPrecios.ajax.reload(null, true);
	}
}

function mostrarDialogoGrabarLista() {

	bootbox.confirm({
		message: "No existe ningún archivo adjunto. ¿Está seguro de grabar?",

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
		callback: function(result) {
			if (result == true) {
				registrarListaPrecio();
			}
		}
	});
}

function registrarListaPrecio() {
	var chkActivo = null;
	var idLP;
	var metodo = CADENA_VACIA;
	
	(activoModal.is(':checked')) ? chkActivo = 1 : chkActivo = 0;
	(idListaPre.text().trim() == CADENA_VACIA) ? idLP = 0 : idLP = idListaPre.text();
	
	var objetoJson = {
		idListaPrecio	: idLP,
		descripcion		: descripcionModal.val(),
		codMoneda		: monedaModal.val(),
		activo			: chkActivo		
	};
	
	var entityJsonStr = JSON.stringify(objetoJson);
	var formData = new FormData();
	
	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));
	
	console.log("fileAdjunto:"+fileAdjunto);
	
	if (fileAdjunto != CADENA_VACIA && fileAdjunto != UNDEFINED) {
		if (fileAdjunto instanceof Uint8Array) {
			fileAdjunto = new File(fileAdjunto, fileAdjunto.name, { type: "application/octet-stream" })
		}
		formData.append('archivoExcel', fileAdjunto);
		metodo = 'registrarListaPrecioCf';
	}else {
		metodo = 'registrarListaPrecioSf';
	}
	
	console.log("metodo:" + metodo);
	console.log("registrarListaPrecio:" + entityJsonStr);
	
	$.ajax({
		type: "POST",
		contentType: false,
		processData: false,
		url: '/appkahaxi/' + metodo + '/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(resultado, textStatus, xhr) {
			if (xhr.status == HttpStatus.OK) {
				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				ocultarModal(listaPrecioModal);
				limpiarModal();
				buscar();
			} else if (xhr.status == HttpStatus.Accepted) {
				fileAdjunto = CADENA_VACIA;
				nombreArchivo.text(CADENA_VACIA);
				mostrarMensajeValidacion(resultado);
			}
			loadding(false);
		},
		error: function(xhr, error, code) {			
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function editarListaPrecio(data){
	console.log(data);
	var id = (data.idListaPrecio == null) ? 0 : data.idListaPrecio;
	
	fileAdjunto = CADENA_VACIA;
	titulo.text(DescripcionOpcion.DES_MODIFICAR);
	idListaPre.text(id);
	descripcionModal.val(data.descripcion);
	monedaModal.val(data.codMoneda);
	(data.activo == FlagActivo.ACTIVO) ? activoModal.prop('checked', true) : activoModal.prop('checked', false);	
	mostrarControl(divDescargar);
	mostrarModal(listaPrecioModal);	
}


function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	buscar();	
	campoBuscar.focus();
}

function limpiarModal(){
	fileAdjunto = CADENA_VACIA;
	monedaModal.val(CADENA_VACIA);
	descripcionModal.val(CADENA_VACIA);
	fileExcel.val(CADENA_VACIA);
	nombreArchivo.text(CADENA_VACIA);
	mostrarControl(divDescargar);
	ocultarModal(listaPrecioModal);	
}

function descargar(id) {

	$.ajax({
		type: "Post",
		url: '/appkahaxi/plantillaListaPrecios/',
		xhrFields: {
			responseType: 'blob'
		},
		data: {
				idListaPrecio : id
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


