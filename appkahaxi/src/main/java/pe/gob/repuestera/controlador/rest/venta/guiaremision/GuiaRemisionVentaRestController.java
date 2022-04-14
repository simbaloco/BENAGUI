package pe.gob.repuestera.controlador.rest.venta.guiaremision;

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

import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.venta.guiaremision.GuiaRemisionVentaService;
import pe.gob.repuestera.util.Constante;

@RestController
public class GuiaRemisionVentaRestController {

    private static final Logger logger = LogManager.getLogger(GuiaRemisionVentaRestController.class);

    @Autowired
    GuiaRemisionVentaService guiaRemisionVentaService;
    @Autowired
    HttpSession session;

    /*@GetMapping("/buscarAlmacen")
    public ResponseEntity<List<AlmacenModel>> buscarAlmacen() throws Exception {

        logger.info("Inicio buscarAlmacen.......");

        List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();

        logger.info("Fin buscarAlmacen.......");

        return new ResponseEntity<>(listaAlmacenModel, HttpStatus.OK);

    }*/

    @PostMapping("/registrarGuiaRemisionVenta")
    public ResponseEntity<String> registrarGuiaRemisionVenta(@RequestPart("registro") GuiaRemisionCabModel guiaRemisionCabModel) throws Exception {

        logger.info("Inicio registrarGuiaRemisionVenta.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = guiaRemisionVentaService.registrarGuiaRemisionVenta(guiaRemisionCabModel, usuario);

        logger.info("Fin registrarGuiaRemisionVenta.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping("/anularGuiaRemisionVenta")
    public ResponseEntity<String> anularGuiaRemisionVenta(@RequestPart("registro") GuiaRemisionCabModel guiaRemisionCabModel) throws Exception {

        logger.info("Inicio anularGuiaRemisionVenta.......");


        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        guiaRemisionVentaService.anularGuiaRemisionVenta(guiaRemisionCabModel, usuario);
        
        logger.info("Fin anularGuiaRemisionVenta.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarGuiaRemisionVenta")
    public ResponseEntity<List<GuiaRemisionCabModel>> listarGuiaRemisionVenta(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
															    		 @RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision, 
																		 @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta, 
    																	 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
    																	 @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
    																	 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
    																	 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarGuiaRemisionVenta.......");

        List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionVentaService.listarGuiaRemisionVenta(datoBuscar, nroGuiaRemision, nroOrdenVenta, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarGuiaRemisionVenta.......");

        return new ResponseEntity<>(listGuiaRemisionCabModel, HttpStatus.OK);

    }

    /*@GetMapping("/listarGuiaRemisionCompraPorOrdenCompra")
    public ResponseEntity<List<GuiaRemisionCabModel>> listarGuiaRemisionCompraPorOrdenCompra(@RequestParam(Constante.PARAM_DATO_ORDEN_COMPRA) String codigoOrdenCompra) throws Exception {

        logger.info("Inicio listarGuiaRemisionCompraPorOrdenCompra.......");

        List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionCompraService.listarGuiaRemisionCompraPorOrdenCompra(codigoOrdenCompra);

        logger.info("Fin listarGuiaRemisionCompraPorOrdenCompra.......");

        return new ResponseEntity<>(listGuiaRemisionCabModel, HttpStatus.OK);

    }*/

    @GetMapping ("/buscarGuiaRemisionVenta/{numeroDocumento}")
    public ResponseEntity<GuiaRemisionCabModel> buscarGuiaRemisionVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarGuiaRemisionVenta.......");

        GuiaRemisionCabModel guiaRemisionCabModel = guiaRemisionVentaService.buscarGuiaRemisionVentaCab(numeroDocumento);

        List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionVentaService.buscarGuiaRemisionVentaDet(numeroDocumento);

        guiaRemisionCabModel.setDetalle(listGuiaRemisionDetModel);

        logger.info("Fin buscarGuiaRemisionVenta.......");

        return new ResponseEntity<>(guiaRemisionCabModel, HttpStatus.OK);
    }

}
