package pe.gob.repuestera.serviceImpl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.controlador.rest.maestros.ArticuloRestController;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;
import pe.gob.repuestera.model.ParametrosGeneralesModel;
import pe.gob.repuestera.model.SocioNegociosContactoModel;
import pe.gob.repuestera.model.SocioNegociosModel;
import pe.gob.repuestera.repository.maestros.SocioNegociosMapper;
import pe.gob.repuestera.service.maestros.SocioNegociosService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class SocioNegociosServiceImpl implements SocioNegociosService{
	
	private static final Logger logger = LogManager.getLogger(ArticuloRestController.class);
	
	@Autowired
	private SocioNegociosMapper socioNegociosMapper;
	@Autowired
	private JsonUtils jsonUtils;
	
	@Override
	public List<SocioNegociosModel> buscarSnLike(String tipoSn, String datoBuscar) throws Exception{
		
		Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_TIPO_SN, tipoSn);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        
        logger.info("params ===> " + params);
		        
        List<SocioNegociosModel> socioNegocioList = socioNegociosMapper.buscarSnLike(params);
		
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarArticulos ===> " + socioNegocioList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
		return socioNegocioList;
	}

	@Override
	public List<SocioNegociosModel> listarSocioNegocio(String tipoSocioNegocio, String datoBuscar, String tipoDoc)
			throws Exception {
		
		Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_TIPO_SN, tipoSocioNegocio);
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_TIPO_DOCUMENTO, tipoDoc);
        
        logger.info("params ===> " + params);
		
        List<SocioNegociosModel> socioNegocioList = socioNegociosMapper.listarSocioNegocio(params);
		
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarArticulos ===> " + socioNegocioList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
		
		return socioNegocioList;
	}

	@Override
	public void registrarSocioNegocio(SocioNegociosModel socioNegocioModel, String usuario) throws Exception {

		logger.info("SocioNegocioCabModel ===> " + socioNegocioModel.toString());
		logger.info("usuario ===> " + usuario);

		List<ParametrosGeneralesModel> lista;
		
		String dataJSON = jsonUtils.obtenerJson(socioNegocioModel.getDetalle());
		
		logger.info("List<ContactoSNModel> ===> " + dataJSON);
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_SOCIONEGOCIO, socioNegocioModel.getCodigoSocio());
		params.put(Constante.PARAM_SP_PREFIJO, socioNegocioModel.getPrefijo());
		params.put(Constante.PARAM_SP_COD_TIPO_SOCIO, socioNegocioModel.getCodigoTipoSocio());
		params.put(Constante.PARAM_SP_COD_TIPO_DOCUMENTO, socioNegocioModel.getCodigoTipoDocumento());
		params.put(Constante.PARAM_SP_COD_TIPO_PERSONA, socioNegocioModel.getCodigoTipoPersona());
		params.put(Constante.PARAM_SP_NRO_DOCUMENTO, socioNegocioModel.getNumeroDocumento());
		params.put(Constante.PARAM_SP_RAZON_SOCIAL, socioNegocioModel.getRazonSocial());
		params.put(Constante.PARAM_SP_NOMBRES, socioNegocioModel.getNombres());
		params.put(Constante.PARAM_SP_APELLIDO_PATERNO, socioNegocioModel.getApePaterno());
		params.put(Constante.PARAM_SP_APELLIDO_MATERNO, socioNegocioModel.getApeMaterno());
		params.put(Constante.PARAM_SP_DIRECCION_FISCAL, socioNegocioModel.getDireccionFiscal());
		params.put(Constante.PARAM_SP_DIRECCION_DESPACHO1, socioNegocioModel.getDireccionDespacho());
		params.put(Constante.PARAM_SP_DIRECCION_DESPACHO2, socioNegocioModel.getDireccionDespacho2());
		params.put(Constante.PARAM_SP_DIRECCION_DESPACHO3, socioNegocioModel.getDireccionDespacho3());
		params.put(Constante.PARAM_SP_DIRECCION_DESPACHO4, socioNegocioModel.getDireccionDespacho4());
		params.put(Constante.PARAM_SP_DIRECCION_DESPACHO5, socioNegocioModel.getDireccionDespacho5());
		params.put(Constante.PARAM_SP_EMAIL, socioNegocioModel.getEmail());
		params.put(Constante.PARAM_SP_CELULAR, socioNegocioModel.getCelular());
		params.put(Constante.PARAM_SP_TELEFONO_FIJO, socioNegocioModel.getTelefonoFijo());
		params.put(Constante.PARAM_SP_COD_PAIS, socioNegocioModel.getCodigoPais());
		params.put(Constante.PARAM_SP_COD_DEPARTAMENTO, socioNegocioModel.getCodigoDepartamento());
		params.put(Constante.PARAM_SP_COD_PROVINCIA, socioNegocioModel.getCodigoProvincia());
		params.put(Constante.PARAM_SP_COD_DISTRITO, socioNegocioModel.getCodigoDistrito());
		params.put(Constante.PARAM_SP_UBIGEO, socioNegocioModel.getUbigeo());
		params.put(Constante.PARAM_SP_VENDEDOR, socioNegocioModel.getVendedor());
		params.put(Constante.PARAM_SP_COMENTARIOS, socioNegocioModel.getComentarios());
		params.put(Constante.PARAM_SP_COD_CONDICION_PAGO, socioNegocioModel.getCodigoCondicionPago());
		params.put(Constante.PARAM_SP_COD_DIAS, socioNegocioModel.getCodigoDiasCredito());
		params.put(Constante.PARAM_SP_LISTA_PRECIOS, socioNegocioModel.getListaPrecios());
		params.put(Constante.PARAM_SP_ACTIVO, socioNegocioModel.getActivo());
		params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);
		params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);
				
		logger.info("params ===> " + params);

		socioNegociosMapper.registrarSocioNegocio(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info(mensajeResultado);

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
		
	}

	@Override
	public SocioNegociosModel buscarSocioNegocio(String codigoSn) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_SOCIONEGOCIO, codigoSn);

		logger.info("params ===> " + params);

		SocioNegociosModel socioNegocioModel = socioNegociosMapper.buscarSocioNegocio(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("socioNegocioModel ===> " + socioNegocioModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return socioNegocioModel;
		
	}

	@Override
	public List<SocioNegociosContactoModel> buscarSocioNegocioContacto(String codigoSn) throws Exception {
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_SOCIONEGOCIO, codigoSn);

		logger.info("params ===> " + params);
		
		List<SocioNegociosContactoModel> listContactosModel = socioNegociosMapper.buscarSocioNegocioContacto(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listContactosModel ===> " + listContactosModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listContactosModel;
	}

	
}
