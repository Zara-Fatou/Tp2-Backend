package a25.climoilou.web2.TP2_Rose_Zara.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Gère les erreurs liées aux critères et retourne des réponses claires au client.
 */
@RestControllerAdvice
public class CriteriaExceptionHandler {

    /**
     * Retourne une erreur 404 si un critère est introuvable.
     */
    @ExceptionHandler(CriteriaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Error handleCriteriaNotFound(CriteriaNotFoundException ex) {
        return new Error(ex.getMessage());
    }

    /**
     * Retourne une erreur 400 si un critère est invalide.
     */
    @ExceptionHandler(CriteriaInvalidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Error handleInvalidCriteria(CriteriaInvalidException ex) {
        return new Error(ex.getMessage());
    }

    /**
     * Gère toutes les autres erreurs serveur inattendues.
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Error handleGenericError(Exception ex) {
        return new Error("Erreur serveur : " + ex.getMessage());
    }
}
