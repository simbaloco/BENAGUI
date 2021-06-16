package pe.gob.repuestera.service.impl.guiaremision;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.*;
import pe.gob.repuestera.repository.guiaremision.GuiaRemisionMapper;
import pe.gob.repuestera.service.factura.FacturaService;
import pe.gob.repuestera.service.guiaremision.GuiaRemisionService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GuiaRemisionServiceImpl implements GuiaRemisionService {

    private static final Logger logger = LogManager.getLogger(GuiaRemisionServiceImpl.class);

    @Autowired
    private GuiaRemisionMapper guiaRemisionMapper;

    @Autowired
    FacturaService facturaService;

    @Autowired
    private JsonUtils jsonUtils;

    @Override
    public List<AlmacenModel> buscarAlmacen() throws Exception {

        Map<String, Object> params = new HashMap();

        logger.info("params ===> " + params);

        List<AlmacenModel> listAlmacenModel = guiaRemisionMapper.buscarAlmacen(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listAlmacenModel ===> " + listAlmacenModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listAlmacenModel;

    }

    public String registrarGuiaRemision(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception {

        logger.info("guiaRemisionCabModel ===> " + guiaRemisionCabModel.toString());
        logger.info("usuario ===> " + usuario);

        String dataJSON = jsonUtils.obtenerJson(guiaRemisionCabModel.getDetalle());

        logger.info("List<CompraDetModel> ===> " + dataJSON);

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_SERIE, guiaRemisionCabModel.getSerie());
        params.put(Constante.PARAM_SP_CORRELATIVO, guiaRemisionCabModel.getCorrelativo());
        params.put(Constante.PARAM_SP_COD_CLIENTE, guiaRemisionCabModel.getCodigoCliente());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_ORDEN_COMPRA, guiaRemisionCabModel.getOrdenCompra());
        params.put(Constante.PARAM_SP_FEC_CONTABILIZACION, guiaRemisionCabModel.getFechaContabilizacion());
        params.put(Constante.PARAM_SP_FEC_DOCUMENTO, guiaRemisionCabModel.getFechaDocumento());
        params.put(Constante.PARAM_SP_FEC_ENTREGA, guiaRemisionCabModel.getFechaEntrega());
        params.put(Constante.PARAM_SP_COD_TIPO_MONEDA, guiaRemisionCabModel.getCodigoTipoMoneda());
        params.put(Constante.PARAM_SP_COD_COND_PAGO, guiaRemisionCabModel.getCodigoCondPago());
        params.put(Constante.PARAM_SP_COD_DIAS, guiaRemisionCabModel.getCodigoDias());
        params.put(Constante.PARAM_SP_COD_ESTADO, Constante.COD_ESTADO_GENERADO_GUIA_REMISION);
        params.put(Constante.PARAM_SP_COD_MOTIVO_TRASLADO, guiaRemisionCabModel.getCodigoMotivoTraslado());
        params.put(Constante.PARAM_SP_TIPO_CAMBIO, guiaRemisionCabModel.getTipoCambio());
        params.put(Constante.PARAM_SP_SUB_TOTAL, guiaRemisionCabModel.getSubTotal());
        params.put(Constante.PARAM_SP_IGV, guiaRemisionCabModel.getIgv());
        params.put(Constante.PARAM_SP_TOTAL, guiaRemisionCabModel.getTotal());
        params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

        logger.info("params ===> " + params);

        guiaRemisionMapper.registrarGuiaRemision(params);

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

    public void anularGuiaRemision(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception {

        logger.info("guiaRemisionCabModel ===> " + guiaRemisionCabModel.toString());

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, guiaRemisionCabModel.getNumeroDocumento());

        logger.info("params ===> " + params);

        guiaRemisionMapper.anularGuiaRemision(params);

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

    public List<GuiaRemisionCabModel> listarGuiaRemision(String datoBuscar, String codEstado, String fechaDesde, String fechaHasta) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
        params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
        params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);

        logger.info("params ===> " + params);

        List<GuiaRemisionCabModel> listaGuiaRemisionCabModel = guiaRemisionMapper.listarGuiaRemision(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaCompraCabModel ===> " + listaGuiaRemisionCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaGuiaRemisionCabModel;
    }

    public List<GuiaRemisionCabModel> listarGuiaRemisionPorOrdenCompra(String codigoOrdenCompra) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_ORDEN_COMPRA, codigoOrdenCompra);

        logger.info("params ===> " + params);

        List<GuiaRemisionCabModel> listaGuiaRemisionCabModel = guiaRemisionMapper.listarGuiaRemisionPorOrdenCompra(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaCompraCabModel ===> " + listaGuiaRemisionCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaGuiaRemisionCabModel;
    }

    public GuiaRemisionCabModel buscarGuiaRemisionCab(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        GuiaRemisionCabModel guiaRemisionCabModel = guiaRemisionMapper.buscarGuiaRemisionCab(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("guiaRemisionCabModel ===> " + guiaRemisionCabModel.toString());

            try {

                List<FacturaCabModel> listFacturaCabModel = facturaService.listarFacturaPorGuiaRemision(numeroDocumento);
                guiaRemisionCabModel.setCantidadFacturasAsociadas(listFacturaCabModel.size());

            } catch (Exception e) {
                StringWriter printStackTrace = new StringWriter();
                e.printStackTrace(new PrintWriter(printStackTrace));
                logger.info("No se tiene facturas asociadas ===> " + printStackTrace.toString());
                guiaRemisionCabModel.setCantidadFacturasAsociadas(0);
            }

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return guiaRemisionCabModel;
    }

    public List<GuiaRemisionDetModel> buscarGuiaRemisionDet(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionMapper.buscarGuiaRemisionDet(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listGuiaRemisionDetModel ===> " + listGuiaRemisionDetModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listGuiaRemisionDetModel;
    }

}
