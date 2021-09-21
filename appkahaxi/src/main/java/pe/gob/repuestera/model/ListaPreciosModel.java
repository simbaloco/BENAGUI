package pe.gob.repuestera.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class ListaPreciosModel {
	private Integer id;
	private Integer idListaPrecio;
	
	private String descripcion;
	private String codMoneda;
	private String desMoneda;
	private Integer activo;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    private List<ListaPreciosDetModel> detalle;
}
