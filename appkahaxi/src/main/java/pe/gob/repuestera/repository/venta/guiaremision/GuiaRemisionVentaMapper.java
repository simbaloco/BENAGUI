package pe.gob.repuestera.repository.venta.guiaremision;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface GuiaRemisionVentaMapper {

    List<AlmacenModel> buscarAlmacen(Map params);

    void registrarGuiaRemisionVenta(Map params);

    void anularGuiaRemisionVenta(Map params);

    List<GuiaRemisionCabModel> listarGuiaRemisionVenta(Map params);

    List<GuiaRemisionCabModel> listarGuiaRemisionVentaPorOrdenVenta(Map params);

    GuiaRemisionCabModel buscarGuiaRemisionVentaCab(Map params);

    List<GuiaRemisionDetModel> buscarGuiaRemisionVentaDet(Map params);
}
