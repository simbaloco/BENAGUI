package pe.gob.repuestera.controlador.rest.reportes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.repuestera.model.GenericModel;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.service.reportes.ReporteService;
import pe.gob.repuestera.util.Constante;

@RestController
public class ReporteRestController {

	private static final Logger logger = LogManager.getLogger(ReporteRestController.class);
	
	@Autowired
	ReporteService reporteService;
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
 		// seteando parámetros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", cotizacionVentaCab.getNombreCliente());
 		params.put("RUC", cotizacionVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", cotizacionVentaCab.getDireccionFiscal());
 		params.put("FECHA", cotizacionVentaCab.getFechaContabilizacion());
 		params.put("ASUNTO", cotizacionVentaCab.getAsunto());
 		
 		reporteService.generarReporte(nombreJrxml, nombreArchivo.toString(), params, listaDetalleCotizacionVenta, response);
     		
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
 		
 		StringBuilder nombreArchivo = new StringBuilder();
 		nombreArchivo.append("cotizacionVenta-").append(numeroDocumento).append(".pdf");
 		// seteando parámetros
        Map<String, Object> params = new HashMap();
 		params.put("NRO_DOCUMENTO", numeroDocumento);
 		params.put("RAZON_SOCIAL", cotizacionVentaCab.getNombreCliente());
 		params.put("RUC", cotizacionVentaCab.getNroDocCliente() );
 		params.put("DIRECCION", cotizacionVentaCab.getDireccionFiscal());
 		params.put("FECHA", cotizacionVentaCab.getFechaContabilizacion());
 		params.put("ASUNTO", "ASUNTO DE PRUEBA");
 		params.put("ATENCION", "ATENCION DE PRUEBA");
 		
 		reporteService.enviarReportePorCorreo(nombreJrxml, nombreArchivo.toString(), email, params, listaDetalleCotizacionVenta, response);
     		
        logger.info("fin enviarEmailReporteCotizacionesVenta");
    }	
	
}
