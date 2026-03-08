package mx.com.gapsi.ecommerce.exception;

public class ProvedorIncompletoException extends RuntimeException{
    public ProvedorIncompletoException() {
        super ("Faltan datos de proveedor, favor de completar.");
    }
}
