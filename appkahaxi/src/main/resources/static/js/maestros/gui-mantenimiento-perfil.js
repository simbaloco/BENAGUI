// campos de formulario principal
var formPerfil;
var campoBuscar;
// campos de formulario modal
var form_validado_perfil;
var form_perfilModal;
var titulo;
var idPerfilModal;
var identificadorModal;
var activoModal;
var tree;
// botones
var btnLimpiar;
var btnNuevo;
var btnGrabarModal;
var btnCerrarModal;
// tablas
var tablaPerfil;
var dataTablePerfil;

/**************** CARGA INICIAL DE FORMULARIO ****************************************************
 *************************************************************************************************/

$(document).ready(function() {
	inicializarVariables();
	inicializarComponentes();
	inicializarPantalla();	
});

function inicializarVariables() {
	formPerfil = $('#formPerfil');
	campoBuscar = $('#campoBuscar');
	form_validado_perfil = $('#form_validado_perfil');
	form_perfilModal = $('#perfilModal');
	titulo = $('#titulo');
	idPerfilModal = $('#idPerfilModal');
	identificadorModal = $('#identificadorModal');
	activoModal = $('#activoModal');
	btnLimpiar = $('#btnLimpiar');
	btnNuevo = $('#btnNuevo');
	btnGrabarModal = $('#btnGrabarModal');
	btnCerrarModal = $('#btnCerrarModal');
	tablaPerfil = $('#tablaPerfil');
	dataTablePerfil = $('#dataTablePerfil');	
	tree = $("#tree");
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
	
	form_perfilModal.modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
	
	form_perfilModal.on('shown.bs.modal', function () {
	  identificadorModal.trigger('focus');
	})
	
    btnLimpiar.on("click", function(e) {
		limpiar();
	});
    
    btnNuevo.on("click", function() {
		form_validado_perfil.removeClass('was-validated'); 
    	cargarModalPerfil(null, Opcion.NUEVO);
	});
		
	btnGrabarModal.on("click", function(e) {
		e.preventDefault();
        if (form_validado_perfil[0].checkValidity() === false) {
            e.stopPropagation();
        }else{
        	registrarPerfil();
        }
    	form_validado_perfil.addClass('was-validated');
	});
	
	btnCerrarModal.on("click", function(e) {
		form_perfilModal.modal('hide');//ocultamos el modal
	});

}

function inicializarTabla(){
	
	dataTablePerfil = tablaPerfil.DataTable({
        "ajax": {
			// se pasa la data de esta forma para poder reinicializar luego sólo la llamada ajax sin tener que dibujar de nuevo toda la tabla
			data: function ( d ) {
				d.datoBuscar = campoBuscar.val().trim();
		    },
            url: '/appkahaxi/listarPerfiles/',
                dataSrc: function (json) {
				console.log("listarPerfiles...success");
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
                    "width": "35px",
                    "targets": [1],
                    "data": "idPerfil",
					"visible": false
                },
				{
                    "width": "35px",
                    "targets": [2],
                    "data": "identificador"
                },				
                {
                    "width": "35px",
                    "targets": [3],
                    "data": "codigoUsuarioRegistra"
                },
				{
                    "width": "35px",
                    "targets": [4],
                    "data": "fechaRegistro"
                },
				{
                    "width": "3px",
                    "targets": [5],
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
                    "targets": [6],
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
	
	
	$('#tablaPerfil tbody').on( 'click','.btn-view', function () {
	    var data = dataTablePerfil.row( $(this).closest('tr')).data();	    
		console.log('ver perfil--->' + data.idPerfil);
		cargarPerfil(data.idPerfil, Opcion.VER);
	});
	
	$('#tablaPerfil tbody').on( 'click','.btn-edit', function () {
	    var data = dataTablePerfil.row( $(this).closest('tr')).data();
		console.log('editar perfil--->' + data.idPerfil);
		cargarPerfil(data.idPerfil, Opcion.MODIFICAR);
	});
	
}


function buscarOpciones(etiqueta, opcion) {
	var idPerfil = 0;
	
	if (idPerfilModal.html() != ''){
		idPerfil = idPerfilModal.html();
	}
	
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
				console.log(listaOpciones);			
		        crearTreeView(etiqueta, listaOpciones, opcion);
				
				$(etiqueta).off();		       
				$(etiqueta).on('click','.toggle', ocultarRama);				
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


/**************** FUNCIONES DE SOPORTE ***********************************************************
 *************************************************************************************************/

function campoBuscarKeyUp(){
	var datoBuscar = campoBuscar.val().trim();
	buscar();
}

function buscar(){
	var form1 = formPerfil;

	if ( $.fn.dataTable.isDataTable(tablaPerfil)) {
		dataTablePerfil.clear(); // usamos esta instrucción para limpiar la tabla sin que haya parpadeo
		dataTablePerfil.ajax.reload(null, true);
	}
	form1.addClass('was-validated');
}

function cargarModalPerfil(perfil, opcion){		
		tree.find(".treeview").remove();
		
		if(opcion == Opcion.NUEVO){
			console.log("cargarModalPerfil---> NUEVO");
			idPerfilModal.text(CADENA_VACIA);		
			identificadorModal.val(CADENA_VACIA);
	        activoModal.prop('checked', true);		
			titulo.text(DescripcionOpcion.DES_NUEVO);
			
			habilitarControl(identificadorModal);
			habilitarControl(activoModal);
			habilitarControl(tree);
			habilitarControl(btnGrabarModal);
			mostrarControl(btnGrabarModal);			
			buscarOpciones(tree, Opcion.NUEVO);
		}
		
		if(opcion == Opcion.MODIFICAR || opcion == Opcion.VER){
			// cargando valores			
			idPerfilModal.text(perfil.idPerfil);
			identificadorModal.val(perfil.identificador);
	        if(perfil.activo == 1){
				activoModal.prop('checked', true);
			}
			else{
				activoModal.prop('checked', false);
			}
							
			if(opcion == Opcion.VER){
				titulo.text(DescripcionOpcion.DES_VER);
				deshabilitarControl(idPerfilModal);
				deshabilitarControl(identificadorModal);
				deshabilitarControl(activoModal);
				deshabilitarControl(tree);
				ocultarControl(btnGrabarModal);
				
				buscarOpciones(tree, Opcion.VER);
			}
			
			if(opcion == Opcion.MODIFICAR){				
				titulo.text(DescripcionOpcion.DES_MODIFICAR);
				habilitarControl(idPerfilModal);
				habilitarControl(identificadorModal);
				habilitarControl(activoModal);
				habilitarControl(tree);
				mostrarControl(btnGrabarModal);
				
				buscarOpciones(tree, Opcion.MODIFICAR);
			}
			
		}
				
	    // mostrando modal
	    mostrarModal(form_perfilModal);
}

function cargarPerfil(idPerfil, opcion){
	
	$.ajax({
        type:"Get",
        contentType : "application/json",
        accept: 'text/plain',
        url : '/appkahaxi/buscarPerfil/' + idPerfil, 
        data : null,
        dataType: 'text',
        beforeSend: function(xhr) {
        	loadding(true);
        },
        success:function(result,textStatus,xhr){			
			if(xhr.status == HttpStatus.OK){
                var data = JSON.parse(result);
                cargarModalPerfil(data, opcion);
            }
			loadding(false);			
        }

    });
}

function obtenerListaMenu(){
	var listaMenu = '';			
	var treeview = jQuery("body").find('.treeview');				
	var checkboxes = $(treeview).find('input');
	var idElement;
	
	for (i = 0; i < checkboxes.length; i++){
		if(checkboxes[i].type == "checkbox"){	
			idElement = checkboxes[i].id;
			if($('#'+idElement).prop("checked")){				
				listaMenu = listaMenu + idElement.substr(5) + ",";
			}
		}
	}
	
	//console.log("listaMenu:" + listaMenu);
	return listaMenu;
}

function registrarPerfil(){
	var id;
	var activo;
	var listaMenu;			
	
	listaMenu = obtenerListaMenu();
	
	if (listaMenu == CADENA_VACIA){
		mostrarDialogoInformacion('Debe seleccionar al menos una opción del menú.', Boton.WARNING, tree, null);
		return false;
	}
	
	activo = (activoModal.is(':checked')) ? 1 : 0;
	id = (idPerfilModal.text() == CADENA_VACIA) ? 0 : idPerfilModal.text();
	
	var objetoJson = {
		idPerfil		: id,
		identificador	: identificadorModal.val().trim(),
		activo			: activo,
		menu			: listaMenu
	};

	var entityJsonStr = JSON.stringify(objetoJson);
	console.log("entityJsonStr:" + entityJsonStr);
	var formData = new FormData();

	formData.append('registro', new Blob([entityJsonStr], {
		type: "application/json"
	}));

	$.ajax({
		type:"POST",
		contentType: false,
		processData: false,
		url : '/appkahaxi/registrarPerfil/',
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
				mostrarMensajeValidacion(resultado, idPerfilModal);
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
	buscar();
	campoBuscar.focus();
}



/**************************** TREEVIEW ***********************************************************
 *************************************************************************************************/
	
    function crearTreeView(etiqueta,listaOpciones,opcion){
		var idOpcion='Lista0';
        $(etiqueta).append("<ul id='"+idOpcion+"' class='treeview'></ul>");
		
      	buscarHijos(idOpcion,listaOpciones,opcion);
    }

    function buscarHijos(etiqueta,data,opcion,idPadre){
        for(var nodo of data){
			if (idPadre > 0){
				if(nodo.idPadre == idPadre){
					esPadre(etiqueta,nodo,opcion,data);
				}
			}
			else{
				if (nodo.nivel == 0){
					esPadre(etiqueta,nodo,opcion,data);
				}
			}
        }
    }

    function esPadre(etiqueta,nodo,opcion,opciones){
        if(!nodo.have_children){
	    	crearHijo(etiqueta,nodo,opcion);
        }else{
            crearPadre(etiqueta,nodo,opcion);
            var idetiqueta="Lista"+nodo.id;
            buscarHijos(idetiqueta,opciones,opcion,nodo.id);
        }
    }

    function crearPadre(etiqueta,opcion,param){
        var idOpcion="Lista"+opcion.id;
        var idCheck="Check"+opcion.id;
		
		console.log(param);
		var habilita = (param == Opcion.VER) ? 'disabled = "disabled"' : CADENA_VACIA;
		var checked = (opcion.check == 1) ? 'checked = "checked"' : CADENA_VACIA;
		
		$("#"+etiqueta).append("<li><span attr-data='"+opcion.id+"' style='margin-left: -15px;color:#5990e0;margin-right:25px;cursor: pointer;' class='toggle' attr-opcion='plus'><span class='icon"+opcion.id+"'><i class=\"far fa-plus-square\"></i></span></span><input "+ habilita +" type='checkbox' "+ checked +" class='form-check-input my-n1' id='"+idCheck+"' onclick='checkboxParent(this);'><label for='"+idCheck+"' class='label'>"+opcion.descripcion+"</label><ul id='"+idOpcion+"'></ul></li>");
        $("#"+idOpcion).hide("fast");
    }

    function crearHijo(etiqueta,opcion,param){
        var idCheck="Check"+opcion.id;
        var habilita = (param == Opcion.VER) ? 'disabled = "disabled"' : CADENA_VACIA;
		var checked = (opcion.check == 1) ? 'checked = "checked"' : CADENA_VACIA;
		
		$("#"+etiqueta).append("<li style='margin-left: 20px'><input "+ habilita +" type='checkbox' "+ checked +" class='form-check-input my-n1' id='"+idCheck+"'  onclick='checkboxChild(this);'><label for='"+idCheck+"' class='label'>"+opcion.descripcion+"</label></li>");
    }
		
	function checkboxParent(id){	
        var checked = $(id).prop("checked");		
		var padre = id.parentNode;
		var id;
				
		var checkboxes = $(padre).find('input');//obtenemos todos los controles del tipo Input
		
		for (i = 0; i < checkboxes.length; i++){ //recorremos todos los controles
			
			id = $(checkboxes[i]).attr('id');
			if(checkboxes[i].type == "checkbox"){ //solo si es un checkbox entramos			
				if(checked){
					$("#"+id).prop("checked", true);
				}
				else{
					$("#"+id).prop("checked", false);
				}			  	
			}
		}		
    }

function checkboxChild(id){
		//console.log("check child:" + id)
		var cant=0;
        var check = $(id).prop("checked");		
		var principal = id.parentNode.parentNode.parentNode;
		var padre = $(principal).children("input[type='checkbox']:first");
		var idPadre = padre.attr('id');
		
		var checkboxes = $(id.parentNode.parentNode).find('input');
		var cantHijos=checkboxes.length;
				
		if(check){
			$("#"+idPadre).prop('checked',true);
		}
		else{
			for (i = 0; i < cantHijos; i++){
				idHijo = $(checkboxes[i]).attr('id');
				if( $("#" + idHijo).prop("checked") == true){
					cant=cant+1;
				}
			}
			
			if(cant == 0){
				$("#"+idPadre).prop("checked", false);
			}		
		}
}
	
function ocultarRama(){
        var $this=$(this);
        
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


