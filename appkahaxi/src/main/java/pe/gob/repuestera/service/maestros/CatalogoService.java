package pe.gob.repuestera.service.maestros;

import java.util.List;

import pe.gob.repuestera.model.CatalogoModel;


public interface CatalogoService {
	
	String buscarIgv(String codMaestro) throws Exception;
	void modificarIgv(String igv, String usuario) throws Exception;
	List<CatalogoModel> buscarDataCatalogoLike(String codMaestro, String codCatalogoPadre, String codDataPadre, String datoCliente) throws Exception;
	CatalogoModel buscarDataCatalogo(String codMaestro, int codDataCatalogo) throws Exception;
	Integer buscarFlagSunat(String codMaestro) throws Exception;
	void registrarDataCatalogo(CatalogoModel registro, String usuario) throws Exception;
	void modificarDataCatalogo(CatalogoModel registro, String usuario) throws Exception;
	
}
