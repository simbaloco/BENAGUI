package pe.gob.repuestera.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class VentaDetModel {
	private Integer id;
	// PK
	private Integer idVentaDet;
	// FK
	private String nroDocumento;
	private String codArticulo;
	// columnas
	private Integer cantidad;
    private BigDecimal precioUnitario;
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
