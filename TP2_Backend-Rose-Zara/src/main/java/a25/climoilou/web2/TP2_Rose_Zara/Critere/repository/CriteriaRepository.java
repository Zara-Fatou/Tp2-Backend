package a25.climoilou.web2.TP2_Rose_Zara.Critere.repository;

import a25.climoilou.web2.TP2_Rose_Zara.Critere.entity.Criteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriteriaRepository extends JpaRepository<Criteria,Long> {
    Criteria findByTitre(String titre);
}
