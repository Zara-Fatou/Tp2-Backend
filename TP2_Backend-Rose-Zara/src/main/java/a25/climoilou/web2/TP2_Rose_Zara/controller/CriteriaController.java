package a25.climoilou.web2.TP2_Rose_Zara.controller;


import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import a25.climoilou.web2.TP2_Rose_Zara.exception.CriteriaInvalidException;
import a25.climoilou.web2.TP2_Rose_Zara.exception.CriteriaNotFoundException;
import a25.climoilou.web2.TP2_Rose_Zara.repository.CriteriaRepository;
import a25.climoilou.web2.TP2_Rose_Zara.validation.CriteriaValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;


@RestController
public class CriteriaController {

    private Logger log = LoggerFactory.getLogger(CriteriaController.class);

    @Autowired
    private CriteriaRepository critereRepository;

    @Autowired
    private CriteriaValidateur criteriaValidateur;

    @GetMapping(value = "/criteres", produces = "application/json")
    public List<Criteria> listCriteria() throws CriteriaInvalidException{
        log.info("listCriteria : récupération de tous les critères");
        return critereRepository.findAll();
    }

//Ajout critere
    @PostMapping("/criteres/post")
    public Criteria ajouterCritere(@RequestBody Criteria critere) {
        log.info("ajouter la critère : " + critere.toString());
        criteriaValidateur.validateurCritere(critere);
        Criteria criteria = critereRepository.save(critere);
        log.info("Critères sauvegardée: " + criteria.getTitre());

        return criteria;
    }

    @DeleteMapping("/criteres/delete/{id}")
    void deleteCritere(@PathVariable long id) {
        log.info("Efface la critère : " + id);

        if (critereRepository.existsById(id)) {
            log.info("deleteCritere : " + id);

        } else {
            log.warn("Le id n'existe pas: ");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Le id n'existe pas");
        }
    }

    @PatchMapping("/critere/patch/{id}")
    public Criteria updateCritere(@RequestBody Criteria newCritere, @PathVariable Long id) {
        log.info("Mise à jour du critère ID " + id + " avec : " + newCritere);

        return critereRepository.findById(id)
                .map(existing -> {
                    if (newCritere.getTitre() != null &&
                            criteriaValidateur.validateTitre(newCritere.getTitre()).isBlank()) {
                        existing.setTitre(newCritere.getTitre());
                    }

                    if (newCritere.getDate() != null &&
                            criteriaValidateur.validateDate(newCritere.getDate()).isBlank()) {
                        existing.setDate(newCritere.getDate());
                    }

                    if (newCritere.getMotCle() != null &&
                            criteriaValidateur.validateMotCle(newCritere.getMotCle()).isBlank()) {
                        existing.setMotCle(newCritere.getMotCle());
                    }

                    if (newCritere.getCategorie() != null &&
                            criteriaValidateur.validateCategorie(newCritere.getCategorie()).isBlank()) {
                        existing.setCategorie(newCritere.getCategorie());
                    }

                    if (newCritere.getRegion() != null &&
                            criteriaValidateur.validateRegion(newCritere.getRegion()).isBlank()) {
                        existing.setRegion(newCritere.getRegion());
                    }

                    if (newCritere.getResume() != null &&
                            criteriaValidateur.validateResume(newCritere.getResume()).isBlank()) {
                        existing.setResume(newCritere.getResume());
                    }

                    if (newCritere.getTags() != null &&
                            criteriaValidateur.validateTags(newCritere.getTags()).isBlank()) {
                        existing.setTags(newCritere.getTags());
                    }

                    return critereRepository.save(existing);
                })
                .orElseThrow(() -> new CriteriaNotFoundException("Critère avec ID " + id + " introuvable"));
    }


}
