package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.repuestera.model.SerieModel;

@Repository
@Transactional
public interface SerieMapper {
	
	List<SerieModel> listarSerie(Map params);
	void registrarSerie(Map params);
	SerieModel buscarSerie(Map params);
	
}
