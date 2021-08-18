package pe.gob.repuestera.service.compra.factura;

import java.util.List;

import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;

public interface ComprobantePagoService {

    String registrarComprobantePagoCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    void anularComprobantePagoCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    List<ComprobantePagoCabModel> listarComprobantePagoCompra(String datoBuscar, String nroComprobantePago, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

    List<ComprobantePagoCabModel> listarComprobantePagoCompraPorGuiaRemision(String numeroDocumento) throws Exception;

    ComprobantePagoCabModel buscarComprobantePagoCompraCab(String numeroDocumento) throws Exception;

    List<ComprobantePagoDetModel> buscarComprobantePagoCompraDet(String numeroDocumento) throws Exception;

    ComprobantePagoCabModel buscarComprobantePagoCompraCabPorOrdenCompra(String codigoOrdenCompra) throws Exception;

    void actualizarComprobantePagoCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    List<ComprobantePagoDetModel> buscarComprobantePagoCompraDetPorGuias(String guias) throws Exception;
}
