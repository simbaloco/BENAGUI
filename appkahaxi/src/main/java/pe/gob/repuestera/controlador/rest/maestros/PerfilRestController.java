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
import pe.gob.repuestera.util.Constante;

@RestController
public class PerfilRestController {

	private static final Logger logger = LogManager.getLogger(PerfilRestController.class);
	
	@Autowired
	PerfilService perfilService;
	@Autowired
    HttpSession session;
	
	@GetMapping ("/listarPerfiles")
    public ResponseEntity<List<PerfilModel>> listarPerfiles(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar) throws Exception {
        
        	logger.info("Inicio listarPerfiles.......");
            
            List<PerfilModel> perfilList = perfilService.listarPerfiles(datoBuscar);
            
            logger.info("Fin listarPerfiles.......");

            return new ResponseEntity<>(perfilList, HttpStatus.OK);     
    }
		
	@PostMapping ("/registrarPerfil")
	public ResponseEntity<String> registrarPerfil(@RequestPart("registro") PerfilModel perfilModel) throws Exception {
				
		logger.info("Inicio registrarPerfil.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        
        perfilService.registrarPerfil(perfilModel, usuario);
                
        logger.info("Fin registrarPerfil.......");

        return new ResponseEntity<>(HttpStatus.OK);
        
    }
	
	@GetMapping ("/buscarPerfil/{idPerfil}")
    public ResponseEntity<PerfilModel> buscarPerfil(@PathVariable(Constante.PARAM_ID_PERFIL) String idPerfil) throws Exception {
		
		logger.info("Inicio buscarPerfil......." + idPerfil);
		
		PerfilModel perfilModel = perfilService.buscarPerfil(idPerfil);
		
        logger.info("Fin buscarPerfil.......");
        
        return new ResponseEntity<>(perfilModel, HttpStatus.OK);
        
	}
	

	
}
