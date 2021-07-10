package pe.gob.repuestera.service.impl.venta;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;
import pe.gob.repuestera.repository.venta.CotizacionVentaMapper;
import pe.gob.repuestera.service.venta.CotizacionVentaService;
import pe.gob.repuestera.util.Constante;

@Service
public class CotizacionVentaServiceImpl implements CotizacionVentaService{

	private static final Logger logger = LogManager.getLogger(CotizacionVentaServiceImpl.class);
	
	@Autowired
	private CotizacionVentaMapper cotizacionVentaMapper;

	@Override
	public List<VentaCabModel> listarCotizacionesVenta(String datoBuscar, String nroCotizacion, String nroRequerimiento, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception{
		
		logger.info("entrando listarCotizacionesVenta.......");
        List<VentaCabModel> listaCotizacionVenta = null;
        
        logger.info("datoBuscar--->" + datoBuscar);
        logger.info("nroCotizacion--->" + nroCotizacion);
        logger.info("nroRequerimiento--->" + nroRequerimiento);
        logger.info("codRepuesto--->" + codRepuesto);
        logger.info("codEstado--->" + codEstado);
        logger.info("fechaDesde--->" + fechaDesde);
        logger.info("fechaHasta--->" + fechaHasta);            
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, nroCotizacion);
        params.put(Constante.PARAM_SP_NRO_REQUERIMIENTO, nroRequerimiento);
        params.put(Constante.PARAM_SP_COD_REPUESTO, codRepuesto);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
        params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
        params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);
        // ejecutando la query
        listaCotizacionVenta = cotizacionVentaMapper.listarCotizacionesVenta(params);
        logger.info("listarCotizacionesVenta........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("listarCotizacionesVenta.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("listarCotizacionesVenta.......MENSAJE_RESULTADO--->" + mensajeResultado);
        // evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("listarCotizacionesVenta ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return listaCotizacionVenta;
	}

	@Override
	public VentaCabModel buscarCotizacionVenta(String numeroDocumento) throws Exception{
		
		logger.info("entrando buscarCotizacionVenta.......");
        VentaCabModel ventaCabModel;
        List<VentaDetModel> ventaDetModel = null;            
        logger.info("numeroDocumento--->" + numeroDocumento);
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);
        // ejcutando la query
        ventaCabModel = cotizacionVentaMapper.buscarCotizacionVentaCab(params);
        logger.info("buscarCotizacionVenta........obteniendo el retorno de CABECERA");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("buscarCotizacionVentaCab.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("buscarCotizacionVentaCab.......MENSAJE_RESULTADO--->" + mensajeResultado);
        // evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarCotizacionVenta ----> ventaCabModel: "+ ventaCabModel);
			// si no hubieron errores al traer la cabecera, traemos el detalle
			ventaDetModel = cotizacionVentaMapper.buscarCotizacionVentaDet(params);
			logger.info("buscarCotizacionVenta........obteniendo el retorno de DETALLE");		
            flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
            mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
            logger.info("buscarCotizacionVenta ----> ventaDetModel: "+ ventaDetModel);
            logger.info("buscarCotizacionVentaDet.......FLAG_RESULTADO------>" + flagResultado);
    		logger.info("buscarCotizacionVentaDet.......MENSAJE_RESULTADO--->" + mensajeResultado);

    		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
    			ventaCabModel.setDetalle(ventaDetModel);
    			
    			logger.info("buscarCotizacionVenta ----> success!!!");
    		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
    			throw new ErrorControladoException(mensajeResultado);

    		} else {
    			throw new Exception(mensajeResultado);

    		}
		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return ventaCabModel;	
	}
	
	@Override
	public String registrarCotizacionVenta(VentaCabModel registro, String usuario) throws Exception {
		logger.info("entrando registrarCotizacionVenta.......");
        logger.info("******* DATOS DE CABECERA--->" + registro);
    	// preparando para insertar en la CABECERA
    	logger.info("codigoCliente--->" + registro.getCodigoCliente());
    	logger.info("usuario--->" + usuario);
        logger.info("fechaContabilizacion--->" + registro.getFechaContabilizacion());
        logger.info("fechaValidoHasta--->" + registro.getFechaValidoHasta());
        logger.info("codigoTipoMoneda--->" + registro.getCodigoTipoMoneda());
        logger.info("codigoCondPago--->" + registro.getCodigoCondPago());
        logger.info("codigoDias--->" + registro.getCodigoDias());
        logger.info("codigoEstado--->" + registro.getCodigoEstado());
        logger.info("nro req--->" + registro.getNroRequerimiento());
        logger.info("asunto--->" + registro.getAsunto());
        logger.info("tipo de cambio--->" + registro.getTipoCambio());
        logger.info("observaciones--->" + registro.getObservaciones());
        logger.info("nro doc ref--->" + registro.getNumeroDocumentoRef());
        logger.info("porc dcto total--->" + registro.getPorcDctoTotal());
        logger.info("subtotal--->" + registro.getSubTotal());
        logger.info("dcto--->" + registro.getDescuento());
        logger.info("igv--->" + registro.getIgv());
        logger.info("total--->" + registro.getTotal());
        String dataJSON = (new Gson()).toJson(registro.getDetalle());
        logger.info("DETALLE---->" + dataJSON);        
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_CLIENTE, registro.getCodigoCliente());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, registro.getFechaContabilizacion());
        params.put(Constante.PARAM_SP_FEC_VALIDO_HASTA, registro.getFechaValidoHasta());
        params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, registro.getCodigoTipoMoneda());
        params.put(Constante.PARAM_SP_COD_COND_PAGO, registro.getCodigoCondPago());
        params.put(Constante.PARAM_SP_COD_DIAS, registro.getCodigoDias());
        params.put(Constante.PARAM_SP_COD_ESTADO, registro.getCodigoEstado());
        params.put(Constante.PARAM_SP_NRO_REQUERIMIENTO, registro.getNroRequerimiento());
        params.put(Constante.PARAM_SP_ASUNTO, registro.getAsunto());
        params.put(Constante.PARAM_SP_TIPO_CAMBIO, registro.getTipoCambio());
        params.put(Constante.PARAM_SP_OBSERVACIONES, registro.getObservaciones());
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO_REF, registro.getNumeroDocumentoRef());
        params.put(Constante.PARAM_SP_PORC_DCTO_TOTAL, registro.getPorcDctoTotal());
        params.put(Constante.PARAM_SP_SUB_TOTAL, registro.getSubTotal());
        params.put(Constante.PARAM_SP_DCTO, registro.getDescuento());
        params.put(Constante.PARAM_SP_IGV, registro.getIgv());
        params.put(Constante.PARAM_SP_TOTAL, registro.getTotal());
        params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);
        // REGISTRANDO COTIZACION DE VENTA
        cotizacionVentaMapper.registrarCotizacionVenta(params);
        // evaluando el retorno
        logger.info("registrarCotizacionVenta........obteniendo el retorno");		
        String nroDocumento = (String) params.get(Constante.PARAM_SP_NRO_DOCUMENTO);
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("registrarCotizacionVenta.......nroDocumento------>" + nroDocumento);
		logger.info("registrarCotizacionVenta.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("registrarCotizacionVenta.......MENSAJE_RESULTADO--->" + mensajeResultado);
		// evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("registrarCotizacionVenta ----> success!!!");
 			return nroDocumento;

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
	}

	@Override
	public void actualizarCotizacionVenta(VentaCabModel registro, String usuario) throws Exception {
		logger.info("entrando actualizarCotizacionVenta.......");
        String nroDocumento = registro.getNumeroDocumento();
        // preparando para insertar en la CABECERA
    	logger.info("Nro documento--->" + nroDocumento);
    	logger.info("usuario--->" + usuario);
        logger.info("codigoEstado--->" + registro.getCodigoEstado());
        logger.info("observaciones--->" + registro.getObservaciones());
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, registro.getNumeroDocumento());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_COD_ESTADO, registro.getCodigoEstado());
        params.put(Constante.PARAM_SP_OBSERVACIONES, registro.getObservaciones());
        // REGISTRANDO COTIZACION DE VENTA
        cotizacionVentaMapper.actualizarCotizacionVenta(params);
        // evaluando el retorno
        logger.info("actualizarCotizacionVenta........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("actualizarCotizacionVenta.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("actualizarCotizacionVenta.......MENSAJE_RESULTADO--->" + mensajeResultado);
		// evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("actualizarCotizacionVenta ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
	}	
	
}
