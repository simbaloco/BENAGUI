package pe.gob.repuestera.service.venta.ordenventa;

import java.util.List;

import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;

public interface OrdenVentaService {
	
	String registrarOrdenVenta(VentaCabModel registro, String usuario) throws Exception;
	
	List<VentaCabModel> listarOrdenVenta(String datoBuscar, String nroOrdenVenta, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;
	
	VentaCabModel buscarOrdenVentaCab(String numeroDocumento) throws Exception;

	List<VentaDetModel> buscarOrdenVentaDet(String numeroDocumento) throws Exception;
	
	List<VentaDetModel> buscarOrdenVentaDetalleParaGuiaRemision(String numeroDocumento) throws Exception;

	void actualizarOrdenVenta(VentaCabModel registro, String usuario) throws Exception;
}
