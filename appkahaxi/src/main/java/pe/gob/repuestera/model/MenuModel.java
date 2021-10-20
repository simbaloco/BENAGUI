package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class MenuModel {
	private Integer id;
	
	private Integer nivel;
	private Integer idPadre;
	private String url;
	private String descripcion;
	private String icono;
	private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModiifcacion;
    private Boolean have_children;
    private Integer check;
    private Integer nivelMaximo;
}