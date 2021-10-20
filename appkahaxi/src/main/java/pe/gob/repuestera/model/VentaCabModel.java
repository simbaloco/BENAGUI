package pe.gob.repuestera.model;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class VentaCabModel {
	private Integer id;
	// PK
	private String numeroDocumento;
	// FK
	private String codigoCliente;
	private String username;
	// columnas
	private String fechaContabilizacion;
    private String fechaValidoHasta;
    private String codigoTipoMoneda;
    private String codigoCondPago;
    private String codigoDias;
    private String codigoEstado;
    private String nroRequerimiento;
    private String asunto;
    private String atencion;
    private BigDecimal tipoCambio;
    private String observaciones;
    private String numeroDocumentoRef;
    private BigDecimal porcDctoTotal;
    private BigDecimal subTotal;
    private BigDecimal descuento;
    private BigDecimal igv;
    private BigDecimal total;
    private String codigoEstadoProceso;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private String fechaModificacion;
    // soporte para los listados
	private String nombreUsuario;
	private String nroDocCliente; 
	private String nombreCliente;
	private String direccionFiscal;
	private String email;
	private String celular;
	private String descripcionTipoMoneda;
	private String descripcionCondPago;
	private String descripcionDias;
	private String descripcionEstado;
    // para los objetos que necesiten referenciare el documento base
    private String numeroDocumentoBase;
    // DETALLE
    private List<VentaDetModel> detalle;
}
