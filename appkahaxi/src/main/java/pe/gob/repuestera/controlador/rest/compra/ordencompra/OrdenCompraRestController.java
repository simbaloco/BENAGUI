package pe.gob.repuestera.controlador.rest.compra.ordencompra;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.compra.ordencompra.OrdenCompraService;
import pe.gob.repuestera.util.Constante;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class OrdenCompraRestController {

    private static final Logger logger = LogManager.getLogger(OrdenCompraRestController.class);

    @Autowired
    OrdenCompraService ordenCompraService;
    @Autowired
    HttpSession session;

    @PostMapping("/registrarOrdenCompra")
    public ResponseEntity<String> registrarOrdenCompra(@RequestPart("registro") CompraCabModel compraCabModel) throws Exception {

        logger.info("Inicio registrarOrdenCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = ordenCompraService.registrarOrdenCompra(compraCabModel, usuario);

        logger.info("Fin registrarOrdenCompra.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @GetMapping("/listarOrdenCompra")
    public ResponseEntity<List<CompraCabModel>> listarOrdenCompra(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
													    		  @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra, 
																  @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
																  @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                                  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
                                                                  @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarOrdenCompra.......");

        List<CompraCabModel> listaCompraCabModel = ordenCompraService.listarOrdenCompra(datoBuscar, nroOrdenCompra, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarOrdenCompra.......");

        return new ResponseEntity<>(listaCompraCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarOrdenCompra/{numeroDocumento}")
    public ResponseEntity<CompraCabModel> buscarOrdenCompra(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarOrdenCompra.......");

        CompraCabModel compraCabModel = ordenCompraService.buscarOrdenCompraCab(numeroDocumento);

        List<CompraDetModel> listCompraDetModel = ordenCompraService.buscarOrdenCompraDet(numeroDocumento);

        compraCabModel.setDetalle(listCompraDetModel);

        logger.info("Fin buscarOrdenCompra.......");

        return new ResponseEntity<>(compraCabModel, HttpStatus.OK);
    }

    @GetMapping ("/buscarOrdenCompraParaGuiaRemision/{numeroDocumento}")
    public ResponseEntity<CompraCabModel> buscarOrdenCompraParaGuiaRemision(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarOrdenCompra.......");

        CompraCabModel compraCabModel = ordenCompraService.buscarOrdenCompraCab(numeroDocumento);

        List<CompraDetModel> listCompraDetModel = ordenCompraService.buscarOrdenCompraDetalleParaGuiaRemision(numeroDocumento);

        compraCabModel.setDetalle(listCompraDetModel);

        logger.info("Fin buscarOrdenCompra.......");

        return new ResponseEntity<>(compraCabModel, HttpStatus.OK);
    }

    @PostMapping ("/actualizarOrdenCompra")
    public ResponseEntity<String> actualizarOrdenCompra(@RequestPart("registro") CompraCabModel compraCabModel) throws Exception {

        logger.info("Inicio actualizarOrdenCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        ordenCompraService.actualizarOrdenCompra(compraCabModel, usuario);

        logger.info("Fin actualizarOrdenCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }    
    
}
