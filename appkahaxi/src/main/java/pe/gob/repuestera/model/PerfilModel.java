package pe.gob.repuestera.model;

import java.util.List;

import lombok.Data;

@Data
public class PerfilModel {
	
	private Integer id;
	
	private Integer idPerfil;
	private String identificador;
	private Integer activo;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private String fechaModificacion;    
    private String menu;
    private Integer check;
}