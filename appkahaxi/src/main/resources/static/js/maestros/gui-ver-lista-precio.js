var titulo;
var opcion;
var formListaPrecio;
var idListaPrecio;
var datoBuscar;
var descripcion;
var moneda;
var activoCab;
var btnVolver;
var tableDetalle;


$(document).ready(function() {
	inicializarVariables();	
	inicializarComponentes();
});

function inicializarVariables() {
	titulo = $("#titulo");
	opcion = $("#opcion");
	datoBuscar = $("#datoBuscar");
	formListaPrecio = $("#formListaPrecio");
	idListaPrecio = $("#idListaPrecio");
	datoBuscar = $("#datoBuscar");	
	descripcion = $("#descripcion");
	moneda = $("#moneda");	
	activoCab = $("#activoCab");
	btnVolver = $("#btnVolver");
	tableDetalle = $("#tableDetalle");
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
	cargarCabecera();
	cargarDetalle();
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function() {
		$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-up');
	}).on('hide.bs.collapse', function() {
		$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-down');
	});
}


/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function inicializarEventos() {
	
	btnVolver.on("click", function() {
		volver();
	});
	
}

function volver() {
	var params;
	var datoBusca = datoBuscar.text();

	params = "datoBuscar=" + datoBusca;
	window.location.href = "/appkahaxi/lista-precios?" + params;
}
	
function cargarDetalle(){
	
	tableDetalle.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.idListaPrecio	= idListaPrecio.text();
		    },
            url: '/appkahaxi/buscarListaPrecioDetalle/',
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
                "data": "codArticulo"
            },
            {
                "width": "50px",
                "targets": [2],
                "data": "codEstandar"
            },
			{
                "width": "50px",
                "targets": [3],
                "data": "codAntiguo"
            },
			{
                "width": "80px",
                "targets": [4],
                "data": "descripcion"
            },
			{
                "width": "50px",
                "targets": [5],
                "data": "descMarcaArticulo"
            },
			{
                "width": "50px",
                "targets": [6],
                "data": "descTipo"
            },
			{
                "width": "50px",
                "targets": [7],
                "data": "descSeccion"
            },
			{
                "width": "50px",
                "targets": [8],
                "data": "descUndMedida"
            },
			{
                "width": "50px",
                "targets": [9],
                "data": "ultPrecioCompra"
            },
			{
                "width": "50px",
                "targets": [10],
                "data": "precioRef"
            },
			{
                "width": "50px",
                "targets": [11],
                "data": "precio"
            },
			{
                    "width": "5px",
                    "targets": [12],
                    "data": "activo",
                    render: function(data, type, row) {
                        if (data === 1) {
                            return '<input type="checkbox" class="editor-active" onclick="return false;" checked>';
                        } else {
                            return '<input type="checkbox" class="editor-active" onclick="return false;">';
                        }
                    },
                    className: "dt-body-center text-center"
            }           
         ],
         "fnRowCallback":
                 function(row, data, iDisplayIndex, iDisplayIndexFull){					
                     var index = iDisplayIndexFull + 1;
					 // colocando la numeración
                     $('td:eq(0)', row).html(index);
					 // colocando el estilo de la moneda
					 if(moneda.val() == Moneda.SOLES){
						 $('td:eq(9)', row).addClass('dt-body-right listado-symbol-sol');
						 $('td:eq(10)', row).addClass('dt-body-right listado-symbol-sol');
						 $('td:eq(11)', row).addClass('dt-body-right listado-symbol-sol');
					 }else{
						 $('td:eq(9)', row).addClass('dt-body-right listado-symbol-dolar');
						 $('td:eq(10)', row).addClass('dt-body-right listado-symbol-dolar');						
						 $('td:eq(11)', row).addClass('dt-body-right listado-symbol-dolar');
					 }
					// modificando el tamaño de los caracteres del listado 
					$(row).addClass("listado-tam-caracteres");
                     return row;
                 },
         "language"  : {
            "url": "/appkahaxi/language/Spanish.json"
         }
    });

}

function cargarCabecera() {
	console.log("cargarCabecera...success" + idListaPrecio.text());
	
	var idLP = idListaPrecio.text();

	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarListaPrecio/' + idLP,
		data: null,
		dataType: 'text',
		beforeSend: function(xhr) {
			console.log("beforeSend loadding...success" );
			loadding(true);	
		},
		success: function(result, textStatus, xhr) {
			if (xhr.status == HttpStatus.OK) {
				var data = JSON.parse(result);				
				cargardatos(data);								
			}
			loadding(false);
			window.scrollTo(0, 0);
		},
		error: function(xhr, error, code) {
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function cargardatos(data) {	
	idListaPrecio.text(data.idListaPrecio);
	descripcion.val(data.descripcion);
	moneda.val(data.codMoneda);
	(data.activo == 1) ? activoCab.prop('checked', true):activoCab.prop('checked', false);	
	calcularPorTipoMoneda();	
	deshabilitarControl(descripcion);
	deshabilitarControl(moneda);
	deshabilitarControl(activoCab);
}


function calcularPorTipoMoneda() {
	var tipoMonedaVal = moneda.val();
	
	if(tipoMonedaVal == Moneda.SOLES) {
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}else{
		$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
	}
}

