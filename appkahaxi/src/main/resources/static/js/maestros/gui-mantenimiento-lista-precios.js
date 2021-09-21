var campoBuscar;
// botones
var btnLimpiar;
var btnNuevo;
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
	btnNuevo = $('#btnNuevo');
	tablaListaPrecios  = $('#tablaListaPrecios');
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	inicializarTabla();
}

function inicializarPantalla() {
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
    
    btnNuevo.click(function(){
    	nuevaListaPrecio(0, Opcion.NUEVO);
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
		nuevaListaPrecio((data.idListaPrecio == null) ? 0 : data.idListaPrecio, Opcion.VER);
	});
  
	$('#tablaListaPrecios tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableListaPrecios.row( $(this).closest('tr')).data();		
		nuevaListaPrecio((data.idListaPrecio == null) ? 0 : data.idListaPrecio, Opcion.MODIFICAR);
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

function buscar(){	
	if ( $.fn.dataTable.isDataTable(tablaListaPrecios)) {
		console.log("ya existe el dt....");
		dataTableListaPrecios.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableListaPrecios.ajax.reload(null, true);
	}
}

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	buscar();	
	campoBuscar.focus();
}
