package pe.gob.repuestera.serviceImpl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.exception.ErrorControladoException;
import pe.gob.repuestera.model.ComboModel;
import pe.gob.repuestera.model.GenericModel;
import pe.gob.repuestera.model.MenuModel;
import pe.gob.repuestera.model.ParametrosGeneralesModel;
import pe.gob.repuestera.model.TipoCambioModel;
import pe.gob.repuestera.repository.GenericMapper;
import pe.gob.repuestera.service.GenericService;
import pe.gob.repuestera.util.Constante;
import pe.gob.repuestera.util.JsonUtils;

@Service
public class GenericServiceImpl implements GenericService{

	private static final Logger logger = LogManager.getLogger(GenericServiceImpl.class);
	
	@Autowired
	private GenericMapper genericMapper;
	@Autowired
	private JsonUtils jsonUtils;

	@Override
	public List<ComboModel> cargarCombo(String codMaestro) throws Exception {
		
    	logger.info("entrando cargarCombo.......");
        Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		// seteando parámetros
		params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
        // obteniendo la lista
		comboList = genericMapper.cargarCombo(params);
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarCombo.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarCombo.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarCombo ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		return comboList;
	}

	@Override
	public List<ComboModel> cargarComboPadre(String codMaestro, String codCatalogoPadre, String codPadre) throws Exception{
		logger.info("entrando cargarComboPadre.......");
        Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		// seteando parámetros
		params.put(Constante.PARAM_SP_COD_MAESTRO, codMaestro);
		params.put(Constante.PARAM_SP_COD_CATALOGO_PADRE, codCatalogoPadre);
        params.put(Constante.PARAM_SP_COD_PADRE, codPadre);
        // obteniendo la lista
		comboList = genericMapper.cargarComboPadre(params);
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarComboPadre.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarComboPadre.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarComboPadre ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		
 		return comboList;
	}


	@Override
	public List<MenuModel> cargarMenu(Authentication authentication) throws Exception{
		logger.info("entrando cargarMenu.......");
    	List<MenuModel> listadoMenu = null;
        
        // seteando parámetros  
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USERNAME, authentication.getName());
        // ejcutando la query
        listadoMenu = genericMapper.cargarMenu(params);
        logger.info("cargarMenu........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarMenu.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("cargarMenu.......MENSAJE_RESULTADO--->" + mensajeResultado);
        // evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarMenu ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		return listadoMenu;
		
	}

	@Override
	public List<ParametrosGeneralesModel> cargarParametrosGenerales() throws Exception{
		logger.info("entrando cargarParametrosGenerales.......");
    	List<ParametrosGeneralesModel> listadoParametrosGenerales = null;
        
        // seteando parámetros  
        Map<String, Object> params = new HashMap();
        // ejcutando la query
        listadoParametrosGenerales = genericMapper.cargarParametrosGenerales(params);
        logger.info("cargarParametrosGenerales........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarParametrosGenerales.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("cargarParametrosGenerales.......MENSAJE_RESULTADO--->" + mensajeResultado);
        // evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarParametrosGenerales ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		return listadoParametrosGenerales;
		
	}
	
	@Override
	public String generarCodigo(String prefijo) throws Exception{
		// TODO Auto-generated method stub
		return genericMapper.generarCodigo(prefijo);
	}


	@Override
	public BigDecimal buscarTc(Integer dia, Integer mes, Integer anio) throws Exception{
		logger.info("entrando buscarTc.......dia-->" + dia + "/mes-->" + mes + "/anio-->" + anio);
    	// seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_DIA, dia);
        params.put(Constante.PARAM_SP_MES, mes);
        params.put(Constante.PARAM_SP_ANIO, anio);
        // obteniendo el código
        BigDecimal tc = genericMapper.buscarTc(params);
        logger.info("buscarTc........obteniendo el retorno");		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("buscarTc.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("buscarTc.......MENSAJE_RESULTADO--->" + mensajeResultado);
        // evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("buscarTc ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
		return tc;
	}


	@Override
	public void registrarTc(TipoCambioModel registro, String usuario) throws Exception{
		logger.info("entrando registrarTc.......");
        
        // seteando parámetros
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);
        params.put(Constante.PARAM_SP_DIA, registro.getDia());
        params.put(Constante.PARAM_SP_MES, registro.getMes());
        params.put(Constante.PARAM_SP_ANIO, registro.getAnio());
        params.put(Constante.PARAM_SP_TIPO_CAMBIO, registro.getTc());
        
        // REGISTRANDO COTIZACION DE VENTA
        genericMapper.registrarTc(params);
        		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("registrarTc.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("registrarTc.......MENSAJE_RESULTADO--->" + mensajeResultado);
		// evaluando el resultado
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("registrarTc ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
	}

	@Override
	public List<ComboModel> cargarComboPais() throws Exception {
		
		logger.info("entrando cargarComboPais.......");
		Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		
        // obteniendo la lista
		comboList = genericMapper.cargarComboPais(params);
		
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarComboPais.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarComboPais.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarComboPais ----> success!!!"); 			
		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
 		
 		return comboList;
		
	}

	@Override
	public List<ComboModel> cargarComboUbigeo(int codTipo, String codDepartamento, String codProvincia) throws Exception {
		
		logger.info("entrando cargarComboVendedor.......");
		Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		
		// seteando parámetros
		params.put(Constante.PARAM_SP_COD_TIPO, codTipo);
		params.put(Constante.PARAM_SP_COD_DEPARTAMENTO, codDepartamento);
		params.put(Constante.PARAM_SP_COD_PROVINCIA, codProvincia);
		
        // obteniendo la lista
		comboList = genericMapper.cargarComboUbigeo(params);
		
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarComboVendedor.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarComboVendedor.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarComboVendedor ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		
 		return comboList;
		
	}

	@Override
	public List<ComboModel> cargarComboVendedor() throws Exception {
		
		logger.info("entrando cargarComboVendedor.......");
		Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		
        // obteniendo la lista
		comboList = genericMapper.cargarComboVendedor(params);
		
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarComboVendedor.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarComboVendedor.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarComboVendedor ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		
 		return comboList;
		
	}

	@Override
	public List<ComboModel> cargarComboListaPrecio() throws Exception {
		
		logger.info("entrando cargarComboListaPrecio.......");
		Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		
        // obteniendo la lista
		comboList = genericMapper.cargarComboListaPrecio(params);
		
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarComboListaPrecio.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarComboListaPrecio.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarComboListaPrecio ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		
 		return comboList;
		
	}

	@Override
	public void actualizarParametrosGenerales(GenericModel registro, String usuario) throws Exception {
		
		logger.info("entrando actualizarParametrosGenerales......." + registro.getLista());
		
		String dataJSON = jsonUtils.obtenerJson(registro.getLista());
		
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_USUARIO_REGISTRA, usuario);
        params.put(Constante.PARAM_SP_DATA_JSON, dataJSON);
        
        genericMapper.actualizarParametrosGenerales(params);
        		
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("actualizarParametrosGenerales.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("actualizarParametrosGenerales.......MENSAJE_RESULTADO--->" + mensajeResultado);
		
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("actualizarParametrosGenerales ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);
		}
		
	}

	@Override
	public List<MenuModel> cargarOpcionesMenu(int idPerfil) throws Exception {
		
		logger.info("entrando cargarOpcionesMenu.......");
    	List<MenuModel> listadoMenu = null;
         
        Map<String, Object> params = new HashMap();
        params.put(Constante.PARAM_SP_ID_PERFIL, idPerfil);
        
        listadoMenu = genericMapper.cargarOpcionesMenu(params);
        
        String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarOpcionesMenu.......FLAG_RESULTADO------>" + flagResultado);
		logger.info("cargarOpcionesMenu.......MENSAJE_RESULTADO--->" + mensajeResultado);
        
		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
			logger.info("cargarOpcionesMenu ===> " + listadoMenu.toString());
		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);
		} else {
			throw new Exception(mensajeResultado);
		}
		return listadoMenu;
		
	}
	
	@Override
	public List<ComboModel> cargarComboListaPerfil() throws Exception {
		
		logger.info("entrando cargarComboListaPerfil.......");
		Map<String, Object> params = new HashMap();
		List<ComboModel> comboList;
		
        // obteniendo la lista
		comboList = genericMapper.cargarComboListaPerfil(params);
		
        // evaluando el retorno
		String flagResultado = (String) params.get(Constante.PARAM_FLAG_RESULTADO);
        String mensajeResultado = (String) params.get(Constante.PARAM_MENSAJE_RESULTADO);
        logger.info("cargarComboListaPerfil.......FLAG_RESULTADO------>" + flagResultado);
 		logger.info("cargarComboListaPerfil.......MENSAJE_RESULTADO--->" + mensajeResultado);
 		
 		if(flagResultado.equals(Constante.RESULTADO_EXITOSO)) {
 			logger.info("cargarComboListaPerfil ----> success!!!");

		} else if(flagResultado.equals(Constante.RESULTADO_ALTERNATIVO)) {
			throw new ErrorControladoException(mensajeResultado);

		} else {
			throw new Exception(mensajeResultado);

		}
 		
 		return comboList;
		
	}
	
}
