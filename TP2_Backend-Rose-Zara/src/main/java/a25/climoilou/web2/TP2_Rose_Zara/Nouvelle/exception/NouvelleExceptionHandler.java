package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class NouvelleExceptionHandler {

    // Gestion de tes validations personnalisées
    @ExceptionHandler(NouvelleInformationInvalidException.class)
    public ResponseEntity<Object> handleNouvelleInvalid(NouvelleInformationInvalidException ex) {

        Map<String, Object> body = new HashMap<>();
        body.put("error", "Validation error");
        body.put("message", ex.getMessage());
        body.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    // Gestion des erreurs génériques
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntime(RuntimeException ex) {

        Map<String, Object> body = new HashMap<>();
        body.put("error", "Internal error");
        body.put("message", ex.getMessage());
        body.put("timestamp", LocalDateTime.now());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
