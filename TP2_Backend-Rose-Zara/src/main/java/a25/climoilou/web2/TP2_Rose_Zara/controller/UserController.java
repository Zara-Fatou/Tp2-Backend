package a25.climoilou.web2.TP2_Rose_Zara.controller;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import a25.climoilou.web2.TP2_Rose_Zara.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/utilisateurs")
public class UserController {

    private final UserRepository utilisateurRepository;


    public UserController(UserRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping(produces = "application/json")
    public Iterable<Utilisateur> listAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/recherche")
    public Utilisateur getUserByUsername(@RequestParam String nom) {
        return utilisateurRepository.findByNom(nom);
    }


}
