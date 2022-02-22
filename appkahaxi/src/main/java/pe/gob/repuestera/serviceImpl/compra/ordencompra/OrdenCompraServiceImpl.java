package pe.gob.repuestera.serviceImpl.compra.ordencompra;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.repository.compra.ordencompra.OrdenCompraMapper;
import pe.gob.repuestera.service.compra.guiaremision.GuiaRemisionCompraService;
import pe.gob.repuestera.service.compra.ordencompra.OrdenCompraService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class OrdenCompraServiceImpl implements OrdenCompraService {

	private static final Logger logger = LogManager.getLogger(OrdenCompraServiceImpl.class);

	@Autowired
	private OrdenCompraMapper ordenCompraMapper;
	@Autowired
	private GuiaRemisionCompraService guiaRemisionCompraService;
	@Autowired
	private JsonUtils jsonUtils;

	public String registrarOrdenCompra(CompraCabModel compraCabModel, String usuario) throws Exception {

		logger.info("compraCabModel ===> " + compraCabModel.toString());
		logger.info("usuario ===> " + usuario);

		String dataJSON = jsonUtils.obtenerJson(compraCabModel.getDetalle());

		logger.info("List<CompraDetModel> ===> " + dataJSON);

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_PROV, compraCabModel.getCodigoProv());
		params.put(Constante.PARAM_SP_USUARIO, usuario);
		params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, compraCabModel.getFechaContabilizacion());
		params.put(Constante.PARAM_SP_FEC_VALIDO_HASTA, compraCabModel.getFechaValidoHasta());
		params.put(Constante.PARAM_SP_FEC_ENTREGA, compraCabModel.getFechaEntrega());
		params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, compraCabModel.getCodigoTipoMoneda());
		params.put(Constante.PARAM_SP_COD_COND_PAGO, compraCabModel.getCodigoCondPago());
		params.put(Constante.PARAM_SP_COD_DIAS, compraCabModel.getCodigoDias());
		params.put(Constante.PARAM_SP_COD_ESTADO, compraCabModel.getCodigoEstado());
		params.put(Constante.PARAM_SP_TIPO_CAMBIO, compraCabModel.getTipoCambio());
		params.put(Constante.PARAM_SP_OBSERVACIONES, compraCabModel.getObservaciones());
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO_REF, compraCabModel.getNumeroDocumentoRef());
		params.put(Constante.PARAM_SP_SUB_TOTAL, compraCabModel.getSubTotal());
		params.put(Constante.PARAM_SP_IGV, compraCabModel.getIgv());
		params.put(Constante.PARAM_SP_TOTAL, compraCabModel.getTotal());		
		params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

		logger.info("params ===> " + params);

		ordenCompraMapper.registrarOrdenCompra(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {

			String nroDocumento = (String) params.get(Constante.PARAM_SP_NRO_DOCUMENTO);
			return nroDocumento;

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

	}

	public List<CompraCabModel> listarOrdenCompra(String datoBuscar, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, nroOrdenCompra);
        params.put(Constante.PARAM_SP_COD_REPUESTO, codRepuesto);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
		params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
		params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);

		logger.info("params ===> " + params);

		List<CompraCabModel> listaCompraCabModel = ordenCompraMapper.listarOrdenCompra(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listaCompraCabModel ===> " + listaCompraCabModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listaCompraCabModel;
	}

	public CompraCabModel buscarOrdenCompraCab(String numeroDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		CompraCabModel compraCabModel = ordenCompraMapper.buscarOrdenCompraCab(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("compraCabModel ===> " + compraCabModel.toString());
			
			try {

                List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionCompraService.listarGuiaRemisionCompraPorOrdenCompra(numeroDocumento);
                compraCabModel.setCantidadGrAsociadas(listGuiaRemisionCabModel.size());

            } catch (Exception e) {
                StringWriter printStackTrace = new StringWriter();
                e.printStackTrace(new PrintWriter(printStackTrace));
                logger.info("No se tienen GR asociadas ===> " + printStackTrace.toString());
                compraCabModel.setCantidadGrAsociadas(0);
            }

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return compraCabModel;
	}

	public List<CompraDetModel> buscarOrdenCompraDet(String numeroDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		List<CompraDetModel> listCompraDetModel = ordenCompraMapper.buscarOrdenCompraDet(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listCompraDetModel ===> " + listCompraDetModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listCompraDetModel;
	}

	public List<CompraDetModel> buscarOrdenCompraDetalleParaGuiaRemision(String numeroDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		List<CompraDetModel> listCompraDetModel = ordenCompraMapper.buscarOrdenCompraDet(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listCompraDetModel ===> " + listCompraDetModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listCompraDetModel.stream()
				.filter(t -> t.getCantidadPendiente() > 0)
				.collect(Collectors.toList());
	}

	public void actualizarOrdenCompra(CompraCabModel compraCabModel, String usuario) throws Exception {

		logger.info("compraCabModel ===> " + compraCabModel.toString());
		logger.info("usuario ===> " + usuario);

		String dataJSON = jsonUtils.obtenerJson(compraCabModel.getDetalle());
		logger.info("List<CompraDetModel> ===> " + dataJSON);
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, compraCabModel.getNumeroDocumento());
		params.put(Constante.PARAM_SP_USUARIO, usuario);
		params.put(Constante.PARAM_SP_COD_ESTADO, compraCabModel.getCodigoEstado());
		params.put(Constante.PARAM_SP_OBSERVACIONES, compraCabModel.getObservaciones());
		params.put(Constante.PARAM_SP_NRO_SEGUIMIENTO, compraCabModel.getNroSeguimiento());
		params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, compraCabModel.getFechaContabilizacion());
		params.put(Constante.PARAM_SP_FEC_VALIDO_HASTA, compraCabModel.getFechaValidoHasta());
		params.put(Constante.PARAM_SP_FEC_ENTREGA, compraCabModel.getFechaEntrega());
		params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, compraCabModel.getCodigoTipoMoneda());
		params.put(Constante.PARAM_SP_COD_COND_PAGO, compraCabModel.getCodigoCondPago());
		params.put(Constante.PARAM_SP_COD_DIAS, compraCabModel.getCodigoDias());		
		params.put(Constante.PARAM_SP_TIPO_CAMBIO, compraCabModel.getTipoCambio());		
		params.put(Constante.PARAM_SP_SUB_TOTAL, compraCabModel.getSubTotal());
		params.put(Constante.PARAM_SP_IGV, compraCabModel.getIgv());
		params.put(Constante.PARAM_SP_TOTAL, compraCabModel.getTotal());		
		params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

		logger.info("params ===> " + params);

		ordenCompraMapper.actualizarOrdenCompra(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info(mensajeResultado);

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
	}
	
	public void actualizarEnvioOrdenCompra(String numeroDocumento, String usuario) throws Exception {

		logger.info("usuario ===> " + usuario);

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		ordenCompraMapper.actualizarEnvioOrdenCompra(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info(mensajeResultado);

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
	}

	public void eliminarOrdenCompra(String numeroDocumento, String usuario) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);
		params.put(Constante.PARAM_SP_USUARIO, usuario);

		logger.info("params ===> " + params);

		ordenCompraMapper.eliminarOrdenCompra(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info(mensajeResultado);

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
	}

}
