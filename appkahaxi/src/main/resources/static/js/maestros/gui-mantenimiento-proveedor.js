var desCatalogo;
// campos de formulario principal
var formSocioNegocio;
var campoBuscar;
var tipoDocumento;
// campos de formulario modal
var form_validado_SocioNegocio;
var form_SocioNegocioModal;
var tituloModal;
var tituloMantenimiento;
var tipoSocio;

// botones
var btnLimpiar;
var btnNuevo;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaSocioNegocio;
var dataTableSocioNegocio;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	parametrizacionTipoSN();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	formSocioNegocio = $('#formSocioNegocio');
	form_SocioNegocioModal = $('#socioNegocioModal');
	form_validado_SocioNegocio = $("#form_validado_SocioNegocio");
	tituloModal = $('#tituloModal');
	tituloMantenimiento = $('#tituloMantenimiento');
	tipoSocio = $('#tipoSocio');
	campoBuscar = $('#campoBuscar');
	tipoDocumento =  $('#tipoDocumento');
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');	
	tablaSocioNegocio  = $('#tablaSocioNegocio');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {	
	campoBuscar.focus();
}

function inicializarEventos(){
	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp();
	});
	
	form_SocioNegocioModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_SocioNegocioModal.on('shown.bs.modal', function () {
	  codigoEstandarModal.trigger('focus');
	})
		
	tipoDocumento.on('change', function (e) {
		buscar();
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		cargarSocioNegocio(null, Opcion.NUEVO);		
	});
	
}


function inicializarTabla(){
	
	dataTableSocioNegocio = tablaSocioNegocio.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.tipoSn 		= tipoSocio.text();
				d.datoBuscar 	= campoBuscar.val().trim();
				d.tipoDoc		= tipoDocumento.val().trim();
		    },
            url: '/appkahaxi/listarSocioNegocio/',
                dataSrc: function (json) {
				console.log("listarSocioNegocio...success");
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
                    "width": "3px",
                    "targets": 0,
                    "data": "id"
                },
                {
                    "width": "30px",
                    "targets": [1],
                    "data": "codigoSocio"
                },
				/*{
                    "width": "30px",
                    "targets": [2],
                    "data": "fechaRegistro"
                },*/
				{
                    "width": "40px",
                    "targets": [2],
                    "data": "descripcionTipoDocumento"
                },
                {
                    "width": "50px",
                    "targets": [3],
                    "data": "numeroDocumento"
                },
                {
                    "width": "250px",
                    "targets": [4],
                    "data": "nombreRazonSocial"
                }, 
				{
                    "width": "80px",
                    "targets": [5],
                    "data": "contacto"
                },               
				{
                    "width": "80px",
                    "targets": [6],
                    "data": "telefono"
                },
                {
                    "width": "40px",
                    "targets": [7],
                    "data": "email"
                },				
				{
                    "width": "2px",
                    "targets": [8],
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
                    "width": "20px",
                    "targets": [9],
                    "className": "dt-body-left",
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
                 function(row, aData, iDisplayIndex, iDisplayIndexFull){
                     var index = iDisplayIndexFull + 1;
                     $('td:eq(0)', row).html(index);

					// modificando el tamaño de los caracteres del listado 
					$(row).addClass("listado-tam-caracteres");
                     return row;
                 },
             "language"  : {
                "url": "/appkahaxi/language/Spanish.json"
            }
    });
	
	$('#tablaSocioNegocio tbody').on( 'click','.btn-view', function () {
	    var data = dataTableSocioNegocio.row( $(this).closest('tr')).data();	    
		console.log('ver Socio Negocio--->' + data.codigoSocio);
		cargarSocioNegocio(data.codigoSocio, Opcion.VER);
	});
	
	$('#tablaSocioNegocio tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableSocioNegocio.row( $(this).closest('tr')).data();
		console.log('editar Socio Negocio--->' + data.codigoSocio);
		cargarSocioNegocio(data.codigoSocio, Opcion.MODIFICAR);
	});
	
}


/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(){
	var datoBuscar = campoBuscar.val().trim();
	buscar();
}

function buscar(){
	var form1 = formSocioNegocio;

	if ( $.fn.dataTable.isDataTable('#tablaSocioNegocio')) {
		console.log("ya existe el dt....");
		dataTableSocioNegocio.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableSocioNegocio.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	tipoDocumento.val(CADENA_VACIA);
	buscar();
	campoBuscar.focus();
}

function parametrizacionTipoSN(){
	//Define el tipo de Socio de Negocio
	var tipo = tipoSocio.text();
	
	console.log("Tipo Socio:" + tipoSocio.text());
	
	if (tipo == CodigoSocio.CLIENTE){		
		desCatalogo = DecripcionSocio.DES_CLIENTE;
		tituloMantenimiento.text(desCatalogo.toUpperCase());
	}
	if (tipo == CodigoSocio.PROVEEDOR){
		desCatalogo = DecripcionSocio.DES_PROVEEDOR;
		tituloMantenimiento.text(desCatalogo.toUpperCase());
	}
}

function cargarSocioNegocio(codigoSn, opcion){
	var params;
	var datoBuscar 		= campoBuscar.val();
	var tipoDoc			= tipoDocumento.val();
	var tipoSoc			= tipoSocio.text()

	// armando los parámetros
	params = "codigoSocio=" + codigoSn + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar + "&tipoDoc=" + tipoDoc + "&tipoSn=" + tipoSoc + "&volver=" + Respuesta.SI;

	window.location.href = "/appkahaxi/nuevo-proveedor?" + params;
}




