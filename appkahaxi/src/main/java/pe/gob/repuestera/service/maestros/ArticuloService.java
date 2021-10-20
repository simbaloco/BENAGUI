package pe.gob.repuestera.service.maestros;

import java.util.List;

import pe.gob.repuestera.model.ArticuloModel;

public interface ArticuloService {
	
	List<ArticuloModel> listarArticulos(String datoBuscar, String codMarcaArticulo, String codTipo, String codSeccion, String codUndMedida) throws Exception;
	ArticuloModel buscarArticulo(String codigoArticulo) throws Exception;	
	void registrarArticulo(ArticuloModel articuloModel, String usuario) throws Exception;
	void modificarArticulo(ArticuloModel articuloModel, String usuario) throws Exception;
	List<ArticuloModel> buscarArticuloLike(String datoBuscar, String codCliente) throws Exception;

}
