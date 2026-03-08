package mx.com.gapsi.ecommerce.exception;

import org.springframework.http.HttpStatus;

public class GlobalException extends RuntimeException{
    public GlobalException(String mensaje, HttpStatus status) {
        super (mensaje);
    }
}
