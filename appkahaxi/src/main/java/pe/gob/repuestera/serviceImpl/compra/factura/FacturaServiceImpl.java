package pe.gob.repuestera.serviceImpl.compra.factura;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;
import pe.gob.repuestera.repository.compra.factura.FacturaMapper;
import pe.gob.repuestera.service.compra.factura.FacturaService;
import pe.gob.repuestera.service.compra.guiaremision.GuiaRemisionCompraService;
import pe.gob.repuestera.service.compra.ordencompra.OrdenCompraService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

import java.util.*;

@Service
public class FacturaServiceImpl implements FacturaService {

    private static final Logger logger = LogManager.getLogger(FacturaServiceImpl.class);

    @Autowired
    private FacturaMapper facturaMapper;

    @Autowired
    private JsonUtils jsonUtils;

    @Autowired
    private OrdenCompraService ordenCompraService;

    @Autowired
    private GuiaRemisionCompraService guiaRemisionCompraService;

    public String registrarFacturaCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception {

        logger.info("comprobantePagoCabModel ===> " + comprobantePagoCabModel.toString());
        logger.info("usuario ===> " + usuario);

        String dataJSON = jsonUtils.obtenerJson(comprobantePagoCabModel.getDetalle());

        logger.info("List<CompraDetModel> ===> " + dataJSON);

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_SERIE, comprobantePagoCabModel.getSerie().toUpperCase());
        params.put(Constante.PARAM_SP_CORRELATIVO, comprobantePagoCabModel.getCorrelativo());
        params.put(Constante.PARAM_SP_COD_PROV, comprobantePagoCabModel.getCodigoProv());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_DIR_DESPACHO, comprobantePagoCabModel.getDireccionDespacho());
		params.put(Constante.PARAM_SP_PER_CONTACTO, comprobantePagoCabModel.getPersonaContacto());
		params.put(Constante.PARAM_SP_COD_DIR_DESPACHO, comprobantePagoCabModel.getCodDireccionDespacho());
		params.put(Constante.PARAM_SP_COD_PER_CONTACTO, comprobantePagoCabModel.getCodPersonaContacto());
        params.put(Constante.PARAM_SP_NRO_ORDEN_COMPRA, comprobantePagoCabModel.getOrdenCompra());
        params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, comprobantePagoCabModel.getFechaContabilizacion());
        params.put(Constante.PARAM_SP_FEC_DOCUMENTO, comprobantePagoCabModel.getFechaDocumento());
        params.put(Constante.PARAM_SP_FEC_VENCIMIENTO, comprobantePagoCabModel.getFechaVencimiento());
        params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, comprobantePagoCabModel.getCodigoTipoMoneda());
        params.put(Constante.PARAM_SP_COD_COND_PAGO, comprobantePagoCabModel.getCodigoCondPago());
        params.put(Constante.PARAM_SP_COD_DIAS, comprobantePagoCabModel.getCodigoDias());
        params.put(Constante.PARAM_SP_COD_ESTADO_PAGO, comprobantePagoCabModel.getCodigoEstadoPago());
        params.put(Constante.PARAM_SP_COD_ESTADO, Constante.COD_ESTADO_GENERADO_GUIA_REMISION);
        params.put(Constante.PARAM_SP_TIPO_CAMBIO, comprobantePagoCabModel.getTipoCambio());
        params.put(Constante.PARAM_SP_SUB_TOTAL, comprobantePagoCabModel.getSubTotal());
        params.put(Constante.PARAM_SP_IGV, comprobantePagoCabModel.getIgv());
        params.put(Constante.PARAM_SP_TOTAL, comprobantePagoCabModel.getTotal());
        params.put(Constante.PARAM_SP_OBSERVACIONES, comprobantePagoCabModel.getObservaciones());
        params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

        logger.info("params ===> " + params);

        facturaMapper.registrarFacturaCompra(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {

            String nroDocumento = (String) params.get(Constante.PARAM_SP_NRO_DOCUMENTO);
            return nroDocumento;

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

    }

    public void actualizarFacturaCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception {

        logger.info("comprobantePagoCabModel ===> " + comprobantePagoCabModel.toString());
        logger.info("usuario ===> " + usuario);

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, comprobantePagoCabModel.getNumeroDocumento());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_COD_ESTADO_PAGO, comprobantePagoCabModel.getCodigoEstadoPago());
        params.put(Constante.PARAM_SP_OBSERVACIONES, comprobantePagoCabModel.getObservaciones());

        logger.info("params ===> " + params);

        facturaMapper.actualizarFacturaCompra(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info(mensajeResultado);

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }
    }

    public void anularFacturaCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception {

        logger.info("comprobantePagoCabModel ===> " + comprobantePagoCabModel.toString());

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, comprobantePagoCabModel.getNumeroDocumento());
        params.put(Constante.PARAM_SP_OBSERVACIONES, comprobantePagoCabModel.getObservaciones());

        logger.info("params ===> " + params);

        facturaMapper.anularFacturaCompra(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info(mensajeResultado);

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

    }

    public List<ComprobantePagoCabModel> listarFacturaCompra(String datoBuscar, String nroComprobantePago, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_NRO_COMPROBANTE_PAGO, nroComprobantePago);
        params.put(Constante.PARAM_SP_NRO_ORDEN_COMPRA, nroOrdenCompra);
        params.put(Constante.PARAM_SP_COD_REPUESTO, codRepuesto);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
        params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
        params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);

        logger.info("params ===> " + params);

        List<ComprobantePagoCabModel> listaComprobantePagoCabModel = facturaMapper.listarFacturaCompra(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaCompraCabModel ===> " + listaComprobantePagoCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaComprobantePagoCabModel;
    }

    public ComprobantePagoCabModel buscarFacturaCompraCab(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        ComprobantePagoCabModel comprobantePagoCabModel = facturaMapper.buscarFacturaCompraCab(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("comprobantePagoCabModel ===> " + comprobantePagoCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return comprobantePagoCabModel;
    }

    public List<ComprobantePagoCabModel> listarFacturaCompraPorGuiaRemision(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_GUIA_REMISION, numeroDocumento);

        logger.info("params ===> " + params);

        List<ComprobantePagoCabModel> listaComprobantePagoCabModel = facturaMapper.listarFacturaCompraPorGuiaRemision(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaComprobantePagoCabModel ===> " + listaComprobantePagoCabModel.toString());

            if(listaComprobantePagoCabModel.isEmpty()) {
                throw new ErrorControladoException(Constante.ERROR_CONTROLADO_NO_EXISTEN_FACTURAS);
            }

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaComprobantePagoCabModel;
    }

    public List<ComprobantePagoDetModel> buscarFacturaCompraDet(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = facturaMapper.buscarFacturaCompraDet(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listComprobantePagoDetModel ===> " + listComprobantePagoDetModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listComprobantePagoDetModel;
    }

    public ComprobantePagoCabModel buscarFacturaCompraCabPorOrdenCompra(String codigoOrdenCompra) throws Exception {

        CompraCabModel compraCabModel = ordenCompraService.buscarOrdenCompraCab(codigoOrdenCompra);

        ComprobantePagoCabModel comprobantePagoCabModel = new ComprobantePagoCabModel();

        BeanUtils.copyProperties(comprobantePagoCabModel, compraCabModel);
        comprobantePagoCabModel.setOrdenCompra(compraCabModel.getNumeroDocumento());

        return comprobantePagoCabModel;
    }

    public List<ComprobantePagoDetModel> buscarFacturaCompraDetPorGuias(String guias) throws Exception {

        List<ComprobantePagoDetModel> listComprobantePagoDetModel = new ArrayList<>();
        ComprobantePagoDetModel comprobantePagoDetModel = new ComprobantePagoDetModel();

        List<String> listCodigoGuiasRemision = Arrays.asList(guias.split(","));

        for(String codidoGuiaRemision: listCodigoGuiasRemision) {

            List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionCompraService.buscarGuiaRemisionCompraDet(codidoGuiaRemision);

            for(GuiaRemisionDetModel guiaRemisionDetModel : listGuiaRemisionDetModel) {
                comprobantePagoDetModel = new ComprobantePagoDetModel();
                BeanUtils.copyProperties(comprobantePagoDetModel, guiaRemisionDetModel);
                comprobantePagoDetModel.setCodGuiaRemision(codidoGuiaRemision);
                comprobantePagoDetModel.setCantidadPendienteGuiaRemision(guiaRemisionDetModel.getCantidadPendiente());
                comprobantePagoDetModel.setLineaReferencia(guiaRemisionDetModel.getLinea());
                listComprobantePagoDetModel.add(comprobantePagoDetModel);
            }
        }
        return listComprobantePagoDetModel;
    }

}
