package a25.climoilou.web2.TP2_Rose_Zara;

import a25.climoilou.web2.TP2_Rose_Zara.entity.Nouvelle;
import a25.climoilou.web2.TP2_Rose_Zara.repository.NouvelleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class Tp2RoseZaraApplication {

    private static final Logger log = LoggerFactory.getLogger(Tp2RoseZaraApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(Tp2RoseZaraApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(NouvelleRepository nouvelleRepository) {
        return args -> {

            log.info("Initialisation du dépôt de nouvelles...");

            // Charger uniquement si la base est vide
            if (nouvelleRepository.count() == 0) {
                log.info("Chargement des nouvelles de base...");

                List<Nouvelle> nouvelles = Arrays.asList(

                        new Nouvelle(4L,
                                LocalDateTime.of(2023, 5, 10, 0, 0),
                                "Temple au Japon (Kyoto)",
                                "https://www.jal.co.jp/fr/fr/guide-to-japan/destinations/articles/kyoto/5-must-see-temples-in-ancient-capital/_jcr_content/root/responsivegrid/sectioncontainer/image_16758543.coreimg.jpeg/1701399163776.jpeg",
                                "Le Kiyomizu-dera est l’un des temples bouddhistes les plus célèbres du Japon, fondé au VIIIe siècle. " +
                                        "Sa terrasse en bois, construite sans clous, surplombe une colline et offre une vue impressionnante sur Kyoto. " +
                                        "Le temple est particulièrement prisé au printemps et en automne pour ses couleurs spectaculaires.",
                                "Un temple emblématique de Kyoto, entre spiritualité et panorama.",
                                Arrays.asList("Japon", "Culture", "Tourisme", "Architecture")),

                        new Nouvelle(2L,
                                LocalDateTime.of(2022, 3, 28, 0, 0),
                                "Cerisiers en fleurs – Tokyo",
                                "https://guideaujapon.b-cdn.net/wp-content/uploads/2021/11/cerisiers-cimetiere-aoyama-tokyo-1030x687.jpg",
                                "Le hanami, ou contemplation des fleurs de cerisier, est une tradition japonaise qui célèbre la beauté éphémère de la vie.",
                                "Tokyo célèbre le hanami sous les cerisiers en fleurs.",
                                Arrays.asList("Japon", "Nature", "Tourisme", "Saison")),

                        new Nouvelle(3L,
                                LocalDateTime.of(2021, 11, 22, 0, 0),
                                "Mont Fuji – Japon",
                                "https://cdn.futura-sciences.com/sources/images/cerisier-japon-fuji-min.jpeg",
                                "Le Mont Fuji, volcan sacré du Japon, est un symbole national inspirant artistes et randonneurs depuis des siècles.",
                                "Le Mont Fuji, entre légende et nature.",
                                Arrays.asList("Japon", "Nature", "Tourisme", "Paysage")),

                        new Nouvelle(4L,
                                LocalDateTime.of(2020, 12, 5, 0, 0),
                                "Quartier Shibuya – Tokyo",
                                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/7c/eb/cb/photo0jpg.jpg?w=800&h=500&s=1",
                                "Shibuya, cœur vibrant de Tokyo, célèbre pour son carrefour piétonnier et son ambiance électrique.",
                                "Shibuya, le carrefour le plus animé du monde.",
                                Arrays.asList("Japon", "Urbain", "Tourisme", "Architecture", "Jeunesse")),

                        new Nouvelle(2L,
                                LocalDateTime.of(2021, 9, 15, 0, 0),
                                "Palais Gyeongbokgung – Séoul",
                                "https://www.koreaetour.com/wp-content/uploads/2012/06/%EA%B2%BD%EB%B3%B5%EA%B6%81-4-e1523426074381.jpg",
                                "Gyeongbokgung, palais royal de la dynastie Joseon, symbole de la résilience et de la culture coréenne.",
                                "Un palais majestueux au cœur de Séoul.",
                                Arrays.asList("Corée du Sud", "Culture", "Tourisme", "Histoire", "Architecture")),

                        new Nouvelle(3L,
                                LocalDateTime.of(2019, 6, 12, 0, 0),
                                "Marché traditionnel coréen (Namdaemun)",
                                "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/250000/250114-Namdaemun-Market.jpg",
                                "Namdaemun, l’un des plus anciens marchés de Séoul, regorge de saveurs et d’artisanat typiques.",
                                "Namdaemun, le marché aux mille saveurs.",
                                Arrays.asList("Corée du Sud", "Culture", "Histoire")),

                        new Nouvelle(4L,
                                LocalDateTime.of(2017, 4, 30, 0, 0),
                                "Festival des lanternes – Corée du Sud",
                                "https://www.coree-culture.org/IMG/jpg/2-39.jpg",
                                "Chaque année, le festival des lanternes illumine Séoul pour célébrer la naissance de Bouddha.",
                                "Des lanternes pour célébrer la lumière spirituelle.",
                                Arrays.asList("Corée du Sud", "Culture", "Tourisme", "Festival")),

                        new Nouvelle(2L,
                                LocalDateTime.of(2019, 7, 10, 0, 0),
                                "Sushi traditionnel – Japon",
                                "https://sushishop.com/wp-content/uploads/2025/02/SS25_UEAT_VDAY_1024x1024-1-705x705.jpg",
                                "Le sushi, plat emblématique du Japon, allie tradition, esthétique et saveurs marines dans une expérience unique.",
                                "Le sushi, art culinaire japonais.",
                                Arrays.asList("Japon", "Culture", "Gastronomie")),

                        new Nouvelle(3L,
                                LocalDateTime.of(2023, 10, 25, 0, 0),
                                "La rue Takeshita à Harajuku, Tokyo",
                                "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/03/a0003702/img/en/a0003702_main.jpg?20200618143422&q=80",
                                "Harajuku, haut lieu de la mode kawaii et de la créativité tokyoïte.",
                                "Harajuku, le style en pleine rue.",
                                Arrays.asList("Japon", "Urbain", "Jeunesse")),

                        new Nouvelle(4L,
                                LocalDateTime.of(2024, 2, 28, 0, 0),
                                "Village traditionnel de Bukchon Hanok, Séoul",
                                "https://b1945558.smushcdn.com/1945558/wp-content/uploads/2019/12/bukchon-hanok-village-gahoe-dong-seoul-hanbok.jpg?lossy=2&strip=1&webp=1",
                                "Bukchon Hanok, village historique entre tradition et modernité au cœur de Séoul.",
                                "Bukchon Hanok, entre tradition et modernité.",
                                Arrays.asList("Corée du Sud", "Culture", "Tourisme", "Histoire"))
                );

                nouvelleRepository.saveAll(nouvelles);
                log.info(" 10 nouvelles initialisées avec succès !");
            } else {
                log.info("Les nouvelles existent déjà, aucun chargement nécessaire.");
            }
        };
    }
}
