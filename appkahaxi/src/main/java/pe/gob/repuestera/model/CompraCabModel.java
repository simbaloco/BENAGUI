package pe.gob.repuestera.model;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CompraCabModel {

	private Integer id;
	// PK
	private String numeroDocumento;
	// FK
	private String codigoProv;
	private String username;
	// columnas
	private String direccionDespacho;
	private String personaContacto;
	private String codDireccionDespacho;
    private String codPersonaContacto;
    private String direccionDespachoConcat;
    private String personaContactoConcat;
	private String fechaContabilizacion;
    private String fechaValidoHasta;
    private String codigoTipoMoneda;
    private String fechaEntrega;
    private String codigoCondPago;
    private String codigoDias;
    private String codigoEstado;
    private String numeroDocumentoRef;
    private BigDecimal tipoCambio;
    private String observaciones;
    private BigDecimal subTotal;
    private BigDecimal igv;
    private BigDecimal total;
    private String nroPedido;
    private String cotizacionSap;
    private String codigoEstadoProceso;
    private Integer activo;
    private Integer flagEnvio;
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private String fechaModificacion;
    private String email;
    private String fechaContabilizacionDmy;
    private String fechaValidoHastaDmy;
    private String fechaEntregaDmy;

    // soporte para los listados
	private String nombreUsuario;
	private String nroDocProv; 
	private String nombreProv;
	private String direccionFiscal;
	private String descripcionTipoMoneda;
	private String descripcionCondPago;
	private String descripcionEstado;
    // para los objetos que necesiten referenciare el documento base
    private String numeroDocumentoBase;
    private Integer cantidadGrAsociadas;
    
    // DETALLE
    private List<CompraDetModel> detalle;
}
