package pe.gob.repuestera.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class GuiaRemisionCabModel {

	private Integer id;
	// PK
	private String numeroDocumento;
    private String serie;
    private String correlativo;
	// FK
	private String codigoProv;
	private String username;
    private String ordenCompra;
	// columnas
	private String fechaContabilizacion;
    private String fechaDocumento;
    private String fechaEntrega;
    private String codigoTipoMoneda;
    private String codigoCondPago;
    private String codigoDias;
    private String codigoEstadoProceso;
    private String codigoEstado;
    private String codigoMotivoTraslado;
    private BigDecimal tipoCambio;
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
	private String direccionFiscal;
	private String descripcionTipoMoneda;
	private String descripcionCondPago;
	private String descripcionEstado;
    private String fechaRegistroFormato;
    private Integer cantidadFacturasAsociadas;

    // DETALLE
    private List<GuiaRemisionDetModel> detalle;

    public String getSerieCorrelativo() {
        return serie + "-" + correlativo;
    }
}
