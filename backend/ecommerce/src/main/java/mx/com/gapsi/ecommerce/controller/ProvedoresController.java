package mx.com.gapsi.ecommerce.controller;

import mx.com.gapsi.ecommerce.model.Provedores;
import mx.com.gapsi.ecommerce.service.ProvedoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/provedores")
public class ProvedoresController {

    @Autowired
    public ProvedoresService provedoresService;

    @GetMapping("/all")
    public List<Provedores> getAll() {
        return provedoresService.getAll();
    }

    @PostMapping("/create")
    public Provedores createProvider(@RequestBody Provedores provedores) {
        return provedoresService.createProvider(provedores);
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Map<String, String>> deleteProvider(@PathVariable long id, @PathVariable int status) {
        Map<String, String> response = new HashMap<>();
        if (status > 2){
            response.put ("mensaje", "Estado ingresado no es valido.");
            return ResponseEntity.ok(response);
        }
        provedoresService.updateStatusProvider(id, status);
        switch(status) {
            case 0:
                response.put ("mensaje", "Provedor desactivado correctamente.");
                break;
            case 1:
                response.put ("mensaje", "Provedor activado correctamente.");
                break;
            case 2:
                response.put ("mensaje", "Provedor pendiente correctamente.");
                break;
        }
        return ResponseEntity.ok(response);
    }
}
