package pe.gob.repuestera.repository.venta.factura;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface FacturaVentaMapper {

    void registrarFacturaVenta(Map params);

    void actualizarFacturaVenta(Map params);

    void anularFacturaVenta(Map params);

    List<ComprobantePagoCabModel> listarFacturaVenta(Map params);

    List<ComprobantePagoCabModel> listarFacturaVentaPorGuiaRemision(Map params);

    ComprobantePagoCabModel buscarFacturaVentaCab(Map params);

    List<ComprobantePagoDetModel> buscarFacturaVentaDet(Map params);
}
