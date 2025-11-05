package a25.climoilou.web2.TP2_Rose_Zara;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Nouvelle;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Component
@Validated
public class NouvelleValidateur {

    public void validerNouvelle(Nouvelle nouvelle) {

        if (nouvelle.getId_auteur() == null) {
            throw new NouvelleInformationInvalidException("Vous devez obligatoirement inscrire un auteur");
        }

        if (nouvelle.getDate() == null || nouvelle.getDate().isAfter(LocalDate.now())) {
            throw new NouvelleInformationInvalidException("Vous devez entrer une date anterieur a la date actuelle");
        }

        if (nouvelle.getTitre() == null || nouvelle.getTitre().trim().length() < 3) {
            throw new NouvelleInformationInvalidException("Le titre entré doit comporter au moins 3 caracteres");
        }

        if (nouvelle.getImage() == null || !nouvelle.getImage().startsWith("http")) {
            throw new NouvelleInformationInvalidException("Le lien de l'image doit commencer par http");
        }
//
//        if (nouvelle.getText() == null || nouvelle.getText().trim().isEmpty()) {
//            throw new NouvelleInformationInvalidException("Le texte de la nouvelle ne doit pas etre vide");
//        }

        if (nouvelle.getSummary() == null || nouvelle.getSummary().trim().length() < 3) {
            throw new NouvelleInformationInvalidException("Le resume de la nouvelle doit contenir au moins 3 caracteres");
        }

        if (nouvelle.getTags() == null || nouvelle.getTags().isEmpty()) {
            throw new NouvelleInformationInvalidException("Il doit y avoir au moins un tag");
        }
    }
}
