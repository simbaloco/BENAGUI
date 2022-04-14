package pe.gob.repuestera.serviceImpl.venta.ordenventa;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;
import pe.gob.repuestera.repository.compra.ordencompra.OrdenCompraMapper;
import pe.gob.repuestera.repository.venta.ordenventa.OrdenVentaMapper;
import pe.gob.repuestera.service.compra.guiaremision.GuiaRemisionCompraService;
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
	public String registrarOrdenVenta(VentaCabModel registro, String usuario) throws Exception {
		logger.info("compraCabModel ===> " + registro.toString());
		logger.info("usuario ===> " + usuario);

		String dataJSON = jsonUtils.obtenerJson(registro.getDetalle());

		logger.info("List<CompraDetModel> ===> " + dataJSON);

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_CLIENTE, registro.getCodigoCliente());
		params.put(Constante.PARAM_SP_NRO_COTIZ_VENTA, registro.getNroCotizVenta());
		params.put(Constante.PARAM_SP_USUARIO, usuario);
		params.put(Constante.PARAM_SP_DIR_DESPACHO, registro.getDireccionDespacho());
		params.put(Constante.PARAM_SP_PER_CONTACTO, registro.getPersonaContacto());
		params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, registro.getFechaContabilizacion());
		params.put(Constante.PARAM_SP_FEC_VALIDO_HASTA, registro.getFechaValidoHasta());
		params.put(Constante.PARAM_SP_FEC_ENTREGA, registro.getFechaEntrega());
		params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, registro.getCodigoTipoMoneda());
		params.put(Constante.PARAM_SP_COD_COND_PAGO, registro.getCodigoCondPago());
		params.put(Constante.PARAM_SP_COD_DIAS, registro.getCodigoDias());
		params.put(Constante.PARAM_SP_COD_ESTADO, registro.getCodigoEstado());
		params.put(Constante.PARAM_SP_TIPO_CAMBIO, registro.getTipoCambio());
		params.put(Constante.PARAM_SP_OBSERVACIONES, registro.getObservaciones());
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO_REF, registro.getNumeroDocumentoRef());
		params.put(Constante.PARAM_SP_PORC_DCTO_TOTAL, registro.getPorcDctoTotal());
		params.put(Constante.PARAM_SP_SUB_TOTAL, registro.getSubTotal());
		params.put(Constante.PARAM_SP_DCTO, registro.getDescuento());
		params.put(Constante.PARAM_SP_IGV, registro.getIgv());
		params.put(Constante.PARAM_SP_TOTAL, registro.getTotal());		
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

	@Override
	public VentaCabModel buscarOrdenVentaCab(String numeroDocumento) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<VentaDetModel> buscarOrdenVentaDet(String numeroDocumento) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<VentaDetModel> buscarOrdenVentaDetalleParaGuiaRemision(String numeroDocumento) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void actualizarOrdenVenta(VentaCabModel registro, String usuario) throws Exception {
		// TODO Auto-generated method stub
		
	}

	
}
