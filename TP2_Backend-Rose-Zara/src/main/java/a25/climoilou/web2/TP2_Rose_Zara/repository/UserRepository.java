package a25.climoilou.web2.TP2_Rose_Zara.repository;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepository {

    private final List<Utilisateur> utilisateurs = new ArrayList<>();

    public UserRepository() {

    }

    public List<Utilisateur> findAll() {
        return utilisateurs;
    }

    public Utilisateur findByNom(String nom) {
        return utilisateurs.stream()
                .filter(u -> u.getNom().equalsIgnoreCase(nom))
                .findFirst()
                .orElse(null);
    }

    public void saveAll(List<Utilisateur> liste) {
        utilisateurs.addAll(liste);
    }


}
