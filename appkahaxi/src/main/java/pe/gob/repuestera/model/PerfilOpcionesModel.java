package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class PerfilOpcionesModel {
	private Integer id;
	
	private Integer idPerfil;
	private Integer idMenu;
	private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModiifcacion;
}