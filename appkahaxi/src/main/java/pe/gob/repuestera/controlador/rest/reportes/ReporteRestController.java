package pe.gob.repuestera.controlador.rest.reportes;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.GenericModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.service.maestros.ListaPrecioService;
import pe.gob.repuestera.service.reportes.ReporteService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.ConvertNumberLetter;

@RestController
public class ReporteRestController {

	private static final Logger logger = LogManager.getLogger(ReporteRestController.class);
	
	@Autowired
	ReporteService reporteService;
	@Autowired
	ListaPrecioService listaPrecioService;
	@Autowired
    HttpSession session;
		
	@PostMapping ("/reporteCotizacionesVenta/{numeroDocumento}/{enviarCodigo}")
    public void reporteCotizacionesVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, @PathVariable(Constante.PARAM_ENVIAR_CODIGO) String enviarCodigo, 
    									 HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteCotizacionesVenta.......");
    	logger.info("numeroDocumento--->" + numeroDocumento);            
    	logger.info("enviarCodigo--->" + enviarCodigo);      
    	
    	VentaCabModel cotizacionVentaCab = reporteService.obtenerCabeceraCotizacionVenta(numeroDocumento);
        List<HashMap> listaDetalleCotizacionVenta = reporteService.obtenerDetalleCotizacionVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
 		if(enviarCodigo.equals(Constante.ENVIAR_CODIGO)) {
 			nombreJrxml = "/reportes/ventas/cotizacion_ventas_con_codigo.jrxml";
 		}else {
 			nombreJrxml = "/reportes/ventas/cotizacion_ventas_sin_codigo.jrxml";
 		}
        
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("cotizacionVenta-").append(numeroDocumento).append(".pdf");
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", cotizacionVentaCab.getNombreCliente());
 		params.put("RUC", cotizacionVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", cotizacionVentaCab.getDireccionFiscal());
 		params.put("FECHA", cotizacionVentaCab.getFechaContabilizacion());
 		params.put("ASUNTO", cotizacionVentaCab.getAsunto());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(cotizacionVentaCab.getTotal().toString(), cotizacionVentaCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalleCotizacionVenta, "PDF", response);
     		
        logger.info("fin reporteCotizacionesVenta");
    }
	
	@PostMapping ("/enviarEmailReporteCotizacionesVenta")
    public void enviarEmailReporteCotizacionesVenta(@RequestPart("registro") GenericModel datos,
    												HttpServletResponse response) throws Exception{
		logger.info("entrando enviarEmailReporteCotizacionesVenta.......");
		String numeroDocumento = datos.getNumeroDocumento();
    	String email = datos.getEmail();
    	String enviarCodigo = datos.getEnviarCodigo();
    	logger.info("numeroDocumento--->" + numeroDocumento);            
		logger.info("email--->" + email);            
        logger.info("enviarCodigo--->" + enviarCodigo);            
    	
    	VentaCabModel cotizacionVentaCab = reporteService.obtenerCabeceraCotizacionVenta(numeroDocumento);
        List<HashMap> listaDetalleCotizacionVenta = reporteService.obtenerDetalleCotizacionVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
 		if(enviarCodigo.equals(Constante.ENVIAR_CODIGO)) {
 			nombreJrxml = "/reportes/ventas/cotizacion_ventas_con_codigo.jrxml";
 		}else {
 			nombreJrxml = "/reportes/ventas/cotizacion_ventas_sin_codigo.jrxml";
 		}
 		
 		String asunto = "COTIZACION - SOLICITUD DE CONFIRMACION DE CORREO";
	    String nombreUsuario = "XXX";
	    String mensaje = "<html><head><meta http-equiv=Content-Type content=text/html; charset=utf-8/></head><body><table align=center width=610 cellspacing=0 cellpadding=0 border=0 style='position:relative; font-size:12px; font-family:Arial, Helvetica, sans-serif; color: #00486A; background: #ffffff; border: solid 1px #bdcbcd; -moz-border-radius: 20px 20px 20px 20px; -ms-border-radius: 20px 20px 20px 20px; -webkit-border-radius: 20px 20px 20px 20px; border-radius: 20px 20px 20px 20px; padding:5px;''>"
	                    + "<tbody><tr><td align=center bgcolor=#ffffff><img width=220 height=60 src='cid:logo_kahaxi.png'/> "
	                    + "</td><td align=center bgcolor=#ffffff style='text-align: left; font-size:18px; padding-left:20px; color:#121D89;''><br>KAHAXI EIRL</td>"
	                    + "</tr><tr><td valign=middle align=center colspan=2>"
	                    + "<br><br><p style='text-align: left; font-size:14px; padding-left:20px; color:#121D89;'>Estimado(a) <b> "+ nombreUsuario +" </b>, <br/><br/>"
	                    + "Si has recibido un mensaje de este tipo, significa que te hemos enviado una cotizaci?n.<br/><br/>"
	                    + "</p>"
	                    + "<p style='text-align: left; font-size:14px; padding-left:20px; color:#0A0203;''>Atentamente,<br>"+"KAHAXI"
	                    + "<br></p><p style='text-align: left; font-size:10px; padding-left:20px; color:#DF0101;''>"
	                    + "'Esta notificaci?n ha sido enviada autom?ticamente. Por favor, no responda este correo.'</b></p><br/>"
	                    + "</td></tr><tr></tr><tr><td valign=middle height=50 bgcolor=#404040 align=center style='font-size:11px; -moz-border-radius: 0px 0px 20px 20px; -ms-border-radius: 0px 0px 20px 20px; -webkit-border-radius: 0px 0px 20px 20px; border-radius: 0px 0px 20px 20px; padding:5px;' colspan=2 >"
	                    + "<table width=570 cellspacing=0 cellpadding=0 border=0 align=center><tbody><tr>"
	                    + "<td width=100% valign=middle align=left style='padding:5px; font-size:10px;'><b>KAHAXI</b><br/>"
	                    + "</td><td width=100% valign=top align=right ></td></tr></tbody></table></td></tr></tbody></table></body></html>";
 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("cotizacionVenta-").append(numeroDocumento).append(".pdf");
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", cotizacionVentaCab.getNombreCliente());
 		params.put("RUC", cotizacionVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", cotizacionVentaCab.getDireccionFiscal());
 		params.put("FECHA", cotizacionVentaCab.getFechaContabilizacion());
 		params.put("ASUNTO", cotizacionVentaCab.getAsunto());
 		params.put("ATENCION", "ATENCION DE PRUEBA");
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(cotizacionVentaCab.getTotal().toString(), cotizacionVentaCab.getCodigoTipoMoneda()));
 		
 		reporteService.enviarReportePorCorreo(nombreJrxml, nombreArchivo.toString(), email, params, listaDetalleCotizacionVenta, asunto, mensaje, response);
     		
        logger.info("fin enviarEmailReporteCotizacionesVenta");
    }
		
	
	@PostMapping ("/reporteGuiaRemisionVenta/{numeroDocumento}")
    public void reporteGuiaRemisionVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
    									 HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteGuiaRemisionVenta.......");
    	logger.info("numeroDocumento--->" + numeroDocumento); 
    	
    	GuiaRemisionCabModel grVentaCab = reporteService.obtenerCabeceraGuiaRemisionVenta(numeroDocumento);
        List<HashMap> listaDetalleGrVenta = reporteService.obtenerDetalleGuiaRemisionVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml= "/reportes/ventas/guiaRemision_venta.jrxml";
        
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("guiaRemisionVenta-").append(numeroDocumento).append(".pdf");
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", grVentaCab.getNombreCliente());
 		params.put("RUC", grVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", grVentaCab.getDireccionFiscal());
 		params.put("FECHA", grVentaCab.getFechaContabilizacion());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(grVentaCab.getTotal().toString(), grVentaCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalleGrVenta, "PDF", response);
     		
        logger.info("fin reporteGuiaRemisionVenta");
    }
	
	@PostMapping ("/enviarEmailReporteGuiaRemisionVenta")
    public void enviarEmailReporteGuiaRemisionVenta(@RequestPart("registro") GenericModel datos,
    												HttpServletResponse response) throws Exception{
		logger.info("entrando enviarEmailReporteGuiaRemisionVenta.......");
		
		String numeroDocumento = datos.getNumeroDocumento();
    	String email = datos.getEmail();
    	String enviarCodigo = datos.getEnviarCodigo();         
    	
    	GuiaRemisionCabModel grVentaCab = reporteService.obtenerCabeceraGuiaRemisionVenta(numeroDocumento);
        List<HashMap> listaDetalleGrVenta = reporteService.obtenerDetalleGuiaRemisionVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml= "/reportes/ventas/guiaRemision_venta.jrxml";
 		
 		String asunto = "GUIA DE REMISION - SOLICITUD DE CONFIRMACION DE CORREO";
	    String nombreUsuario = "XXX";
	    String mensaje = "<html><head><meta http-equiv=Content-Type content=text/html; charset=utf-8/></head><body><table align=center width=610 cellspacing=0 cellpadding=0 border=0 style='position:relative; font-size:12px; font-family:Arial, Helvetica, sans-serif; color: #00486A; background: #ffffff; border: solid 1px #bdcbcd; -moz-border-radius: 20px 20px 20px 20px; -ms-border-radius: 20px 20px 20px 20px; -webkit-border-radius: 20px 20px 20px 20px; border-radius: 20px 20px 20px 20px; padding:5px;''>"
	                    + "<tbody><tr><td align=center bgcolor=#ffffff><img width=220 height=60 src='cid:logo_kahaxi.png'/> "
	                    + "</td><td align=center bgcolor=#ffffff style='text-align: left; font-size:18px; padding-left:20px; color:#121D89;''><br>KAHAXI EIRL</td>"
	                    + "</tr><tr><td valign=middle align=center colspan=2>"
	                    + "<br><br><p style='text-align: left; font-size:14px; padding-left:20px; color:#121D89;'>Estimado(a) <b> "+ nombreUsuario +" </b>, <br/><br/>"
	                    + "Si has recibido un mensaje de este tipo, significa que te hemos enviado una Gu?a de remisi?n.<br/><br/>"
	                    + "</p>"
	                    + "<p style='text-align: left; font-size:14px; padding-left:20px; color:#0A0203;''>Atentamente,<br>"+"KAHAXI"
	                    + "<br></p><p style='text-align: left; font-size:10px; padding-left:20px; color:#DF0101;''>"
	                    + "'Esta notificaci?n ha sido enviada autom?ticamente. Por favor, no responda este correo.'</b></p><br/>"
	                    + "</td></tr><tr></tr><tr><td valign=middle height=50 bgcolor=#404040 align=center style='font-size:11px; -moz-border-radius: 0px 0px 20px 20px; -ms-border-radius: 0px 0px 20px 20px; -webkit-border-radius: 0px 0px 20px 20px; border-radius: 0px 0px 20px 20px; padding:5px;' colspan=2 >"
	                    + "<table width=570 cellspacing=0 cellpadding=0 border=0 align=center><tbody><tr>"
	                    + "<td width=100% valign=middle align=left style='padding:5px; font-size:10px;'><b>KAHAXI</b><br/>"
	                    + "</td><td width=100% valign=top align=right ></td></tr></tbody></table></td></tr></tbody></table></body></html>";
 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("guiaRemisionVenta-").append(numeroDocumento).append(".pdf");
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", grVentaCab.getNombreCliente());
 		params.put("RUC", grVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", grVentaCab.getDireccionFiscal());
 		params.put("FECHA", grVentaCab.getFechaContabilizacion());
 		params.put("ATENCION", "ATENCION DE PRUEBA");
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(grVentaCab.getTotal().toString(), grVentaCab.getCodigoTipoMoneda()));
 		
 		reporteService.enviarReportePorCorreo(nombreJrxml, nombreArchivo.toString(), email, params, listaDetalleGrVenta, asunto, mensaje, response);
     		
        logger.info("fin enviarEmailReporteGuiaRemisionVenta");
    }
	
	@PostMapping ("/reporteFacturaVenta/{numeroDocumento}")
    public void reporteFacturaVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
    									 HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteFacturaVenta.......");
    	logger.info("numeroDocumento--->" + numeroDocumento); 
    	
    	ComprobantePagoCabModel facturaVentaCab = reporteService.obtenerCabeceraFacturaVenta(numeroDocumento);
        List<HashMap> listaDetalleFacturaVenta = reporteService.obtenerDetalleFacturaVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml= "/reportes/ventas/factura_venta.jrxml";
        
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("facturaVenta-").append(numeroDocumento).append(".pdf");
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", facturaVentaCab.getNombreCliente());
 		params.put("RUC", facturaVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", facturaVentaCab.getDireccionFiscal());
 		params.put("FECHA", facturaVentaCab.getFechaContabilizacion());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(facturaVentaCab.getTotal().toString(), facturaVentaCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalleFacturaVenta, "PDF", response);
     		
        logger.info("fin reporteFacturaVenta");
    }
	
	@PostMapping ("/enviarEmailReporteFacturaVenta")
    public void enviarEmailReporteFacturaVenta(@RequestPart("registro") GenericModel datos,
    												HttpServletResponse response) throws Exception{
		logger.info("entrando enviarEmailReporteFacturaVenta.......");
		
		String numeroDocumento = datos.getNumeroDocumento();
    	String email = datos.getEmail();
    	String enviarCodigo = datos.getEnviarCodigo();         
    	
    	ComprobantePagoCabModel facturaVentaCab = reporteService.obtenerCabeceraFacturaVenta(numeroDocumento);
        List<HashMap> listaDetalleFacturaVenta = reporteService.obtenerDetalleFacturaVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml= "/reportes/ventas/factura_venta.jrxml";
 		
 		String asunto = "COMRPOBANTE DE PAGO - SOLICITUD DE CONFIRMACION DE CORREO";
	    String nombreUsuario = "XXX";
	    String mensaje = "<html><head><meta http-equiv=Content-Type content=text/html; charset=utf-8/></head><body><table align=center width=610 cellspacing=0 cellpadding=0 border=0 style='position:relative; font-size:12px; font-family:Arial, Helvetica, sans-serif; color: #00486A; background: #ffffff; border: solid 1px #bdcbcd; -moz-border-radius: 20px 20px 20px 20px; -ms-border-radius: 20px 20px 20px 20px; -webkit-border-radius: 20px 20px 20px 20px; border-radius: 20px 20px 20px 20px; padding:5px;''>"
	                    + "<tbody><tr><td align=center bgcolor=#ffffff><img width=220 height=60 src='cid:logo_kahaxi.png'/> "
	                    + "</td><td align=center bgcolor=#ffffff style='text-align: left; font-size:18px; padding-left:20px; color:#121D89;''><br>KAHAXI EIRL</td>"
	                    + "</tr><tr><td valign=middle align=center colspan=2>"
	                    + "<br><br><p style='text-align: left; font-size:14px; padding-left:20px; color:#121D89;'>Estimado(a) <b> "+ nombreUsuario +" </b>, <br/><br/>"
	                    + "Si has recibido un mensaje de este tipo, significa que te hemos enviado un comprobante de pago.<br/><br/>"
	                    + "</p>"
	                    + "<p style='text-align: left; font-size:14px; padding-left:20px; color:#0A0203;''>Atentamente,<br>"+"KAHAXI"
	                    + "<br></p><p style='text-align: left; font-size:10px; padding-left:20px; color:#DF0101;''>"
	                    + "'Esta notificaci?n ha sido enviada autom?ticamente. Por favor, no responda este correo.'</b></p><br/>"
	                    + "</td></tr><tr></tr><tr><td valign=middle height=50 bgcolor=#404040 align=center style='font-size:11px; -moz-border-radius: 0px 0px 20px 20px; -ms-border-radius: 0px 0px 20px 20px; -webkit-border-radius: 0px 0px 20px 20px; border-radius: 0px 0px 20px 20px; padding:5px;' colspan=2 >"
	                    + "<table width=570 cellspacing=0 cellpadding=0 border=0 align=center><tbody><tr>"
	                    + "<td width=100% valign=middle align=left style='padding:5px; font-size:10px;'><b>KAHAXI</b><br/>"
	                    + "</td><td width=100% valign=top align=right ></td></tr></tbody></table></td></tr></tbody></table></body></html>";
 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("facturaVenta-").append(numeroDocumento).append(".pdf");
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", facturaVentaCab.getNombreCliente());
 		params.put("RUC", facturaVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", facturaVentaCab.getDireccionFiscal());
 		params.put("FECHA", facturaVentaCab.getFechaContabilizacion());
 		params.put("ATENCION", "ATENCION DE PRUEBA");
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(facturaVentaCab.getTotal().toString(), facturaVentaCab.getCodigoTipoMoneda()));
 		
 		reporteService.enviarReportePorCorreo(nombreJrxml, nombreArchivo.toString(), email, params, listaDetalleFacturaVenta, asunto, mensaje, response);
     		
        logger.info("fin enviarEmailReporteFacturaVenta");
    }
	
	@PostMapping ("/reporteOrdenCompra/{numeroDocumento}")
    public void reporteOrdenCompra(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
    									 HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteOrdenCompra.......");
    	logger.info("numeroDocumento--->" + numeroDocumento);    
    	
    	CompraCabModel ordenCompraCab = reporteService.obtenerCabeceraOrdenCompra(numeroDocumento);
        List<HashMap> listaDetalleOrdenCompra = reporteService.obtenerDetalleOrdenCompra(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml = "/reportes/compras/orden_compra.jrxml"; 		
        
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("ordenCompra-").append(numeroDocumento).append(".pdf");
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", ordenCompraCab.getNombreProv());
 		params.put("RUC", ordenCompraCab.getNroDocProv() );
 		params.put("DIRECCION", ordenCompraCab.getDireccionFiscal());
 		params.put("FECHA_CONTABILIZA", ordenCompraCab.getFechaContabilizacionDmy()); 		
 		params.put("FECHA_ENTREGA", ordenCompraCab.getFechaEntregaDmy());
 		params.put("MONEDA", ordenCompraCab.getCodigoTipoMoneda());
 		params.put("PERSONA_CONTACTO", ordenCompraCab.getPersonaContacto());
 		params.put("DIRECCION_DESPACHO", ordenCompraCab.getDireccionDespacho());
 		params.put("FORMA_PAGO", ordenCompraCab.getDescripcionCondPago());
 		params.put("OBSERVACIONES", ordenCompraCab.getObservaciones());
 		params.put("COTIZACION_SAP", ordenCompraCab.getCotizacionSap());
 		params.put("SUB_TOTAL", ordenCompraCab.getSubTotal());
 		params.put("IGV", ordenCompraCab.getIgv());
 		params.put("TOTAL", ordenCompraCab.getTotal());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(ordenCompraCab.getTotal().toString(), ordenCompraCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		logger.info("Hashmap:" + params);
 		logger.info("detalle:" + listaDetalleOrdenCompra);
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalleOrdenCompra, "PDF", response);
     		
        logger.info("fin reporteOrdenCompra");
    }
	
	@PostMapping ("/reporteOrdenVenta/{numeroDocumento}")
    public void reporteOrdenVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
    									 HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteOrdenVenta.......");
    	logger.info("numeroDocumento--->" + numeroDocumento);    
    	
    	VentaCabModel ordenVentaCab = reporteService.obtenerCabeceraOrdenVenta(numeroDocumento);
        List<HashMap> listaDetalleOrdenVenta = reporteService.obtenerDetalleOrdenVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml = "/reportes/ventas/orden_venta.jrxml"; 		
        
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("ordenVenta-").append(numeroDocumento).append(".pdf");
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("NRO_COTIZ_VENTA", ordenVentaCab.getNroCotizVenta());
 		params.put("RAZON_SOCIAL", ordenVentaCab.getNombreCliente());
 		params.put("RUC", ordenVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", ordenVentaCab.getDireccionFiscal());
 		params.put("FECHA_CONTABILIZA", ordenVentaCab.getFechaContabilizacionDmy()); 		
 		params.put("FECHA_ENTREGA", ordenVentaCab.getFechaEntregaDmy());
 		params.put("MONEDA", ordenVentaCab.getCodigoTipoMoneda());
 		params.put("PERSONA_CONTACTO", ordenVentaCab.getPersonaContacto());
 		params.put("DIRECCION_DESPACHO", ordenVentaCab.getDireccionDespacho());
 		params.put("FORMA_PAGO", ordenVentaCab.getDescripcionCondPago());
 		params.put("OBSERVACIONES", ordenVentaCab.getObservaciones());
 		params.put("SUB_TOTAL", ordenVentaCab.getSubTotal());
 		params.put("IGV", ordenVentaCab.getIgv());
 		params.put("TOTAL", ordenVentaCab.getTotal());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(ordenVentaCab.getTotal().toString(), ordenVentaCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		logger.info("Hashmap:" + params);
 		logger.info("detalle:" + listaDetalleOrdenVenta);
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalleOrdenVenta, "PDF", response);
     		
        logger.info("fin reporteOrdenVenta");
    }
	
	@PostMapping ("/enviarEmailReporteOrdenCompra")
    public void enviarEmailReporteOrdenCompra(@RequestPart("registro") GenericModel datos,
    												HttpServletResponse response) throws Exception{
		logger.info("entrando enviarEmailReporteOrdenCompra.......");
		String numeroDocumento = datos.getNumeroDocumento();
    	String email = datos.getEmail();
    	String enviarCodigo = datos.getEnviarCodigo();
    	
    	logger.info("numeroDocumento--->" + numeroDocumento);            
		logger.info("email--->" + email);            
        logger.info("enviarCodigo--->" + enviarCodigo);            
    	
        CompraCabModel ordenCompraCab = reporteService.obtenerCabeceraOrdenCompra(numeroDocumento);
        List<HashMap> listaDetalleOrdenCompra = reporteService.obtenerDetalleOrdenCompra(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml = "/reportes/compras/orden_compra.jrxml"; 
        String obs="";
        
        if (ordenCompraCab.getObservaciones().equals("")) {
        	obs = "<br/>";
        }else {
        	obs = "" + ordenCompraCab.getObservaciones() + "<br/><br/>";
        }
                
        String asunto = "ORDEN DE COMPRA " + numeroDocumento + " / SOLICITUD DE CONFIRMACION DE CORREO";
	    String nombreUsuario = ordenCompraCab.getNombreProv();
	    String mensaje = "<html><head><meta http-equiv=Content-Type content=text/html; charset=utf-8/></head><body><table align=center width=610 cellspacing=0 cellpadding=0 border=0 style='position:relative; font-size:12px; font-family:Arial, Helvetica, sans-serif; color: #404040; background: #ffffff; border: solid 1px #bdcbcd; -moz-border-radius: 20px 20px 20px 20px; -ms-border-radius: 20px 20px 20px 20px; -webkit-border-radius: 20px 20px 20px 20px; border-radius: 20px 20px 20px 20px; padding:5px;''>"
                + "<tbody><tr>"
                + "<td align=center bgcolor=#ffffff style='text-align: left; font-size:18px; padding-left:20px; color:#404040;''><br>KAHAXI EIRL</td>"
                + "</tr><tr><td valign=middle align=center colspan=2>"
                + "<br><br><p style='text-align: left; font-size:14px; padding-left:20px; color:#404040;'>Estimado(a) "+ nombreUsuario +", <br/>"
                + "Se env?a adjunto la orden de compra para su atenci?n. En caso de tener alguna consulta favor de comunicarse con su contacto directo.<br/><br/>"
                + obs
                + "</p>"
                + "<p style='text-align: left; font-size:14px; padding-left:20px; color:#404040;''>Atentamente,<br>"+"KAHAXI"
                + "<br></p><p style='text-align: left; font-size:10px; padding-left:20px; color:#DF0101;''>"
                + "'Esta notificaci?n ha sido enviada autom?ticamente. Por favor, no responda este correo.'</b></p><br/>"
                + "</td></tr><tr></tr><tr><td valign=middle height=50 bgcolor=#c2c0c0 align=center style='font-size:11px; -moz-border-radius: 0px 0px 20px 20px; -ms-border-radius: 0px 0px 20px 20px; -webkit-border-radius: 0px 0px 20px 20px; border-radius: 0px 0px 20px 20px; padding:5px;' colspan=2 >"
                + "<table width=570 cellspacing=0 cellpadding=0 border=0 align=center><tbody><tr>"
                + "<td width=100% valign=middle align=left style='padding:5px; font-size:10px;'><b>KAHAXI</b><br/>"
                + "</td><td width=100% valign=top align=right ></td></tr></tbody></table></td></tr></tbody></table></body></html>";
	    
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("ordenCompra-").append(numeroDocumento).append(".pdf");
 		
 		// seteando par?metros
 		Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", ordenCompraCab.getNombreProv());
 		params.put("RUC", ordenCompraCab.getNroDocProv() );
 		params.put("DIRECCION", ordenCompraCab.getDireccionFiscal());
 		params.put("FECHA_CONTABILIZA", ordenCompraCab.getFechaContabilizacionDmy()); 		
 		params.put("FECHA_ENTREGA", ordenCompraCab.getFechaEntregaDmy());
 		params.put("MONEDA", ordenCompraCab.getCodigoTipoMoneda());
 		params.put("PERSONA_CONTACTO", ordenCompraCab.getPersonaContacto());
 		params.put("DIRECCION_DESPACHO", ordenCompraCab.getDireccionDespacho());
 		params.put("FORMA_PAGO", ordenCompraCab.getDescripcionCondPago());
 		params.put("OBSERVACIONES", ordenCompraCab.getObservaciones());
 		params.put("COTIZACION_SAP", ordenCompraCab.getCotizacionSap());
 		params.put("SUB_TOTAL", ordenCompraCab.getSubTotal());
 		params.put("IGV", ordenCompraCab.getIgv());
 		params.put("TOTAL", ordenCompraCab.getTotal());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(ordenCompraCab.getTotal().toString(), ordenCompraCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		logger.info("enviarCodigo--->" + enviarCodigo);   
 		
 		reporteService.enviarReportePorCorreo(nombreJrxml, nombreArchivo.toString(), email, params, listaDetalleOrdenCompra, asunto, mensaje, response);
     		
 		logger.info("fin enviarEmailReporteOrdenCompra");
    }	
	
	@PostMapping ("/enviarEmailReporteOrdenVenta")
    public void enviarEmailReporteOrdenVenta(@RequestPart("registro") GenericModel datos,
    												HttpServletResponse response) throws Exception{
		logger.info("entrando enviarEmailReporteOrdenVenta.......");
		String numeroDocumento = datos.getNumeroDocumento();
    	String email = datos.getEmail();
    	String enviarCodigo = datos.getEnviarCodigo();
    	
    	logger.info("numeroDocumento--->" + numeroDocumento);            
		logger.info("email--->" + email);            
        logger.info("enviarCodigo--->" + enviarCodigo);            
    	
        VentaCabModel ordenVentaCab = reporteService.obtenerCabeceraOrdenVenta(numeroDocumento);
        List<HashMap> listaDetalleOrdenVenta = reporteService.obtenerDetalleOrdenVenta(numeroDocumento);
        
        // GENERANDO EL REPORTE
        String nombreJrxml = "/reportes/venta/orden_venta.jrxml"; 
        String obs="";
        
        if (ordenVentaCab.getObservaciones().equals("")) {
        	obs = "<br/>";
        }else {
        	obs = "" + ordenVentaCab.getObservaciones() + "<br/><br/>";
        }
                
        String asunto = "ORDEN DE COMPRA " + numeroDocumento + " / SOLICITUD DE CONFIRMACION DE CORREO";
	    String nombreUsuario = ordenVentaCab.getNombreCliente();
	    String mensaje = "<html><head><meta http-equiv=Content-Type content=text/html; charset=utf-8/></head><body><table align=center width=610 cellspacing=0 cellpadding=0 border=0 style='position:relative; font-size:12px; font-family:Arial, Helvetica, sans-serif; color: #404040; background: #ffffff; border: solid 1px #bdcbcd; -moz-border-radius: 20px 20px 20px 20px; -ms-border-radius: 20px 20px 20px 20px; -webkit-border-radius: 20px 20px 20px 20px; border-radius: 20px 20px 20px 20px; padding:5px;''>"
                + "<tbody><tr>"
                + "<td align=center bgcolor=#ffffff style='text-align: left; font-size:18px; padding-left:20px; color:#404040;''><br>KAHAXI EIRL</td>"
                + "</tr><tr><td valign=middle align=center colspan=2>"
                + "<br><br><p style='text-align: left; font-size:14px; padding-left:20px; color:#404040;'>Estimado(a) "+ nombreUsuario +", <br/>"
                + "Se env?a adjunto la orden de compra para su atenci?n. En caso de tener alguna consulta favor de comunicarse con su contacto directo.<br/><br/>"
                + obs
                + "</p>"
                + "<p style='text-align: left; font-size:14px; padding-left:20px; color:#404040;''>Atentamente,<br>"+"KAHAXI"
                + "<br></p><p style='text-align: left; font-size:10px; padding-left:20px; color:#DF0101;''>"
                + "'Esta notificaci?n ha sido enviada autom?ticamente. Por favor, no responda este correo.'</b></p><br/>"
                + "</td></tr><tr></tr><tr><td valign=middle height=50 bgcolor=#c2c0c0 align=center style='font-size:11px; -moz-border-radius: 0px 0px 20px 20px; -ms-border-radius: 0px 0px 20px 20px; -webkit-border-radius: 0px 0px 20px 20px; border-radius: 0px 0px 20px 20px; padding:5px;' colspan=2 >"
                + "<table width=570 cellspacing=0 cellpadding=0 border=0 align=center><tbody><tr>"
                + "<td width=100% valign=middle align=left style='padding:5px; font-size:10px;'><b>KAHAXI</b><br/>"
                + "</td><td width=100% valign=top align=right ></td></tr></tbody></table></td></tr></tbody></table></body></html>";
	    
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("ordenVenta-").append(numeroDocumento).append(".pdf");
 		
 		// seteando par?metros
 		Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("NRO_COTIZ_VENTA", ordenVentaCab.getNroCotizVenta());
 		params.put("RAZON_SOCIAL", ordenVentaCab.getNombreCliente());
 		params.put("RUC", ordenVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", ordenVentaCab.getDireccionFiscal());
 		params.put("FECHA_CONTABILIZA", ordenVentaCab.getFechaContabilizacionDmy()); 		
 		params.put("FECHA_ENTREGA", ordenVentaCab.getFechaEntregaDmy());
 		params.put("MONEDA", ordenVentaCab.getCodigoTipoMoneda());
 		params.put("PERSONA_CONTACTO", ordenVentaCab.getPersonaContacto());
 		params.put("DIRECCION_DESPACHO", ordenVentaCab.getDireccionDespacho());
 		params.put("FORMA_PAGO", ordenVentaCab.getDescripcionCondPago());
 		params.put("OBSERVACIONES", ordenVentaCab.getObservaciones());
 		params.put("SUB_TOTAL", ordenVentaCab.getSubTotal());
 		params.put("IGV", ordenVentaCab.getIgv());
 		params.put("TOTAL", ordenVentaCab.getTotal());
 		params.put("TOTAL_LETRAS", ConvertNumberLetter.convertir(ordenVentaCab.getTotal().toString(), ordenVentaCab.getCodigoTipoMoneda()));
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		logger.info("enviarCodigo--->" + enviarCodigo);   
 		
 		reporteService.enviarReportePorCorreo(nombreJrxml, nombreArchivo.toString(), email, params, listaDetalleOrdenVenta, asunto, mensaje, response);
     		
 		logger.info("fin enviarEmailReporteOrdenCompra");
    }	
	
	@PostMapping ("/reporteCompras/")
    public void reporteCompras(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
					    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
					    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
					    		@RequestParam(Constante.PARAM_TIPO_REPORTE) String tipoReporte, 
							    HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteCompras.......");
    	
    	String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	
        List<HashMap> listaDetalle = reporteService.obtenerDetalleReporteCompras(fechaInicio, fechaFin, datoBuscar);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
        String date = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
        
 		nombreJrxml = "/reportes/compras/reporte_compras.jrxml"; 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		 		
 		if(tipoReporte.equals("PDF")){
			nombreArchivo.append("reporteCompras-").append(date).append(".pdf");
		}else {
			nombreArchivo.append("reporteCompras-").append(date).append(".xls");
		}
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("FEC_INICIO", fechaInicio);
 		params.put("FEC_FIN", fechaFin);
 		params.put("DATO_BUSCAR", datoBuscar);
 		params.put("USUARIO", usuario);
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, tipoReporte, response);
 		
        logger.info("fin reporteCompras");
    }
	
	@PostMapping ("/reporteKardex/")
    public void reporteKardex(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
					    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
					    		@RequestParam(Constante.PARAM_COD_ALMACEN) String codAlmacen,
					    		@RequestParam(Constante.PARAM_DES_ALMACEN) String desAlmacen,
					    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
					    		@RequestParam(Constante.PARAM_TIPO_REPORTE) String tipoReporte, 
							    HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteKardex.......");
    	
    	String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	
        List<HashMap> listaDetalle = reporteService.obtenerDetalleReporteKardex(fechaInicio, fechaFin, codAlmacen, datoBuscar);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
        String date = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
        
 		nombreJrxml = "/reportes/almacen/reporte_kardex.jrxml";
 		StringBuilder nombreArchivo = new StringBuilder();
 		
 		if(tipoReporte.equals("PDF")){
			nombreArchivo.append("reporteKardex-").append(date).append(".pdf");
		}else {
			nombreArchivo.append("reporteKardex-").append(date).append(".xls");
		}
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
        params.put("FEC_INICIO", fechaInicio);
 		params.put("FEC_FIN", fechaFin);
 		params.put("COD_ALMACEN", codAlmacen);
 		params.put("DES_ALMACEN", desAlmacen);
 		params.put("DATO_BUSCAR", datoBuscar);
 		params.put("USUARIO", usuario);
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, tipoReporte, response);
     		
        logger.info("fin reporteKardex");
    }
	
	@PostMapping ("/reporteInventario/")
    public void reporteInventario(@RequestParam(Constante.PARAM_COD_ALMACEN) String codAlmacen,
    								@RequestParam(Constante.PARAM_DES_ALMACEN) String desAlmacen,
						    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
						    		@RequestParam(Constante.PARAM_TIPO_REPORTE) String tipoReporte, 
						    		HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteInventario.......");
    	    	    
    	String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	
        List<HashMap> listaDetalle = reporteService.obtenerDetalleReporteInventario(codAlmacen, datoBuscar);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
        String date = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
        
 		nombreJrxml = "/reportes/almacen/reporte_inventario.jrxml";	
 		StringBuilder nombreArchivo = new StringBuilder();
 		
 		if(tipoReporte.equals("PDF")){
			nombreArchivo.append("reporteInventario-").append(date).append(".pdf");
		}else {
			nombreArchivo.append("reporteInventario-").append(date).append(".xls");
		}
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		params.put("COD_ALMACEN", codAlmacen);
 		params.put("DES_ALMACEN", desAlmacen);
 		params.put("DATO_BUSCAR", datoBuscar);
 		params.put("USUARIO", usuario);
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, tipoReporte, response);
     		
        logger.info("fin reporteInventario");
    }
	
	@PostMapping ("/reporteVentas/")
    public void reporteVentas(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
					    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
					    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
					    		@RequestParam(Constante.PARAM_TIPO_REPORTE) String tipoReporte, 
							    HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteVentas.......");
    	
    	String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	
        List<HashMap> listaDetalle = reporteService.obtenerDetalleReporteVentas(fechaInicio, fechaFin, datoBuscar);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
        String date = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
        
 		nombreJrxml = "/reportes/ventas/reporte_ventas.jrxml"; 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		 		
 		if(tipoReporte.equals("PDF")){
			nombreArchivo.append("reporteVentas-").append(date).append(".pdf");
		}else {
			nombreArchivo.append("reporteVentas-").append(date).append(".xls");
		}
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
        params.put("FEC_INICIO", fechaInicio);
 		params.put("FEC_FIN", fechaFin);
 		params.put("DATO_BUSCAR", datoBuscar);
 		params.put("USUARIO", usuario);
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, tipoReporte, response);
 		
        logger.info("fin reporteVentas");
    }
	
	@PostMapping ("/reporteAnalisisVentas/")
    public void reporteAnalisisVentas(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
					    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
					    		@RequestParam(Constante.PARAM_OPCION) String opcion, 
					    		@RequestParam(Constante.PARAM_TIPO_REPORTE) String tipoReporte, 
							    HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteAnalisisVentas.......");
    	    	
    	String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	
        List<HashMap> listaDetalle = reporteService.obtenerDetalleReporteAnalisisVentas(fechaInicio, fechaFin, opcion);
        
        // GENERANDO EL REPORTE
        String nombreJrxml = "";
        String date = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime()); 
        
 		StringBuilder nombreArchivo = new StringBuilder();
 		
 		if(opcion.equals("1")){
 			nombreJrxml = "/reportes/ventas/reporte_analisis_ventas_cliente.jrxml"; 
 		} 		
 		if(opcion.equals("2")){
 			nombreJrxml = "/reportes/ventas/reporte_analisis_ventas_articulo.jrxml";
 		}
 		
 		if(tipoReporte.equals("PDF")){
			nombreArchivo.append("analisisVentas-").append(date).append(".pdf");
		}else {
			nombreArchivo.append("analisisVentas-").append(date).append(".xls");
		}
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
        params.put("FEC_INICIO", fechaInicio);
 		params.put("FEC_FIN", fechaFin);
 		params.put("USUARIO", usuario);
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, tipoReporte, response);
 		
        logger.info("fin reporteAnalisisVentas");
    }
	
	@PostMapping ("/reporteAnulados/")
    public void reporteDocumentosAnulados(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
					    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
					    		@RequestParam(Constante.PARAM_COD_TIPO) String codTipo,
					    		@RequestParam(Constante.PARAM_DES_TIPO) String desTipo,
					    		@RequestParam(Constante.PARAM_TIPO_REPORTE) String tipoReporte, 
							    HttpServletResponse response) throws Exception{
        
    	logger.info("entrando reporteDocumentosAnulados.......");
    	
    	String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	
        List<HashMap> listaDetalle = reporteService.obtenerDetalleReporteDocumentosAnulados(fechaInicio, fechaFin, codTipo);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
        String date = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(Calendar.getInstance().getTime());
 		
 		nombreJrxml = "/reportes/reporte_documentos_anulados.jrxml";
 		StringBuilder nombreArchivo = new StringBuilder();
 		
 		if(tipoReporte.equals("PDF")){
			nombreArchivo.append("reporteAnulados-").append(date).append(".pdf");
		}else {
			nombreArchivo.append("reporteAnulados-").append(date).append(".xls");
		}
 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
        params.put("FEC_INICIO", fechaInicio);
 		params.put("FEC_FIN", fechaFin);
 		params.put("COD_TIPO", codTipo);
 		params.put("DES_TIPO", desTipo);
 		params.put("USUARIO", usuario);
 		params.put("imagen", getClass().getResourceAsStream("/static/images/logo_kahaxi.png"));
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, tipoReporte, response);
     		
        logger.info("fin reporteDocumentosAnulados");
    }
	
	
	
	@GetMapping ("/listarReporteCompras/")
    public ResponseEntity<List<HashMap>> listarReporteCompras(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
														    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
														    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
																    HttpServletResponse response) throws Exception {
        
		logger.info("Inicio listarReporteCompras ......");
		
		List<HashMap> listaCompras = reporteService.obtenerDetalleReporteCompras(fechaInicio, fechaFin,datoBuscar);
        
        logger.info("Fin listarReporteCompras.......");
        
        return new ResponseEntity<List<HashMap>>(listaCompras, HttpStatus.OK);  
    
    }
	
	@GetMapping ("/listarReporteKardex/")
    public ResponseEntity<List<HashMap>> listarReporteKardex(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
													    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
													    		@RequestParam(Constante.PARAM_COD_ALMACEN) String codAlmacen,
													    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
																HttpServletResponse response) throws Exception {
        
		logger.info("Inicio listarReporteKardex ......");
		
		List<HashMap> listaKardex = reporteService.obtenerDetalleReporteKardex(fechaInicio, fechaFin, codAlmacen, datoBuscar);
        
        logger.info("Fin listarReporteKardex.......");
        
        return new ResponseEntity<List<HashMap>>(listaKardex, HttpStatus.OK);  
    
    }
	
	@GetMapping ("/listarReporteInventario/")
    public ResponseEntity<List<HashMap>> listarReporteInventario(@RequestParam(Constante.PARAM_COD_ALMACEN) String codAlmacen,
													    		 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
																 HttpServletResponse response) throws Exception {
        
		logger.info("Inicio listarReporteInventario ......");
		
		List<HashMap> listaCompras = reporteService.obtenerDetalleReporteInventario(codAlmacen, datoBuscar);
        
        logger.info("Fin listarReporteInventario.......");
        
        return new ResponseEntity<List<HashMap>>(listaCompras, HttpStatus.OK);  
    
    }
	
	@GetMapping ("/listarReporteVentas/")
    public ResponseEntity<List<HashMap>> listarReporteVentas(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
														    		@RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
														    		@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
																    HttpServletResponse response) throws Exception {
        
		logger.info("Inicio listarReporteVentas ......");
		
		List<HashMap> listaVentas = reporteService.obtenerDetalleReporteVentas(fechaInicio, fechaFin,datoBuscar);
        
        logger.info("Fin listarReporteVentas.......");
        
        return new ResponseEntity<List<HashMap>>(listaVentas, HttpStatus.OK);  
    
    }
	
	@GetMapping ("/listarReporteAnalisisVentas/")
    public ResponseEntity<List<HashMap>> listarReporteAnalisisVentas(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
														    		 @RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
														    		 @RequestParam(Constante.PARAM_OPCION) String opcion,
																     HttpServletResponse response) throws Exception {
        
		logger.info("Inicio listarReporteAnalisisVentas ......");
		
		List<HashMap> listaAnVentas = reporteService.obtenerDetalleReporteAnalisisVentas(fechaInicio, fechaFin, opcion);
        
        logger.info("Fin listarReporteAnalisisVentas.......");
        
        return new ResponseEntity<List<HashMap>>(listaAnVentas, HttpStatus.OK);    
    }
	
	@GetMapping ("/listarReporteDocsAnulados/")
    public ResponseEntity<List<HashMap>> listarReporteDocsAnulados(@RequestParam(Constante.PARAM_FECHA_INICIO) String fechaInicio, 
														    	   @RequestParam(Constante.PARAM_FECHA_FIN) String fechaFin,
														    	   @RequestParam(Constante.PARAM_COD_TIPO) String codTipo,
																   HttpServletResponse response) throws Exception {
        
		logger.info("Inicio listarReporteDocsAnulados ......");
		
		List<HashMap> listaAnulados = reporteService.obtenerDetalleReporteDocumentosAnulados(fechaInicio, fechaFin, codTipo);
        
        logger.info("Fin listarReporteDocsAnulados.......");
        
        return new ResponseEntity<List<HashMap>>(listaAnulados, HttpStatus.OK);  
    
    }
	
	@PostMapping ("/plantillaListaPrecios/")
    public void plantillaListaPrecios(@RequestParam(Constante.PARAM_ID_LISTA_PRECIO) int idListaPrecio,
    									HttpServletResponse response) throws Exception{
        
        logger.info("entrando plantillaListaPrecios.......");
    	
    	List<HashMap> listaDetalle = reporteService.plantillaListaPrecioDet(idListaPrecio);
        
        // GENERANDO EL REPORTE
        String nombreJrxml;
        
 		nombreJrxml = "/reportes/reporte_lista_precios.jrxml"; 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		 		
 		nombreArchivo.append("plantilla_LP").append(".xlsx");
		 		
 		// seteando par?metros
        Map<String, Object> params = new HashMap();
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalle, "EXCEL", response);
 		
        logger.info("fin plantillaListaPrecios");
    }
	
	
}
