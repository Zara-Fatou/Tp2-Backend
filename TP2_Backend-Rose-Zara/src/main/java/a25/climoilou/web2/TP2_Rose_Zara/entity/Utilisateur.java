package a25.climoilou.web2.TP2_Rose_Zara.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Utilisateur {

    @Id
    @Getter @Setter
    private Long id;

    @Column(length = 100)
    @Getter
    @Setter
    private String nom;

    @Getter
    @Setter
    private String role;

    public Utilisateur(Long id, String nom, String role) {
        this.id = id;
        this.nom = nom;
        this.role = role;
    }
    
    public Utilisateur() {}
}
