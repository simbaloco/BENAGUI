package pe.gob.repuestera.serviceImpl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.controlador.rest.maestros.PerfilRestController;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.PerfilModel;
import pe.gob.repuestera.model.SerieModel;
import pe.gob.repuestera.repository.maestros.PerfilMapper;
import pe.gob.repuestera.repository.maestros.SerieMapper;
import pe.gob.repuestera.service.maestros.PerfilService;
import pe.gob.repuestera.service.maestros.SerieService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class SerieServiceImpl implements SerieService {

	private static final Logger logger = LogManager.getLogger(PerfilRestController.class);

	@Autowired
	private SerieMapper serieMapper;
	@Autowired
	private JsonUtils jsonUtils;
	
	@Override
	public List<SerieModel> listarSeries(String datoBuscar, String tipoDocumento) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		params.put(Constante.PARAM_SP_COD_TIPO_DOCUMENTO, tipoDocumento);
		
		logger.info("params ===> " + params);

		List<SerieModel> perfilList = serieMapper.listarSerie(params);
		
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarSeries ===> " + perfilList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return perfilList;
	}
	
	@Override
	public void registrarSerie(SerieModel serieModel, String usuario) throws Exception {
				
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_SERIE, serieModel.getCodSerie());
		params.put(Constante.PARAM_SP_COD_TIPO_DOCUMENTO, serieModel.getTipoDocumento());
		params.put(Constante.PARAM_SP_DESCRIPCION, serieModel.getDescripcion());
		params.put(Constante.PARAM_SP_NRO_SERIE, serieModel.getNroSerie());
		params.put(Constante.PARAM_SP_CORRELATIVO, serieModel.getCorrelativo());
		params.put(Constante.PARAM_SP_MAXCORRELATIVO, serieModel.getMaxcorrelativo());
		params.put(Constante.PARAM_SP_ACTIVO, serieModel.getActivo());
		params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);

		logger.info("params ===> " + params);

		serieMapper.registrarSerie(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info(mensajeResultado);

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}

	}

	@Override
	public SerieModel buscarSerie(int codSerie) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_SERIE, codSerie);

		logger.info("params ===> " + params);

		SerieModel serieModel = serieMapper.buscarSerie(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("buscarSerie ===> " + serieModel.toString());

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return serieModel;
		
	}
	

}
