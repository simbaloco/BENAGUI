package pe.gob.repuestera.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ComprobantePagoDetModel {

	private Integer id;
	// PK
	private Integer idCompraDet;
	// FK
	private String nroDocumento;
	private String codArticulo;
    private String codAlmacen;
	// columnas
    private String codGuiaRemision;
    private Integer linea;
    private Integer lineaReferencia;
	private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal precioUnitarioIgv;
    private BigDecimal subTotal;
    private BigDecimal subTotalIgv;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    // soporte para los listados
    private String descripcionArticulo;
    private Integer cantidadPendienteGuiaRemision;
    private String marca;
    private String codEstandar;
}
