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

import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;
import pe.gob.repuestera.model.ListaPreciosDetModel;
import pe.gob.repuestera.model.ListaPreciosModel;
import pe.gob.repuestera.model.PerfilModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.ListaPrecioService;
import pe.gob.repuestera.service.maestros.PerfilService;
import pe.gob.repuestera.util.Constante;

@RestController
public class ListaPrecioRestController {

	private static final Logger logger = LogManager.getLogger(ListaPrecioRestController.class);
	
	@Autowired
	ListaPrecioService listaPrecioService;
	@Autowired
    HttpSession session;
	
	
	@GetMapping ("/listarListaPrecios")
    public ResponseEntity<List<ListaPreciosModel>> listarListaPrecios(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar) throws Exception {
        
        	logger.info("Inicio listarListaPrecios.......");
            
            List<ListaPreciosModel> listaPrecioList = listaPrecioService.listarListaPrecio(datoBuscar);
            
            logger.info("Fin listarListaPrecios.......");

            return new ResponseEntity<>(listaPrecioList, HttpStatus.OK);     
    }
		
	@PostMapping ("/registrarListaPrecio")
	public ResponseEntity<String> registrarListaPrecio(@RequestPart("registro") ListaPreciosModel registro) throws Exception {
				
		logger.info("Inicio registrarListaPrecio.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        
		listaPrecioService.registrarListaPrecio(registro, usuario);			
		                
        logger.info("Fin registrarListaPrecio.......");

        return new ResponseEntity<>(HttpStatus.OK);
        
    }
	
	@GetMapping ("/buscarListaPrecio/{idListaPrecio}")
    public ResponseEntity<ListaPreciosModel> buscarListaPrecio(@PathVariable(Constante.PARAM_ID_LISTA_PRECIO) int idListaPrecio) throws Exception {
		
		logger.info("Inicio buscarListaPrecio......." + idListaPrecio);
		
		ListaPreciosModel listaPrecioModel = listaPrecioService.buscarListaPrecio(idListaPrecio);
		List<ListaPreciosDetModel> listaPrecioDetModel = listaPrecioService.buscarListaPrecioDet(idListaPrecio);		
		listaPrecioModel.setDetalle(listaPrecioDetModel);
        		
        logger.info("Fin buscarListaPrecio.......");
        
        return new ResponseEntity<>(listaPrecioModel, HttpStatus.OK);
        
	}
	
	@GetMapping ("/buscarListaPrecioDetalle")
    public ResponseEntity<List<ListaPreciosDetModel>> buscarListaPrecioDetalle(@RequestParam(Constante.PARAM_ID_LISTA_PRECIO) int idListaPrecio) throws Exception {
		
		logger.info("Inicio buscarListaPrecioDetalle......." + idListaPrecio);
		
        List<ListaPreciosDetModel> listaPrecioDetModel = listaPrecioService.buscarListaPrecioDet(idListaPrecio);
        		
        logger.info("Fin buscarListaPrecioDetalle.......");
        
        return new ResponseEntity<>(listaPrecioDetModel, HttpStatus.OK);
        
	}
	
}
