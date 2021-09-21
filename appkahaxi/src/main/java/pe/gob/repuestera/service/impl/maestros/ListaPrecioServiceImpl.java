package pe.gob.repuestera.service.impl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.controlador.rest.maestros.PerfilRestController;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.ListaPreciosDetModel;
import pe.gob.repuestera.model.ListaPreciosModel;
import pe.gob.repuestera.repository.maestros.ListaPrecioMapper;
import pe.gob.repuestera.service.maestros.ListaPrecioService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class ListaPrecioServiceImpl implements ListaPrecioService {

	private static final Logger logger = LogManager.getLogger(PerfilRestController.class);

	@Autowired
	private ListaPrecioMapper listaPrecioMapper;
	@Autowired
	private JsonUtils jsonUtils;
	
	@Override
	public List<ListaPreciosModel> listarListaPrecio(String datoBuscar) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		
		logger.info("params ===> " + params);

		List<ListaPreciosModel> listaPrecioList = listaPrecioMapper.listarListaPrecio(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listaPrecioList ===> " + listaPrecioList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listaPrecioList;
	}
	
	@Override
	public ListaPreciosModel buscarListaPrecio(int idListaPrecio) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_LISTA_PRECIO, idListaPrecio);

		logger.info("params ===> " + params);

		ListaPreciosModel listaPrecioModel = listaPrecioMapper.buscarListaPrecio(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("ListaPreciosModel ===> " + listaPrecioModel.toString());			

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listaPrecioModel;
	}
	
	@Override
	public List<ListaPreciosDetModel> buscarListaPrecioDet(int idListaPrecio) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_LISTA_PRECIO, idListaPrecio);

		logger.info("params ===> " + params);

		List<ListaPreciosDetModel> listaPrecioDetModel = listaPrecioMapper.buscarListaPrecioDet(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listaPrecioDetModel ===> " + listaPrecioDetModel.toString());			

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return listaPrecioDetModel;
	}
	
	@Override
	public void registrarListaPrecio(ListaPreciosModel listaPrecioModel, String usuario) throws Exception {
		
		logger.info("listaPrecioModel ===> " + listaPrecioModel.toString());
		logger.info("usuario ===> " + usuario);

		String dataJSON = jsonUtils.obtenerJson(listaPrecioModel.getDetalle());

		logger.info("List<ListaPreciosDetModel> ===> " + dataJSON);

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_LISTA_PRECIO, listaPrecioModel.getIdListaPrecio());
		params.put(Constante.PARAM_SP_USUARIO, usuario);
		params.put(Constante.PARAM_SP_DESCRIPCION, listaPrecioModel.getDescripcion());
		params.put(Constante.PARAM_SP_COD_MONEDA, listaPrecioModel.getCodMoneda());
		params.put(Constante.PARAM_SP_ACTIVO, listaPrecioModel.getActivo());
		params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

		logger.info("params ===> " + params);

		listaPrecioMapper.registrarListaPrecio(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("registrarListaPrecio ===> "+ listaPrecioModel.getIdListaPrecio());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		
	}


}
