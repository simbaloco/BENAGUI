package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.ListaPreciosDetModel;
import pe.gob.repuestera.model.ListaPreciosModel;

@Repository
@Transactional
public interface ListaPrecioMapper {
	
	List<ListaPreciosModel> listarListaPrecio(Map params);
	ListaPreciosModel buscarListaPrecio(Map params);
	List<ListaPreciosDetModel> buscarListaPrecioDet(Map params);
	void registrarListaPrecio(Map params);
	
}
