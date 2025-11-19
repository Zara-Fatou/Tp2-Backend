package a25.climoilou.web2.TP2_Rose_Zara.config;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import a25.climoilou.web2.TP2_Rose_Zara.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserInitiatlizer {


    /**
     *
     * @param userRepository
     * @return
     */
    @Bean
    public CommandLineRunner initUser(UserRepository userRepository) {
        return args -> {

            if (userRepository.findAll().isEmpty()) {

                List<Utilisateur> utilisateurs = List.of(
                        new Utilisateur(1L, "Admin Principal", "admin"),
                        new Utilisateur(2L, "Zara", "journaliste"),
                        new Utilisateur(3L, "Rose", "journaliste"),
                        new Utilisateur(4L, "Martin", "journaliste")
                );

                userRepository.saveAll(utilisateurs);

                System.out.println("Utilisateurs initiaux insérés en mémoire : Admin, Zara, Rose, Martin");
            }
        };
    }
}
