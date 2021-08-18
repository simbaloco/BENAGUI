package pe.gob.repuestera.repository.compra.factura;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.ComprobantePagoDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface ComprobantePagoMapper {

    void registrarComprobantePagoCompra(Map params);

    void actualizarComprobantePagoCompra(Map params);

    void anularComprobantePagoCompra(Map params);

    List<ComprobantePagoCabModel> listarComprobantePagoCompra(Map params);

    List<ComprobantePagoCabModel> listarComprobantePagoCompraPorGuiaRemision(Map params);

    ComprobantePagoCabModel buscarComprobantePagoCompraCab(Map params);

    List<ComprobantePagoDetModel> buscarComprobantePagoCompraDet(Map params);
}
