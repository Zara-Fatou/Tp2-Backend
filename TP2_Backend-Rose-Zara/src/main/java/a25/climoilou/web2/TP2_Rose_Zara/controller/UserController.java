package a25.climoilou.web2.TP2_Rose_Zara.controller;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import a25.climoilou.web2.TP2_Rose_Zara.repository.UserRepository;
import ch.qos.logback.classic.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/utilisateurs")
public class UserController {

    private final UserRepository utilisateurRepository;
    Logger log;

    public UserController(UserRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping(produces = "application/json")
    public Iterable<Utilisateur> listAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }


    @GetMapping("/recherche")
    public Utilisateur getUserByUsername(@RequestParam String nom) {
        log.info("Recherche utilisateur par nom: {}", nom);

        Utilisateur utilisateur = utilisateurRepository.findByNom(nom);
        if (utilisateur == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur n'existe pas");
        }
        return utilisateur;
    }


    

}
