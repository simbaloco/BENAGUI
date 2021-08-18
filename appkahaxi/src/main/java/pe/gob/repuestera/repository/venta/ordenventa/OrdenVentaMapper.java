package pe.gob.repuestera.repository.venta.ordenventa;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;

@Repository
@Transactional
public interface OrdenVentaMapper {
	
	public List<VentaCabModel> listarOrdenesVenta(Map params);
	public VentaCabModel buscarOrdenVentaCab(Map params);
	public List<VentaDetModel> buscarOrdenVentaDet(Map params);
	public void registrarOrdenVenta(Map params);
	public void actualizarOrdenVenta(Map params);
}
