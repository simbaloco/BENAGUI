package pe.gob.repuestera.service.impl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.controlador.rest.maestros.UsuarioRestController;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.repository.maestros.UsuarioMapper;
import pe.gob.repuestera.service.maestros.UsuarioService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.Dummy;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	private static final Logger logger = LogManager.getLogger(UsuarioRestController.class);

	@Autowired
	private UsuarioMapper usuarioMapper;
	
	@Override
	public List<UsuarioModel> listarUsuarios(String datoBuscar, int idPerfil) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		params.put(Constante.PARAM_SP_ID_PERFIL, idPerfil);
		
		logger.info("params ===> " + params);

		List<UsuarioModel> usuarioList = usuarioMapper.listarUsuarios(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarUsuarios ===> " + usuarioList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return usuarioList;
	}
	
	@Override
	public void registrarUsuario(UsuarioModel perfilModel, String usuario) throws Exception {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(4);
				
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_OPCION, perfilModel.getOpcion());
		params.put(Constante.PARAM_SP_USERNAME, perfilModel.getUsername());
		params.put(Constante.PARAM_SP_PASSWORD, bCryptPasswordEncoder.encode(perfilModel.getPassword()));
		params.put(Constante.PARAM_SP_NOMBRES, perfilModel.getNombres());
		params.put(Constante.PARAM_SP_APELLIDO_PATERNO, perfilModel.getApePaterno());
		params.put(Constante.PARAM_SP_APELLIDO_MATERNO, perfilModel.getApeMaterno());
		params.put(Constante.PARAM_SP_ACTIVO, perfilModel.getActivo());
		params.put(Constante.PARAM_SP_PERFILES, perfilModel.getPerfiles());
		params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);

		logger.info("params ===> " + params);

		usuarioMapper.registrarUsuario(params);

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
	public UsuarioModel buscarUsuario(String username) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_USERNAME, username);

		logger.info("params ===> " + params);

		UsuarioModel usuarioModel = usuarioMapper.buscarUsuario(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarUsuario ===> " + usuarioModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return usuarioModel;
		
	}
	

}
