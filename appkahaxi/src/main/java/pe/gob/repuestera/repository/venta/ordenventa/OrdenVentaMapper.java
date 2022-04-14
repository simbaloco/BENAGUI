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
	
	void registrarOrdenVenta(Map params);
	
	List<VentaCabModel> listarOrdenVenta(Map params);
	
	VentaCabModel buscarOrdenVentaCab(Map params);

	List<VentaDetModel> buscarOrdenVentaDet(Map params);
		
	void actualizarOrdenVenta(Map params);
	
}
