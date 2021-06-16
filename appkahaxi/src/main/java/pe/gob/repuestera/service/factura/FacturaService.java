package pe.gob.repuestera.service.factura;

import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.FacturaCabModel;
import pe.gob.repuestera.model.FacturaDetModel;

import java.util.List;

public interface FacturaService {

    String registrarFactura(FacturaCabModel facturaCabModel, String usuario) throws Exception;

    void anularFactura(FacturaCabModel facturaCabModel, String usuario) throws Exception;

    List<FacturaCabModel> listarFactura(String datoBuscar, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

    List<FacturaCabModel> listarFacturaPorGuiaRemision(String numeroDocumento) throws Exception;

    FacturaCabModel buscarFacturaCab(String numeroDocumento) throws Exception;

    List<FacturaDetModel> buscarFacturaDet(String numeroDocumento) throws Exception;

    FacturaCabModel buscarFacturaCabPorOrdenCompra(String codigoOrdenCompra) throws Exception;

    void actualizarFactura(FacturaCabModel facturaCabModel, String usuario) throws Exception;

    List<FacturaDetModel> buscarFacturaDetPorGuias(String guias) throws Exception;
}
