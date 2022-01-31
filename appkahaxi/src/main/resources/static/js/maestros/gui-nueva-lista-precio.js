var titulo;
var opcion;
var formListaPrecio;
var idListaPrecio;
var datoBuscar;
var descripcion;
var moneda;
var activoCab;
var tipoCambio;
var btnLimpiar;
var btnVolver;
var btnGrabar;
var tableDetalle;
var tableNuevoDetalle;
var dataTableDetalle;
var indiceFilaDataTableDetalle;
var cantidadDetalle;


$(document).ready(function() {
	inicializarVariables();
	inicializarPantalla();
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
	btnLimpiar = $("#btnLimpiar");
	btnVolver = $("#btnVolver");
	btnGrabar = $("#btnGrabar");
	tableDetalle = $("#tableDetalle");
	tableNuevoDetalle = $("#tableNuevoDetalle"); 
	tipoCambio = $("#tipoCambio"); 
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
}

function inicializarPantalla() {	
	
	if (opcion.text() == Opcion.NUEVO) {
		console.log("NUEVO...success");
		titulo.text("NUEVA");
		moneda.val(Moneda.DOLARES);		
		activoCab.prop('checked', true);
		idListaPrecio.text(CADENA_VACIA);
		inicializarTabla(false);
		
		cargarListaDetalleNuevo();
		habilitarControl(descripcion);
		habilitarControl(moneda);
		deshabilitarControl(activoCab);
		mostrarControl(btnLimpiar);
		mostrarControl(btnGrabar);
		descripcion.focus();
	} else {
		cargarListaConDatos();
	}
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

function volver() {
	var params;
	var datoBusca = datoBuscar.text();

	params = "datoBuscar=" + datoBusca;
	window.location.href = "/appkahaxi/lista-precios?" + params;
}

function inicializarTabla(paginacion) {

	dataTableDetalle = tableDetalle.DataTable({
		"responsive"	: false,
		"scrollCollapse": false,
		"ordering"      : false,
		"deferRender"   : true,
		"autoWidth"		: false,
		"paging"	    : paginacion,
		"dom"			: '<ip<rt>lp>',
        "lengthMenu"	: [[15, 30, 45, -1], [15, 30, 45, "Todos"]],
		"fnRowCallback":
			function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				var index = iDisplayIndexFull + 1;
				$('td:eq(0)', nRow).html(index);
				return nRow;
			},
		"language"  : {
			"url": "/appkahaxi/language/Spanish.json"
		}
	});
}


function agregarFilaEnTablaDetalle() {
	var filaHTML = tableNuevoDetalle.find("tr")[0].outerHTML;
	var fila = dataTableDetalle.row.add($(filaHTML)).draw(false);

	indiceFilaDataTableDetalle = fila.index();
	agregarFilaHTMLEnTablaDetalle();
}

function agregarFilaHTMLEnTablaDetalle() {
	var row = $('#tableDetalle').DataTable().row(':last').nodes().to$().closest("tr").off("mousedown");
	var $tds = row.find("td").not(':first');
	var readonlyText = "";
	var readonlyCheck = "";
	
	if (opcion.text() == Opcion.VER){
		readonlyText = "readonly='readonly' tabindex='-1'";
		readonlyCheck = "pointer-events: none;";
	}
	
	$.each($tds, function(i, el) {

		switch(i) {
			
			// CODIGO ART (OCULTO)
			case 0:		$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='codArticulo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// CODIGO ESTANDAR ART
			case 1:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='codEstandarArticulo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;						
    		        		
			// CODIGO ANTIGUO ART
			case 2:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='codAntiguoArticulo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
    					
    		// DESCRIPCION ART
			case 3:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='descripcion_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
			
			// MARCA
			case 4:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='marcaArticulo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// TIPO
			case 5:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='tipo_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// SECCION
			case 6:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='seccion_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// UNIDAD DE MEDIDA
			case 7:		$(this).html(CADENA_VACIA).append("<input class='marquee form-control' type='text' id='undMedida_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// ULTIMO PRECIO DE COMPRA
			case 8:		$(this).html(CADENA_VACIA).append("<input class='form-control' type='text' id='ultPreCompra_" + indiceFilaDataTableDetalle + "' readonly='readonly' tabindex='-1' >");
						break;
						
			// PRECIO REFERENCIA
			case 9:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha' type='number' maxlength='13' " +  
				//"onkeyup='precioReferenciaKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
				//"onchange='precioReferenciaKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
				//"onkeydown='precioKeyDown(event)' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precioRef_" + indiceFilaDataTableDetalle + "' " + readonlyText + ">" +
				"</span></div>");
				break;

			// PRECIO 
			case 10:	$(this).html(CADENA_VACIA).append("<div><span class='simbolo-moneda input-symbol-dolar'>" +
				"<input class='form-control alineacion-derecha precio-det' type='number' maxlength='13' " +  
				//"onkeyup='precioKeyUp(this, " + indiceFilaDataTableDetalle + ")' " +
				//"onchange='precioKeyUp(this, " + indiceFilaDataTableDetalle + ");' " +
				//"onkeydown='precioKeyDown(event)' " +
				"onkeypress='return soloDecimales(event, this);' " +
				"id='precio_" + indiceFilaDataTableDetalle + "' " + readonlyText + ">" +
				"</span></div>");
				break;
			
			// ACTIVO
			case 11:	$(this).html(CADENA_VACIA).append("<input class='form-check' style='margin-left:auto; margin-right:auto; " + readonlyCheck + "' type='checkbox' id='activo_" + indiceFilaDataTableDetalle + "' onchange='cambiarClass($(this));'  >");
				break;
		}
	});
	habilitarMarquee();
}

function cambiarClass(control){
	if (control.is(':checked')){
		control.parent().parent().removeClass("estadoRechazado");		
	}
	else{
		control.parent().parent().addClass("estadoRechazado");
	}
}

function precioKeyUp(control, fila) {
	var precio = Number(control.value);
	
	$('#precio_' + fila).val(convertirNumeroAMoneda(precio));
}

function precioReferenciaKeyUp(control, fila) {
	var precioRef = Number(control.value);
	
	$('#precioRef_' + fila).val(convertirNumeroAMoneda(precioRef));
}

function cargarListaConDatos() {
	console.log("cargarListaCabDet...success" + idListaPrecio.text());
	
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

function cargarListaDetalleNuevo() {
	console.log("cargarListaDetalleNuevo...success");
		
	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarListaPrecioDetalle/',
		data: {
			idListaPrecio	: 0
		},
		dataType: 'text',
		beforeSend: function(xhr) {
			console.log("beforeSend...loadding");
			loadding(true);
		},
		success: function(result, textStatus, xhr) {
			if (xhr.status == HttpStatus.OK) {
				var data = JSON.parse(result);
				
				console.log("data...length: " + data.length);
				llenarDetalle(data);						
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
	inicializarTabla(false);
	
	idListaPrecio.text(data.idListaPrecio);
	descripcion.val(data.descripcion);
	moneda.val(data.codMoneda);	
	(data.activo == 1) ? activoCab.prop('checked', true):activoCab.prop('checked', false);
	
	// ******* DETALLE
    llenarDetalle(data.detalle);

	calcularPorTipoMoneda();
	
	if (opcion.text() == Opcion.VER) {
		console.log("VER...success");
		titulo.text("VER");
		
		deshabilitarControl(descripcion);
		deshabilitarControl(moneda);
		deshabilitarControl(activoCab);		
		ocultarControl(btnLimpiar);
		ocultarControl(btnGrabar);
	}
	
	if (opcion.text() == Opcion.MODIFICAR) {
		console.log("MODIFICAR...success");
		titulo.text("MODIFICAR");
		descripcion.focus();
		
		habilitarControl(descripcion);
		habilitarControl(moneda);
		habilitarControl(activoCab);
		mostrarControl(btnLimpiar);
		mostrarControl(btnGrabar);
	}
	
}

function llenarDetalle(data){	
    cantidadDetalle = data.length;
	
	for(i=0; i < cantidadDetalle; i++) {	
		var detalle = data[i];
		agregarFilaEnTablaDetalle();
		$('#codArticulo_' + i).val(detalle.codArticulo);
		$('#codEstandarArticulo_' + i).val(detalle.codEstandar);
		$('#codAntiguoArticulo_' + i).val(detalle.codAntiguo);
		$('#descripcion_' + i).val(detalle.descripcion);
		$('#marcaArticulo_' + i).val(detalle.descMarcaArticulo);
		$('#tipo_' + i).val(detalle.descTipo);
		$('#seccion_' + i).val(detalle.descSeccion);
		$('#undMedida_' + i).val(detalle.descUndMedida);
		$('#ultPreCompra_' + i).val(convertirNumeroAMoneda(detalle.ultPrecioCompra));
		$('#precioRef_' + i).val(convertirNumeroAMoneda(detalle.precioRef));
		$('#precio_' + i).val(convertirNumeroAMoneda(detalle.precio));
		(detalle.activo == 1) ? $('#activo_' + i).prop('checked', true):$('#activo_' + i).prop('checked', false);
		
		if (detalle.activo == 1){
			$('#activo_' + i).prop('checked', true);
		}
		else{
			$('#activo_' + i).prop('checked', false);
			$("#tableDetalle").find("tr").last().addClass("estadoRechazado");
		}		
	}
	
}

function inicializarEventos() {

	$('.readonly').keydown(function(e) {
		e.preventDefault();
	});

	btnGrabar.on("click", function(e) {
		console.log("btnGrabar:");
		grabarListaPrecio(e);
	});

	btnLimpiar.on("click", function() {
		limpiar();
	});

	btnVolver.on("click", function() {
		volver();
	});
	
	moneda.on('change', function(){
		calcularPorTipoMoneda();
	});

}

function limpiar() {
	descripcion.val(CADENA_VACIA);
	moneda.val(CADENA_VACIA);
	activoCab.prop('checked', true);
	dataTableDetalle.clear().draw();
	cargarListaDetalleNuevo();
	formListaPrecio.removeClass('was-validated');
}

function grabarListaPrecio(event) {
	
	if (formListaPrecio[0].checkValidity() == true) {
		event.stopPropagation();
		console.log("entrando validado....")
		event.preventDefault();
		
		if(validarDetalleListaPrecio()){
			registrarListaPrecio();
		}
	} else {
		console.log("validado FALSE!!!....")
        event.stopPropagation();
		
	}
	formListaPrecio.addClass('was-validated');
}

function validarDetalleListaPrecio(){
	
	var precio;
	var flag = false;
	var exitEach = false;
	var exitIterator = false;
		
	// verificando que se hayan ingresado por lo menos un item al detalle de la lista de precios
	var contadorVacios = 0;
	
	// recorriendo todos los detalles
	var $headers = tableDetalle.find("th").not(':first');
	tableDetalle.DataTable().rows().iterator('row', function(context, index){

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');
		
		$cells.each(function(cellIndex) {
			if($($headers[cellIndex]).attr('id') == 'activo') {
				
				if(!($(this).find("input").is(':checked'))){
					contadorVacios++;
				}
			}
		});
	});
	
	// si la cantidad de filas sin seleccionar es igual al contador de filas, mostrar mensaje
	if(contadorVacios == (indiceFilaDataTableDetalle + 1)){
		mostrarMensajeValidacion("Debe ingresar por lo menos un item al detalle de la Lista", null, '#codEstandarArticulo_' + indiceFilaDataTableDetalle);
		return false;	
	}
	
	// verificando que no hayan detalles con precio vacíos
	tableDetalle.DataTable().rows().iterator('row', function(context, index){
		
		if(exitEach == true){
			console.log("exirteach es true!");
			exitIterator = true;
			return false;
		}

		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');

		flag = false;
		
		$cells.each(function(cellIndex) {
			if (cellIndex == 11){
				// verificamos que estamos en una fila con check
				if(($($headers[cellIndex]).attr('id') == 'activo') && ($(this).find("input").is(':checked') == true)){				
					flag = true;
				}
			}
		});
		
		$cells.each(function(cellIndex) {
			if (cellIndex == 10){
				// evaluamos el PRECIO	
				if($($headers[cellIndex]).attr('id') == 'precio') {
					precio = $(this).find("input").val();
					
					// siempre y cuando hayan datos (flag TRUE)
					if(flag == true){					
						precio = $(this).find("input").val();
						
						if(precio == CADENA_VACIA){
							mostrarMensajeValidacion('Debe ingresar el precio.', $(this).find("input"));
							exitEach = true;
							return false;
						}else if(convertirMonedaANumero(precio) == 0){
							mostrarDialogoInformacion('Debe ingresar un precio mayor a cero.', Boton.WARNING, $(this).find("input"));
							exitEach = true;
							return false;
						}
					}
					
				}						
			}
		});
		
	});
		
	if(exitEach == true || exitIterator == true){
		console.log("exitEach||exititerator es true!");
		return false;
	}else{
		return true;	
	}
}

function registrarListaPrecio() {
	var chkActivo = null;
	var idLP;
	
	(activoCab.is(':checked')) ? chkActivo = 1 : chkActivo = 0;
	(idListaPrecio.text().trim() == CADENA_VACIA) ? idLP = 0 : idLP = idListaPrecio.text();
	
	var detalle = tableToJSON(tableDetalle);
	
	var objetoJson = {
		idListaPrecio	: idLP,
		descripcion		: descripcion.val(),
		codMoneda			: moneda.val(),
		activo			: chkActivo,
		detalle			: detalle
	};
	
	var entityJsonStr = JSON.stringify(objetoJson);
	var formData = new FormData();
	
	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));
	
	console.log("registrarListaPrecio:" + entityJsonStr);

	$.ajax({
		type: "POST",
		contentType: false,
		processData: false,
		url: '/appkahaxi/registrarListaPrecio/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(resultado, textStatus, xhr) {
			if (xhr.status == HttpStatus.OK) {
				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				volver();

			} else if (xhr.status == HttpStatus.Accepted) {
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

function calcularPorTipoMoneda() {
	var tipoMonedaVal = moneda.val();
	
	if(tipoMonedaVal == Moneda.SOLES) {
		$('.simbolo-moneda').removeClass("input-symbol-dolar").addClass("input-symbol-sol");
	}else{
		$('.simbolo-moneda').removeClass("input-symbol-sol").addClass("input-symbol-dolar");
	}
}

function tableToJSON(dataTable) {
	var data = [];
	var flag;
	var $headers = dataTable.find("th").not(':first');
	
	dataTable.DataTable().rows().iterator('row', function(context, index){
		var node = $(this.row(index).node());
		$cells = node.find("td").not(':first');
		
		data[index] = {};
		flag = false;
		
		$cells.each(function(cellIndex) {
			if (cellIndex == 11){
				// verificamos que estamos en una fila con check
				if(($($headers[cellIndex]).attr('id') == 'activo') && ($(this).find("input").is(':checked') == true)){				
					flag = true;
				}
			}
		});
		
		$cells.each(function(cellIndex) {
			
			if(flag == true){
				
				if( $($headers[cellIndex]).attr('id') == 'precio' || $($headers[cellIndex]).attr('id') == 'precioRef' ){
					data[index][$($headers[cellIndex]).attr('id')] = convertirMonedaANumero($(this).find("input").val());
				}
				if($($headers[cellIndex]).attr('id') == 'codArticulo'){
					data[index][$($headers[cellIndex]).attr('id')] = $(this).find("input").val();
				}
			}
			
		});

	});
	
	console.log("data--->" + data);
	// eliminando las filas en blanco
	var newData = [];
	for(i=0, j=0; i<data.length;i++){
		if(data[i]['codArticulo'] != UNDEFINED){
			newData[j] = data[i];
			j++;
		}
	}
	return newData;
}

