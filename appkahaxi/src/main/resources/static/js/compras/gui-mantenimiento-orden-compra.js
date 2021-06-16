// campos de formulario
var formOrdenCompra;
var campoBuscar;
var nroOC;
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
var btnNuevo;
// tablas
var tablaOrdenCompra;
var dataTableOrdenCompra;

/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function(){

	inicializarVariables();

	inicializarComponentes();

	inicializarPantalla();
});

function inicializarVariables() {
	formOrdenCompra = $('#formOrdenCompra');
	campoBuscar = $('#campoBuscar');
	nroOC = $('#nroOC');
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
	btnNuevo = $('#btnNuevo');

	tablaOrdenCompra  = $('#tablaOrdenCompra');
}

function inicializarComponentes() {

	habilitarAnimacionAcordion();
	construirFechasPicker();
	retringirSeleccionFechas();
	//inicializarFechaContaDesdeHasta();
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

function construirFechasPicker() {
	console.log("construirFechasPicker...");
	fecContaHasta.datetimepicker({
		locale: 		'es',
		format: 		'L',
		maxDate:		new Date(),
		ignoreReadonly:  true,
		//minDate:		moment(new Date()).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day'),
		//date: 			new Date()
		date: 			moment(new Date())
    });

    fecContaDesde.datetimepicker({
		locale: 		'es',
		format: 		'L',
		maxDate:		new Date(),
		ignoreReadonly:  true,
		date:			moment(new Date()).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day')
    });
}

function validarFechas(){
	console.log("validarFechas...");
	
	var fecContaDesdeVal = moment(fecContaDesde.datetimepicker('date'));
	var fecContaHastaVal = moment(fecContaHasta.datetimepicker('date'));
	var diferencia = fecContaHastaVal.diff(fecContaDesdeVal, 'days');
	console.log("diferencia--->" + diferencia);
	if(diferencia > ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS){
		console.log("dif > 90, falso-....")
		return false;
	}else{
		console.log("dif <= 90, true....")
		return true;
	}
}

function retringirSeleccionFechas() {

	console.log("retringirSeleccionFechas...");
	
	fecContaDesde.on("change.datetimepicker", function (e) {
		console.log("entrando change fec desde....")
		if(validarFechas()){
			fecContaHasta.datetimepicker('minDate', e.date);
			console.log("change desde....")
			buscar(e);
		}else{
			mostrarDialogoInformacion("El rango de fechas es máximo de 3 meses.", Boton.WARNING);
			fecContaDesde.datetimepicker('date', e.oldDate);
		}
    });
	
    fecContaHasta.on("change.datetimepicker", function (e) {
		console.log("entrando change fec hasta....")
		if(validarFechas()){
			fecContaDesde.datetimepicker('maxDate', e.date);
			console.log("change hasta....")
			buscar(e);
		}else{
			mostrarDialogoInformacion("El rango de fechas es máximo de 3 meses.", Boton.WARNING);
			fecContaHasta.datetimepicker('date', e.oldDate);
		}
    });
}

function inicializarFechaContaDesdeHasta(){

	console.log("inicializarFechaContaDesdeHasta....");
	fecContaHasta.datetimepicker('date', fechaHasta.text() == '' ? moment().format('DD/MM/YYYY') : fechaHasta.text());
	var fecContaHastaVal = fecContaHasta.datetimepicker('date');
	var nuevaFecContaDesdeVal 	= moment(fecContaHastaVal).add(-ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO , 'day');
	fecContaDesde.datetimepicker('date', fechaDesde.text() == '' ? nuevaFecContaDesdeVal : fechaDesde.text());
}

function inicializarEventos(){

	campoBuscar.on('keyup', function (e) {
		campoBuscarKeyUp(e);
	});
	
	nroOC.on('keyup', function (e) {
		nroOCKeyUp(e);
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
    
    btnNuevo.click(function(){
    	nuevaOrdenCompra(null, Opcion.NUEVO);
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

	console.log("estado-->" + estado.val());
	dataTableOrdenCompra = tablaOrdenCompra.DataTable({
        "ajax": {
            // se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 		= campoBuscar.val().trim();
            	d.nroOrdenCompra	= nroOC.val().trim();
            	d.codRepuesto		= codRepuesto.val().trim();
            	d.codEstado 		= estado.val();
            	d.fechaDesde 		= fecContaDesde.datetimepicker('date').format('YYYY-MM-DD');
            	d.fechaHasta 		= fecContaHasta.datetimepicker('date').format('YYYY-MM-DD');
		    },
            url: '/appkahaxi/listarOrdenCompra/',
            dataSrc: function (json) {
            	console.log("listarOrdenCompra...success");
            	return json;
            },
            error: function (xhr, error, code){
            	
            }
        },
		"stateSave": true,
		"responsive"	: false,
        "scrollCollapse": false,
        //"paging"        : false,
        "ordering"      : true,
        "dom"           :   "<'row'<'col-sm-8'i><'col-sm-4'>>" +
			                "<'row'<'col-sm-12'rt>>" +
			                "<'row'<'col-sm-4'l><'col-sm-8'p>>",
        //"processing"    : true,
		"lengthMenu"	: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        "deferRender"   : true,
        "autoWidth"		: false,
        /*"fixedColumns"	: false,*/
        "columnDefs"    : [
            {
                "width": "1px",
                "targets": [0],
                "data": "id"
            },
            {
                "width": "30px",
                "targets": [1],
                "data": "numeroDocumento"
            },
            {
                "width": "5px",
                "targets": [2],
                "data": "codigoCliente",
                "visible": false
            },
            {
                "width": "40px",
                "targets": [3],
                "data": "fechaRegistro"
            },
            {
                "width": "40px",
                "targets": [4],
                "data": "nroDocCliente"
            },
            {
                "width": "300px",
                "targets": [5],
                "data": "nombreCliente"
            },
            {
                "width": "30px",
                "targets": [6],
                "data": "fechaContabilizacion"
            },
            {
                "width": "80px",
                "targets": [7],
                "data": "descripcionTipoMoneda"
                
            },
            {
                "width": "30px",
                "targets": [8],
                "data": "descripcionCondPago"
                
            },
            {
                "width": "50px",
                "targets": [9],
                "data": "descripcionEstado"
            },
            {
                "width": "80px",
                "targets": [10],
                "data": "total",
				"render":
                    function (data, type, row ) {
                        return  convertirNumeroAMoneda(data);
                    }
            },
            {
                "width": "5px",
                "targets": [11],
                "data": "activo",
                "className": "dt-body-center",
                "orderable": false,
                "render":
                    function (data, type, row ) {
                    	return  "<div>" +
                        			"<button title='Ver Orden' class='btn-view btn btn-info btn-xs'>" +
                        				"<span><i class=\"fas fa-eye\"></i></span>" +
					                "</button>" +
					                "<button title='Duplicar' class='btn-copy btn btn-success btn-xs'>" +
			                            "<span><i class=\"far fa-copy\"></i></span>" +
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
					$('td:eq(9)', row).addClass('dt-body-right listado-symbol-sol');
				}else{
					$('td:eq(9)', row).addClass('dt-body-right listado-symbol-dolar');
				}
				
				// pintando las filas según estado
                if(data.codigoEstado == EstadoDocumentoInicial.RECHAZADO){
            		$(row).addClass("estadoRechazado");
            	}else if(data.codigoEstado == EstadoDocumentoInicial.APROBADO){
					if(data.codigoEstadoProceso == EstadoProceso.ABIERTO){
						$(row).addClass("estadoAprobadoAbierto");	
					}else{
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
	
	$('#tablaOrdenCompra tbody').on('click','.btn-view', function () {
	    var data = dataTableOrdenCompra.row( $(this).closest('tr')).data();
	    console.log("data.numeroDocument-->" + data.numeroDocumento)
		nuevaOrdenCompra(data.numeroDocumento, Opcion.VER);
	});
	 
	$('#tablaOrdenCompra tbody').on('click','.btn-copy', function () {
	    var data = dataTableOrdenCompra.row( $(this).closest('tr')).data();
	    nuevaOrdenCompra(data.numeroDocumento, Opcion.DUPLICAR);
	});

}


/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(e){

	var datoBuscar = campoBuscar.val().trim();
	console.log('datoBuscar--->' + datoBuscar);
	var key = window.Event ? e.which : e.keyCode;
	console.log("***key--->" + key)
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		console.log("es TRUE!!!")
		buscar(e);
	}
}

function nroOCKeyUp(e){
	var nroOCVal = nroOC.val().trim();
	console.log('nroOC--->' + nroOCVal);
	var key = window.Event ? e.which : e.keyCode;
	console.log("***key--->" + key)
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		console.log("es TRUE!!!")
		buscar(e);
	}
}

function codRepuestoKeyUp(e){
	var codRpto = codRepuesto.val().trim();
	console.log('codRepuesto--->' + codRpto);
	var key = window.Event ? e.which : e.keyCode;
	console.log("***key--->" + key)
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		console.log("es TRUE!!!")
		buscar(e);
	}
}

function nuevaOrdenCompra(numeroDocumento, opcion){
	var params;
	var datoBuscar 			= campoBuscar.val();
	var nroOCVal 			= nroOC.val();
	var codRpto 			= codRepuesto.val();
	var fecContDesde 		= fecContaDesde.datetimepicker('date').format('L');
	var fecContHasta 		= fecContaHasta.datetimepicker('date').format('L');
	var est 				= estado.val();
	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar +  
			 "&nroOrdenCompra=" + nroOCVal + "&codRepuesto=" + codRpto + "&fechaDesde=" + fecContDesde + "&fechaHasta=" + fecContHasta + 
		     "&estadoParam=" + est + "&volver=" + Volver.SI;
	console.log("nuevaOrdenCompra---> params:" + params);
	window.location.href = "/appkahaxi/nueva-orden-compra?" + params;
}

function buscar(event){
	var form1 = formOrdenCompra;
	event.preventDefault();

	if (form1[0].checkValidity() == false) {
		console.log("validado FALSE!!!....")
        event.stopPropagation();
    }else{
		event.stopPropagation();
		console.log("entrando validado....validadno fechas")
		if ( $.fn.dataTable.isDataTable('#tablaOrdenCompra')) {
		    console.log("ya existe el dt....");
			//dataTableOrdenCompra.clear().draw(); <--- al usar esta rutina se produce un parpadeo de la tabla
			dataTableOrdenCompra.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
			dataTableOrdenCompra.ajax.reload(null, true);
		}
	}
	form1.addClass('was-validated');
}

function limpiar(e){
	campoBuscar.val(CADENA_VACIA);
	inicializarFechaContaDesdeHasta();
	estado.val(CADENA_VACIA);
	buscar(e);
	campoBuscar.focus();
}