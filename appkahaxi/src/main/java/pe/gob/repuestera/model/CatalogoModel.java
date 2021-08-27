package pe.gob.repuestera.model;

import lombok.Data;

@Data
public class CatalogoModel {
	private Integer id;
	
	private Integer idDataCatalogo;
	private String codMaestro;
	private String codData;
	private String descData;	
	private String codCatalogoPadre;
	private String codDataPadre;	
	private Integer activo;
	private String userRegistra;
	private String userModifica;
	private String fechaRegistro;	
	private String marcaDescripcion;
    private Integer flagSunat;
}
