package pe.gob.repuestera.repository.compra.guiaremision;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface GuiaRemisionCompraMapper {

    List<AlmacenModel> buscarAlmacen(Map params);

    void registrarGuiaRemisionCompra(Map params);

    void anularGuiaRemisionCompra(Map params);

    List<GuiaRemisionCabModel> listarGuiaRemisionCompra(Map params);

    List<GuiaRemisionCabModel> listarGuiaRemisionCompraPorOrdenCompra(Map params);

    GuiaRemisionCabModel buscarGuiaRemisionCompraCab(Map params);

    List<GuiaRemisionDetModel> buscarGuiaRemisionCompraDet(Map params);
}
