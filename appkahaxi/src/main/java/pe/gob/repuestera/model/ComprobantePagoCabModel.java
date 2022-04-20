package pe.gob.repuestera.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class ComprobantePagoCabModel {

	private Integer id;
	// PK
	private String numeroDocumento;
    private String serie;
    private String correlativo;
	// FK
	private String codigoProv;
	private String codigoCliente;
	private String username;
    private String ordenCompra;
    private String ordenVenta;
	// columnas
    private String direccionDespacho;
	private String personaContacto;	
	private String codDireccionDespacho;
	private String codPersonaContacto;	
	private String fechaContabilizacion;
    private String fechaDocumento;
    private String fechaVencimiento;
    private String codigoTipoMoneda;
    private String codigoCondPago;
    private String codigoDias;
    private String codigoEstadoProceso;
    private String codigoEstadoPago;
    private String codigoEstado;
    private BigDecimal tipoCambio;
    private BigDecimal porcDctoTotal;
    private BigDecimal descuento;
    private BigDecimal subTotal;
    private BigDecimal igv;
    private BigDecimal total;
    private String observaciones;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;

    // soporte para los listados
	private String nombreUsuario;
	private String nroDocProv; 
	private String nombreProv;
	private String nroDocCliente; 
	private String nombreCliente;
	private String direccionFiscal;
	private String email;
	private String celular;
	private String descripcionTipoMoneda;
	private String descripcionCondPago;
	private String descripcionEstado;
    private String descripcionEstadoPago;
    private String fechaRegistroFormato;

    // DETALLE
    private List<ComprobantePagoDetModel> detalle;

    public String getSerieCorrelativo() {
        return serie + "-" + correlativo;
    }
}
