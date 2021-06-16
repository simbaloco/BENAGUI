package pe.gob.repuestera.controlador.rest.factura;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.FacturaCabModel;
import pe.gob.repuestera.model.FacturaDetModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.factura.FacturaService;
import pe.gob.repuestera.util.Constante;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class FacturaRestController {

    private static final Logger logger = LogManager.getLogger(FacturaRestController.class);

    @Autowired
    FacturaService facturaService;
    @Autowired
    HttpSession session;

    @PostMapping("/registrarFactura")
    public ResponseEntity<String> registrarFactura(@RequestPart("registro") FacturaCabModel facturaCabModel) throws Exception {

        logger.info("Inicio registrarFactura.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = facturaService.registrarFactura(facturaCabModel, usuario);

        logger.info("Fin registrarFactura.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping ("/actualizarFactura")
    public ResponseEntity<String> actualizarFactura(@RequestPart("registro") FacturaCabModel facturaCabModel) throws Exception {

        logger.info("Inicio actualizarFactura.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        facturaService.actualizarFactura(facturaCabModel, usuario);

        logger.info("Fin actualizarFactura.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    
    @PostMapping("/anularFactura")
    public ResponseEntity<String> anularFactura(@RequestPart("registro") FacturaCabModel facturaCabModel) throws Exception {

        logger.info("Inicio anularFactura.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        facturaService.anularFactura(facturaCabModel, usuario);

        logger.info("Fin anularFactura.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarFactura")
    public ResponseEntity<List<FacturaCabModel>> listarFactura(@RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                                  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarFactura.......");

        List<FacturaCabModel> listFacturaCabModel = facturaService.listarFactura(datoBuscar, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarFactura.......");

        return new ResponseEntity<>(listFacturaCabModel, HttpStatus.OK);

    }

    @GetMapping("/listarFacturaPorGuiaRemision")
    public ResponseEntity<List<FacturaCabModel>> listarFacturaPorGuiaRemision(@RequestParam(Constante.PARAM_DATO_GUIA_REMISION) String codigoGuiaRemision) throws Exception {

        logger.info("Inicio listarFacturaPorGuiaRemision.......");

        List<FacturaCabModel> listFacturaCabModel = facturaService.listarFacturaPorGuiaRemision(codigoGuiaRemision);

        logger.info("Fin listarFacturaPorGuiaRemision.......");

        return new ResponseEntity<>(listFacturaCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarFactura/{numeroDocumento}")
    public ResponseEntity<FacturaCabModel> buscarFactura(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarFactura.......");

        FacturaCabModel facturaCabModel = facturaService.buscarFacturaCab(numeroDocumento);

        List<FacturaDetModel> listFacturaDetModel = facturaService.buscarFacturaDet(numeroDocumento);

        facturaCabModel.setDetalle(listFacturaDetModel);

        logger.info("Fin buscarFactura.......");

        return new ResponseEntity<>(facturaCabModel, HttpStatus.OK);
    }

    @GetMapping ("/generarFacturaPorGuias/{codigoOrdenCompra}/{guias}")
    public ResponseEntity<FacturaCabModel> generarFacturaPorGuias(@PathVariable(Constante.PARAM_DATO_ORDEN_COMPRA) String codigoOrdenCompra,
                                                                 @PathVariable(Constante.PARAM_GUIAS) String guias
                                                                 ) throws Exception {

        logger.info("Inicio buscarFactura.......");

        FacturaCabModel facturaCabModel = facturaService.buscarFacturaCabPorOrdenCompra(codigoOrdenCompra);

        List<FacturaDetModel> listFacturaDetModel = facturaService.buscarFacturaDetPorGuias(guias);

        facturaCabModel.setDetalle(listFacturaDetModel);

        logger.info("Fin buscarFactura.......");

        return new ResponseEntity<>(facturaCabModel, HttpStatus.OK);
    }

}
