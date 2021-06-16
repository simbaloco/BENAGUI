package pe.gob.repuestera.repository.factura;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.FacturaCabModel;
import pe.gob.repuestera.model.FacturaDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface FacturaMapper {

    void registrarFactura(Map params);

    void actualizarFactura(Map params);

    void anularFactura(Map params);

    List<FacturaCabModel> listarFactura(Map params);

    List<FacturaCabModel> listarFacturaPorGuiaRemision(Map params);

    FacturaCabModel buscarFacturaCab(Map params);

    List<FacturaDetModel> buscarFacturaDet(Map params);
}
