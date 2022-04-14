package pe.gob.repuestera.service.maestros;

import java.util.List;
import java.util.Map;

import pe.gob.repuestera.model.SerieModel;

public interface SerieService {
	
	List<SerieModel> listarSeries(String datoBuscar, String tipoDocumento) throws Exception;
	void registrarSerie(SerieModel serieModel, String usuario) throws Exception;
	SerieModel buscarSerie(int codSerie) throws Exception;
	List<SerieModel> cargarComboSerie(String codTipoDocumento) throws Exception;
	
}
