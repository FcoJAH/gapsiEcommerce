//Patron de diseno repository
package mx.com.gapsi.ecommerce.repository;

import mx.com.gapsi.ecommerce.model.Provedores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvedoresRepository extends JpaRepository<Provedores, Long> {
    List<Provedores> findAll();

    boolean existsByNombre(String nombre);
}
