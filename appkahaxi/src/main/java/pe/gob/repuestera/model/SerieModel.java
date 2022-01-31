package pe.gob.repuestera.model;

import lombok.Data;

@Data
public class SerieModel {
	
	private Integer id;
	
	private Integer codSerie;
	private String tipoDocumento;
	private String desTipoDocumento;
	private String descripcion;
    private String nroSerie;
    private Integer correlativo;
    private Integer maxcorrelativo;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private String fechaModificacion;
}
