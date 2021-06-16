package pe.gob.repuestera.service.guiaremision;

import java.util.List;

import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;

public interface GuiaRemisionService {

    List<AlmacenModel> buscarAlmacen() throws Exception;

    String registrarGuiaRemision(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception;

    void anularGuiaRemision(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception;

    List<GuiaRemisionCabModel> listarGuiaRemision(String datoBuscar, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

    List<GuiaRemisionCabModel> listarGuiaRemisionPorOrdenCompra(String codigoOrdenCompra) throws Exception;

    GuiaRemisionCabModel buscarGuiaRemisionCab(String numeroDocumento) throws Exception;

    List<GuiaRemisionDetModel> buscarGuiaRemisionDet(String numeroDocumento) throws Exception;
}
