package pe.gob.repuestera.repository.venta;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;

@Repository
@Transactional
public interface CotizacionVentaMapper {

	public List<VentaCabModel> listarCotizacionesVenta(Map params);
	public VentaCabModel buscarCotizacionVentaCab(Map params);
	public List<VentaDetModel> buscarCotizacionVentaDet(Map params);
	public void registrarCotizacionVenta(Map params);
	public void actualizarCotizacionVenta(Map params);
}
