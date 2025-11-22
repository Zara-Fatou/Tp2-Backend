package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.exception;

/**
 * Exception représentant une erreur dans les informations d'une nouvelle.
 *
 * Cette exception est lancée lorsque les données reçues pour une nouvelle
 * ne respectent pas les règles de validation définies
 *
 * Elle permet d'envoyer un message clair au contrôleur et ensuite au frontend
 * grâce au gestionnaire d'exception (NouvelleExceptionHandler).
 */

public class NouvelleInformationInvalidException extends RuntimeException {
    public NouvelleInformationInvalidException(String message) {
        super(message);
    }
}
