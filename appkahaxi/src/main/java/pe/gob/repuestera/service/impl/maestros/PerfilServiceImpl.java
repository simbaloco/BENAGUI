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
import pe.gob.repuestera.model.PerfilModel;
import pe.gob.repuestera.repository.maestros.PerfilMapper;
import pe.gob.repuestera.service.maestros.PerfilService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class PerfilServiceImpl implements PerfilService {

	private static final Logger logger = LogManager.getLogger(PerfilRestController.class);

	@Autowired
	private PerfilMapper perfilMapper;
	@Autowired
	private JsonUtils jsonUtils;
	
	@Override
	public List<PerfilModel> listarPerfiles(String datoBuscar) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		
		logger.info("params ===> " + params);

		List<PerfilModel> perfilList = perfilMapper.listarPerfiles(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarPerfiles ===> " + perfilList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return perfilList;
	}
	
	@Override
	public void registrarPerfil(PerfilModel perfilModel, String usuario) throws Exception {
				
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_PERFIL, perfilModel.getIdPerfil());
		params.put(Constante.PARAM_SP_IDENTIFICADOR, perfilModel.getIdentificador());
		params.put(Constante.PARAM_SP_MENU, perfilModel.getMenu());
		params.put(Constante.PARAM_SP_ACTIVO, perfilModel.getActivo());
		params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);

		logger.info("params ===> " + params);

		perfilMapper.registrarPerfil(params);

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
	public PerfilModel buscarPerfil(String idPerfil) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_ID_PERFIL, idPerfil);

		logger.info("params ===> " + params);

		PerfilModel perfilModel = perfilMapper.buscarPerfil(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarPerfil ===> " + perfilModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return perfilModel;
		
	}

	@Override
	public List<PerfilModel> cargarPerfilUsuario(String username) throws Exception {
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_USERNAME, username);
		
		logger.info("params ===> " + params);
		
		List<PerfilModel> perfilList = perfilMapper.cargarPerfilUsuario(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("cargarPerfilUsuario ===> " + perfilList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return perfilList;
	}
	

}
