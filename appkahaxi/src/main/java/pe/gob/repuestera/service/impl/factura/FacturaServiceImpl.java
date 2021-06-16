package pe.gob.repuestera.service.impl.factura;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.FacturaCabModel;
import pe.gob.repuestera.model.FacturaDetModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;
import pe.gob.repuestera.repository.factura.FacturaMapper;
import pe.gob.repuestera.service.compra.OrdenCompraService;
import pe.gob.repuestera.service.factura.FacturaService;
import pe.gob.repuestera.service.guiaremision.GuiaRemisionService;
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
    private GuiaRemisionService guiaRemisionService;

    public String registrarFactura(FacturaCabModel facturaCabModel, String usuario) throws Exception {

        logger.info("facturaCabModel ===> " + facturaCabModel.toString());
        logger.info("usuario ===> " + usuario);

        String dataJSON = jsonUtils.obtenerJson(facturaCabModel.getDetalle());

        logger.info("List<CompraDetModel> ===> " + dataJSON);

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_SERIE, facturaCabModel.getSerie());
        params.put(Constante.PARAM_SP_CORRELATIVO, facturaCabModel.getCorrelativo());
        params.put(Constante.PARAM_SP_COD_CLIENTE, facturaCabModel.getCodigoCliente());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_ORDEN_COMPRA, facturaCabModel.getOrdenCompra());
        params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, facturaCabModel.getFechaContabilizacion());
        params.put(Constante.PARAM_SP_FEC_DOCUMENTO, facturaCabModel.getFechaDocumento());
        params.put(Constante.PARAM_SP_FEC_VENCIMIENTO, facturaCabModel.getFechaVencimiento());
        params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, facturaCabModel.getCodigoTipoMoneda());
        params.put(Constante.PARAM_SP_COD_COND_PAGO, facturaCabModel.getCodigoCondPago());
        params.put(Constante.PARAM_SP_COD_DIAS, facturaCabModel.getCodigoDias());
        params.put(Constante.PARAM_SP_COD_ESTADO_PAGO, facturaCabModel.getCodigoEstadoPago());
        params.put(Constante.PARAM_SP_COD_ESTADO, Constante.COD_ESTADO_GENERADO_GUIA_REMISION);
        params.put(Constante.PARAM_SP_TIPO_CAMBIO, facturaCabModel.getTipoCambio());
        params.put(Constante.PARAM_SP_SUB_TOTAL, facturaCabModel.getSubTotal());
        params.put(Constante.PARAM_SP_IGV, facturaCabModel.getIgv());
        params.put(Constante.PARAM_SP_TOTAL, facturaCabModel.getTotal());
        params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

        logger.info("params ===> " + params);

        facturaMapper.registrarFactura(params);

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

    public void actualizarFactura(FacturaCabModel facturaCabModel, String usuario) throws Exception {

        logger.info("facturaCabModel ===> " + facturaCabModel.toString());
        logger.info("usuario ===> " + usuario);

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, facturaCabModel.getNumeroDocumento());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_COD_ESTADO_PAGO, facturaCabModel.getCodigoEstadoPago());

        logger.info("params ===> " + params);

        facturaMapper.actualizarFactura(params);

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

    public void anularFactura(FacturaCabModel facturaCabModel, String usuario) throws Exception {

        logger.info("facturaCabModel ===> " + facturaCabModel.toString());

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, facturaCabModel.getNumeroDocumento());

        logger.info("params ===> " + params);

        facturaMapper.anularFactura(params);

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

    public List<FacturaCabModel> listarFactura(String datoBuscar, String codEstado, String fechaDesde, String fechaHasta) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
        params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
        params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);

        logger.info("params ===> " + params);

        List<FacturaCabModel> listaFacturaCabModel = facturaMapper.listarFactura(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaCompraCabModel ===> " + listaFacturaCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaFacturaCabModel;
    }

    public FacturaCabModel buscarFacturaCab(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        FacturaCabModel facturaCabModel = facturaMapper.buscarFacturaCab(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("facturaCabModel ===> " + facturaCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return facturaCabModel;
    }

    public List<FacturaCabModel> listarFacturaPorGuiaRemision(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_COD_GUIA_REMISION, numeroDocumento);

        logger.info("params ===> " + params);

        List<FacturaCabModel> listaFacturaCabModel = facturaMapper.listarFacturaPorGuiaRemision(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaFacturaCabModel ===> " + listaFacturaCabModel.toString());

            if(listaFacturaCabModel.isEmpty()) {
                throw new ErrorControladoException(Constante.ERROR_CONTROADO_NO_EXISTEN_FACTURAS);
            }

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaFacturaCabModel;
    }

    public List<FacturaDetModel> buscarFacturaDet(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        List<FacturaDetModel> listFacturaDetModel = facturaMapper.buscarFacturaDet(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listFacturaDetModel ===> " + listFacturaDetModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listFacturaDetModel;
    }

    public FacturaCabModel buscarFacturaCabPorOrdenCompra(String codigoOrdenCompra) throws Exception {

        CompraCabModel compraCabModel = ordenCompraService.buscarOrdenCompraCab(codigoOrdenCompra);

        FacturaCabModel facturaCabModel = new FacturaCabModel();

        BeanUtils.copyProperties(facturaCabModel, compraCabModel);
        facturaCabModel.setOrdenCompra(compraCabModel.getNumeroDocumento());

        return facturaCabModel;
    }

    public List<FacturaDetModel> buscarFacturaDetPorGuias(String guias) throws Exception {

        List<FacturaDetModel> listFacturaDetModel = new ArrayList<>();
        FacturaDetModel facturaDetModel = new FacturaDetModel();

        List<String> listCodigoGuiasRemision = Arrays.asList(guias.split(","));

        for(String codidoGuiaRemision: listCodigoGuiasRemision) {

            List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionService.buscarGuiaRemisionDet(codidoGuiaRemision);

            for(GuiaRemisionDetModel guiaRemisionDetModel : listGuiaRemisionDetModel) {
                facturaDetModel = new FacturaDetModel();
                BeanUtils.copyProperties(facturaDetModel, guiaRemisionDetModel);
                facturaDetModel.setCodGuiaRemision(codidoGuiaRemision);
                facturaDetModel.setCantidadPendienteGuiaRemision(guiaRemisionDetModel.getCantidadPendiente());
                facturaDetModel.setLineaReferencia(guiaRemisionDetModel.getLinea());
                listFacturaDetModel.add(facturaDetModel);
            }
        }
        return listFacturaDetModel;
    }

}
