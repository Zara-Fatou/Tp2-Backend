package a25.climoilou.web2.TP2_Rose_Zara.entity;

public class Utilisateur {

    private Long id;
    private String nom;
    private String role;

    public Utilisateur(Long id, String nom, String role) {
        this.id = id;
        this.nom = nom;
        this.role = role;
    }

    public Utilisateur() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
