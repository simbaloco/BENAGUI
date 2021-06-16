package pe.gob.repuestera.model;

import lombok.Data;

@Data
public class CatalogoModel {
	private Integer id;
	
	private int idDataCatalogo;
	private String codMaestro;
	private String codData;
	private String descData;	
	private String codCatalogoPadre;
	private String codDataPadre;	
	private int activo;
	private String userRegistra;
	private String userModifica;
	private String fechaRegistro;	
	private String marcaDescripcion;
    private Integer flagSunat;
}
