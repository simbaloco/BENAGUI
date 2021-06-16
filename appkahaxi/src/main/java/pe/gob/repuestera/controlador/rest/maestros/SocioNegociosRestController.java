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

import pe.gob.repuestera.model.ArticuloModel;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;
import pe.gob.repuestera.model.SocioNegociosContactoModel;
import pe.gob.repuestera.model.SocioNegociosModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.SocioNegociosService;
import pe.gob.repuestera.util.Constante;

@RestController
public class SocioNegociosRestController {

	private static final Logger logger = LogManager.getLogger(SocioNegociosRestController.class);
	
	@Autowired
	SocioNegociosService socioNegociosService;
	@Autowired
	HttpSession session;
	
	@GetMapping ("/buscarSnLike/{tipoSn}/{datoBuscar}")
    public ResponseEntity<List<SocioNegociosModel>> buscarSnLike(@PathVariable(Constante.PARAM_TIPO_SN) String tipoSn, 
    												@PathVariable(Constante.PARAM_DATO_BUSCAR) String datoBuscar) throws Exception {
        
		logger.info("Inicio buscarSnLike.......");
        
        List<SocioNegociosModel> socioNegocioList = socioNegociosService.buscarSnLike(tipoSn, datoBuscar);
        
        logger.info("Fin buscarSnLike.......");

        return new ResponseEntity<>(socioNegocioList, HttpStatus.OK);     
        
    }
	
	@GetMapping ("/listarSocioNegocio")
    public ResponseEntity<List<SocioNegociosModel>> listarSocioNegocio(@RequestParam(Constante.PARAM_TIPO_SN) String tipoSocioNegocio, 
    														   @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
    														   @RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDocumento) throws Exception {
        
        	logger.info("Inicio listarSocioNegocio.......");
            
            List<SocioNegociosModel> socioNegocioList = socioNegociosService.listarSocioNegocio(tipoSocioNegocio, datoBuscar, tipoDocumento);
            
            logger.info("Fin listarSocioNegocio.......");

            return new ResponseEntity<>(socioNegocioList, HttpStatus.OK);     
    }
	
	@PostMapping ("/registrarSocioNegocio")
	public ResponseEntity<String> registrarSocioNegocio(@RequestPart("registro") SocioNegociosModel socioNegModel) throws Exception {
		
		logger.info("Inicio registrarSocioNegocio.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
		
        socioNegociosService.registrarSocioNegocio(socioNegModel, usuario);
       
        logger.info("Fin registrarSocioNegocio.......");

        return new ResponseEntity<>(HttpStatus.OK);
        
    }
	
	@GetMapping ("/buscarSocioNegocio/{codigoSocio}")
    public ResponseEntity<SocioNegociosModel> buscarSocioNegocio(@PathVariable(Constante.PARAM_COD_SOCIONEGOCIO) String codigoSn) throws Exception {
		
		logger.info("Inicio buscarSocioNegocio......." + codigoSn);

		SocioNegociosModel socioNegocioModel = socioNegociosService.buscarSocioNegocio(codigoSn);

        List<SocioNegociosContactoModel> listContactosModel = socioNegociosService.buscarSocioNegocioContacto(codigoSn);

        socioNegocioModel.setDetalle(listContactosModel);

        logger.info("Fin buscarSocioNegocio.......");

        return new ResponseEntity<>(socioNegocioModel, HttpStatus.OK);
        
	}
		
	
}
