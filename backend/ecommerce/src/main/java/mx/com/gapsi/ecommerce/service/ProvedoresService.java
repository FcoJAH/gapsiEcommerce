//Patron de diseno service layer
package mx.com.gapsi.ecommerce.service;

import mx.com.gapsi.ecommerce.exception.GlobalException;
import mx.com.gapsi.ecommerce.model.Provedores;
import mx.com.gapsi.ecommerce.repository.ProvedoresRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvedoresService {
    private final ProvedoresRepository provedoresRepository;

    public ProvedoresService (ProvedoresRepository provedoresRepository) {
        this.provedoresRepository = provedoresRepository;
    }

    public List<Provedores> getAll() {
        return provedoresRepository.findAll();
    }

    public Provedores createProvider(Provedores provedores) {
        if (provedoresRepository.existsByNombre(provedores.getNombre())) {
            throw new GlobalException("El provedor ya esta registrado.", HttpStatus.BAD_REQUEST);
        }

        if (provedores.getNombre() == null || provedores.getDireccion() == null || provedores.getRazonSocial() == null) {
            throw new GlobalException("Faltan datos de provedor, favor de llenar y reintentar",HttpStatus.BAD_REQUEST);
        }
        return provedoresRepository.save(provedores);
    }

    public void updateStatusProvider(long id, int status) {
        Provedores provedores = provedoresRepository.findById(id).
                orElseThrow(() -> new GlobalException("El provedor no existe", HttpStatus.NOT_FOUND));
        provedores.setActivo(status);
        provedoresRepository.save(provedores);
    }
}
