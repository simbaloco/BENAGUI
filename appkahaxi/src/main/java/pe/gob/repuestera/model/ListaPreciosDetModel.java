package pe.gob.repuestera.model;

import java.util.Date;

import lombok.Data;

@Data
public class ListaPreciosDetModel {

	private Integer id;
	private Integer idListaPrecio;
	private String codArticulo;	
	private String codEstandar;
	private String codAntiguo;
	private String descripcion;
	private String descMarcaArticulo;
	private String descTipo;
	private String descSeccion;
	private String descUndMedida;
	private Double precio;
	private Double precioRef;
	private Double ultPrecioCompra;
	private Integer activo;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;   
    
    
}
