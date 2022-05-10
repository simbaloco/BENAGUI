package pe.gob.repuestera.serviceImpl.venta.ordenventa;

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
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;
import pe.gob.repuestera.repository.venta.ordenventa.OrdenVentaMapper;
import pe.gob.repuestera.service.venta.guiaremision.GuiaRemisionVentaService;
import pe.gob.repuestera.service.venta.ordenventa.OrdenVentaService;
import pe.gob.repuestera.serviceImpl.compra.ordencompra.OrdenCompraServiceImpl;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;


@Service
public class OrdenVentaServiceImpl implements OrdenVentaService{

	private static final Logger logger = LogManager.getLogger(OrdenCompraServiceImpl.class);

	@Autowired
	private OrdenVentaMapper ordenVentaMapper;
	@Autowired
	private GuiaRemisionVentaService guiaRemisionVentaService;
	
	@Autowired
	private JsonUtils jsonUtils;
	
	@Override
	public List<VentaCabModel> listarOrdenVenta(String datoBuscar, String nroOrdenVenta, String codRepuesto,
			String codEstado, String fechaDesde, String fechaHasta) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, nroOrdenVenta);
        params.put(Constante.PARAM_SP_COD_REPUESTO, codRepuesto);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
		params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
		params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);

		logger.info("params ===> " + params);

		List<VentaCabModel> listaCompraCabModel = ordenVentaMapper.listarOrdenVenta(params);
		
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
		
		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listaVentaCabModel ===> " + listaCompraCabModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listaCompraCabModel;
	}

	@Override
	public String registrarOrdenVenta(VentaCabModel ventaCabModel, String usuario) throws Exception {
		logger.info("compraCabModel ===> " + ventaCabModel.toString());
		logger.info("usuario ===> " + usuario);

		String dataJSON = jsonUtils.obtenerJson(ventaCabModel.getDetalle());

		logger.info("List<CompraDetModel> ===> " + dataJSON);

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_CLIENTE, ventaCabModel.getCodigoCliente());
		params.put(Constante.PARAM_SP_NRO_COTIZ_VENTA, ventaCabModel.getNroCotizVenta());
		params.put(Constante.PARAM_SP_USUARIO, usuario);
		params.put(Constante.PARAM_SP_DIR_DESPACHO, ventaCabModel.getDireccionDespacho());
		params.put(Constante.PARAM_SP_PER_CONTACTO, ventaCabModel.getPersonaContacto());
		params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, ventaCabModel.getFechaContabilizacion());
		params.put(Constante.PARAM_SP_FEC_VALIDO_HASTA, ventaCabModel.getFechaValidoHasta());
		params.put(Constante.PARAM_SP_FEC_ENTREGA, ventaCabModel.getFechaEntrega());
		params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, ventaCabModel.getCodigoTipoMoneda());
		params.put(Constante.PARAM_SP_COD_COND_PAGO, ventaCabModel.getCodigoCondPago());
		params.put(Constante.PARAM_SP_COD_DIAS, ventaCabModel.getCodigoDias());
		params.put(Constante.PARAM_SP_COD_ESTADO, ventaCabModel.getCodigoEstado());
		params.put(Constante.PARAM_SP_TIPO_CAMBIO, ventaCabModel.getTipoCambio());
		params.put(Constante.PARAM_SP_OBSERVACIONES, ventaCabModel.getObservaciones());
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO_REF, ventaCabModel.getNumeroDocumentoRef());
		params.put(Constante.PARAM_SP_PORC_DCTO_TOTAL, ventaCabModel.getPorcDctoTotal());
		params.put(Constante.PARAM_SP_SUB_TOTAL, ventaCabModel.getSubTotal());
		params.put(Constante.PARAM_SP_DCTO, ventaCabModel.getDescuento());
		params.put(Constante.PARAM_SP_IGV, ventaCabModel.getIgv());
		params.put(Constante.PARAM_SP_TOTAL, ventaCabModel.getTotal());		
		params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

		logger.info("params ===> " + params);

		ordenVentaMapper.registrarOrdenVenta(params);

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

	public VentaCabModel buscarOrdenVentaCab(String numeroDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		VentaCabModel ventaCabModel = ordenVentaMapper.buscarOrdenVentaCab(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("compraCabModel ===> " + ventaCabModel.toString());
			
			try {
                List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionVentaService.listarGuiaRemisionVentaPorOrdenVenta(ventaCabModel.getNumeroDocumento());
                ventaCabModel.setCantidadGrAsociadas(listGuiaRemisionCabModel.size());

            } catch (Exception e) {
                StringWriter printStackTrace = new StringWriter();
                e.printStackTrace(new PrintWriter(printStackTrace));
                logger.info("No se tienen GR asociadas ===> " + printStackTrace.toString());
                ventaCabModel.setCantidadGrAsociadas(0);
            }

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return ventaCabModel;
	}

	public List<VentaDetModel> buscarOrdenVentaDet(String numeroDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		List<VentaDetModel> listVentaDetModel = ordenVentaMapper.buscarOrdenVentaDet(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listCompraDetModel ===> " + listVentaDetModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listVentaDetModel;
	}
	
	public List<VentaDetModel> buscarOrdenVentaDetalleParaGuiaRemision(String numeroDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

		logger.info("params ===> " + params);

		List<VentaDetModel> listVentaDetModel = ordenVentaMapper.buscarOrdenVentaDet(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listVentaDetModel ===> " + listVentaDetModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);
			
		} else {
			throw new Exception(mensajeResultado);

		}

		return listVentaDetModel.stream()
				.filter(t -> t.getCantidadPendiente() > 0)
				.collect(Collectors.toList());
	}

	@Override
	public void actualizarOrdenVenta(VentaCabModel ventaCabModel, String usuario) throws Exception {
		// TODO Auto-generated method stub
		logger.info("ventaCabModel ===> " + ventaCabModel.toString());
		logger.info("usuario ===> " + usuario);
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, ventaCabModel.getNumeroDocumento());
		params.put(Constante.PARAM_SP_USUARIO, usuario);
		params.put(Constante.PARAM_SP_DIR_DESPACHO, ventaCabModel.getDireccionDespacho());
		params.put(Constante.PARAM_SP_PER_CONTACTO, ventaCabModel.getPersonaContacto());
		params.put(Constante.PARAM_SP_COD_ESTADO, ventaCabModel.getCodigoEstado());
		params.put(Constante.PARAM_SP_OBSERVACIONES, ventaCabModel.getObservaciones());
		params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, ventaCabModel.getFechaContabilizacion());
		params.put(Constante.PARAM_SP_FEC_VALIDO_HASTA, ventaCabModel.getFechaValidoHasta());
		params.put(Constante.PARAM_SP_FEC_ENTREGA, ventaCabModel.getFechaEntrega());
		
		logger.info("params ===> " + params);

		ordenVentaMapper.actualizarOrdenVenta(params);

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

	public void anularOrdenVenta(VentaCabModel ventaCabModel, String usuario) throws Exception {

        logger.info("ventaCabModel ===> " + ventaCabModel.toString());

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, ventaCabModel.getNumeroDocumento());
        params.put(Constante.PARAM_SP_OBSERVACIONES, ventaCabModel.getObservaciones());

        logger.info("params ===> " + params);

        ordenVentaMapper.anularOrdenVenta(params);

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
