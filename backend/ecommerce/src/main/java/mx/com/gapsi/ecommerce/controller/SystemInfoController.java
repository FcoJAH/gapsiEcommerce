package mx.com.gapsi.ecommerce.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system")
public class SystemInfoController {

    @Value("${app.version}")
    private String appVersion;

    @GetMapping("/welcome")
    public ResponseEntity<String> getWelcomeMessage() {
        //TODO: Agregar implementacion por usuarios para nombres personalizados
        return ResponseEntity.ok("Bienvenido Francisco Alcala");
    }

    @GetMapping("/version")
    public String getVersion() {
        return appVersion;
    }
}
