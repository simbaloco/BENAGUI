package pe.gob.repuestera.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class GuiaRemisionDetModel {

	private Integer id;
	// PK
	private Integer idCompraDet;
	// FK
	private String nroDocumento;
	private String codArticulo;
    private String codAlmacen;
	// columnas
    private Integer linea;
    private Integer lineaReferencia;
	private Integer cantidad;
    private Integer cantidadPendiente;
    private BigDecimal precioUnitario;
    private BigDecimal precioUnitarioIgv;
    private BigDecimal precioReferencia;
    private Integer porcentajeDcto;
    private BigDecimal precioConDcto;
    private BigDecimal subTotal;
    private BigDecimal subTotalIgv;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    // soporte para los listados
    private String descripcionArticulo;
    private String marca;
    private String codEstandar;
}
