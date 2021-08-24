package pe.gob.repuestera.controlador;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import pe.gob.repuestera.model.ComboModel;
import pe.gob.repuestera.model.ParametrosGeneralesModel;
import pe.gob.repuestera.service.GenericService;
import pe.gob.repuestera.util.Constante;

@Controller
public class PrincipalController {
	
	private static final Logger logger = LogManager.getLogger(PrincipalController.class);
		
	@Autowired
	private GenericService genericService;
	@Autowired
    HttpSession session;
	
	@GetMapping({"/", "/index", "/login"})
    public String login(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo login");
			//retorno = Constante.PAGINA_PRINCIPAL;
			retorno = Constante.PAGINA_LOGIN;
			logger.info("saliendo del m�todo login");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping({"/principal"})
    public String principal(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo principal");
			List<ParametrosGeneralesModel> listaParametrosGenerales = genericService.cargarParametrosGenerales();
			session.setAttribute("listaParametrosGenerales", listaParametrosGenerales);
			//retorno = Constante.PAGINA_PRINCIPAL;
			retorno = Constante.PAGINA_PRINCIPAL;
			logger.info("saliendo del m�todo principal, listaParametrosGenerales-->" + listaParametrosGenerales);
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/articulos")
    public String cargarBuscarArticulos(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarBuscarArticulos");
			
			// llenando los combos
			List<ComboModel> listaMarcaArticulo = genericService.cargarCombo(Constante.CATALOGO_MARCA_ARTICULO);
			List<ComboModel> listaSeccionArticulo = genericService.cargarCombo(Constante.CATALOGO_SECCION);
			List<ComboModel> listaUnidadMedida = genericService.cargarCombo(Constante.CATALOGO_UND_MEDIDA);
			List<ComboModel> listaMarcaVehiculo = genericService.cargarCombo(Constante.CATALOGO_MARCA_VEHICULO);
			List<ComboModel> listaModelo = genericService.cargarCombo(Constante.CATALOGO_MODELO);
			List<ComboModel> listaMotor = genericService.cargarCombo(Constante.CATALOGO_MOTOR);
			List<ComboModel> listaAplicacion = genericService.cargarCombo(Constante.CATALOGO_APLICACION);
			model.addAttribute("listaMarcaArticulo", listaMarcaArticulo);
			model.addAttribute("listaSeccion", listaSeccionArticulo);
			model.addAttribute("listaUnidadMedida", listaUnidadMedida);			
			model.addAttribute("listaMarcaArticuloModal", listaMarcaArticulo);
			model.addAttribute("listaSeccionModal", listaSeccionArticulo);
			model.addAttribute("listaUnidadMedidaModal", listaUnidadMedida);
			model.addAttribute("listaMarcaVehiculoModal", listaMarcaVehiculo);
			model.addAttribute("listaModeloModal", listaModelo);
			model.addAttribute("listaMotorModal", listaMotor);
			model.addAttribute("listaAplicacionModal", listaAplicacion);
			
			retorno = Constante.PAGINA_BUSCAR_ARTICULOS;
			logger.info("saliendo del m�todo cargarBuscarArticulos");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/nueva-orden-compra")
	public String cargarOrdenCompra(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
												 @RequestParam(Constante.PARAM_OPCION) String opcion,
												 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
												 @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra,
												 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
												 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
												 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
												 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
												 @RequestParam(Constante.PARAM_VOLVER) String volver) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarOrdenCompra, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento 
					 + "/datoBuscar-->" + datoBuscar + "/nroOrdenCompra-->" + nroOrdenCompra + "/codRepuesto-->" + codRepuesto
					 + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					 + "/estadoParam-->" + estadoParam + "/volver-->" + volver);
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroOrdenCompra", nroOrdenCompra);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_NUEVA_ORDEN_COMPRA;
			logger.info("saliendo del m�todo cargarOrdenCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/mantenimiento-orden-compra")
	public String cargarMantenimientoOrdenCompra(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
															  @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra,
															  @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
															  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
															  @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
															  @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoOrdenCompra, datoBuscar-->" + datoBuscar
					+ "/nroOrdenCompra-->" + nroOrdenCompra + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta + "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroOrdenCompra", nroOrdenCompra);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_ORDEN_COMPRA;
			logger.info("saliendo del m�todo cargarMantenimientoOrdenCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/cargar-guia-remision-compra")
	public String cargarGuiaRemisionCompra(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento,
									 @RequestParam(Constante.PARAM_OPCION) String opcion,
									 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									 @RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision,
									 @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra,
									 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
									 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
									 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
									 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
									 @RequestParam(Constante.PARAM_VOLVER) String volver) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarGuiaRemisionCompra, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento + "/datoBuscar-->" + datoBuscar
					+ "/nroGuiaRemision-->" + nroGuiaRemision + "/nroOrdenCompra-->" + nroOrdenCompra + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam + "/volver-->" + volver);
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroGuiaRemision", nroGuiaRemision);
			model.addAttribute("nroOrdenCompra", nroOrdenCompra);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaMotivosTraslado = genericService.cargarCombo(Constante.CATALOGO_MOTIVO_TRASLADO);
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaMotivosTraslado", listaMotivosTraslado);
			
			retorno = Constante.PAGINA_CARGAR_GUIA_REMISION_COMPRA;
			logger.info("saliendo del m�todo cargarGuiaRemisionCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/mantenimiento-guia-remision-compra")
	public String cargarMantenimientoGuiaRemisionCompra(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
															   @RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision,
															   @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra,
															   @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
															   @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
															   @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
															   @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoGuiaRemisionCompra, datoBuscar-->" + datoBuscar
					+ "/nroGuiaRemision-->" + nroGuiaRemision + "/nroOrdenCompra-->" + nroOrdenCompra + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroGuiaRemision", nroGuiaRemision);
			model.addAttribute("nroOrdenCompra", nroOrdenCompra);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_DOC);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_GUIA_REMISION_COMPRA;
			logger.info("saliendo del m�todo cargarMantenimientoGuiaRemisionCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}


	@GetMapping("/mantenimiento-factura-compra")
	public String cargarMantenimientoFacturaCompra(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
														  @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO) String nroComprobantePago,
														  @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA) String nroOrdenCompra,
														  @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
														  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
														  @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
														  @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoFacturaCompra, datoBuscar-->" + datoBuscar
					+ "/nroComprobantePago-->" + nroComprobantePago + "/nroOrdenCompra-->" + nroOrdenCompra + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroComprobantePago", nroComprobantePago);
			model.addAttribute("nroOrdenCompra", nroOrdenCompra);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_DOC);
			model.addAttribute("listaEstado", listaEstado);

			retorno = Constante.PAGINA_MANTENIMIENTO_FACTURA_COMPRA;
			logger.info("saliendo del m�todo cargarMantenimientoFacturaCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/nueva-factura-compra-directa")
	public String cargarFacturaCompraDirecta(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento,
									 @RequestParam(Constante.PARAM_OPCION) String opcion,
									 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
									 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
									 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
									 @RequestParam(Constante.PARAM_VOLVER) String volver) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarFacturaCompraDirecta, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento + "/datoBuscar-->" + datoBuscar
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam + "/volver-->" + volver);
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstadoPago = genericService.cargarCombo(Constante.CATALOGO_ESTADO_PAGO);
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstadoPago", listaEstadoPago);
			
			retorno = Constante.PAGINA_NUEVA_FACTURA_COMPRA_DIRECTA;
			logger.info("saliendo del m�todo cargarFacturaCompraDirecta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/nueva-factura-compra-asociada")
	public String cargarFacturaCompraAsociada(Model model,
										@RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento,
									    @RequestParam(Constante.PARAM_OPCION) String opcion,
									    @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									    @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
									    @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
									    @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
									    @RequestParam(Constante.PARAM_VOLVER) String volver,
										@RequestParam(Constante.PARAM_GUIAS) String guias) {
		String retorno;

		try {

			logger.info("entrando al m�todo cargarFacturaCompraAsociada, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento + "/datoBuscar-->" + datoBuscar
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam + "/volver-->" + volver + "/guias-->" + guias);

			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			model.addAttribute("guias", guias);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstadoPago = genericService.cargarCombo(Constante.CATALOGO_ESTADO_PAGO);

			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstadoPago", listaEstadoPago);

			retorno = Constante.PAGINA_NUEVA_FACTURA_COMPRA_ASOCIADA;
			logger.info("saliendo del m�todo cargarFacturaCompraAsociada");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/nueva-cotizacion")
    public String cargarNuevaCotizacion(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
    												 @RequestParam(Constante.PARAM_OPCION) String opcion,
    												 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
    												 @RequestParam(Constante.PARAM_NRO_COTIZACION) String nroCotizacion,
    												 @RequestParam(Constante.PARAM_NRO_REQUERIMIENTO) String nroRequerimiento,
    												 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
    												 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
    												 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
    												 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
    												 @RequestParam(Constante.PARAM_VOLVER) String volver) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarNuevaCotizacion, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento 
					 + "/datoBuscar-->" + datoBuscar + "/nroCotizacion-->" + nroCotizacion + "/nroRequerimiento-->" + nroRequerimiento 
					 + "/codRepuesto-->" + codRepuesto + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					 + "/estadoParam-->" + estadoParam + "/volver-->" + volver);
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroCotizacion", nroCotizacion);
			model.addAttribute("nroRequerimiento", nroRequerimiento);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_NUEVA_COTIZACION;
			logger.info("saliendo del m�todo cargarNuevaCotizacion");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/mantenimiento-cotizacion")
    public String cargarMantenimientoCotizacion(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
    														 @RequestParam(Constante.PARAM_NRO_COTIZACION) String nroCotizacion,
    														 @RequestParam(Constante.PARAM_NRO_REQUERIMIENTO) String nroRequerimiento,
    														 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
															 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
															 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
															 @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoCotizacion, datoBuscar-->" + datoBuscar
					+ "/nroCotizacion-->" + nroCotizacion + "/nroRequerimiento-->" + nroRequerimiento 
					+ "/codRepuesto-->" + codRepuesto + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta + "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroCotizacion", nroCotizacion);
			model.addAttribute("nroRequerimiento", nroRequerimiento);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_COTIZACION;
			logger.info("saliendo del m�todo cargarMantenimientoCotizacion");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/nueva-orden-venta")
    public String cargarNuevaOrdenVenta(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarNuevaOrdenVenta");
			retorno = Constante.PAGINA_NUEVA_ORDEN_VENTA;
			logger.info("saliendo del m�todo cargarNuevaOrdenVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/usuarios")
    public String cargarMantenimientoUsuarios(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoUsuarios");
			
			List<ComboModel> listaPerfil = genericService.cargarComboListaPerfil();
			model.addAttribute("listaPerfil", listaPerfil);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_USUARIOS;
			logger.info("saliendo del m�todo cargarMantenimientoUsuarios");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/perfiles")
    public String cargarMantenimientoPerfiles(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoPerfiles");
			retorno = Constante.PAGINA_MANTENIMIENTO_PERFILES;
			logger.info("saliendo del m�todo cargarMantenimientoPerfiles");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/mantenimiento-cliente")
    public String cargarMantenimientoCliente(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
														  @RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDoc) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoCliente");
						
			model.addAttribute("tipoSocio", Constante.COD_TIPO_SOCIO_CLIENTE);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("tipoDoc", tipoDoc);
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_IDENT);
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			
			retorno = Constante.PAGINA_BUSCAR_CLIENTE;
			
			logger.info("saliendo del m�todo cargarMantenimientoCliente");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/mantenimiento-proveedor")
    public String cargarMantenimientoProveedor(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
			  												@RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDoc) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoProveedor");
			
			model.addAttribute("tipoSocio", Constante.COD_TIPO_SOCIO_PROVEEDOR);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("tipoDoc", tipoDoc);
			
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_IDENT);
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			
			retorno = Constante.PAGINA_BUSCAR_PROVEEDOR;
			
			logger.info("saliendo del m�todo cargarMantenimientoProveedor");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
		
	@GetMapping("/access-denied")
    public String mostrarAccessDenied(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo mostrarAccessDenied");
			retorno = Constante.PAGINA_ACCESS_DENIED;
			logger.info("saliendo del m�todo mostrarAccessDenied");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }

		
	@GetMapping("/igv")
    public String cargarBuscarIgv(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarBuscarIgv");
			retorno = Constante.PAGINA_BUSCAR_IGV;
			logger.info("saliendo del m�todo cargarBuscarIgv");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	
	//MANTENIMIENTOS DATA CATALOGO
	
	@GetMapping("/tipo-socio-negocio")
    public String cargarMantenimientoTipoSocioNegocio(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoSocioNegocio");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_SN);
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoTipoSocioNegocio");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/condicion-pago")
    public String cargarMantenimientoCondicionPago(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoCondicionPago");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_CONDICION_PAGO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoCondicionPago");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/dias-pagocredito")
    public String cargarMantenimientoDiasCredito(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoDiasCredito");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_DIAS_PC);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoDiasCredito");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/moneda")
    public String cargarMantenimientoMoneda(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoMoneda");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MONEDA);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoMoneda");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/estado-documento-ini")
    public String cargarMantenimientoEstadoDocumentoInicial(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoEstadoDocumentoInicial");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_ESTADO_COTI);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoEstadoDocumentoInicial");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/estado-documento-sunat")
    public String cargarMantenimientoEstadoDocumentoSunat(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoEstadoDocumentoSunat");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_ESTADO_DOC);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoEstadoDocumentoSunat");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
		
	@GetMapping("/marca-vehiculo")
    public String cargarMantenimientoMarcaVehiculo(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoMarcaVehiculo");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MARCA_VEHICULO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoMarcaVehiculo");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/motor")
    public String cargarMantenimientoMotor(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoMotor");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MOTOR);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoMotor");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/modelo-vehiculo")
    public String cargarMantenimientoModelo(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoModelo");
			
			List<ComboModel> listaMarca = genericService.cargarCombo(Constante.CATALOGO_MARCA_VEHICULO);
			model.addAttribute("listaMarca", listaMarca);
			model.addAttribute("listaMarcaModal", listaMarca);
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MODELO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_CATALOGO_DEPENDIENTE;
			
			logger.info("saliendo del m�todo cargarMantenimientoModelo");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/seccion")
    public String cargarMantenimientoSeccion(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoSeccion");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_SECCION);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoSeccion");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/aplicacion")
    public String cargarMantenimientoTipoAplicacion(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoAplicacion");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_APLICACION);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoTipoAplicacion");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/unidad-medida")
    public String cargarMantenimientoUnidadMedida(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoUnidadMedida");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_UND_MEDIDA);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoUnidadMedida");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/marca-articulo")
    public String cargarMantenimientoMarcaArticulo(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoMarcaArticulo");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MARCA_ARTICULO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoMarcaArticulo");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/tipo-articulo")
    public String cargarMantenimientoTipoArticulo(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoArticulo");	
			
			List<ComboModel> listaMarca = genericService.cargarCombo(Constante.CATALOGO_MARCA_ARTICULO);
			model.addAttribute("listaMarca", listaMarca);
			model.addAttribute("listaMarcaModal", listaMarca);
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO);	
			
			retorno = Constante.PAGINA_MANTENIMIENTO_CATALOGO_DEPENDIENTE;
			logger.info("saliendo del m�todo cargarMantenimientoTipoArticulo");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
		
	@GetMapping("/documento-identidad")
    public String cargarMantenimientoDocumentoIdentidad(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoDocumentoIdentidad");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_DOC_IDENT);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoDocumentoIdentidad");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/tipo-persona")
    public String cargarMantenimientoTipoPersona(Model model) {
		
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoPersona");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_PERSONA);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoTipoPersona");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/operacion-inventario")
    public String cargarMantenimientoTipoOperacionInventario(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoOperacionInventario");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_OPE_INV);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoTipoOperacionInventario");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
		
	@GetMapping("/documento-sistema")
    public String cargarMantenimientoTipoDocumentoSistema(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoDocumentoSistema");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_DOC_SYSTEM);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoTipoDocumentoSistema");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/documento-sunat")
    public String cargarMantenimientoTipoDocumentoSunat(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoTipoDocumentoSunat");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_DOC_SUNAT);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoTipoDocumentoSunat");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/motivo-traslado")
    public String cargarMantenimientoMotivoTraslado(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoMotivoTraslado");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MOTIVO_TRASLADO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoMotivoTraslado");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/estado-pago")
    public String cargarMantenimientoEstadoPago(Model model) {
		String retorno;
		try {
			logger.info("entrando al m�todo cargarMantenimientoEstadoPago");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_ESTADO_PAGO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m�todo cargarMantenimientoEstadoPago");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
		
	
	@GetMapping("/nuevo-socio-negocio")
	public String cargarSocioNegocio(Model model,
										@RequestParam(Constante.PARAM_COD_SOCIONEGOCIO) String codigoSocio,
									    @RequestParam(Constante.PARAM_OPCION) String opcion,
									    @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									    @RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDoc,
									    @RequestParam(Constante.PARAM_TIPO_SN) String tipoSocio,
									    @RequestParam(Constante.PARAM_VOLVER) String volver) {
		String retorno;

		try {
			logger.info("entrando al m�todo cargarSocioNegocio");
			
			model.addAttribute("codigoSocio", codigoSocio);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("tipoDoc", tipoDoc);
			model.addAttribute("tipoSn", tipoSocio);
			model.addAttribute("volver", volver);
						
			// llenando los combos
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_IDENT);
			List<ComboModel> listatipoPersona = genericService.cargarCombo(Constante.CATALOGO_TIPO_PERSONA);
			List<ComboModel> listaPais = genericService.cargarComboPais();
			List<ComboModel> listaDepartamento = genericService.cargarComboUbigeo(1, "", "");
			List<ComboModel> listaVendedor = genericService.cargarComboVendedor();
			List<ComboModel> listaPrecio = genericService.cargarComboListaPrecio();
			
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			model.addAttribute("listatipoPersona", listatipoPersona);
			model.addAttribute("listaPais", listaPais);
			model.addAttribute("listaDepartamento", listaDepartamento);
			model.addAttribute("listaVendedor", listaVendedor);
			model.addAttribute("listaPrecio", listaPrecio);
			
			retorno = Constante.PAGINA_NUEVO_CLIENTE;
			
			logger.info("saliendo del m�todo cargarSocioNegocio");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/nuevo-proveedor")
	public String cargarProveedor(Model model,
										@RequestParam(Constante.PARAM_COD_SOCIONEGOCIO) String codigoSocio,
									    @RequestParam(Constante.PARAM_OPCION) String opcion,
									    @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									    @RequestParam(Constante.PARAM_TIPO_DOCUMENTO) String tipoDoc,
									    @RequestParam(Constante.PARAM_TIPO_SN) String tipoSocio,
									    @RequestParam(Constante.PARAM_VOLVER) String volver) {
		String retorno;

		try {
			logger.info("entrando al m�todo cargarProveedor");
			
			model.addAttribute("codigoSocio", codigoSocio);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("tipoDoc", tipoDoc);
			model.addAttribute("tipoSn", tipoSocio);
			model.addAttribute("volver", volver);
						
			// llenando los combos
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_IDENT);
			List<ComboModel> listatipoPersona = genericService.cargarCombo(Constante.CATALOGO_TIPO_PERSONA);
			List<ComboModel> listaPais = genericService.cargarComboPais();
			List<ComboModel> listaDepartamento = genericService.cargarComboUbigeo(1, "", "");
			
			List<ComboModel> listaCondicion = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			model.addAttribute("listatipoPersona", listatipoPersona);
			model.addAttribute("listaPais", listaPais);
			model.addAttribute("listaDepartamento", listaDepartamento);
			model.addAttribute("listaCondicion", listaCondicion);
			model.addAttribute("listaDias", listaDias);
			
			retorno = Constante.PAGINA_NUEVO_PROVEEDOR;
			
			logger.info("saliendo del m�todo cargarProveedor");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/parametros-generales")
	public String cargarParametrosGenerales(Model model) {
		String retorno;

		try {
			logger.info("entrando al m�todo cargarParametrosGenerales");
			
			List<ParametrosGeneralesModel> listaParametrosGenerales = genericService.cargarParametrosGenerales();
			session.setAttribute("listaParametrosGenerales", listaParametrosGenerales);
			
			retorno = Constante.PAGINA_PARAMETROS_GENERALES;
			
			logger.info("saliendo del m�todo cargarParametrosGenerales" + listaParametrosGenerales);
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	

}
