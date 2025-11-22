package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.validation;

import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.exception.NouvelleInformationInvalidException;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity.Nouvelle;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;

/**
 * Valide les informations d'une nouvelle avant son enregistrement.
 *
 * Cette classe vérifie que chaque champ d'une nouvelle respecte les règles
 * minimales

 */

@Component
@Validated
public class NouvelleValidateur {


    /**
     * Vérifie que la nouvelle contient des informations valides.
     *
     * Chaque champ est contrôlé :
     * - l'auteur doit être présent
     * - la date ne doit pas être dans le futur
     * - le titre doit avoir au moins 3 caractères
     * - l'image doit commencer par "http"
     * - le résumé doit être assez long
     * - les tags ne doivent pas être vides
     *
     * @param nouvelle la nouvelle à valider
     * @throws NouvelleInformationInvalidException si un champ est invalide
     */
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

        if (nouvelle.getSummary() == null || nouvelle.getSummary().trim().length() < 3) {
            throw new NouvelleInformationInvalidException("Le resume de la nouvelle doit contenir au moins 3 caracteres");
        }

        if (nouvelle.getTags() == null || nouvelle.getTags().isEmpty()) {
            throw new NouvelleInformationInvalidException("Il doit y avoir au moins un tag");
        }
    }
}
