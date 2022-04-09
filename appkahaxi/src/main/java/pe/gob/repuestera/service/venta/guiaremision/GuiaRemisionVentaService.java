package pe.gob.repuestera.service.venta.guiaremision;

import java.util.List;

import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.GuiaRemisionDetModel;

public interface GuiaRemisionVentaService {
	
    //List<AlmacenModel> buscarAlmacen() throws Exception;
	
    String registrarGuiaRemisionVenta(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception;
    
    void anularGuiaRemisionVenta(GuiaRemisionCabModel guiaRemisionCabModel, String usuario) throws Exception;
    
    List<GuiaRemisionCabModel> listarGuiaRemisionVenta(String datoBuscar, String nroGuiaRemision, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;
    
    List<GuiaRemisionCabModel> listarGuiaRemisionVentaPorOrdenVenta(String codigoOrdenCompra) throws Exception;
    
    //GuiaRemisionCabModel buscarGuiaRemisionVentaCab(String numeroDocumento) throws Exception;
    
    List<GuiaRemisionDetModel> buscarGuiaRemisionVentaDet(String numeroDocumento) throws Exception;
}
