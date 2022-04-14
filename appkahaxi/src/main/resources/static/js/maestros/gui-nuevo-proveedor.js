var titulo; 
var opcion; 
var datoBuscar; 
var tipoSocio;
var formSocioNegocio;
var formContactos;
var codigo;
var codigoSocio;
var tipoDocumento;
var tipoDocu;
var nroDocumento;
var tipoPersona;
var razonSocial;
var nombre;
var apePaterno;
var apeMaterno;
var pais;
var departamento;
var provincia;
var distrito;
var ubigeo;
var direccionFiscal;
var direccionDespacho_0;
var idDirDespachoSN_0;
var activoDir_0;
var telefonoFijo;
var celular;
var correo;
var condicion;
var dias;
var activo;
var comentarios;
var divDias;

var id_contacto_0;
var contacto_0;
var cargo_0;
var activo_0;
var emailfactura_0;
var telContacto_0_0;
var btnAgregarTelefono_0;
var emailContacto_0_0;
var btnAgregarEmail_0;
var asignadoDef_0;

var btnLimpiar;
var btnGrabar;
var btnVolver;
var btnAgregarDireccion;
var btnAgregarContacto;
var btnEliminarContacto_0;

var divRazSocial;
var divNombres;
var divApePaterno;
var divApeMaterno;
var divDepartamento;
var divProvincia;
var divDistrito;
var divUbigeo;
var contaDirec;
var indiceContacto;
var indiceRealContacto;
var indiceDirDespacho;
var indiceRealDirDespacho;
var cantidadDetalle;
var cantidadDetalleDirDespacho;

$(document).ready(function() {
	inicializarVariables();

	inicializarPantalla();
	inicializarComponentes();
});

function inicializarVariables() {
	titulo = $("#titulo");
	opcion = $("#opcion");
	tipoSocio = $("#tipoSn");
	datoBuscar = $("#datoBuscar");
	formSocioNegocio = $("#formSocioNegocio");
	formContactos = $("#formContactos");
	codigo = $("#codigo");
	codigoSocio = $("#codigoSocio");
	tipoDocu = $("#tipoDocu");
	tipoDocumento = $("#tipoDocumento");
	nroDocumento = $("#nroDocumento");
	tipoPersona = $("#tipoPersona");
	razonSocial = $("#razonSocial");
	nombre = $("#nombre");
	apePaterno = $("#apePaterno");
	apeMaterno = $("#apeMaterno");
	pais = $("#pais");
	departamento = $("#departamento");
	provincia = $("#provincia");
	distrito = $("#distrito");
	ubigeo = $("#ubigeo");
	direccionFiscal = $("#direccionFiscal");
	direccionDespacho_0 = $("#direccionDespacho_0");
	idDirDespachoSN_0 = $("#idDirDespachoSN_0");
	activoDir_0 = $("#activoDir_0");
	telefonoFijo = $("#telefonoFijo");
	celular = $("#celular");
	correo = $("#correo");
	condicion = $("#condicion");
	dias = $("#dias");
	divDias = $("#divDias");
	activo = $("#activo");
	comentarios = $("#comentarios");

	id_contacto_0 = $("#id_contacto_0");
	contacto_0 = $("#contacto_0");
	cargo_0 = $("#cargo_0");
	activo_0 = $("#activo_0");
	emailfactura_0 = $("#emailfactura_0");
	telContacto_0_0 = $("#telContacto_0_0");
	btnAgregarTelefono_0 = $("#btnAgregarTelefono_0");
	emailContacto_0_0 = $("#emailContacto_0_0");
	btnAgregarEmail_0 = $("#btnAgregarEmail_0");
	asignadoDef_0 = $("#asignadoDef_0");

	btnLimpiar = $("#btnLimpiar");
	btnGrabar = $("#btnGrabar");
	btnVolver = $("#btnVolver");
	btnAgregarDireccion = $("#btnAgregarDireccion");
	btnAgregarContacto = $("#btnAgregarContacto");
	btnEliminarContacto_0 = $("#btnEliminarContacto_0");

	divRazSocial = $("#divRazSocial");
	divNombres = $("#divNombres");
	divApePaterno = $("#divApePaterno");
	divApeMaterno = $("#divApeMaterno");
	divDepartamento = $("#divDepartamento");
	divProvincia = $("#divProvincia");
	divDistrito = $("#divDistrito");
	divUbigeo = $("#divUbigeo");
}

function inicializarComponentes() {
	habilitarAnimacionAcordion();
	inicializarEventos();
}

function inicializarPantalla() {

	departamento.trigger('click', [CADENA_VACIA]);
	provincia.trigger('click', [CADENA_VACIA]);

	if (opcion.text() == Opcion.NUEVO) {
		cargarPantallaNueva();
	} else {
		cargarPantallaConDatos();
	}

}

/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function volver() {
	var params;
	var datoBusca = datoBuscar.text();
	var tipoDoc = tipoDocumento.text();
	var tipoSn = tipoSocio.text();

	params = "datoBuscar=" + datoBusca + "&tipoDoc=" + tipoDoc + "&tipoSn=" + tipoSn;
	window.location.href = "/appkahaxi/mantenimiento-proveedor?" + params;
}

function cargarPantallaNueva() {

	console.log("cargarPantallaNueva...success");
	titulo.text("NUEVO");
	activo.prop('checked', true);
	contaDirec = 1;
	indiceContacto = 1;
	indiceDirDespacho = 1;
	indiceRealContacto = 1;
	indiceRealDirDespacho = 1;
	pais.val(Pais.PERU);
	mostrarCombosUbigeo();
	codigo.html('');
	codigoSocio.text('');

	var volver = $('#volverParam').text();
	if (volver == Respuesta.SI) {
		mostrarControl(btnVolver);
	}

	tipoDocumento.focus();
	mostrarControl(btnLimpiar);
	mostrarControl(btnVolver);
	mostrarControl(btnGrabar);

}

function cargarPantallaConDatos() {

	console.log("cargarPantallaConDatos...success" + codigoSocio.text());

	var codigoSocioNeg = codigoSocio.text();

	$.ajax({
		type: "Get",
		contentType: "application/json",
		accept: 'text/plain',
		url: '/appkahaxi/buscarSocioNegocio/' + codigoSocioNeg,
		data: null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success: function(result, textStatus, xhr) {

			if (xhr.status == HttpStatus.OK) {
				var data = JSON.parse(result);

				cargarPantallaHTML(data);
				if (data.codigoCondicionPago == CondicionPago.CREDITO) {
					mostrarControl(divDias);
				}
				dinamicaVerPantallaSocioNegocio();
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

function cargarPantallaHTML(data) {
	console.log("cargarPantallaHTML...success" + data.ubigeo);

	var codProv = data.codigoDepartamento + data.codigoProvincia;
	var telefonos; 
	var emails;
	var cant;

	contaDirec = 1;

	codigo.html(data.codigoSocio);
	codigoSocio.text(data.codigoSocio);
	tipoDocu.val(data.codigoTipoDocumento);
	nroDocumento.val(data.numeroDocumento);
	tipoPersona.val(data.codigoTipoPersona);
	mostrarCamposDenominacion();
	razonSocial.val(data.razonSocial);
	nombre.val(data.nombres);
	apePaterno.val(data.apePaterno);
	apeMaterno.val(data.apeMaterno);
	pais.val(data.codigoPais);
	departamento.val(data.codigoDepartamento);
	departamento.trigger('click', [codProv]);
	provincia.trigger('click', [data.ubigeo, codProv]);
	ubigeo.val(data.ubigeo);
	mostrarCombosUbigeo();
	direccionFiscal.val(data.direccionFiscal);
	telefonoFijo.val(data.telefonoFijo);
	celular.val(data.celular);
	correo.val(data.email);
	condicion.val(data.codigoCondicionPago);
	dias.val(data.codigoDiasCredito);
	comentarios.val(data.comentarios);
	if (data.activo == 1) {
		activo.prop('checked', true);
	}
	else {
		activo.prop('checked', false);
	}

	cantidadDetalle = data.detalle.length;
	cantidadDetalleDirDespacho = data.detalleDirDespacho.length;
	indiceContacto = 1;
	indiceDirDespacho = 1;
	indiceRealContacto = 1;
	indiceRealDirDespacho = 1;

	//Llenar detalle de contactos
	for (i = 0; i < cantidadDetalle; i++) {
		var det = data.detalle[i];

		if (i > 0) {
			dinamicaAgregarContacto();
			/*indiceContacto = indiceContacto + 1;	
			indiceRealContacto = indiceRealContacto + 1;*/
		}

		$('#contacto_' + i).val(det.nombreContacto);
		$('#cargo_' + i).val(det.cargoContacto);
		$('#activo_' + i).val(det.activo);
		$('#emailfactura_' + i).val(det.emailFactura);
		$('#id_contacto_' + i).val(det.idContactoSN);

		if (det.predeterminado == 1) {
			$('#asignadoDef_' + i).prop('checked', true);
		} else {
			$('#asignadoDef_' + i).prop('checked', false);
		}

		telefonos = det.telefono;
		emails = det.email;
		cant = 0;

		if (telefonos != null) {
			while (telefonos.length > 0) {

				if (telefonos.substring(0, substringIndex(telefonos, ';', 1).length).trim() != CADENA_VACIA) {
					if (cant > 0) {
						dinamicaAgregarTelefonoContacto(i);
					}
					$("#telContacto_" + i + "_" + cant).val(telefonos.substring(0, substringIndex(telefonos, ';', 1).length));
					telefonos = telefonos.substring(substringIndex(telefonos, ';', 1).length + 1, telefonos.length);
					cant = cant + 1;
				}
				else {
					break;
				}
			}
		}

		cant = 0;
		if (telefonos != null) {
			while (emails.length > 0) {
				if (emails.substring(0, substringIndex(emails, ';', 1).length).trim() != CADENA_VACIA) {
					if (cant > 0) {
						dinamicaAgregarEmailContacto(i);
					}
					$("#emailContacto_" + i + "_" + cant).val(emails.substring(0, substringIndex(emails, ';', 1).length));
					emails = emails.substring(substringIndex(emails, ';', 1).length + 1, emails.length);
					cant = cant + 1;
				}
				else {
					break;
				}
			}
		}

	}
		
	//Llenar detalle de direcciones de despacho
	for (i = 0; i < cantidadDetalleDirDespacho; i++) {
		var det = data.detalleDirDespacho[i];
		
		console.log("data.detalleDirDespacho: " + det);
		
		if (i > 0) {
			dinamicaAgregarDirDespacho();
		}
		
		$('#direccionDespacho_' + i).val(det.direccionDespacho);
		$('#activoDir_' + i).val(det.activo);
		$('#idDirDespachoSN_' + i).val(det.idDirDespachoSN);
	}


}

function substringIndex(input, delimiter, index) {
	var arr = input.split(delimiter);
	arr.splice(index, arr.length - index);
	return arr.join(delimiter);
}

function controlDetalle(ic, opcion) {
	var j;
	var cantTel;
	var cantEma;

	cantTel = obtenerCantidad('telefono', ic);
	cantEma = obtenerCantidad('email', ic);

	for (j = 0; j <= cantTel; j++) {
		if ($("#telContacto_" + ic + "_" + j)) {
			if (opcion == 0) {
				deshabilitarControl($("#telContacto_" + ic + "_" + j));
			}
			else {
				habilitarControl($("#telContacto_" + ic + "_" + j));
			}
		}
	}

	for (j = 0; j <= cantEma; j++) {
		if ($("#emailContacto_" + ic + "_" + j)) {
			if (opcion == 0) {
				deshabilitarControl($("#emailContacto_" + ic + "_" + j));
			}
			else {
				habilitarControl($("#emailContacto_" + ic + "_" + j));
			}
		}
	}
}


function dinamicaVerPantallaSocioNegocio() {

	mostrarControl(btnVolver);

	if (opcion.text() == Opcion.VER) {
		titulo.text(DescripcionOpcion.DES_VER.toUpperCase());
		deshabilitarControl(tipoDocu);
		deshabilitarControl(nroDocumento);
		deshabilitarControl(tipoPersona);
		deshabilitarControl(razonSocial);
		deshabilitarControl(nombre);
		deshabilitarControl(apePaterno);
		deshabilitarControl(apeMaterno);
		deshabilitarControl(pais);
		deshabilitarControl(departamento);
		deshabilitarControl(provincia);
		deshabilitarControl(distrito);
		deshabilitarControl(ubigeo);
		deshabilitarControl(direccionFiscal);
		deshabilitarControl(direccionDespacho_0);
		deshabilitarControl(telefonoFijo);
		deshabilitarControl(celular);
		deshabilitarControl(correo);
		deshabilitarControl(condicion);
		deshabilitarControl(dias);
		deshabilitarControl(comentarios);
		deshabilitarControl(activo);

		deshabilitarControl(id_contacto_0);
		deshabilitarControl(contacto_0);
		deshabilitarControl(cargo_0);
		deshabilitarControl(activo_0);
		deshabilitarControl(emailfactura_0);
		deshabilitarControl(btnAgregarTelefono_0);
		deshabilitarControl(btnAgregarEmail_0);
		deshabilitarControl(asignadoDef_0);
		deshabilitarControl(btnEliminarContacto_0);

		for (i = 0; i < cantidadDetalle; i++) {
			deshabilitarControl($('#contacto_' + i));
			deshabilitarControl($('#cargo_' + i));
			deshabilitarControl($('#activo_' + i));
			deshabilitarControl($('#emailfactura_' + i));
			deshabilitarControl($('#id_contacto_' + i));
			deshabilitarControl($('#asignadoDef_' + i));
			deshabilitarControl($('#btnAgregarEmail_' + i));
			deshabilitarControl($('#btnAgregarTelefono_' + i));
			deshabilitarControl($('#btnEliminarContacto_' + i));
		}

		for (j = 0; j < indiceContacto; j++) {
			controlDetalle(j, 0);
		}

		ocultarControl(btnLimpiar);
		ocultarControl(btnGrabar);
		ocultarControl(btnAgregarContacto);
		deshabilitarControl(btnAgregarDireccion);
	}

	if (opcion.text() == Opcion.MODIFICAR) {
		titulo.text(DescripcionOpcion.DES_MODIFICAR.toUpperCase());
		habilitarControl(tipoDocu);
		habilitarControl(nroDocumento);
		habilitarControl(tipoPersona);
		habilitarControl(razonSocial);
		habilitarControl(nombre);
		habilitarControl(apePaterno);
		habilitarControl(apeMaterno);
		habilitarControl(pais);
		habilitarControl(departamento);
		habilitarControl(provincia);
		habilitarControl(distrito);
		habilitarControl(direccionFiscal);
		habilitarControl(direccionDespacho_0);
		habilitarControl(telefonoFijo);
		habilitarControl(celular);
		habilitarControl(correo);
		habilitarControl(condicion);
		habilitarControl(dias);
		habilitarControl(comentarios);
		habilitarControl(activo);

		habilitarControl(id_contacto_0);
		habilitarControl(contacto_0);
		habilitarControl(cargo_0);
		habilitarControl(activo_0);
		habilitarControl(emailfactura_0);
		habilitarControl(btnAgregarTelefono_0);
		habilitarControl(btnAgregarEmail_0);
		habilitarControl(asignadoDef_0);
		habilitarControl(btnEliminarContacto_0);

		for (i = 0; i < cantidadDetalle; i++) {
			habilitarControl($('#contacto_' + i));
			habilitarControl($('#cargo_' + i));
			habilitarControl($('#activo_' + i));
			habilitarControl($('#emailfactura_' + i));
			habilitarControl($('#id_contacto_' + i));
			habilitarControl($('#asignadoDef_' + i));
			habilitarControl($('#btnAgregarEmail_' + i));
			habilitarControl($('#btnAgregarTelefono_' + i));
			habilitarControl($('#btnEliminarContacto_' + i));
		}

		for (j = 0; j < indiceContacto; j++) {
			controlDetalle(j, 1);
		}

		mostrarControl(btnGrabar);
		mostrarControl(btnLimpiar);
		mostrarControl(btnAgregarContacto);
		habilitarControl(btnAgregarDireccion);
	}

}

function inicializarEventos() {

	$('.readonly').keydown(function(e) {
		e.preventDefault();
	});

	btnGrabar.on("click", function(e) {
		console.log("btnGrabar:");
		grabarSocioNegocio(e);
	});

	btnLimpiar.on("click", function() {
		limpiarSocioNegocio();
	});

	btnVolver.on("click", function() {
		volver();
	});

	tipoPersona.on('change', function() {
		mostrarCamposDenominacion();
	});

	condicion.on('change', function() {
		mostrarOcultarDiasPorCondicionPago();
	});

	pais.on('click', function(e, valor) {
		mostrarCombosUbigeo();

		cargarComboUbigeo(departamento, true, 1, '', '', function(id) {
			if (id != 1) {
				mostrarMensajeError(id);
			}
			else {
				departamento.val(valor);
			}
		});

		provincia.find('option').not(':first').remove();
		distrito.find('option').not(':first').remove();
		ubigeo.val(CADENA_VACIA);
	});

	departamento.on('click', function(e, valor) {

		cargarComboUbigeo(provincia, true, 2, departamento.val(), "", function(id) {

			if (id != 1) {
				mostrarMensajeError(id);
			}
			else {
				provincia.val(valor);
				distrito.val(CADENA_VACIA);
			}
		});

		distrito.find('option').not(':first').remove();
		ubigeo.val(CADENA_VACIA);
	});

	provincia.on('click', function(e, valor, prov) {
		if (prov == UNDEFINED) {
			prov = provincia.val();
		}

		cargarComboUbigeo(distrito, true, 3, departamento.val(), prov, function(id) {

			if (id != 1) {
				mostrarMensajeError(id);
			}
			else {
				distrito.val(valor);
			}
		});

		ubigeo.val(CADENA_VACIA);
	});

	distrito.on('click', function() {
		ubigeo.val(distrito.val());
	});

	btnAgregarDireccion.on('click', function() {
		if (validarDireccionDespacho()) {
			dinamicaAgregarDirDespacho();
		}
	});

	//AGREGAR Y ELIMINAR CONTACTOS 
	btnAgregarContacto.on('click', function() {
		if (validarContactos(validarContactos.AGREGAR)) {
			dinamicaAgregarContacto();
		}
	});

	btnEliminarContacto_0.on('click', function() {
		dinamicaEliminarContacto(0);
	});

	//AGREGAR TELEFONO Y EMAIL DE CONTACTOS
	$("#btnAgregarEmail_0").on('click', function() {
		validarCamposInsertarCampos(0, 1);
	});

	$("#btnAgregarTelefono_0").on('click', function() {
		validarCamposInsertarCampos(0, 0);
	});

	telContacto_0_0.on('keypress', function(event) {
		return soloEnteros(event);
	});

	telefonoFijo.on('keypress', function(event) {
		return soloEnteros(event);
	});

	celular.on('keypress', function(event) {
		return soloEnteros(event);
	});

}

function validaEmail(valor) {
	re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

	if (!re.exec(valor)) {
		return 0
	}
	else
		return 1
};

function validaLongitudTelefono(valor, tipo) {
	if (tipo == 0) { // Fijo
		if (valor.length < 7) {
			return 0
		}
	}
	if (tipo == 1) { // Celular
		if (valor.length < 9) {
			return 0
		}
	}
};

function validarCamposInsertarCampos(i, tipo) {
	var indiceTel;
	var indiceEma;

	// verificando que no hayan detalles vacíos	
	if (tipo == 0) { // TELEFONO
		indiceTel = obtenerCantidad('telefono', i);

		if ($('#activo_' + i).val() == '1') {

			if ($('#telContacto_' + i + "_" + indiceTel).val().trim() == '') {
				mostrarMensajeValidacion('Debe ingresar el teléfono del contacto', null, '#telContacto_' + i + "_" + indiceTel);
				return false;
			}
			if ($('#telContacto_' + i + "_" + indiceTel).val().trim() != '') {
				if (validaLongitudTelefono($('#telContacto_' + i + "_" + indiceTel).val().trim(), 0) == 0) {
					mostrarMensajeValidacion('Debe ingresar al menos 7 caracteres en el teléfono del contacto', null, '#telContacto_' + i + "_" + indiceTel);
					return false;
				}
				else {
					dinamicaAgregarTelefonoContacto(i);
				}
			}
		}
	}

	if (tipo == 1) { // EMAIL
		indiceEma = obtenerCantidad('email', i);

		if ($('#activo_' + i).val() == '1') {

			if ($('#emailContacto_' + i + "_" + indiceEma).val().trim() == '') {
				mostrarMensajeValidacion('Debe ingresar el email del contacto', null, '#emailContacto_' + i + "_" + indiceEma);
				return false;
			}

			dinamicaAgregarEmailContacto(i);
			/*if ($('#emailContacto_' + i + "_" + indiceEma).val().trim() != '') {
				if (validaEmail($('#emailContacto_' + i + "_" + indiceEma).val().trim()) == 0) {
					mostrarMensajeValidacion('Debe ingresar un email válido para el contacto', null, '#emailContacto_' + i + "_" + indiceEma);
					return false;
				}
				else {
					dinamicaAgregarEmailContacto(i);
				}
			}*/		
		}
	}
}

function limpiarSocioNegocio() {

	tipoDocumento.val(CADENA_VACIA);
	nroDocumento.val(CADENA_VACIA);
	tipoPersona.val(CADENA_VACIA);
	razonSocial.val(CADENA_VACIA);
	nombre.val(CADENA_VACIA);
	apePaterno.val(CADENA_VACIA);
	apeMaterno.val(CADENA_VACIA);
	pais.val(CADENA_VACIA);
	departamento.val(CADENA_VACIA);
	provincia.val(CADENA_VACIA);
	distrito.val(CADENA_VACIA);
	ubigeo.val(CADENA_VACIA);
	direccionFiscal.val(CADENA_VACIA);
	direccionDespacho_0.val(CADENA_VACIA);
	telefonoFijo.val(CADENA_VACIA);
	celular.val(CADENA_VACIA);
	correo.val(CADENA_VACIA);
	condicion.val(CADENA_VACIA);
	dias.val(CADENA_VACIA);
	activo.prop('checked', true);
	comentarios.val(CADENA_VACIA);
	limpiarContactosSocioNegocio();
	ocultarControl(divDias);
	formSocioNegocio.removeClass('was-validated');
	formContactos.removeClass('was-validated');
}

function limpiarContactosSocioNegocio() {
	var i;

	for (i = 0; i <= indiceContacto; i++) {
		$('#contacto_' + i).val(CADENA_VACIA);
		$('#cargo_' + i).val(CADENA_VACIA);
		$('#activo_' + i).val(1);
		$('#emailfactura_' + i).val(CADENA_VACIA);
		$('#id_contacto_' + i).val('0');
		$('#asignadoDef_' + i).prop('checked', false);

		limpiarValoresDetalle(i);

		//Eliminar contactos dinámicos
		if (i > 0) {
			$('#field_' + i).remove();
		}
	}

	indiceContacto = 1;
	indiceRealContacto = 1;
}


function mostrarCamposDenominacion() {

	if (tipoPersona.val() == TipoPersona.JURIDICA) {
		mostrarControl(divRazSocial);
		ocultarControl(divNombres);
		ocultarControl(divApePaterno);
		ocultarControl(divApeMaterno);
		nombre.val(CADENA_VACIA);
		apePaterno.val(CADENA_VACIA);
		apeMaterno.val(CADENA_VACIA);

	}
	else {

		if (tipoPersona.val() == '') {
			ocultarControl(divRazSocial);
			ocultarControl(divNombres);
			ocultarControl(divApePaterno);
			ocultarControl(divApeMaterno);
			razonSocial.val(CADENA_VACIA);
			nombre.val(CADENA_VACIA);
			apePaterno.val(CADENA_VACIA);
			apeMaterno.val(CADENA_VACIA);
		}
		else {
			ocultarControl(divRazSocial);
			mostrarControl(divNombres);
			mostrarControl(divApePaterno);
			mostrarControl(divApeMaterno);
			razonSocial.val(CADENA_VACIA);
		}

	}

}

function mostrarCombosUbigeo() {

	if (pais.val() == Pais.PERU) {
		mostrarControl(divDepartamento);
		mostrarControl(divProvincia);
		mostrarControl(divDistrito);
		mostrarControl(divUbigeo);
	}
	else {
		ocultarControl(divDepartamento);
		ocultarControl(divProvincia);
		ocultarControl(divDistrito);
		ocultarControl(divUbigeo);
	}

}

function obtenerValoresMatriz() {
	var array = [];
	var telefonoVal = '';
	var emailVal = '';
	var i;
	var j;
	var indiceTel;
	var indiceEma;

	for (i = 0; i < indiceContacto; i++) {

		indiceTel = obtenerCantidad('telefono', i);
		indiceEma = obtenerCantidad('email', i);

		array[i] = {};
		telefonoVal = '';
		emailVal = '';

		if (document.getElementById("contacto_" + i)) {
			array[i]['nombreContacto'] = $('#contacto_' + i).val();
		}

		if (document.getElementById("id_contacto_" + i)) {
			array[i]['idContactoSN'] = $('#id_contacto_' + i).val();
		}

		if (document.getElementById("cargo_" + i)) {
			array[i]['cargoContacto'] = $('#cargo_' + i).val();
		}

		if (document.getElementById("emailfactura_" + i)) {
			array[i]['emailFactura'] = $('#emailfactura_' + i).val();
		}

		if (document.getElementById("asignadoDef_" + i)) {
			if ($('#asignadoDef_' + i).is(':checked')) {
				array[i]['predeterminado'] = 1;
			}
			else {
				array[i]['predeterminado'] = 0;
			}
		}

		if (document.getElementById("activo_" + i)) {
			array[i]['activo'] = $('#activo_' + i).val();
		}

		for (j = 0; j <= indiceTel; j++) {

			if (document.getElementById("telContacto_" + i + "_" + j)) {
				if ($('#telContacto_' + i + "_" + j).val() != '') {
					telefonoVal = telefonoVal + $('#telContacto_' + i + "_" + j).val() + ";";
				}
			}
		}

		array[i]['telefono'] = telefonoVal;

		for (j = 0; j <= indiceEma; j++) {
			if (document.getElementById("emailContacto_" + i + "_" + j)) {
				if ($('#emailContacto_' + i + "_" + j).val() != '') {
					emailVal = emailVal + $('#emailContacto_' + i + "_" + j).val() + ";";
				}
			}
		}
		array[i]['email'] = emailVal;

	};

	return array;
}

function obtenerValoresMatrizDirDespacho() {
	var array = [];

	for (i = 0; i < indiceDirDespacho; i++) {
		array[i] = {};

		if (document.getElementById("direccionDespacho_" + i)) {
			array[i]['direccionDespacho'] = $('#direccionDespacho_' + i).val();
		}

		if (document.getElementById("idDirDespachoSN_" + i)) {
			array[i]['idDirDespachoSN'] = $('#idDirDespachoSN_' + i).val();
		}

		if (document.getElementById("activoDir_" + i)) {
			array[i]['activo'] = $('#activoDir_' + i).val();
		}
	};

	return array;
}

function limpiarValoresDetalle(ic) {
	var j;
	var cantTel;
	var cantEma;

	cantTel = obtenerCantidad('telefono', ic);
	cantEma = obtenerCantidad('email', ic);

	for (j = 0; j <= cantTel; j++) {

		/*if ( document.getElementById( "telContacto_" + i + "_" + j)) {*/
		if ($("#telContacto_" + ic + "_" + j)) {
			if ($('#telContacto_' + ic + "_" + j).val() != '') {
				$('#telContacto_' + ic + "_" + j).val('');
			}
			if (j > 0) {
				$('#telContacto_' + ic + "_" + j).remove();
				$('#lbltelContacto_' + ic + "_" + j).remove();
			}
		}
	}

	for (j = 0; j <= cantEma; j++) {

		if ($("#emailContacto_" + ic + "_" + j)) {
			/*if ( document.getElementById( "emailContacto_" + i + "_" + j)) {*/
			if ($('#emailContacto_' + ic + "_" + j).val() != '') {
				$('#emailContacto_' + ic + "_" + j).val('');
			}
			if (j > 0) {
				$('#emailContacto_' + ic + "_" + j).remove();
				$('#lblemailContacto_' + ic + "_" + j).remove();
			}
		}
	}
}

function obtenerCantidad(tipo, ic) {
	var indice = 0;
	var x;
	var y;

	if (tipo == 'telefono') {
		//Obtiene indice del Telefono por Contacto seleccionado
		for (x = 0; x < 5; x++) {
			/*if ($('#telContacto_' + ic + "_" + x)) {*/
			if (document.getElementById("telContacto_" + ic + "_" + x)) {
				indice = x;
			}
		};
	}

	if (tipo == 'email') {
		//Obtiene indice del Email por Contacto seleccionado
		for (y = 0; y < 5; y++) {
			/*	if ($('#emailContacto_' + ic + "_" + y)) {*/
			if (document.getElementById("emailContacto_" + ic + "_" + y)) {
				indice = y;
			}
		};
	}

	return indice;
}

function dinamicaAgregarTelefonoContacto(i) {
	var cantTel = 0;
	var cantEmail = 0;

	cantTel = obtenerCantidad('telefono', i);
	cantEmail = obtenerCantidad('email', i);

	if (cantTel == 4) {
		mostrarMensajeValidacion("Sólo puede agregar 5 teléfonos de contacto", $('#btnAgregarTelefono_' + i));
		return;
	}
	else {
		cantTel = cantTel + 1;

		if (cantTel > cantEmail) {
			var row = document.createElement('div');
			row.setAttribute('id', 'div_row_' + i + '_' + cantTel);
			row.setAttribute('class', 'row');

			htmlTel = '<div class="col-md-3"><label class="label" id="lbltelContacto_' + i + '_' + cantTel + '">Teléfono ' + (cantTel + 1) + ':</label><input class="form-control" maxlength="20" type="text" id="telContacto_' + i + '_' + cantTel + '" onkeypress="soloEnteros(event);"></input></div>';
			htmlTel = htmlTel + '<div class="col-md-1"></div>';

			row.innerHTML = htmlTel;
			document.getElementById('div_contacto_' + i).appendChild(row);
		}
		else {
			var label = document.createElement('label');
			label.setAttribute('class', 'label');
			label.setAttribute('id', 'lbltelContacto_' + i + '_' + cantTel);
			htmlTel = 'Teléfono ' + (cantTel + 1) + ':';
			label.innerHTML = htmlTel;
			document.getElementById('div_row_col_' + i + '_' + cantTel).appendChild(label);

			var input = document.createElement('input');
			input.setAttribute('id', 'telContacto_' + i + '_' + cantTel);
			input.setAttribute('class', 'form-control');
			input.setAttribute('maxlength', '20');
			input.setAttribute('type', 'text');
			document.getElementById('div_row_col_' + i + '_' + cantTel).appendChild(input);
		}

	}


}

function dinamicaEliminarContacto(i) {
	console.log("indiceRealContacto:" + indiceRealContacto);

	if (indiceRealContacto > 1) {
		bootbox.confirm({
			message: "¿Está seguro que desea eliminar el contacto?",
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
					ocultarControl($("#field_" + i));
					controlNoRequerido($('#contacto_' + i));
					controlNoRequerido($('#cargo_' + i));	
					controlNoRequerido($('#telContacto_' + i + '_0'));	
					controlNoRequerido($('#emailContacto_' + i + '_0'));			
					$('#contacto_' + i).val(CADENA_VACIA);
					$('#cargo_' + i).val(CADENA_VACIA);
					$('#asignadoDef_' + i).val(CADENA_VACIA);
					$('#activo_' + i).val(0);
					limpiarValoresDetalle(i);
					indiceRealContacto = indiceRealContacto - 1;
				}
			}
		});
	}
	else {
		mostrarMensajeValidacion("Debe ingresar como mínimo un contacto", $('#btnEliminarContacto_' + i));
	}
}

function dinamicaEliminarDirDespacho(i) {
	console.log("indice direccion despacho:" + i);

	ocultarControl($("#rowDirDespacho_" + i));
	controlNoRequerido($('#direccionDespacho_' + i));
	//$('#direccionDespacho_' + i).val(CADENA_VACIA);
	$('#activoDir_' + i).val(0);
	limpiarValoresDetalle(i);
	indiceRealDirDespacho = indiceRealDirDespacho - 1;
}

function dinamicaAgregarEmailContacto(i) {
	var htmlTel;
	var cantTel = 0;
	var cantEmail = 0;

	cantTel = obtenerCantidad('telefono', i);
	cantEmail = obtenerCantidad('email', i);

	if (cantEmail == 4) {
		mostrarMensajeValidacion("Sólo puede agregar 5 email de contacto", $('#btnAgregarEmail_' + i));
		return;
	}
	else {
		cantEmail = cantEmail + 1;

		if (cantEmail > cantTel) {
			var row = document.createElement('div');
			row.setAttribute('id', 'div_row_' + cantEmail);
			row.setAttribute('class', 'row');

			htmlTel = '<div id = "div_row_col_' + i + '_' + cantEmail + '" class="col-md-3"></div><div class="col-md-1"></div>';
			htmlTel = htmlTel + '<div class="col-md-3"><label class="label" id="lblemailContacto_' + i + '_' + cantEmail + '">Email ' + (cantEmail + 1) + ':</label><input class="form-control" maxlength="20" type="email" id="emailContacto_' + i + '_' + cantEmail + '"></input></div>';
			htmlTel = htmlTel + '<div class="col-md-1"></div>';

			row.innerHTML = htmlTel;
			document.getElementById('div_contacto_' + i).appendChild(row);
		}
		else {
			var div = document.createElement('div');
			div.setAttribute('class', 'col-md-3');

			htmlTel = '<label class="label" id="lblemailContacto_' + i + '_' + cantEmail + '">Email ' + (cantEmail + 1) + ':</label><input class="form-control" maxlength="20" type="email" id="emailContacto_' + i + '_' + cantEmail + '"></input>';
			//htmlTel = htmlTel + '<div class="col-md-1"></div>';

			div.innerHTML = htmlTel;
			document.getElementById('div_row_' + i + '_' + cantEmail).appendChild(div);
		}

	}

}


function dinamicaAgregarContacto() {
	var html;

	/* AGREGAR LEGEND EN BLANCO */
	html = '<div id="field_' + indiceContacto + '" class="card">';
	html = html + '<div id="div_contacto_' + indiceContacto + '" class="card-body" style="margin-top:-12px"><div class="row">';
	html = html + '<div class="col-md-3"><label class="label">Nombre:</label><input class="form-control" maxlength="100" type="text" id="contacto_' + indiceContacto + '" required="required"></input><div class="invalid-feedback">Ingrese el nombre</div></div>';
	html = html + '<div class="col-md-1"><input type="text" style="display: none" id="id_contacto_' + indiceContacto + '"></input></div>';

	html = html + '<div class="col-md-3"><label class="label">Cargo:</label><input class="form-control" maxlength="100" type="text" id="cargo_' + indiceContacto + '" required="required"></input><div class="invalid-feedback">Ingrese el cargo</div></div>';
	html = html + '<div class="col-md-1"><input type="text" style="display: none" value="1" id="activo_' + indiceContacto + '"></input></div>';

	html = html + '<div class="col-md-3"><label class="label">Email factura:</label><input class="form-control" maxlength="100" type="email" id="emailfactura_' + indiceContacto + '"></input></div>';
	html = html + '<div class="col-md-1 alineacion-derecha"><label class="label"></label><button type="button" id="btnEliminarContacto_' + indiceContacto + '" class="btn btn-danger btn-sm btn-group-append" title="Eliminar contacto" onclick="dinamicaEliminarContacto(' + indiceContacto + ');">';
	html = html + '<span class="mr-1"><i class="far fa-trash-alt"></i></span></button></div>';
	html = html + '</div>';

	html = html + '<div class="row">';
	html = html + '<div class="col-md-3"><label class="label">Teléfono 1:</label><input class="form-control" maxlength="20" type="text" id="telContacto_' + indiceContacto + '_0" onkeypress="soloEnteros(event);" required="required"></input><div class="invalid-feedback">Ingrese el teléfono de contacto</div></div>';
	html = html + '<div class="col-md-1"><label class="label"></label><button type="button" id="btnAgregarTelefono_' + indiceContacto + '" class="btn btn-primary btn-sm input-group-append form-check-input" title="Agregar teléfono" onclick="validarCamposInsertarCampos(' + indiceContacto + ', 0);">';
	html = html + '<span class="mr-1"><i class="fas fa-plus-square"></i></span></button></div>';
	html = html + '<div class="col-md-3"><label class="label">Email 1:</label><input class="form-control" maxlength="100" type="email" id="emailContacto_' + indiceContacto + '_0" required="required"></input><div class="invalid-feedback">Ingrese el email de contacto</div></div>';
	html = html + '<div class="col-md-1"><label class="label"></label><button type="button" id="btnAgregarEmail_' + indiceContacto + '" class="btn btn-primary btn-sm input-group-append form-check-input" title="Agregar email" onclick="validarCamposInsertarCampos(' + indiceContacto + ', 1);">';
	html = html + '<span class="mr-1"><i class="fas fa-plus-square"></i></span></button></div>';
	html = html + '<div class="col-md-3"><label class="label"></label><div class="form-check"><input class="form-check-input" type="checkbox" id="asignadoDef_' + indiceContacto + '"></input>';
	html = html + '<label class="label my-2">Asignado por defecto</label></div>';
	html = html + '<div class="col-md-1"></div>';
	html = html + '</div></div> </div>';

	$('#collapseDatosContacto1').append(html);

	indiceContacto = indiceContacto + 1;
	indiceRealContacto = indiceRealContacto + 1;
}

function dinamicaAgregarDirDespacho() {
	var html = '';

	html = html + '<div class="row" id ="rowDirDespacho_' + indiceDirDespacho + '">';
	html = html + '<div class="col-md-11"><label class="label">Dirección de despacho' + (indiceDirDespacho + 1) + ':</label><input class="form-control" maxlength="150" type="text" id="direccionDespacho_' + indiceDirDespacho + '" required = "required"></input>';
	html = html + '<div class="invalid-feedback">Ingrese la dirección de despacho' + (indiceDirDespacho + 1) + '</div></div>';
	html = html + '<div style="display: none" ><input type="text" id="idDirDespachoSN_' + indiceDirDespacho + '"></input></div>';
	html = html + '<div style="display: none" ><input type="text" value="1" id="activoDir_' + indiceDirDespacho + '"></input></div>';
	html = html + '<div class="col-md-1 alineacion-derecha"><label class="label"></label><button type="button" id="btnEliminarDirDespacho_' + indiceDirDespacho + '" class="btn btn-danger btn-sm input-group-append" title="Eliminar dirección" onclick="dinamicaEliminarDirDespacho(' + indiceDirDespacho + ');">';
	html = html + '<span class="mr-1"><i class="far fa-trash-alt"></i></span></button></div>';
	html = html + '</div>';

	$('#collapseDireccionDespacho').append(html);

	indiceDirDespacho = indiceDirDespacho + 1;
	indiceRealDirDespacho = indiceRealDirDespacho + 1;
}

function registrarSocioNegocio() {

	var chkActivo = null;
	if (activo.is(':checked')) { chkActivo = 1 } else { chkActivo = 0 }

	var prefijoSN;
	var vendedor = '';
	var listaPrecios = '';
	var codDepa;
	var codProv;
	var codDist;

	if (tipoSocio.text() == CodigoSocio.CLIENTE) {
		prefijoSN = CodigoParametrica.CLIENTE;
	}
	else {
		prefijoSN = CodigoParametrica.PROVEEDOR;
	}

	if (pais.val() == '') {
		codDepa = '';
		codProv = '';
		codDist = '';
	}
	else {
		codDepa = departamento.val();
		codProv = provincia.val().substring(2, 4);
		codDist = distrito.val().substring(4, 6);
	}

	var detalle = obtenerValoresMatriz();
	var detalleDirDespacho = obtenerValoresMatrizDirDespacho();

	var objetoJson = {
		codigoSocio: codigoSocio.text().trim(),
		prefijo: prefijoSN,
		codigoTipoSocio: tipoSocio.text(),
		codigoTipoDocumento: tipoDocu.val(),
		codigoTipoPersona: tipoPersona.val(),
		numeroDocumento: nroDocumento.val().trim(),
		razonSocial: razonSocial.val().trim(),
		nombres: nombre.val().trim(),
		apePaterno: apePaterno.val().trim(),
		apeMaterno: apeMaterno.val().trim(),
		direccionFiscal: direccionFiscal.val().trim(),
		email: correo.val().trim(),
		celular: celular.val().trim(),
		telefonoFijo: telefonoFijo.val().trim(),
		codigoPais: pais.val(),
		codigoDepartamento: codDepa,
		codigoProvincia: codProv,
		codigoDistrito: codDist,
		ubigeo: distrito.val(),
		vendedor: vendedor,
		comentarios: comentarios.val().trim(),
		codigoCondicionPago: condicion.val(),
		codigoDiasCredito: dias.val(),
		listaPrecios: listaPrecios,
		activo: chkActivo,
		detalle: detalle,
		detalleDirDespacho: detalleDirDespacho
	};

	var entityJsonStr = JSON.stringify(objetoJson);

	var formData = new FormData();

	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));

	console.log("registrarSN:" + entityJsonStr);

	$.ajax({
		type: "POST",
		contentType: false,
		processData: false,
		url: '/appkahaxi/registrarSocioNegocio/',
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

function grabarSocioNegocio(e) {

	if (formSocioNegocio[0].checkValidity() == false || formContactos[0].checkValidity()== false ) {
		e.stopPropagation();
	}
	else {
		e.stopPropagation();
		
		if (validarCabecera() == true && validarContactos(TipoOperacion.GRABAR) == true) {
			registrarSocioNegocio();
		}
	}
	formSocioNegocio.addClass('was-validated');
	formContactos.addClass('was-validated');
}

function validarCabecera() {
	var cant = 0;

	// verificando el tamaño del número de documento
	if ((tipoDocu.val() == TipoDocumento.DNI) && (nroDocumento.val().length != 8)) {
		mostrarMensajeValidacion("Debe ingresar hasta 8 dígitos para el tipo de documento DNI", nroDocumento);
		return false;
	}

	if ((tipoDocu.val() == TipoDocumento.RUC) && (nroDocumento.val().length != 11)) {
		mostrarMensajeValidacion("Debe ingresar hasta 11 dígitos para el tipo de documento RUC", nroDocumento);
		return false;
	}

	if (tipoDocu.val() == TipoDocumento.DOC_TRIB_NODOM_SIN_RUC && pais.val() != Pais.PERU) {
		mostrarMensajeValidacion('No puede registrar un cliente con tipo de documento DOC. TRIB. NO DOM. SIN RUC y país diferente de Perú', pais);
		return false;
	}

	if (tipoDocu.val() == TipoDocumento.DNI && pais.val() != Pais.PERU) {
		mostrarMensajeValidacion('No puede registrar un proveedor con tipo de documento DNI y país diferente de Perú', pais);
		return false;
	}

	if (tipoDocu.val() == TipoDocumento.RUC && pais.val() != Pais.PERU) {
		mostrarMensajeValidacion('No puede registrar un proveedor con tipo de documento RUC y país diferente de Perú', pais);
		return false;
	}

	// verificando el tipo de persona
	if (tipoPersona.val() == TipoPersona.JURIDICA) {
		if (razonSocial.val() == '') {
			mostrarMensajeValidacion("Debe ingresar la razón social", razonSocial);
			return false;
		}
	}
	else {
		if (nombre.val() == '') {
			mostrarMensajeValidacion("Debe ingresar el nombre", nombre);
			return false;
		}

		if (apePaterno.val() == '') {
			mostrarMensajeValidacion("Debe ingresar el apellido paterno", apePaterno);
			return false;
		}

		if (apeMaterno.val() == '') {
			mostrarMensajeValidacion("Debe ingresar el apellido materno", apeMaterno);
			return false;
		}
	}

	// Validando el país
	if (pais.val() == Pais.PERU) { // Si el país es Perú

		if (departamento.val() == '') {
			mostrarMensajeValidacion("Debe seleccionar el departamento", departamento);
			return false;
		}

		if (provincia.val() == '') {
			mostrarMensajeValidacion("Debe seleccionar la provincia", provincia);
			return false;
		}

		if (distrito.val() == '') {
			mostrarMensajeValidacion("Debe seleccionar el distrito", distrito);
			return false;
		}
	}

	if (condicion.val() == CondicionPago.CREDITO && dias.val() == CADENA_VACIA) {
		mostrarMensajeValidacion('Debe seleccionar los días de crédito', dias);
		return false;
	}

	return true;
}

function validarContactos(tipo) {
	var cant = 0;
	var act;

	// verificando que no hayan detalles vacíos
	for (i = 0; i < indiceContacto; i++) {
		act = $('#activo_' + i).val();

		console.log("activo:" + $('#activo_' + i).val());

		if (act == '1') {
			//var nombreCon = $('#contacto_' + i).val().trim();
			//var cargo = $('#cargo_' + i).val().trim();
			var telefonodet = $('#telContacto_' + i + "_0").val();
			var emaildet = $('#emailContacto_' + i + "_0").val();

			if ($('#asignadoDef_' + i).is(':checked')) {
				cant = cant + 1;
			}
			/*if (nombreCon == '') {
				mostrarMensajeValidacion('Debe ingresar el nombre del contacto', null, '#contacto_' + i);
				return false;
			}
			if (cargo == '') {
				mostrarMensajeValidacion('Debe ingresar el cargo del contacto', null, '#cargo_' + i);
				return false;
			}*/
			if (telefonodet == '') {
				mostrarMensajeValidacion('Debe ingresar al menos un teléfono para el contacto', null, '#telContacto_' + i + "_0");
				return false;
			}

			if (validaLongitudTelefono(telefonodet.trim(), 0) == 0) {
				mostrarMensajeValidacion('Debe ingresar al menos 7 caracteres en el teléfono del contacto', null, '#telContacto_' + i + "_0");
				return false;
			}

			if (emaildet == '') {
				mostrarMensajeValidacion('Debe ingresar al menos un email para el contacto', null, '#emailContacto_' + i + "_0");
				return false;
			}

			/*if (validaEmail(emaildet.trim()) == 0) {
				mostrarMensajeValidacion('Debe ingresar un email válido para el contacto', null, '#emailContacto_' + i + "_0");
				return false;
			}*/

		}
	}

	if (tipo == TipoOperacion.GRABAR) {
		if (cant == 0) {
			mostrarMensajeValidacion('Debe seleccionar un contacto como predeterminado.');
			return false;
		}
		if (cant > 1) {
			mostrarMensajeValidacion('Debe seleccionar sólo un contacto como predeterminado.');
			return false;
		}
	}

	return true;
}

function validarDireccionDespacho() {
	var act;

	if (direccionDespacho_0.val().trim() == CADENA_VACIA) {
		mostrarMensajeValidacion('Debe ingresar la dirección de despacho', null, '#direccionDespacho_0');
		return false;
	}

	for (i = 0; i < indiceDirDespacho; i++) {
		act = $('#activoDir_' + i).val();

		if (act == '1') {
			var dirDespacho = $('#direccionDespacho_' + i).val().trim();

			if (dirDespacho == '') {
				mostrarMensajeValidacion('Debe ingresar la dirección de despacho', null, '#direccionDespacho_' + i);
				return false;
			}
		}
	}

	return true;
}

function mostrarOcultarDiasPorCondicionPago() {

	var condPagoVal = condicion.val();

	if (condPagoVal == CondicionPago.CREDITO) {
		mostrarControl(divDias);
	} else {
		dias.val(CADENA_VACIA);
		ocultarControl(divDias);
	}
}



