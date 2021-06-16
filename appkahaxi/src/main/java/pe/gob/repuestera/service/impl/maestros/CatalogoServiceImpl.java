package pe.gob.repuestera.service.impl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CatalogoModel;
import pe.gob.repuestera.repository.maestros.CatalogoMapper;
import pe.gob.repuestera.service.impl.compra.OrdenCompraServiceImpl;
import pe.gob.repuestera.service.maestros.CatalogoService;
import pe.gob.repuestera.util.Constante;


@Service
public class CatalogoServiceImpl implements CatalogoService {
	
	private static final Logger logger = LogManager.getLogger(OrdenCompraServiceImpl.class);
	
	@Autowired
	private CatalogoMapper catalogoMapper;
	
	
	@Override
	public String buscarIgv(String codMaestro) throws Exception {
		
		Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
        
        logger.info("params ===> " + params);
        
        String igv = catalogoMapper.buscarIgv(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarIgv ----> igv: "+ igv);
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
        
		return igv;
	}

	@Override
	public void modificarIgv(String igv, String usuario) throws Exception {
		
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_MAESTRO, Constante.CATALOGO_IGV);
        params.put(Constante.PARAM_SP_IGV, igv);
        params.put(Constante.PARAM_SP_USUARIO_MODIFICA, usuario);
        
        logger.info("params ===> " + params);
        
        catalogoMapper.modificarIgv(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("modificarIgv ----> igv: "+ igv);
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
	}

	@Override
	public List<CatalogoModel> buscarDataCatalogoLike(String codMaestro, String codCatalogoPadre, String codDataPadre, String datoCliente) throws Exception {
				
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
        params.put(Constante.PARAM_SP_COD_CATALOGO_PADRE, codCatalogoPadre);
        params.put(Constante.PARAM_SP_COD_DATA_PADRE, codDataPadre);
        params.put(Constante.PARAM_SP_DATO_CLIENTE, datoCliente);
                
        logger.info("params ===>" + params);
        
        List<CatalogoModel> listDataCatalogo = catalogoMapper.buscarDataCatalogoLike(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarDataCatalogoLike ===> "+ listDataCatalogo.toString());
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
        
		return listDataCatalogo;		
	}
	
	@Override
	public CatalogoModel buscarDataCatalogo(String codMaestro, int codDataCatalogo) throws Exception {
		
		Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_ID_DATA_CATALOGO, codDataCatalogo);
        params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
        
        logger.info("params ===>" + params);
        
        CatalogoModel dataCatalogo = catalogoMapper.buscarDataCatalogo(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarDataCatalogo ===> "+ dataCatalogo.toString());
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
        
		return dataCatalogo;        
	}

	@Override
	public void registrarDataCatalogo(CatalogoModel registro, String usuario) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_DATA_CATALOGO, registro.getIdDataCatalogo());
        params.put(Constante.PARAM_SP_COD_MAESTRO, registro.getCodMaestro());
        params.put(Constante.PARAM_SP_COD_DATA, registro.getCodData());
        params.put(Constante.PARAM_SP_DESC_DATA, registro.getDescData());
        params.put(Constante.PARAM_SP_COD_CATALOGO_PADRE, registro.getCodCatalogoPadre());
        params.put(Constante.PARAM_SP_COD_DATA_PADRE, registro.getCodDataPadre());
        params.put(Constante.PARAM_SP_FLG_SUNAT, registro.getFlagSunat());
        params.put(Constante.PARAM_SP_ACTIVO, registro.getActivo());
        params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);
        
        catalogoMapper.registrarDataCatalogo(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("registrarDataCatalogo ===> "+ registro.getCodData());
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);
			
		} else {
			throw new Exception(mensajeResultado);
		}
		
	}

	@Override
	public void modificarDataCatalogo(CatalogoModel registro, String usuario) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_DATA_CATALOGO, registro.getIdDataCatalogo());
        params.put(Constante.PARAM_SP_COD_MAESTRO, registro.getCodMaestro());
        params.put(Constante.PARAM_SP_COD_DATA, registro.getCodData());
        params.put(Constante.PARAM_SP_DESC_DATA, registro.getDescData());
        params.put(Constante.PARAM_SP_COD_CATALOGO_PADRE, registro.getCodCatalogoPadre());
        params.put(Constante.PARAM_SP_COD_DATA_PADRE, registro.getCodDataPadre());
        params.put(Constante.PARAM_SP_ACTIVO, registro.getActivo());
        params.put(Constante.PARAM_SP_USUARIO_MODIFICA, usuario);
        
        catalogoMapper.modificarDataCatalogo(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("modificarDataCatalogo ===> "+ registro.getCodData());
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);
			
		} else {
			throw new Exception(mensajeResultado);
		}
		
	}

	@Override
	public Integer buscarFlagSunat(String codMaestro) throws Exception {
		
		Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
        
        logger.info("params ===>" + params);
        
        Integer flagSunat = catalogoMapper.buscarFlagSunat(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        
        logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarFlagSunat ===> "+ flagSunat);
			
		}else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
        
		return flagSunat; 
		
	}

		

}
