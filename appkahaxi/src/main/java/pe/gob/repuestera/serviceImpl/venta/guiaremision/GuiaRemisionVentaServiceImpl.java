package pe.gob.repuestera.serviceImpl.venta.guiaremision;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.*;
import pe.gob.repuestera.repository.venta.guiaremision.GuiaRemisionVentaMapper;
import pe.gob.repuestera.service.venta.guiaremision.GuiaRemisionVentaService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GuiaRemisionVentaServiceImpl implements GuiaRemisionVentaService {

    private static final Logger logger = LogManager.getLogger(GuiaRemisionVentaServiceImpl.class);

    @Autowired
    private GuiaRemisionVentaMapper guiaRemisionVentaMapper;
   /* @Autowired
    FacturaService facturaService;
    @Autowired*/
    private JsonUtils jsonUtils;


    public String registrarGuiaRemisionVenta(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception {

        logger.info("guiaRemisionCabModel ===> " + guiaRemisionCabModel.toString());
        logger.info("usuario ===> " + usuario);

        String dataJSON = jsonUtils.obtenerJson(guiaRemisionCabModel.getDetalle());

        logger.info("List<VentaDetModel> ===> " + dataJSON);

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_SERIE, guiaRemisionCabModel.getSerie().toUpperCase());
        params.put(Constante.PARAM_SP_CORRELATIVO, guiaRemisionCabModel.getCorrelativo());
        params.put(Constante.PARAM_SP_COD_PROV, guiaRemisionCabModel.getCodigoProv());
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_DIR_DESPACHO, guiaRemisionCabModel.getDireccionDespacho());
		params.put(Constante.PARAM_SP_PER_CONTACTO, guiaRemisionCabModel.getPersonaContacto());
        params.put(Constante.PARAM_SP_NRO_ORDEN_VENTA, guiaRemisionCabModel.getOrdenVenta());
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
        params.put(Constante.PARAM_SP_OBSERVACIONES, guiaRemisionCabModel.getObservaciones());
        params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);

        logger.info("params ===> " + params);

        guiaRemisionVentaMapper.registrarGuiaRemisionVenta(params);

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

    public void anularGuiaRemisionVenta(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception {

        logger.info("guiaRemisionCabModel ===> " + guiaRemisionCabModel.toString());

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO, usuario);
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, guiaRemisionCabModel.getNumeroDocumento());
        params.put(Constante.PARAM_SP_OBSERVACIONES, guiaRemisionCabModel.getObservaciones());

        logger.info("params ===> " + params);

        guiaRemisionVentaMapper.anularGuiaRemisionVenta(params);

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

    public List<GuiaRemisionCabModel> listarGuiaRemisionVenta(String datoBuscar, String nroGuiaRemision, String nroOrdenVenta, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_NRO_GUIA_REMISION, nroGuiaRemision);
        params.put(Constante.PARAM_SP_NRO_ORDEN_VENTA, nroOrdenVenta);
        params.put(Constante.PARAM_SP_COD_REPUESTO, codRepuesto);
        params.put(Constante.PARAM_SP_COD_ESTADO, codEstado);
        params.put(Constante.PARAM_SP_FEC_DESDE, fechaDesde);
        params.put(Constante.PARAM_SP_FEC_HASTA, fechaHasta);

        logger.info("params ===> " + params);

        List<GuiaRemisionCabModel> listaGuiaRemisionCabModel = guiaRemisionVentaMapper.listarGuiaRemisionVenta(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaVentaCabModel ===> " + listaGuiaRemisionCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaGuiaRemisionCabModel;
    }

    public List<GuiaRemisionCabModel> listarGuiaRemisionVentaPorOrdenVenta(String codigoOrdenVenta) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_ORDEN_VENTA, codigoOrdenVenta);

        logger.info("params ===> " + params);

        List<GuiaRemisionCabModel> listaGuiaRemisionCabModel = guiaRemisionVentaMapper.listarGuiaRemisionVentaPorOrdenVenta(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("listaVentaCabModel ===> " + listaGuiaRemisionCabModel.toString());

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return listaGuiaRemisionCabModel;
    }

    /*public GuiaRemisionCabModel buscarGuiaRemisionVentaCab(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        GuiaRemisionCabModel guiaRemisionCabModel = guiaRemisionVentaMapper.buscarGuiaRemisionVentaCab(params);

        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

        logger.info("flagResultado ===> " + flagResultado);
        logger.info("mensajeResultado ===> " + mensajeResultado);

        if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
            logger.info("guiaRemisionCabModel ===> " + guiaRemisionCabModel.toString());

            try {

                List<ComprobantePagoCabModel> listFacturaCabModel = facturaService.listarFacturaVentaPorGuiaRemision(numeroDocumento);
                guiaRemisionCabModel.setCantidadFacturasAsociadas(listFacturaCabModel.size());

            } catch (Exception e) {
                StringWriter printStackTrace = new StringWriter();
                e.printStackTrace(new PrintWriter(printStackTrace));
                logger.info("No se tienen facturas asociadas ===> " + printStackTrace.toString());
                guiaRemisionCabModel.setCantidadFacturasAsociadas(0);
            }

        } else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
            throw new ErrorControladoException(mensajeResultado);

        } else {
            throw new Exception(mensajeResultado);

        }

        return guiaRemisionCabModel;
    }*/

    public List<GuiaRemisionDetModel> buscarGuiaRemisionVentaDet(String numeroDocumento) throws Exception {

        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_NRO_DOCUMENTO, numeroDocumento);

        logger.info("params ===> " + params);

        List<GuiaRemisionDetModel> listGuiaRemisionDetModel = guiaRemisionVentaMapper.buscarGuiaRemisionVentaDet(params);

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
