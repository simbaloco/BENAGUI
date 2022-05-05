package pe.gob.repuestera.repository.compra.ordencompra;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.CompraCabModel;
import pe.gob.repuestera.model.CompraDetModel;

@Repository
@Transactional
public interface OrdenCompraMapper {

	void registrarOrdenCompra(Map params);

	List<CompraCabModel> listarOrdenCompra(Map params);

	CompraCabModel buscarOrdenCompraCab(Map params);

	List<CompraDetModel> buscarOrdenCompraDet(Map params);

	void actualizarOrdenCompra(Map params);

	void anularOrdenCompra(Map params);
}
