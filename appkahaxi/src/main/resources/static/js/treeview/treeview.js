var urlConstante=window.location.origin;
$(function() {
    var HttpCodes = {
        success  : 200,
        notFound : 404,
        created  : 201
    };
    var listaOpcionespoPerfil;
    $.fn.treeview=function(data){
        this.each(function(){
            $(this).empty();
            extraerInformacion(this,data);
        });
    };

    $.fn.treedata=function(){
        var lista = new Array();
        this.each(function() {
            $(this).find('input[type="checkbox"]:checked').each(function (data) {
                var id = $(this).attr("id").substring(5, $(this).attr("id").length);
                lista.push(id)
            });
        });
        return lista;
    };

    function extraerInformacion(etiqueta,data){
        var token = $('#_csrf').attr('content');
        var header = $('#_csrf_header').attr('content');
        $.ajax({
            type:"GET",
            contentType : "application/json",
            accept: 'text/plain',
            url : data.url,
            data : null,
            dataType: 'text',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success:function(result,textStatus,xhr){
                if(xhr.status==HttpCodes.success){
                    var listaOpciones=JSON.parse(result);
                    listaOpcionespoPerfil=listaOpciones;
                    crearTreeView(etiqueta,listaOpciones,data.tipo);
                    $(etiqueta).off();
                    if(data.tipo=='checked'){
                        $(etiqueta).on('change',' input[type="checkbox"]', checkboxChanged);
                    }else{
                        $(etiqueta).on('click',' .dataOpcion',informacionOpciones);
                    }
                    $(etiqueta).on('click','.toggle', ocultarRama);
                }
            }
        });
    }
    function crearTreeView(etiqueta,listaOpciones,tipo){
        var idOpcion='Lista0';
        $(etiqueta).append("<ul id='"+idOpcion+"' class='treeview'></ul>");
        buscarHijos(idOpcion,listaOpciones,tipo);
    }

    function buscarHijos(etiqueta,data,tipo){
        for(var nodo of data){
            esPadre(etiqueta,nodo,tipo);
        }
    }
    function esPadre(etiqueta,nodo,tipo){
        if(!nodo.havechildren){
            crearHijo(etiqueta,nodo,tipo);
        }else{
            crearPadre(etiqueta,nodo,tipo);
            var idetiqueta="Lista"+nodo.id;
            buscarHijos(idetiqueta,nodo.children,tipo);
        }
    }


    function crearPadre(etiqueta,opcion,tipo){
        var idOpcion="Lista"+opcion.id;
        var idCheck="Check"+opcion.id;
        console.log("etiqueta padre",etiqueta);
        var checked="";
        console.log(tipo);
        if(tipo =='checked'){
            if(opcion.seleccionado){
                checked ="checked";
            }

            $("#"+etiqueta).append("<li><span attr-data='"+opcion.id+"' style='margin-left: -18px;color:#5990e0;margin-right:5px;cursor: pointer;' class='toggle' attr-opcion='rest'><span class='icon"+opcion.id+"'><i class=\"fas fa-minus\"></i></span></span><input type='checkbox' "+checked+" class='form-check-input' id='"+idCheck+"'><label for='"+idCheck+"'  class='form-check-label'><span class='hoverSeleccion'><span style='color:#5990e0;margin-right:5px; '><i class='fas fa-folder'></i></span>"+opcion.text+"</span></label><ul id='"+idOpcion+"'></ul></li>");
        }
        else{
            $("#"+etiqueta).append("<li><span attr-data='"+opcion.id+"' style='margin-left: -18px;color:#5990e0;margin-right:5px;cursor: pointer;' class='toggle' attr-opcion='rest'><span class='icon"+opcion.id+"'><i class=\"fas fa-minus\"></i></i></span></span><label for='"+idCheck+"' class='form-check-label' ><span class='dataOpcion hoverSeleccion' attr-data='"+opcion.id+"' style='cursor: pointer'><span style='color:#5990e0;margin-right:5px; '><i class='fas fa-folder'></i></span>"+opcion.text+"</span></label><ul id='"+idOpcion+"'></ul></li>");
        }
        $("#"+idOpcion).hide("slow");
    }
    function crearHijo(etiqueta,opcion,tipo){
        //console.log("etiqueta hijo",etiqueta);
        var idCheck="Check"+opcion.id;
        var checked="";
        console.log(tipo);
        if(tipo =='checked'){
            if(opcion.seleccionado){
                checked ="checked";
            }
            $("#"+etiqueta).append("<li><input type='checkbox' "+checked+" class='form-check-input' id='"+idCheck+"'><label for='"+idCheck+"' class='form-check-label'><span class='hoverSeleccion'><span style='color:#5990e0;margin-right:5px; '><i class=\"far fa-file-alt\"></i></span>"+opcion.text+"</span></label></li>");
        }
        else{
            $("#"+etiqueta).append("<li><label class='form-check-label' ><span class='dataOpcion hoverSeleccion' attr-data='"+opcion.id+"' style='cursor: pointer'><span style='color:#5990e0;margin-right:5px;' ><i class=\"far fa-file-alt\"></i></span>"+opcion.text+"</span></label></li>");
        }
    }
    var i=0;
    function checkboxChanged() {
        var $this = $(this),
            checked = $this.prop("checked"),
            container = $this.parent(),
            siblings = container.siblings();

        container.find('input[type="checkbox"]')
            .prop({
                checked: checked
            })
            .siblings('label');

        checkSiblings(container, checked);
    }

    function checkSiblings($el, checked) {
        var parent = $el.parent().parent(),
            all = true,
            indeterminate = false;

        $el.siblings().each(function() {
            return all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
        });

        if (all && checked) {
            parent.children('input[type="checkbox"]')
                .prop({
                    checked: checked
                })
                .siblings('label');

            checkSiblings(parent, checked);
        }
        else if (all && !checked) {
            parent.children('input[type="checkbox"]')
                .prop("checked", checked)
                .siblings('label');
            console.log()
            checkSiblings(parent, checked);
        }
        else {
            $el.parents("li").children('input[type="checkbox"]')
                .prop({
                    checked: true
                })
                .siblings('label');
        }
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
    function informacionOpciones(){
        console.log("entro");
        var url=urlConstante+"/appseguridad/";
        var idOpcion=$(this).attr("attr-data");
        var token = $('#_csrf').attr('content');
        var header = $('#_csrf_header').attr('content');
        var $this=this;
        $.ajax({
            type:"GET",
            contentType : "application/json",
            accept: 'text/plain',
            url : url+'opciones/'+idOpcion,
            data : null,
            dataType: 'text',
            beforeSend: function(xhr) {
                xhr.setRequestHeader(header, token);
            },
            success:function(result,textStatus,xhr){
                if(xhr.status==HttpCodes.success){
                    var Opcion=JSON.parse(result);
                    $(".treeview").find("span").removeClass("seleccionado");
                    $($this).addClass("seleccionado");
                    $("#opcion_descripcion").html(Opcion.txtDescripcion);
                    $("#opcion_Nivel").html(Opcion.numNivel);
                    $("#opcion_fechaInicio").html(Opcion.fecInicio);
                    $("#opcion_fechaFin").html(Opcion.fecFin);
                    $("#opcion_Orden").html(Opcion.numOrden);
                    $("#opcion_url").html("URL: "+Opcion.txtUrl);
                    $("#opcion_codigo").html(Opcion.idOpciones);
                    $("#opcion_id").val(Opcion.idOpciones);
                    $("#opcion_numnivel").val(Opcion.numNivel);
                }
            }
        });
    }

});