package pe.gob.repuestera.service.maestros;

import java.util.List;
import pe.gob.repuestera.model.ListaPreciosDetModel;
import pe.gob.repuestera.model.ListaPreciosModel;

public interface ListaPrecioService {
	
	List<ListaPreciosModel> listarListaPrecio(String datoBuscar) throws Exception;
	ListaPreciosModel buscarListaPrecio(int idListaPrecio) throws Exception;
	List<ListaPreciosDetModel> buscarListaPrecioDet(int idListaPrecio) throws Exception;
	void registrarListaPrecio(ListaPreciosModel listaPrecioModel, String usuario) throws Exception;
	
}
