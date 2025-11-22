package a25.climoilou.web2.TP2_Rose_Zara.repository;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CriteriaRepository extends JpaRepository<Criteria,Long> {

}
