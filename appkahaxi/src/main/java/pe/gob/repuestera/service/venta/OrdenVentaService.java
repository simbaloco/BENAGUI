package pe.gob.repuestera.service.venta;

import java.util.List;
import java.util.Map;

import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;

public interface OrdenVentaService {
	
	public List<VentaCabModel> listarCotizacionesVenta(Map params);
	public VentaCabModel buscarCotizacionVentaCab(Map params);
	public List<VentaDetModel> buscarCotizacionVentaDet(Map params);
	public void registrarCotizacionVenta(Map params);
	public void actualizarCotizacionVenta(Map params);
}
