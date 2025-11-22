package a25.climoilou.web2.TP2_Rose_Zara.data;

import a25.climoilou.web2.TP2_Rose_Zara.Utilisateur.entity.Utilisateur;

import java.util.List;

/**
 * Stocke une liste fixe d’utilisateurs en mémoire.
 * Sert de source de données pour UserController, sans persistance.
 */
public class UserStore {

    // Liste fixe d'utilisateurs
    public static final List<Utilisateur> USERS = List.of(
            new Utilisateur(1L, "Admin Principal", "admin"),
            new Utilisateur(2L, "Zara", "journaliste"),
            new Utilisateur(3L, "Rose", "journaliste"),
            new Utilisateur(4L, "Martin", "journaliste")
    );
}
