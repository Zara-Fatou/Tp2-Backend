package a25.climoilou.web2.TP2_Rose_Zara.controller;

import a25.climoilou.web2.TP2_Rose_Zara.NouvelleValidateur;
import a25.climoilou.web2.TP2_Rose_Zara.entity.Nouvelle;
import a25.climoilou.web2.TP2_Rose_Zara.repository.NouvelleRepository;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.time.LocalDateTime;
import java.util.Collection;

@CrossOrigin
@RestController
public class NouvelleController {
    private final Logger logger = LoggerFactory.getLogger(NouvelleController.class);
    private final NouvelleValidateur nouvelleValidateur;
    private final NouvelleRepository nouvelleRepository;

    public NouvelleController(NouvelleValidateur nouvelleValidateur, NouvelleRepository nouvelleRepository) {
        this.nouvelleValidateur = nouvelleValidateur;
        this.nouvelleRepository = nouvelleRepository;
    }

    @GetMapping(value = "/nouvelles", produces = "application/json")
    public Collection<Nouvelle> listAllNouvelles() throws InterruptedException {
        logger.info("listAllNouvelles avec JPA");
        Thread.sleep(5000);
        return (Collection<Nouvelle>) nouvelleRepository.findAll();
    }

    @PostMapping("/nouvelles/ajout")
    public Nouvelle ajouterNouvelle(@RequestBody Nouvelle nouvelle) throws InterruptedException {
        logger.info("ajouterNouvelle " +  nouvelle);
        nouvelleValidateur.validerNouvelle(nouvelle);
        Nouvelle nouvelleEnregistree = nouvelleRepository.save(nouvelle);
        logger.info("Une nouvelle de plus sauvegardée: id{} ",  nouvelleEnregistree);
        return nouvelleEnregistree;
    }

    @DeleteMapping("/nouvelles/delete/id")
    public void deleteNouvelle(@RequestBody Long id) throws InterruptedException {
        logger.info("deleteNouvelle " +  id);
        if (nouvelleRepository.existsById(id)) {
            nouvelleRepository.deleteById(id);
        }else {
            logger.warn("Nouvelle id non trouvé");
            throw new RuntimeException("Nouvelle id introuvable");
        }
    }

    @PatchMapping(path = "/nouvelles/id", consumes = "application/json", produces = "application/json")
    public Nouvelle updateNouvelle(@RequestBody Nouvelle nouvelle, @PathVariable Long id) throws InterruptedException {
        logger.info("updateNouvelle {} " ,nouvelle);
        return nouvelleRepository.findById(id)
                .map(n -> {
                    if (nouvelle.getId_auteur() != null) n.setId_auteur(nouvelle.getId_auteur());
                    if (nouvelle.getDate() != null && nouvelle.getDate().isBefore(LocalDateTime.now())) n.setDate(nouvelle.getDate());
                    if (nouvelle.getTitre() != null && nouvelle.getTitre().trim().length() >= 3) n.setTitre(nouvelle.getTitre());
                    if (nouvelle.getImage() != null && nouvelle.getImage().startsWith("http")) n.setImage(nouvelle.getImage());
                    if (nouvelle.getText() != null && !nouvelle.getText().trim().isEmpty()) n.setText(nouvelle.getText());
                    if (nouvelle.getSummary() != null && nouvelle.getSummary().trim().length() >= 3) n.setSummary(nouvelle.getSummary());
                    if (nouvelle.getTags() != null && !nouvelle.getTags().isEmpty()) n.setTags(nouvelle.getTags());

                    nouvelleValidateur.validerNouvelle(nouvelle);
                    return nouvelleRepository.save(n);
                })
                .orElseThrow(() -> new RuntimeException("Carte id non trouve"));
    }

}
