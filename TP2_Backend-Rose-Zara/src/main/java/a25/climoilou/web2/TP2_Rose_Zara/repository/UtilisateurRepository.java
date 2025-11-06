package a25.climoilou.web2.TP2_Rose_Zara.repository;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Getter
@Repository
public class UtilisateurRepository {

    private final List<Utilisateur> utilisateurs = Arrays.asList(
            new Utilisateur(1L, "Admin Principal", "admin"),
            new Utilisateur(2L, "Zara Fatoumata", "journaliste"),
            new Utilisateur(3L, "Rose Godlove", "journaliste"),
            new Utilisateur(4L, "Martin Simoneau", "journaliste")
    );

    public Utilisateur findById(Long id) {
        return utilisateurs.stream().filter(u -> u.getId().equals(id)).findFirst().orElse(null);
    }

    public Utilisateur findByNom(String nom) {
        return utilisateurs.stream().filter(u -> u.getNom().equals(nom)).findFirst().orElse(null);
    }
}
