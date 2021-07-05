package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class UsuarioModel {
	private Integer id;
	
	private String username;
	private String password;
	private String nombres;
	private String apePaterno;
	private String apeMaterno;
	private Integer activo;
	private String perfiles;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    private Integer opcion;
}