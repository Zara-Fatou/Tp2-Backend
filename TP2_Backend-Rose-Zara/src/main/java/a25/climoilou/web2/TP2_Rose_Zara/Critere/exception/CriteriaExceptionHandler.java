package a25.climoilou.web2.TP2_Rose_Zara.Critere.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CriteriaExceptionHandler {

    @ExceptionHandler(CriteriaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error handleCriteriaNotFound(CriteriaNotFoundException ex) {
        return new Error(ex.getMessage());
    }

    @ExceptionHandler(CriteriaInvalidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error handleInvalidCriteria(CriteriaInvalidException ex) {
        return new Error(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Error handleGenericError(Exception ex) {
        return new Error("Erreur serveur : " + ex.getMessage());
    }
}
