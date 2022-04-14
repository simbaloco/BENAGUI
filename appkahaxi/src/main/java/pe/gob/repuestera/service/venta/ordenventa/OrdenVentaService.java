package pe.gob.repuestera.service.venta.ordenventa;

import java.util.List;

import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;

public interface OrdenVentaService {
	
	List<VentaCabModel> listarOrdenVenta(String datoBuscar, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;
	String registrarOrdenVenta(VentaCabModel registro, String usuario) throws Exception;
	VentaCabModel buscarOrdenVentaCab(String numeroDocumento) throws Exception;
	List<VentaDetModel> buscarOrdenVentaDet(String numeroDocumento) throws Exception;
	List<VentaDetModel> buscarOrdenVentaDetalleParaGuiaRemision(String numeroDocumento) throws Exception;
	
	/*public VentaCabModel buscarCotizacionVentaCab(Map params);
	public List<VentaDetModel> buscarCotizacionVentaDet(Map params);	
	public void actualizarCotizacionVenta(Map params);*/
}
