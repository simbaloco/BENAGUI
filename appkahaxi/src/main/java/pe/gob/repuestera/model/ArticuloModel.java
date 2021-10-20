package pe.gob.repuestera.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class ArticuloModel {
	private Integer id;
	
	private String codigoArticulo;
	private String codigoEstandar;
	private String codigoAntiguo;
	private String codigoBarras;
    private String descripcion;
    private String codigoMarcaArticulo;
    private String descripcionMarcaArticulo;
    private String codigoTipo;
    private String descripcionTipo;
    private String codigoSeccion;
    private String descripcionSeccion;
    private String codigoUnidadMedida;
    private String descripcionUnidadMedida;
    private String codigoMarcaVehiculo;
    private String descripcionMarcaVehiculo;
    private String codigoModelo;
    private String descripcionModelo;
    private String codigoMotor;
    private String descripcionMotor;
    private String codigoAplicacion;
    private String descripcionAplicacion; 
    private Integer stock;
    private BigDecimal ultimoPrecioCompra;
    private String observaciones;
    private byte[] imagen;
    private Integer activo;
    private String codigoUsuarioRegistra;
    private Date fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;
    // atributos de soporte
    private BigDecimal precioVentaUnitario;
    private BigDecimal precioReferencia;
	private Integer flagOcAsociada;
}
