package pe.gob.repuestera.model;

import lombok.Data;

@Data
public class ParametrosGeneralesModel {
	
	private String codParametro;
	private String descParametro;
	private String valor;	
	private String tipoCampo;	
	private int activo;
	private String userRegistra;
	private String userModifica;
	private String fechaRegistro;
}
