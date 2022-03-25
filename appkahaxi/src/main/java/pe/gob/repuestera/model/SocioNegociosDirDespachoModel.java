package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class SocioNegociosDirDespachoModel {
	
	private Integer idDirDespachoSN;	
	private String codigoSocio;	
	private String direccionDespacho;
	private Integer activo;
	private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    
	    
}