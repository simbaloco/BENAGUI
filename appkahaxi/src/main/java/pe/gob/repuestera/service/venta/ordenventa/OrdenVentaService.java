package pe.gob.repuestera.service.venta.ordenventa;

import java.util.List;

import pe.gob.repuestera.model.VentaCabModel;

public interface OrdenVentaService {
	
	List<VentaCabModel> listarOrdenVenta(String datoBuscar, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;
	String registrarOrdenVenta(VentaCabModel registro, String usuario) throws Exception;
	/*public VentaCabModel buscarCotizacionVentaCab(Map params);
	public List<VentaDetModel> buscarCotizacionVentaDet(Map params);	
	public void actualizarCotizacionVenta(Map params);*/
}
