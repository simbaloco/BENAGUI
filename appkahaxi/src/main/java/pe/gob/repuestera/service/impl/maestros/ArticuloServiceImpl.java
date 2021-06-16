package pe.gob.repuestera.service.impl.maestros;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.controlador.rest.maestros.ArticuloRestController;
import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.ArticuloModel;
import pe.gob.repuestera.repository.maestros.ArticuloMapper;
import pe.gob.repuestera.service.maestros.ArticuloService;
import pe.gob.repuestera.util.Constante;

@Service
public class ArticuloServiceImpl implements ArticuloService {

	private static final Logger logger = LogManager.getLogger(ArticuloRestController.class);

	@Autowired
	private ArticuloMapper articuloMapper;

	@Override
	public List<ArticuloModel> listarArticulos(String datoBuscar, String codMarcaArticulo, String codTipo,
			String codSeccion, String codUndMedida) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
		params.put(Constante.PARAM_SP_COD_MARCA_ARTICULO, codMarcaArticulo);
		params.put(Constante.PARAM_SP_COD_TIPO, codTipo);
		params.put(Constante.PARAM_SP_COD_SECCION, codSeccion);
		params.put(Constante.PARAM_SP_COD_UND_MEDIDA, codUndMedida);

		logger.info("params ===> " + params);

		List<ArticuloModel> articuloList = articuloMapper.listarArticulos(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("listarArticulos ===> " + articuloList.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return articuloList;
	}

	@Override
	public ArticuloModel buscarArticulo(String codigoArticulo) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_ARTICULO, codigoArticulo);

		logger.info("params ===> " + params);

		ArticuloModel articulo = articuloMapper.buscarArticulo(params);

		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
		String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);

		logger.info("flagResultado ===> " + flagResultado);
		logger.info("mensajeResultado ===> " + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("articulo ===> " + articulo.toString());

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}

		return articulo;
	}

	@Override
	public void registrarArticulo(ArticuloModel articuloModel, String usuario) throws Exception {

		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_ESTANDAR, articuloModel.getCodigoEstandar());
		params.put(Constante.PARAM_SP_COD_ANTIGUO, articuloModel.getCodigoAntiguo());
		params.put(Constante.PARAM_SP_COD_BARRAS, articuloModel.getCodigoBarras());
		params.put(Constante.PARAM_SP_DESCRIPCION, articuloModel.getDescripcion());
		params.put(Constante.PARAM_SP_COD_MARCA_ARTICULO, articuloModel.getCodigoMarcaArticulo());
		params.put(Constante.PARAM_SP_COD_TIPO, articuloModel.getCodigoTipo());
		params.put(Constante.PARAM_SP_COD_SECCION, articuloModel.getCodigoSeccion());
		params.put(Constante.PARAM_SP_COD_UND_MEDIDA, articuloModel.getCodigoUnidadMedida());
		params.put(Constante.PARAM_SP_COD_MARCA_VEHICULO, articuloModel.getCodigoMarcaVehiculo());
		params.put(Constante.PARAM_SP_COD_MODELO, articuloModel.getCodigoModelo());
		params.put(Constante.PARAM_SP_COD_MOTOR, articuloModel.getCodigoMotor());
		params.put(Constante.PARAM_SP_COD_APLICACION, articuloModel.getCodigoAplicacion());
		params.put(Constante.PARAM_SP_OBSERVACIONES, articuloModel.getObservaciones());
		params.put(Constante.PARAM_SP_IMAGEN, articuloModel.getImagen());
		params.put(Constante.PARAM_SP_ACTIVO, articuloModel.getActivo());
		params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);

		logger.info("params ===> " + params);

		articuloMapper.registrarArticulo(params);

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
	public void modificarArticulo(ArticuloModel articuloModel, String usuario) throws Exception {
		
		Map<String, Object> params = new HashMap();
		params.put(Constante.PARAM_SP_COD_ARTICULO, articuloModel.getCodigoArticulo());
		params.put(Constante.PARAM_SP_COD_ESTANDAR, articuloModel.getCodigoEstandar());
		params.put(Constante.PARAM_SP_COD_ANTIGUO, articuloModel.getCodigoAntiguo());
		params.put(Constante.PARAM_SP_COD_BARRAS, articuloModel.getCodigoBarras());
		params.put(Constante.PARAM_SP_DESCRIPCION, articuloModel.getDescripcion());
		params.put(Constante.PARAM_SP_COD_MARCA_ARTICULO, articuloModel.getCodigoMarcaArticulo());
		params.put(Constante.PARAM_SP_COD_TIPO, articuloModel.getCodigoTipo());
		params.put(Constante.PARAM_SP_COD_SECCION, articuloModel.getCodigoSeccion());
		params.put(Constante.PARAM_SP_COD_UND_MEDIDA, articuloModel.getCodigoUnidadMedida());
		params.put(Constante.PARAM_SP_COD_MARCA_VEHICULO, articuloModel.getCodigoMarcaVehiculo());
		params.put(Constante.PARAM_SP_COD_MODELO, articuloModel.getCodigoModelo());
		params.put(Constante.PARAM_SP_COD_MOTOR, articuloModel.getCodigoMotor());
		params.put(Constante.PARAM_SP_COD_APLICACION, articuloModel.getCodigoAplicacion());
		params.put(Constante.PARAM_SP_OBSERVACIONES, articuloModel.getObservaciones());
		params.put(Constante.PARAM_SP_IMAGEN, articuloModel.getImagen());
		params.put(Constante.PARAM_SP_ACTIVO, articuloModel.getActivo());
		params.put(Constante.PARAM_SP_USUARIO_MODIFICA, usuario);

		logger.info("params ===> " + params);

		articuloMapper.modificarArticulo(params);

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
	public List<ArticuloModel> buscarArticuloLike(String datoBuscar, String codCliente) throws Exception {

		logger.info("entrando buscarArticuloLike.......");
    	List<ArticuloModel> articuloList = null;
        
        logger.info("datoBuscar--->" + datoBuscar);
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DATO_BUSCAR, datoBuscar);
        params.put(Constante.PARAM_SP_COD_CLIENTE, codCliente);
        
        // ejcutando la query
        articuloList = articuloMapper.buscarArticuloLike(params);
        logger.info("buscarArticuloLike........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("buscarArticuloLike.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("buscarArticuloLike.......MENSAJE_RESULTADO--->" + mensajeResultado);

		if (flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info(mensajeResultado);

		} else if (flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}

		return articuloList;
	}
}
