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

import pe.gob.repuestera.model.CatalogoModel;
import pe.gob.repuestera.model.SerieModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.SerieService;
import pe.gob.repuestera.util.Constante;

@RestController
public class SerieRestController {

	private static final Logger logger = LogManager.getLogger(SerieRestController.class);
	
	@Autowired
	SerieService serieService;
	@Autowired
    HttpSession session;
	
	@GetMapping ("/listarSeries/")
    public ResponseEntity<List<SerieModel>> listarSeries(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
    													 @RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDoc) throws Exception {
        
        	logger.info("Inicio listarSeries.......");
            
            List<SerieModel> serieList = serieService.listarSeries(datoBuscar, tipoDoc);
            
            logger.info("Fin listarSeries.......");

            return new ResponseEntity<List<SerieModel>>(serieList, HttpStatus.OK);   
    }
	
	@PostMapping ("/registrarSerie")
	public ResponseEntity<String> registrarSerie(@RequestPart("registro") SerieModel serieModel) throws Exception {
				
		logger.info("Inicio registrarSerie.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        
		serieService.registrarSerie(serieModel, usuario);
                
        logger.info("Fin registrarSerie.......");

        return new ResponseEntity<>(HttpStatus.OK);
        
    }
	
	@GetMapping ("/buscarSerie/{codSerie}")
    public ResponseEntity<SerieModel> buscarSerie(@PathVariable(Constante.PARAM_COD_SERIE) int codSerie) throws Exception {
		
		logger.info("Inicio buscarSerie......." + codSerie);
		
		SerieModel serieModel = serieService.buscarSerie(codSerie);
		
        logger.info("Fin buscarSerie.......");
        
        return new ResponseEntity<>(serieModel, HttpStatus.OK);
        
	}
	

	
}
