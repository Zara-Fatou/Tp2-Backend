package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.repository;

import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity.Nouvelle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NouvelleRepository extends JpaRepository<Nouvelle, Long> {

    Nouvelle findFirstByTitre(String titre);
}
