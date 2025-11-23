package a25.climoilou.web2.TP2_Rose_Zara.Critere.controller;



import a25.climoilou.web2.TP2_Rose_Zara.Critere.config.CriteriaInitializer;
import a25.climoilou.web2.TP2_Rose_Zara.Critere.entity.Criteria;
import a25.climoilou.web2.TP2_Rose_Zara.Critere.repository.CriteriaRepository;
import a25.climoilou.web2.TP2_Rose_Zara.Critere.validation.CriteriaValidateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/criteres")
public class CriteriaController {

    private final Logger log = LoggerFactory.getLogger(CriteriaController.class);

    @Autowired
    private CriteriaRepository critereRepository;

    @Autowired
    private CriteriaValidateur criteriaValidateur;

    @Autowired
    private CriteriaInitializer initializer;

    /**
     *
     * @return Retourne tous les critères
     */
    @GetMapping(produces = "application/json")
    public List<Criteria> listCriteria() {
        log.info("Récupération de tous les critères");
        return critereRepository.findAll();
    }

    /**
     *
     * @param critere
     * Ajout d’un critère
     * @return
     */
    @PostMapping("/post")
    public Criteria ajouterCritere(@RequestBody Criteria critere) {

        log.info("Ajout du critère : {}", critere);


        criteriaValidateur.validateurCritere(critere);

        return critereRepository.save(critere);
    }



    /**
     * Suppression d’un critère
     * @param id
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCritere(@PathVariable long id) {

        if (!critereRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Critère introuvable");
        }

        critereRepository.deleteById(id);

        //Vérifier si tous les critères sont supprimés
        if (critereRepository.count() == 0) {
            log.warn("Tous les critères ont été supprimés, recréation des critères initiaux...");
            initializer.recreateInitialCriteria();
        }

        return ResponseEntity.noContent().build();
    }


}
