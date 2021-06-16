package pe.gob.repuestera.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class SocioNegociosModel {
	private Integer id;
	private String idSocio;
	
	private String codigoSocio;	
	private String prefijo;
	private String codigoTipoSocio;
	private String codigoTipoDocumento;
	private String descripcionTipoDocumento;
	private String codigoTipoPersona;
	private String numeroDocumento;	
	private String razonSocial;
	private String nombres;
	private String apePaterno;
	private String apeMaterno;	
	private String direccionFiscal;
	private String direccionDespacho;
	private String direccionDespacho2;
	private String direccionDespacho3;
	private String direccionDespacho4;
	private String direccionDespacho5;
	private String email;
	private String celular;
	private String telefonoFijo;
	private String codigoPais;
	private String codigoDepartamento;
	private String codigoProvincia;
	private String codigoDistrito;
	private String ubigeo;
	private String vendedor;
	private String comentarios;
	private String codigoCondicionPago;
	private String codigoDiasCredito;
	private Integer listaPrecios;	
	private String codigoMoneda;	
	private Integer activo;	
    private String codigoUsuarioRegistra;
    private String fechaRegistro;
    private String codigoUsuarioModifica;
    private Date fechaModificacion;    
    
    private String codigoFrecuenciaSocio;	
    private String nombreRazonSocial;
	private String telefono;
	private String contacto;
	
	// DETALLE
    private List<SocioNegociosContactoModel> detalle;	
    
}