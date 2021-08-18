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
import pe.gob.repuestera.service.compra.factura.ComprobantePagoService;
import pe.gob.repuestera.util.Constante;

@RestController
public class ComprobantePagoRestController {

    private static final Logger logger = LogManager.getLogger(ComprobantePagoRestController.class);

    @Autowired
    ComprobantePagoService comprobantePagoService;
    @Autowired
    HttpSession session;

    @PostMapping("/registrarComprobantePagoCompra")
    public ResponseEntity<String> registrarComprobantePagoCompra(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio registrarComprobantePagoCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        String nroDocumento = comprobantePagoService.registrarComprobantePagoCompra(comprobantePagoCabModel, usuario);

        logger.info("Fin registrarComprobantePagoCompra.......");

        return new ResponseEntity<>(nroDocumento, HttpStatus.OK);

    }

    @PostMapping ("/actualizarComprobantePagoCompra")
    public ResponseEntity<String> actualizarComprobantePagoCompra(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio actualizarComprobantePagoCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        comprobantePagoService.actualizarComprobantePagoCompra(comprobantePagoCabModel, usuario);

        logger.info("Fin actualizarComprobantePagoCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    
    @PostMapping("/anularComprobantePagoCompra")
    public ResponseEntity<String> anularComprobantePagoCompra(@RequestPart("registro") ComprobantePagoCabModel comprobantePagoCabModel) throws Exception {

        logger.info("Inicio anularComprobantePagoCompra.......");

        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();

        comprobantePagoService.anularComprobantePagoCompra(comprobantePagoCabModel, usuario);

        logger.info("Fin anularComprobantePagoCompra.......");

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/listarComprobantePagoCompra")
    public ResponseEntity<List<ComprobantePagoCabModel>> listarComprobantePagoCompra(
    														   @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar, 
													    	   @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO) String nroComprobantePago, 
															   @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra, 
															   @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto, 
															   @RequestParam(Constante.PARAM_COD_ESTADO) String codEstado,
                                                               @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde, 
                                                               @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta) throws Exception {

        logger.info("Inicio listarComprobantePagoCompra.......");

        List<ComprobantePagoCabModel> listComprobantePagoCabModel = comprobantePagoService.listarComprobantePagoCompra(datoBuscar, nroComprobantePago, nroOrdenCompra, codRepuesto, codEstado, fechaDesde, fechaHasta);

        logger.info("Fin listarComprobantePagoCompra.......");

        return new ResponseEntity<>(listComprobantePagoCabModel, HttpStatus.OK);

    }

    @GetMapping("/listarComprobantePagoCompraPorGuiaRemision")
    public ResponseEntity<List<ComprobantePagoCabModel>> listarComprobantePagoCompraPorGuiaRemision(@RequestParam(Constante.PARAM_DATO_GUIA_REMISION) String codigoGuiaRemision) throws Exception {

        logger.info("Inicio listarComprobantePagoCompraPorGuiaRemision.......");

        List<ComprobantePagoCabModel> listComprobantePagoCabModel = comprobantePagoService.listarComprobantePagoCompraPorGuiaRemision(codigoGuiaRemision);

        logger.info("Fin listarComprobantePagoCompraPorGuiaRemision.......");

        return new ResponseEntity<>(listComprobantePagoCabModel, HttpStatus.OK);

    }

    @GetMapping ("/buscarComprobantePagoCompra/{numeroDocumento}")
    public ResponseEntity<ComprobantePagoCabModel> buscarComprobantePagoCompra(@PathVariable(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento) throws Exception {

        logger.info("Inicio buscarComprobantePagoCompra.......");

        ComprobantePagoCabModel comprobantePagoCabModel = comprobantePagoService.buscarComprobantePagoCompraCab(numeroDocumento);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = comprobantePagoService.buscarComprobantePagoCompraDet(numeroDocumento);

        comprobantePagoCabModel.setDetalle(listComprobantePagoDetModel);

        logger.info("Fin buscarComprobantePagoCompra.......");

        return new ResponseEntity<>(comprobantePagoCabModel, HttpStatus.OK);
    }

    @GetMapping ("/generarComprobantePagoCompraPorGuias/{codigoOrdenCompra}/{guias}")
    public ResponseEntity<ComprobantePagoCabModel> generarComprobantePagoCompraPorGuias(@PathVariable(Constante.PARAM_DATO_ORDEN_COMPRA) String codigoOrdenCompra,
                                                                 			   @PathVariable(Constante.PARAM_GUIAS) String guias
                                                                 ) throws Exception {

        logger.info("Inicio generarComprobantePagoCompraPorGuias.......");

        ComprobantePagoCabModel comprobantePagoCabModel = comprobantePagoService.buscarComprobantePagoCompraCabPorOrdenCompra(codigoOrdenCompra);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = comprobantePagoService.buscarComprobantePagoCompraDetPorGuias(guias);

        comprobantePagoCabModel.setDetalle(listComprobantePagoDetModel);

        logger.info("Fin generarComprobantePagoCompraPorGuias.......");

        return new ResponseEntity<>(comprobantePagoCabModel, HttpStatus.OK);
    }

}
