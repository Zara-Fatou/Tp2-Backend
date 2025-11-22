package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


@Entity
public class Nouvelle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private Long id_auteur;

    @Getter
    @Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Getter
    @Setter
    @Column(unique = true)
    private String titre;

    @Getter
    @Setter
    private String image;

    @Getter
    @Setter
    @Lob
    private String text;

    @Getter
    @Setter
    @Column(length = 300)
    private String summary;


    @Getter
    @Setter
    private List<String> tags;

    public Nouvelle(LocalDate date, String titre, String image, String text, String summary, List<String> tags) {
        this.date = date;
        this.titre = titre;
        this.image = image;
        this.text = text;
        this.summary = summary;
        this.tags = tags;
    }

    public Nouvelle() {}

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Nouvelle nouvelle = (Nouvelle) o;
        return Objects.equals(id, nouvelle.id) && Objects.equals(id_auteur, nouvelle.id_auteur) && Objects.equals(date, nouvelle.date) && Objects.equals(titre, nouvelle.titre) && Objects.equals(image, nouvelle.image) && Objects.equals(text, nouvelle.text) && Objects.equals(summary, nouvelle.summary) && Objects.equals(tags, nouvelle.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, id_auteur, date, titre, image, text, summary, tags);
    }

    @Override
    public String toString() {
        return "Nouvelle{" +
                "id=" + id +
                ", id_auteur='" + id_auteur + '\'' +
                ", date=" + date +
                ", titre='" + titre + '\'' +
                ", image='" + image + '\'' +
                ", text='" + text + '\'' +
                ", summary='" + summary + '\'' +
                ", tags=" + tags +
                '}';
    }
}
