package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class AutorizacionModel {
	private Integer id;
	
	private String authority;
	private String username;
	private String password;
	private String nombres;
	private String apellidos;
	private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModiifcacion;
}