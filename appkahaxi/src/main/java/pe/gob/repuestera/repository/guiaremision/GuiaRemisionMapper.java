package pe.gob.repuestera.repository.guiaremision;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;

import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface GuiaRemisionMapper {

    List<AlmacenModel> buscarAlmacen(Map params);

    void registrarGuiaRemision(Map params);

    void anularGuiaRemision(Map params);

    List<GuiaRemisionCabModel> listarGuiaRemision(Map params);

    List<GuiaRemisionCabModel> listarGuiaRemisionPorOrdenCompra(Map params);

    GuiaRemisionCabModel buscarGuiaRemisionCab(Map params);

    List<GuiaRemisionDetModel> buscarGuiaRemisionDet(Map params);
}
