package pe.gob.repuestera.service.reportes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.ComprobantePagoCabModel;
import pe.gob.repuestera.model.GuiaRemisionCabModel;
import pe.gob.repuestera.model.VentaCabModel;

public interface ReporteService {
	
	public VentaCabModel obtenerCabeceraCotizacionVenta(String numeroDocumento) throws Exception;
	public List<HashMap> obtenerDetalleCotizacionVenta(String numeroDocumento) throws Exception;	
	public GuiaRemisionCabModel obtenerCabeceraGuiaRemisionVenta(String numeroDocumento) throws Exception;
	public List<HashMap> obtenerDetalleGuiaRemisionVenta(String numeroDocumento) throws Exception;
	public ComprobantePagoCabModel obtenerCabeceraFacturaVenta(String numeroDocumento) throws Exception;
	public List<HashMap> obtenerDetalleFacturaVenta(String numeroDocumento) throws Exception;
	
	public CompraCabModel obtenerCabeceraOrdenCompra(String numeroDocumento) throws Exception;
	public List<HashMap> obtenerDetalleOrdenCompra(String numeroDocumento) throws Exception;
	public VentaCabModel obtenerCabeceraOrdenVenta(String numeroDocumento) throws Exception;
	public List<HashMap> obtenerDetalleOrdenVenta(String numeroDocumento) throws Exception;
	
	public List<HashMap> obtenerDetalleReporteCompras(String fechaInicio, String fechaFin, String datoBuscar) throws Exception;
	public List<HashMap> obtenerDetalleReporteKardex(String fechaInicio, String fechaFin, String codAlmacen, String datoBuscar) throws Exception;
	public List<HashMap> obtenerDetalleReporteInventario(String codAlmacen, String datoBuscar) throws Exception;
	public List<HashMap> obtenerDetalleReporteVentas(String fechaInicio, String fechaFin, String datoBuscar) throws Exception;
	public List<HashMap> obtenerDetalleReporteAnalisisVentas(String fechaInicio, String fechaFin, String opcion) throws Exception;
	public List<HashMap> obtenerDetalleReporteDocumentosAnulados(String fechaInicio, String fechaFin, String codTipo) throws Exception;
	public List<HashMap> plantillaListaPrecioDet(int idListaPrecio) throws Exception;
	
	public void generarReporte(String nombreJrxml, String nombreArchivo, Map<String, Object> parametros, List<HashMap> lista, String tipoReporte, HttpServletResponse response) throws Exception;
	public void enviarReportePorCorreo(String nombreJrxml, String nombreArchivo, String email, Map<String, Object> parametros, List<HashMap> lista, String asunto, String mensaje, HttpServletResponse response) throws Exception;
	
}
