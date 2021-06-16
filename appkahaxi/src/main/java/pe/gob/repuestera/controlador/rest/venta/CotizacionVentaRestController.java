package pe.gob.repuestera.controlador.rest.venta;

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

import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.service.venta.CotizacionVentaService;
import pe.gob.repuestera.util.Constante;

@RestController
public class CotizacionVentaRestController {

	private static final Logger logger = LogManager.getLogger(CotizacionVentaRestController.class);
	
	@Autowired
	CotizacionVentaService cotizacionVentaService;
	@Autowired
    HttpSession session;
		
	@GetMapping ("/listarCotizacionesVenta")
    public ResponseEntity<List<VentaCabModel>> listarCotizacionesVenta(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
    																   @RequestParam(Constante.PARAM_NRO_COTIZACION) String nroCotizacion, 
    																   @RequestParam(Constante.PARAM_NRO_REQUERIMIENTO) String nroRequerimiento, 
    																   @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
    																   @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
    																   @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
    																   @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {
        logger.info("entrando listarCotizacionesVenta.......");
        List<VentaCabModel> listaCotizacionVenta = cotizacionVentaService.listarCotizacionesVenta(datoBuscar, nroCotizacion, nroRequerimiento, codRepuesto, codEstado, fechaDesde, fechaHasta);
        logger.info("fin listarCotizacionesVenta");
        
        return new ResponseEntity<>(listaCotizacionVenta, HttpStatus.OK);
    }
	
	
	@GetMapping ("/buscarCotizacionVenta/{numeroDocumento}")
    public ResponseEntity<VentaCabModel> buscarCotizacionVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {
        logger.info("entrando buscarCotizacionVenta.......");
        VentaCabModel ventaCabModel = cotizacionVentaService.buscarCotizacionVenta(numeroDocumento);
        logger.info("fin buscarCotizacionVenta");		
           
        return new ResponseEntity<>(ventaCabModel, HttpStatus.OK);
    }
	    
	
	@PostMapping ("/registrarCotizacionVenta")
    public ResponseEntity<String> registrarCotizacionVenta(@RequestPart("registro") VentaCabModel registro) throws Exception {
        logger.info("entrando registrarCotizacionVenta.......");
        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	String nroDocumento = cotizacionVentaService.registrarCotizacionVenta(registro, usuario);
        // evaluando el retorno
        logger.info("fin registrarCotizacionVenta");
        
        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);
    }
    
	@PostMapping ("/actualizarCotizacionVenta")
    public ResponseEntity<String> actualizarCotizacionVenta(@RequestPart("registro") VentaCabModel registro) throws Exception {
        
    	logger.info("entrando actualizarCotizacionVenta.......");
        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
    	cotizacionVentaService.actualizarCotizacionVenta(registro, usuario);
        // evaluando el retorno
        logger.info("fin actualizarCotizacionVenta");		
        
        return new ResponseEntity<>(HttpStatus.OK);
    }    
    
}
