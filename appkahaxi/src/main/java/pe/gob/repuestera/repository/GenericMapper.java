package pe.gob.repuestera.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pe.gob.repuestera.model.ComboModel;
import pe.gob.repuestera.model.MenuModel;
import pe.gob.repuestera.model.ParametrosGeneralesModel;

@Repository
@Transactional
public interface GenericMapper {

	public List<ComboModel> cargarCombo(Map params);
	public List<ComboModel> cargarComboPadre(Map params);
	public List<ComboModel> cargarComboPais(Map params) throws Exception;
	public List<ComboModel> cargarComboUbigeo(Map params) throws Exception;
	public List<ComboModel> cargarComboVendedor(Map params) throws Exception;
	public List<ComboModel> cargarComboListaPrecio(Map params) throws Exception;
	public List<MenuModel> cargarMenu(Map params);
	public List<ParametrosGeneralesModel> cargarParametrosGenerales(Map params);
	@Select("SELECT FN_GENERAR_CODIGO(#{codigo, mode=IN, jdbcType=VARCHAR}, 0) AS CODIGO")
	public String generarCodigo(@Param("codigo") String codigo);
	public BigDecimal buscarTc(Map params);
	public void registrarTc(Map params);
	public void actualizarParametrosGenerales(Map params);
	public List<MenuModel> cargarOpcionesMenu(Map params);
	public List<ComboModel> cargarComboListaPerfil(Map params) throws Exception;
}
