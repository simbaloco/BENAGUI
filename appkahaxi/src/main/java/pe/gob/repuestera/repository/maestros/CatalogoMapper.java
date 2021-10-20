package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.CatalogoModel;


@Repository
@Transactional
public interface CatalogoMapper {
	
	String buscarIgv(Map params);
	void modificarIgv(Map params);
	List<CatalogoModel> buscarDataCatalogoLike(Map params);
	CatalogoModel buscarDataCatalogo(Map params);
	Integer buscarFlagSunat(Map params);
	void registrarDataCatalogo(Map params);
	void modificarDataCatalogo(Map params);
	
}
