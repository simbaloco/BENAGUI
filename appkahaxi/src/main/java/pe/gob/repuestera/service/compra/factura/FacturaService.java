package pe.gob.repuestera.service.compra.factura;

import java.util.List;

import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;

public interface FacturaService {

    String registrarFacturaCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    void anularFacturaCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    List<ComprobantePagoCabModel> listarFacturaCompra(String datoBuscar, String nroComprobantePago, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

    List<ComprobantePagoCabModel> listarFacturaCompraPorGuiaRemision(String numeroDocumento) throws Exception;

    ComprobantePagoCabModel buscarFacturaCompraCab(String numeroDocumento) throws Exception;

    List<ComprobantePagoDetModel> buscarFacturaCompraDet(String numeroDocumento) throws Exception;

    ComprobantePagoCabModel buscarFacturaCompraCabPorOrdenCompra(String codigoOrdenCompra) throws Exception;

    void actualizarFacturaCompra(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    List<ComprobantePagoDetModel> buscarFacturaCompraDetPorGuias(String guias) throws Exception;
}
