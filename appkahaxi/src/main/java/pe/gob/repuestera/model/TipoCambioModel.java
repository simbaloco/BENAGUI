package pe.gob.repuestera.model;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class TipoCambioModel {
	private Integer id;
	
	private Integer dia;
	private Integer mes;
	private Integer anio;
	private BigDecimal tc;
}