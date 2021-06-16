package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class SocioNegociosContactoModel {
	
	private Integer idContactoSN;	
	private String codigoSocio;	
	private String nombreContacto;	
	private String cargoContacto;	
	private String telefono;
	private String email;
	private String emailFactura;
	private Integer predeterminado;
	private Integer activo;
	private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    
	    
}