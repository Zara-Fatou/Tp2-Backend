package a25.climoilou.web2.TP2_Rose_Zara.config;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import a25.climoilou.web2.TP2_Rose_Zara.repository.CriteriaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class CriteriaInitializer {

    @Bean
    public CommandLineRunner initCritere(CriteriaRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Criteria> criteres = List.of(
                        new Criteria("Tourisme au Japon", LocalDate.of(2023, 5, 10), "Temple", "Culture", "Asie", "Découverte de Kyoto", "Japon,Temple"),
                        new Criteria("Architecture Séoul", LocalDate.of(2022, 3, 28), "Palais", "Architecture", "Corée du Sud", "Palais royal", "Séoul,Palais"),
                        new Criteria("Cuisine coréenne", LocalDate.of(2021, 6, 15), "Bibimbap", "Gastronomie", "Corée du Sud", "Plat traditionnel coréen", "Cuisine,Corée"),
                        new Criteria("Cinéma japonais", LocalDate.of(2020, 9, 20), "Studio Ghibli", "Cinéma", "Japon", "Films d’animation emblématiques", "Animation,Japon"),
                        new Criteria("Mode Harajuku", LocalDate.of(2023, 3, 8), "Streetwear", "Mode", "Tokyo", "Style jeune et excentrique", "Harajuku,Style"),
                        new Criteria("Musique K-pop", LocalDate.of(2022, 11, 5), "BTS", "Musique", "Corée du Sud", "Phénomène mondial de la pop coréenne", "K-pop,Concert")
                );
                repository.saveAll(criteres);
                System.out.println("Critères initiaux enrichis avec gastronomie, cinéma, etc.");
            }
        };
    }


}
