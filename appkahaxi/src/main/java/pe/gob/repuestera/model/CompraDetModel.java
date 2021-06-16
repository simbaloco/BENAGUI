package pe.gob.repuestera.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class CompraDetModel {
	private Integer id;
	// PK
	private Integer idCompraDet;
	// FK
	private String nroDocumento;
	private String codArticulo;
	// columnas
    private Integer linea;
	private Integer cantidad;
    private Integer cantidadPendiente;
    private BigDecimal precioUnitario;
    private BigDecimal igvDetalle;
    private BigDecimal subTotal;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    // soporte para los listados
    private String descripcionArticulo;
    private String marca;
}
