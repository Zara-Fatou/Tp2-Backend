package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.controller;

import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.validation.NouvelleValidateur;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity.Nouvelle;
import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.repository.NouvelleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collection;

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

    @GetMapping(produces = "application/json")
    public Collection<Nouvelle> listAllNouvelles() {
        logger.info("listAllNouvelles avec JPA");
        return (Collection<Nouvelle>) nouvelleRepository.findAll();
    }

    @PostMapping("/ajout")
    public Nouvelle ajouterNouvelle(@RequestBody Nouvelle nouvelle) {
        logger.info("ajouterNouvelle {}", nouvelle);
        nouvelleValidateur.validerNouvelle(nouvelle);
        Nouvelle nouvelleEnregistree = nouvelleRepository.save(nouvelle);
        logger.info("Nouvelle sauvegardée : {}", nouvelleEnregistree.getTitre());
        return nouvelleEnregistree;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNouvelle(@PathVariable Long id) {
        logger.info("deleteNouvelle id={}", id);
        if (nouvelleRepository.existsById(id)) {
            nouvelleRepository.deleteById(id);
            logger.info("Nouvelle supprimée id={}", id);
        } else {
            logger.warn("Nouvelle id non trouvée : {}", id);
            throw new RuntimeException("Nouvelle id introuvable");
        }
    }

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
