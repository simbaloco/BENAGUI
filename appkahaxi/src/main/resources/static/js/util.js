const CADENA_VACIA = "";
const UNDEFINED = undefined;

var d       = new Date();
var n       = d.getFullYear();
var limInf  = 2000;

var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

var mousePoint = {
		clientX:0,
		clientY:0
	};

var HttpStatus = {
		/* SUCCESS*/
		OK  				: 200,
		Accepted  			: 202,
		/* CLIENT ERRORS */
	    BadRequest			: 400,
	    Forbidden			: 403,
	    NotFound 			: 404,
	    /* SERVER ERRORS */
	    InternalServerError	: 500
	};

var CodigoMaestro = {
		MARCA_ARTICULO  	: "01",
		TIPO				: "02",
		SECCION				: "03",
		UND_MEDIDA			: "04",
		MARCA_VEHICULO		: "05",
		MODELO				: "06",
		MOTOR				: "07",
		APLICACION			: "08",
		
		ESTADO_COTI_VTA		: "11", /* Estados asociados a la Cotización de Venta y Orden de Compra */
		ESTADO_DOC_SUNAT	: "12", /*Estados asociados a las Guías de Remisión y Facturas/Boletas */
		
		COND_PAGO			: "20",
		DIAS				: "21",
		MONEDA				: "22",
		TIPO_SOCIO_NEGOCIOS	: "23",
		TIPO_PERSONA		: "24",
		TIPO_DOC_IDENTIDAD	: "25",		
		TIPO_OPE_INVENTARIO	: "26",
		TIPO_DOC_SISTEMA	: "27",
		TIPO_DOC_SUNAT		: "28",		
		IGV					: "31",
		TIPO_TRASLADO		: "32",
		ESTADO_PAGO			: "33"  /*Estados de pago de una Factura */

};

var DescripcionCatalogo = {
		DES_MARCA_ARTICULO  	: "Marca de Artículo",
		DES_TIPO_ARTICULO	  	: "Tipo de Artículo",
		DES_SECCION				: "Sección",
		DES_UND_MEDIDA			: "Unidad de Medida",
		DES_MARCA_VEHICULO		: "Marca de Vehículo",
		DES_MODELO				: "Modelo de Vehículo",
		DES_MOTOR				: "Motor",
		DES_APLICACION			: "Apicación",
    	DES_ESTADO_DOC_SISTEMA	: "Estado de Documento Sistema",
		DES_ESTADO_DOC_SUNAT	: "Estado de Documento Sunat",
		DES_ESTADO_COTI_VTA		: "Estado de Cotización",
		DES_COND_PAGO			: "Condición de Pago",
		DES_DIAS				: "Días de pago al crédito",		
		DES_MONEDA				: "Moneda",
		DES_TIPO_SOCIO_NEGOCIOS	: "Tipo de Socio de Negocio",
		DES_TIPO_PERSONA		: "Tipo de Persona",
		DES_TIPO_DOC_IDENTIDAD	: "Tipo de Documento de Identidad",		
		DES_TIPO_OPE_INVENTARIO	: "Tipo de Operación Inventario",
		DES_TIPO_DOC_SISTEMA	: "Tipo de Documento Sistema",
		DES_TIPO_DOC_SUNAT		: "Tipo de Documento Sunat",
		DES_TIPO_TRASLADO		: "Motivo de Traslado",
		DES_ESTADO_PAGO			: "Estado de Pago"
};

var CodigoSocio = {
		CLIENTE  	: "01",
		PROVEEDOR	: "02"
}

var DecripcionSocio = {
		DES_CLIENTE  	: "Cliente",
		DES_PROVEEDOR	: "Proveedor"
}

var Boton = {
		PRIMARY	: "btn-primary",
		WARNING	: "btn-warning",
		INFO	: "btn-info",
		SUCCESS	: "btn-success",
		DANGER	: "btn-danger"
}

var CodigoParametrica = {
		ARTICULO			: "ARTI",
		CLIENTE				: "CLI",
		PROVEEDOR			: "PROV",
		COTIZACION_VENTA	: "COTIV",
		ORDEN_COMPRA	    : "OC",
		GUIA_REMISISON	    : "GR"
};

var Opcion = {
		NUEVO		: 0,
		VER			: 1,
		DUPLICAR	: 2,
		MODIFICAR	: 3
};

var DescripcionOpcion = {
		DES_NUEVO		: "Nuevo",
		DES_MODIFICAR	: "Modificar",
		DES_VER			: "Ver"
};

var FlagActivo = {
		ACTIVO		: 1,
		INACTIVO	: 0
};

var Respuesta = {
		SI	: 1,
		NO	: 0
};

var EstadoDocumentoInicial = {
		POR_APROBAR			: "01",
		APROBADO			: "02",
		RECHAZADO			: "03"
};

var EstadoGuiaRemision = {
	GENERADO			: "01",
	ANULADO 			: "02"
};

var EstadoFactura = {
	GENERADO			: "01",
	ANULADO 			: "02"
};

var EstadoProceso = {
		ABIERTO			: "A",
		CERRADO			: "C"
};

var CondicionPago = {
		CONTADO		: "01",
		CREDITO		: "02"
};

var TipoPersona = {
		NATURAL		: "01",
		JURIDICA	: "02"
};

var TipoDocumento = {
		DOC_TRIB_NODOM_SIN_RUC: "0",
		DNI		: "1",
		RUC		: "6"
};

var Pais = {
		PERU		: "PE"
};

var EstadoPago = {
	PENDIENTE		: "01",
	PAGADO			: "02"
};

var Dias = {
		_7		: "01",
		_15		: "02",
		_30		: "03",
		_45		: "04",
		_60		: "05"
};

var Moneda = {
		SOLES		: "PEN",
		DOLARES		: "USD"
};

var SimboloMoneda = {
		SOLES		: "S/ ",
		DOLARES		: "$ "
};

var TipoSocioNegocios = {
		CLIENTE		: "01",
		PROVEEDOR	: "02"
};

var TipoOperacion = {
		GRABAR	: "01",
		AGREGAR	: "02"
};

var ParametrosGenerales = {
		CANTIDAD_DECIMALES					: "",
		SEPARADOR_MILES						: "",
		SEPARADOR_DECIMALES					: "",
		RANGO_DIAS_BUSCADOR_FECHAS			: "",
		RANGO_DIAS_BUSCADOR_FECHAS_INICIO	: "",
		IGV									: "",
		RANGO_DIAS_FECHA_VALIDEZ			: "",
		RANGO_DIAS_BUSCADOR_FECHAS_REPORTES : ""
}

var TipoCampo = {
		ENTERO		: "E",
		ALFANUMERICO: "A"
};

var TipoReporte = {
		PDF  	: "PDF",
		EXCEL	: "EXCEL"
}

function is_chrome(){
	return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}

function movimientomouse(event){
	var evento = (window.event) ? window.event : event;
	mousePoint.clientX = evento.clientX;
	mousePoint.clientY = evento.clientY
}

function mousefuera(){
	mousePoint.clientX = 0;
	mousePoint.clientY = 0;
}

function soloEnteros(e){
    var key = e.charCode;
    console.log("key en soloEnteros-->" + key);
    return key >= 48 && key <= 57;
}


function soloAlfaNumericos(e){
	tecla = (document.all) ? e.keyCode : e.which;

	//Tecla de retroceso para borrar, siempre la permite
	if (tecla == 8) {
		return true;
	}

	// Patron de entrada, en este caso solo acepta numeros y letras
	patron = /[A-Za-z0-9]/;
	tecla_final = String.fromCharCode(tecla);
	return patron.test(tecla_final);
}

function sinCaracteresEspeciales(e) {

	tecla = (document.all) ? e.keyCode : e.which;

	//Tecla de retroceso para borrar, siempre la permite
	if (tecla == 8) {
		return true;
	}

	// Patron de entrada, en este caso solo acepta numeros y letras
	patron = /[^(#/.%?;)]/;
	tecla_final = String.fromCharCode(tecla);
	return patron.test(tecla_final);
}


function soloDecimales(evt,input){
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;    
    var chark = String.fromCharCode(key);
    var tempValue = input.value+chark;
    if(key >= 48 && key <= 57){
        if(filter(tempValue)=== false){
            return false;
        }else{       
            return true;
        }
    }else{
          if(key == 8 || key == 13 || key == 0) {     
              return true;              
          }else if(key == 46){
                if(filter(tempValue)=== false){
                    return false;
                }else{       
                    return true;
                }
          }else{
              return false;
          }
    }
}

function filter(__val__){
    var preg = /^([0-9]+\.?[0-9]{0,3})$/; 
    if(preg.test(__val__) === true){
        return true;
    }else{
       return false;
    }
    
}

function esFormatoCorreo(e){
	tecla = (document.all) ? e.keyCode : e.which;

	//Tecla de retroceso para borrar, siempre la permite
	if (tecla == 8) {
		return true;
	}

	// Patron de entrada, en este caso solo acepta numeros y letras; punto, arroba, underline y punto y coma
	patron = /[A-Za-z0-9.@;_]/;
	tecla_final = String.fromCharCode(tecla);
	return patron.test(tecla_final);
}

function getNum(val) {
	val = +val || 0
	return val;
}

function loadding(onOf) {
    if (onOf) {
        var div="<div id='loadding' class='box'><div class='image'><img align='absmiddle' src='/appkahaxi/images/loading.gif'></div><div class='line1'>PROCESANDO</div><div class='line2'>Ejecutando petición, por favor espere...</div></div>";
        jQuery.blockUI({
            message: div,
            css: {
                border: 'none',
                padding: '0px',
                backgroundColor: ''
            },
            overlayCSS: {
                backgroundColor: 'black',
                opacity: 0.10
            }
        });        
    }
    else {
        jQuery.unblockUI();
    }
}

function mostrarModal(id){
    id.modal("show");
}

function ocultarModal(id){
    id.modal('hide');
}

function habilitarBoton(id){
	id.removeClass("btn btn-outline-secondary my-1").addClass("btn btn-outline-primary my-1");
    id.removeAttr("disabled");
}

function deshabilitarBoton(id){
	id.removeClass("btn btn-outline-primary my-1").addClass("btn btn-outline-secondary my-1");
    id.attr("disabled", true);
}

function ocultarControl(id){
	id.css("display","none");
}

function mostrarControl(id){
	id.css("display","");
}

function habilitarControl(id1, id2){
	if(id1 == null){
		$(id2).prop('disabled', false);
	}else{
		id1.prop('disabled', false);	
	}
}

function deshabilitarControl(id1, id2){
	if(id1 == null){
		$(id2).prop('disabled', true);
	}else{
		id1.prop('disabled', true);	
	}
}

function habilitarControlSoloLectura(id1, id2){
	if(id1 == null){
		$(id2).prop('readonly', true);
	}else{
		id1.prop('readonly', true);	
	}
}

function deshabilitarControlSoloLectura(id1, id2){
	if(id1 == null){
		$(id2).prop('readonly', false);
	}else{
		id1.prop('readonly', false);	
	}
}

function controlRequerido(id){
	id.prop('required', true);
}

function controlNoRequerido(id){
	id.prop('required', false);
}

function checkControl(id){
	id.prop('checked', true);
}

function uncheckControl(id){
	id.prop('checked', false);
}

function habilitarAnimacionAcordion() {
	$(".collapse").on('show.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-up');
    }).on('hide.bs.collapse', function(){
    	$(this).prev(".card-header").find('svg').attr('data-icon', 'angle-down');
    });
}

/*** http://bootstrap-notify.remabledesigns.com/ ****/
function mostrarNotificacion(mensaje, tipo){
	$.notify({
    	// options
    	icon: 'fas fa-check',
    	//icon: '/appkahaxi/images/check.png',
    	title: '<strong>Mensaje: </strong>',
    	message: mensaje
    },{
    	type: tipo,
    	allow_dismiss: true,
    	newest_on_top: false,
    	placement: {
    		from: "top",
    		align: "right"
    	},
    	offset: 20,
    	spacing: 10,
    	z_index: 2000,
    	delay: 3000,
    	timer: 1000,
    	mouse_over: "pause",
    	animate: {
    		enter: 'animated bounceInDown',
    		exit: 'animated bounceOutUp'
    	}
    });
}

function mostrarDialogoInformacion(mensaje, boton, controlFoco1, controlFoco2){
	var box = bootbox.dialog({
				message: "<p>" + mensaje + "</p>",
			    size: 'medium',
			    centerVertical: true,
			    buttons: {
			        cancel: {
			            label: "Aceptar",
			            className: boton
			        }
			    }
			  });
	
	box.on('hidden.bs.modal',function(){
        if(controlFoco1 == null){
			$(controlFoco2).focus();
			$(controlFoco2).select();
		}else{
			controlFoco1.focus();
			controlFoco1.select();	
		}		
    });
}



function cargarCombo(control, borrarTodoMenosPrimero, codigoMaestro, callback){
	console.log("entrando a cargarCombo (sólo maestros)---> control:" + control + '/codigoMaestro:' + codigoMaestro);
	if(borrarTodoMenosPrimero){
		control.find('option').not(':first').remove();
	}
	$.ajax({
        type:"Get",
        cache: false,
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/cargarCombo/' + codigoMaestro,
        data : null,
        dataType: 'text',
        success:function(result,textStatus,xhr){
        	console.log("cargarCombo, success--->" + xhr.status);
        	
        	var resultado = JSON.parse(result);
            // evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		var tam = resultado.length;
        		for(var i = 0; i < tam; i++){
	        		control.append($('<option />').val(resultado[i].codigo).html(resultado[i].descripcion));
        		}
        		callback(1);
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("cargarCombo, Accepted....");
            	callback(resultado.mensajeResultado);
            }
        },
        error: function (xhr, error, code){
        	console.log("cargarCombo, error...." + xhr.status);
        	callback(xhr.responseText);
        }
    });
}

function cargarComboPadre(control, borrarTodoMenosPrimero, codigoMaestro, codigoCatalogoPadre, codigoPadre, callback){
	console.log("entrando a cargarComboPadre (dependientes de un padre)---> control:" + control + '/codigoMaestro:' + codigoMaestro + '/codigoCatalogoPadre:' + codigoCatalogoPadre + '/codigoPadre:' + codigoPadre);
	if(borrarTodoMenosPrimero){
		control.find('option').not(':first').remove();
	}
	if(codigoPadre != ""){
		$.ajax({
	        type:"Get",
	        cache: false,
	        contentType : "application/json",
	        accept: 'text/plain',
	        url : '/appkahaxi/cargarComboPadre/' + codigoMaestro + '/' + codigoCatalogoPadre + '/' + codigoPadre,
	        data : null,
	        dataType: 'text',
	        success:function(result,textStatus,xhr){
	        	console.log("cargarComboPadre, success--->" + xhr.status);
	        	
	        	var resultado = JSON.parse(result);
	            // evaluando el retorno
	        	if(xhr.status == HttpStatus.OK){
	        		var tam = resultado.length;
	        		for(var i = 0; i < tam; i++){
		        		control.append($('<option />').val(resultado[i].codigo).html(resultado[i].descripcion));
	        		}
	        		callback(1);
	            }else if(xhr.status == HttpStatus.Accepted){
	            	console.log("cargarComboPadre, Accepted....");
					callback(resultado.mensajeResultado);
	            }
	        },
	        error: function (xhr, error, code){
	        	console.log("cargarComboPadre, error...." + xhr.status);
				callback(xhr.responseText);
	        }
	    });
	}
}



function cargarComboPais(control, borrarTodoMenosPrimero, callback){
	console.log("entrando a cargarComboPais ---> control:" + control);
	if(borrarTodoMenosPrimero){
		control.find('option').not(':first').remove();
	}
	
		$.ajax({
	        type:"Get",
	        cache: false,
	        contentType : "application/json",
	        accept: 'text/plain',
	        url : '/appkahaxi/cargarComboPais/',
	        data : null,
	        dataType: 'text',
	        success:function(result,textStatus,xhr){
	        	console.log("cargarComboPais, success--->" + xhr.status);
	        	
	        	var resultado = JSON.parse(result);
	            // evaluando el retorno
	        	if(xhr.status == HttpStatus.OK){
	        		var tam = resultado.length;
	        		for(var i = 0; i < tam; i++){
		        		control.append($('<option />').val(resultado[i].codigo).html(resultado[i].descripcion));
	        		}
	        		callback(1);
	            }else if(xhr.status == HttpStatus.Accepted){
	            	console.log("cargarComboPais, Accepted....");
					callback(resultado.mensajeResultado);
	            }
	        },
	        error: function (xhr, error, code){
	        	console.log("cargarComboPais, error...." + xhr.status);
				callback(xhr.responseText);
	        }
	    });
	
}

function cargarComboVendedor(control, borrarTodoMenosPrimero, callback){
	console.log("entrando a cargarComboVendedor ---> control:" + control);
	if(borrarTodoMenosPrimero){
		control.find('option').not(':first').remove();
	}
	
		$.ajax({
	        type:"Get",
	        cache: false,
	        contentType : "application/json",
	        accept: 'text/plain',
	        url : '/appkahaxi/cargarComboVendedor/',
	        data : null,
	        dataType: 'text',
	        success:function(result,textStatus,xhr){
	        	console.log("cargarComboVendedor, success--->" + xhr.status);
	        	
	        	var resultado = JSON.parse(result);
	            // evaluando el retorno
	        	if(xhr.status == HttpStatus.OK){
	        		var tam = resultado.length;
	        		for(var i = 0; i < tam; i++){
		        		control.append($('<option />').val(resultado[i].codigo).html(resultado[i].descripcion));
	        		}
	        		callback(1);
	            }else if(xhr.status == HttpStatus.Accepted){
	            	console.log("cargarComboVendedor, Accepted....");
					callback(resultado.mensajeResultado);
	            }
	        },
	        error: function (xhr, error, code){
	        	console.log("cargarComboVendedor, error...." + xhr.status);
				callback(xhr.responseText);
	        }
	    });
	
}

function cargarComboListaPrecio(control, borrarTodoMenosPrimero, callback){
	console.log("entrando a cargarComboListaPrecio ---> control:" + control);
	if(borrarTodoMenosPrimero){
		control.find('option').not(':first').remove();
	}
	
		$.ajax({
	        type:"Get",
	        cache: false,
	        contentType : "application/json",
	        accept: 'text/plain',
	        url : '/appkahaxi/cargarComboListaPrecio/',
	        data : null,
	        dataType: 'text',
	        success:function(result,textStatus,xhr){
	        	console.log("cargarComboListaPrecio, success--->" + xhr.status);
	        	
	        	var resultado = JSON.parse(result);
	            // evaluando el retorno
	        	if(xhr.status == HttpStatus.OK){
	        		var tam = resultado.length;
	        		for(var i = 0; i < tam; i++){
		        		control.append($('<option />').val(resultado[i].codigo).html(resultado[i].descripcion));
	        		}
	        		callback(1);
	            }else if(xhr.status == HttpStatus.Accepted){
	            	console.log("cargarComboListaPrecio, Accepted....");
					callback(resultado.mensajeResultado);
	            }
	        },
	        error: function (xhr, error, code){
	        	console.log("cargarComboListaPrecio, error...." + xhr.status);
				callback(xhr.responseText);
	        }
	    });
	
}

function cargarComboUbigeo(control, borrarTodoMenosPrimero, codTipo, codDepartamento, codProvincia, callback){
	
	if(borrarTodoMenosPrimero){
		control.find('option').not(':first').remove();
	}
		
	if (codDepartamento == ''){
		codDepartamento = '00';
	}
	
	if (codProvincia == ''){
		codProvincia = '00';
	}
	
	$.ajax({
	        type:"Get",
	        cache: false,
	        contentType : "application/json",
	        accept: 'text/plain',
	        url : '/appkahaxi/cargarComboUbigeo/' + codTipo + '/' + codDepartamento + '/' + codProvincia,
	        data : null,
	        dataType: 'text',
	        success:function(result,textStatus,xhr){
	        	console.log("cargarComboUbigeo, success--->" + xhr.status);
	        	
	        	var resultado = JSON.parse(result);
	            // evaluando el retorno
	        	if(xhr.status == HttpStatus.OK){
	        		var tam = resultado.length;
	        		for(var i = 0; i < tam; i++){
		        		control.append($('<option />').val(resultado[i].codigo).html(resultado[i].descripcion));
	        		}
	        		callback(1);
	            }else if(xhr.status == HttpStatus.Accepted){
	            	console.log("cargarComboUbigeo, Accepted....");
					callback(resultado.mensajeResultado);
	            }
	        },
	        error: function (xhr, error, code){
	        	console.log("cargarComboUbigeo, error...." + xhr.status);
				callback(xhr.responseText);
	        }
	});
	
}

function mostrarMensajeError(mensaje){
	mostrarDialogoInformacion("<strong>Ocurrió un error al procesar. Detalle del error:</strong> <br>" + mensaje, Boton.DANGER);
}

function mostrarMensajeValidacion(mensaje){
	mostrarDialogoInformacion("<strong>Mensaje de validación</strong> <br><br>" + mensaje, Boton.WARNING);
}

function mostrarMensajeValidacion(mensaje, componente1, componente2){
	mostrarDialogoInformacion("<strong>Mensaje de validación</strong> <br><br>" + mensaje, Boton.WARNING, componente1, componente2);
}

function habilitarMarquee(){
	var timeout_ = null;
	$(".marquee").on("mouseover", function() {
		var interval_val = 2;    
		var this_ = this;
    	timeout_ = setInterval(function() {
      		$(this_).scrollLeft(interval_val);
      		interval_val++;
    		}, 25);
  	});

  	$(".marquee").on("mouseout", function() {
    	clearInterval(timeout_);
    	$(this).scrollLeft(0);
  	});	
}

if(is_chrome()){
	document.onmouseout		=	mousefuera;
	document.onmousemove	=	movimientomouse;
}


function convertirNumeroAMoneda(numero){
    const CIFRAS_MILES = 3;
	let formateadoSinSimbolo = '';
    
	if(numero != null && numero != ''){
		// Redondear y convertir a cadena
	    let numeroComoCadena = parseFloat(numero).toFixed(ParametrosGenerales.CANTIDAD_DECIMALES);
		// Comenzar desde la izquierda del separador o desde el final de la cadena si no se proporciona
	    let posicionDelSeparador = numeroComoCadena.indexOf(ParametrosGenerales.SEPARADOR_DECIMALES);
		if (posicionDelSeparador === -1) posicionDelSeparador = numeroComoCadena.length;
	    
		let formateadoSinDecimales = "", indice = posicionDelSeparador;
	    // Ir cortando desde la derecha de 3 en 3, y concatenar en una nueva cadena
	    while (indice >= 0) {
	        let limiteInferior = indice - CIFRAS_MILES;
	        // Agregar separador si cortamos más de 3
	        formateadoSinDecimales = (limiteInferior > 0 ? ParametrosGenerales.SEPARADOR_MILES : "") + numeroComoCadena.substring(limiteInferior, indice) + formateadoSinDecimales;
	        indice -= CIFRAS_MILES;
	    }
	    formateadoSinSimbolo = `${formateadoSinDecimales}${numeroComoCadena.substr(posicionDelSeparador, ParametrosGenerales.CANTIDAD_DECIMALES + 1)}`;
	}
	
    return formateadoSinSimbolo;
};

function obtenerTipoCambio(control){
	console.log("obtenerTipoCambio...entrando");
	// obteniendo dia, mes y año
	var f = new Date();
	var dia = f.getDate();
	var mes = f.getMonth() + 1;
	var anio = f.getFullYear();
	console.log("dia-->" + dia + "/mes-->" + mes + "/año-->" + anio);
	$.ajax({
        type:"Get",
        contentType: false,
        processData: false,
        url : '/appkahaxi/buscarTc/' + dia + '/' + mes + '/' + anio,
        data: null,
		beforeSend: function(xhr) {
        	console.log("obtenerTipoCambio...beforesend, loading.....");
        	loadding(true);
        },
		success:function(resultado,textStatus,xhr){
        	console.log("obtenerTipoCambio resultado--->" + resultado);
        	// evaluando el retorno
        	if(xhr.status == HttpStatus.OK){
        		console.log("obtenerTipoCambio respondio exito.....");
				control.val(resultado);
            }else if(xhr.status == HttpStatus.Accepted){
            	console.log("obtenerTipoCambio, Accepted....");
            	mostrarMensajeError(resultado);
            }
        	
        	loadding(false);
        },
        error: function (xhr, error, code){
        	console.log("obtenerTipoCambio, error...." + xhr.status);
        	mostrarMensajeError(xhr.responseText);
        	
        	loadding(false);
        }
    });
}

function returnYYYYMMDD(numFromToday = 0){
	let d = new Date();
	d.setDate(d.getDate() + numFromToday);
	const month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
	const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	return `${d.getFullYear()}-${month}-${day}`;
}

function convertirMonedaANumero(moneda){
    return moneda.replace(",","");
};

const removeEmptyObject = (function() {
  const isNotObject = v => v === null || typeof v !== "object";
  const isEmpty = o => Object.keys(o).length === 0;

  return function(obj) {
    if (isNotObject(obj)) return obj;
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i += 1) {
        if (isNotObject(obj[i])) continue;
        if (isEmpty(obj[i])) obj.splice(i--, 1);
        else obj[i] = removeEmptyObject(obj[i]);
      }
    }
    else {
      for (let p in obj) {
        if (isNotObject(obj[p])) continue;
        if (!isEmpty(obj[p])) obj[p] = removeEmptyObject(obj[p]);
        if (isEmpty(obj[p])) delete obj[p];
      }
    }
    return obj;
  }
}());


$(document).ready(function () {
	console.log("aqui ready yee util.js");
	
	let array = $('ul>li').toArray().map(item => $(item).html());
	console.log(array);
	for(var i=0; i<array.length; i++){
		var cadena = array[i];
		let newArray = cadena.split("/");
		for(var j=0; j<newArray.length; j++){
			switch (newArray[0]){
				case "01" : // CANTIDAD DE DECIMALES
							ParametrosGenerales.CANTIDAD_DECIMALES = newArray[2];
							break;
				case "02" : // SEPARADOR DE MILES
							ParametrosGenerales.SEPARADOR_MILES = newArray[2];
							break;
				case "03" : // SEPARADOR DE DECIMALES
							ParametrosGenerales.SEPARADOR_DECIMALES = newArray[2];
							break;
				case "04" : // RANGO DE DIAS ENTRE LAS FECHAS DEL BUSCADOR
							ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS = newArray[2];
							break;
				case "05" : // RANGO DE DIAS ENTRE LAS FECHAS DEL BUSCADOR (CARGA INICIAL)
							ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_INICIO = newArray[2];
							break;
				case "06" : // IGV
							ParametrosGenerales.IGV = newArray[2];
							break;
				case "07" : // RANGO DE DIAS ENTRE LA FECHA DE CONT Y LA FECHA DE VALIDEZ
							ParametrosGenerales.RANGO_DIAS_FECHA_VALIDEZ = newArray[2];
							break;
				case "08" : // RANGO DE DIAS REPORTES
							ParametrosGenerales.RANGO_DIAS_BUSCADOR_FECHAS_REPORTES = newArray[2];
							break;
			} 
		}
	}
	
});