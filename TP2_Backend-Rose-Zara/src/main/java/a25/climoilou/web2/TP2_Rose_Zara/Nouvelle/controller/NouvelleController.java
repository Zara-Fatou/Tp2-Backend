package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.controller;

import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.exception.NouvelleInformationInvalidException;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.validation.NouvelleValidateur;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity.Nouvelle;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.repository.NouvelleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

/**
 * Contrôleur REST permettant de gérer les nouvelles.
 *
 * Cette classe offre les opérations principales :
 * - afficher toutes les nouvelles
 * - ajouter une nouvelle
 * - supprimer une nouvelle
 * - modifier une nouvelle partiellement (PATCH)
 *
 * Toutes les routes sont sous "/nouvelles".
 * Le contrôleur utilise un validateur et un repository JPA pour appliquer les règles
 * et accéder aux données.
 */

@CrossOrigin
@RestController
@RequestMapping("/nouvelles")
public class NouvelleController {

    private final Logger logger = LoggerFactory.getLogger(NouvelleController.class);
    private final NouvelleValidateur nouvelleValidateur;
    private final NouvelleRepository nouvelleRepository;

    public NouvelleController(NouvelleValidateur nouvelleValidateur, NouvelleRepository nouvelleRepository) {
        this.nouvelleValidateur = nouvelleValidateur;
        this.nouvelleRepository = nouvelleRepository;
    }

    /**
     * Retourne la liste complète des nouvelles.
     *
     * @return une collection de nouvelles en format JSON
     */

    @GetMapping(produces = "application/json")
    public Collection<Nouvelle> listAllNouvelles() {
        logger.info("listAllNouvelles avec JPA");
        return (Collection<Nouvelle>) nouvelleRepository.findAll();
    }

    /**
     * Ajoute une nouvelle dans la base de données.
     *
     * L'information reçue dans le corps de la requête est validée
     * avant d'être sauvegardée.
     *
     * @param nouvelle nouvelle reçue du client
     * @return la nouvelle enregistrée avec son id généré
     */

    @PostMapping("/ajout")
    public Nouvelle ajouterNouvelle(@RequestBody Nouvelle nouvelle) {
        logger.info("ajouterNouvelle {}", nouvelle);
        nouvelleValidateur.validerNouvelle(nouvelle);
        Nouvelle nouvelleEnregistree = nouvelleRepository.save(nouvelle);
        logger.info("Nouvelle sauvegardée : {}", nouvelleEnregistree.getTitre());
        return nouvelleEnregistree;
    }

    /**
     * Supprime une nouvelle selon son identifiant.
     *
     * Si l'id n'existe pas, une exception est lancée.
     *
     * @param id identifiant de la nouvelle à supprimer
     */

    @DeleteMapping("/delete/{id}")
    public void deleteNouvelle(@PathVariable Long id) {
        logger.info("deleteNouvelle id={}", id);
        if (nouvelleRepository.existsById(id)) {
            nouvelleRepository.deleteById(id);
            logger.info("Nouvelle supprimée id={}", id);
        } else {
            logger.warn("Nouvelle id non trouvée : {}", id);
            throw new NouvelleInformationInvalidException("Nouvelle id introuvable");

        }
    }

    /**
     * Met à jour partiellement une nouvelle existante.
     *
     * Seuls les champs présents dans la requête sont modifiés.
     * La nouvelle finale est validée avant l'enregistrement.
     *
     * @param nouvelle nouvelle contenant les champs modifiés
     * @param id identifiant de la nouvelle cible
     * @return la nouvelle mise à jour
     */

    @PatchMapping(path = "/{id}", consumes = "application/json", produces = "application/json")
    public Nouvelle updateNouvelle(@RequestBody Nouvelle nouvelle, @PathVariable Long id) {
        logger.info("updateNouvelle id={} {}", id, nouvelle);
        return nouvelleRepository.findById(id)
                .map(n -> {
                    if (nouvelle.getId_auteur() != null) n.setId_auteur(nouvelle.getId_auteur());
                    if (nouvelle.getDate() != null && !nouvelle.getDate().isAfter(LocalDate.now())) n.setDate(nouvelle.getDate());
                    if (nouvelle.getTitre() != null && nouvelle.getTitre().trim().length() >= 3) n.setTitre(nouvelle.getTitre());
                    if (nouvelle.getImage() != null && nouvelle.getImage().startsWith("http")) n.setImage(nouvelle.getImage());
                    if (nouvelle.getText() != null && !nouvelle.getText().trim().isEmpty()) n.setText(nouvelle.getText());
                    if (nouvelle.getSummary() != null && nouvelle.getSummary().trim().length() >= 3) n.setSummary(nouvelle.getSummary());
                    if (nouvelle.getTags() != null && !nouvelle.getTags().isEmpty()) n.setTags(nouvelle.getTags());

                    nouvelleValidateur.validerNouvelle(n);
                    return nouvelleRepository.save(n);
                })
                .orElseThrow(() -> new RuntimeException("Nouvelle id non trouvée"));
    }
}
