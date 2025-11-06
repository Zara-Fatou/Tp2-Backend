package a25.climoilou.web2.TP2_Rose_Zara.controller;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Nouvelle;
import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import a25.climoilou.web2.TP2_Rose_Zara.repository.UtilisateurRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping(produces = "application/json")
    public Collection<Utilisateur> listAllUtilisateurs() throws  Exception {
        return utilisateurRepository.getUtilisateurs();
    }

    @GetMapping("/{id}")
    public Utilisateur getUserById(@PathVariable Long id) {
        return utilisateurRepository.findById(id);
    }

}
