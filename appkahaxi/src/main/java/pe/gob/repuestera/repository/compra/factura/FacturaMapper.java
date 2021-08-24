package pe.gob.repuestera.repository.compra.factura;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface FacturaMapper {

    void registrarFacturaCompra(Map params);

    void actualizarFacturaCompra(Map params);

    void anularFacturaCompra(Map params);

    List<ComprobantePagoCabModel> listarFacturaCompra(Map params);

    List<ComprobantePagoCabModel> listarFacturaCompraPorGuiaRemision(Map params);

    ComprobantePagoCabModel buscarFacturaCompraCab(Map params);

    List<ComprobantePagoDetModel> buscarFacturaCompraDet(Map params);
}
