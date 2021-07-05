package pe.gob.repuestera.controlador.rest.maestros;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.repuestera.model.PerfilModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.PerfilService;
import pe.gob.repuestera.service.maestros.UsuarioService;
import pe.gob.repuestera.util.Constante;

@RestController
public class UsuarioRestController {

	private static final Logger logger = LogManager.getLogger(UsuarioRestController.class);
	
	@Autowired
	UsuarioService usuarioService;
	@Autowired
	PerfilService perfilService;
	@Autowired
    HttpSession session;
	
	@GetMapping ("/listarUsuarios")
    public ResponseEntity<List<UsuarioModel>> listarUsuarios(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
    														@RequestParam(Constante.PARAM_ID_PERFIL) int idPerfil) throws Exception {
        
        	logger.info("Inicio listarUsuarios.......");
            
            List<UsuarioModel> usuarioList = usuarioService.listarUsuarios(datoBuscar, idPerfil);
            
            logger.info("Fin listarUsuarios.......");

            return new ResponseEntity<>(usuarioList, HttpStatus.OK);     
    }
		
	@PostMapping ("/registrarUsuario")
	public ResponseEntity<String> registrarUsuario(@RequestPart("registro") UsuarioModel usuarioModel) throws Exception {
				
		logger.info("Inicio registrarUsuario.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        
		usuarioService.registrarUsuario(usuarioModel, usuario);
                
        logger.info("Fin registrarUsuario.......");

        return new ResponseEntity<>(HttpStatus.OK);
        
    }
	
	@GetMapping ("/buscarUsuarioUsername/{username}")
    public ResponseEntity<UsuarioModel> buscarUsuario(@PathVariable(Constante.PARAM_USERNAME) String username) throws Exception {
		
		logger.info("Inicio buscarUsuario......." + username);
		
		UsuarioModel usuarioModel = usuarioService.buscarUsuario(username);
		
        logger.info("Fin buscarUsuario.......");
        
        return new ResponseEntity<>(usuarioModel, HttpStatus.OK);
        
	}
	

	@GetMapping ("/cargarPerfilUsuario")
	public ResponseEntity<List<PerfilModel>> cargarPerfilUsuario(@RequestParam(Constante.PARAM_USERNAME) String username) throws Exception {
        
    	logger.info("Inicio cargarPerfilUsuario.......");
        
        List<PerfilModel> perfilList = perfilService.cargarPerfilUsuario(username);
        
        logger.info("Fin cargarPerfilUsuario.......");

        return new ResponseEntity<>(perfilList, HttpStatus.OK);     
	}

	
}
