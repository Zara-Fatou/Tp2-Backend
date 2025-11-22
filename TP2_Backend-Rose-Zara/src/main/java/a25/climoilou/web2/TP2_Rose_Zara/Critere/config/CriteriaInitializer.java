package a25.climoilou.web2.TP2_Rose_Zara.Critere.config;

import a25.climoilou.web2.TP2_Rose_Zara.Critere.entity.Criteria;
import a25.climoilou.web2.TP2_Rose_Zara.Critere.repository.CriteriaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class CriteriaInitializer {

    private static final Logger log = LoggerFactory.getLogger(CriteriaInitializer.class);

    private final CriteriaRepository repository;

    public CriteriaInitializer(CriteriaRepository repository) {
        this.repository = repository;
    }

    /**
     *  Recréation automatique des critères initiaux
     */
    public void recreateInitialCriteria() {
        log.warn("Recréation automatique des critères initiaux...");

        List<Criteria> criteres = List.of(
                new Criteria("Tourisme au Japon", LocalDate.of(2023, 5, 10), "Temple", "Culture", "Asie", "Découverte de Kyoto", "Japon,Temple"),
                new Criteria("Architecture Séoul", LocalDate.of(2022, 3, 28), "Palais", "Architecture", "Corée du Sud", "Palais royal", "Séoul,Palais"),
                new Criteria("Cuisine coréenne", LocalDate.of(2021, 6, 15), "Bibimbap", "Gastronomie", "Corée du Sud", "Plat traditionnel coréen", "Cuisine,Corée"),
                new Criteria("Cinéma japonais", LocalDate.of(2020, 9, 20), "Studio Ghibli", "Cinéma", "Japon", "Films d’animation emblématiques", "Animation,Japon"),
                new Criteria("Mode Harajuku", LocalDate.of(2023, 3, 8), "Streetwear", "Mode", "Tokyo", "Style jeune et excentrique", "Harajuku,Style")
        );

        repository.saveAll(criteres);

        log.info("Critères initiaux recréés.");
    }

}
