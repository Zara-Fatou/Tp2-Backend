package a25.climoilou.web2.TP2_Rose_Zara.controller;

import a25.climoilou.web2.TP2_Rose_Zara.entity.User;
import a25.climoilou.web2.TP2_Rose_Zara.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/utilisateurs")
public class UserController {

    private final UserRepository utilisateurRepository;


    public UserController(UserRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping(produces = "application/json")
    public Iterable<User> listAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/recherche")
    public User getUserByUsername(@RequestParam String username) {
        return utilisateurRepository.findByUsername(username);
    }


}
