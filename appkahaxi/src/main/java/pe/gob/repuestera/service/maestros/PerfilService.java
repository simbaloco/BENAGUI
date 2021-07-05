package pe.gob.repuestera.service.maestros;

import java.util.List;
import java.util.Map;

import pe.gob.repuestera.model.PerfilModel;

public interface PerfilService {
	
	List<PerfilModel> listarPerfiles(String datoBuscar) throws Exception;
	void registrarPerfil(PerfilModel perfilModel, String usuario) throws Exception;
	PerfilModel buscarPerfil(String idPerfil) throws Exception;
	List<PerfilModel> cargarPerfilUsuario(String username) throws Exception;
	
}
