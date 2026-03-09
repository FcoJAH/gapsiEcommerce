package mx.com.gapsi.ecommerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "proveedores")
@Getter
@Setter
public class Provedores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio.")
    private String nombre;
    @NotBlank(message = "La razón es obligatorio.")
    private String razonSocial;
    private String detalles;
    @NotBlank(message = "La direccion es obligatorio.")
    private String direccion;
    @NotNull(message = "El contacto es obligatorio.")
    private Long contacto;
    @NotNull(message = "El saldo es obligatorio.")
    private float saldo;
    private int activo;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.activo = 1;
    }
}
