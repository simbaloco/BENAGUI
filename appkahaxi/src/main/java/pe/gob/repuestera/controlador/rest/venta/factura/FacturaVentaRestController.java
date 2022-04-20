package pe.gob.repuestera.controlador.rest.venta.factura;

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

import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.venta.factura.FacturaVentaService;
import pe.gob.repuestera.util.Constante;

@RestController
public class FacturaVentaRestController {

    private static final Logger logger = LogManager.getLogger(FacturaVentaRestController.class);

    @Autowired
    FacturaVentaService facturaService;
    @Autowired
    HttpSession session;

    @PostMapping("/registrarFacturaVenta")
    public ResponseEntity<String> registrarFacturaVenta(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio registrarFacturaVenta.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = facturaService.registrarFacturaVenta(comprobantePagoCabModel, usuario);

        logger.info("Fin registrarFacturaVenta.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping ("/actualizarFacturaVenta")
    public ResponseEntity<String> actualizarFacturaVenta(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio actualizarFacturaVenta.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        facturaService.actualizarFacturaVenta(comprobantePagoCabModel, usuario);

        logger.info("Fin actualizarFacturaVenta.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    
    @PostMapping("/anularFacturaVenta")
    public ResponseEntity<String> anularFacturaVenta(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio anularFacturaVenta.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        facturaService.anularFacturaVenta(comprobantePagoCabModel, usuario);

        logger.info("Fin anularFacturaVenta.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarFacturaVenta")
    public ResponseEntity<List<ComprobantePagoCabModel>> listarFacturaVenta(
    														   @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
													    	   @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO) String nroComprobantePago, 
															   @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta, 
															   @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
															   @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                               @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
                                                               @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarFacturaVenta.......");

        List<ComprobantePagoCabModel> listComprobantePagoCabModel = facturaService.listarFacturaVenta(datoBuscar, nroComprobantePago, nroOrdenVenta, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarFacturaVenta.......");

        return new ResponseEntity<>(listComprobantePagoCabModel, HttpStatus.OK);

    }

    @GetMapping("/listarFacturaVentaPorGuiaRemision")
    public ResponseEntity<List<ComprobantePagoCabModel>> listarFacturaVentaPorGuiaRemision(@RequestParam(Constante.PARAM_DATO_GUIA_REMISION) String codigoGuiaRemision) throws Exception {

        logger.info("Inicio listarFacturaVentaPorGuiaRemision.......");

        List<ComprobantePagoCabModel> listComprobantePagoCabModel = facturaService.listarFacturaVentaPorGuiaRemision(codigoGuiaRemision);

        logger.info("Fin listarFacturaVentaPorGuiaRemision.......");

        return new ResponseEntity<>(listComprobantePagoCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarFacturaVenta/{numeroDocumento}")
    public ResponseEntity<ComprobantePagoCabModel> buscarFacturaVenta(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarFacturaVenta.......");

        ComprobantePagoCabModel comprobantePagoCabModel = facturaService.buscarFacturaVentaCab(numeroDocumento);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = facturaService.buscarFacturaVentaDet(numeroDocumento);

        comprobantePagoCabModel.setDetalle(listComprobantePagoDetModel);

        logger.info("Fin buscarFacturaVenta.......");

        return new ResponseEntity<>(comprobantePagoCabModel, HttpStatus.OK);
    }

    @GetMapping ("/generarFacturaVentaPorGuias/{codigoOrdenVenta}/{guias}")
    public ResponseEntity<ComprobantePagoCabModel> generarFacturaVentaPorGuias(@PathVariable(Constante.PARAM_DATO_ORDEN_VENTA) String codigoOrdenVenta,
                                                                 			   @PathVariable(Constante.PARAM_GUIAS) String guias
                                                                 ) throws Exception {

        logger.info("Inicio generarFacturaVentaPorGuias.......");

        ComprobantePagoCabModel comprobantePagoCabModel = facturaService.buscarFacturaVentaCabPorOrdenVenta(codigoOrdenVenta);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = facturaService.buscarFacturaVentaDetPorGuias(guias);

        comprobantePagoCabModel.setDetalle(listComprobantePagoDetModel);

        logger.info("Fin generarFacturaVentaPorGuias.......");

        return new ResponseEntity<>(comprobantePagoCabModel, HttpStatus.OK);
    }

}
