package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.PerfilModel;

@Repository
@Transactional
public interface PerfilMapper {
	
	List<PerfilModel> listarPerfiles(Map params);
	void registrarPerfil(Map params);
	PerfilModel buscarPerfil(Map params);
	List<PerfilModel> cargarPerfilUsuario(Map params);
	
}
