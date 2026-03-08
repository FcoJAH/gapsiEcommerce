package mx.com.gapsi.ecommerce.controller;

import mx.com.gapsi.ecommerce.exception.ProvedorIncompletoException;
import mx.com.gapsi.ecommerce.model.Provedores;
import mx.com.gapsi.ecommerce.service.ProvedoresService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provedores")
public class ProvedoresController {

    public ProvedoresService provedoresService;

    public ProvedoresController (ProvedoresService provedoresService) {
        this.provedoresService = provedoresService;
    }

    @GetMapping("/all")
    public List<Provedores> getAll() {
        return provedoresService.getAll();
    }

    @PostMapping("/create")
    public Provedores createProvider(@RequestBody Provedores provedores) {
        return provedoresService.createProvider(provedores);
    }
}
