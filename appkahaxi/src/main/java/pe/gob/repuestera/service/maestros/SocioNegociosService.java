package pe.gob.repuestera.service.maestros;

import java.util.List;
import pe.gob.repuestera.model.SocioNegociosContactoModel;
import pe.gob.repuestera.model.SocioNegociosModel;

public interface SocioNegociosService {
	
	public List<SocioNegociosModel> buscarSnLike(String tipoSn, String datoBuscar) throws Exception;
	List<SocioNegociosModel> listarSocioNegocio(String tipoSocioNegocio, String datoBuscar, String tipoDocumento) throws Exception;
	void registrarSocioNegocio(SocioNegociosModel socioNegocioModel, String usuario) throws Exception;
	SocioNegociosModel buscarSocioNegocio(String codigoSn) throws Exception;
	List<SocioNegociosContactoModel> buscarSocioNegocioContacto(String codigoSn) throws Exception;
	
}
