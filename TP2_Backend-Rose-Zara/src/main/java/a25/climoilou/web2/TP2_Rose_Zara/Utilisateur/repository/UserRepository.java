package a25.climoilou.web2.TP2_Rose_Zara.Utilisateur.repository;

import a25.climoilou.web2.TP2_Rose_Zara.Utilisateur.entity.Utilisateur;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<Utilisateur,Long> {

    Utilisateur findByNom(String nom);

}

