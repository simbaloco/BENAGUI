package pe.gob.repuestera.service.venta.factura;

import java.util.List;

import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;

public interface FacturaVentaService {

    String registrarFacturaVenta(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    void anularFacturaVenta(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    List<ComprobantePagoCabModel> listarFacturaVenta(String datoBuscar, String nroComprobantePago, String nroOrdenVenta, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

    List<ComprobantePagoCabModel> listarFacturaVentaPorGuiaRemision(String numeroDocumento) throws Exception;

    ComprobantePagoCabModel buscarFacturaVentaCab(String numeroDocumento) throws Exception;

    List<ComprobantePagoDetModel> buscarFacturaVentaDet(String numeroDocumento) throws Exception;

    ComprobantePagoCabModel buscarFacturaVentaCabPorOrdenVenta(String codigoOrdenVenta) throws Exception;

    void actualizarFacturaVenta(ComprobantePagoCabModel comprobantePagoCabModel, String usuario) throws Exception;

    List<ComprobantePagoDetModel> buscarFacturaVentaDetPorGuias(String guias) throws Exception;
}
