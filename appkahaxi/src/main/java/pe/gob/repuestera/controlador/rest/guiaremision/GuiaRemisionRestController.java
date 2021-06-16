package pe.gob.repuestera.controlador.rest.guiaremision;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.repuestera.model.*;
import pe.gob.repuestera.service.factura.FacturaService;
import pe.gob.repuestera.service.guiaremision.GuiaRemisionService;
import pe.gob.repuestera.util.Constante;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class GuiaRemisionRestController {

    private static final Logger logger = LogManager.getLogger(GuiaRemisionRestController.class);

    @Autowired
    GuiaRemisionService guiaRemisionService;
    @Autowired
    HttpSession session;

    @GetMapping("/buscarAlmacen")
    public ResponseEntity<List<AlmacenModel>> buscarAlmacen() throws Exception {

        logger.info("Inicio buscarAlmacen.......");

        List<AlmacenModel> listaAlmacenModel = guiaRemisionService.buscarAlmacen();

        logger.info("Fin buscarAlmacen.......");

        return new ResponseEntity<>(listaAlmacenModel, HttpStatus.OK);

    }

    @PostMapping("/registrarGuiaRemision")
    public ResponseEntity<String> registrarGuiaRemision(@RequestPart("registro") GuiaRemisionCabModel guiaRemisionCabModel) throws Exception {

        logger.info("Inicio registrarGuiaRemision.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = guiaRemisionService.registrarGuiaRemision(guiaRemisionCabModel, usuario);

        logger.info("Fin registrarGuiaRemision.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping("/anularGuiaRemision")
    public ResponseEntity<String> anularGuiaRemision(@RequestPart("registro") GuiaRemisionCabModel guiaRemisionCabModel) throws Exception {

        logger.info("Inicio anularGuiaRemision.......");


        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        guiaRemisionService.anularGuiaRemision(guiaRemisionCabModel, usuario);

        logger.info("Fin anularGuiaRemision.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarGuiaRemision")
    public ResponseEntity<List<GuiaRemisionCabModel>> listarGuiaRemision(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                                  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarGuiaRemision.......");

        List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionService.listarGuiaRemision(datoBuscar, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarOrdenCompra.......");

        return new ResponseEntity<>(listGuiaRemisionCabModel, HttpStatus.OK);

    }

    @GetMapping("/listarGuiaRemisionPorOrdenCompra")
    public ResponseEntity<List<GuiaRemisionCabModel>> listarGuiaRemisionPorOrdenCompra(@RequestParam(Constante.PARAM_DATO_ORDEN_COMPRA) String codigoOrdenCompra) throws Exception {

        logger.info("Inicio listarGuiaRemisionPorOrdenCompra.......");

        List<GuiaRemisionCabModel> listGuiaRemisionCabModel = guiaRemisionService.listarGuiaRemisionPorOrdenCompra(codigoOrdenCompra);

        logger.info("Fin listarGuiaRemisionPorOrdenCompra.......");

        return new ResponseEntity<>(listGuiaRemisionCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarGuiaRemision/{numeroDocumento}")
    public ResponseEntity<GuiaRemisionCabModel> buscarGuiaRemision(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarGuiaRemision.......");

        GuiaRemisionCabModel guiaRemisionCabModel = guiaRemisionService.buscarGuiaRemisionCab(numeroDocumento);

        List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionService.buscarGuiaRemisionDet(numeroDocumento);

        guiaRemisionCabModel.setDetalle(listGuiaRemisionDetModel);

        logger.info("Fin buscarGuiaRemision.......");

        return new ResponseEntity<>(guiaRemisionCabModel, HttpStatus.OK);
    }

}
