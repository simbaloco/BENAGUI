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
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.ArticuloService;
import pe.gob.repuestera.util.Constante;

@RestController
public class ArticuloRestController {

	private static final Logger logger = LogManager.getLogger(ArticuloRestController.class);
	
	@Autowired
	ArticuloService articuloService;
	@Autowired
    HttpSession session;
	
	@GetMapping ("/listarArticulos")
    public ResponseEntity<List<ArticuloModel>> listarArticulos(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
    														   @RequestParam(Constante.PARAM_COD_MARCA_ARTICULO) String codMarcaArticulo, 
    														   @RequestParam(Constante.PARAM_COD_TIPO) String codTipo,
    														   @RequestParam(Constante.PARAM_COD_SECCION) String codSeccion, 
    														   @RequestParam(Constante.PARAM_COD_UND_MEDIDA) String codUndMedida) throws Exception {
        
        	logger.info("Inicio listarArticulos.......");
            
            List<ArticuloModel> articuloList = articuloService.listarArticulos(datoBuscar, codMarcaArticulo, codTipo, codSeccion, codUndMedida);
            
            logger.info("Fin listarArticulos.......");

            return new ResponseEntity<>(articuloList, HttpStatus.OK);     
    }
		
	@GetMapping ("/buscarArticulo/{codArticulo}")
    public ResponseEntity<ArticuloModel> buscarArticulo(@PathVariable(Constante.PARAM_COD_ARTICULO) String codigoArticulo) throws Exception{
        
		logger.info("Inicio buscarArticulo.......");

		ArticuloModel articuloModel = articuloService.buscarArticulo(codigoArticulo);

        logger.info("Fin buscarArticulo.......");

        return new ResponseEntity<>(articuloModel, HttpStatus.OK);
		   
    }
		
	@PostMapping ("/registrarArticulo")
	public ResponseEntity<String> registrarArticulo(@RequestPart("registro") ArticuloModel articuloModel) throws Exception {
				
		logger.info("Inicio registrarArticulo.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        
        if (articuloModel.getCodigoArticulo().toString() == "") {
        	articuloService.registrarArticulo(articuloModel, usuario);
        }
        else {
        	articuloService.modificarArticulo(articuloModel, usuario);
        }
        
        logger.info("Fin registrarArticulo.......");

        return new ResponseEntity<>(HttpStatus.OK);
        
    }
  
	@GetMapping ("/buscarArticuloLike/{datoBuscar}/{codCliente}")
    public ResponseEntity<List<ArticuloModel>> buscarArticuloLike(@PathVariable(Constante.PARAM_DATO_BUSCAR) String datoBuscar, @PathVariable(Constante.PARAM_COD_CLIENTE) String codCliente) throws Exception {
        
    	logger.info("inicio buscarArticuloLike.......");
    	
    	List<ArticuloModel> articuloList = articuloService.buscarArticuloLike(datoBuscar, codCliente);
    	
        logger.info("fin buscarArticuloLike");		
           
        return new ResponseEntity<>(articuloList, HttpStatus.OK);
    }
	
}
