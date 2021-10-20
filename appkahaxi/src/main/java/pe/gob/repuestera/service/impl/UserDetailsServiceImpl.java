package pe.gob.repuestera.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.exception.RepuesteraException;
import pe.gob.repuestera.model.AutorizacionModel;
import pe.gob.repuestera.model.UsuarioDetails;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.repository.LoginMapper;
import pe.gob.repuestera.util.Constante;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final Logger logger = LogManager.getLogger(UserDetailsServiceImpl.class);
	
	@Autowired
	private LoginMapper loginMapper;
	@Autowired
    HttpSession session;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return buscarUsuario(username);
	}
	
	private UsuarioDetails buscarUsuario(String username) {
		Map<String, Object> params = new HashMap();
		List grantList = new ArrayList();
		// seteando par·metros
		params.put(Constante.PARAM_SP_USERNAME, username);
		// ********************* obteniendo el usuario *****************************************
		UsuarioModel usuarioModel = loginMapper.buscarUsuario(params);
		// evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("buscarUsuario.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("buscarUsuario.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		if(!flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			// HUBIERON ERRORES
 			logger.info("buscarUsuario ----> exception: "+ mensajeResultado);
			throw new RepuesteraException(HttpStatus.BAD_REQUEST, mensajeResultado);
 		}else {
 			logger.info("buscarUsuario ----> success!!! usuario: " + usuarioModel);
			// ***************************** cargando las autorizaciones *****************************
 			grantList = buscarAutorizaciones(username);
 		}
		session.setAttribute("usuarioLogueado", usuarioModel);
 		return new UsuarioDetails(usuarioModel, grantList);
	}
	
	private List buscarAutorizaciones(String username){
		Map<String, Object> params = new HashMap();
		List grantList = new ArrayList();
		// seteando par·metros
		params.put(Constante.PARAM_SP_USERNAME, username);
		// obteniendo las autorizaciones seg√∫n el usuario
		List<AutorizacionModel> listaAutorizaciones = loginMapper.buscarAutorizacion(params);
		// evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("buscarAutorizaciones.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("buscarAutorizaciones.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		if(!flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			// HUBIERON ERRORES
 			logger.info("buscarAutorizaciones ----> exception: "+ mensajeResultado);
			throw new RepuesteraException(HttpStatus.BAD_REQUEST, mensajeResultado);
 		}else {
 			logger.info("buscarAutorizaciones ----> success!!! listaAutorizaciones: " + listaAutorizaciones);
			// ***************************** cargando las autorizaciones *****************************
 			for (AutorizacionModel autorizacionModel: listaAutorizaciones) {
 		        // ROLE_USER, ROLE_ADMIN,..
 		        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(autorizacionModel.getAuthority());
 		        grantList.add(grantedAuthority);
 		    }
 		}
 		
	    return grantList;
	}
}
