package pe.gob.repuestera.serviceImpl.reportes;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.repository.compra.ordencompra.OrdenCompraMapper;
import pe.gob.repuestera.repository.reportes.ReporteMapper;
import pe.gob.repuestera.service.reportes.ReporteService;
import pe.gob.repuestera.util.Constante;

@Service
public class ReporteServiceImpl implements ReporteService{

	private static final Logger logger = LogManager.getLogger(ReporteServiceImpl.class);
	
	@Autowired
	private ReporteMapper reporteMapper;
	@Autowired
	private OrdenCompraMapper ordenCompraMapper;

	@Override
	public VentaCabModel obtenerCabeceraCotizacionVenta(String numeroDocumento) throws Exception {
		logger.info("entrando obtenerCabeceraCotizacionVenta.......");
        VentaCabModel cotizacionVentaCab = null;
        logger.info("numeroDocumento--->" + numeroDocumento);            
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);
        // ejecutando la query
        cotizacionVentaCab = reporteMapper.obtenerCabeceraCotizacionVenta(params);
        logger.info("obtenerCabeceraCotizacionVenta........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerCabeceraCotizacionVenta.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerCabeceraCotizacionVenta.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerCabeceraCotizacionVenta ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return cotizacionVentaCab;
	}

	@Override
	public List<HashMap> obtenerDetalleCotizacionVenta(String numeroDocumento) throws Exception {
		logger.info("entrando obtenerDetalleCotizacionVenta.......");
		List<HashMap> listaDetalleCotizacionVenta = null;
        logger.info("numeroDocumento--->" + numeroDocumento);            
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);
        // ejecutando la query
        listaDetalleCotizacionVenta = reporteMapper.obtenerDetalleCotizacionVenta(params);
        logger.info("obtenerDetalleCotizacionVenta........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleCotizacionVenta.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleCotizacionVenta.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleCotizacionVenta ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalleCotizacionVenta;
	}
	
	@Override
	public CompraCabModel obtenerCabeceraOrdenCompra(String numeroDocumento) throws Exception {
		logger.info("entrando obtenerCabeceraOrdenCompra.......");
		CompraCabModel ordenCompraCab = null;
        logger.info("numeroDocumento--->" + numeroDocumento);            
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);
        // ejecutando la query
        ordenCompraCab = ordenCompraMapper.buscarOrdenCompraCab(params);
        logger.info("obtenerCabeceraOrdenCompra........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerCabeceraOrdenCompra.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerCabeceraOrdenCompra.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerCabeceraOrdenCompra ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return ordenCompraCab;
	}

	@Override
	public List<HashMap> obtenerDetalleOrdenCompra(String numeroDocumento) throws Exception {
		logger.info("entrando obtenerDetalleOrdenCompra.......");
		List<HashMap> listaDetalleOrdenCompra = null;
        logger.info("numeroDocumento--->" + numeroDocumento);            
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);
        // ejecutando la query
        listaDetalleOrdenCompra = reporteMapper.obtenerDetalleOrdenCompra(params);
        logger.info("obtenerDetalleOrdenCompra........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleOrdenCompra.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleOrdenCompra.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleOrdenCompra ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalleOrdenCompra;
	}

	@Override
	public void generarReporte(String nombreJrxml, String nombreArchivo, Map<String, Object> parametros, List<HashMap> lista, String tipoReporte, HttpServletResponse response) throws Exception {
		logger.info("entrando generarReporte.......");
        try {
        	// ARMANDO EL REPORTE
    		JasperPrint jasperPrint = generarReporte(nombreJrxml, lista, parametros);
    		
    		if(tipoReporte.equals("PDF")){
    			response.setContentType("application/x-pdf");
    			response.setHeader("Content-disposition", "inline; filename=" + nombreArchivo);
    			
    			final OutputStream outStream = response.getOutputStream();
        		JasperExportManager.exportReportToPdfStream(jasperPrint, outStream);        		
    		}else {
    			response.setContentType("application/vnd.ms-excel");
    			response.setHeader("Content-disposition", "inline; filename=" + nombreArchivo);
    			
    			JRXlsExporter  exporter = new JRXlsExporter ();
    			ServletOutputStream out = response.getOutputStream();
    			
    	        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
    	        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));
    	        
    	        exporter.exportReport();
    	        out.flush();
    		}    		
        }catch (Exception e) {
        	throw new Exception(e.toString());
		}
		
		logger.info("fin generarReporte.......");
	}

	@Override
	public void enviarReportePorCorreo(String nombreJrxml, String nombreArchivo, String email, Map<String, Object> parametros, List<HashMap> lista, String asunto, String mensaje, HttpServletResponse response) throws Exception {
		logger.info("entrando enviarReportePorCorreo.......");
        try {
        	// ENVIANDO EL REPORTE POR MAIL
    		JasperPrint jasperPrint = generarReporte(nombreJrxml, lista, parametros);
    		// ENMVIANDO REPORTE PDF POR MAIL
    		ByteArrayOutputStream baos = new ByteArrayOutputStream();
    		JasperExportManager.exportReportToPdfStream(jasperPrint, baos);
    		DataSource aAttachment =  new ByteArrayDataSource(baos.toByteArray(), "application/pdf");
    		    		
    	    Properties prop = new Properties();
    	    prop.put("mail.smtp.host", "smtp.gmail.com");
            prop.put("mail.smtp.port", "587");
            prop.put("mail.smtp.auth", "true");
            prop.put("mail.smtp.starttls.enable", "true"); //TLS
    	    
            Session session = Session.getInstance(prop,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication("kahaxi.mail@gmail.com", "kahaxi1234");
                        }
                    });
           
        	MimeBodyPart attachmentBP = new MimeBodyPart();
            attachmentBP.setFileName(nombreArchivo);
            attachmentBP.setDataHandler(new DataHandler(aAttachment));
            
        	BodyPart texto = new MimeBodyPart();
    	    texto.setContent( mensaje, "text/html; charset=utf-8" );
    	    
        	MimeMultipart multiParte = new MimeMultipart();
    	    multiParte.addBodyPart(texto);
    	    multiParte.addBodyPart(attachmentBP);
    	    
        	MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("ventas@kahaxi.com"));
            message.setRecipients(Message.RecipientType.TO, generarDestinatarios(email));
            message.setSubject(asunto);
            message.setContent(multiParte);
            
            logger.info("sending...");
            // Send message
            Transport.send(message);
            logger.info("Sent message successfully....");
        }catch (Exception e) {
        	throw new Exception(e.toString());
		}
		
		logger.info("fin enviarReportePorCorreo.......");
	}
		
	private JasperPrint generarReporte(String nombreJrxml, List<HashMap> lista, Map<String, Object> parametros) throws JRException, IOException{
		logger.info("inicio generarReporte....");
		// GENERANDO EL REPORTE
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lista);
		InputStream inputStream = this.getClass().getResourceAsStream(nombreJrxml);
		logger.info("compilnadoi el reporte....");
		JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);
		logger.info("fin compilacion del reporte....inicio fill");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, dataSource);
		
		logger.info("fin  fill");
		return jasperPrint;
	}
	
	private InternetAddress[] generarDestinatarios(String listaEmail) throws AddressException {
		String[] recipientList = listaEmail.split(",");
        InternetAddress[] recipientAddress = new InternetAddress[recipientList.length];
        int counter = 0;
        for (String recipient : recipientList) {
            recipientAddress[counter] = new InternetAddress(recipient.trim());
            counter++;
        }
        
        return recipientAddress;
	}
	
	@Override
	public List<HashMap> obtenerDetalleReporteCompras(String fechaInicio, String fechaFin, String datoBuscar) throws Exception {
		logger.info("entrando obtenerDetalleReporteCompras.......");
		List<HashMap> listaDetalle = null;
         
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_FEC_INICIO, fechaInicio);
        params.put(Constante.PARAM_SP_FEC_FIN, fechaFin);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        
        // ejecutando la query
        listaDetalle = reporteMapper.obtenerDetalleReporteCompras(params);
        
        logger.info("obtenerDetalleReporteCompras........obteniendo el retorno");	
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleReporteCompras.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleReporteCompras.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleReporteCompras ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalle;
	}

	@Override
	public List<HashMap> obtenerDetalleReporteKardex(String fechaInicio, String fechaFin, String codAlmacen, String datoBuscar) throws Exception {

		logger.info("entrando obtenerDetalleReporteKardex.......");
		List<HashMap> listaDetalle = null;
                
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_FEC_INICIO, fechaInicio);
        params.put(Constante.PARAM_SP_FEC_FIN, fechaFin);
        params.put(Constante.PARAM_SP_COD_ALMACEN, codAlmacen);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        
        // ejecutando la query
        listaDetalle = reporteMapper.obtenerDetalleReporteKardex(params);
        logger.info("obtenerDetalleReporteKardex........obteniendo el retorno");	
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleReporteKardex.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleReporteKardex.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleReporteKardex ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalle;
		
	}

	@Override
	public List<HashMap> obtenerDetalleReporteInventario(String codAlmacen, String datoBuscar) throws Exception {
		
		logger.info("entrando obtenerDetalleReporteInventario.......");
		List<HashMap> listaDetalle = null;
        
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_ALMACEN, codAlmacen);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        
        // ejecutando la query
        listaDetalle = reporteMapper.obtenerDetalleReporteInventario(params);
        logger.info("obtenerDetalleReporteInventario........obteniendo el retorno");	
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleReporteInventario.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleReporteInventario.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleReporteInventario ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalle;
		
	}

	@Override
	public List<HashMap> obtenerDetalleReporteVentas(String fechaInicio, String fechaFin, String datoBuscar)
			throws Exception {
		
		logger.info("entrando obtenerDetalleReporteVentas.......");
		List<HashMap> listaDetalle = null;
                
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_FEC_INICIO, fechaInicio);
        params.put(Constante.PARAM_SP_FEC_FIN, fechaFin);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        
        // ejecutando la query
        listaDetalle = reporteMapper.obtenerDetalleReporteVentas(params);
                
        logger.info("obtenerDetalleReporteVentas........obteniendo el retorno");	
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleReporteVentas.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleReporteVentas.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleReporteVentas ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalle;		
	}

	@Override
	public List<HashMap> obtenerDetalleReporteAnalisisVentas(String fechaInicio, String fechaFin, String opcion)
			throws Exception {
		
		logger.info("entrando obtenerDetallereporteAnalisisVentas.......");
		List<HashMap> listaDetalle = null;
                
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_FEC_INICIO, fechaInicio);
        params.put(Constante.PARAM_SP_FEC_FIN, fechaFin);
        params.put(Constante.PARAM_SP_OPCION, opcion);
        
        // ejecutando la query
        if (opcion.equals("1")) {
        	listaDetalle = reporteMapper.obtenerDetalleReporteAnalisisVentasCliente(params);
        }
        if (opcion.equals("2")) {
        	listaDetalle = reporteMapper.obtenerDetalleReporteAnalisisVentasArticulo(params);
        }
                
        logger.info("obtenerDetallereporteAnalisisVentas........obteniendo el retorno");	
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetallereporteAnalisisVentas.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetallereporteAnalisisVentas.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetallereporteAnalisisVentas ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalle;		
	}

	@Override
	public List<HashMap> obtenerDetalleReporteDocumentosAnulados(String fechaInicio, String fechaFin, String codTipo)
			throws Exception {
		
		logger.info("entrando obtenerDetalleReporteDocumentosAnulados.......");
		List<HashMap> listaDetalle = null;
                
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_FEC_INICIO, fechaInicio);
        params.put(Constante.PARAM_SP_FEC_FIN, fechaFin);
        params.put(Constante.PARAM_SP_COD_TIPO, codTipo);
        
        // ejecutando la query
        listaDetalle = reporteMapper.obtenerDetalleReporteDocumentosAnulados(params);
        logger.info("obtenerDetalleReporteDocumentosAnulados........obteniendo el retorno");	
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("obtenerDetalleReporteDocumentosAnulados.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("obtenerDetalleReporteDocumentosAnulados.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("obtenerDetalleReporteDocumentosAnulados ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaDetalle;
		
	}

	/*@Override
	public List<HashMap> listarReporteCompras(String fechaInicio, String fechaFin, String datoBuscar)
			throws Exception {
		
		logger.info("entrando listarReporteCompras.......");
		
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_FEC_INICIO, fechaInicio);
        params.put(Constante.PARAM_SP_FEC_FIN, fechaFin);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        
        logger.info("params ===>" + params);
        
        List<HashMap> listaCompras = reporteMapper.obtenerDetalleReporteCompras(params);
        
        logger.info("listaCompras ===> " + listaCompras);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarDataCatalogoLike ===> "+ listaCompras.toString());
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
        
		return listaCompras;		
	}*/

	
	
}
