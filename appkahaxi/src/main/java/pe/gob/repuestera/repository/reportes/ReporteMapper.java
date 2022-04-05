package pe.gob.repuestera.repository.reportes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.ListaPreciosDetModel;
import pe.gob.repuestera.model.VentaCabModel;

@Repository
@Transactional
public interface ReporteMapper {

	public VentaCabModel obtenerCabeceraCotizacionVenta(Map params);
	public List<HashMap> obtenerDetalleCotizacionVenta(Map params);
	public List<HashMap> obtenerDetalleOrdenCompra(Map params);
	public List<HashMap> obtenerDetalleReporteCompras(Map params);
	public List<HashMap> obtenerDetalleReporteKardex(Map params);
	public List<HashMap> obtenerDetalleReporteInventario(Map params);
	public List<HashMap> obtenerDetalleReporteVentas(Map params);
	public List<HashMap> obtenerDetalleReporteAnalisisVentasCliente(Map params);
	public List<HashMap> obtenerDetalleReporteAnalisisVentasArticulo(Map params);
	public List<HashMap> obtenerDetalleReporteDocumentosAnulados(Map params);
	public List<HashMap> plantillaListaPrecioDet(Map params);
}
