package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.SocioNegociosContactoModel;
import pe.gob.repuestera.model.SocioNegociosModel;

@Repository
@Transactional
public interface SocioNegociosMapper {

	List<SocioNegociosModel> buscarSnLike(Map params);
	List<SocioNegociosModel> listarSocioNegocio(Map params);
	void registrarSocioNegocio(Map params);
	SocioNegociosModel buscarSocioNegocio(Map params) throws Exception;
	List<SocioNegociosContactoModel> buscarSocioNegocioContacto(Map params) throws Exception;
}
