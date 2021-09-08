package pe.gob.repuestera.util;

public class Constante {
	
	public static final String USUARIO = "usuario";
	
	/* VALORES PARA LA TABLA DE CATÁLOGOS */
	public static final String CATALOGO_MARCA_ARTICULO  	= "01";
	public static final String CATALOGO_TIPO 				= "02";
	public static final String CATALOGO_SECCION 			= "03";
	public static final String CATALOGO_UND_MEDIDA 			= "04";
	public static final String CATALOGO_MARCA_VEHICULO		= "05";
	public static final String CATALOGO_MODELO 				= "06";
	public static final String CATALOGO_MOTOR 				= "07";
	public static final String CATALOGO_APLICACION			= "08";	
	public static final String CATALOGO_ESTADO_COTI			= "11";
	public static final String CATALOGO_ESTADO_DOC			= "12";
	public static final String CATALOGO_ESTADO_PAGO			= "33";
	public static final String CATALOGO_COMPROBANTE_PAGO	= "34";
	public static final String CATALOGO_CONDICION_PAGO		= "20";
	public static final String CATALOGO_DIAS_PC				= "21";
	public static final String CATALOGO_MONEDA 				= "22";
	public static final String CATALOGO_TIPO_SN 			= "23";
	public static final String CATALOGO_TIPO_PERSONA 		= "24";
	public static final String CATALOGO_TIPO_DOC_IDENT 		= "25";	
	public static final String CATALOGO_TIPO_OPE_INV 		= "26";
	public static final String CATALOGO_TIPO_DOC_SYSTEM		= "27";
	public static final String CATALOGO_TIPO_DOC_SUNAT 		= "28";	
	public static final String CATALOGO_IGV 				= "31";
	public static final String CATALOGO_MOTIVO_TRASLADO		= "32";
	
	/* VALORES PARA LA TABLA SOCIOS DE NEGOCIO */
	public static final String COD_TIPO_SOCIO_CLIENTE  	= "01";
	public static final String COD_TIPO_SOCIO_PROVEEDOR = "02";
	
	
	/*** VALORES PARA LAS PÁGINAS HTML ***/
	/* GENERAL */
	public static final String PAGINA_LOGIN = "login";
	public static final String PAGINA_PRINCIPAL = "paginas/principal";
	public static final String PAGINA_ERROR = "paginas/error/error";
	public static final String PAGINA_ACCESS_DENIED = "paginas/error/access-denied";
	/* COMPRAS */
	public static final String PAGINA_NUEVA_ORDEN_COMPRA = "paginas/compras/ordencompra/nueva-orden-compra";
	public static final String PAGINA_MANTENIMIENTO_ORDEN_COMPRA = "paginas/compras/ordencompra/mantenimiento-orden-compra";
	/* MAESTROS */
	public static final String PAGINA_BUSCAR_ARTICULOS = "paginas/maestros/buscar-articulos";
	public static final String PAGINA_MANTENIMIENTO_USUARIOS = "paginas/maestros/mantenimiento-usuario";
	public static final String PAGINA_BUSCAR_CLIENTE = "paginas/maestros/mantenimiento-socio-negocio";
	public static final String PAGINA_NUEVO_CLIENTE = "paginas/maestros/nuevo-socio-negocio";
	public static final String PAGINA_BUSCAR_PROVEEDOR = "paginas/maestros/mantenimiento-proveedor";
	public static final String PAGINA_NUEVO_PROVEEDOR = "paginas/maestros/nuevo-proveedor";
	public static final String PAGINA_PARAMETROS_GENERALES = "paginas/maestros/buscar-parametros-generales";
	public static final String PAGINA_MANTENIMIENTO_PERFILES = "paginas/maestros/mantenimiento-perfil";
	/* CATALOGOS */
	public static final String PAGINA_BUSCAR_IGV = "paginas/maestros/buscar-igv";
	public static final String PAGINA_MANTENIMIENTO_DATA_CATALOGO = "paginas/maestros/mantenimiento-data-catalogo";
	public static final String PAGINA_MANTENIMIENTO_CATALOGO_DEPENDIENTE = "paginas/maestros/mantenimiento-catalogo-dependiente";
	/* VENTAS */
	public static final String PAGINA_MANTENIMIENTO_COTIZACION = "paginas/ventas/cotizacion/mantenimiento-cotizacion";
	public static final String PAGINA_NUEVA_COTIZACION = "paginas/ventas/cotizacion/nueva-cotizacion";
	public static final String PAGINA_NUEVA_ORDEN_VENTA = "paginas/ventas/cotizacion/nueva-orden-venta";
	/* GUIA REMISION */
	public static final String PAGINA_CARGAR_GUIA_REMISION_COMPRA = "paginas/compras/guiaremision/cargar-guia-remision";
	public static final String PAGINA_MANTENIMIENTO_GUIA_REMISION_COMPRA = "paginas/compras/guiaremision/mantenimiento-guia-remision";
	/* COMPROBANTE PAGO */
	public static final String PAGINA_NUEVA_FACTURA_COMPRA_DIRECTA = "paginas/compras/factura/nueva-factura-directa";
	public static final String PAGINA_NUEVA_FACTURA_COMPRA_ASOCIADA = "paginas/compras/factura/nueva-factura-asociada";
	public static final String PAGINA_MANTENIMIENTO_FACTURA_COMPRA = "paginas/compras/factura/mantenimiento-factura";
	/* REPORTES */
	public static final String PAGINA_REPORTE_COMPRAS = "paginas/reportes/reporte-compras";
	public static final String PAGINA_REPORTE_VENTAS = "paginas/reportes/reporte-ventas";
	public static final String PAGINA_REPORTE_ANALISIS_VENTAS = "paginas/reportes/reporte-analisis-ventas";
	public static final String PAGINA_REPORTE_KARDEX = "paginas/reportes/reporte-kardex";
	public static final String PAGINA_REPORTE_INVENTARIO = "paginas/reportes/reporte-inventario";	
	public static final String PAGINA_REPORTE_ANULADOS = "paginas/reportes/reporte-anulados";	
	
	
	/*** VALORES PARA CONTROL DE FLUJO DENTRO DE LOS CONTROLLERS ***/
	/* RESULTADOS */
	public static final String RESULTADO_EXITOSO 		= "1";
	public static final String RESULTADO_ALTERNATIVO 	= "2";
	
	public static final String EDITAR_SI 		= "1";
	public static final String EDITAR_NO 		= "0";
	
	public static final String ENVIAR_CODIGO 	= "true";
	
	/* PARAMETROS PARA INVOCAR A LOS SP */
	public static final String PARAM_SP_ID_DATA_CATALOGO 		= "ID_DATA_CATALOGO";
	public static final String PARAM_SP_COD_MAESTRO 			= "COD_MAESTRO";
	public static final String PARAM_SP_COD_DATA 				= "COD_DATA";
	public static final String PARAM_SP_DESC_DATA 				= "DESC_DATA";
	public static final String PARAM_SP_COD_CATALOGO_PADRE 		= "COD_CATALOGO_PADRE";
	public static final String PARAM_SP_COD_DATA_PADRE 			= "COD_DATA_PADRE";
	public static final String PARAM_SP_COD_PADRE 				= "COD_PADRE";
	public static final String PARAM_SP_FLG_SUNAT				= "FLAG_SUNAT";
	public static final String PARAM_SP_ACTIVO					= "ACTIVO";
	public static final String PARAM_SP_COD_USU_REGISTRA		= "COD_USU_REGISTRA";
	public static final String PARAM_SP_COD_USU_MODIFICA		= "COD_USU_MODIFICA";	
	public static final String PARAM_SP_USERNAME 				= "USERNAME";
	public static final String PARAM_SP_NRO_DOCUMENTO			= "NRO_DOCUMENTO";
	public static final String PARAM_SP_NRO_GUIA_REMISION   	= "NRO_GUIA_REMISION";
	public static final String PARAM_SP_NRO_COMPROBANTE_PAGO   	= "NRO_COMPROBANTE_PAGO";
    public static final String PARAM_SP_COD_CLIENTE	 			= "COD_CLIENTE";
	public static final String PARAM_SP_SERIE	 				= "SERIE";
	public static final String PARAM_SP_CORRELATIVO	 			= "CORRELATIVO";
	public static final String PARAM_SP_NRO_ORDEN_COMPRA		= "NRO_ORDEN_COMPRA";
	public static final String PARAM_SP_FEC_DOCUMENTO	 		= "FEC_DOCUMENTO";
    public static final String PARAM_SP_USUARIO					= "USUARIO";
    public static final String PARAM_SP_DATO_BUSCAR				= "DATO_BUSCAR";
    public static final String PARAM_SP_FEC_CONTABILIZACION		= "FEC_CONTABILIZACION";
    public static final String PARAM_SP_FEC_VALIDO_HASTA		= "FEC_VALIDO_HASTA";
	public static final String PARAM_SP_FEC_ENTREGA				= "FEC_ENTREGA";
	public static final String PARAM_SP_FEC_VENCIMIENTO			= "FEC_VENCIMIENTO";
    public static final String PARAM_SP_FEC_DESDE				= "FEC_DESDE";
    public static final String PARAM_SP_FEC_HASTA				= "FEC_HASTA";
    public static final String PARAM_SP_COD_TIPO_MONEDA			= "COD_TIPO_MONEDA";
    public static final String PARAM_SP_COD_COND_PAGO			= "COD_COND_PAGO";
    public static final String PARAM_SP_COD_DIAS				= "COD_DIAS";
    public static final String PARAM_SP_COD_ESTADO				= "COD_ESTADO";
	public static final String PARAM_SP_COD_ESTADO_PAGO			= "COD_ESTADO_PAGO";
	public static final String PARAM_SP_COD_MOTIVO_TRASLADO		= "COD_MOTIVO_TRASLADO";
	public static final String PARAM_SP_NRO_REQUERIMIENTO		= "NRO_REQUERIMIENTO";
	public static final String PARAM_SP_COD_REPUESTO			= "COD_REPUESTO";
    public static final String PARAM_SP_ASUNTO					= "ASUNTO";
    public static final String PARAM_SP_TIPO_CAMBIO				= "TIPO_CAMBIO";
    public static final String PARAM_SP_OBSERVACIONES			= "OBSERVACIONES";
    public static final String PARAM_SP_NRO_DOCUMENTO_REF		= "NRO_DOCUMENTO_REF";
    public static final String PARAM_SP_PORC_DCTO_TOTAL			= "PORC_DCTO_TOTAL";
    public static final String PARAM_SP_SUB_TOTAL				= "SUB_TOTAL";
    public static final String PARAM_SP_DCTO          			= "DCTO";
    public static final String PARAM_SP_IGV						= "IGV";
    public static final String PARAM_SP_TOTAL					= "TOTAL";
    public static final String PARAM_SP_USUARIO_REGISTRA		= "USUARIO_REGISTRA";
    public static final String PARAM_SP_USUARIO_MODIFICA		= "USUARIO_MODIFICA";
    public static final String PARAM_SP_CANTIDAD				= "CANTIDAD";
    public static final String PARAM_SP_PRECIO_UNITARIO			= "PRECIO_UNITARIO";
    public static final String PARAM_SP_PORC_DCTO				= "PORC_DCTO";
    public static final String PARAM_SP_PRECIO_CON_DCTO			= "PRECIO_CON_DCTO";
    public static final String PARAM_SP_DATA_JSON				= "DATA_JSON";
    
    public static final String PARAM_SP_COD_ESTANDAR		= "COD_ESTANDAR";
    public static final String PARAM_SP_COD_ANTIGUO			= "COD_ANTIGUO";
    public static final String PARAM_SP_COD_BARRAS			= "COD_BARRAS";  
    public static final String PARAM_SP_COD_MARCA_VEHICULO	= "COD_MARCA_VEHICULO";
    public static final String PARAM_SP_COD_MODELO			= "COD_MODELO";
    public static final String PARAM_SP_COD_MOTOR			= "COD_MOTOR";
    public static final String PARAM_SP_COD_APLICACION		= "COD_APLICACION";
    public static final String PARAM_SP_IMAGEN				= "IMAGEN";
    
    public static final String PARAM_SP_TIPO_SN				= "TIPO_SN";    
    public static final String PARAM_SP_DIA 				= "DIA";
    public static final String PARAM_SP_MES 				= "MES";
    public static final String PARAM_SP_ANIO 				= "ANIO";
    public static final String PARAM_SP_TC 					= "TC";    
    public static final String PARAM_SP_COD_ARTICULO		= "COD_ARTICULO";
    public static final String PARAM_SP_DESCRIPCION			= "DESCRIPCION";
    public static final String PARAM_SP_COD_MARCA_ARTICULO	= "COD_MARCA_ARTICULO";
    public static final String PARAM_SP_COD_TIPO			= "COD_TIPO";
    public static final String PARAM_SP_COD_SECCION			= "COD_SECCION";
    public static final String PARAM_SP_COD_UND_MEDIDA		= "COD_UND_MEDIDA";
    public static final String PARAM_SP_ID_ARTICULO			= "ID_ARTICULO";
    public static final String PARAM_SP_ARTICULO			= "ARTICULO";	
	public static final String PARAM_SP_PREFIJO 			= "PREFIJO";
	public static final String PARAM_ID_COTIZACION 			= "ID_COTIZACION";	
	public static final String PARAM_SP_DATO_CLIENTE 		= "DATO_CLIENTE";
	public static final String PARAM_SP_TIPO_PERSONA		= "TIPO_PERSONA"; 
	public static final String PARAM_SP_TIPO_DOCUMENTO		= "TIPO_DOCUMENTO"; 
	public static final String PARAM_SP_COD_DEPARTAMENTO	= "COD_DEPARTAMENTO"; 
	public static final String PARAM_SP_COD_PROVINCIA		= "COD_PROVINCIA"; 
		
	public static final String PARAM_SP_COD_SOCIONEGOCIO	= "COD_SN"; 
	public static final String PARAM_SP_COD_TIPO_SOCIO		= "COD_TIPO_SN"; 
	public static final String PARAM_SP_COD_TIPO_DOCUMENTO	= "COD_TIPO_DOCUMENTO"; 
	public static final String PARAM_SP_COD_TIPO_PERSONA	= "COD_TIPO_PERSONA"; 
	public static final String PARAM_SP_RAZON_SOCIAL		= "RAZON_SOCIAL"; 
	public static final String PARAM_SP_NOMBRES				= "NOMBRES"; 
	public static final String PARAM_SP_APELLIDO_PATERNO	= "APELLIDO_PATERNO"; 
	public static final String PARAM_SP_APELLIDO_MATERNO	= "APELLIDO_MATERNO"; 
	public static final String PARAM_SP_DIRECCION_FISCAL	= "DIRECCION_FISCAL"; 
	public static final String PARAM_SP_DIRECCION_DESPACHO1	= "DIRECCION_DESPACHO1"; 
	public static final String PARAM_SP_DIRECCION_DESPACHO2	= "DIRECCION_DESPACHO2"; 
	public static final String PARAM_SP_DIRECCION_DESPACHO3	= "DIRECCION_DESPACHO3"; 
	public static final String PARAM_SP_DIRECCION_DESPACHO4	= "DIRECCION_DESPACHO4"; 
	public static final String PARAM_SP_DIRECCION_DESPACHO5	= "DIRECCION_DESPACHO5"; 
	public static final String PARAM_SP_CONTACTO			= "COD_CONTACTO"; 
	public static final String PARAM_SP_EMAIL				= "EMAIL"; 
	public static final String PARAM_SP_CELULAR				= "CELULAR"; 
	public static final String PARAM_SP_TELEFONO_FIJO		= "TELEFONO_FIJO"; 
	public static final String PARAM_SP_COD_PAIS			= "COD_PAIS"; 
	public static final String PARAM_SP_COD_DISTRITO		= "COD_DISTRITO"; 
	public static final String PARAM_SP_UBIGEO				= "UBIGEO";
	public static final String PARAM_SP_VENDEDOR			= "VENDEDOR"; 
	public static final String PARAM_SP_COMENTARIOS			= "COMENTARIOS"; 
	public static final String PARAM_SP_COD_CONDICION_PAGO	= "COD_CONDICION_PAGO"; 
	public static final String PARAM_SP_LISTA_PRECIOS		= "LISTA_PRECIOS"; 
	public static final String PARAM_SP_COD_MONEDA			= "COD_MONEDA";	
	public static final String PARAM_SP_COD_PARAMETRO		= "COD_PARAMETRO";	
	public static final String PARAM_SP_VALOR				= "VALOR";	
	public static final String PARAM_SP_ID_PERFIL			= "ID_PERFIL";
	public static final String PARAM_SP_IDENTIFICADOR		= "IDENTIFICADOR";
	public static final String PARAM_SP_MENU				= "MENU";
	public static final String PARAM_SP_PASSWORD 			= "PASSWORD";
	public static final String PARAM_SP_PERFILES			= "PERFILES";
	public static final String PARAM_SP_OPCION 				= "OPCION";
	public static final String PARAM_SP_FEC_INICIO			= "FEC_INICIO";
    public static final String PARAM_SP_FEC_FIN				= "FEC_FIN";
    public static final String PARAM_SP_COD_ALMACEN			= "COD_ALMACEN";	
    
	/* PARAMETROS DE RETORNO DE LOS SP */
	public static final String PARAM_FLAG_RESULTADO 	= "FLAG_RESULTADO";
	public static final String PARAM_MENSAJE_RESULTADO 	= "MENSAJE_RESULTADO";
	public static final String PARAM_LISTADO 			= "LISTADO";
	
	
	/* PARAMETROS DE ENTRADA PARA LOS MÉTODOS DE LOS CONTROLLER */
	public static final String PARAM_ID_ARTICULO = "idArticulo";
	public static final String PARAM_COD_CLIENTE = "codCliente";
	public static final String PARAM_COD_MAESTRO_CONTROLLER = "codMaestro";
	public static final String PARAM_COD_CATALOGO_PADRE_CONTROLLER = "codCatalogoPadre";
	public static final String PARAM_COD_DATA_PADRE_CONTROLLER = "codDataPadre";
	public static final String PARAM_COD_PADRE_CONTROLLER = "codPadre";
	public static final String PARAM_COD_MARCA_ARTICULO = "codMarcaArticulo";
	public static final String PARAM_COD_TIPO = "codTipo";
	public static final String PARAM_DES_TIPO = "desTipo";
	public static final String PARAM_COD_SECCION = "codSeccion";
	public static final String PARAM_COD_SOCIONEGOCIO = "codigoSocio";
	public static final String PARAM_COD_UND_MEDIDA = "codUndMedida";
	public static final String PARAM_COD_DEPARTAMENTO_CONTROLLER = "codDepartamento";
	public static final String PARAM_COD_PROVINCIA_CONTROLLER = "codProvincia";
	public static final String PARAM_ID_PERFIL = "idPerfil";
	public static final String PARAM_USERNAME = "username";
	
	/*public static final String PARAM_COD_MARCA_VEHICULO = "codMarcaVehiculo";
	public static final String PARAM_COD_MODELO = "codModelo";
	public static final String PARAM_COD_MOTOR = "codMotor";
	public static final String PARAM_COD_APLICACION = "codAplicacion";*/
	
	public static final String PARAM_COD_ARTICULO = "codArticulo";
	public static final String PARAM_COD_ALMACEN = "codAlmacen";
	public static final String PARAM_DES_ALMACEN = "desAlmacen";
	/*public static final String PARAM_CODIGO_ESTANDAR = "codigoEstandar";
	public static final String PARAM_CODIGO_ANTIGUO = "codigoAantiguo";*/
	public static final String PARAM_COD_BARRAS = "codBarras";
	public static final String PARAM_COD_MONEDA = "codMoneda";
	public static final String PARAM_COD_COND_PAGO = "codCondPago";
	public static final String PARAM_COD_ESTADO = "codEstado";
	public static final String PARAM_FECHA_DESDE = "fechaDesde";
	public static final String PARAM_FECHA_HASTA = "fechaHasta";
	public static final String PARAM_IGV = "igv";
	public static final String PARAM_ESTADO = "estadoParam";
	public static final String PARAM_VOLVER = "volver";
	public static final String PARAM_DESDE_OC = "desdeOC";
	public static final String PARAM_GUIAS = "guias";
	public static final String PARAM_FECHA_INICIO = "fechaInicio";
	public static final String PARAM_FECHA_FIN = "fechaFin";
	
	public static final String PARAM_DESCRIPCION = "descripcion";
	public static final String PARAM_MOTOR = "motor";
	public static final String PARAM_SECCION = "seccion";
	public static final String PARAM_UND_MEDIDA = "undMedida";
	public static final String PARAM_OBSERVACIONES = "observaciones";
	public static final String PARAM_IMAGEN = "imagen";
	public static final String PARAM_USUARIO = "usuario";
	public static final String PARAM_NRO_DOCUMENTO = "numeroDocumento";
	public static final String PARAM_ENVIAR_CODIGO = "enviarCodigo";	
	public static final String PARAM_EMAIL = "email";
	public static final String PARAM_DATO_BUSCAR = "datoBuscar";
	public static final String PARAM_NRO_COTIZACION = "nroCotizacion";
	public static final String PARAM_NRO_ORDEN_COMPRA = "nroOrdenCompra";
	public static final String PARAM_NRO_GUIA_REMISION = "nroGuiaRemision";
	public static final String PARAM_NRO_COMPROBANTE_PAGO = "nroComprobantePago";
	public static final String PARAM_NRO_REQUERIMIENTO = "nroRequerimiento";
	public static final String PARAM_COD_REPUESTO = "codRepuesto";
	public static final String PARAM_DATO_ORDEN_COMPRA = "codigoOrdenCompra";
	public static final String PARAM_DATO_GUIA_REMISION = "codigoGuiaRemision";
	public static final String PARAM_PREFIJO = "prefijo";
	public static final String PARAM_OPCION = "opcion";
	public static final String PARAM_TIPO_SN = "tipoSn";
	public static final String PARAM_DIA = "dia";
	public static final String PARAM_MES = "mes";
	public static final String PARAM_ANIO = "anio";
	public static final String PARAM_TIPO_PERSONA = "tipoPersona";
	public static final String PARAM_TIPO_DOCUMENTO = "tipoDoc";
	public static final String PARAM_TIPO_REPORTE = "tipoReporte";
	
	public static final String PARAM_DATO_CLIENTE = "datoCliente";
	public static final String PARAM_COD_DATA_CATALOGO = "codDataCatalogo";
	public static final String PARAM_TIPO_CATALOGO = "tipoCatalogo";
	
	/* NÚMEROS PARA USO GENERAL */
	public static final Integer CERO = 0;
	public static final Integer UNO = 1;
	public static final Integer DOS = 2;
		
	
	public static final String TITULO_NUEVO = "NUEVO";
	public static final String TITULO_NUEVA = "NUEVA";
	public static final String TITULO_EDITAR = "EDITAR";

	public static final String COD_ESTADO_GENERADO_GUIA_REMISION = "01";
	public static final String COD_ESTADO_CANCELADO_GUIA_REMISION = "02";

	public static final String ERROR_CONTROLADO_NO_EXISTEN_FACTURAS = "Aún no existen facturas asociadas.";
	

}