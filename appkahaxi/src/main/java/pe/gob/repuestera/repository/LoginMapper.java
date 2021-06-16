package pe.gob.repuestera.repository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.AutorizacionModel;
import pe.gob.repuestera.model.UsuarioModel;

@Repository
@Transactional
public interface LoginMapper {

	public UsuarioModel buscarUsuario(Map params);
	public List<AutorizacionModel> buscarAutorizacion(Map params);
	
}
