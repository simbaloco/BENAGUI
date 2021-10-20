package pe.gob.repuestera.repository.maestros;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.PerfilModel;
import pe.gob.repuestera.model.UsuarioModel;


@Repository
@Transactional
public interface UsuarioMapper {
	
	List<UsuarioModel> listarUsuarios(Map params);
	void registrarUsuario(Map params);
	UsuarioModel buscarUsuario(Map params);
	
}
