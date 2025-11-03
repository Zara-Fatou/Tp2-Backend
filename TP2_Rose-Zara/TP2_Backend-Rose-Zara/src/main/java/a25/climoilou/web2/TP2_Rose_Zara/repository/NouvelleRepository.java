package a25.climoilou.web2.TP2_Rose_Zara.repository;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Nouvelle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NouvelleRepository extends CrudRepository<Nouvelle, Long> {

    Nouvelle findFirstByTitle(String titre);
}
