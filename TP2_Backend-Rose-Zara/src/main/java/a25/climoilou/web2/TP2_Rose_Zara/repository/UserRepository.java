package a25.climoilou.web2.TP2_Rose_Zara.repository;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Utilisateur;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;



//Changer l'interface en classe et avoir un tableau qui aura des users par default
@Repository
public interface UserRepository extends CrudRepository<Utilisateur, Long> {

    Utilisateur findByNom(String nom);
}

