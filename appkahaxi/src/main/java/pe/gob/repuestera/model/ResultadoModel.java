package pe.gob.repuestera.model;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ResultadoModel {
	private Integer id;
	
	private BigDecimal flagResultado;
	private String mensajeResultado;
	private BigDecimal valorResultado;
}
