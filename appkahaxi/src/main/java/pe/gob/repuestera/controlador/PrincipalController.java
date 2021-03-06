
package pe.gob.repuestera.controlador;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import pe.gob.repuestera.model.AlmacenModel;
import pe.gob.repuestera.model.ComboModel;
import pe.gob.repuestera.model.ParametrosGeneralesModel;
import pe.gob.repuestera.model.SerieModel;
import pe.gob.repuestera.service.GenericService;
import pe.gob.repuestera.service.compra.guiaremision.GuiaRemisionCompraService;
import pe.gob.repuestera.service.maestros.SerieService;
import pe.gob.repuestera.util.Constante;

@Controller
public class PrincipalController {
	
	private static final Logger logger = LogManager.getLogger(PrincipalController.class);
		
	@Autowired
	private GenericService genericService;
	@Autowired
	private SerieService serieService;
	@Autowired
    GuiaRemisionCompraService guiaRemisionCompraService;
	@Autowired
    HttpSession session;
	
	@GetMapping({"/", "/index", "/login"})
    public String login(Model model) {
		String retorno;
		try {
			logger.info("entrando al m?todo login");
			//retorno = Constante.PAGINA_PRINCIPAL;
			retorno = Constante.PAGINA_LOGIN;
			logger.info("saliendo del m?todo login");
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
			logger.info("entrando al m?todo principal");
			List<ParametrosGeneralesModel> listaParametrosGenerales = genericService.cargarParametrosGenerales();
			session.setAttribute("listaParametrosGenerales", listaParametrosGenerales);
			//retorno = Constante.PAGINA_PRINCIPAL;
			retorno = Constante.PAGINA_PRINCIPAL;
			logger.info("saliendo del m?todo principal, listaParametrosGenerales-->" + listaParametrosGenerales);
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
			logger.info("entrando al m?todo cargarBuscarArticulos");
			
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
			logger.info("saliendo del m?todo cargarBuscarArticulos");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/cargar-orden-compra")
	public String cargarOrdenCompra(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
												 @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
												 @RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
												 @RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
												 @RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
												 @RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro,
												 @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_ORIGEN) String nroOrdenCompraOrigen, 
												 @RequestParam(Constante.PARAM_OPCION) String opcion,
												 @RequestParam(Constante.PARAM_DE_LISTA_ORDEN_COMPRA) String deListaOC) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarOrdenCompra, OPCION--->" + opcion + "/nroOrdenCompraOrigen-->" + nroOrdenCompraOrigen 
					 + "/campoBuscarFiltro-->" + campoBuscarFiltro + "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro 
					 + "/codRepuestoFiltro-->" + codRepuestoFiltro
					 + "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro
					 + "/estadoFiltro-->" + estadoFiltro + "/deListaOC-->" + deListaOC);
			
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);
			model.addAttribute("nroOrdenCompraOrigen", nroOrdenCompraOrigen);
			model.addAttribute("opcion", opcion);
			model.addAttribute("deListaOC", deListaOC);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			// nos quedamos s?lo con aquellos valores diferentes a "ANULADO"
			listaEstado = listaEstado.stream().filter(t -> !t.getCodigo().equals("03")).collect(Collectors.toList());			
						
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_CARGAR_ORDEN_COMPRA;
			logger.info("saliendo del m?todo cargarOrdenCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/mantenimiento-orden-compra")
	public String cargarMantenimientoOrdenCompra(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
															  @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
															  @RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
															  @RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
															  @RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
															  @RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoOrdenCompra, campoBuscarFiltro-->" + campoBuscarFiltro
					+ "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro + "/codRepuestoFiltro-->" + codRepuestoFiltro 
					+ "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro + "/estadoFiltro-->" + estadoFiltro);
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_ORDEN_COMPRA;
			logger.info("saliendo del m?todo cargarMantenimientoOrdenCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/cargar-guia-remision-compra")
	public String cargarGuiaRemisionCompra(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
														@RequestParam(Constante.PARAM_NRO_GUIA_REMISION_FILTRO) String nroGuiaRemisionFiltro,			
														@RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
														@RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
														@RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
														@RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
														@RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro,
														@RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_ORIGEN) String nroOrdenCompraOrigen, 
														@RequestParam(Constante.PARAM_DE_LISTA_ORDEN_COMPRA) String deListaOC,
														@RequestParam(Constante.PARAM_NRO_GUIA_REMISION_ORIGEN) String nroGuiaRemisionOrigen, 
														@RequestParam(Constante.PARAM_DE_LISTA_GUIA_REMISION) String deListaGR,
														@RequestParam(Constante.PARAM_OPCION) String opcion) {
		
		String retorno;
		try {
			logger.info("entrando al m?todo cargarGuiaRemisionCompra, OPCION--->" + opcion + "/campoBuscarFiltro-->" + campoBuscarFiltro
					+ "/nroGuiaRemisionFiltro-->" + nroGuiaRemisionFiltro + "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro + "/codRepuestoFiltro-->" + codRepuestoFiltro 
					+ "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro
					+ "/estadoFiltro-->" + estadoFiltro + "/nroOrdenCompraOrigen-->" + nroOrdenCompraOrigen 
					+ "/deListaOC-->" + deListaOC + "/nroGuiaRemisionOrigen-->" + nroGuiaRemisionOrigen + "/deListaGR-->" + deListaGR);
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);
			model.addAttribute("nroGuiaRemisionFiltro", nroGuiaRemisionFiltro);
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);
			
			model.addAttribute("nroOrdenCompraOrigen", nroOrdenCompraOrigen);
			model.addAttribute("deListaOC", deListaOC);
			model.addAttribute("opcion", opcion);
			model.addAttribute("nroGuiaRemisionOrigen", nroGuiaRemisionOrigen);
			model.addAttribute("deListaGR", deListaGR);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaMotivosTraslado = genericService.cargarCombo(Constante.CATALOGO_MOTIVO_TRASLADO);
			List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaMotivosTraslado", listaMotivosTraslado);
			model.addAttribute("listaAlmacenModel", listaAlmacenModel);
			
			retorno = Constante.PAGINA_CARGAR_GUIA_REMISION_COMPRA;
			logger.info("saliendo del m?todo cargarGuiaRemisionCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/mantenimiento-guia-remision-compra")
	public String cargarMantenimientoGuiaRemisionCompra(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
																	 @RequestParam(Constante.PARAM_NRO_GUIA_REMISION_FILTRO) String nroGuiaRemisionFiltro,			
																	 @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
																	 @RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
																	 @RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
																	 @RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
																	 @RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoGuiaRemisionCompra, --->" + "/campoBuscarFiltro-->" + campoBuscarFiltro
					+ "/nroGuiaRemisionFiltro-->" + nroGuiaRemisionFiltro + "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro + "/codRepuestoFiltro-->" + codRepuestoFiltro 
					+ "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro
					+ "/estadoFiltro-->" + estadoFiltro);
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);
			model.addAttribute("nroGuiaRemisionFiltro", nroGuiaRemisionFiltro);
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_DOC);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_GUIA_REMISION_COMPRA;
			logger.info("saliendo del m?todo cargarMantenimientoGuiaRemisionCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/cargar-factura-compra-asociada")
	public String cargarFacturaCompraAsociada(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
														   @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO_FILTRO) String nroComprobantePagoFiltro,			
														   @RequestParam(Constante.PARAM_NRO_GUIA_REMISION_FILTRO) String nroGuiaRemisionFiltro,
														   @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
														   @RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
														   @RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
														   @RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
														   @RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro,
														   @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_ORIGEN) String nroOrdenCompraOrigen, 
														   @RequestParam(Constante.PARAM_DE_LISTA_ORDEN_COMPRA) String deListaOC,
														   @RequestParam(Constante.PARAM_NRO_GUIA_REMISION_ORIGEN) String nroGuiaRemisionOrigen, 
														   @RequestParam(Constante.PARAM_DE_LISTA_GUIA_REMISION) String deListaGR,														   
														   @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO_ORIGEN) String nroComprobantePagoOrigen, 
														   @RequestParam(Constante.PARAM_DE_LISTA_COMPROBANTE_PAGO) String deListaCP,
														   @RequestParam(Constante.PARAM_DE_LISTA_GR_SELECCIONADAS) String listaGRSeleccionadas,
														   @RequestParam(Constante.PARAM_OPCION) String opcion) {
		String retorno;

		try {

			logger.info("entrando al m?todo cargarFacturaCompraAsociada, OPCION--->" + opcion + "/campoBuscarFiltro-->" + campoBuscarFiltro
					+ "/nroComprobantePagoFiltro-->" + nroComprobantePagoFiltro + "/nroGuiaRemisionFiltro-->" + nroGuiaRemisionFiltro 
					+ "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro + "/codRepuestoFiltro-->" + codRepuestoFiltro 
					+ "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro
					+ "/estadoFiltro-->" + estadoFiltro + "/nroOrdenCompraOrigen-->" + nroOrdenCompraOrigen 
					+ "/deListaOC-->" + deListaOC + "/nroGuiaRemisionOrigen-->" + nroGuiaRemisionOrigen 
					+ "/deListaGR-->" + deListaGR + "/nroComprobantePagoOrigen-->" + nroComprobantePagoOrigen 
					+ "/deListaCP-->" + deListaCP + "/listaGRSeleccionadas-->" + listaGRSeleccionadas);
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);			
			model.addAttribute("nroComprobantePagoFiltro", nroComprobantePagoFiltro);			
			model.addAttribute("nroGuiaRemisionFiltro", nroGuiaRemisionFiltro);
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);
			
			model.addAttribute("nroOrdenCompraOrigen", nroOrdenCompraOrigen);
			model.addAttribute("deListaOC", deListaOC);
			model.addAttribute("opcion", opcion);
			model.addAttribute("nroGuiaRemisionOrigen", nroGuiaRemisionOrigen);
			model.addAttribute("deListaGR", deListaGR);
			
			model.addAttribute("nroComprobantePagoOrigen", nroComprobantePagoOrigen);
			model.addAttribute("deListaCP", deListaCP);
			model.addAttribute("listaGRSeleccionadas", listaGRSeleccionadas);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstadoPago = genericService.cargarCombo(Constante.CATALOGO_ESTADO_PAGO);
			List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstadoPago", listaEstadoPago);
			model.addAttribute("listaAlmacenModel", listaAlmacenModel);
			
			retorno = Constante.PAGINA_CARGAR_FACTURA_COMPRA_ASOCIADA;
			logger.info("saliendo del m?todo cargarFacturaCompraAsociada");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/cargar-factura-compra-directa")
	public String cargarFacturaCompraDirecta(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
														  @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO_FILTRO) String nroComprobantePagoFiltro,			
														  @RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
														  @RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
														  @RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
														  @RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
														  @RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro,
														  @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO_ORIGEN) String nroComprobantePagoOrigen, 
														  @RequestParam(Constante.PARAM_DE_LISTA_COMPROBANTE_PAGO) String deListaCP,
														  @RequestParam(Constante.PARAM_OPCION) String opcion) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarFacturaCompraDirecta, OPCION--->" + opcion + "/campoBuscarFiltro-->" + campoBuscarFiltro
					+ "/nroComprobantePagoFiltro-->" + nroComprobantePagoFiltro 
					+ "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro + "/codRepuestoFiltro-->" + codRepuestoFiltro 
					+ "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro
					+ "/estadoFiltro-->" + estadoFiltro + "/nroComprobantePagoOrigen-->" + nroComprobantePagoOrigen 
					+ "/deListaCP-->" + deListaCP);
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);			
			model.addAttribute("nroComprobantePagoFiltro", nroComprobantePagoFiltro);			
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);			
			
			model.addAttribute("opcion", opcion);
			model.addAttribute("nroComprobantePagoOrigen", nroComprobantePagoOrigen);
			model.addAttribute("deListaCP", deListaCP);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstadoPago = genericService.cargarCombo(Constante.CATALOGO_ESTADO_PAGO);
			List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstadoPago", listaEstadoPago);
			model.addAttribute("listaAlmacenModel", listaAlmacenModel);
			
			retorno = Constante.PAGINA_CARGAR_FACTURA_COMPRA_DIRECTA;
			logger.info("saliendo del m?todo cargarFacturaCompraDirecta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/mantenimiento-factura-compra")
	public String cargarMantenimientoFacturaCompra(Model model, @RequestParam(Constante.PARAM_CAMPO_BUSCAR_FILTRO) String campoBuscarFiltro,
																@RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO_FILTRO) String nroComprobantePagoFiltro,			
																@RequestParam(Constante.PARAM_NRO_ORDEN_COMPRA_FILTRO) String nroOrdenCompraFiltro,
															    @RequestParam(Constante.PARAM_COD_REPUESTO_FILTRO) String codRepuestoFiltro,
																@RequestParam(Constante.PARAM_FEC_DESDE_FILTRO) String fecDesdeFiltro,
																@RequestParam(Constante.PARAM_FEC_HASTA_FILTRO) String fecHastaFiltro,
																@RequestParam(Constante.PARAM_ESTADO_FILTRO) String estadoFiltro) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoFacturaCompra, --->" + "/campoBuscarFiltro-->" + campoBuscarFiltro
					+ "/nroComprobantePagoFiltro-->" + nroComprobantePagoFiltro + "/nroOrdenCompraFiltro-->" + nroOrdenCompraFiltro + "/codRepuestoFiltro-->" + codRepuestoFiltro 
					+ "/fecDesdeFiltro-->" + fecDesdeFiltro + "/fecHastaFiltro-->" + fecHastaFiltro
					+ "/estadoFiltro-->" + estadoFiltro);
			model.addAttribute("campoBuscarFiltro", campoBuscarFiltro);
			model.addAttribute("nroComprobantePagoFiltro", nroComprobantePagoFiltro);
			model.addAttribute("nroOrdenCompraFiltro", nroOrdenCompraFiltro);
			model.addAttribute("codRepuestoFiltro", codRepuestoFiltro);
			model.addAttribute("fecDesdeFiltro", fecDesdeFiltro);
			model.addAttribute("fecHastaFiltro", fecHastaFiltro);
			model.addAttribute("estadoFiltro", estadoFiltro);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_DOC);
			model.addAttribute("listaEstado", listaEstado);

			retorno = Constante.PAGINA_MANTENIMIENTO_FACTURA_COMPRA;
			logger.info("saliendo del m?todo cargarMantenimientoFacturaCompra");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/cargar-cotizacion")
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
			logger.info("entrando al m?todo cargarNuevaCotizacion, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento 
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
			// nos quedamos s?lo con aquellos valores diferentes a "ANULADO"
			listaEstado = listaEstado.stream().filter(t -> !t.getCodigo().equals("03")).collect(Collectors.toList());
						
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_CARGAR_COTIZACION_VENTA;
			logger.info("saliendo del m?todo cargarNuevaCotizacion");
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
			logger.info("entrando al m?todo cargarMantenimientoCotizacion, datoBuscar-->" + datoBuscar
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
			logger.info("saliendo del m?todo cargarMantenimientoCotizacion");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/cargar-orden-venta")
	public String cargarOrdenVenta(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento, 
												 @RequestParam(Constante.PARAM_OPCION) String opcion,
												 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
												 @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta,
												 @RequestParam(Constante.PARAM_NRO_COTIZACION) String nroCotizacion,
												 @RequestParam(Constante.PARAM_NRO_REQUERIMIENTO) String nroRequerimiento,
												 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
												 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
												 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
												 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
												 @RequestParam(Constante.PARAM_VOLVER) String volver,
												 @RequestParam(Constante.PARAM_DESDE_DOC_REF) String desdeDocRef,
												 @RequestParam(Constante.PARAM_ORIGEN_MNTO) int origenMnto) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarOrdenVenta, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento 
					 + "/datoBuscar-->" + datoBuscar + "/nroOrdenVenta-->" + nroOrdenVenta + "/nroCotizacion-->" + nroCotizacion
					 + "/nroRequerimiento-->" + nroRequerimiento 
					 + "/codRepuesto-->" + codRepuesto
					 + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					 + "/estadoParam-->" + estadoParam + "/volver-->" + volver);
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroOrdenVenta", nroOrdenVenta);
			model.addAttribute("nroCotizacion", nroCotizacion);
			model.addAttribute("nroRequerimiento", nroRequerimiento);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			model.addAttribute("desdeDocRef", desdeDocRef);
			model.addAttribute("origenMnto", origenMnto);
			
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			// nos quedamos s?lo con aquellos valores diferentes a "ANULADO"
			listaEstado = listaEstado.stream().filter(t -> !t.getCodigo().equals("03")).collect(Collectors.toList());
						
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_CARGAR_ORDEN_VENTA;
			logger.info("saliendo del m?todo cargarOrdenVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/mantenimiento-orden-venta")
	public String cargarMantenimientoOrdenVenta(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
															  @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta,
															  @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
															  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
															  @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
															  @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoOrdenVenta, datoBuscar-->" + datoBuscar
					+ "/nroOrdenVenta-->" + nroOrdenVenta + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta + "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroOrdenVenta", nroOrdenVenta);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_COTI);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_ORDEN_VENTA;
			logger.info("saliendo del m?todo cargarMantenimientoOrdenVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/cargar-guia-remision-venta")
	public String cargarGuiaRemisionVenta(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento,
									 @RequestParam(Constante.PARAM_OPCION) String opcion,
									 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									 @RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision,
									 @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta,
									 @RequestParam(Constante.PARAM_NRO_COTIZACION) String nroCotizacion,
									 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
									 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
									 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
									 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
									 @RequestParam(Constante.PARAM_VOLVER) String volver,
									 @RequestParam(Constante.PARAM_DESDE_DOC_REF) String desdeDocRef,
									 @RequestParam(Constante.PARAM_ORIGEN_MNTO) int origenMnto) {
		
		String retorno;
		try {
			logger.info("entrando al m?todo cargarGuiaRemisionVenta, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento + "/datoBuscar-->" + datoBuscar
					+ "/nroGuiaRemision-->" + nroGuiaRemision + "/nroOrdenVenta-->" + nroOrdenVenta + "/nroCotizacion-->" + nroCotizacion 
					+ "/codRepuesto-->" + codRepuesto + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam + "/volver-->" + volver + "/desdeDocRef-->" + desdeDocRef);
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroGuiaRemision", nroGuiaRemision);
			model.addAttribute("nroOrdenVenta", nroOrdenVenta);
			model.addAttribute("nroCotizacion", nroCotizacion);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			model.addAttribute("desdeDocRef", desdeDocRef);
			model.addAttribute("origenMnto", origenMnto);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaMotivosTraslado = genericService.cargarCombo(Constante.CATALOGO_MOTIVO_TRASLADO);
			List<SerieModel> listaSerie = serieService.cargarComboSerie(Constante.COD_TIPO_DOCU_GRT);
			List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();
			
			logger.info("listaSerie: " +listaSerie);
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaMotivosTraslado", listaMotivosTraslado);
			model.addAttribute("listaAlmacenModel", listaAlmacenModel);
			model.addAttribute("listaSerie", listaSerie);
			
			retorno = Constante.PAGINA_CARGAR_GUIA_REMISION_VENTA;
			logger.info("saliendo del m?todo cargarGuiaRemisionVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/mantenimiento-guia-remision-venta")
	public String cargarMantenimientoGuiaRemisionVenta(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
															   @RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision,
															   @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta,
															   @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
															   @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
															   @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
															   @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoGuiaRemisionVenta, datoBuscar-->" + datoBuscar
					+ "/nroGuiaRemision-->" + nroGuiaRemision + "/nroOrdenVenta-->" + nroOrdenVenta + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroGuiaRemision", nroGuiaRemision);
			model.addAttribute("nroOrdenVenta", nroOrdenVenta);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_DOC);
			model.addAttribute("listaEstado", listaEstado);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_GUIA_REMISION_VENTA;
			logger.info("saliendo del m?todo cargarMantenimientoGuiaRemisionVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/cargar-factura-venta-asociada")
	public String cargarFacturaVentaAsociada(Model model,
										@RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento,
									    @RequestParam(Constante.PARAM_OPCION) String opcion,
									    @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									    @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
									    @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
									    @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
									    @RequestParam(Constante.PARAM_VOLVER) String volver,
										@RequestParam(Constante.PARAM_DESDE_DOC_REF) String desdeDocRef,
										@RequestParam(Constante.PARAM_NRO_GUIA_REMISION) String nroGuiaRemision,
										@RequestParam(Constante.PARAM_NRO_GR_REF) String nroGr,
										@RequestParam(Constante.PARAM_GUIAS) String guias,
										@RequestParam(Constante.PARAM_ORIGEN_MNTO) int origenMnto) {
		String retorno;

		try {

			logger.info("entrando al m?todo cargarFacturaVentaAsociada, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento 
					+ "/datoBuscar-->" + datoBuscar + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam + "/volver-->" + volver + "/desdeDocRef-->" + desdeDocRef + "/guias-->" + guias);

			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			model.addAttribute("desdeDocRef", desdeDocRef);
			model.addAttribute("nroGuiaRemision", nroGuiaRemision);
			model.addAttribute("nroGr", nroGr);
			model.addAttribute("guias", guias);
			model.addAttribute("origenMnto", origenMnto);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstadoPago = genericService.cargarCombo(Constante.CATALOGO_ESTADO_PAGO);
			List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();
			List<SerieModel> listaSerie = serieService.cargarComboSerie(Constante.COD_TIPO_DOCU_FACT);
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstadoPago", listaEstadoPago);
			model.addAttribute("listaAlmacenModel", listaAlmacenModel);
			model.addAttribute("listaSerie", listaSerie);
			
			retorno = Constante.PAGINA_CARGAR_FACTURA_VENTA_ASOCIADA;
			logger.info("saliendo del m?todo cargarFacturaVentaAsociada");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/cargar-factura-venta-directa")
	public String cargarFacturaVentaDirecta(Model model, @RequestParam(Constante.PARAM_NRO_DOCUMENTO) String numeroDocumento,
									 @RequestParam(Constante.PARAM_OPCION) String opcion,
									 @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
									 @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO) String nroComprobantePago,
									 @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta,
									 @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
									 @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
									 @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
									 @RequestParam(Constante.PARAM_ESTADO) String estadoParam,
									 @RequestParam(Constante.PARAM_VOLVER) String volver,
									 @RequestParam(Constante.PARAM_DESDE_DOC_REF) String desdeDocRef) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarFacturaVentaDirecta, OPCION--->" + opcion + "/numeroDocumento-->" + numeroDocumento 
					+ "/datoBuscar-->" + datoBuscar + "/nroComprobantePago-->" + nroComprobantePago + "/nroOrdenVenta-->" + nroOrdenVenta
					+ "/codRepuesto-->" + codRepuesto + "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam + "/volver-->" + volver + "/desdeDocRef-->" + desdeDocRef);
			
			model.addAttribute("numeroDocumento", numeroDocumento);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroComprobantePago", nroComprobantePago);
			model.addAttribute("nroOrdenVenta", nroOrdenVenta);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			model.addAttribute("volver", volver);
			model.addAttribute("desdeDocRef", desdeDocRef);
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			List<ComboModel> listaCondPago = genericService.cargarCombo(Constante.CATALOGO_CONDICION_PAGO);
			List<ComboModel> listaDias = genericService.cargarCombo(Constante.CATALOGO_DIAS_PC);
			List<ComboModel> listaEstadoPago = genericService.cargarCombo(Constante.CATALOGO_ESTADO_PAGO);
			List<AlmacenModel> listaAlmacenModel = guiaRemisionCompraService.buscarAlmacen();
			List<SerieModel> listaSerie = serieService.cargarComboSerie(Constante.COD_TIPO_DOCU_FACT);
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("listaCondPago", listaCondPago);
			model.addAttribute("listaDias", listaDias);
			model.addAttribute("listaEstadoPago", listaEstadoPago);
			model.addAttribute("listaAlmacenModel", listaAlmacenModel);
			model.addAttribute("listaSerie", listaSerie);
			
			retorno = Constante.PAGINA_CARGAR_FACTURA_VENTA_DIRECTA;
			logger.info("saliendo del m?todo cargarFacturaVentaDirecta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	@GetMapping("/mantenimiento-factura-venta")
	public String cargarMantenimientoFacturaVenta(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar,
														  @RequestParam(Constante.PARAM_NRO_COMPROBANTE_PAGO) String nroComprobantePago,
														  @RequestParam(Constante.PARAM_NRO_ORDEN_VENTA) String nroOrdenVenta,
														  @RequestParam(Constante.PARAM_COD_REPUESTO) String codRepuesto,
														  @RequestParam(Constante.PARAM_FECHA_DESDE) String fechaDesde,
														  @RequestParam(Constante.PARAM_FECHA_HASTA) String fechaHasta,
														  @RequestParam(Constante.PARAM_ESTADO) String estadoParam) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoFacturaVenta, datoBuscar-->" + datoBuscar
					+ "/nroComprobantePago-->" + nroComprobantePago + "/nroOrdenVenta-->" + nroOrdenVenta + "/codRepuesto-->" + codRepuesto 
					+ "/fechaDesde-->" + fechaDesde + "/fechaHasta-->" + fechaHasta
					+ "/estadoParam-->" + estadoParam);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("nroComprobantePago", nroComprobantePago);
			model.addAttribute("nroOrdenVenta", nroOrdenVenta);
			model.addAttribute("codRepuesto", codRepuesto);
			model.addAttribute("fechaDesde", fechaDesde);
			model.addAttribute("fechaHasta", fechaHasta);
			model.addAttribute("estadoParam", estadoParam);
			List<ComboModel> listaEstado = genericService.cargarCombo(Constante.CATALOGO_ESTADO_DOC);
			model.addAttribute("listaEstado", listaEstado);

			retorno = Constante.PAGINA_MANTENIMIENTO_FACTURA_VENTA;
			logger.info("saliendo del m?todo cargarMantenimientoFacturaVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}

	
	
	/*@GetMapping("/cargar-orden-venta")
    public String cargarNuevaOrdenVenta(Model model) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarNuevaOrdenVenta");
			retorno = Constante.PAGINA_CARGAR_ORDEN_VENTA;
			logger.info("saliendo del m?todo cargarNuevaOrdenVenta");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }*/
	
	@GetMapping("/usuarios")
    public String cargarMantenimientoUsuarios(Model model) {
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoUsuarios");
			
			List<ComboModel> listaPerfil = genericService.cargarComboListaPerfil();
			model.addAttribute("listaPerfil", listaPerfil);
			
			retorno = Constante.PAGINA_MANTENIMIENTO_USUARIOS;
			logger.info("saliendo del m?todo cargarMantenimientoUsuarios");
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
			logger.info("entrando al m?todo cargarMantenimientoPerfiles");
			retorno = Constante.PAGINA_MANTENIMIENTO_PERFILES;
			logger.info("saliendo del m?todo cargarMantenimientoPerfiles");
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
			logger.info("entrando al m?todo cargarMantenimientoCliente");
						
			model.addAttribute("tipoSocio", Constante.COD_TIPO_SOCIO_CLIENTE);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("tipoDoc", tipoDoc);
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_IDENT);
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			
			retorno = Constante.PAGINA_BUSCAR_CLIENTE;
			
			logger.info("saliendo del m?todo cargarMantenimientoCliente");
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
			logger.info("entrando al m?todo cargarMantenimientoProveedor");
			
			model.addAttribute("tipoSocio", Constante.COD_TIPO_SOCIO_PROVEEDOR);
			model.addAttribute("datoBuscar", datoBuscar);
			model.addAttribute("tipoDoc", tipoDoc);
			
			List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_IDENT);
			model.addAttribute("listaTipoDocumento", listaTipoDocumento);
			
			retorno = Constante.PAGINA_BUSCAR_PROVEEDOR;
			
			logger.info("saliendo del m?todo cargarMantenimientoProveedor");
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
			logger.info("entrando al m?todo mostrarAccessDenied");
			retorno = Constante.PAGINA_ACCESS_DENIED;
			logger.info("saliendo del m?todo mostrarAccessDenied");
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
			logger.info("entrando al m?todo cargarBuscarIgv");
			retorno = Constante.PAGINA_BUSCAR_IGV;
			logger.info("saliendo del m?todo cargarBuscarIgv");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoSocioNegocio");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_SN);
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoTipoSocioNegocio");
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
			logger.info("entrando al m?todo cargarMantenimientoCondicionPago");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_CONDICION_PAGO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoCondicionPago");
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
			logger.info("entrando al m?todo cargarMantenimientoDiasCredito");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_DIAS_PC);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoDiasCredito");
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
			logger.info("entrando al m?todo cargarMantenimientoMoneda");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MONEDA);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoMoneda");
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
			logger.info("entrando al m?todo cargarMantenimientoEstadoDocumentoInicial");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_ESTADO_COTI);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoEstadoDocumentoInicial");
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
			logger.info("entrando al m?todo cargarMantenimientoEstadoDocumentoSunat");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_ESTADO_DOC);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoEstadoDocumentoSunat");
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
			logger.info("entrando al m?todo cargarMantenimientoMarcaVehiculo");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MARCA_VEHICULO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoMarcaVehiculo");
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
			logger.info("entrando al m?todo cargarMantenimientoMotor");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MOTOR);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoMotor");
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
			logger.info("entrando al m?todo cargarMantenimientoModelo");
			
			List<ComboModel> listaMarca = genericService.cargarCombo(Constante.CATALOGO_MARCA_VEHICULO);
			model.addAttribute("listaMarca", listaMarca);
			model.addAttribute("listaMarcaModal", listaMarca);
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MODELO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_CATALOGO_DEPENDIENTE;
			
			logger.info("saliendo del m?todo cargarMantenimientoModelo");
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
			logger.info("entrando al m?todo cargarMantenimientoSeccion");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_SECCION);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoSeccion");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoAplicacion");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_APLICACION);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoTipoAplicacion");
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
			logger.info("entrando al m?todo cargarMantenimientoUnidadMedida");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_UND_MEDIDA);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoUnidadMedida");
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
			logger.info("entrando al m?todo cargarMantenimientoMarcaArticulo");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MARCA_ARTICULO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoMarcaArticulo");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoArticulo");	
			
			List<ComboModel> listaMarca = genericService.cargarCombo(Constante.CATALOGO_MARCA_ARTICULO);
			model.addAttribute("listaMarca", listaMarca);
			model.addAttribute("listaMarcaModal", listaMarca);
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO);	
			
			retorno = Constante.PAGINA_MANTENIMIENTO_CATALOGO_DEPENDIENTE;
			logger.info("saliendo del m?todo cargarMantenimientoTipoArticulo");
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
			logger.info("entrando al m?todo cargarMantenimientoDocumentoIdentidad");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_DOC_IDENT);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoDocumentoIdentidad");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoPersona");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_PERSONA);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoTipoPersona");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoOperacionInventario");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_OPE_INV);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoTipoOperacionInventario");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoDocumentoSistema");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_DOC_SYSTEM);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoTipoDocumentoSistema");
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
			logger.info("entrando al m?todo cargarMantenimientoTipoDocumentoSunat");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_TIPO_DOC_SUNAT);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoTipoDocumentoSunat");
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
			logger.info("entrando al m?todo cargarMantenimientoMotivoTraslado");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_MOTIVO_TRASLADO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoMotivoTraslado");
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
			logger.info("entrando al m?todo cargarMantenimientoEstadoPago");
			
			model.addAttribute("tipoCatalogo", Constante.CATALOGO_ESTADO_PAGO);			
			retorno = Constante.PAGINA_MANTENIMIENTO_DATA_CATALOGO;
			
			logger.info("saliendo del m?todo cargarMantenimientoEstadoPago");
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
			logger.info("entrando al m?todo cargarSocioNegocio");
			
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
			
			logger.info("saliendo del m?todo cargarSocioNegocio");
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
			logger.info("entrando al m?todo cargarProveedor");
			
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
			
			logger.info("saliendo del m?todo cargarProveedor");
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
			logger.info("entrando al m?todo cargarParametrosGenerales");
			
			List<ParametrosGeneralesModel> listaParametrosGenerales = genericService.cargarParametrosGenerales();
			session.setAttribute("listaParametrosGenerales", listaParametrosGenerales);
			
			retorno = Constante.PAGINA_PARAMETROS_GENERALES;
			
			logger.info("saliendo del m?todo cargarParametrosGenerales" + listaParametrosGenerales);
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/lista-precios")
    public String cargarMantenimientoListaPrecios(Model model, @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar) {
		
		String retorno;
		try {
			logger.info("entrando al m?todo cargarMantenimientoListaPrecios");
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			
			model.addAttribute("listaMoneda", listaMoneda);
			model.addAttribute("datoBuscar", datoBuscar);
			retorno = Constante.PAGINA_MANTENIMIENTO_LISTA_PRECIOS;
			
			logger.info("saliendo del m?todo cargarMantenimientoListaPrecios");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
    }
	
	@GetMapping("/nueva-lista-precio")
	public String nuevaListaPrecio(Model model,
										@RequestParam(Constante.PARAM_ID_LISTA_PRECIO) String idListaPrecio,
									    @RequestParam(Constante.PARAM_OPCION) String opcion,
									    @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar) {
		String retorno;

		try {
			logger.info("entrando al m?todo nuevaListaPrecio");
			
			model.addAttribute("idListaPrecio", idListaPrecio);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
			
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			
			model.addAttribute("listaMoneda", listaMoneda);
			retorno = Constante.PAGINA_NUEVA_LISTA_PRECIO;
			
			logger.info("saliendo del m?todo nuevaListaPrecio");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	@GetMapping("/ver-lista-precio")
	public String cargarListaPrecio(Model model,
										@RequestParam(Constante.PARAM_ID_LISTA_PRECIO) String idListaPrecio,
									    @RequestParam(Constante.PARAM_OPCION) String opcion,
									    @RequestParam(Constante.PARAM_DATO_BUSCAR) String datoBuscar) {
		String retorno;

		try {
			logger.info("entrando al m?todo cargarListaPrecio");
			
			model.addAttribute("idListaPrecio", idListaPrecio);
			model.addAttribute("opcion", opcion);
			model.addAttribute("datoBuscar", datoBuscar);
						
			// llenando los combos
			List<ComboModel> listaMoneda = genericService.cargarCombo(Constante.CATALOGO_MONEDA);
			
			model.addAttribute("listaMoneda", listaMoneda);
			retorno = Constante.PAGINA_VER_LISTA_PRECIO;
			
			logger.info("saliendo del m?todo cargarListaPrecio");
		}catch (Exception e) {
			// TODO: handle exception
			retorno = Constante.PAGINA_ERROR;
			model.addAttribute("mensajeError", e.toString());
		}
		return retorno;
	}
	
	
	// REPORTES
		@GetMapping("/reporte-compras")
	    public String cargarReporteCompras(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarReporteCompras");
				retorno = Constante.PAGINA_REPORTE_COMPRAS;
				logger.info("saliendo del m?todo cargarReporteCompras");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		@GetMapping("/reporte-ventas")
	    public String cargarReporteVentas(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarReporteVentas");
				retorno = Constante.PAGINA_REPORTE_VENTAS;
				logger.info("saliendo del m?todo cargarReporteVentas");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		@GetMapping("/reporte-analisis-ventas")
	    public String cargarReporteAnalisisVentas(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarReporteAnalisisVentas");
				retorno = Constante.PAGINA_REPORTE_ANALISIS_VENTAS;
				logger.info("saliendo del m?todo cargarReporteAnalisisVentas");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		@GetMapping("/reporte-kardex")
	    public String cargarReporteKardex(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarReporteKardex");
				List<AlmacenModel> listaAlmacen = guiaRemisionCompraService.buscarAlmacen();
				model.addAttribute("listaAlmacen", listaAlmacen);
				retorno = Constante.PAGINA_REPORTE_KARDEX;
				logger.info("saliendo del m?todo cargarReporteKardex");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		@GetMapping("/reporte-inventario")
	    public String cargarReporteInventario(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarReporteInventario");
				List<AlmacenModel> listaAlmacen = guiaRemisionCompraService.buscarAlmacen();
				model.addAttribute("listaAlmacen", listaAlmacen);
				retorno = Constante.PAGINA_REPORTE_INVENTARIO;
				logger.info("saliendo del m?todo cargarReporteInventario");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		@GetMapping("/reporte-anulados")
	    public String cargarReporteDocumentosAnulados(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarReporteDocumentosAnulados");
				List<ComboModel> listaTipo = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_SYSTEM);			
				model.addAttribute("listaTipo", listaTipo);
				retorno = Constante.PAGINA_REPORTE_ANULADOS;
				logger.info("saliendo del m?todo cargarReporteDocumentosAnulados");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		@GetMapping("/series")
	    public String cargarSeries(Model model) {
			String retorno;
			try {
				logger.info("entrando al m?todo cargarSeries");
				
				List<ComboModel> listaTipoDocumento = genericService.cargarCombo(Constante.CATALOGO_TIPO_DOC_SUNAT);
				model.addAttribute("listaTipoDocumentoModal", listaTipoDocumento);
				model.addAttribute("listaTipoDocumento", listaTipoDocumento);
				retorno = Constante.PAGINA_MANTENIMIENTO_SERIE;
				logger.info("saliendo del m?todo cargarSeries");
			}catch (Exception e) {
				// TODO: handle exception
				retorno = Constante.PAGINA_ERROR;
				model.addAttribute("mensajeError", e.toString());
			}
			return retorno;
	    }
		
		
	

}
