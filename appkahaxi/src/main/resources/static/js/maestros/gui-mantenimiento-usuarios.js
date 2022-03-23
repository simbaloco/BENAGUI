// campos de formulario principal
var formUsuario;
var campoBuscar;
var perfil;
// campos de formulario modal
var form_validado_usuario;
var form_usuarioModal;
var titulo;
var nombresModal;
var apepaternoModal;
var apematernoModal;
var activoModal;
var usuarioModal;
var contrasenaModal;
var confirmacontrasenaModal;
var treePerfiles;
var treeOpciones;
var divtreeOpciones;
var divlabelOpciones;
// botones
var btnLimpiar;
var btnNuevo;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaUsuario;
var dataTableUsuario;
var iOpcion=0;


/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();
});

function inicializarVariables() {
	formUsuario = $('#formPerfil');
	campoBuscar = $('#campoBuscar');
	perfil = $('#perfil');
	form_validado_usuario = $('#form_validado_usuario');
	form_usuarioModal = $('#form_usuarioModal');
	titulo = $('#titulo');
	labelRoles = $('#labelRoles');
	nombresModal = $('#nombresModal');
	apepaternoModal = $('#apepaternoModal');
	apematernoModal = $('#apematernoModal');
	activoModal = $('#activoModal');
	usuarioModal = $('#usuarioModal');
	contrasenaModal = $('#contrasenaModal');
	confirmacontrasenaModal = $('#confirmacontrasenaModal');
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	tablaUsuario = $('#tablaUsuario');
	treePerfiles = $('#treePerfiles');
	treeOpciones = $('#treeOpciones');
	divtreeOpciones = $('#divtreeOpciones');
	divlabelOpciones = $('#divlabelOpciones');
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
	
	form_usuarioModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_usuarioModal.on('shown.bs.modal', function (){
	  nombresModal.trigger('focus');
	})
		
	perfil.on('click', function (e) {
		console.log('perfil--->' + perfil.val());
		buscar();
	});
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_usuario.removeClass('was-validated'); 
    	cargarModalUsuario(null, Opcion.NUEVO);
	});
	
	
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_usuario[0].checkValidity() === false) {
            e.stopPropagation();
        }else{
        	registrarUsuario();
        }
    	form_validado_usuario.addClass('was-validated');
	});
	
	btnCerrarModal.on("click", function(e) {
		form_usuarioModal.modal('hide');//ocultamos el modal
	});
	
}


function inicializarTabla(){
	
	dataTableUsuario = tablaUsuario.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar 	= campoBuscar.val().trim();
				d.idPerfil		= (perfil.val() == CADENA_VACIA) ? 0 : perfil.val();
		    },
            url: '/appkahaxi/listarUsuarios/',
                dataSrc: function (json) {
				console.log("listarUsuarios...success");
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
                    "width": "25px",
                    "targets": [1],
                    "data": "username"
                },				
				{
                    "width": "35px",
                    "targets": [2],
                    "data": "nombres",
                    
                },
                {
                    "width": "35px",
                    "targets": [3],
                    "data": "apePaterno",
                },
                {
                    "width": "35px",
                    "targets": [4],
                    "data": "apeMaterno",
                },
				{
                    "width": "35px",
                    "targets": [5],
                    "data": "codigoUsuarioRegistra",
                },
                {
                    "width": "35px",
                    "targets": [6],
                    "data": "fechaRegistro",
                },
				{
                    "width": "3px",
                    "targets": [7],
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
                    "targets": [8],
                    "className": "dt-body-center",
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
	
	
	
	$('#tablaUsuario tbody').on( 'click','.btn-view', function () {
	    var data = dataTableUsuario.row( $(this).closest('tr')).data();	    
		console.log('ver usuario--->' + data.username);
		cargarUsuario(data.username, Opcion.VER);
	});
	
	$('#tablaUsuario tbody').on( 'click','.btn-edit', function () {
	    var data = dataTableUsuario.row( $(this).closest('tr')).data();
		console.log('editar usuario--->' + data.username);
		cargarUsuario(data.username, Opcion.MODIFICAR);
	});
	
}



/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(){
	var datoBuscar = campoBuscar.val().trim();
	console.log('datoBuscar--->' + datoBuscar);
	buscar();
	
}

function buscar(){
	var form1 = formUsuario;

	if ( $.fn.dataTable.isDataTable(tablaUsuario)) {
		dataTableUsuario.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTableUsuario.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function cargarModalUsuario(usuario, opcion){
		ocultarControl(divtreeOpciones);
		ocultarControl(divlabelOpciones);
		treePerfiles.find(".treeview").remove();
		treeOpciones.find(".treeview").remove();
		
		if(opcion == Opcion.NUEVO){
			console.log("cargarModalUsuario---> NUEVO");
			iOpcion = Opcion.NUEVO;
			nombresModal.val(CADENA_VACIA);
			apepaternoModal.val(CADENA_VACIA);
			apematernoModal.val(CADENA_VACIA);			
			activoModal.val(CADENA_VACIA);
	        usuarioModal.val(CADENA_VACIA);
			contrasenaModal.val(CADENA_VACIA);
			confirmacontrasenaModal.val(CADENA_VACIA);
			activoModal.prop('checked', true);		
			titulo.text(DescripcionOpcion.DES_NUEVO);
			labelRoles.text("Seleccione los roles que desea asociar al usuario:");
			
			habilitarControl(nombresModal);
			habilitarControl(apepaternoModal);
			habilitarControl(apematernoModal);
			habilitarControl(activoModal);
			habilitarControl(usuarioModal);
			habilitarControl(contrasenaModal);
			habilitarControl(confirmacontrasenaModal);
			mostrarControl(btnGrabarModal);
			
			cargarPerfilesUsuario(CADENA_VACIA, Opcion.NUEVO);			
		}
		
		if(opcion == Opcion.MODIFICAR || opcion == Opcion.VER){
			// cargando valores			
			nombresModal.val(usuario.nombres);
			apepaternoModal.val(usuario.apePaterno);
			apematernoModal.val(usuario.apeMaterno);
	        usuarioModal.val(usuario.username);
			contrasenaModal.val(usuario.password);
			confirmacontrasenaModal.val(usuario.password);
						
	        if(usuario.activo == 1){
				activoModal.prop('checked', true);
			}
			else{
				activoModal.prop('checked', false);
			}
			
			if(opcion == Opcion.VER){
				iOpcion = Opcion.VER;
				titulo.text(DescripcionOpcion.DES_VER);
				labelRoles.text("Roles asociados al usuario:");
				
				deshabilitarControl(nombresModal);
				deshabilitarControl(apepaternoModal);
				deshabilitarControl(apematernoModal);
				deshabilitarControl(usuarioModal);
				deshabilitarControl(contrasenaModal);
				deshabilitarControl(confirmacontrasenaModal);				
				deshabilitarControl(activoModal)
				ocultarControl(btnGrabarModal);
				
				cargarPerfilesUsuario(usuarioModal.val(), Opcion.VER);
			}
			
			if(opcion == Opcion.MODIFICAR){
				iOpcion = Opcion.MODIFICAR;
				titulo.text(DescripcionOpcion.DES_MODIFICAR);
				labelRoles.text("Puede modificar los roles asociados al usuario:");
				
				habilitarControl(nombresModal);
				habilitarControl(apepaternoModal);
				habilitarControl(apematernoModal);
				deshabilitarControl(usuarioModal);
				habilitarControl(contrasenaModal);
				habilitarControl(confirmacontrasenaModal);
				habilitarControl(activoModal);
				mostrarControl(btnGrabarModal);
				
				cargarPerfilesUsuario(usuarioModal.val(), Opcion.MODIFICAR);
			}
			
		}
		
	    // mostrando modal
	    mostrarModal(form_usuarioModal);
}

function cargarUsuario(username, opcion){
	
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarUsuarioUsername/' + username, 
        data : null,
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){
			
			if(xhr.status == HttpStatus.OK){
                var data = JSON.parse(result);
                cargarModalUsuario(data, opcion);
            }
			loadding(false);			
        }

    });
}

function dinamicaListarOpciones(id){
	console.log("dinamicaListarOpciones:" + id);
	ocultarControl(divtreeOpciones);
	ocultarControl(divlabelOpciones);
	treeOpciones.find(".treeview").remove();
	
	buscarOpciones(id);
	divtreeOpciones.show(500);
	divlabelOpciones.show(500);
}

function buscarOpciones(idPerfil) {
	console.log("id perfil:" + idPerfil);
	
	$.ajax({
		type:"Get",
		contentType : "application/json",
		accept: 'text/plain',
		url : '/appkahaxi/buscarOpciones/' + idPerfil,
		data : null,
		dataType: 'text',
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(result, textStatus, xhr){
			
			if(xhr.status == HttpStatus.OK) {									
				var listaOpciones = JSON.parse(result);				
		        crearTreeView(treeOpciones, listaOpciones);
				
				$(treeOpciones).off();
				$(treeOpciones).on('click','.toggle', ocultarRama);		
			}

			loadding(false);
			window.scrollTo(0, 0);
		},
		error: function (xhr, error, code){
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
}

function cargarPerfilesUsuario(username, opcion){
	
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/cargarPerfilUsuario/', 
        data : {
				username: username
        },
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){
			
			if(xhr.status == HttpStatus.OK){
                var data = JSON.parse(result);
				console.log(data);
                crearListaPerfiles(treePerfiles, data, opcion);
            }
			loadding(false);			
        }

    });
}

function crearListaPerfiles(etiqueta,data,opcion){
		var idOpcion='Lista0';
		var html=CADENA_VACIA;
		
        $(etiqueta).append("<ul id='"+idOpcion+"' class='treeview'></ul>");
		
      	for(var nodo of data){
			var idCheck="Check" + nodo.idPerfil;
	        var habilita = (opcion == Opcion.VER) ? 'disabled = "disabled"' : CADENA_VACIA;
			var checked = (nodo.check == 1) ? 'checked = "checked"' : CADENA_VACIA;
			
			html = "<li><span style='color:#5990e0;margin-right:20px;'></span><input "+ habilita +" type='checkbox' "+ checked +" class='form-check-input my-n1' id='"+idCheck+"' onclick='dinamicaListarOpciones("+nodo.idPerfil+")'><label for='"+idCheck+"' class='label'>"+nodo.identificador+"</label></li>";
			//html = html + "<button type='button' id='btn'"+nodo.idPerfil+"  class='btn btn-md' title='Ver Opciones'><span class='mr-1'><i class='far fa-arrow-alt-circle-right'></i></span></button></li>";
			$("#"+idOpcion).append(html);	        
		}
}

function obtenerListaPerfiles(){
	var listaPerfiles = '';			
	var treeview = jQuery("body").find('#treePerfiles');				
	var checkboxes = $(treeview).find('input');
	var idElement;
	
	for (i = 0; i < checkboxes.length; i++){
		if(checkboxes[i].type == "checkbox"){	
			idElement = checkboxes[i].id;
			if($('#'+idElement).prop("checked")){				
				listaPerfiles = listaPerfiles + idElement.substr(5) + ",";
			}
		}
	}
	
	return listaPerfiles;
}

function registrarUsuario(){	
	var activo;
	var listaPerfiles;
	
	listaPerfiles = obtenerListaPerfiles();
	
	if (contrasenaModal.val() != confirmacontrasenaModal.val()){
		mostrarDialogoInformacion('La contraseña y la confirmación deben ser iguales.', Boton.WARNING, contrasenaModal, null);
		contrasenaModal.val(CADENA_VACIA);
		confirmacontrasenaModal.val(CADENA_VACIA);
		return false;
	}
	
	if (listaPerfiles == CADENA_VACIA){
		mostrarDialogoInformacion('Debe seleccionar al menos un perfil.', Boton.WARNING, treePerfiles, null);
		return false;
	}
	
	activo = (activoModal.is(':checked')) ? 1 : 0;
	
	var objetoJson = {
		opcion		: iOpcion,
		nombres		: nombresModal.val(),
		apePaterno	: apepaternoModal.val(),
		apeMaterno	: apematernoModal.val(),
		activo		: activo,
		username	: usuarioModal.val(),
		password	: contrasenaModal.val(),
		perfiles	: listaPerfiles
	};

	var entityJsonStr = JSON.stringify(objetoJson);
	console.log("entityJsonStr: " + entityJsonStr);
	var formData = new FormData();

	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));

	$.ajax({
		type:"POST",
		contentType: false,
		processData: false,
		url : '/appkahaxi/registrarUsuario/',
		data: formData,
		beforeSend: function(xhr) {
			loadding(true);
		},
		success:function(resultado,textStatus,xhr){

			if(xhr.status == HttpStatus.OK){
				mostrarNotificacion("El registro fue grabado correctamente.", "success");
				btnCerrarModal.click();
				buscar();
			}else if(xhr.status == HttpStatus.Accepted){
				mostrarMensajeValidacion(resultado, nombresModal);
			}
			loadding(false);
		},
		error: function (xhr, error, code){
			mostrarMensajeError(xhr.responseText);
			loadding(false);
		}
	});
	
}

function limpiar(){
	campoBuscar.val(CADENA_VACIA);
	perfil.val(CADENA_VACIA);	
	buscar();
	campoBuscar.focus();
	ocultarControl(divtreeOpciones);
	ocultarControl(divlabelOpciones);
}


function crearTreeView(etiqueta,listaOpciones){
	var idOpcion='ListaOpciones';
    $(etiqueta).append("<ul id='"+idOpcion+"' class='treeview'></ul>");
	
  	buscarHijos(idOpcion,listaOpciones);
}

function buscarHijos(etiqueta,data,idPadre){
    for(var nodo of data){
		if (idPadre > 0){
			if(nodo.idPadre == idPadre){
				esPadre(etiqueta,nodo,data);
			}
		}
		else{
			if (nodo.nivel == 0){
				esPadre(etiqueta,nodo,data);
			}
		}
    }
}

function esPadre(etiqueta,nodo,opciones){
    if(!nodo.have_children){
    	crearHijo(etiqueta,nodo);
    }else{
        crearPadre(etiqueta,nodo,);
        var idetiqueta="Lista"+nodo.id;
        buscarHijos(idetiqueta,opciones,nodo.id);
    }
}

function crearPadre(etiqueta,opcion){
    var idOpcion="Lista"+opcion.id;
    var idCheck="CheckOp"+opcion.id;
	var checked = (opcion.check == 1) ? 'checked = "checked"' : CADENA_VACIA;
	
	$("#"+etiqueta).append("<li><span attr-data='"+opcion.id+"' style='margin-left:-20px;color:#5990e0;margin-right:25px;cursor: pointer;' class='toggle' attr-opcion='plus'><span class='icon"+opcion.id+"'><i class=\"far fa-plus-square\"></i></span></span><input disabled ='disabled' type='checkbox' "+ checked +" class='form-check-input my-n1' id='"+idCheck+"' onclick='checkboxParent(this);'><label for='"+idCheck+"'  class='label'>"+opcion.descripcion+"</label><ul style='margin-left: 32px' id='"+idOpcion+"'></ul></li>");
    $("#"+idOpcion).hide("fast");
}

function crearHijo(etiqueta,opcion){
    var idCheck="CheckOp"+opcion.id;
	var checked = (opcion.check == 1) ? 'checked = "checked"' : CADENA_VACIA;
    
	$("#"+etiqueta).append("<li><input disabled ='disabled' type='checkbox' "+ checked +" class='form-check-input my-n1' id='"+idCheck+"'><label for='"+idCheck+"' class='label'>"+opcion.descripcion+"</label></li>");
}

function ocultarRama(){
    var $this=$(this);
    console.log("entro al boton ")
    var id=$this.attr("attr-data");
    var opcion=$this.attr("attr-opcion");
    if(opcion=='plus'){
        $this.attr("attr-opcion","rest");
        $(".icon"+id).html("<i class=\"fas fa-minus\"></i>");
    }else{
        $(".icon"+id).html("<i class='far fa-plus-square'></i>");
        $this.attr("attr-opcion","plus");
    }
    $("#Lista"+id).toggle("slow");
}

