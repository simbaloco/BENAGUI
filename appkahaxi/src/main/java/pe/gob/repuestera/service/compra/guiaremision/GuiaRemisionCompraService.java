package pe.gob.repuestera.service.compra.guiaremision;

import java.util.List;

import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;

public interface GuiaRemisionCompraService {

    List<AlmacenModel> buscarAlmacen() throws Exception;

    String registrarGuiaRemisionCompra(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception;

    void anularGuiaRemisionCompra(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception;

    List<GuiaRemisionCabModel> listarGuiaRemisionCompra(String datoBuscar, String nroGuiaRemision, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

    List<GuiaRemisionCabModel> listarGuiaRemisionCompraPorOrdenCompra(String codigoOrdenCompra) throws Exception;

    GuiaRemisionCabModel buscarGuiaRemisionCompraCab(String numeroDocumento) throws Exception;

    List<GuiaRemisionDetModel> buscarGuiaRemisionCompraDet(String numeroDocumento) throws Exception;
}
