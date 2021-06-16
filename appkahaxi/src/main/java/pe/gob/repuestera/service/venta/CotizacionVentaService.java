package pe.gob.repuestera.service.venta;

import java.util.List;

import pe.gob.repuestera.model.VentaCabModel;

public interface CotizacionVentaService {
	public List<VentaCabModel> listarCotizacionesVenta(String datoBuscar, String nroCotizacion, String nroRequerimiento, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;
	public VentaCabModel buscarCotizacionVenta(String numeroDocumento) throws Exception;
	public String registrarCotizacionVenta(VentaCabModel registro, String usuario) throws Exception;
	public void actualizarCotizacionVenta(VentaCabModel registro, String usuario) throws Exception;
}
