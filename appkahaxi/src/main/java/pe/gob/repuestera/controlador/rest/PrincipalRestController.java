package pe.gob.repuestera.controlador.rest;

import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.repuestera.model.ComboModel;
import pe.gob.repuestera.model.MenuModel;
import pe.gob.repuestera.model.TipoCambioModel;
import pe.gob.repuestera.model.UsuarioModel;
import pe.gob.repuestera.service.GenericService;
import pe.gob.repuestera.service.maestros.ArticuloService;
import pe.gob.repuestera.util.Constante;

@RestController
public class PrincipalRestController {

	private static final Logger logger = LogManager.getLogger(PrincipalRestController.class);
	
	@Autowired
	ArticuloService articuloService;
	@Autowired
	private GenericService genericService;
	@Autowired
    HttpSession session;
	
	
	@GetMapping ("/cargarComboPadre/{codMaestro}/{codCatalogoPadre}/{codPadre}")
    public ResponseEntity<List<ComboModel>> cargarComboPadre(@PathVariable(Constante.PARAM_COD_MAESTRO_CONTROLLER) String codMaestro, 
    														 @PathVariable(Constante.PARAM_COD_CATALOGO_PADRE_CONTROLLER) String codCatalogoPadre,
    														 @PathVariable(Constante.PARAM_COD_PADRE_CONTROLLER) String codPadre) throws Exception {
		logger.info("Inicio cargarComboPadre.......");
		List<ComboModel> comboList = genericService.cargarComboPadre(codMaestro, codCatalogoPadre, codPadre);
        logger.info("Fin cargarComboPadre.......");

        return new ResponseEntity<>(comboList, HttpStatus.OK);
    }
    
    
    @GetMapping ("/cargarMenu")
    public ResponseEntity<List<MenuModel>> cargarMenu(Authentication authentication) throws Exception {
        logger.info("entrando cargarMenu.......");
    	List<MenuModel> listadoMenu = genericService.cargarMenu(authentication);
    	
        logger.info("fin cargarMenu.......");
    	
        return new ResponseEntity<List<MenuModel>>(listadoMenu, HttpStatus.OK);      
    }
    
    @GetMapping ("/generarCodigo/{prefijo}")
    public ResponseEntity<String> generarCodigo(@PathVariable(Constante.PARAM_PREFIJO) String prefijo) throws Exception {
        
    	logger.info("entrando generarCodigo.......prefijo-->" + prefijo);
        // obteniendo el código
        String codigo = genericService.generarCodigo(prefijo);
        logger.info("generarCodigo ----> success!!!, codigo--->" + codigo);
        
		return new ResponseEntity<String>(codigo, HttpStatus.OK);        
    }
    
    @GetMapping ("/buscarTc/{dia}/{mes}/{anio}")
    public ResponseEntity<BigDecimal> buscarTc(@PathVariable(Constante.PARAM_DIA) Integer dia, 
    										   @PathVariable(Constante.PARAM_MES) Integer mes, 
    										   @PathVariable(Constante.PARAM_ANIO) Integer anio) throws Exception {
        
    	logger.info("entrando buscarTc.......dia-->" + dia + "/mes-->" + mes + "/anio-->" + anio);
    	// obteniendo el código
        BigDecimal tc = genericService.buscarTc(dia, mes, anio);
        logger.info("fin buscarTc.......");
		
		return new ResponseEntity<BigDecimal>(tc, HttpStatus.OK);        
    } 

    @PostMapping ("/registrarTc")
    public ResponseEntity<String> registrarTc(@RequestPart("registro") TipoCambioModel registro) throws Exception {
        logger.info("entrando registrarTc.......");
        String usuario = ((UsuarioModel)session.getAttribute("usuarioLogueado")).getUsername();
        genericService.registrarTc(registro, usuario);
        // evaluando el retorno
        logger.info("fin registrarTc");
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping ("/cargarComboUbigeo/{codTipo}/{codDepartamento}/{codProvincia}")
    public ResponseEntity<List<ComboModel>> cargarComboUbigeo(@PathVariable(Constante.PARAM_COD_TIPO) int codTipo,
    														 @PathVariable(Constante.PARAM_COD_DEPARTAMENTO_CONTROLLER) String codDepartamento, 
    														 @PathVariable(Constante.PARAM_COD_PROVINCIA_CONTROLLER) String codProvincia) throws Exception {
		
    	logger.info("Inicio cargarComboUbigeo.......");
		List<ComboModel> comboList = genericService.cargarComboUbigeo(codTipo,codDepartamento, codProvincia);
        logger.info("Fin cargarComboUbigeo.......");
        
        return new ResponseEntity<>(comboList, HttpStatus.OK);
        
    }
    
    
}
