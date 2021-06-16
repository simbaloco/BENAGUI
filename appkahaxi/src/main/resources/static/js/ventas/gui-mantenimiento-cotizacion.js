// campos de formulario
var formCotizacion;
var campoBuscar;
var nroCotizacion;
var nroRequerimiento;
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
var tablaCotizacionVenta;
var dataTableCotizacionVenta;

/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});
	
function inicializarVariables() {
	formCotizacion = $('#formCotizacion');
	campoBuscar = $('#campoBuscar');
	nroCotizacion = $('#nroCotizacion');
	nroRequerimiento = $('#nroRequerimiento');
	codRepuesto = $('#codRepuesto');
	fecContaDesde = $('#fecContaDesde');
	fecContaHasta = $('#fecContaHasta');
	
	fContaDesde = $('#fContaDesde');
	fContaHasta = $('#fContaHasta');
	
	estado = $('#estado');
	fechaDesde = $('#fechaDesde');
	fechaHasta = $('#fechaHasta');
	
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	
	tablaCotizacionVenta  = $('#tablaCotizacionVenta');
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
	
	nroCotizacion.on('keyup', function (e) {
		nroCotizacionKeyUp(e);
	});
	
	nroRequerimiento.on('keyup', function (e) {
		nroRequerimientoKeyUp(e);
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
    	nuevaCotizacionVenta(null, Opcion.NUEVO);
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
	dataTableCotizacionVenta = tablaCotizacionVenta.DataTable({
        "ajax": {
            // se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 		= campoBuscar.val().trim();
            	d.nroCotizacion		= nroCotizacion.val().trim();
            	d.nroRequerimiento	= nroRequerimiento.val().trim();
            	d.codRepuesto		= codRepuesto.val().trim();
            	d.codEstado 		= estado.val();
            	d.fechaDesde 		= fecContaDesde.datetimepicker('date').format('YYYY-MM-DD');
            	d.fechaHasta 		= fecContaHasta.datetimepicker('date').format('YYYY-MM-DD');
		    },
            url: '/appkahaxi/listarCotizacionesVenta/',
            dataSrc: function (json) {
            	console.log("listarCotizacionesVenta...success");
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
                "width": "50px",
                "targets": [2],
                "data": "nroRequerimiento"
            },
            {
                "width": "5px",
                "targets": [3],
                "data": "codigoCliente",
                "visible": false
            },
            {
                "width": "40px",
                "targets": [4],
                "data": "fechaRegistro"
            },
            {
                "width": "40px",
                "targets": [5],
                "data": "nroDocCliente"
            },
            {
                "width": "300px",
                "targets": [6],
                "data": "nombreCliente"
            },
            {
                "width": "30px",
                "targets": [7],
                "data": "fechaContabilizacion"
            },
            {
                "width": "80px",
                "targets": [8],
                "data": "descripcionTipoMoneda"
                
            },
            {
                "width": "30px",
                "targets": [9],
                "data": "descripcionCondPago"
                
            },
            {
                "width": "50px",
                "targets": [10],
                "data": "descripcionEstado"
            },
            {
                "width": "80px",
                "targets": [11],
                "data": "total",
				"render":
                    function (data, type, row ) {
                        return  convertirNumeroAMoneda(data);
                    }
            },
            {
                "width": "5px",
                "targets": [12],
                "data": "activo",
                "className": "dt-body-center",
                "orderable": false,
                "render":
                    function (data, type, row ) {
                    	return  "<div>" +
                        			"<button title='Ver cotización' class='btn-view btn btn-info btn-xs'>" +
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
					$('td:eq(10)', row).addClass('dt-body-right listado-symbol-sol');
				}else{
					$('td:eq(10)', row).addClass('dt-body-right listado-symbol-dolar');
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
	
	$('#tablaCotizacionVenta tbody').on( 'click','.btn-view', function () {
	    var data = dataTableCotizacionVenta.row( $(this).closest('tr')).data();
	    nuevaCotizacionVenta(data.numeroDocumento, Opcion.VER);
	});
	 
	$('#tablaCotizacionVenta tbody').on( 'click','.btn-copy', function () {
	    var data = dataTableCotizacionVenta.row( $(this).closest('tr')).data();
	    nuevaCotizacionVenta(data.numeroDocumento, Opcion.DUPLICAR);
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

function nroCotizacionKeyUp(e){
	var nroCotiz = nroCotizacion.val().trim();
	console.log('nroCotizacion--->' + nroCotiz);
	var key = window.Event ? e.which : e.keyCode;
	console.log("***key--->" + key)
	if((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8 || key == 46 ){ // 65-90 (letras) *** 48-57/96-105 (digitos) *** BACKSPACE *** DELETE
		console.log("es TRUE!!!")
		buscar(e);
	}
}

function nroRequerimientoKeyUp(e){
	var nroReq = nroRequerimiento.val().trim();
	console.log('nroRequerimiento--->' + nroReq);
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

function nuevaCotizacionVenta(numeroDocumento, opcion){
	var params;
	var datoBuscar 			= campoBuscar.val();
	var nroCotiz 			= nroCotizacion.val();
	var nroReq 				= nroRequerimiento.val();
	var codRpto 			= codRepuesto.val();
	var fecContDesde 		= fecContaDesde.datetimepicker('date').format('L');
	var fecContHasta 		= fecContaHasta.datetimepicker('date').format('L');
	
	var est 				= estado.val();
	// armando los parámetros
	params = "numeroDocumento=" + numeroDocumento + "&opcion=" + opcion + "&datoBuscar=" + datoBuscar + 
			 "&nroCotizacion=" + nroCotiz + "&nroRequerimiento=" + nroReq + "&codRepuesto=" + codRpto + 
			 "&fechaDesde=" + fecContDesde + "&fechaHasta=" + fecContHasta + "&estadoParam=" + est + "&volver=" + Volver.SI;
	console.log("nuevaCotizacionVenta---> params:" + params);
	window.location.href = "/appkahaxi/nueva-cotizacion?" + params;
}

function buscar(event){
	var form1 = formCotizacion;
	event.preventDefault();
	if (form1[0].checkValidity() == false) {
		event.stopPropagation();
    }else{
		event.stopPropagation();
		if ( $.fn.dataTable.isDataTable('#tablaCotizacionVenta')) {
		    console.log("**** limpiar tabla");		
			//dataTableCotizacionVenta.clear().draw(); <--- al usar esta rutina se produce un parpadeo de la tabla
			dataTableCotizacionVenta.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
			dataTableCotizacionVenta.ajax.reload(null, true);
		}
	}
	form1.addClass('was-validated');
}

function limpiar(e){
	campoBuscar.val(CADENA_VACIA);
	nroCotizacion.val(CADENA_VACIA);
	nroRequerimiento.val(CADENA_VACIA);
	codRepuesto.val(CADENA_VACIA);
	
	inicializarFechaContaDesdeHasta();
	estado.val(CADENA_VACIA);
	buscar(e);
	campoBuscar.focus();
}