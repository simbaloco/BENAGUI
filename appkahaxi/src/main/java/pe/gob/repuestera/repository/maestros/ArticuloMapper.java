package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.ArticuloModel;

@Repository
@Transactional
public interface ArticuloMapper {

	List<ArticuloModel> listarArticulos(Map params);
	ArticuloModel buscarArticulo(Map params);	
	void registrarArticulo(Map params);
	void modificarArticulo(Map params);
	List<ArticuloModel> buscarArticuloLike(Map params);

}
