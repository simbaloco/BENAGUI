package pe.gob.repuestera.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class DmmyProbandoParser {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		try {
			Document doc = Jsoup.connect("https://www.sbs.gob.pe/app/pp/SISTIP_PORTAL/Paginas/Publicacion/TipoCambioPromedio.aspx").get();
			System.out.println("TC del día " + new SimpleDateFormat("dd/MM/yyyy").format(new Date()) + ": " + 
						doc.getElementById("ctl00_cphContent_rgTipoCambio_ctl00__0").html().substring(103, 108));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}

