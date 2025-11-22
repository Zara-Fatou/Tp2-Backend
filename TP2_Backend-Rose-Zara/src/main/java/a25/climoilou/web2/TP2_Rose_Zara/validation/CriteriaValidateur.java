package a25.climoilou.web2.TP2_Rose_Zara.validation;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import a25.climoilou.web2.TP2_Rose_Zara.exception.CriteriaInvalidException;
import org.springframework.stereotype.Component;

/**
 * Classe responsable de valider les champs d’un critère avant sauvegarde.
 * Si un ou plusieurs champs sont invalides, une exception contenant
 * toutes les erreurs est envoyée au contrôleur.
 */
@Component
public class CriteriaValidateur {

    /**
     * Valide un critère complet et accumule toutes les erreurs.
     *
     * @param critere Le critère reçu du frontend
     * @throws CriteriaInvalidException si un champ obligatoire est vide ou incorrect
     */
    public void validateurCritere(Criteria critere) {

        StringBuilder erreurs = new StringBuilder();

        // Vérification des champs texte
        erreurs.append(validateNotEmpty(critere.getTitre(), "Titre"));
        erreurs.append(validateNotEmpty(critere.getMotCle(), "Mot-clé"));
        erreurs.append(validateNotEmpty(critere.getCategorie(), "Catégorie"));
        erreurs.append(validateNotEmpty(critere.getRegion(), "Région"));
        erreurs.append(validateNotEmpty(critere.getResume(), "Résumé"));
        erreurs.append(validateNotEmpty(critere.getTags(), "Tags"));

        // Vérification de la date
        if (critere.getDate() == null) {
            erreurs.append("Date invalide\n");
        }

        // Si une erreur est présente → Exception envoyée au frontend
        if (!erreurs.isEmpty()) {
            throw new CriteriaInvalidException(erreurs.toString());
        }
    }

    /**
     * Vérifie qu’un champ n’est pas vide.
     *
     * @param val valeur du champ
     * @param fieldName nom affiché dans les messages d’erreur
     * @return un message d’erreur (ou vide si valide)
     */
    private String validateNotEmpty(String val, String fieldName) {
        return (val != null && !val.trim().isEmpty())
                ? ""
                : fieldName + " invalide\n";
    }
}
