package a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.repository;

import a25.climoilou.web2.TP2_Rose_Zara.Nouvelle.entity.Nouvelle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository JPA pour gérer les nouvelles.
 *
 * Cette interface permet d'accéder à la base de données sans écrire de SQL.
 * Elle fournit automatiquement les opérations CRUD grâce à JpaRepository.
 */

@Repository
public interface NouvelleRepository extends JpaRepository<Nouvelle, Long> {

    Nouvelle findFirstByTitre(String titre);
}
