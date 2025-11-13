package a25.climoilou.web2.TP2_Rose_Zara.validation;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class CriteriaValidateur {

    public void validateurCritere(Criteria critere) {
        validateTitre(critere.getTitre());
        validateDate(critere.getDate());
        validateMotCle(critere.getMotCle());
        validateCategorie(critere.getCategorie());
        validateRegion(critere.getRegion());
        validateResume(critere.getResume());
        validateTags(critere.getTags());
    }

    public String validateTitre(String titre) {
        return titre != null && titre.length() > 2
                ? "" : "titre invalide\n";
    }

    public String validateDate(LocalDate date) {
        return date != null &&
                date.isBefore(LocalDate.now()) &&
                date.isAfter(LocalDate.of(1970, 1, 1))
                ? "" : "date invalide\n";
    }

    public String validateMotCle(String motCle) {
        return motCle != null && motCle.length() > 2
                ? "" : "mot-clé invalide\n";
    }

    public String validateCategorie(String categorie) {
        return categorie != null && categorie.length() > 2
                ? "" : "catégorie invalide\n";
    }

    public String validateRegion(String region) {
        return region != null && region.length() > 2
                ? "" : "région invalide\n";
    }

    public String validateResume(String resume) {
        return resume != null && resume.length() > 5
                ? "" : "résumé invalide\n";
    }

    public String validateTags(String tags) {
        return tags != null && !tags.trim().isEmpty()
                ? "" : "tags invalides\n";
    }
}
