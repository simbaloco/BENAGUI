package pe.gob.repuestera.service.impl.venta;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.repuestera.model.VentaCabModel;
import pe.gob.repuestera.model.VentaDetModel;
import pe.gob.repuestera.repository.venta.OrdenVentaMapper;
import pe.gob.repuestera.service.venta.OrdenVentaService;

@Service
public class OrdenVentaServiceImpl implements OrdenVentaService{

	@Autowired
	private OrdenVentaMapper ordenVentaMapper;

	@Override
	public List<VentaCabModel> listarCotizacionesVenta(Map params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public VentaCabModel buscarCotizacionVentaCab(Map params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<VentaDetModel> buscarCotizacionVentaDet(Map params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void registrarCotizacionVenta(Map params) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actualizarCotizacionVenta(Map params) {
		// TODO Auto-generated method stub
		
	}

	
}
