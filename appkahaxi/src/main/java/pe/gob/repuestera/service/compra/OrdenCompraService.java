package pe.gob.repuestera.service.compra;

import java.util.List;

import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;

public interface OrdenCompraService {

	String registrarOrdenCompra(CompraCabModel compraCabModel, String usuario) throws Exception;

	List<CompraCabModel> listarOrdenCompra(String datoBuscar, String nroOrdenCompra, String codRepuesto, String codEstado, String fechaDesde, String fechaHasta) throws Exception;

	CompraCabModel buscarOrdenCompraCab(String numeroDocumento) throws Exception;

	List<CompraDetModel> buscarOrdenCompraDet(String numeroDocumento) throws Exception;

	List<CompraDetModel> buscarOrdenCompraDetalleParaGuiaRemision(String numeroDocumento) throws Exception;

	void actualizarOrdenCompra(CompraCabModel compraCabModel, String usuario) throws Exception;

	void eliminarOrdenCompra(String numeroDocumento, String usuario) throws Exception;
}
