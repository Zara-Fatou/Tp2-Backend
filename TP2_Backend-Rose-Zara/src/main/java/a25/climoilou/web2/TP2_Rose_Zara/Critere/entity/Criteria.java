package a25.climoilou.web2.TP2_Rose_Zara.Critere.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Objects;


@Entity
public class Criteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCritere;

    @Getter
    @Setter
    private String titre;

    @Getter
    @Setter
    private LocalDate date;

    @Getter
    @Setter
    private String motCle;

    @Getter
    @Setter
    private String categorie;

    @Getter
    @Setter
    private String region;

    @Getter
    @Setter
    private String resume;

    @Getter
    @Setter
    private String tags;

    public Criteria() {
    }

    public Criteria(String titre, LocalDate date, String motCle, String categorie, String region, String resume, String tags) {
        this.titre = titre;
        this.date = date;
        this.motCle = motCle;
        this.categorie = categorie;
        this.region = region;
        this.resume = resume;
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Criteria criteria = (Criteria) o;
        return Objects.equals(idCritere, criteria.idCritere) &&
                Objects.equals(titre, criteria.titre) &&
                Objects.equals(date, criteria.date) &&
                Objects.equals(motCle, criteria.motCle) &&
                Objects.equals(categorie, criteria.categorie) &&
                Objects.equals(region, criteria.region) &&
                Objects.equals(resume, criteria.resume) &&
                Objects.equals(tags, criteria.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCritere, titre, date, motCle, categorie, region, resume, tags);
    }

    @Override
    public String toString() {
        return "Critere" +
                "id=" + idCritere +
                ", motCle='" + motCle + '\'' +
                ", categorie='" + categorie + '\'' +
                ", region='" + region + '\'' +
                ", resume='" + resume + '\'' +
                ", tags='" + tags;
    }
}
