// campos de formulario
var formGuiaRemision;
var campoBuscar;
var nroGuiaRemision;
var nroOrdenCompra;
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
	nroGuiaRemision = $('#nroGuiaRemision');
	nroOrdenCompra = $('#nroOrdenCompra');
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
				mostrarMensajeValidacion("El rango de fechas es máximo de 3 meses.");
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
				mostrarMensajeValidacion("El rango de fechas es máximo de 3 meses.");
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
	
	nroGuiaRemision.on('keyup', function (e) {
		nroGuiaRemisionKeyUp(e);
	});
	
	nroOrdenCompra.on('keyup', function (e) {
		nroOrdenCompraKeyUp(e);
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
				d.nroGuiaRemision	= nroGuiaRemision.val().trim();
            	d.nroOrdenCompra	= nroOrdenCompra.val().trim();
            	d.codRepuesto		= codRepuesto.val().trim();
            	d.codEstado 		= estado.val();
            	d.fechaDesde 		= fecContaDesde.datetimepicker('date').format('YYYY-MM-DD');
            	d.fechaHasta 		= fecContaHasta.datetimepicker('date').format('YYYY-MM-DD');
		    },
            url: '/appkahaxi/listarGuiaRemisionCompra/',
            dataSrc: function (json) {
            	console.log("listarGuiaRemisionCompra...success");
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
				"data": "ordenCompra"
			},
			{
				
				"targets": [3],
				"data": "fechaRegistroFormato"
			},
            {
                
                "targets": [4],
                "data": "codigoProv",
				"visible": false
            },
            {
               
                "targets": [5],
                "data": "nroDocProv"
            },
            {
                
                "targets": [6],
                "data": "nombreProv"
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
                "data": "codigoEstadoProceso",
				"render":
                    function (data, type, row ) {		
						if(data == EstadoProceso.ABIERTO){
							return "ABIERTO";
						}else if(data == EstadoProceso.EN_PROCESO){
							return "EN PROCESO";
						}else{
							return "CERRADO";
						}
                    }
            },
            {
                
                "targets": [12],
                "data": "total",
				"render":
                    function (data, type, row ) {
                        return  convertirNumeroAMoneda(data);
                    }
            },
            {
                
                "targets": [13],
                "data": "activo",
                "className": "dt-body-center",
                "orderable": false,
                "render":
                    function (data, type, row ) {
                    	return  "<div>" +
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
					$('td:eq(11)', row).addClass('dt-body-right listado-symbol-sol');
				}else{
					$('td:eq(11)', row).addClass('dt-body-right listado-symbol-dolar');
				}
				
				// pintando las filas según estado
                if(data.codigoEstado == EstadoGuiaRemision.ANULADO){
            		$(row).addClass("estadoRechazado");
            	}else if(data.codigoEstado == EstadoGuiaRemision.GENERADO){
					if(data.codigoEstadoProceso == EstadoProceso.CERRADO){
						$(row).addClass("estadoAprobadoCerrado");
					}else if(data.codigoEstadoProceso == EstadoProceso.EN_PROCESO){
						$(row).addClass("estadoAprobadoIntermedio");
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
	
	$('#tablaGuiaRemision tbody').on('click','.btn-view', function () {
	    var data = dataTableGuiaRemision.row( $(this).closest('tr')).data();
	    cargarGuiaRemision(data.numeroDocumento);
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

function nroGuiaRemisionKeyUp(e){
	var key = window.Event ? e.which : e.keyCode;
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		buscar(e);
	}
}

function nroOrdenCompraKeyUp(e){
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

function cargarGuiaRemision(nroGuiaRemisionOrigen) {
	var params;
	
	var campoBuscarFiltro 		= campoBuscar.val();
	var nroGuiaRemisionFiltro 	= nroGuiaRemision.val();
	var nroOrdenCompraFiltro 	= nroOrdenCompra.val();
	var codRepuestoFiltro 		= codRepuesto.val();
	var fecDesdeFiltro 			= fecContaDesde.datetimepicker('date').format('L');
	var fecHastaFiltro 			= fecContaHasta.datetimepicker('date').format('L');
	var estadoFiltro 			= estado.val();
		
	// armando los parámetros
	params = 
		"campoBuscarFiltro=" + campoBuscarFiltro +  
		"&nroGuiaRemisionFiltro=" + nroGuiaRemisionFiltro + 
		"&nroOrdenCompraFiltro=" + nroOrdenCompraFiltro + 
		"&codRepuestoFiltro=" + codRepuestoFiltro + 
		"&fecDesdeFiltro=" + fecDesdeFiltro + 
		"&fecHastaFiltro=" + fecHastaFiltro + 
		"&estadoFiltro=" + estadoFiltro + 
		
		"&deListaOC=" + 
		"&nroOrdenCompraOrigen=" +
		
		"&deListaGR=" + Respuesta.SI +
		"&nroGuiaRemisionOrigen=" + nroGuiaRemisionOrigen +
		"&opcion=" + Opcion.VER;
	
	window.location.href = "/appkahaxi/cargar-guia-remision-compra?" + params;
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
	nroGuiaRemision.val(CADENA_VACIA);
	nroOrdenCompra.val(CADENA_VACIA);
	codRepuesto.val(CADENA_VACIA);
	estado.val(CADENA_VACIA);
	
	fecContaHasta.datetimepicker('destroy');
	fecContaDesde.datetimepicker('destroy');
	construirFechasPicker();
	
	buscar(e);
	campoBuscar.focus();
}