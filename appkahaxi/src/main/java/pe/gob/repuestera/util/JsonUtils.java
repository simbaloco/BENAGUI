package pe.gob.repuestera.util;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class JsonUtils {

    private Gson gson;

    @PostConstruct
    public void init() {
        gson = new Gson();
    }

    public String obtenerJson(Object objeto) throws Exception {
        return gson.toJson(objeto);
    }
}
