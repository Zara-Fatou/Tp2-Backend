package a25.climoilou.web2.TP2_Rose_Zara.validation;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import a25.climoilou.web2.TP2_Rose_Zara.exception.CriteriaInvalidException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Valide tous les champs d’un critère.
 * Accumule les erreurs et lance une exception si nécessaire.
 */
@Component
public class CriteriaValidateur {

    /**
     * Vérifie chaque champ du critère et lance une exception si un champ est invalide.
     */
    public void validateurCritere(Criteria critere) {

        StringBuilder erreurs = new StringBuilder();

        erreurs.append(validateTitre(critere.getTitre()));
        erreurs.append(validateDate(critere.getDate()));
        erreurs.append(validateMotCle(critere.getMotCle()));
        erreurs.append(validateCategorie(critere.getCategorie()));
        erreurs.append(validateRegion(critere.getRegion()));
        erreurs.append(validateResume(critere.getResume()));
        erreurs.append(validateTags(critere.getTags()));

        if (!erreurs.isEmpty()) {
            throw new CriteriaInvalidException(erreurs.toString());
        }
    }

    /**
     * Valide le titre (non vide et longueur minimale).
     */
    public String validateTitre(String titre) {
        return titre != null && titre.length() > 2
                ? "" : "Titre invalide\n";
    }

    /**
     * Valide que la date est dans une plage réaliste.
     */
    public String validateDate(LocalDate date) {
        return date != null &&
                date.isBefore(LocalDate.now()) &&
                date.isAfter(LocalDate.of(1970, 1, 1))
                ? "" : "Date invalide\n";
    }

    /**
     * Valide le mot-clé (présent et assez long).
     */
    public String validateMotCle(String motCle) {
        return motCle != null && motCle.length() > 2
                ? "" : "Mot-clé invalide\n";
    }

    /**
     * Valide la catégorie (texte non vide).
     */
    public String validateCategorie(String categorie) {
        return categorie != null && categorie.length() > 2
                ? "" : "Catégorie invalide\n";
    }

    /**
     * Valide la région (présente et longueur minimale).
     */
    public String validateRegion(String region) {
        return region != null && region.length() > 2
                ? "" : "Région invalide\n";
    }

    /**
     * Valide le résumé (contenu minimal requis).
     */
    public String validateResume(String resume) {
        return resume != null && resume.length() > 5
                ? "" : "Résumé invalide\n";
    }

    /**
     * Valide la présence d’au moins un tag.
     */
    public String validateTags(String tags) {
        return tags != null && !tags.trim().isEmpty()
                ? "" : "Tags invalides\n";
    }
}
