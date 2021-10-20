package pe.gob.repuestera.service.maestros;

import java.util.List;

import pe.gob.repuestera.model.PerfilModel;
import pe.gob.repuestera.model.UsuarioModel;

public interface UsuarioService {
	
	List<UsuarioModel> listarUsuarios(String datoBuscar, int idPerfil) throws Exception;
	void registrarUsuario(UsuarioModel usuarioModel, String usuario) throws Exception;
	UsuarioModel buscarUsuario(String username) throws Exception;	
	
}
