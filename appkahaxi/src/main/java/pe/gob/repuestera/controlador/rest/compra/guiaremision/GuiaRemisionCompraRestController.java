package pe.gob.repuestera.controlador.rest.compra.guiaremision;

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

import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.compra.guiaremision.GuiaRemisionCompraService;
import pe.gob.repuestera.util.Constante;

@RestController
public class GuiaRemisionCompraRestController {

    private static final Logger logger = LogManager.getLogger(GuiaRemisionCompraRestController.class);

    @Autowired
    GuiaRemisionCompraService guiaRemisionCompraService;
    @Autowired
    HttpSession session;

    @GetMapping("/buscarAlmacen")
    public ResponseEntity<List<AlmacenModel>> buscarAlmacen() throws Exception {

        logger.info("Inicio buscarAlmacen.......");

        List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();

        logger.info("Fin buscarAlmacen.......");

        return new ResponseEntity<>(listaAlmacenModel, HttpStatus.OK);

    }

    @PostMapping("/registrarGuiaRemisionCompra")
    public ResponseEntity<String> registrarGuiaRemisionCompra(@RequestPart("registro") GuiaRemisionCabModel guiaRemisionCabModel) throws Exception {

        logger.info("Inicio registrarGuiaRemisionCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = guiaRemisionCompraService.registrarGuiaRemisionCompra(guiaRemisionCabModel, usuario);

        logger.info("Fin registrarGuiaRemisionCompra.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping("/anularGuiaRemisionCompra")
    public ResponseEntity<String> anularGuiaRemisionCompra(@RequestPart("registro") GuiaRemisionCabModel guiaRemisionCabModel) throws Exception {

        logger.info("Inicio anularGuiaRemisionCompra.......");


        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        guiaRemisionCompraService.anularGuiaRemisionCompra(guiaRemisionCabModel, usuario);

        logger.info("Fin anularGuiaRemisionCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarGuiaRemisionCompra")
    public ResponseEntity<List<GuiaRemisionCabModel>> listarGuiaRemisionCompra(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
															    		 @RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision, 
																		 @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra, 
    																	 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
    																	 @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
    																	 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
    																	 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarGuiaRemisionCompra.......");

        List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionCompraService.listarGuiaRemisionCompra(datoBuscar, nroGuiaRemision, nroOrdenCompra, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarGuiaRemisionCompra.......");

        return new ResponseEntity<>(listGuiaRemisionCabModel, HttpStatus.OK);

    }

    @GetMapping("/listarGuiaRemisionCompraPorOrdenCompra")
    public ResponseEntity<List<GuiaRemisionCabModel>> listarGuiaRemisionCompraPorOrdenCompra(@RequestParam(Constante.PARAM_DATO_ORDEN_COMPRA) String codigoOrdenCompra) throws Exception {

        logger.info("Inicio listarGuiaRemisionCompraPorOrdenCompra.......");

        List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionCompraService.listarGuiaRemisionCompraPorOrdenCompra(codigoOrdenCompra);

        logger.info("Fin listarGuiaRemisionCompraPorOrdenCompra.......");

        return new ResponseEntity<>(listGuiaRemisionCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarGuiaRemisionCompra/{numeroDocumento}")
    public ResponseEntity<GuiaRemisionCabModel> buscarGuiaRemisionCompra(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarGuiaRemisionCompra.......");

        GuiaRemisionCabModel guiaRemisionCabModel = guiaRemisionCompraService.buscarGuiaRemisionCompraCab(numeroDocumento);

        List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionCompraService.buscarGuiaRemisionCompraDet(numeroDocumento);

        guiaRemisionCabModel.setDetalle(listGuiaRemisionDetModel);

        logger.info("Fin buscarGuiaRemisionCompra.......");

        return new ResponseEntity<>(guiaRemisionCabModel, HttpStatus.OK);
    }

}
