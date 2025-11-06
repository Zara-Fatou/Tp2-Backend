package a25.climoilou.web2.TP2_Rose_Zara.repository;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Criteria;
import org.springframework.data.repository.CrudRepository;

public interface CitereRepository extends CrudRepository<Criteria,Long> {
    Criteria findById(long id);
}
