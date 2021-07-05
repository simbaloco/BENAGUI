package pe.gob.repuestera.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;

import pe.gob.repuestera.model.ComboModel;
import pe.gob.repuestera.model.GenericModel;
import pe.gob.repuestera.model.MenuModel;
import pe.gob.repuestera.model.ParametrosGeneralesModel;
import pe.gob.repuestera.model.TipoCambioModel;

public interface GenericService {
	
	public List<ComboModel> cargarCombo(String codMaestro) throws Exception;
	public List<ComboModel> cargarComboPadre(String codMaestro, String codCatalogoPadre, String codPadre) throws Exception;
	public List<ComboModel> cargarComboPais() throws Exception;
	public List<ComboModel> cargarComboUbigeo(int codTipo, String codDepartamento, String codProvincia) throws Exception;
	public List<ComboModel> cargarComboVendedor() throws Exception;
	public List<ComboModel> cargarComboListaPrecio() throws Exception;
	public List<MenuModel> cargarMenu(Authentication authentication) throws Exception;
	public List<ParametrosGeneralesModel> cargarParametrosGenerales() throws Exception;
	public String generarCodigo(String prefijo) throws Exception;
	public BigDecimal buscarTc(Integer dia, Integer mes, Integer anio) throws Exception;
	public void registrarTc(TipoCambioModel registro, String usuario) throws Exception;
	public void actualizarParametrosGenerales(GenericModel registro, String usuario) throws Exception;
}
