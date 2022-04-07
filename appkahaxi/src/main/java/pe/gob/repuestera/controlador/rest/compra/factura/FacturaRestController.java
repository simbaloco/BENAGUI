package pe.gob.repuestera.controlador.rest.compra.factura;

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
import pe.gob.repuestera.service.compra.factura.FacturaService;
import pe.gob.repuestera.util.Constante;

@RestController
public class FacturaRestController {

    private static final Logger logger = LogManager.getLogger(FacturaRestController.class);

    @Autowired
    FacturaService facturaService;
    @Autowired
    HttpSession session;

    @PostMapping("/registrarFacturaCompra")
    public ResponseEntity<String> registrarFacturaCompra(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio registrarFacturaCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = facturaService.registrarFacturaCompra(comprobantePagoCabModel, usuario);

        logger.info("Fin registrarFacturaCompra.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping ("/actualizarFacturaCompra")
    public ResponseEntity<String> actualizarFacturaCompra(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio actualizarFacturaCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        facturaService.actualizarFacturaCompra(comprobantePagoCabModel, usuario);

        logger.info("Fin actualizarFacturaCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    
    @PostMapping("/anularFacturaCompra")
    public ResponseEntity<String> anularFacturaCompra(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio anularFacturaCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        facturaService.anularFacturaCompra(comprobantePagoCabModel, usuario);

        logger.info("Fin anularFacturaCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarFacturaCompra")
    public ResponseEntity<List<ComprobantePagoCabModel>> listarFacturaCompra(
    														   @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
													    	   @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO) String nroComprobantePago, 
															   @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra, 
															   @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
															   @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                               @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
                                                               @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarFacturaCompra.......");

        List<ComprobantePagoCabModel> listComprobantePagoCabModel = facturaService.listarFacturaCompra(datoBuscar, nroComprobantePago, nroOrdenCompra, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarFacturaCompra.......");

        return new ResponseEntity<>(listComprobantePagoCabModel, HttpStatus.OK);

    }

    @GetMapping("/listarFacturaCompraPorGuiaRemision")
    public ResponseEntity<List<ComprobantePagoCabModel>> listarFacturaCompraPorGuiaRemision(@RequestParam(Constante.PARAM_DATO_GUIA_REMISION) String codigoGuiaRemision) throws Exception {

        logger.info("Inicio listarFacturaCompraPorGuiaRemision.......");

        List<ComprobantePagoCabModel> listComprobantePagoCabModel = facturaService.listarFacturaCompraPorGuiaRemision(codigoGuiaRemision);

        logger.info("Fin listarFacturaCompraPorGuiaRemision.......");

        return new ResponseEntity<>(listComprobantePagoCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarFacturaCompra/{numeroDocumento}")
    public ResponseEntity<ComprobantePagoCabModel> buscarFacturaCompra(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarFacturaCompra.......");

        ComprobantePagoCabModel comprobantePagoCabModel = facturaService.buscarFacturaCompraCab(numeroDocumento);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = facturaService.buscarFacturaCompraDet(numeroDocumento);

        comprobantePagoCabModel.setDetalle(listComprobantePagoDetModel);

        logger.info("Fin buscarFacturaCompra.......");

        return new ResponseEntity<>(comprobantePagoCabModel, HttpStatus.OK);
    }

    @GetMapping ("/generarFacturaCompraPorGuias/{codigoOrdenCompra}/{guias}")
    public ResponseEntity<ComprobantePagoCabModel> generarFacturaCompraPorGuias(@PathVariable(Constante.PARAM_DATO_ORDEN_COMPRA) String codigoOrdenCompra,
                                                                 			   @PathVariable(Constante.PARAM_GUIAS) String guias
                                                                 ) throws Exception {

        logger.info("Inicio generarFacturaCompraPorGuias.......");

        ComprobantePagoCabModel comprobantePagoCabModel = facturaService.buscarFacturaCompraCabPorOrdenCompra(codigoOrdenCompra);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = facturaService.buscarFacturaCompraDetPorGuias(guias);

        comprobantePagoCabModel.setDetalle(listComprobantePagoDetModel);

        logger.info("Fin generarFacturaCompraPorGuias.......");

        return new ResponseEntity<>(comprobantePagoCabModel, HttpStatus.OK);
    }

}
