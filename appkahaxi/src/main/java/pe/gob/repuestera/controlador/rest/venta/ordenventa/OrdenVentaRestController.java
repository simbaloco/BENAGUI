package pe.gob.repuestera.controlador.rest.venta.ordenventa;

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
import pe.gob.repuestera.model.VentaDetModel;
import pe.gob.repuestera.service.venta.ordenventa.OrdenVentaService;
import pe.gob.repuestera.util.Constante;

@RestController
public class OrdenVentaRestController {

    private static final Logger logger = LogManager.getLogger(OrdenVentaRestController.class);

    @Autowired
    OrdenVentaService ordenVentaService;
    @Autowired
    HttpSession session;

    @PostMapping("/registrarOrdenVenta")
    public ResponseEntity<String> registrarOrdenVenta(@RequestPart("registro") VentaCabModel ventaCabModel) throws Exception {

        logger.info("Inicio registrarOrdenVenta.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = ordenVentaService.registrarOrdenVenta(ventaCabModel, usuario);

        logger.info("Fin registrarOrdenVenta.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @GetMapping("/listarOrdenVenta")
    public ResponseEntity<List<VentaCabModel>> listarOrdenVenta(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
													    		  @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta, 
																  @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
																  @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                                  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
                                                                  @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarOrdenVenta.......");

        List<VentaCabModel> listaVentaCabModel = ordenVentaService.listarOrdenVenta(datoBuscar, nroOrdenVenta, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarOrdenVenta.......");

        return new ResponseEntity<>(listaVentaCabModel, HttpStatus.OK);
    }

    @GetMapping ("/buscarOrdenVenta/{numeroDocumento}")
    public ResponseEntity<VentaCabModel> buscarOrdenVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarOrdenVenta.......");

        VentaCabModel ventaCabModel = ordenVentaService.buscarOrdenVentaCab(numeroDocumento);

        List<VentaDetModel> listVentaDetModel = ordenVentaService.buscarOrdenVentaDet(ventaCabModel.getNumeroDocumento());

        ventaCabModel.setDetalle(listVentaDetModel);

        logger.info("Fin buscarOrdenVenta.......");

        return new ResponseEntity<>(ventaCabModel, HttpStatus.OK);
    }
    
    @GetMapping ("/buscarOrdenVentaParaGuiaRemision/{numeroDocumento}")
    public ResponseEntity<VentaCabModel> buscarOrdenVentaParaGuiaRemision(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {
    	
        logger.info("Inicio buscarOrdenVentaParaGuiaRemision.......");

        VentaCabModel compraCabModel = ordenVentaService.buscarOrdenVentaCab(numeroDocumento);

        List<VentaDetModel> listCompraDetModel = ordenVentaService.buscarOrdenVentaDetalleParaGuiaRemision(numeroDocumento);

        compraCabModel.setDetalle(listCompraDetModel);

        logger.info("Fin buscarOrdenVentaParaGuiaRemision.......");

        return new ResponseEntity<>(compraCabModel, HttpStatus.OK);
    }
    
    @PostMapping ("/actualizarOrdenVenta")
    public ResponseEntity<String> actualizarOrdenVenta(@RequestPart("registro") VentaCabModel ventaCabModel) throws Exception {

        logger.info("Inicio actualizarOrdenVenta.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        ordenVentaService.actualizarOrdenVenta(ventaCabModel, usuario);

        logger.info("Fin actualizarOrdenVenta.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    /*
    @GetMapping ("/buscarOrdenCompraParaGuiaRemision/{numeroDocumento}")
    public ResponseEntity<CompraCabModel> buscarOrdenCompraParaGuiaRemision(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarOrdenVenta.......");

        CompraCabModel ventaCabModel = ordenVentaService.buscarOrdenCompraCab(numeroDocumento);

        List<CompraDetModel> listVentaDetModel = ordenVentaService.buscarOrdenCompraDetalleParaGuiaRemision(numeroDocumento);

        ventaCabModel.setDetalle(listVentaDetModel);

        logger.info("Fin buscarOrdenVenta.......");

        return new ResponseEntity<>(ventaCabModel, HttpStatus.OK);
    }
    
    
    @GetMapping ("/eliminarOrdenCompra/{numeroDocumento}")
    public ResponseEntity<String> eliminarOrdenCompra(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio eliminarOrdenCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        ordenVentaService.eliminarOrdenCompra(numeroDocumento, usuario);

        logger.info("Fin eliminarOrdenCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }*/
    
}
