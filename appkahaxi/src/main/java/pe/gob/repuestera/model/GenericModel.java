package pe.gob.repuestera.model;

import java.util.List;

import lombok.Data;

@Data
public class GenericModel {
	
	private String numeroDocumento;
	private String email;
	private String enviarCodigo;	
	private List<ParametrosGeneralesModel> lista;
	
}
