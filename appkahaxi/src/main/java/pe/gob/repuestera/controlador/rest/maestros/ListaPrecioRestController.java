package pe.gob.repuestera.controlador.rest.maestros;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pe.gob.repuestera.model.ListaPreciosDetModel;
import pe.gob.repuestera.model.ListaPreciosModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.maestros.ListaPrecioService;
import pe.gob.repuestera.util.Constante;

@RestController
public class ListaPrecioRestController {

	private static final Logger logger = LogManager.getLogger(ListaPrecioRestController.class);
	
	@Autowired
	ListaPrecioService listaPrecioService;
	@Autowired
    HttpSession session;
	
	
	@GetMapping ("/listarListaPrecios/")
    public ResponseEntity<List<ListaPreciosModel>> listarListaPrecios(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar) throws Exception {
        
        	logger.info("Inicio listarListaPrecios.......");
            
            List<ListaPreciosModel> listaPrecioList = listaPrecioService.listarListaPrecio(datoBuscar);
            
            logger.info("Fin listarListaPrecios.......");

            return new ResponseEntity<List<ListaPreciosModel>>(listaPrecioList, HttpStatus.OK);   
    }
		
	@PostMapping("/registrarListaPrecioSf")
    public ResponseEntity<String> registrarListaPrecioSf(@RequestPart("registro") ListaPreciosModel listaModel) throws Exception {
    	logger.info("Inicio registrarListaPrecioSf.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
		listaModel.setFlgFile(0);
    	listaPrecioService.registrarListaPrecio(listaModel, usuario);			
        
        logger.info("Fin registrarListaPrecioSf.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }
	
    @PostMapping("/registrarListaPrecioCf")
    public ResponseEntity<String> registrarListaPrecioCf(@RequestPart("registro") ListaPreciosModel listaModel,
    													@RequestPart(Constante.PARAM_ARCHIVO_EXCEL) MultipartFile archivoExcel) throws Exception {
    	logger.info("Inicio registrarListaPrecioCf.......");
		
		String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
		listaModel.setFlgFile(1);
    	List<ListaPreciosDetModel> listaDetPrecio = new ArrayList<>();
    	ListaPreciosDetModel itemListaPrecio = null;
    	    	
		XSSFWorkbook workbook = new XSSFWorkbook(archivoExcel.getInputStream());
		XSSFSheet worksheet = workbook.getSheetAt(0);
		
		// recorremos todas las filas
		for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
			XSSFRow row = worksheet.getRow(i);
			
			
			String arti;
			arti = row.getCell(0).toString();
			
			
			// procesamos las celdas con valor activo = 1
			if (row.getCell(11).toString().equals("1") || row.getCell(11).toString().equals("1.0")) {	
				itemListaPrecio = new ListaPreciosDetModel();				
				itemListaPrecio.setCodArticulo(row.getCell(0).toString());
				itemListaPrecio.setPrecioRef(Double.valueOf(row.getCell(9).toString()));
				itemListaPrecio.setPrecio(Double.valueOf(row.getCell(10).toString()));
				listaDetPrecio.add(itemListaPrecio);
			}			
		}

		listaModel.setDetalle(listaDetPrecio);
    	listaPrecioService.registrarListaPrecio(listaModel, usuario);			
        
        logger.info("Fin registrarListaPrecioCf.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }
	
    
	@GetMapping ("/buscarListaPrecio/{idListaPrecio}")
    public ResponseEntity<ListaPreciosModel> buscarListaPrecio(@PathVariable(Constante.PARAM_ID_LISTA_PRECIO) int idListaPrecio) throws Exception {
		
		logger.info("Inicio buscarListaPrecio......." + idListaPrecio);
		
		ListaPreciosModel listaPrecioModel = listaPrecioService.buscarListaPrecio(idListaPrecio);
		//List<ListaPreciosDetModel> listaPrecioDetModel = listaPrecioService.buscarListaPrecioDet(idListaPrecio);		
		//listaPrecioModel.setDetalle(listaPrecioDetModel);
        		
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
