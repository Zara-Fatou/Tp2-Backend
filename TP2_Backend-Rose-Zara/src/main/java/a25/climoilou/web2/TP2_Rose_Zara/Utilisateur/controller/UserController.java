package a25.climoilou.web2.TP2_Rose_Zara.Utilisateur.controller;

import a25.climoilou.web2.TP2_Rose_Zara.Utilisateur.entity.Utilisateur;
import a25.climoilou.web2.TP2_Rose_Zara.data.UserStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/utilisateurs")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);

    /**
     * Retourne la liste complète des utilisateurs préconfigurés
     */
    @GetMapping(produces = "application/json")
    public List<Utilisateur> listAllUtilisateurs() {
        log.info("Liste des utilisateurs consultée");
        return UserStore.USERS;
    }

    /**
     * Recherche d'un utilisateur par nom
     */
    @GetMapping("/recherche")
    public Utilisateur getUserByUsername(@RequestParam String nom) {
        log.info("Recherche utilisateur par nom : {}", nom);

        return UserStore.USERS.stream()
                .filter(u -> u.getNom().equalsIgnoreCase(nom))
                .findFirst()
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Utilisateur introuvable")
                );
    }
}
