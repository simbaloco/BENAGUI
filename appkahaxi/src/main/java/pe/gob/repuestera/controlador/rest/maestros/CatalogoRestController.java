package pe.gob.repuestera.controlador.rest.maestros;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.repuestera.model.CatalogoModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.CatalogoService;
import pe.gob.repuestera.util.Constante;

@RestController
public class CatalogoRestController {
	
	private static final Logger logger = LogManager.getLogger(CatalogoRestController.class);
	
	@Autowired
	CatalogoService catalogoService;
	@Autowired
    HttpSession session;
	
	@GetMapping ("/buscarIgv")
	public ResponseEntity<String> buscarIgv() throws Exception {
		
		logger.info("Inicio buscarIgv ......");
		
        String igv = catalogoService.buscarIgv(Constante.CATALOGO_IGV);
        
        logger.info("Fin buscarIgv.......");
        
        return new ResponseEntity<String>(igv, HttpStatus.OK);  
        
    }
		
	@PostMapping ("/modificarIgv")
	public void modificarIgv(@RequestParam(Constante.PARAM_IGV) String igv) throws Exception {
		
		logger.info("Inicio modificarIgv ......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        catalogoService.modificarIgv(igv, usuario);
        
        logger.info("Fin modificarIgv.......");
                	
    }
	
	
	@GetMapping ("/buscarDataCatalogoLike/")
    public ResponseEntity<List<CatalogoModel>> buscarDataCatalogoLike(@RequestParam(Constante.PARAM_COD_MAESTRO_CONTROLLER) String codMaestro, 
    																	@RequestParam(Constante.PARAM_COD_CATALOGO_PADRE_CONTROLLER) String codCatalogoPadre,
    																	@RequestParam(Constante.PARAM_COD_DATA_PADRE_CONTROLLER) String codDataPadre,
    																	@RequestParam(Constante.PARAM_DATO_CLIENTE) String datoCliente) throws Exception {
        
		logger.info("Inicio buscarDataCatalogoLike ......");
		
		List<CatalogoModel> listDataCatalogo = catalogoService.buscarDataCatalogoLike(codMaestro, codCatalogoPadre,codDataPadre,datoCliente);
        
        logger.info("Fin buscarDataCatalogoLike.......");
        
        return new ResponseEntity<List<CatalogoModel>>(listDataCatalogo, HttpStatus.OK);  
    
    }
	
	@GetMapping ("/buscarDataCatalogo")
    public ResponseEntity<CatalogoModel> buscarDataCatalogo(@RequestParam(Constante.PARAM_COD_MAESTRO_CONTROLLER) String codMaestro, 
    														@RequestParam(Constante.PARAM_COD_DATA_CATALOGO) Integer codDataCatalogo) throws Exception {
		
		logger.info("Inicio buscarDataCatalogo ......");
		
		CatalogoModel dataCatalogo = catalogoService.buscarDataCatalogo(codMaestro, codDataCatalogo);
        
        logger.info("Fin buscarDataCatalogo.......");
        
        return new ResponseEntity<CatalogoModel>(dataCatalogo, HttpStatus.OK);  
        
    }

	@PostMapping ("/registrarDataCatalogo")
    public void registrarDataCatalogo(@RequestPart("registro") CatalogoModel registro) throws Exception {
        
		logger.info("Inicio buscarDataCatalogo ......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
		
		if (registro.getIdDataCatalogo() == 0) {
			catalogoService.registrarDataCatalogo(registro, usuario);
		}
		else {
			catalogoService.modificarDataCatalogo(registro, usuario);
		}			
        
        logger.info("Fin buscarDataCatalogo......."); 
		
    }
	
	@GetMapping ("/buscarFlagSunat")
    public ResponseEntity<Integer> buscarFlagSunat(@RequestParam(Constante.PARAM_COD_MAESTRO_CONTROLLER) String codMaestro) throws Exception {
		
		logger.info("Inicio buscarFlagSunat ......");
		
		Integer flagSunat = catalogoService.buscarFlagSunat(codMaestro);
        
        logger.info("Fin buscarFlagSunat.......");
        
        return new ResponseEntity<Integer>(flagSunat, HttpStatus.OK);  
        
    }
		

}
