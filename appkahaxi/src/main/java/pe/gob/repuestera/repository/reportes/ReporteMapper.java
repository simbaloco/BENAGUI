package pe.gob.repuestera.repository.reportes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.VentaCabModel;

@Repository
@Transactional
public interface ReporteMapper {

	public VentaCabModel obtenerCabeceraCotizacionVenta(Map params);
	public List<HashMap> obtenerDetalleCotizacionVenta(Map params);
	
}
